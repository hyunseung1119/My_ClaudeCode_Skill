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
| Hooks | 12 | 하네스 미들웨어 (UserPromptSubmit 1, PreToolUse 2, PostToolUse 6, PostToolUseFailure 1, Stop 2) |
| Tracing | JSONL | `~/.claude/traces/` 7일 보관, 하네스 디버깅용 |
| 테스트 커버리지 | 80%+ | TDD 필수 |

---

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| **2026-03-13** | 하네스 v4 — 12개 훅 체제, JSON 출력 통일(`decision/reason`), trace-logger 추가, failure-explainer 실질 구현(에러 분류+WHY+에스컬레이션), 세션 격리(race condition 해결), 크로스 플랫폼 호환(shasum 폴백), 에이전트 23개 전체 문서화(4카테고리), CODEOWNERS/@gitignore 정비 |
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
