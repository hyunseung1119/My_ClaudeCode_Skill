#!/bin/bash
# shellcheck shell=bash
# PostToolUseFailure: Bash command failure root cause analysis
# Analyzes error patterns and forces structured WHY tracing
# Output format: {"decision":"approve","reason":"..."}

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // "unknown"')
ERROR=$(echo "$INPUT" | jq -r '.error // .tool_output // "unknown error"')

# Track failure count per command pattern (doom loop detection)
TRACK_DIR="${TMPDIR:-/tmp}/claude-failure-tracker"
mkdir -p "$TRACK_DIR"
CMD_KEY=$(echo "$COMMAND" | cut -c1-50 | shasum -a 256 2>/dev/null | cut -d' ' -f1 || echo "$COMMAND" | md5sum 2>/dev/null | cut -d' ' -f1 || echo "unknown")
TRACK_FILE="$TRACK_DIR/$CMD_KEY"

if [ -f "$TRACK_FILE" ]; then
  FAIL_COUNT=$(cat "$TRACK_FILE")
  FAIL_COUNT=$((FAIL_COUNT + 1))
else
  FAIL_COUNT=1
fi
echo "$FAIL_COUNT" > "$TRACK_FILE"

# Classify error type for targeted guidance
GUIDANCE=""
if echo "$ERROR" | grep -qiE 'permission denied|EACCES'; then
  GUIDANCE="Root cause likely: file permissions or elevated privileges needed."
elif echo "$ERROR" | grep -qiE 'not found|command not found|No such file'; then
  GUIDANCE="Root cause likely: missing dependency, wrong path, or tool not installed."
elif echo "$ERROR" | grep -qiE 'ECONNREFUSED|timeout|ETIMEDOUT'; then
  GUIDANCE="Root cause likely: service not running or network issue."
elif echo "$ERROR" | grep -qiE 'syntax error|SyntaxError|unexpected token'; then
  GUIDANCE="Root cause likely: code syntax issue. Check recent edits."
elif echo "$ERROR" | grep -qiE 'OutOfMemory|ENOMEM|heap'; then
  GUIDANCE="Root cause likely: memory exhaustion. Reduce scope or increase limits."
fi

ESCALATION=""
if [ "$FAIL_COUNT" -ge 3 ]; then
  ESCALATION="\n\n[ESCALATION] Same command pattern failed ${FAIL_COUNT}x. STOP repeating. Try a fundamentally different approach or use /clear to restart."
fi

jq -n --arg cmd "$COMMAND" --arg err "$ERROR" --arg guide "$GUIDANCE" --arg esc "$ESCALATION" --arg cnt "$FAIL_COUNT" '{
  decision: "approve",
  reason: ("[FAILURE ANALYSIS] (attempt " + $cnt + ")\nCommand: " + $cmd + "\nError: " + $err + "\n" + $guide + "\n\nRequired protocol:\n1. Decompose the error message — explain each part\n2. Trace root cause: WHY? (surface) → WHY? (deeper) → WHY? (root)\n3. Get user approval before fixing\n4. After fix, provide 1-line prevention tip" + $esc)
}'

exit 0
