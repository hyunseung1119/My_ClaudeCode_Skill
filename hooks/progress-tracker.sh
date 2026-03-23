#!/bin/bash
# shellcheck shell=bash
# Stop: Progress Tracker — claude-progress.txt 자동 관리
# 조용히 파일만 업데이트, stdout 없음

if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

PROGRESS_FILE="./claude-progress.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M KST')
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST_COMMIT=$(git log --oneline -1 2>/dev/null || echo "no commits")
MODIFIED=$(git diff --name-only 2>/dev/null | head -10)
STAGED=$(git diff --cached --name-only 2>/dev/null | head -10)

cat > "$PROGRESS_FILE" << PROGRESS_EOF
# Claude Progress — ${TIMESTAMP}

## State
- Branch: ${BRANCH}
- Last Commit: ${LAST_COMMIT}

## Modified (uncommitted)
${MODIFIED:-"(none)"}

## Staged
${STAGED:-"(none)"}
PROGRESS_EOF

# Stop 훅은 출력 없이 종료
exit 0
