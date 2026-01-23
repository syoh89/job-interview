import Link from "next/link";

const links = [
  { href: "/", label: "키워드" },
  { href: "/questions", label: "질문 문서" },
  { href: "/studies", label: "공부 문서" },
  { href: "/search", label: "검색" },
  { href: "/profile", label: "프로필" },
];

export default function Navigation() {
  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="no-underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
