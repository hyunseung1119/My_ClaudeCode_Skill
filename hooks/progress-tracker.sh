#!/bin/bash
# shellcheck shell=bash
# Stop: Progress Tracker — 장기 실행 에이전트 상태 파일 자동 관리
# Anthropic 권장 패턴: claude-progress.txt로 컨텍스트 윈도우 간 상태 유지

INPUT=$(cat)
PROGRESS_FILE="./claude-progress.txt"

# git repo 안에서만 동작
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

# 현재 브랜치와 최근 커밋
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST_COMMIT=$(git log --oneline -1 2>/dev/null || echo "no commits")
MODIFIED=$(git diff --name-only 2>/dev/null | head -10)
STAGED=$(git diff --cached --name-only 2>/dev/null | head -10)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M KST')

# Progress 파일 업데이트
cat > "$PROGRESS_FILE" << PROGRESS_EOF
# Claude Progress — Auto-generated at ${TIMESTAMP}
# 이 파일은 세션 간 상태를 유지하기 위해 자동 생성됩니다.
# 새 세션 시작 시 이 파일을 읽어서 이전 작업을 이어갑니다.

## Current State
- Branch: ${BRANCH}
- Last Commit: ${LAST_COMMIT}
- Updated: ${TIMESTAMP}

## Modified Files (uncommitted)
${MODIFIED:-"(none)"}

## Staged Files
${STAGED:-"(none)"}

## Session Notes
<!-- Claude가 작업 중 중요한 결정이나 메모를 여기에 기록합니다 -->

PROGRESS_EOF

exit 0
