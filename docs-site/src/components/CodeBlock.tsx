"use client";

import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "bash",
  filename,
}: CodeBlockProps) {
  return (
    <div className="group relative mt-4 overflow-hidden rounded-lg border border-stone-200">
      {filename && (
        <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          <span className="ml-2 font-mono text-xs text-stone-400">
            {filename}
          </span>
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <pre className="overflow-x-auto bg-stone-50 p-4 text-sm leading-relaxed">
          <code className={`language-${language} text-stone-700`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
