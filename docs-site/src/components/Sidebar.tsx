"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chapter } from "@/content/chapters";

interface SidebarProps {
  chapters: Chapter[];
}

export default function Sidebar({ chapters }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto border-r border-stone-200 py-8 pr-6 lg:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
        Chapters
      </p>
      <nav className="space-y-1">
        {chapters.map((ch) => {
          const isActive = pathname === `/chapters/${ch.slug}`;
          return (
            <Link
              key={ch.slug}
              href={`/chapters/${ch.slug}`}
              className={`flex items-baseline gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-stone-100 font-medium text-stone-900"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              <span className="font-mono text-xs text-stone-400">
                {String(ch.number).padStart(2, "0")}
              </span>
              <span>{ch.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
