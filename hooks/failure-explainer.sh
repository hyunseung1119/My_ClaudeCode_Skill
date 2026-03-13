#!/bin/bash
# shellcheck shell=bash
# PostToolUseFailure: Bash command failure root cause analysis
# Forces WHY tracing and prevention tips on every failure

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // "unknown"')
ERROR=$(echo "$INPUT" | jq -r '.error // "unknown error"')

jq -n --arg cmd "$COMMAND" --arg err "$ERROR" '{
  hookSpecificOutput: {
    hookEventName: "PostToolUse",
    additionalContext: ("[LEARNING] Command failed. Follow this protocol:\n1. Decompose the error message — explain each part\n2. Trace root cause with 2-3 WHY? levels\n3. Get user approval before fixing\n4. After fix, provide 1-line prevention tip\n\nFailed command: " + $cmd + "\nError: " + $err)
  }
}'

exit 0
