#!/bin/bash
# dependency-audit.sh — npm/pip/cargo/go 패키지 설치 시 안전성 검사
# PostToolUse (Bash) — 패키지 설치 명령 감지 시 경고

TOOL_INPUT="${TOOL_INPUT:-}"
COMMAND="${TOOL_INPUT}"

# 패키지 설치 명령 감지
if echo "$COMMAND" | grep -qE '(npm install|pip install|cargo add|go get|uv add)'; then

  # URL 직접 설치 감지
  if echo "$COMMAND" | grep -qE 'https?://|git\+|git://'; then
    echo '{"decision":"block","reason":"[SECURITY] URL 직접 설치 감지. 레지스트리에서 설치하세요."}'
    exit 0
  fi

  # 위험 플래그 감지
  if echo "$COMMAND" | grep -qE '--force|--unsafe-perm|--ignore-scripts'; then
    echo '{"decision":"block","reason":"[SECURITY] 위험 플래그 감지: --force/--unsafe-perm/--ignore-scripts"}'
    exit 0
  fi

  # 버전 미고정 경고 (npm)
  if echo "$COMMAND" | grep -qE 'npm install [^@-]+ *$' | grep -vq '@'; then
    echo '{"decision":"approve","reason":"[WARNING] 버전 미고정 패키지 설치. 프로덕션에서는 버전을 고정하세요."}'
    exit 0
  fi
fi

# 통과
exit 0
