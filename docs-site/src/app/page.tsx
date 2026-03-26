"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import InteractivePipeline from "@/components/InteractivePipeline";
import LiveTerminal from "@/components/LiveTerminal";
import { chapters } from "@/content/chapters";

const demoLines = [
  { type: "input" as const, text: 'claude "로그인 기능 만들어줘"', delay: 500 },
  {
    type: "output" as const,
    text: "두 가지 접근법이 있습니다:",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "  Option A: JWT — 확장성 좋음, 서버리스 친화적",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "  Option B: Session — 단순, 서버 사이드 관리",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "어느 쪽으로 진행할까요?",
    delay: 600,
  },
  { type: "input" as const, text: "A로 해줘", delay: 1000 },
  { type: "output" as const, text: "[planner] 설계도 작성 중...", delay: 600 },
  {
    type: "success" as const,
    text: "[code-reviewer] 보안 검토 완료",
    delay: 500,
  },
  {
    type: "success" as const,
    text: "[tdd-guide] 테스트 커버리지: 87%",
    delay: 400,
  },
  {
    type: "error" as const,
    text: "[secret-detector] API 키 하드코딩 감지 → 차단됨",
    delay: 600,
  },
  {
    type: "success" as const,
    text: "환경 변수로 변경 후 재작성 완료",
    delay: 500,
  },
];

export default function Home() {
  const [recommended, setRecommended] = useState<string[] | null>(null);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400"
          >
            2026 Edition &mdash; Open Source
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-serif text-4xl font-light leading-tight text-stone-900 md:text-5xl"
          >
            Claude Code
            <br />
            Harness Engineering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-stone-500"
          >
            모델을 바꾸지 않고, 감싸는 시스템만 바꿔서
            <br />
            AI 코딩 도구의 성능을 끌어올리는 방법을 배웁니다.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Link
              href="/chapters/intro"
              className="rounded-md bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            >
              시작하기
            </Link>
            <a
              href="https://github.com/hyunseung1119/My_ClaudeCode_Skill"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-stone-300 px-6 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              GitHub
            </a>
          </motion.div>

          {/* Comfort message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xs text-stone-400"
          >
            코딩 경험이 없어도 괜찮습니다. 단계별로 차근차근 안내합니다.
          </motion.p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-px border-y border-stone-200 bg-stone-200 md:grid-cols-5">
          {[
            { label: "Rules", value: "12", desc: "행동 규칙" },
            { label: "Hooks", value: "25", desc: "자동 검사" },
            { label: "Commands", value: "32", desc: "빠른 명령" },
            { label: "Agents", value: "24", desc: "전문가 팀" },
            { label: "Skills", value: "37", desc: "전문 지식" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white py-8"
            >
              <span className="font-mono text-2xl font-light text-stone-900">
                {stat.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-stone-400">
                {stat.label}
              </span>
              <span className="mt-0.5 text-xs text-stone-400">{stat.desc}</span>
            </div>
          ))}
        </section>

        {/* Live Demo */}
        <section className="py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
            실제로 이렇게 동작합니다
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            Play 버튼을 눌러 하네스가 적용된 Claude Code의 동작을 확인하세요
          </p>
          <div className="mx-auto max-w-xl">
            <LiveTerminal
              title="Claude Code + Harness"
              lines={demoLines}
            />
          </div>
        </section>

        {/* Role Selector */}
        <section className="border-t border-stone-200 py-16">
          <RoleSelector onSelect={setRecommended} />
          {recommended && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-xs text-stone-400"
            >
              아래 목차에서 추천 챕터가 하이라이트됩니다
            </motion.p>
          )}
        </section>

        {/* Pipeline Preview */}
        <section className="border-t border-stone-200 py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
            25개 훅이 만드는 안전망
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            각 단계를 클릭해서 어떤 훅이 동작하는지 살펴보세요
          </p>
          <div className="mx-auto max-w-md">
            <InteractivePipeline />
          </div>
        </section>

        {/* Chapter List */}
        <section className="border-t border-stone-200 py-16">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
            Table of Contents
          </h2>
          <div className="mt-10 divide-y divide-stone-100">
            {chapters.map((ch) => {
              const isRecommended =
                !recommended || recommended.includes(ch.slug);
              return (
                <Link
                  key={ch.slug}
                  href={`/chapters/${ch.slug}`}
                  className={`group flex items-baseline gap-6 rounded-md px-4 py-5 transition-all ${
                    isRecommended
                      ? "hover:bg-stone-50"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <span className="shrink-0 font-mono text-sm text-stone-300 group-hover:text-stone-500">
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-stone-800 group-hover:text-stone-900">
                        {ch.title}
                      </h3>
                      {recommended && isRecommended && (
                        <span className="rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white">
                          추천
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-stone-400">
                      {ch.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Comfort Footer */}
        <section className="border-t border-stone-200 py-16 text-center">
          <p className="text-lg font-light text-stone-700">
            &ldquo;처음이라 어려울 수 있습니다.
            <br />
            하지만 한 챕터씩 따라가다 보면,
            <br />
            어느새 능숙해져 있을 겁니다.&rdquo;
          </p>
          <Link
            href="/chapters/intro"
            className="mt-8 inline-block rounded-md bg-stone-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Chapter 01부터 시작하기
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-200 py-10 text-center text-xs text-stone-400">
          <p>
            Built for{" "}
            <a
              href="https://github.com/hyunseung1119/My_ClaudeCode_Skill"
              className="underline hover:text-stone-600"
            >
              My Claude Code Skill
            </a>{" "}
            &mdash; 2026
          </p>
        </footer>
      </main>
    </>
  );
}
