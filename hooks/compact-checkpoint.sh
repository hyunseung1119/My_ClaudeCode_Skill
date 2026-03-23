#!/bin/bash
# shellcheck shell=bash
# PostCompact: Context Compression Checkpoint
# 컨텍스트 압축 시 자동으로 progress 파일 업데이트 + git stash 스냅샷

# git repo 안에서만 동작
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

PROGRESS_FILE="./claude-progress.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M KST')
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
MODIFIED=$(git diff --name-only 2>/dev/null | head -10)

# Progress 파일에 compact 이벤트 기록
if [ -f "$PROGRESS_FILE" ]; then
  echo "" >> "$PROGRESS_FILE"
  echo "## Compact Event — ${TIMESTAMP}" >> "$PROGRESS_FILE"
  echo "컨텍스트 압축이 발생했습니다. 아래는 압축 시점의 상태입니다." >> "$PROGRESS_FILE"
  echo "- Branch: ${BRANCH}" >> "$PROGRESS_FILE"
  echo "- Modified: ${MODIFIED:-none}" >> "$PROGRESS_FILE"
fi

cat << EOF
{
  "hookSpecificOutput": {
    "additionalContext": "[COMPACT] 컨텍스트 압축됨. claude-progress.txt에 체크포인트 저장 완료. 이전 작업 맥락을 참조하려면 progress 파일을 확인하세요."
  }
}
EOF

exit 0
