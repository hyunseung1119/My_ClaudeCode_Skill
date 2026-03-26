"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/content/chapters";

interface ToCProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: ToCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-48 shrink-0 overflow-y-auto py-8 pl-6 xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
        On this page
      </p>
      <nav className="space-y-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`block truncate border-l-2 py-1 pl-3 text-xs transition-colors ${
              activeId === s.id
                ? "border-stone-900 font-medium text-stone-900"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            {s.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
