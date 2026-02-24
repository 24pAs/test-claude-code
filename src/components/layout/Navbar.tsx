"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/todos", label: "Todo" },
];

export function Navbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <span className="material-symbols-rounded text-white" style={{ fontSize: 20 }}>
              check_circle
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            TodoApp
          </span>
        </Link>

        {/* 네비 링크 + 다크 토글 */}
        <div className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return isActive ? (
              <span
                key={href}
                className="text-sm font-semibold px-4 py-1.5 rounded-full"
                style={{ backgroundColor: "#EFF6FF", color: "#4F46E5" }}
              >
                {label}
              </span>
            ) : (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            );
          })}

          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="다크 모드 전환"
          >
            <span className="material-symbols-rounded dark:hidden" style={{ fontSize: 22 }}>
              dark_mode
            </span>
            <span className="material-symbols-rounded hidden dark:block" style={{ fontSize: 22 }}>
              light_mode
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
