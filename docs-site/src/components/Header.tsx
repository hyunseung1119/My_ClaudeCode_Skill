"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-xl font-light tracking-tight text-stone-900">
            Claude Code
          </span>
          <span className="border-l border-stone-300 pl-3 text-sm font-medium uppercase tracking-widest text-stone-500">
            Harness Tutorial
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-stone-500 md:flex">
          <Link href="/" className="transition-colors hover:text-stone-900">
            Home
          </Link>
          <a
            href="https://github.com/hyunseung1119/My_ClaudeCode_Skill"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-stone-900"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
