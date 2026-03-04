# My Claude Code Settings

Claude Code CLI를 위한 종합 설정 저장소. 30개 스킬, 23개 에이전트, 28개 커맨드, 5개 규칙을 포함합니다.

> **최신 업데이트: 2026-03-04** — PC 활성 설정 전체 동기화, `developer-growth` 스킬 추가, 불필요 파일 정리, 프로젝트 구조 재정비

---

## 프로젝트 구조

```
.claude/                          ← 프로젝트 루트
├── CLAUDE.md                     ← 글로벌 지침 (Learning Mode, 코드 품질, 보안)
├── settings.local.json           ← 프로젝트 설정 (권한, 모델, 훅)
├── README.md                     ← 이 파일
├── setup.sh / setup.ps1          ← 설치 스크립트 (Linux/macOS, Windows)
├── uninstall.sh / uninstall.ps1  ← 제거 스크립트
│
├── skills/ (30개)                ← 전문 스킬 라이브러리
│   ├── SKILL.md                  ← 각 스킬별 문서
│   ├── skill.json                ← 스킬 설정
│   └── src/                      ← 구현 코드 (Python/TypeScript)
│
├── agents/ (23개)                ← 특화 서브 에이전트
│   └── *.md                      ← 에이전트 정의 파일
│
├── commands/ (28개)              ← CLI 커맨드 (/command-name)
│   └── *.md                      ← 커맨드 정의 파일
│
└── rules/ (5개)                  ← 프로젝트 규칙 (항상 로드)
    ├── agents.md                 ← 에이전트 오케스트레이션
    ├── coding-style.md           ← 코딩 스타일 (함수 <50줄, 파일 <400줄)
    ├── git-workflow.md           ← Git 워크플로우 (Conventional Commits)
    ├── security.md               ← 보안 (OWASP API Top 10)
    └── testing.md                ← 테스트 (TDD, 80%+ 커버리지)
```

---

## 핵심 설정 (CLAUDE.md)

프로젝트 전역에 적용되는 지침:

| 항목 | 내용 |
|------|------|
| **Learning Mode** | 70% Claude 작성 + 30% 사용자 구현 (가이드) |
| **코드 품질** | 불변성, 함수 <50줄, 파일 <400줄, 경계에서 입력 검증 |
| **보안** | 시크릿 금지, 파라미터화 쿼리, BOLA/BFLA 방지 |
| **Git** | Conventional Commits (feat/fix/refactor/docs/test/chore) |
| **테스트** | TDD 필수 (RED → GREEN → REFACTOR), 80%+ 커버리지 |
| **프론트엔드** | Anti-AI 디자인 (비대칭, 단색, 각진 모서리) |

---

## 프로젝트 설정 (settings.local.json)

```jsonc
{
  "env": {
    "MAX_THINKING_TOKENS": "32000",     // 사고 토큰 한도
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "16000",
    "PARALLEL_AGENT_LIMIT": "3",        // 병렬 에이전트 수
    "TOKEN_BUDGET_WARNING": "0.8"       // 토큰 예산 경고 임계값
  },
  "model": "sonnet",                    // 기본 모델
  "modelOverrides": {
    "planning": "opus",                 // 기획/설계 → Opus
    "architecture": "opus",
    "simple-edit": "haiku",             // 단순 수정 → Haiku
    "formatting": "haiku",
    "code-review": "sonnet",            // 리뷰 → Sonnet
    "security-review": "sonnet"
  },
  "agentDefaults": {
    "maxIterations": 10,
    "parallelLimit": 3,
    "timeoutMs": 300000                 // 5분 타임아웃
  }
}
```

**훅 설정:**
- `PostToolUse` — JS/TS 파일 수정 시 Prettier 자동 포맷
- `PreToolUse` — pytest/npm test 실행 시 결과 필터링

---

## 스킬 (30개)

`/skill-name`으로 활성화. 각 스킬은 SKILL.md 문서 + 구현 코드를 포함.

### 제품 기획

| 스킬 | 설명 |
|------|------|
| `product-planner` | 시니어 PM 수준 제품 기획 (TAM/SAM/SOM, JTBD, RICE, Lean Canvas) |
| `chatbot-designer` | 대화형 UX 설계 (다이얼로그 플로우, Intent/Entity, FAQ 생성) |
| `llm-app-planner` | LLM 앱 아키텍처 (RAG vs Agent vs Fine-tuning 비교, 비용 계산) |

### 개발

| 스킬 | 설명 |
|------|------|
| `architecture-design` | 시스템 설계 + ADR (Clean Architecture, DDD, 마이크로서비스) |
| `backend-api` | FastAPI 구현 (라우터, 미들웨어, Pydantic 검증) |
| `react-component` | React 컴포넌트 + Anti-AI 디자인 원칙 |
| `api-design` | RESTful/GraphQL API 설계 (OpenAPI 3.x, RFC 9457) |
| `api-spec-generator` | API 명세서 자동 생성 (시퀀스 다이어그램, 에러 코드) |
| `clean-code` | 코드 리팩토링, 클린 코드 원칙 |
| `refactoring` | 안전한 리팩토링 (동작 변경 없이 구조 개선) |
| `debugging` | 체계적 디버깅 (가설 기반, 이분 탐색, RCA) |
| `performance-optimization` | 성능 분석/최적화 (프로파일링, DB 쿼리, 번들) |
| `mcp-integration` | Model Context Protocol 서버 설정/연동 |

### AI / 연구

| 스킬 | 설명 |
|------|------|
| `rag-2.0` | 고급 RAG (Hybrid Search, GraphRAG, Advanced Retrieval) |
| `ml-training` | ML 모델 학습/평가, 임베딩, 벡터 검색 |
| `agent-evaluator` | AI 에이전트 자동 테스트/평가 (다차원 성능 지표) |
| `agentic-workflows` | 멀티 에이전트 시스템 (ReAct, Plan-Execute 패턴) |
| `ai-developer-practice` | AI 개발자 실무 7대 역량 (OWASP LLM Top 10, MITRE ATLAS) |
| `ai-research-integration` | 논문 조사/평가/POC (5가지 평가 기준 스코어링) |
| `research-agent-tech` | LLM/Agent 최신 트렌드 (arXiv, GitHub Trending) |
| `prompt-optimizer` | 프롬프트 엔지니어링 + LangGraph 최적화 |

### 문서 / 품질

| 스킬 | 설명 |
|------|------|
| `code-review` | 5-Layer 코드 리뷰 (정확성/설계/보안/성능/유지보수) |
| `security-audit` | OWASP Top 10 보안 감사 (취약점 스캔, 시크릿 탐지) |
| `tdd-workflow` | TDD 워크플로우 (Red-Green-Refactor) |
| `documentation-gen` | 기술 문서 자동 생성 (README, API 문서, CHANGELOG) |
| `dev-journal` | 개발 일지 자동화 (히스토리, 의사결정, 문제 해결 기록) |
| `frontend-codemap` | 프론트엔드 코드맵 (UI 구조 + 코드 매핑) |
| `context-compressor` | 컨텍스트 압축으로 토큰 최적화 |
| `git-workflow` | 고급 Git (Conventional Commits, 자동 PR, 브랜치 전략) |
| `developer-growth` | 개발자 성장 프레임워크 (프론트/백엔드/AI/인프라 학습 경로) |

---

## 에이전트 (23개)

자동으로 트리거되는 특화 서브 에이전트:

### 핵심 에이전트 (자동 트리거)

| 에이전트 | 트리거 조건 |
|----------|-------------|
| `planner` | 복잡한 기능 요청 |
| `code-reviewer` | 코드 작성 후 |
| `tdd-guide` | 새 기능/버그 수정 |
| `security-reviewer` | 커밋 전 |
| `build-error-resolver` | 빌드 실패 |
| `debugger` | 런타임 에러 |
| `architect` | 시스템 설계 결정 |

### 도메인 전문가

| 에이전트 | 전문 영역 |
|----------|-----------|
| `react-agent` | React 컴포넌트 개발 |
| `rust-expert` | Rust 개발 |
| `go-build-resolver` | Go 빌드 문제 해결 |
| `go-reviewer` | Go 코드 리뷰 |
| `graphql-expert` | GraphQL API |
| `database-reviewer` | 데이터베이스 설계/쿼리 |
| `vector-db-agent` | 벡터 DB/임베딩 |

### 품질/운영

| 에이전트 | 역할 |
|----------|------|
| `a11y-reviewer` | 접근성 (WCAG 2.1) |
| `performance-optimizer` | 성능 최적화 |
| `refactor-cleaner` | 리팩토링 실행 |
| `doc-updater` | 문서 자동 업데이트 |
| `e2e-runner` | E2E 테스트 (Playwright) |
| `infrastructure-agent` | 인프라 (Docker, K8s, Terraform) |
| `coordinator` | 멀티 에이전트 오케스트레이션 |
| `critic-agent` | 결과물 비평/검증 |
| `tree-of-thoughts` | 복잡한 문제 사고 트리 탐색 |

---

## 커맨드 (28개)

`/command-name`으로 실행하는 CLI 커맨드:

### 핵심 워크플로우
`/plan` `/tdd` `/code-review` `/build-fix` `/verify` `/checkpoint`

### 프론트엔드
`/modern-frontend` `/frontend-codemap` `/update-codemaps` `/e2e`

### 문서/분석
`/update-docs` `/token-analysis` `/test-coverage` `/eval` `/learn`

### 멀티 에이전트
`/multi-agent` `/orchestrate` `/evolve`

### 리팩토링
`/refactor-clean` `/skill-create` `/setup-pm`

### Go / Rust
`/go-build` `/go-review` `/go-test` `/rust`

### 설정 관리
`/instinct-export` `/instinct-import` `/instinct-status`

---

## 규칙 (5개)

항상 로드되는 프로젝트 규칙:

| 규칙 | 핵심 내용 |
|------|-----------|
| **agents.md** | 7개 핵심 에이전트 자동 트리거, 병렬/순차 실행 전략 |
| **coding-style.md** | Functional Core + Imperative Shell, 불변성, Result 타입, 복잡도 <10 |
| **git-workflow.md** | Conventional Commits, TDD 우선, PR 워크플로우 |
| **security.md** | OWASP API Top 10, BOLA/BFLA 방지, 시크릿 관리, Rate Limiting |
| **testing.md** | TDD 필수, Unit+Integration+E2E, 80%+ 커버리지 목표 |

---

## 최신 업데이트 (2026-03-04) — CLAUDE.md 경량화 & Learning Mode

### 핵심 개선: "짧은 CLAUDE.md가 더 강하다"

Claude Code에서 CLAUDE.md와 rules 파일은 **매 대화마다 컨텍스트에 로드**됩니다.
너무 길면 실제 작업에 쓸 컨텍스트가 줄어들고, Claude가 지침을 선택적으로 무시하는 문제가 발생합니다.

**이번 업데이트의 핵심은 "지침을 줄이되, 지키게 만드는 것"입니다.**

#### Before vs After

| 항목 | Before | After | 변화 |
|------|--------|-------|------|
| **CLAUDE.md** | 34줄 (프론트엔드 지침만) | 70줄 (종합 지침 6개 영역) | 범위 확장 but 간결 유지 |
| **Rules 파일** | 12개 / 3,270줄 | 5개 / 120줄 | **96% 감소** |
| **총 상시 로드 토큰** | ~4,500 토큰 | ~500 토큰 | **~90% 절약** |

#### 왜 줄였나?

```
[Before] 12개 rules 파일에 3,270줄
  → modern-frontend.md 혼자 784줄
  → observability.md 738줄
  → Claude가 긴 지침 중 일부를 무시하는 현상 발생
  → 실제 코딩에 쓸 컨텍스트 낭비

[After] 5개 rules 파일에 120줄
  → 핵심만 남김 (코딩 스타일, 보안, 테스트, Git, 에이전트)
  → 상세 내용은 skills/로 이동 (필요할 때만 로드)
  → Claude가 지침을 실제로 따르는 비율 향상
```

#### CLAUDE.md 구조 변경

```
[Before] 프론트엔드 자동 적용 규칙만 (34줄)
  → "프론트엔드 작업 시 modern-frontend.md 참조" 수준
  → 코드 품질, 보안, 테스트 등 핵심 지침 없음

[After] 6개 영역 종합 지침 (70줄)
  ├── Learning Mode (70/30 가이드)      ← NEW
  ├── Core Quality Rules (코드/보안/Git/테스트)
  ├── Frontend Work (Anti-AI 디자인)
  ├── Agent Usage (6개 핵심 에이전트)
  └── Skills (주요 스킬 참조)
```

### Learning Mode 도입

이번 업데이트의 두 번째 핵심입니다. CLAUDE.md에 **Learning Mode (Guided)** 를 추가했습니다.

```markdown
## Learning Mode (Guided)
1. Explain WHY before writing code
2. Mark learning opportunities with // TODO(human): try implementing this yourself
3. Ratio: ~70% Claude writes + ~30% human implements
4. After completing a task, briefly note 1-2 concepts worth studying deeper
```

**왜 필요한가:**
- Claude에게 코드를 전부 맡기면 빠르지만, 개발자가 성장하지 않음
- 70/30 비율로 핵심 로직은 Claude가 작성하되, 학습 가치가 있는 부분은 사용자가 직접 구현
- `// TODO(human):` 마커로 사용자가 구현할 부분을 명확히 표시
- 작업 후 "What You Learned" 요약 제공

**관련 스킬:** `developer-growth` (이번에 추가) — Frontend/Backend/AI/Infra 4개 성장 경로, Level 1~3 학습 단계

### 그 외 변경사항

- `developer-growth` 스킬 추가 (PC에만 있던 것 동기화)
- 불필요 파일 정리: docs/ (중복 8개), hooks/ (빈 폴더), 오래된 루트 문서 8개
- `.claude/settings.local.json` 중첩 설정 제거

### 이전 주요 업데이트

| 날짜 | 내용 |
|------|------|
| 2026-02-02 | 29개 스킬, 규칙, 커맨드 전체 동기화 |
| 2026-01-29 | PM 기획 스킬 3종 추가 (product-planner, chatbot-designer, llm-app-planner) |
| 2026-01-29 | 자동 설치/업데이트 시스템 추가 |

---

## 설치

### 자동 설치

**Windows (PowerShell):**
```powershell
iwr -useb https://raw.githubusercontent.com/hyunseung1119/My_ClaudeCode_Skill/main/setup.ps1 | iex
```

**Linux / macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/hyunseung1119/My_ClaudeCode_Skill/main/setup.sh | bash
```

### 수동 설치

```bash
git clone https://github.com/hyunseung1119/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
./setup.sh        # Linux/macOS
# .\setup.ps1     # Windows
```

설치 스크립트는 `~/.claude/skills/`, `~/.claude/commands/`, `~/.claude/rules/`에 심볼릭 링크를 생성합니다. `git pull`로 자동 업데이트됩니다.

### 제거

```bash
./uninstall.sh     # Linux/macOS
# .\uninstall.ps1  # Windows
```

---

## 구성 요약

| 항목 | 수량 | 설명 |
|------|------|------|
| Skills | 30 | 전문 스킬 (기획, 개발, AI, 문서, 품질) |
| Agents | 23 | 자동 트리거 서브 에이전트 |
| Commands | 28 | CLI 커맨드 |
| Rules | 5 | 항상 적용 규칙 |
| 기본 모델 | Sonnet | Opus(기획), Haiku(단순), Sonnet(리뷰) |
| 테스트 커버리지 | 80%+ | TDD 필수 |
| 함수 제한 | <50줄 | 파일 <400줄, 복잡도 <10 |

---

## Author

**hyunseung1119** — [@hyunseung1119](https://github.com/hyunseung1119)

MIT License
