"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  text: string;
  delay: number;
}

interface LiveTerminalProps {
  title: string;
  lines: TerminalLine[];
}

export default function LiveTerminal({ title, lines }: LiveTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setVisibleLines(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || visibleLines >= lines.length) {
      if (visibleLines >= lines.length) setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, lines[visibleLines].delay);

    return () => clearTimeout(timer);
  }, [isPlaying, visibleLines, lines]);

  const colorMap = {
    input: "text-emerald-400",
    output: "text-stone-400",
    error: "text-red-400",
    success: "text-emerald-300",
  };

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-stone-800 bg-stone-900">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-stone-700 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-3 text-xs text-stone-500">{title}</span>
        </div>
        <button
          onClick={play}
          className="rounded border border-stone-600 px-2 py-0.5 text-xs text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200"
        >
          {isPlaying ? "Playing..." : "Play"}
        </button>
      </div>

      {/* Terminal content */}
      <div className="min-h-[120px] p-4 font-mono text-sm">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colorMap[line.type]} leading-relaxed`}
          >
            {line.type === "input" && (
              <span className="text-stone-500">$ </span>
            )}
            {line.text}
          </motion.div>
        ))}
        {isPlaying && (
          <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400" />
        )}
      </div>
    </div>
  );
}
