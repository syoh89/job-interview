import Link from "next/link";

const links = [
  { href: "/", label: "홈" },
  { href: "/keywords", label: "키워드" },
  { href: "/questions", label: "질문 문서" },
  { href: "/studies", label: "공부 문서" },
  { href: "/profile", label: "프로필" },
];

export default function Navigation() {
  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-muted">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="no-underline transition hover:text-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
