#!/bin/bash
# shellcheck shell=bash
# PostToolUse: Loop Detection Middleware
# Tracks file edit counts per session and warns when threshold exceeded

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only track Edit and Write tools
if [ "$TOOL_NAME" != "Edit" ] && [ "$TOOL_NAME" != "Write" ]; then
  exit 0
fi

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Track edits in a temp file keyed by session
TRACK_DIR="${TMPDIR:-/tmp}/claude-loop-detector"
mkdir -p "$TRACK_DIR"

# Use filename hash as key
FILE_KEY=$(echo "$FILE_PATH" | md5 -q 2>/dev/null || echo "$FILE_PATH" | md5sum | cut -d' ' -f1)
TRACK_FILE="$TRACK_DIR/$FILE_KEY"

# Increment counter
if [ -f "$TRACK_FILE" ]; then
  COUNT=$(cat "$TRACK_FILE")
  COUNT=$((COUNT + 1))
else
  COUNT=1
fi
echo "$COUNT" > "$TRACK_FILE"

BASENAME=$(basename "$FILE_PATH")
THRESHOLD=4

if [ "$COUNT" -ge "$THRESHOLD" ]; then
  jq -n --arg f "$BASENAME" --arg c "$COUNT" '{
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: ("[LOOP DETECTION] " + $f + " has been edited " + $c + " times this session. You may be in a doom loop.\n\nSTOP and reassess:\n1. Are you repeating the same fix?\n2. Is there a fundamentally different approach?\n3. Should you step back and re-read the error from scratch?\n\nIf stuck 2+ times on the same issue, use /clear and restart with a fresh approach.")
    }
  }'
fi

exit 0
