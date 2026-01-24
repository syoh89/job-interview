import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import KeywordTag from "../../../components/KeywordTag";
import { getAllDocuments, getDocumentBySlug } from "../../../lib/content";

type PageProps = {
  params: { slug: string };
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const documents = await getAllDocuments("studies");
  return documents.map((doc) => ({ slug: doc.slug }));
}

export default async function StudyDetailPage({ params }: PageProps) {
  const document = await getDocumentBySlug("studies", params.slug);

  if (!document) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">{document.title}</h1>
        <p className="text-xs text-slate-500">
          {document.createdAt} · {document.updatedAt}
        </p>
        <div className="flex flex-wrap gap-2">
          {document.keywords.map((keyword) => (
            <KeywordTag key={keyword} keyword={keyword} />
          ))}
        </div>
      </header>
      <MarkdownContent html={document.html} />
    </section>
  );
}
