import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

const EXCLUDED_PARENTS = new Set(["code", "inlineCode", "link", "linkReference", "heading"]);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const keywordAutoLinkPlugin: Plugin<[string[]], Root> = (keywords = []) => {
  if (keywords.length === 0) {
    return () => {};
  }

  const normalizedKeywords = [...new Set(keywords)].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${normalizedKeywords.map(escapeRegExp).join("|")})`, "g");

  return (tree) => {
    visit(tree, "text", (node: any, index: number | null, parent: any) => {
      if (!parent || index === null || EXCLUDED_PARENTS.has(parent.type)) {
        return;
      }

      const value = String(node.value ?? "");
      if (!pattern.test(value)) {
        pattern.lastIndex = 0;
        return;
      }
      pattern.lastIndex = 0;

      const segments = value.split(pattern);
      const nextNodes = segments
        .filter((segment) => segment.length > 0)
        .map((segment) => {
          if (normalizedKeywords.includes(segment)) {
            return {
              type: "link",
              url: `/keywords/${encodeURIComponent(segment)}`,
              children: [{ type: "text", value: segment }],
            };
          }
          return { type: "text", value: segment };
        });

      parent.children.splice(index, 1, ...nextNodes);
    });
  };
};

export async function markdownToHtml(markdown: string, keywords: string[]) {
  const result = await remark()
    .use(remarkGfm)
    .use(keywordAutoLinkPlugin, keywords)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
