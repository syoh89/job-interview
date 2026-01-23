import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
  title: "면접 질문 정리",
  description: "면접 질문과 공부 내용을 키워드로 정리하는 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-8">
          <Navigation />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
