# Hooks System

## Hook Types

- **UserPromptSubmit**: On user message (environment context injection)
- **PreToolUse**: Before tool execution (validation, parameter modification, blocking)
- **PostToolUse**: After tool execution (auto-format, type checks, warnings, loop detection, tracing)
- **PostToolUseFailure**: After tool failure (root cause analysis, failure tracking)
- **Stop**: When session ends (learning summary, verification)

## Execution Model

Hooks within the same event run **sequentially** in the order listed. Each hook receives the same input and can output JSON to influence Claude's behavior.

| Output Format | When Used | Effect |
|---------------|-----------|--------|
| `{"decision":"block","reason":"..."}` | PreToolUse, Stop | Blocks the action |
| `{"decision":"approve","reason":"..."}` | Any event | Approves with context injected |
| `{"hookSpecificOutput":{...}}` | UserPromptSubmit only | Injects context into conversation |
| No output (exit 0) | Any event | Silent pass-through |

**Important:** If any hook in a chain outputs `"decision":"block"`, the action is blocked regardless of other hooks.

## Provided Hook Scripts (`hooks/` directory)

### UserPromptSubmit (1)
| Script | Matcher | Purpose |
|--------|---------|---------|
| `env-context-injector.sh` | (all) | 세션 시작 시 Git/프로젝트/런타임 환경 정보 자동 주입 (1회, session-specific lock) |

### PreToolUse (2)
| Script | Matcher | Purpose |
|--------|---------|---------|
| `dangerous-command-blocker.sh` | Bash | `rm -rf`, `git push --force`, `git reset --hard`, `git clean -f`, `DROP TABLE` 차단 |
| `secret-detector.sh` | Edit, Write | 하드코딩된 API 키/시크릿 감지 및 차단, `.env`/`.pem`/`.key` 파일 쓰기 차단 |

### PostToolUse (6)
| Script | Matcher | Purpose | Order |
|--------|---------|---------|-------|
| `console-log-warning.sh` | Edit, Write | JS/TS console.log/debug/info/warn/error/trace 경고 | 1st |
| `prettier-format.sh` | Edit, Write | JS/TS/CSS/JSON Prettier 자동 포맷 | 2nd |
| `tsc-check.sh` | Edit, Write | TypeScript 증분 타입 체크 (head -10) | 3rd |
| `ruff-format.sh` | Edit, Write | Python ruff check --fix + format (pyproject.toml 감지) | 4th |
| `loop-detector.sh` | Edit, Write | 같은 파일 4회+ 편집 시 doom loop 경고 (session-specific) | 5th |
| `trace-logger.sh` | (all) | 모든 도구 호출을 `~/.claude/traces/` JSONL로 기록 (7일 보관) | 6th |

### PostToolUseFailure (1)
| Script | Matcher | Purpose |
|--------|---------|---------|
| `failure-explainer.sh` | Bash | 에러 분류 + WHY 3단계 추적 + 반복 실패 에스컬레이션 (3회+) |

### Stop (2)
| Script | Matcher | Purpose |
|--------|---------|---------|
| `pre-completion-check.sh` | (all) | 코드 변경 감지 시 테스트 실행 여부 검증 (Python/JS/TS/Go) |
| `session-learning.sh` | (all) | 세션 학습 요약 리마인더 |

## Harness Engineering 매핑

이 훅들은 2026년 하네스 엔지니어링의 미들웨어 파이프라인을 구현합니다:

```
Agent Request
  → LocalContextMiddleware     (env-context-injector.sh — UserPromptSubmit)
  → Safety Guard              (dangerous-command-blocker.sh + secret-detector.sh — PreToolUse)
  → [Tool Execution]
  → Quality Gate              (console-log, prettier, tsc, ruff — PostToolUse)
  → LoopDetectionMiddleware    (loop-detector.sh — PostToolUse)
  → ExecutionTracing           (trace-logger.sh — PostToolUse)
  → FailureAnalysis           (failure-explainer.sh — PostToolUseFailure)
  → PreCompletionChecklist     (pre-completion-check.sh — Stop)
Agent Response
```

| 미들웨어 패턴 | 훅 구현체 |
|-------------|----------|
| LocalContextMiddleware (환경 주입) | `env-context-injector.sh` — Git/프로젝트/런타임 자동 주입 |
| Safety Guard (안전 장치) | `dangerous-command-blocker.sh` + `secret-detector.sh` |
| Quality Gate (품질 게이트) | `console-log-warning.sh` + `prettier` + `tsc` + `ruff` |
| LoopDetectionMiddleware (반복 방지) | `loop-detector.sh` — 파일별 편집 추적, 4회+ 경고 |
| ExecutionTracing (실행 추적) | `trace-logger.sh` — JSONL 트레이스, 7일 보관 |
| FailureAnalysis (실패 학습) | `failure-explainer.sh` — 에러 분류 + WHY 추적 + 에스컬레이션 |
| PreCompletionChecklist (검증 강제) | `pre-completion-check.sh` — 테스트 실행 검증 |

## Session Isolation

모든 lock 파일은 session-specific (`CLAUDE_SESSION_ID` 또는 `$$` 기반):
- 멀티 세션 동시 실행 시 각 세션이 독립적으로 동작
- `env-context-injector`: 세션당 1회만 주입
- `loop-detector`: 세션별 편집 카운트 독립 추적
- `pre-completion-check`, `session-learning`: 세션별 lock

## settings.json 훅 설정 예시

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/env-context-injector.sh", "timeout": 5 }]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/dangerous-command-blocker.sh", "timeout": 5 }]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/secret-detector.sh", "timeout": 5 }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/console-log-warning.sh", "timeout": 5 },
          { "type": "command", "command": "bash ~/.claude/hooks/prettier-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/tsc-check.sh", "timeout": 30 },
          { "type": "command", "command": "bash ~/.claude/hooks/ruff-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/loop-detector.sh", "timeout": 5 },
          { "type": "command", "command": "bash ~/.claude/hooks/trace-logger.sh", "timeout": 3 }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/console-log-warning.sh", "timeout": 5 },
          { "type": "command", "command": "bash ~/.claude/hooks/prettier-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/tsc-check.sh", "timeout": 30 },
          { "type": "command", "command": "bash ~/.claude/hooks/ruff-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/loop-detector.sh", "timeout": 5 },
          { "type": "command", "command": "bash ~/.claude/hooks/trace-logger.sh", "timeout": 3 }
        ]
      }
    ],
    "PostToolUseFailure": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/failure-explainer.sh", "timeout": 5 }]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/pre-completion-check.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/session-learning.sh", "timeout": 5 }
        ]
      }
    ]
  }
}
```

## Auto-Accept Permissions

Use with caution:
- Enable for trusted, well-defined plans
- Disable for exploratory work
- Never use dangerously-skip-permissions flag
- Configure `allowedTools` in settings instead
