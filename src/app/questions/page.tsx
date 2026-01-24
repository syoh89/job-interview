import DocumentList from "../../components/DocumentList";
import { getAllDocuments } from "../../lib/content";

export default async function QuestionsPage() {
  const documents = await getAllDocuments("questions");

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">질문 문서</h1>
        <p className="text-sm text-slate-600">질문과 답변을 정리한 문서 목록입니다.</p>
      </header>
      <DocumentList items={documents} emptyLabel="질문 문서가 없습니다." />
    </section>
  );
}
