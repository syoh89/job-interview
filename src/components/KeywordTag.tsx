import Link from "next/link";

type KeywordTagProps = {
  keyword: string;
};

export default function KeywordTag({ keyword }: KeywordTagProps) {
  return (
    <Link
      href={`/keywords/${encodeURIComponent(keyword)}`}
      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 no-underline transition hover:border-slate-300 hover:text-slate-900"
    >
      {keyword}
    </Link>
  );
}
