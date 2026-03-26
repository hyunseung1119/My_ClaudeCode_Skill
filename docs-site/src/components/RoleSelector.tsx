"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Role {
  id: string;
  label: string;
  icon: string;
  description: string;
  recommended: string[];
}

const roles: Role[] = [
  {
    id: "developer",
    label: "Developer",
    icon: ">_",
    description: "코드를 직접 작성하는 개발자",
    recommended: ["intro", "install", "hooks", "agents", "commands", "advanced"],
  },
  {
    id: "pm",
    label: "PM / 기획자",
    icon: "PM",
    description: "제품을 기획하고 관리하는 분",
    recommended: ["intro", "harness", "install", "skills", "commands"],
  },
  {
    id: "student",
    label: "학생 / 입문자",
    icon: "AB",
    description: "코딩을 배우고 있는 분",
    recommended: ["intro", "harness", "install", "rules", "hooks", "skills"],
  },
  {
    id: "lead",
    label: "Tech Lead",
    icon: "TL",
    description: "팀의 기술적 방향을 이끄는 분",
    recommended: ["harness", "agents", "advanced", "customize"],
  },
];

interface RoleSelectorProps {
  onSelect: (recommended: string[]) => void;
}

export default function RoleSelector({ onSelect }: RoleSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-stone-400">
        어떤 역할이신가요?
      </h3>
      <p className="mt-2 text-center text-sm text-stone-500">
        역할에 맞는 추천 학습 경로를 안내해드립니다
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {roles.map((role) => {
          const isActive = selected === role.id;
          return (
            <motion.button
              key={role.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelected(role.id);
                onSelect(role.recommended);
              }}
              className={`flex flex-col items-center rounded-lg border p-4 transition-colors ${
                isActive
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
              }`}
            >
              <span
                className={`font-mono text-lg font-bold ${isActive ? "text-white" : "text-stone-400"}`}
              >
                {role.icon}
              </span>
              <span className="mt-2 text-sm font-medium">{role.label}</span>
              <span
                className={`mt-1 text-xs ${isActive ? "text-stone-300" : "text-stone-400"}`}
              >
                {role.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
