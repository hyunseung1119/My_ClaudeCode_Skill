#!/bin/bash
# shellcheck shell=bash
# PostToolUse: Execution Trace Logger
# Records all tool calls to ~/.claude/traces/ for harness debugging and improvement
# Output format: silent (no JSON output — logging only)

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Skip logging for trace-logger itself to avoid recursion
if [ -z "$TOOL_NAME" ]; then
  exit 0
fi

# Create trace directory
TRACE_DIR="$HOME/.claude/traces"
mkdir -p "$TRACE_DIR"

# Daily trace file
DATE=$(date +%Y-%m-%d)
TRACE_FILE="$TRACE_DIR/${DATE}.jsonl"

# Extract key info
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
SESSION_KEY="${CLAUDE_SESSION_ID:-unknown}"
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.command // "N/A"' | head -c 200)
TOOL_RESULT=$(echo "$INPUT" | jq -r '.tool_output // "success"' | head -c 100)

# Append trace entry (JSONL format)
jq -n --arg ts "$TIMESTAMP" --arg sess "$SESSION_KEY" --arg tool "$TOOL_NAME" --arg target "$FILE_PATH" --arg result "$TOOL_RESULT" \
  '{timestamp: $ts, session: $sess, tool: $tool, target: $target, result: $result}' >> "$TRACE_FILE" 2>/dev/null

# Cleanup: keep only last 7 days of traces
find "$TRACE_DIR" -name "*.jsonl" -mtime +7 -delete 2>/dev/null

exit 0
