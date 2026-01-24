import KeywordTag from "../components/KeywordTag";
import { getAllKeywordsByCategory } from "../lib/content";

export default async function HomePage() {
  const keywordMap = await getAllKeywordsByCategory();

  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">키워드</h1>
        <p className="text-sm text-slate-600">
          기술/일반 면접 키워드를 선택하면 관련 문서로 이동합니다.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">기술 면접</h2>
          <div className="flex flex-wrap gap-2">
            {keywordMap.technical.length === 0 ? (
              <p className="text-sm text-slate-500">등록된 키워드가 없습니다.</p>
            ) : (
              keywordMap.technical.map((keyword) => <KeywordTag key={keyword} keyword={keyword} />)
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">일반 면접</h2>
          <div className="flex flex-wrap gap-2">
            {keywordMap.general.length === 0 ? (
              <p className="text-sm text-slate-500">등록된 키워드가 없습니다.</p>
            ) : (
              keywordMap.general.map((keyword) => <KeywordTag key={keyword} keyword={keyword} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
