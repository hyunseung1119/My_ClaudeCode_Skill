# Hooks System

## Hook Types

- **UserPromptSubmit**: On user message (environment context injection)
- **PreToolUse**: Before tool execution (validation, parameter modification, blocking)
- **PostToolUse**: After tool execution (auto-format, type checks, warnings, loop detection)
- **PostToolUseFailure**: After tool failure (root cause analysis, learning)
- **Stop**: When session ends (learning summary, verification)

## Provided Hook Scripts (`hooks/` directory)

### UserPromptSubmit
| Script | Matcher | Purpose |
|--------|---------|---------|
| `env-context-injector.sh` | (all) | 세션 시작 시 Git/프로젝트/런타임 환경 정보 자동 주입 (1회) |

### PreToolUse
| Script | Matcher | Purpose |
|--------|---------|---------|
| `dangerous-command-blocker.sh` | Bash | `rm -rf`, `git push --force`, `git reset --hard`, `git clean -f`, `DROP TABLE` 차단 |
| `secret-detector.sh` | Edit, Write | 하드코딩된 API 키/시크릿 감지 및 차단, `.env`/`.pem`/`.key` 파일 쓰기 차단 |

### PostToolUse
| Script | Matcher | Purpose |
|--------|---------|---------|
| `console-log-warning.sh` | Edit, Write | JS/TS 파일에 console.log/debug/info 추가 시 경고 |
| `prettier-format.sh` | Edit, Write | JS/TS/CSS/JSON 자동 포맷 (프로젝트 node_modules 의존) |
| `tsc-check.sh` | Edit, Write | TypeScript 타입 체크 (프로젝트 tsconfig 의존) |
| `ruff-format.sh` | Edit, Write | Python ruff check --fix + ruff format (venv 또는 글로벌) |
| `loop-detector.sh` | Edit, Write | 같은 파일 4회+ 편집 시 doom loop 경고 및 재고 강제 |

### PostToolUseFailure
| Script | Matcher | Purpose |
|--------|---------|---------|
| `failure-explainer.sh` | Bash | 에러 분해, WHY 2~3단계 추적, 방지 팁 강제 |

### Stop
| Script | Matcher | Purpose |
|--------|---------|---------|
| `pre-completion-check.sh` | (all) | 코드 변경 감지 시 테스트 실행 여부 검증, 미실행 시 경고 |
| `session-learning.sh` | (all) | 세션 학습 요약 리마인더 |

## Harness Engineering 매핑

이 훅들은 2026년 하네스 엔지니어링의 4대 미들웨어 패턴을 구현합니다:

| 미들웨어 패턴 | 훅 구현체 |
|-------------|----------|
| PreCompletionChecklist (검증 강제) | `pre-completion-check.sh` (Stop) — 코드 변경 시 테스트 실행 검증 |
| LocalContextMiddleware (환경 주입) | `env-context-injector.sh` (UserPromptSubmit) — Git/프로젝트/런타임 자동 주입 |
| LoopDetectionMiddleware (반복 방지) | `loop-detector.sh` (PostToolUse) — 파일별 편집 횟수 추적, 4회+ 경고 |
| Safety Guard (안전 장치) | `dangerous-command-blocker.sh` + `secret-detector.sh` (PreToolUse) |
| Failure Analysis (실패 학습) | `failure-explainer.sh` (PostToolUseFailure) — 에러 WHY 추적 |

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
          { "type": "command", "command": "bash ~/.claude/hooks/loop-detector.sh", "timeout": 5 }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/console-log-warning.sh", "timeout": 5 },
          { "type": "command", "command": "bash ~/.claude/hooks/prettier-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/tsc-check.sh", "timeout": 30 },
          { "type": "command", "command": "bash ~/.claude/hooks/ruff-format.sh", "timeout": 10 },
          { "type": "command", "command": "bash ~/.claude/hooks/loop-detector.sh", "timeout": 5 }
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
