type MarkdownContentProps = {
  html: string;
};

export default function MarkdownContent({ html }: MarkdownContentProps) {
  return <div className="prose prose-til max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
