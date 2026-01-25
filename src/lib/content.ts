import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";
import type { DocumentContent, DocumentListItem, DocumentMetadata, DocumentType } from "./types";

function findContentRoot(startDir: string) {
  let current = startDir;
  for (let depth = 0; depth < 8; depth += 1) {
    const candidate = path.join(current, "content");
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return null;
}

function resolveContentRoot() {
  const candidates = [process.env.GITHUB_WORKSPACE, process.cwd(), __dirname].filter(
    (value): value is string => Boolean(value),
  );

  for (const startDir of candidates) {
    const found = findContentRoot(startDir);
    if (found) {
      return found;
    }
  }

  return path.join(process.cwd(), "content");
}

const contentRoot = resolveContentRoot();

function parseKeywords(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((keyword) => String(keyword).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }
  return [];
}

function parseMetadata(data: Record<string, unknown>): DocumentMetadata {
  return {
    title: String(data.title ?? "제목 없음"),
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
    keywords: parseKeywords(data.keywords),
    category:
      data.category === "general" || data.category === "technical" ? data.category : "technical",
  };
}

function sortByUpdatedAt(items: DocumentListItem[]) {
  return items.sort((a, b) => {
    const aTime = Date.parse(a.updatedAt) || 0;
    const bTime = Date.parse(b.updatedAt) || 0;
    if (aTime !== bTime) {
      return bTime - aTime;
    }
    return a.title.localeCompare(b.title);
  });
}

function getDirectory(type: DocumentType) {
  return path.join(contentRoot, type);
}

function getAllSlugs(type: DocumentType) {
  const directory = getDirectory(type);
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getAllDocuments(type: DocumentType): Promise<DocumentListItem[]> {
  const directory = getDirectory(type);
  if (!fs.existsSync(directory)) {
    return [];
  }

  const slugs = getAllSlugs(type);
  const items = slugs.map((slug) => {
    const filePath = path.join(directory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const metadata = parseMetadata(data);
    return {
      ...metadata,
      slug,
      type,
    };
  });

  return sortByUpdatedAt(items);
}

export async function getDocumentBySlug(
  type: DocumentType,
  slug: string,
): Promise<DocumentContent | null> {
  const directory = getDirectory(type);
  const filePath = path.join(directory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    const availableFiles = fs.existsSync(directory)
      ? fs
          .readdirSync(directory)
          .filter((file) => file.endsWith(".md"))
          .sort()
      : [];
    throw new Error(
      [
        "Document file not found.",
        `type=${type}`,
        `slug=${slug}`,
        `filePath=${filePath}`,
        `contentRoot=${contentRoot}`,
        `cwd=${process.cwd()}`,
        `availableFiles=${availableFiles.join(",")}`,
      ].join(" | "),
    );
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const metadata = parseMetadata(data);
  const html = await markdownToHtml(content, metadata.keywords);
  return {
    ...metadata,
    slug,
    type,
    html,
    raw: content,
  };
}

export async function getProfileContent() {
  const filePath = path.join(contentRoot, "profile.md");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);
  const html = await markdownToHtml(content, []);
  return html;
}

export async function getAllKeywordsByCategory() {
  const [questions, studies] = await Promise.all([
    getAllDocuments("questions"),
    getAllDocuments("studies"),
  ]);

  const keywordMap: Record<string, Set<string>> = {
    technical: new Set(),
    general: new Set(),
  };

  [...questions, ...studies].forEach((doc) => {
    const set = keywordMap[doc.category] ?? keywordMap.technical;
    doc.keywords.forEach((keyword) => set.add(keyword));
  });

  return {
    technical: Array.from(keywordMap.technical).sort((a, b) => a.localeCompare(b)),
    general: Array.from(keywordMap.general).sort((a, b) => a.localeCompare(b)),
  };
}

export async function getDocumentsByKeyword(keyword: string) {
  const [questions, studies] = await Promise.all([
    getAllDocuments("questions"),
    getAllDocuments("studies"),
  ]);

  const filterByKeyword = (items: DocumentListItem[]) =>
    items.filter((item) => item.keywords.includes(keyword));

  return {
    questions: filterByKeyword(questions),
    studies: filterByKeyword(studies),
  };
}

export function getAllStaticKeywords() {
  const keywords = new Set<string>();
  (["questions", "studies"] as DocumentType[]).forEach((type) => {
    getAllSlugs(type).forEach((slug) => {
      const filePath = path.join(getDirectory(type), `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const metadata = parseMetadata(data);
      metadata.keywords.forEach((keyword) => keywords.add(keyword));
    });
  });
  return Array.from(keywords);
}
