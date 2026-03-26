# Global Claude Code Instructions

이 파일은 모든 프로젝트에서 적용되는 전역 지침입니다.

## 핵심 워크플로우 (ALWAYS)

**반드시 `~/.claude/rules/workflow.md`를 따릅니다:**
1. Explain → Approve → Execute → Reflect
2. Evidence Rule: 근거 없는 추천 금지
3. Learning Mode: 시니어 생산성 + 주니어 학습 병행
4. Session Learning: `/clear` 전 `/learn` 필수
5. Command → Agent 자동 연결: `/plan` → planner, `/code-review` → code-reviewer 등

## 하네스 미들웨어 (ALWAYS)

**`~/.claude/rules/harness-engineering.md` 참조:**
- 자기 검증 강제: 코드 작성 후 반드시 테스트 실행
- Verification Loop: 코드 변경 → 관련 테스트 자동 실행 → 실패 시 피드백 주입
- 반복 루프 방지: 같은 에러 3회 반복 시 접근법 변경
- 추론 예산 배분: 계획(Opus/high) → 구현(Sonnet/high) → 검증(Sonnet) → 단순(Haiku)

## Auto Team Agent (ALWAYS)

**`~/.claude/rules/agents.md` 참조:**
- 새 기능 → **planner** 먼저 (필수)
- 코드 작성/수정 후 → **code-reviewer** 자동 (필수)
- 인증/API/입력처리 → **security-reviewer** 병렬
- 빌드/타입 에러 → **build-error-resolver** 즉시
- 기능+버그 → **tdd-guide** 테스트 먼저

## 상황별 규칙 참조 (on-demand)

| 상황 | 참조 규칙 |
|------|----------|
| 코드 작성/리뷰 | `coding-style.md`, `testing.md` |
| API/인증/입력처리 | `security.md` — OWASP API Top 10 |
| 에이전트 디스패치 | `agents.md` — 24개 에이전트 (4 카테고리, Tool Strategy) |
| Git/PR | `git-workflow.md` — Conventional Commits |
| 세션/컨텍스트 | `context-management.md` — 세션 라이프사이클 |
| 훅 설정 변경 | `hooks.md` — 25개 훅 스크립트 가이드 |
| 고급 워크플로우 | `advanced-workflows.md` — Headless, Worktree, /loop, Auto Mode |
| 프론트엔드/아키텍처 | 관련 스킬 참조 (`/react-component`, `/architecture-design` 등) |
| 도구 찾기 | `/tool-registry` — 92개 도구 카테고리별 검색 |
