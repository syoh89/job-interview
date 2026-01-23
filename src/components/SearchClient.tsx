"use client";

import { useMemo, useState } from "react";
import DocumentList from "./DocumentList";
import type { DocumentListItem } from "../lib/types";

type SearchClientProps = {
  items: DocumentListItem[];
};

export default function SearchClient({ items }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;

    const lower = trimmed.toLowerCase();
    return items.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(lower);
      const inKeywords = item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lower),
      );
      return inTitle || inKeywords;
    });
  }, [items, query]);

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

      <DocumentList
        items={filteredItems}
        emptyLabel="검색 결과가 없습니다."
      />
    </section>
  );
}
