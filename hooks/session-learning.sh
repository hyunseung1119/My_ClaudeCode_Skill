#!/bin/bash
# shellcheck shell=bash
# Stop: Session learning reminder
# Reminds to extract patterns before session ends

INPUT=$(cat)

# File-based lock to prevent infinite loop
LOCK_FILE="${TMPDIR:-/tmp}/claude-session-learning-lock"
trap 'rm -f "$LOCK_FILE"' EXIT

if [ -f "$LOCK_FILE" ]; then
  exit 0
fi
touch "$LOCK_FILE"

jq -n '{
  decision: "approve",
  reason: "[LEARNING] If new patterns or error resolutions were discovered in this session, summarize the key 1-2 takeaways."
}'

exit 0
