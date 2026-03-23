#!/bin/bash
# shellcheck shell=bash
# SessionStart: Progress Loader — 이전 세션 상태 자동 로드
# 새 세션 시작 시 claude-progress.txt가 있으면 컨텍스트에 주입

PROGRESS_FILE="./claude-progress.txt"

if [ -f "$PROGRESS_FILE" ]; then
  CONTENT=$(cat "$PROGRESS_FILE" 2>/dev/null)
  MODIFIED_AGO=""

  # 파일 수정 시간 계산 (cross-platform)
  if command -v stat &>/dev/null; then
    MOD_TIME=$(stat -c %Y "$PROGRESS_FILE" 2>/dev/null || stat -f %m "$PROGRESS_FILE" 2>/dev/null)
    if [ -n "$MOD_TIME" ]; then
      NOW=$(date +%s)
      DIFF=$(( (NOW - MOD_TIME) / 60 ))
      if [ "$DIFF" -lt 60 ]; then
        MODIFIED_AGO="${DIFF}분 전"
      elif [ "$DIFF" -lt 1440 ]; then
        MODIFIED_AGO="$(( DIFF / 60 ))시간 전"
      else
        MODIFIED_AGO="$(( DIFF / 1440 ))일 전"
      fi
    fi
  fi

  cat << EOF
{
  "hookSpecificOutput": {
    "additionalContext": "[PROGRESS] 이전 세션 상태 파일 발견 (${MODIFIED_AGO} 업데이트).\n파일: claude-progress.txt\n---\n${CONTENT}\n---\n이전 작업을 이어서 진행할 수 있습니다. 사용자에게 이전 상태를 간단히 알려주세요."
  }
}
EOF
fi

exit 0
