"use client";

import { useMemo, useState } from "react";
import DocumentList from "./DocumentList";
import type { DocumentListItem } from "../lib/types";

type SearchClientProps = {
  questions: DocumentListItem[];
  studies: DocumentListItem[];
};

type SearchTab = "questions" | "studies";

const TAB_LABELS: Record<SearchTab, string> = {
  questions: "질문",
  studies: "공부",
};

export default function SearchClient({ questions, studies }: SearchClientProps) {
  const [query, setQuery] = useState("");
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
        <label className="text-sm font-medium text-slate-700" htmlFor="search">
          키워드/제목 검색
        </label>
        <input
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="예: React, 협업, HTTP"
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
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
