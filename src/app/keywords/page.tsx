import { Suspense } from "react";
import KeywordsExplorer from "../../components/KeywordsExplorer";
import { getAllDocuments, getAllKeywordsByCategory } from "../../lib/content";

export default async function KeywordsPage() {
  const [keywordMap, questions, studies] = await Promise.all([
    getAllKeywordsByCategory(),
    getAllDocuments("questions"),
    getAllDocuments("studies"),
  ]);

  return (
    <Suspense fallback={<div className="text-sm text-text-muted">키워드 로딩 중...</div>}>
      <KeywordsExplorer keywordMap={keywordMap} questions={questions} studies={studies} />
    </Suspense>
  );
}
