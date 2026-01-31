import KeywordsExplorer from "../../components/KeywordsExplorer";
import { getAllDocuments, getAllKeywordsByCategory } from "../../lib/content";

export default async function KeywordsPage() {
  const [keywordMap, questions, studies] = await Promise.all([
    getAllKeywordsByCategory(),
    getAllDocuments("questions"),
    getAllDocuments("studies"),
  ]);

  return <KeywordsExplorer keywordMap={keywordMap} questions={questions} studies={studies} />;
}
