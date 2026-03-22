# My Claude Code Settings

Claude Code CLI를 위한 종합 설정 저장소.
30개 스킬, 23개 에이전트, 30개 커맨드, 9개 규칙, **12개 훅 스크립트(하네스 미들웨어)** 를 포함합니다.

> **최신 업데이트: 2026-03-13** — 하네스 미들웨어 완성 (12개 훅, JSON 출력 통일, 실행 트레이싱, 세션 격리, 에이전트 전체 문서화)

---

## 하네스 엔지니어링 (2026)

> 모델을 바꾸지 않고 하네스(모델을 감싸는 시스템)만 개선해 성능을 올리는 방법론.
> LangChain: 동일 모델로 Terminal Bench 2.0에서 52.8% → 66.5% (+13.7점, Top 30 → Top 5).

이 저장소는 Claude Code의 훅 시스템으로 7대 하네스 미들웨어 패턴을 구현합니다:

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

| 미들웨어 | 훅 스크립트 | 역할 |
|----------|-----------|------|
| Local Context | `env-context-injector.sh` | 세션 시작 시 Git/프로젝트/런타임 환경 자동 주입 |
| Safety Guard | `dangerous-command-blocker.sh` | `rm -rf`, `--force` push, `DROP TABLE` 차단 |
| Safety Guard | `secret-detector.sh` | 하드코딩된 API 키/시크릿 감지 및 차단 |
| Quality Gate | `console-log-warning.sh` | console.log/debug/warn/error/trace 경고 |
| Quality Gate | `prettier-format.sh` | JS/TS/CSS/JSON 자동 포맷 |
| Quality Gate | `tsc-check.sh` | TypeScript 증분 타입 체크 |
| Quality Gate | `ruff-format.sh` | Python ruff lint + format (pyproject.toml 감지) |
| Loop Detection | `loop-detector.sh` | 같은 파일 4회+ 편집 시 doom loop 경고 |
| Execution Tracing | `trace-logger.sh` | 모든 도구 호출을 JSONL로 기록 (7일 보관) |
| Failure Analysis | `failure-explainer.sh` | 에러 분류 + WHY 3단계 추적 + 에스컬레이션 |
| PreCompletion | `pre-completion-check.sh` | 코드 변경 시 테스트 실행 여부 검증 |
| Session Learning | `session-learning.sh` | 세션 종료 시 학습 패턴 추출 |

### 핵심 설계 원칙

- **JSON 출력 통일**: 모든 훅이 `{"decision":"approve|block","reason":"..."}` 형식 사용 (UserPromptSubmit 제외)
- **세션 격리**: 모든 lock/tracking 파일이 session-specific → 멀티 세션 안전
- **크로스 플랫폼**: `shasum` > `md5sum` > `md5` 폴백 체인 (macOS/Linux 호환)
- **실행 추적**: `trace-logger.sh`가 `~/.claude/traces/` 에 JSONL 기록 → 하네스 디버깅 가능

---

## 프로젝트 구조

```
├── CLAUDE.md                     ← 글로벌 지침 (on-demand 규칙 라우터)
├── settings.local.json           ← 설정 (권한, 12개 훅 배선)
├── setup.sh / setup.ps1          ← 설치 스크립트
├── uninstall.sh / uninstall.ps1  ← 제거 스크립트
│
├── hooks/ (12개)                 ← 하네스 미들웨어 훅 스크립트
│   └── *.sh                      ← jq 기반 통일된 JSON 출력
│
├── rules/ (9개)                  ← 규칙 (ALWAYS 2개 + on-demand 7개)
│   ├── workflow.md               ← [ALWAYS] Explain→Approve→Execute
│   ├── harness-engineering.md    ← [ALWAYS] 하네스 미들웨어 패턴
│   └── *.md                      ← [on-demand] 상황별 참조
│
├── skills/ (30개)                ← 전문 스킬 (/skill-name으로 활성화)
├── agents/ (23개)                ← 특화 서브 에이전트
└── commands/ (30개)              ← CLI 커맨드 (/command-name)
```

---

## 핵심 설정

### CLAUDE.md (on-demand 로딩)

CLAUDE.md는 **라우터** 역할만 합니다. 항상 로드되는 규칙은 2개뿐이고, 나머지는 상황별로 참조합니다:

| 로드 방식 | 규칙 | 내용 |
|-----------|------|------|
| **ALWAYS** | `workflow.md` | Explain→Approve→Execute, Evidence Rule, Learning Mode, Session Learning |
| **ALWAYS** | `harness-engineering.md` | 7대 미들웨어 패턴, 추론 예산 배분 |
| on-demand | `coding-style.md` | 함수형 코어, 불변성, Result Type, 복잡도 <10 |
| on-demand | `testing.md` | TDD (RED→GREEN→REFACTOR), 80%+ 커버리지 |
| on-demand | `security.md` | OWASP API Top 10, 시크릿 관리 |
| on-demand | `agents.md` | 23개 에이전트 오케스트레이션 (4개 카테고리) |
| on-demand | `git-workflow.md` | Conventional Commits, PR 워크플로우 |
| on-demand | `hooks.md` | 12개 훅 스크립트 설정 + 실행 모델 |
| on-demand | `context-management.md` | 세션 라이프사이클, 컨텍스트 압축 |

### settings.local.json

```jsonc
{
  "permissions": { "allow": [...], "deny": ["rm -rf", "del", "format"] },
  "hooks": {
    "UserPromptSubmit":  ["env-context-injector.sh"],
    "PreToolUse":        ["dangerous-command-blocker.sh", "secret-detector.sh"],
    "PostToolUse":       ["console-log-warning.sh", "prettier-format.sh", "tsc-check.sh", "ruff-format.sh", "loop-detector.sh", "trace-logger.sh"],
    "PostToolUseFailure": ["failure-explainer.sh"],
    "Stop":              ["pre-completion-check.sh", "session-learning.sh"]
  }
}
```

### 워크플로우: Explain → Approve → Execute

```
1. Explain  — 문제 분석 + WHY + 대안 트레이드오프 (코드 없이)
2. Approve  — 사용자 확인 후 진행
3. Execute  — 코드 작성
4. Reflect  — 핵심 설계 결정 1~2문장 요약
```

에러 수정: 근본 원인(WHY) 먼저 → 에러 메시지 분해 → 승인 → 수정 → 방지 팁 1줄.

---

## 스킬 (30개)

`/skill-name`으로 활성화. 각 스킬은 SKILL.md 문서 + 구현 코드를 포함.

### 제품 기획
| 스킬 | 설명 |
|------|------|
| `product-planner` | 시니어 PM 수준 제품 기획 (TAM/SAM/SOM, JTBD, RICE) |
| `chatbot-designer` | LLM Agent Architect — 대화형 AI 시스템 설계 |
| `llm-app-planner` | LLM 앱 아키텍처 (RAG vs Agent vs Fine-tuning 비교) |

### 개발
| 스킬 | 설명 |
|------|------|
| `architecture-design` | 시스템 설계 + ADR (Clean Architecture, DDD) |
| `backend-api` | FastAPI 구현 (라우터, 미들웨어, Pydantic) |
| `react-component` | Anti-AI Frontend Design — 인간 중심 프론트엔드 |
| `api-design` | RESTful/GraphQL API 설계 (OpenAPI 3.x) |
| `api-spec-generator` | API 명세서 자동 생성 |
| `clean-code` | Project Guardian — 클린 코드, Docker, DB, CI/CD |
| `refactoring` | 안전한 리팩토링 (동작 변경 없이 구조 개선) |
| `debugging` | 체계적 디버깅 (가설 기반, 이분 탐색, RCA) |
| `performance-optimization` | 성능 분석/최적화 |
| `mcp-integration` | Model Context Protocol 서버 설정/연동 |

### AI / 연구
| 스킬 | 설명 |
|------|------|
| `rag-2.0` | 고급 RAG (Hybrid Search, GraphRAG) |
| `ml-training` | ML 모델 학습/평가, 임베딩, 벡터 검색 |
| `agent-evaluator` | AI 에이전트 자동 테스트/평가 |
| `agentic-workflows` | 멀티 에이전트 시스템 (ReAct, Plan-Execute) |
| `ai-developer-practice` | AI 개발자 실무 7대 역량 |
| `ai-research-integration` | 논문 조사/평가/POC |
| `research-agent-tech` | LLM/Agent 최신 트렌드 |
| `prompt-optimizer` | 프롬프트 엔지니어링 + LangGraph 최적화 |

### 문서 / 품질
| 스킬 | 설명 |
|------|------|
| `code-review` | 5-Layer 코드 리뷰 |
| `security-audit` | OWASP Top 10 보안 감사 |
| `tdd-workflow` | TDD 워크플로우 (Red-Green-Refactor) |
| `documentation-gen` | 기술 문서 자동 생성 |
| `dev-journal` | 개발 일지 자동화 |
| `frontend-codemap` | 프론트엔드 코드맵 |
| `context-compressor` | 컨텍스트 압축으로 토큰 최적화 |
| `git-workflow` | 고급 Git (Conventional Commits, 자동 PR) |
| `developer-growth` | 개발자 성장 프레임워크 |

---

## 에이전트 (23개)

자동으로 트리거되는 특화 서브 에이전트 (4개 카테고리):

### Core (7) — 필수 자동 트리거
| 에이전트 | 역할 | 트리거 |
|----------|------|--------|
| planner | 복잡한 기능/리팩토링 계획 | 기능 요청 시 (mandatory) |
| code-reviewer | 코드 품질/보안/유지보수 리뷰 | 코드 작성 후 (mandatory) |
| tdd-guide | TDD 워크플로우 강제 | 새 기능, 버그 수정 |
| security-reviewer | 보안 취약점 탐지 | 인증/API/입력 처리 |
| build-error-resolver | 빌드/타입 에러 해결 | 빌드 실패 |
| debugger | 버그 진단 및 수정 | 런타임 에러, 테스트 실패 |
| architect | 시스템 설계 결정 | 아키텍처 변경 |

### Quality & Review (9) — 도메인별 리뷰
| 에이전트 | 역할 |
|----------|------|
| a11y-reviewer | WCAG 2.1 접근성 |
| database-reviewer | PostgreSQL/Supabase 최적화 |
| go-reviewer | Go 코드 리뷰 |
| go-build-resolver | Go 빌드 에러 |
| graphql-expert | GraphQL 스키마/리졸버 |
| rust-expert | Rust 안전성/성능 |
| refactor-cleaner | 데드코드 제거 |
| performance-optimizer | 성능 최적화 |
| doc-updater | 문서/코드맵 업데이트 |

### Domain-Specific (4) — 전문 도메인
| 에이전트 | 역할 |
|----------|------|
| react-agent | React 컴포넌트/상태관리 |
| e2e-runner | Playwright E2E 테스트 |
| infrastructure-agent | K8s/Terraform/Docker/CI |
| vector-db-agent | 벡터 검색/RAG 파이프라인 |

### Meta & Orchestration (3) — 메타 추론
| 에이전트 | 역할 |
|----------|------|
| coordinator | 멀티 에이전트 오케스트레이션 |
| critic-agent | 자기 비판/반복 정제 (CRITIC) |
| tree-of-thoughts | 다경로 탐색/트레이드오프 |

---

## 커맨드 (30개)

`/command-name`으로 실행:

| 카테고리 | 커맨드 |
|----------|--------|
| **핵심** | `/plan` `/tdd` `/code-review` `/build-fix` `/verify` `/checkpoint` |
| **프론트엔드** | `/modern-frontend` `/frontend-codemap` `/update-codemaps` `/e2e` |
| **문서/분석** | `/update-docs` `/token-analysis` `/test-coverage` `/eval` `/learn` |
| **멀티에이전트** | `/multi-agent` `/orchestrate` `/evolve` `/handoff` `/define-dod` |
| **리팩토링** | `/refactor-clean` `/skill-create` `/setup-pm` |
| **Go/Rust** | `/go-build` `/go-review` `/go-test` `/rust` |
| **설정** | `/instinct-export` `/instinct-import` `/instinct-status` |

---

## 설치

### 자동 설치

**Windows (PowerShell):**
```powershell
git clone https://github.com/hyunseung1119/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
.\setup.ps1
```

**Linux / macOS:**
```bash
git clone https://github.com/hyunseung1119/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
./setup.sh
```

설치 스크립트는 `~/.claude/`에 심볼릭 링크를 생성합니다:
- `skills/`, `agents/`, `rules/` — 스킬, 에이전트, 규칙
- `hooks/` — 하네스 미들웨어 훅 스크립트 (chmod +x 자동 적용)

`git pull`로 자동 업데이트됩니다.

### 제거

```bash
./uninstall.sh     # Linux/macOS
.\uninstall.ps1    # Windows
```

---

## 구성 요약

| 항목 | 수량 | 설명 |
|------|------|------|
| Skills | 30 | 전문 스킬 (기획, 개발, AI, 문서, 품질) |
| Agents | 23 | 자동 트리거 서브 에이전트 (4개 카테고리) |
| Commands | 30 | CLI 커맨드 |
| Rules | 9 | ALWAYS 2개 + on-demand 7개 |
| Hooks | 14 | 하네스 미들웨어 (UserPromptSubmit 1, PreToolUse 2, PostToolUse 7, PostToolUseFailure 1, Stop 2, 분석 1) |
| Tracing | JSONL | `~/.claude/traces/` 7일 보관, 하네스 디버깅용 |
| 테스트 커버리지 | 80%+ | TDD 필수 |

---

## 튜토리얼 & 학습 가이드

> Claude Code를 처음 접하는 동료를 위한 단계별 가이드입니다.

### 1. 하네스 엔지니어링이란?

AI 코딩 도구의 결과가 들쭉날쭉하다면, **모델을 바꿀 게 아니라 하네스를 바꿔야** 합니다.

하네스(harness)는 말에게 씌우는 고삐처럼, **AI를 감싸는 시스템 전체**를 의미합니다. LangChain은 하네스만 개선해서 같은 모델로 벤치마크 52.8% → 66.5%를 달성했습니다.

하네스의 3축:

| 축 | 역할 | 비유 | 이 저장소의 구현 |
|----|------|------|---------------|
| **System Prompt** | AI 행동 규칙 | 신입 온보딩 매뉴얼 | `rules/` (9개 규칙 파일) |
| **Tools** | AI가 쓸 수 있는 도구 | 전문가 팀 구성 | `agents/` (23개 에이전트) |
| **Middleware** | 자동 검사/가드레일 | 공장 품질 검사 라인 | `hooks/` (12개 훅 스크립트) |

### 2. 규칙 파일 (rules/) — AI에게 주는 업무 매뉴얼

CLAUDE.md와 rules/는 매 세션 시작 시 AI가 자동으로 읽는 규칙서입니다. AI는 세션마다 기억이 리셋되므로, **항상 적용될 규칙**을 파일로 관리합니다.

#### 핵심 규칙 요약

| 규칙 파일 | 한줄 설명 | 없으면 어떤 일이? |
|----------|---------|----------------|
| `workflow.md` | "코드 쓰기 전에 설명→승인→실행" | AI가 질문하자마자 코드부터 500줄 씀 |
| `coding-style.md` | "함수 50줄, 파일 400줄 제한" | 200줄짜리 함수가 나옴 |
| `testing.md` | "테스트 먼저 쓰고, 약하게 바꾸지 마" | 테스트를 삭제해서 "통과"시킴 |
| `security.md` | "API 키 하드코딩 금지" | `api_key = "sk-1234..."` 작성 |
| `context-management.md` | "70%에서 정리, 80% 넘기지 마" | 대화 후반에 앞부분을 까먹음 |
| `agents.md` | "상황별 전문가 에이전트 자동 투입" | 혼자 다 하다가 보안 허점 놓침 |

#### 예시: workflow.md의 효과

```
[규칙 없을 때]
사용자: "로그인 기능 만들어줘"
AI: (바로 코드 500줄 작성) → 방향 틀림 → 다시 작성 → 시간 낭비

[규칙 있을 때]
사용자: "로그인 기능 만들어줘"
AI: "두 가지 접근법이 있습니다:
     Option A: JWT — 확장성 좋음, 토큰 관리 필요
     Option B: 세션 — 단순, 서버 부하
     어느 쪽으로 할까요?"
사용자: "A로"
AI: (그제서야 코드 작성)
```

#### 팁: WHY를 같이 써라

```markdown
# 나쁜 예
- TypeScript strict mode 사용

# 좋은 예
- TypeScript strict mode 사용 — implicit any로 프로덕션 버그가 발생한 적이 있음
```

WHY가 있으면 AI가 예외 상황에서도 올바른 판단을 합니다.

### 3. 훅 (hooks/) — 자동화의 핵심

훅은 **특정 이벤트 발생 시 자동 실행되는 스크립트**입니다. "100% 매번 실행돼야 하는 것"은 훅으로, "판단이 필요한 가이드라인"은 규칙으로 분리합니다.

#### 훅 실행 타이밍

```
사용자 메시지 입력 ─── UserPromptSubmit
     │
AI가 도구 실행 전 ─── PreToolUse (차단 가능)
     │
도구 실행 성공 ─────── PostToolUse (자동 처리)
도구 실행 실패 ─────── PostToolUseFailure (분석)
     │
AI 작업 완료 ──────── Stop (최종 검증)
```

#### 각 훅의 역할 (비유로 이해하기)

| 훅 | 비유 | 실제 동작 |
|----|------|---------|
| `env-context-injector` | 출근하면 자동 브리핑 | Git 상태, 프로젝트 정보 자동 주입 |
| `dangerous-command-blocker` | 위험한 버튼에 안전 커버 | `rm -rf`, `git push --force` 차단 |
| `secret-detector` | 비밀번호 포스트잇 감지기 | API 키 하드코딩, .env 파일 쓰기 차단 |
| `dependency-audit` | 새 직원 신원조회 | npm/pip 패키지 URL 설치, 위험 플래그 차단 |
| `console-log-warning` | 프로덕션 디버그 로그 경고 | console.log 감지 시 경고 |
| `prettier/tsc/ruff` | 자동 맞춤법 검사 | 파일 수정 후 포맷팅 + 타입 체크 |
| `loop-detector` | 같은 실수 4번이면 멈춰 | 동일 파일 4회+ 편집 시 경고 |
| `trace-logger` | CCTV 녹화 | 모든 도구 호출 JSONL 기록 |
| `failure-explainer` | 왜 실패했는지 3단계 추적 | 에러 분류 → WHY 분석 → 에스컬레이션 |
| `pre-completion-check` | 퇴근 전 체크리스트 | 코드 변경 후 테스트 실행 확인 |
| `session-learning` | 오늘 뭘 배웠나 정리 | 세션 종료 시 패턴 추출 |
| `trace-analyzer` | 주간 보안 리포트 | 실패 패턴, doom loop 후보 분석 |

#### 실제 차단 예시

```
AI: "불필요한 파일을 정리합니다" → rm -rf ./src
훅: [SAFETY] rm -rf 감지. 차단됨.
AI: "개별 파일을 하나씩 삭제하겠습니다" → 안전한 방법으로 전환
```

```
AI: config.py에 api_key = "sk-1234abcd..." 작성
훅: [SECURITY] 하드코딩된 API 키 감지. 차단됨.
AI: "환경 변수로 변경합니다" → os.environ.get("API_KEY")
```

### 4. 에이전트 (agents/) — 혼자 다 하지 마라

에이전트는 상황별로 **자동 투입되는 전문가**입니다.

#### 자동 트리거 흐름 예시

```
사용자: "결제 기능 만들어줘"

1. [자동] planner → 설계도 작성
2. 사용자 승인
3. AI가 코드 작성
4. [자동] code-reviewer → "리팩터링 필요"
5. [자동] security-reviewer → "SQL 인젝션 위험"
6. [자동] tdd-guide → "테스트 커버리지 60%, 추가 필요"
7. 전부 반영 → 완료
```

사용자는 "결제 기능 만들어줘" 한 마디만 했습니다.

#### 추론 예산 배분

모든 작업에 비싼 모델을 쓰면 비용이 폭발합니다:

| 단계 | 모델 | 이유 |
|------|------|------|
| 계획 | Opus (최고) | 아키텍처를 잘못 잡으면 전부 재작업 |
| 구현 | Sonnet (균형) | 코드 작성은 중급이면 충분 |
| 검증 | Sonnet (균형) | 테스트 실행과 결과 대조 |
| 단순 편집 | Haiku (경량) | 포맷팅, 주석 같은 단순 작업 |

### 5. 15분 만에 시작하기

#### Step 1: 설치

```bash
git clone https://github.com/hyunseung1119/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
./setup.sh  # macOS/Linux
```

#### Step 2: 동작 확인

```bash
claude  # Claude Code 시작

# 테스트 1: 위험 명령 차단
> "rm -rf / 실행해"  → [SAFETY] 차단됨 ✓

# 테스트 2: 시크릿 감지
> ".env 파일에 API_KEY=sk-1234 써줘"  → [SECURITY] 차단됨 ✓

# 테스트 3: 워크플로우
> "로그인 기능 만들어줘"  → 코드 없이 설명부터 시작 ✓
```

#### Step 3: 점진적 확장

| 주차 | 익힐 것 | 핵심 |
|------|--------|------|
| 1주차 | 안전 훅 3개 | `dangerous-command-blocker` + `secret-detector` + `loop-detector` |
| 2주차 | 품질 훅 | `prettier` + `tsc` + `ruff` (자동 포맷/타입 체크) |
| 3주차 | 워크플로우 규칙 | `workflow.md` + `testing.md` (Explain→Approve→Execute + TDD) |
| 4주차 | 에이전트 활용 | `planner` + `code-reviewer` 자동 트리거 |

**핵심 원칙: 단순하게 시작하고, 문제가 보이는 곳에 훅/규칙을 추가합니다.**

### 6. CLAUDE.md vs 훅, 언제 뭘 쓰나?

| 상황 | CLAUDE.md (규칙) | 훅 |
|------|-----------------|-----|
| 100% 매번 실행 | | **O** |
| 판단이 필요한 가이드 | **O** | |
| 코드 포맷팅 | | **O** (prettier) |
| "함수 50줄 이내" | **O** | |
| API 키 감지 | | **O** (secret-detector) |
| "테스트 먼저 써" | **O** | |
| 위험 명령 차단 | | **O** (dangerous-command-blocker) |

자동화할 수 있으면 훅, 판단이 필요하면 규칙.

---

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| **2026-03-22** | dependency-audit 훅 추가, trace-analyzer 추가, Write에 trace-logger 연결, README 튜토리얼 & 학습 가이드 추가 |
| 2026-03-13 | 하네스 v4 — 12개 훅 체제, JSON 출력 통일(`decision/reason`), trace-logger 추가, failure-explainer 실질 구현(에러 분류+WHY+에스컬레이션), 세션 격리(race condition 해결), 크로스 플랫폼 호환(shasum 폴백), 에이전트 23개 전체 문서화(4카테고리), CODEOWNERS/@gitignore 정비 |
| 2026-03-12 | 하네스 엔지니어링 적용 (9개 훅, workflow/harness rules, CLAUDE.md on-demand 전환, secret-detector 추가) |
| 2026-03-11 | Harness v3, Vercel React, Office 스킬 추가 |
| 2026-03-04 | CLAUDE.md 경량화, Learning Mode, PC 설정 동기화 |
| 2026-02-02 | 29개 스킬, 규칙, 커맨드 전체 동기화 |
| 2026-01-29 | PM 기획 스킬 3종, 자동 설치 시스템 |

---

## 참고 자료

- [LangChain: Improving Deep Agents with Harness Engineering](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
- [Martin Fowler: Harness Engineering](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Phil Schmid: Agent Harness 2026](https://www.philschmid.de/agent-harness-2026)
- [METR: AI Developer Productivity Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

---

## Author

**hyunseung1119** — [@hyunseung1119](https://github.com/hyunseung1119)

MIT License
