#!/bin/bash
# shellcheck shell=bash
# score-setup.sh — Claude Code 셋업 자동 점수 산출
#
# Usage:
#   bash scripts/score-setup.sh                  # repo root에서 실행 (현재 source 측정)
#   bash scripts/score-setup.sh ~/.claude        # 설치된 ~/.claude 측정
#   bash scripts/score-setup.sh --json           # JSON 출력 (CI 친화)
#
# 출력: SETUP_SCORE_2026-04.md 점수표와 동일 산식. 누구나 재현 가능.
#
# Reference: SETUP_SCORE_2026-04.md "측정 재현 스크립트" 섹션

set -euo pipefail

# 입력 처리
TARGET_DIR="${1:-$(pwd)}"
OUT_JSON=0
if [ "${1:-}" = "--json" ]; then
  TARGET_DIR=$(pwd)
  OUT_JSON=1
elif [ "${2:-}" = "--json" ]; then
  OUT_JSON=1
fi

# settings.json 위치 결정
SETTINGS_FILE=""
for f in "$TARGET_DIR/settings.local.json" "$TARGET_DIR/settings.json"; do
  [ -f "$f" ] && { SETTINGS_FILE="$f"; break; }
done

if [ -z "$SETTINGS_FILE" ]; then
  echo "ERROR: settings.json not found in $TARGET_DIR" >&2
  exit 2
fi

# 자원 카운트
hook_count() { ls "$TARGET_DIR/hooks/"*.sh 2>/dev/null | wc -l | tr -d ' '; }
agent_count() { ls "$TARGET_DIR/agents/"*.md 2>/dev/null | wc -l | tr -d ' '; }
skill_count() { find "$TARGET_DIR/skills" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' '; }
command_count() { ls "$TARGET_DIR/commands/"*.md 2>/dev/null | wc -l | tr -d ' '; }
rule_count() { ls "$TARGET_DIR/rules/"*.md 2>/dev/null | wc -l | tr -d ' '; }
claude_md_lines() {
  local f="$TARGET_DIR/CLAUDE.md"
  [ -f "$f" ] && wc -l < "$f" | tr -d ' ' || echo 0
}

H=$(hook_count); A=$(agent_count); SK=$(skill_count)
C=$(command_count); R=$(rule_count); CMD_LINES=$(claude_md_lines)

# settings.json 분석 — jq가 있으면 사용, 없으면 python fallback (Windows 친화)
if command -v jq >/dev/null 2>&1; then
  EVENTS=$(jq '.hooks | keys | length' "$SETTINGS_FILE" 2>/dev/null || echo 0)
  HANDLERS=$(jq '[.hooks[][].hooks[]] | length' "$SETTINGS_FILE" 2>/dev/null || echo 0)
  ALLOW=$(jq '.permissions.allow | length' "$SETTINGS_FILE" 2>/dev/null || echo 0)
  DENY=$(jq '.permissions.deny | length' "$SETTINGS_FILE" 2>/dev/null || echo 0)
  PLUGINS=$(jq '(.enabledPlugins // {}) | length' "$SETTINGS_FILE" 2>/dev/null || echo 0)
else
  # Python fallback (jq가 없는 Windows/CI 환경) — env로 경로 전달 (공백 안전)
  STATS=$(SETTINGS_PATH="$SETTINGS_FILE" PYTHONIOENCODING=utf-8 python -c '
import json, os
with open(os.environ["SETTINGS_PATH"], encoding="utf-8") as f: s = json.load(f)
hooks = s.get("hooks", {})
print(len(hooks),
      sum(len(h.get("hooks", [])) for ev in hooks.values() for h in ev),
      len(s.get("permissions", {}).get("allow", [])),
      len(s.get("permissions", {}).get("deny", [])),
      len(s.get("enabledPlugins", {})))
' 2>/dev/null)
  read -r EVENTS HANDLERS ALLOW DENY PLUGINS <<< "$STATS"
  EVENTS=${EVENTS:-0}; HANDLERS=${HANDLERS:-0}
  ALLOW=${ALLOW:-0}; DENY=${DENY:-0}; PLUGINS=${PLUGINS:-0}
fi

# 점수 산출 함수 (각 차원: 측정 → 0~100)
# 산식 근거: SETUP_SCORE_2026-04.md v3 표
score_harness() {
  # 14 events 풀커버리지 = 98점, 비례 (10/14 = 70점 등)
  local base=$((EVENTS * 100 / 14))
  # hook handlers 풍부도 보너스 (30+ = +5)
  [ "$HANDLERS" -ge 30 ] && base=$((base + 5))
  [ "$base" -gt 98 ] && base=98
  echo "$base"
}
score_subagent() {
  # 24 agents 기준 95. 20 미만은 비례 감점.
  if [ "$A" -ge 24 ]; then echo 95
  elif [ "$A" -ge 20 ]; then echo 88
  elif [ "$A" -ge 15 ]; then echo 75
  elif [ "$A" -ge 10 ]; then echo 60
  else echo $((A * 6))
  fi
}
score_skills() {
  # 38 skills = 96, 1 skill = 96/38
  local s=$((SK * 96 / 38))
  [ "$s" -gt 96 ] && s=96
  echo "$s"
}
score_commands() {
  # 33 commands = 94
  local s=$((C * 94 / 33))
  [ "$s" -gt 94 ] && s=94
  echo "$s"
}
score_rules() {
  # rules 16 = 95, CLAUDE.md 60줄 이하 보너스
  local s=$((R * 95 / 16))
  [ "$s" -gt 95 ] && s=95
  if [ "$CMD_LINES" -le 60 ] && [ "$CMD_LINES" -gt 0 ]; then
    s=$((s + 0))  # 이미 산식에 반영됨
  fi
  echo "$s"
}
score_perms() {
  # 안전한 zone: allow 20-50, deny 2+
  local s=85
  if [ "$ALLOW" -lt 15 ]; then s=70
  elif [ "$ALLOW" -gt 80 ]; then s=70  # 너무 많이 열면 위험
  fi
  [ "$DENY" -lt 2 ] && s=$((s - 10))
  echo "$s"
}
score_session() {
  # session-isolation: 전부 lock 사용 가정 — 정성평가, 93 고정
  echo 93
}
score_mcp() {
  # mcp-patterns.md 존재만 확인. 실 server 수는 settings에 안 보일 수도.
  [ -f "$TARGET_DIR/rules/mcp-patterns.md" ] && echo 85 || echo 60
}
score_marketplace() {
  # 자체 marketplace manifest가 있으면 90, plugins 활성화만 있으면 75, 없으면 50
  if [ -f "$TARGET_DIR/.claude-plugin/marketplace.json" ] || [ -f "$TARGET_DIR/marketplace.json" ]; then
    echo 90
  elif [ "$PLUGINS" -ge 1 ]; then echo 75
  else echo 50
  fi
}
score_trend() {
  # 2026 트렌드 정합성: spec-driven, error-recovery, context-guard 같은 신트렌드 reflect
  local s=80
  [ -d "$TARGET_DIR/skills/spec-driven" ] && s=$((s + 5))
  [ -d "$TARGET_DIR/skills/error-recovery" ] && s=$((s + 5))
  [ -f "$TARGET_DIR/hooks/context-guard.sh" ] && s=$((s + 5))
  [ -f "$TARGET_DIR/rules/senior-fundamentals.md" ] && s=$((s + 4))
  [ "$s" -gt 99 ] && s=99
  echo "$s"
}

S_HARNESS=$(score_harness)
S_SUBAGENT=$(score_subagent)
S_SKILLS=$(score_skills)
S_COMMANDS=$(score_commands)
S_RULES=$(score_rules)
S_PERMS=$(score_perms)
S_SESSION=$(score_session)
S_MCP=$(score_mcp)
S_MARKET=$(score_marketplace)
S_TREND=$(score_trend)

TOTAL=$((S_HARNESS + S_SUBAGENT + S_SKILLS + S_COMMANDS + S_RULES + S_PERMS + S_SESSION + S_MCP + S_MARKET + S_TREND))

# 등급
if [ "$TOTAL" -ge 950 ]; then GRADE="S"
elif [ "$TOTAL" -ge 900 ]; then GRADE="A+"
elif [ "$TOTAL" -ge 850 ]; then GRADE="A"
elif [ "$TOTAL" -ge 800 ]; then GRADE="A-"
elif [ "$TOTAL" -ge 700 ]; then GRADE="B+"
elif [ "$TOTAL" -ge 600 ]; then GRADE="B"
else GRADE="C 이하"
fi

# 출력
if [ "$OUT_JSON" -eq 1 ]; then
  cat <<EOF
{
  "target": "$TARGET_DIR",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "resources": {
    "hooks": $H, "agents": $A, "skills": $SK, "commands": $C, "rules": $R,
    "events": $EVENTS, "handlers": $HANDLERS,
    "allow": $ALLOW, "deny": $DENY, "plugins": $PLUGINS,
    "claudeMdLines": $CMD_LINES
  },
  "scores": {
    "harness": $S_HARNESS, "subagent": $S_SUBAGENT, "skills": $S_SKILLS,
    "commands": $S_COMMANDS, "rules": $S_RULES, "permissions": $S_PERMS,
    "sessionIsolation": $S_SESSION, "mcp": $S_MCP,
    "marketplace": $S_MARKET, "trendAlignment": $S_TREND
  },
  "total": $TOTAL,
  "grade": "$GRADE"
}
EOF
else
  cat <<EOF
═══════════════════════════════════════════════════════════
 Claude Code 셋업 점수 — $(date '+%Y-%m-%d %H:%M')
 대상: $TARGET_DIR
═══════════════════════════════════════════════════════════

[자원 카운트]
  hooks:    $H        skills:   $SK        rules:    $R
  agents:   $A        commands: $C        CLAUDE.md: $CMD_LINES lines
  events:   $EVENTS/14    handlers: $HANDLERS
  allow:    $ALLOW    deny:     $DENY    plugins:  $PLUGINS

[차원별 점수]
  Harness coverage      $S_HARNESS / 98
  Subagent library      $S_SUBAGENT / 95
  Skills breadth        $S_SKILLS / 96
  Commands + auto-link  $S_COMMANDS / 94
  Rules clarity         $S_RULES / 95
  Permissions hygiene   $S_PERMS / 90
  Session isolation     $S_SESSION / 95
  MCP integration       $S_MCP / 90
  Plugin / Marketplace  $S_MARKET / 90
  Trend alignment 2026  $S_TREND / 99

═══════════════════════════════════════════════════════════
 합계: $TOTAL / 1000   등급: $GRADE
═══════════════════════════════════════════════════════════

EOF
fi
