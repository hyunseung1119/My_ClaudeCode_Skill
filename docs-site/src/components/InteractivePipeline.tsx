"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stage {
  name: string;
  event: string;
  hooks: string[];
  description: string;
  color: string;
}

const stages: Stage[] = [
  {
    name: "Session Start",
    event: "SessionStart",
    hooks: ["env-context-injector", "progress-loader", "regression-gate"],
    description:
      "세션이 시작되면 환경 정보를 자동 주입하고, 이전 세션의 진행 상태를 불러오고, 실패한 테스트가 있는지 확인합니다.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Safety Guard",
    event: "PreToolUse",
    hooks: [
      "dangerous-command-blocker",
      "secret-detector",
      "pre-commit-security",
      "code-quality-gate",
      "test-coverage-gate",
    ],
    description:
      "도구 실행 전에 위험한 명령을 차단하고, 시크릿 유출을 방지하고, 커밋 품질을 검사합니다.",
    color: "bg-red-50 border-red-200",
  },
  {
    name: "Tool Execution",
    event: "",
    hooks: ["AI가 도구를 실행합니다"],
    description:
      "앞의 안전 검사를 통과하면, AI가 실제로 코드를 작성하거나 명령을 실행합니다.",
    color: "bg-stone-50 border-stone-300",
  },
  {
    name: "Quality Gate",
    event: "PostToolUse",
    hooks: [
      "console-log-warning",
      "prettier-format",
      "tsc-check",
      "ruff-format",
      "verification-loop",
      "loop-detector",
      "observability-metrics",
    ],
    description:
      "도구 실행 후 코드 품질을 자동 검사합니다. 포맷팅, 타입 체크, 테스트 자동 실행, doom loop 감지까지.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    name: "Failure Analysis",
    event: "PostToolUseFailure",
    hooks: ["failure-explainer"],
    description:
      '도구가 실패하면 에러를 분류하고 "왜?" 3단계로 추적합니다. 같은 실패 3회 이상이면 접근법 변경을 권합니다.',
    color: "bg-orange-50 border-orange-200",
  },
  {
    name: "Session End",
    event: "Stop",
    hooks: [
      "dod-checker",
      "progress-tracker",
      "pre-completion-check",
      "session-learning",
    ],
    description:
      "세션 종료 전 완료 조건을 검증하고, 진행 상태를 기록하고, 테스트 실행 여부를 확인하고, 학습 패턴을 추출합니다.",
    color: "bg-emerald-50 border-emerald-200",
  },
];

export default function InteractivePipeline() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <p className="mb-4 text-center text-xs uppercase tracking-widest text-stone-400">
        Click each stage to explore
      </p>

      {/* Pipeline visualization */}
      <div className="flex flex-col items-center gap-1">
        {stages.map((stage, i) => (
          <div key={stage.name} className="w-full max-w-md">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStage(activeStage === i ? null : i)}
              className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                activeStage === i
                  ? `${stage.color} shadow-sm`
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-800">
                  {stage.name}
                </span>
                <span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-stone-500">
                  {stage.hooks.length}
                </span>
              </div>
            </motion.button>

            <AnimatePresence>
              {activeStage === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-b-lg border border-t-0 border-stone-200 bg-white p-4">
                    <p className="text-sm text-stone-600">
                      {stage.description}
                    </p>
                    {stage.event && (
                      <p className="mt-2 font-mono text-xs text-stone-400">
                        Event: {stage.event}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stage.hooks.map((hook) => (
                        <span
                          key={hook}
                          className="rounded border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-xs text-stone-600"
                        >
                          {hook}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connector arrow */}
            {i < stages.length - 1 && (
              <div className="flex justify-center py-0.5 text-stone-300">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2V10M6 10L3 7M6 10L9 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
