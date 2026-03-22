# Part 4. 에이전트 오케스트레이션 — 혼자 다 하지 마라

> 2026년의 개발자는 코드를 쓰는 사람이 아니라, **AI 에이전트 팀을 지휘하는 사람**입니다.

## 왜 에이전트가 필요한가?

AI 하나가 모든 걸 잘하지는 못합니다.

```
[에이전트 없이]
사용자: "결제 기능 만들어줘"
AI: 코드 작성 → 보안 허점 있음 → 테스트 부족 → 타입 에러 → 배포 후 사고

[에이전트 있을 때]
사용자: "결제 기능 만들어줘"
planner: 설계도 먼저 작성
AI: 코드 작성
code-reviewer: "이 부분 리팩터링 필요"
security-reviewer: "SQL 인젝션 위험, 파라미터 쿼리로 변경해"
tdd-guide: "테스트 커버리지 60%밖에 안 됨, 추가 필요"
→ 전부 반영 후 완료
```

**비유**: 혼자 영화 만들기 vs 감독+촬영+편집+음향 팀으로 만들기

## 에이전트의 종류

### 핵심 에이전트 (자동 트리거)

| 에이전트 | 언제 자동 실행 | 역할 | 비유 |
|---------|-------------|------|------|
| **planner** | 새 기능 요청 시 | 설계도 작성 | 건축 설계사 |
| **code-reviewer** | 코드 작성 후 | 품질 검사 | 선배 개발자 코드 리뷰 |
| **security-reviewer** | 인증/API 코드 | 보안 취약점 검사 | 보안팀 |
| **tdd-guide** | 새 기능/버그 수정 | 테스트 먼저 쓰기 강제 | QA 엔지니어 |
| **build-error-resolver** | 빌드 실패 시 | 빌드 에러 즉시 수정 | 빌드 전문가 |
| **debugger** | 런타임 에러 시 | 버그 진단 | 디버깅 전문가 |
| **architect** | 시스템 설계 시 | 아키텍처 결정 | CTO |

### 품질 에이전트

| 에이전트 | 역할 | 언제 쓰나 |
|---------|------|---------|
| **a11y-reviewer** | 접근성(WCAG) 검사 | UI/폼/내비게이션 |
| **database-reviewer** | SQL/스키마 검사 | DB 관련 코드 |
| **performance-optimizer** | 성능 최적화 | API 응답 느릴 때 |
| **refactor-cleaner** | 죽은 코드 제거 | 리팩터링 시 |

### 도메인 전문가 에이전트

| 에이전트 | 역할 |
|---------|------|
| **react-agent** | React 컴포넌트, 훅, 상태 관리 |
| **e2e-runner** | Playwright E2E 테스트 |
| **infrastructure-agent** | K8s, Terraform, Docker |

## 자동 트리거 규칙

사용자가 지시하지 않아도 **상황에 따라 자동 실행**됩니다:

```
사용자: "로그인 기능 만들어줘"

1. [자동] planner 실행 → 설계도 작성
2. 사용자 승인
3. AI가 코드 작성
4. [자동] code-reviewer 실행 → 코드 품질 검사
5. [자동] security-reviewer 실행 → 인증 코드니까 보안 검사
6. 문제 있으면 수정 → 다시 4~5 반복
7. 완료
```

## 추론 예산 배분 (Reasoning Budget)

모든 작업에 최고 성능 모델을 쓰면 비용이 폭발합니다. 작업 단계별로 **적절한 모델**을 배분합니다.

```
[계획 단계] ──── Opus (최고 성능) ──── 비용: $$$
  "아키텍처를 잘못 잡으면 전부 다시 해야 하니까"

[구현 단계] ──── Sonnet (균형) ────── 비용: $$
  "코드 작성은 중급이면 충분"

[검증 단계] ──── Sonnet (균형) ────── 비용: $$
  "테스트 실행과 결과 대조"

[단순 편집] ──── Haiku (경량) ─────── 비용: $
  "포맷팅, 주석 수정 같은 단순 작업"
```

**비유**: 건축에서 설계는 고급 설계사가, 시공은 숙련공이, 청소는 일반 인력이 하는 것과 같습니다.

| 단계 | 모델 | 에이전트 |
|------|------|---------|
| 계획 | Opus | planner, architect |
| 구현 | Sonnet | code-reviewer, tdd-guide, security-reviewer |
| 검증 | Sonnet | e2e-runner, debugger |
| 단순 편집 | Haiku | doc-updater, refactor-cleaner |

## 에이전트 통신 규칙

여러 에이전트가 동시에 일할 때 충돌을 방지하는 규칙:

```markdown
1. 각 에이전트는 시작 전 스코프를 선언한다
   → "나는 src/auth/ 폴더만 건드릴게"

2. 다른 에이전트의 파일을 수정하지 않는다
   → security-reviewer가 src/api/를 건드리면 안 됨

3. 충돌 시 멈추고 사용자에게 보고한다
   → "code-reviewer와 security-reviewer가 같은 파일을 수정하려 합니다"

4. 리서치/탐색 에이전트는 요약만 반환, 파일 수정 안 함
```

## 병렬 vs 순차 실행

```
[병렬] 독립적인 검사들
security-reviewer ──┐
performance-opt ────┤── 동시 실행 (빠름)
type-checker ───────┘

[순차] 결과가 다음 단계에 필요할 때
planner → implement → code-reviewer → 수정 → 완료
```

## 실제 동작 예시

```
사용자: "사용자 프로필 API를 만들어줘"

[자동] planner (Opus):
  "REST API 엔드포인트 설계:
   GET /api/users/{id}
   PUT /api/users/{id}
   스키마: UserProfile (name, email, avatar)
   인증: JWT 미들웨어
   접근법: FastAPI + Pydantic"

사용자: "ㅇㅇ"

AI (Sonnet): 코드 작성 (handlers, schemas, models)

[자동] code-reviewer (Sonnet):
  "PASS — 구조 깔끔, 다만 에러 핸들링에서 HTTPException 메시지가
   내부 정보를 노출할 수 있음. 수정 권장."

[자동] security-reviewer (Sonnet):
  "WARNING — PUT 엔드포인트에 소유권 검사 없음.
   다른 사용자의 프로필을 수정할 수 있는 BOLA 취약점.
   user_id == request.user.id 검증 추가 필요."

AI: 두 리뷰 반영하여 수정

[자동] tdd-guide (Sonnet):
  "테스트 커버리지 45%. 최소 80% 필요.
   추가해야 할 테스트:
   - 인증 실패 케이스
   - 다른 사용자 프로필 접근 차단
   - 잘못된 입력 검증"

AI: 테스트 추가 → 커버리지 87% → 완료
```

사용자는 "프로필 API 만들어줘" 한 마디만 했습니다. 나머지는 **에이전트 팀이 자동으로 협업**한 겁니다.

다음 편에서는 이 모든 것을 **처음부터 따라할 수 있는 실전 셋업 가이드**를 제공합니다.

---

> **시리즈 목차**
> - Part 1. 왜 하네스 엔지니어링인가?
> - Part 2. CLAUDE.md — AI에게 주는 업무 매뉴얼
> - Part 3. 훅(Hooks) — 자동화의 핵심
> - **Part 4. 에이전트 오케스트레이션 — 혼자 다 하지 마라** (현재)
> - Part 5. 실전 셋업 따라하기
