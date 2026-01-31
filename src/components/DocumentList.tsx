import Link from "next/link";
import KeywordTag from "./KeywordTag";
import type { DocumentListItem } from "../lib/types";

type DocumentListProps = {
  items: DocumentListItem[];
  emptyLabel?: string;
};

export default function DocumentList({ items, emptyLabel }: DocumentListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-text-muted">{emptyLabel ?? "문서가 없습니다."}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <article
          key={`${item.type}-${item.slug}`}
          className="rounded-card border border-border-subtle bg-surface p-4 shadow-card-soft"
        >
          <div className="flex flex-col gap-2">
            <Link
              href={`/${item.type}/${item.slug}`}
              className="text-lg font-semibold text-text-primary no-underline"
            >
              {item.title}
            </Link>
            <p className="text-xs text-text-muted">
              {item.createdAt} · {item.updatedAt}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.keywords.map((keyword) => (
                <KeywordTag key={`${item.slug}-${keyword}`} keyword={keyword} />
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
