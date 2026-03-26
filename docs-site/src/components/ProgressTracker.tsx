"use client";

import { useEffect, useState } from "react";

interface ProgressTrackerProps {
  totalChapters: number;
  currentChapter: number;
}

const STORAGE_KEY = "claude-tutorial-progress";

function getProgress(): number[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function markComplete(chapter: number) {
  const progress = getProgress();
  if (!progress.includes(chapter)) {
    progress.push(chapter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

export default function ProgressTracker({
  totalChapters,
  currentChapter,
}: ProgressTrackerProps) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setCompleted(getProgress());
  }, []);

  const handleComplete = () => {
    markComplete(currentChapter);
    setCompleted(getProgress());
    setIsComplete(true);
  };

  const pct = Math.round((completed.length / totalChapters) * 100);

  return (
    <div className="mt-12 rounded-lg border border-stone-200 bg-stone-50 p-6">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          {completed.length}/{totalChapters} chapters
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-stone-700 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Mark complete button */}
      {!isComplete && !completed.includes(currentChapter) ? (
        <button
          onClick={handleComplete}
          className="mt-4 w-full rounded-md border border-stone-300 bg-white py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-900 hover:text-white"
        >
          이 챕터 완료로 표시
        </button>
      ) : (
        <p className="mt-4 text-center text-sm text-emerald-600">
          이 챕터를 완료했습니다
        </p>
      )}
    </div>
  );
}
