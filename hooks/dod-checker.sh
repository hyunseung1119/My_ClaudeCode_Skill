#!/bin/bash
# shellcheck shell=bash
# Stop: Definition of Done Checker
# 세션 종료 시 machine-checkable 완료 조건 검증

INPUT=$(cat)

# git repo 안에서만 동작
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

WARNINGS=""
PASS=0
TOTAL=0

# 1. 미커밋 변경 체크
TOTAL=$((TOTAL + 1))
UNCOMMITTED=$(git diff --name-only 2>/dev/null | wc -l)
STAGED=$(git diff --cached --name-only 2>/dev/null | wc -l)
if [ "$UNCOMMITTED" -eq 0 ] && [ "$STAGED" -eq 0 ]; then
  PASS=$((PASS + 1))
else
  WARNINGS="${WARNINGS}\n⚠️ 미커밋 변경 ${UNCOMMITTED}개, 미커밋 staged ${STAGED}개"
fi

# 2. TypeScript 타입 에러 (프로젝트에 tsconfig 있을 때)
if [ -f "tsconfig.json" ] && command -v npx &>/dev/null; then
  TOTAL=$((TOTAL + 1))
  TSC_ERRORS=$(npx tsc --noEmit 2>&1 | grep -c "error TS" 2>/dev/null)
  if [ "$TSC_ERRORS" -eq 0 ]; then
    PASS=$((PASS + 1))
  else
    WARNINGS="${WARNINGS}\n⚠️ TypeScript 에러 ${TSC_ERRORS}개"
  fi
fi

# 3. Python lint (ruff가 있을 때)
if command -v ruff &>/dev/null; then
  TOTAL=$((TOTAL + 1))
  RUFF_ERRORS=$(ruff check . --select E,F --quiet 2>&1 | wc -l)
  if [ "$RUFF_ERRORS" -le 1 ]; then
    PASS=$((PASS + 1))
  else
    WARNINGS="${WARNINGS}\n⚠️ Python lint 이슈 ${RUFF_ERRORS}개"
  fi
fi

# 4. .env 파일이 git에 tracked되지 않는지
TOTAL=$((TOTAL + 1))
ENV_TRACKED=$(git ls-files .env .env.local .env.production 2>/dev/null | wc -l)
if [ "$ENV_TRACKED" -eq 0 ]; then
  PASS=$((PASS + 1))
else
  WARNINGS="${WARNINGS}\n❌ .env 파일이 git에 tracked됨!"
fi

if [ -n "$WARNINGS" ]; then
  cat << EOF
{
  "hookSpecificOutput": {
    "additionalContext": "[DoD CHECK] ${PASS}/${TOTAL} 통과${WARNINGS}\n작업 완료 전 위 항목을 확인하세요."
  }
}
EOF
fi

exit 0
