type MarkdownContentProps = {
  html: string;
};

export default function MarkdownContent({ html }: MarkdownContentProps) {
  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
