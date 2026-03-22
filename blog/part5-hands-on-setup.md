# Part 5. 실전 셋업 따라하기

> 지금까지 배운 하네스 엔지니어링을 **15분 안에 내 환경에 적용**합니다.

## 전제 조건

```bash
# Claude Code 설치 확인
claude --version

# 없으면 설치
npm install -g @anthropic-ai/claude-code
```

## Step 1: 디렉토리 구조 만들기

```bash
mkdir -p ~/.claude/hooks
mkdir -p ~/.claude/rules
```

```
~/.claude/
├── settings.json    # 훅 등록 + 권한 설정
├── hooks/           # 자동화 스크립트
│   ├── env-context-injector.sh
│   ├── dangerous-command-blocker.sh
│   ├── secret-detector.sh
│   ├── loop-detector.sh
│   └── ...
└── rules/           # AI 행동 규칙
    ├── workflow.md
    ├── coding-style.md
    └── ...
```

## Step 2: 핵심 훅 3개 만들기 (최소 셋업)

처음부터 11개 다 만들 필요 없습니다. **이 3개만 있어도 80% 효과**입니다.

### 2-1. dangerous-command-blocker.sh

```bash
cat > ~/.claude/hooks/dangerous-command-blocker.sh << 'EOF'
#!/bin/bash
# 위험한 명령 차단

COMMAND="${TOOL_INPUT:-}"

# rm -rf 차단
if echo "$COMMAND" | grep -qE 'rm\s+(-[a-zA-Z]*r[a-zA-Z]*f|--recursive.*--force|-rf)'; then
  echo '{"decision":"block","reason":"[SAFETY] rm -rf 감지. 더 안전한 방법을 사용하세요."}'
  exit 0
fi

# git push --force 차단
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--force'; then
  echo '{"decision":"block","reason":"[SAFETY] force push 감지. 원격 히스토리가 손상될 수 있습니다."}'
  exit 0
fi

# git reset --hard 차단
if echo "$COMMAND" | grep -qE 'git\s+reset\s+--hard'; then
  echo '{"decision":"block","reason":"[SAFETY] git reset --hard 감지. 변경사항이 영구 삭제됩니다."}'
  exit 0
fi

exit 0
EOF
chmod +x ~/.claude/hooks/dangerous-command-blocker.sh
```

### 2-2. secret-detector.sh

```bash
cat > ~/.claude/hooks/secret-detector.sh << 'EOF'
#!/bin/bash
# 하드코딩된 시크릿 감지

FILE_PATH="${TOOL_INPUT_FILE_PATH:-}"
CONTENT="${TOOL_INPUT:-}"

# .env, .pem, .key 파일 쓰기 차단
if echo "$FILE_PATH" | grep -qE '\.(env|pem|key)$'; then
  echo '{"decision":"block","reason":"[SECURITY] 시크릿 파일 직접 작성 차단. .env.example을 사용하세요."}'
  exit 0
fi

# API 키 패턴 감지
if echo "$CONTENT" | grep -qE '(sk-[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16}|ghp_[a-zA-Z0-9]{36})'; then
  echo '{"decision":"block","reason":"[SECURITY] 하드코딩된 API 키 감지. 환경 변수를 사용하세요."}'
  exit 0
fi

exit 0
EOF
chmod +x ~/.claude/hooks/secret-detector.sh
```

### 2-3. loop-detector.sh

```bash
cat > ~/.claude/hooks/loop-detector.sh << 'EOF'
#!/bin/bash
# 같은 파일 반복 편집 감지 (doom loop 방지)

FILE_PATH="${TOOL_INPUT_FILE_PATH:-}"
SESSION_ID="${CLAUDE_SESSION_ID:-$$}"
COUNTER_DIR="/tmp/claude-loop-${SESSION_ID}"
THRESHOLD=4

if [ -z "$FILE_PATH" ]; then exit 0; fi

mkdir -p "$COUNTER_DIR"
SAFE_NAME=$(echo "$FILE_PATH" | tr '/' '_')
COUNTER_FILE="$COUNTER_DIR/$SAFE_NAME"

COUNT=1
if [ -f "$COUNTER_FILE" ]; then
  COUNT=$(( $(cat "$COUNTER_FILE") + 1 ))
fi
echo "$COUNT" > "$COUNTER_FILE"

if [ "$COUNT" -ge "$THRESHOLD" ]; then
  echo "{\"decision\":\"approve\",\"reason\":\"[WARNING] ${FILE_PATH} 를 ${COUNT}회 수정했습니다. 같은 접근으로는 해결이 안 될 수 있습니다. 근본 원인을 다시 분석해보세요.\"}"
fi

exit 0
EOF
chmod +x ~/.claude/hooks/loop-detector.sh
```

## Step 3: settings.json 설정

```bash
cat > ~/.claude/settings.json << 'SETTINGS'
{
  "permissions": {
    "allow": ["Edit", "Write", "Read", "Grep", "Glob", "WebSearch"],
    "deny": ["Bash(rm -rf:*)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/hooks/dangerous-command-blocker.sh",
          "timeout": 5
        }]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/hooks/secret-detector.sh",
          "timeout": 5
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/hooks/loop-detector.sh",
          "timeout": 5
        }]
      }
    ]
  }
}
SETTINGS
```

## Step 4: 테스트

```bash
# Claude Code 시작
claude

# 테스트 1: 위험한 명령 차단 확인
> "rm -rf / 실행해줘"
# → [SAFETY] 차단됨

# 테스트 2: 시크릿 감지 확인
> ".env 파일에 API_KEY=sk-1234 써줘"
# → [SECURITY] 차단됨

# 테스트 3: 루프 감지 확인
> "main.py를 5번 연속 수정해봐"
# → 4번째부터 [WARNING] 경고
```

## Step 5: 규칙 파일 추가 (선택)

프로젝트 루트에 `CLAUDE.md`를 만듭니다:

```markdown
# 프로젝트 규칙

## 코드 스타일
- 함수는 50줄 이내
- 파일은 400줄 이내
- TypeScript strict mode 사용

## 워크플로우
- 코드 작성 전에 반드시 계획을 설명할 것
- 테스트를 먼저 작성할 것 (TDD)
- 테스트를 약하게 바꿔서 통과시키지 말 것

## 빌드/실행
- npm run dev: 개발 서버
- npm test: 테스트 실행
- npm run build: 프로덕션 빌드
```

## Step 6: 점진적으로 확장

| 단계 | 추가할 훅 | 효과 |
|------|---------|------|
| 1주차 | 위 3개 (차단+감지+루프) | 기본 안전장치 |
| 2주차 | prettier-format, tsc-check | 자동 코드 품질 |
| 3주차 | env-context-injector | 세션 시작 자동화 |
| 4주차 | pre-completion-check | 종료 전 검증 |
| 이후 | failure-explainer, trace-logger | 실패 분석 + 추적 |

**핵심 원칙: 단순하게 시작하고, 문제가 생기는 곳에 훅을 추가합니다.**

## 완성된 파이프라인 (우리 셋업)

```
[세션 시작]
  env-context-injector → 환경 자동 브리핑

[코드 작성 중]
  dangerous-command-blocker → 위험 명령 차단
  secret-detector → API 키 감지
  dependency-audit → 패키지 안전 검사

[코드 작성 후]
  prettier/tsc/ruff → 자동 포맷+타입 체크
  console-log-warning → 디버그 로그 경고
  loop-detector → 반복 편집 감지
  trace-logger → 실행 기록

[실패 시]
  failure-explainer → WHY 3단계 분석

[세션 종료]
  pre-completion-check → 테스트 실행 확인
  session-learning → 학습 정리
```

## 체크리스트

셋업이 잘 됐는지 확인:

- [ ] `~/.claude/settings.json` 존재
- [ ] `~/.claude/hooks/` 에 스크립트 파일 존재
- [ ] 스크립트에 실행 권한 (`chmod +x`)
- [ ] `rm -rf` 입력 시 차단되는지 확인
- [ ] `.env` 파일 쓰기 시도 시 차단되는지 확인
- [ ] 프로젝트에 `CLAUDE.md` 존재

## 마무리

하네스 엔지니어링은 **모델을 바꾸지 않고 결과를 개선하는 방법**입니다.

3개 훅으로 시작해서, 문제가 보이면 하나씩 추가하세요. 한 달이면 여러분만의 최적화된 AI 개발 환경이 완성됩니다.

그리고 기억하세요 — **Rippable하게 만드세요.** AI가 더 똑똑해지면, 불필요해진 훅은 빼면 됩니다.

---

> **시리즈 목차**
> - Part 1. 왜 하네스 엔지니어링인가?
> - Part 2. CLAUDE.md — AI에게 주는 업무 매뉴얼
> - Part 3. 훅(Hooks) — 자동화의 핵심
> - Part 4. 에이전트 오케스트레이션 — 혼자 다 하지 마라
> - **Part 5. 실전 셋업 따라하기** (현재)
>
> **참고 자료**
> - [Anthropic 공식: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
> - [Claude Code 공식: Best Practices](https://code.claude.com/docs/en/best-practices)
> - [Claude Code 공식: Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
> - [LangChain: Improving Deep Agents with Harness Engineering](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/)
> - [Harness Engineering 101](https://muraco.ai/en/articles/harness-engineering-claude-code-codex/)
