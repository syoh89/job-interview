import Link from "next/link";

type KeywordTagProps = {
  keyword: string;
};

export default function KeywordTag({ keyword }: KeywordTagProps) {
  return (
    <Link
      href={`/keywords/${encodeURIComponent(keyword)}`}
      className="rounded-tag border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-muted no-underline transition hover:border-accent hover:text-text-primary"
    >
      {keyword}
    </Link>
  );
}
