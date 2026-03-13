#!/bin/bash
# shellcheck shell=bash
# Stop: PreCompletionChecklist — verify tests were actually run before session ends
# Checks git diff for code changes and warns if no test execution was detected

INPUT=$(cat)

# File-based lock to prevent infinite loop, with trap for cleanup
LOCK_FILE="${TMPDIR:-/tmp}/claude-pre-completion-lock"
trap 'rm -f "$LOCK_FILE"' EXIT

if [ -f "$LOCK_FILE" ]; then
  exit 0
fi
touch "$LOCK_FILE"

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  exit 0
fi

# Check if there are code changes (tracked, staged, AND untracked)
CODE_CHANGED=$(git diff --name-only HEAD 2>/dev/null | grep -cE '\.(py|ts|tsx|js|jsx|go|rs)$')
STAGED_CODE=$(git diff --cached --name-only 2>/dev/null | grep -cE '\.(py|ts|tsx|js|jsx|go|rs)$')
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null | grep -cE '\.(py|ts|tsx|js|jsx|go|rs)$')
TOTAL_CODE=$((CODE_CHANGED + STAGED_CODE + UNTRACKED))

if [ "$TOTAL_CODE" -eq 0 ]; then
  exit 0
fi

# Check if test commands were run recently (look for test result files or cache)
WARNINGS=""

# Python: check if pytest was likely run
if git diff --name-only HEAD 2>/dev/null | grep -qE '\.py$' || \
   git ls-files --others --exclude-standard 2>/dev/null | grep -qE '\.py$'; then
  if [ ! -d ".pytest_cache" ] || [ "$(find .pytest_cache -maxdepth 1 -mmin -30 2>/dev/null | head -1)" = "" ]; then
    WARNINGS="${WARNINGS}Python files changed but no recent pytest run detected. "
  fi
fi

# TypeScript/JS: check for vitest/jest
if git diff --name-only HEAD 2>/dev/null | grep -qE '\.(ts|tsx|js|jsx)$' || \
   git ls-files --others --exclude-standard 2>/dev/null | grep -qE '\.(ts|tsx|js|jsx)$'; then
  VITEST_RAN=false
  for cache_dir in node_modules/.vitest node_modules/.cache/jest; do
    if [ -d "$cache_dir" ] && [ "$(find "$cache_dir" -maxdepth 1 -mmin -30 2>/dev/null | head -1)" != "" ]; then
      VITEST_RAN=true
    fi
  done
  if [ "$VITEST_RAN" = false ]; then
    WARNINGS="${WARNINGS}JS/TS files changed but no recent test run detected. "
  fi
fi

if [ -n "$WARNINGS" ]; then
  jq -n --arg w "$WARNINGS" --arg cnt "$TOTAL_CODE" '{
    decision: "block",
    reason: ("[PRE-COMPLETION CHECK] " + $cnt + " code file(s) changed. " + $w + "\nBefore finishing, run tests to verify:\n- Python: pytest tests/ -x -q\n- JS/TS: npx vitest run\n- Go: go test ./...\n\nSkip only if changes are config/docs only.")
  }'
else
  jq -n '{
    decision: "approve",
    reason: "[PRE-COMPLETION CHECK] Tests appear to have been run recently. Good."
  }'
fi

exit 0
