type Highlight = {
  title: string;
  description: string;
  accent: string;
};

const highlights: Highlight[] = [
  {
    title: "이번 주 핵심 활동",
    description: "면접 준비 핵심 키워드를 집중적으로 정리했어요.",
    accent: "키워드 12개 정리",
  },
  {
    title: "학습 리듬",
    description: "꾸준히 기록하며 흐름을 유지하고 있어요.",
    accent: "연속 6일",
  },
  {
    title: "문서 업데이트",
    description: "최근 질문/공부 문서를 최신화했습니다.",
    accent: "업데이트 8건",
  },
];

export default function StarryActivityShowcase() {
  return (
    <section className="rounded-card border border-border-subtle bg-surface-elevated p-6 shadow-card">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Starry Activity
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-primary">
            매일 기록하는 나만의 면접 아카이브
          </h1>
          <p className="text-base text-text-muted">
            마크다운으로 작성한 모든 기록이 디자인 시스템에 맞춰 자동으로 정리됩니다.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-card border border-border-subtle bg-surface p-4 shadow-card-soft"
          >
            <p className="text-sm font-semibold text-text-primary">{item.title}</p>
            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            <p className="mt-3 inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-text-primary">
              {item.accent}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
