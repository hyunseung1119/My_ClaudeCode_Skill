#!/bin/bash
# shellcheck shell=bash
# PostToolUse: Auto-lint and format Python files with ruff
# Project-level hook (depends on ruff being installed in venv or globally)

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [ "$TOOL_NAME" != "Edit" ] && [ "$TOOL_NAME" != "Write" ]; then
  exit 0
fi

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check Python files
if ! echo "$FILE_PATH" | grep -qiE '\.py$'; then
  exit 0
fi

# Skip migrations, venv, __pycache__
if echo "$FILE_PATH" | grep -qE '(migrations/|venv/|__pycache__|\.pyc$|site-packages)'; then
  exit 0
fi

# Try project venv ruff first, then global (max 10 levels)
RUFF=""
DIR=$(dirname "$FILE_PATH")
DEPTH=0
while [ "$DIR" != "/" ] && [ "$DIR" != "." ] && [ $DEPTH -lt 10 ]; do
  for CANDIDATE in "$DIR/venv/Scripts/ruff.exe" "$DIR/venv/bin/ruff" "$DIR/.venv/Scripts/ruff.exe" "$DIR/.venv/bin/ruff"; do
    if [ -f "$CANDIDATE" ]; then
      RUFF="$CANDIDATE"
      break 2
    fi
  done
  DIR=$(dirname "$DIR")
  ((DEPTH++))
done

# Fallback to global ruff
if [ -z "$RUFF" ]; then
  RUFF=$(which ruff 2>/dev/null)
fi

if [ -z "$RUFF" ]; then
  exit 0
fi

# Run ruff check --fix then format
CHECK_OUTPUT=$("$RUFF" check --fix "$FILE_PATH" 2>&1)
"$RUFF" format "$FILE_PATH" 2>&1

BASENAME=$(basename "$FILE_PATH")

if echo "$CHECK_OUTPUT" | grep -qE 'Found [1-9]'; then
  jq -n --arg f "$BASENAME" --arg issues "$CHECK_OUTPUT" '{
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: ("[RUFF] Auto-fixed lint issues in " + $f + ":\n" + $issues + "\n\nFormatted with ruff format.")
    }
  }'
else
  jq -n --arg f "$BASENAME" '{
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: ("[RUFF] Formatted: " + $f)
    }
  }'
fi

exit 0
