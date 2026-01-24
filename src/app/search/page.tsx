import SearchClient from "../../components/SearchClient";
import { getAllDocuments } from "../../lib/content";

export default async function SearchPage() {
  const [questions, studies] = await Promise.all([
    getAllDocuments("questions"),
    getAllDocuments("studies"),
  ]);

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">검색</h1>
        <p className="text-sm text-slate-600">키워드 또는 제목으로 문서를 검색합니다.</p>
      </header>
      <SearchClient questions={questions} studies={studies} />
    </section>
  );
}
