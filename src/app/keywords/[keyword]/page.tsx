import DocumentList from "../../../components/DocumentList";
import { getAllStaticKeywords, getDocumentsByKeyword } from "../../../lib/content";

type PageProps = {
  params: { keyword: string };
};

export async function generateStaticParams() {
  const keywords = getAllStaticKeywords();
  return keywords.map((keyword) => ({
    keyword,
  }));
}

export default async function KeywordPage({ params }: PageProps) {
  const decodedKeyword = decodeURIComponent(params.keyword);
  const { questions, studies } = await getDocumentsByKeyword(decodedKeyword);

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">{decodedKeyword}</h1>
        <p className="text-sm text-slate-600">선택한 키워드와 연결된 문서를 보여줍니다.</p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">질문 문서</h2>
          <DocumentList items={questions} emptyLabel="이 키워드와 연결된 질문 문서가 없습니다." />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">공부 문서</h2>
          <DocumentList items={studies} emptyLabel="이 키워드와 연결된 공부 문서가 없습니다." />
        </div>
      </div>
    </section>
  );
}
