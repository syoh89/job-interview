import MarkdownContent from "../../components/MarkdownContent";
import { getProfileContent } from "../../lib/content";

export default async function ProfilePage() {
  const html = await getProfileContent();

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">프로필</h1>
        <p className="text-sm text-slate-600">간단한 사용자 소개입니다.</p>
      </header>
      {html ? (
        <MarkdownContent html={html} />
      ) : (
        <p className="text-sm text-slate-500">프로필 문서가 없습니다.</p>
      )}
    </section>
  );
}
