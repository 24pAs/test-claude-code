"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/todos", label: "Todo" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
        backdropFilter: "blur(12px)",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          style={{ color: "#0F172A" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.025em" }}>
            TodoApp
          </span>
        </Link>

        <ul className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isActive ? "#DBEAFE" : "transparent",
                    color: isActive ? "#4F46E5" : "#475569",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
