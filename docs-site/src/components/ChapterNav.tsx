import Link from "next/link";
import type { Chapter } from "@/content/chapters";

interface ChapterNavProps {
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="mt-16 flex items-center justify-between border-t border-stone-200 pt-8">
      {prev ? (
        <Link
          href={`/chapters/${prev.slug}`}
          className="group flex flex-col items-start"
        >
          <span className="text-xs uppercase tracking-widest text-stone-400">
            Previous
          </span>
          <span className="mt-1 text-sm font-medium text-stone-700 group-hover:text-stone-900">
            &larr; {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/chapters/${next.slug}`}
          className="group flex flex-col items-end"
        >
          <span className="text-xs uppercase tracking-widest text-stone-400">
            Next
          </span>
          <span className="mt-1 text-sm font-medium text-stone-700 group-hover:text-stone-900">
            {next.title} &rarr;
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
