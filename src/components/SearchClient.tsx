"use client";

import { useMemo, useState } from "react";
import DocumentList from "./DocumentList";
import type { DocumentListItem } from "../lib/types";

type SearchClientProps = {
  questions: DocumentListItem[];
  studies: DocumentListItem[];
  query: string;
  onQueryChange: (nextQuery: string) => void;
};

type SearchTab = "questions" | "studies";

const TAB_LABELS: Record<SearchTab, string> = {
  questions: "질문",
  studies: "공부",
};

export default function SearchClient({
  questions,
  studies,
  query,
  onQueryChange,
}: SearchClientProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("questions");

  const filteredQuestions = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return questions;

    const lower = trimmed.toLowerCase();
    return questions.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(lower);
      const inKeywords = item.keywords.some((keyword) => keyword.toLowerCase().includes(lower));
      return inTitle || inKeywords;
    });
  }, [questions, query]);

  const filteredStudies = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return studies;

    const lower = trimmed.toLowerCase();
    return studies.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(lower);
      const inKeywords = item.keywords.some((keyword) => keyword.toLowerCase().includes(lower));
      return inTitle || inKeywords;
    });
  }, [studies, query]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text-primary" htmlFor="search">
          키워드/제목 검색
        </label>
        <input
          id="search"
          value={query}
          onChange={(event) => {
            const nextValue = event.target.value;
            onQueryChange?.(nextValue);
          }}
          placeholder="예: React, 협업, HTTP"
          className="w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(TAB_LABELS) as SearchTab[]).map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isActive
                  ? "border-accent bg-accent-soft text-text-primary"
                  : "border-border-subtle text-text-muted hover:border-accent hover:text-text-primary"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>

      {activeTab === "questions" ? (
        <DocumentList items={filteredQuestions} emptyLabel="질문 문서 검색 결과가 없습니다." />
      ) : (
        <DocumentList items={filteredStudies} emptyLabel="공부 문서 검색 결과가 없습니다." />
      )}
    </section>
  );
}
