# Global Claude Code Instructions

이 파일은 모든 프로젝트에서 적용되는 전역 지침입니다.

## 핵심 워크플로우 (ALWAYS)

**반드시 `~/.claude/rules/workflow.md`를 따릅니다:**
1. Explain → Approve → Execute → Reflect
2. Evidence Rule: 근거 없는 추천 금지
3. Learning Mode: 시니어 생산성 + 주니어 학습 병행
4. Session Learning: `/clear` 전 `/learn` 필수

## 하네스 미들웨어 (ALWAYS)

**`~/.claude/rules/harness-engineering.md` 참조:**
- 자기 검증 강제: 코드 작성 후 반드시 테스트 실행
- 반복 루프 방지: 같은 에러 3회 반복 시 접근법 변경
- 추론 예산 배분: 계획(Opus) → 구현(Sonnet) → 검증(Sonnet)

## 상황별 규칙 참조 (on-demand)

아래 규칙은 해당 상황에서만 참조합니다. 항상 로드하지 않습니다:

| 상황 | 참조 규칙 |
|------|----------|
| 코드 작성/리뷰 | `coding-style.md`, `testing.md` |
| API/인증/입력처리 | `security.md` — OWASP API Top 10 |
| 에이전트 디스패치 | `agents.md` — 23개 에이전트 역할 |
| Git/PR | `git-workflow.md` — Conventional Commits |
| 세션/컨텍스트 | `context-management.md` — 세션 라이프사이클 |
| 훅 설정 변경 | `hooks.md` — 9개 훅 스크립트 가이드 |
| 프론트엔드/아키텍처/성능 | 관련 스킬 참조 (`/modern-frontend`, `/architecture-design` 등) |
