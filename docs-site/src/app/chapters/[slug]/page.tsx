import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChapterNav from "@/components/ChapterNav";
import TableOfContents from "@/components/TableOfContents";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/content/chapters";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const idx = chapters.findIndex((ch) => ch.slug === slug);
  if (idx === -1) return notFound();

  const chapter = chapters[idx];
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  const readingTime = Math.max(
    5,
    Math.ceil(
      chapter.sections.reduce((sum, s) => sum + s.content.length, 0) / 800
    )
  );

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-7xl px-6">
        <Sidebar chapters={chapters} />

        <article className="min-w-0 flex-1 py-12 lg:px-12">
          {/* Chapter header */}
          <div className="border-b border-stone-200 pb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-stone-400">
                Chapter {String(chapter.number).padStart(2, "0")}
              </span>
              <span className="text-stone-300">/</span>
              <span className="text-xs text-stone-400">
                {readingTime}min read
              </span>
            </div>
            <h1 className="mt-3 font-serif text-3xl font-light text-stone-900 md:text-4xl">
              {chapter.title}
            </h1>
            <p className="mt-3 text-lg text-stone-500">{chapter.subtitle}</p>

            {/* Comfort message for early chapters */}
            {chapter.number <= 3 && (
              <div className="mt-4 rounded-lg border border-violet-100 bg-violet-50 px-4 py-3">
                <p className="text-sm text-violet-700">
                  {chapter.number === 1 &&
                    "이 챕터는 개념 소개입니다. 코딩 경험이 없어도 이해할 수 있습니다."}
                  {chapter.number === 2 &&
                    "어려운 용어가 나오면 걱정하지 마세요. 비유로 쉽게 설명합니다."}
                  {chapter.number === 3 &&
                    "설치는 복사-붙여넣기로 끝납니다. 천천히 따라해보세요."}
                </p>
              </div>
            )}
          </div>

          {/* Section quick navigation (mobile) */}
          <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4 xl:hidden">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
              이 챕터의 내용
            </p>
            <nav className="space-y-1">
              {chapter.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-stone-600 hover:text-stone-900"
                >
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Sections */}
          <div className="mt-10 space-y-14">
            {chapter.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h3 className="text-xl font-semibold text-stone-900">
                  {section.title}
                </h3>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
          </div>

          {/* Progress tracker */}
          <ProgressTracker
            totalChapters={chapters.length}
            currentChapter={chapter.number}
          />

          <ChapterNav prev={prev} next={next} />
        </article>

        <TableOfContents sections={chapter.sections} />
      </div>
    </>
  );
}
