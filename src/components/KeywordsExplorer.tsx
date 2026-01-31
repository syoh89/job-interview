"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchClient from "./SearchClient";
import type { DocumentListItem } from "../lib/types";

type KeywordMap = {
  technical: string[];
  general: string[];
};

type KeywordsExplorerProps = {
  keywordMap: KeywordMap;
  questions: DocumentListItem[];
  studies: DocumentListItem[];
};

const keywordButtonClassName =
  "rounded-tag border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-muted no-underline transition hover:border-accent hover:text-text-primary";

export default function KeywordsExplorer({
  keywordMap,
  questions,
  studies,
}: KeywordsExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("query") ?? "";

  const updateQuery = (nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = nextQuery.trim();
    if (trimmed) {
      params.set("query", trimmed);
    } else {
      params.delete("query");
    }
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const handleKeywordClick = (keyword: string) => {
    updateQuery(keyword);
  };

  const keywordSections = useMemo(
    () => [
      { title: "기술 면접", keywords: keywordMap.technical },
      { title: "일반 면접", keywords: keywordMap.general },
    ],
    [keywordMap.general, keywordMap.technical],
  );

  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Keyword Explorer
        </p>
        <h1 className="text-3xl font-semibold text-text-primary">키워드 탐색</h1>
        <p className="text-sm text-text-muted">
          키워드 목록과 검색을 함께 제공해 필요한 문서를 빠르게 찾을 수 있습니다.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-5 rounded-card border border-border-subtle bg-surface p-6 shadow-card-soft">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">키워드 목록</h2>
            <p className="text-sm text-text-muted">
              키워드를 선택하면 검색 결과가 즉시 갱신됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {keywordSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-text-primary">{section.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {section.keywords.length === 0 ? (
                    <p className="text-sm text-text-muted">등록된 키워드가 없습니다.</p>
                  ) : (
                    section.keywords.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        className={keywordButtonClassName}
                        onClick={() => handleKeywordClick(keyword)}
                      >
                        {keyword}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border-subtle bg-surface p-6 shadow-card-soft">
          <h2 className="text-lg font-semibold text-text-primary">문서 검색</h2>
          <p className="mt-1 text-sm text-text-muted">
            제목이나 키워드를 입력해 질문/공부 문서를 검색합니다.
          </p>
          <div className="mt-5">
            <SearchClient
              questions={questions}
              studies={studies}
              query={query}
              onQueryChange={updateQuery}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
