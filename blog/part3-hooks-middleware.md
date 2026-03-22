# Part 3. 훅(Hooks) — 자동화의 핵심

> "AI가 좋은 코드를 쓰지만, 포맷팅을 까먹고 테스트를 안 돌리고 API 키를 하드코딩합니다. 훅이 그 마지막 10%를 잡습니다."

## 훅이 뭔데?

훅(Hook)은 **특정 이벤트가 발생했을 때 자동 실행되는 스크립트**입니다.

```
AI가 파일을 수정한다
  → [자동] Prettier가 코드를 포맷팅한다
  → [자동] TypeScript 타입 체크가 돌아간다
  → [자동] 같은 파일을 4번 이상 수정했으면 경고한다
```

사람이 "포맷팅 해줘", "타입 체크 해줘"라고 매번 말할 필요가 없습니다. **100% 자동**입니다.

**비유**: 공장의 컨베이어 벨트에 있는 품질 검사 센서. 제품(코드)이 지나갈 때마다 자동으로 검사합니다.

## 훅이 실행되는 5가지 타이밍

```
사용자가 메시지를 보냄 ─── UserPromptSubmit (세션 시작 시)
     │
     ▼
AI가 도구를 쓰려고 함 ─── PreToolUse (실행 전 검사)
     │
     ▼
도구 실행 성공 ─────────── PostToolUse (실행 후 처리)
도구 실행 실패 ─────────── PostToolUseFailure (실패 분석)
     │
     ▼
AI가 작업을 마침 ──────── Stop (종료 전 검증)
```

## 우리 훅 11개 전체 해설

### UserPromptSubmit: 세션 시작 훅 (1개)

#### env-context-injector.sh — "출근하면 자동 브리핑"

AI는 매 세션마다 기억이 리셋됩니다. 이 훅이 세션 시작 시 자동으로 환경 정보를 주입합니다.

```
[훅 없이]
사용자: "버그 좀 고쳐줘"
AI: "어떤 프로젝트인가요? 어떤 언어를 쓰나요? Git 상태는요?"

[훅 있을 때]
사용자: "버그 좀 고쳐줘"
AI: (이미 알고 있음 — Python 3.12, Git에 변경사항 3개, FastAPI 프로젝트)
    "src/api/main.py에서 에러가 발생하고 있네요. 확인해보겠습니다."
```

**주입되는 정보**: Git 상태, 브랜치, 프로젝트 설정, 런타임 버전

### PreToolUse: 실행 전 검사 훅 (2개)

#### dangerous-command-blocker.sh — "위험한 버튼에 안전 커버"

```bash
# 차단하는 명령어들:
rm -rf          # 전체 삭제
git push --force # 원격 히스토리 덮어쓰기
git reset --hard # 로컬 변경사항 전부 삭제
git clean -f     # 추적 안 되는 파일 전부 삭제
DROP TABLE       # 데이터베이스 테이블 삭제
```

**실제 상황**:
```
AI: "불필요한 파일을 정리하겠습니다." → rm -rf ./src 실행 시도
훅: [SAFETY] rm -rf 감지. 차단됨.
AI: "개별 파일을 하나씩 삭제하겠습니다." → 안전한 방법으로 전환
```

#### secret-detector.sh — "비밀번호 포스트잇 감지기"

```bash
# 감지하는 패턴:
- API 키 하드코딩 (sk-xxx, AKIA-xxx, ghp_xxx 등)
- .env, .pem, .key 파일에 쓰기 시도
- Bearer 토큰, AWS 시크릿 등
```

**실제 상황**:
```
AI: config.py에 "api_key = 'sk-1234abcd...'" 작성 시도
훅: [SECURITY] 하드코딩된 API 키 감지. 차단됨.
AI: "환경 변수로 변경하겠습니다." → os.environ.get("API_KEY") 로 수정
```

### PostToolUse: 실행 후 처리 훅 (6개)

#### dependency-audit.sh — "새 직원 신원조회"

npm이나 pip로 패키지를 설치할 때 자동 검사합니다.

```bash
# 차단:
npm install https://suspicious-url.com/package  # URL 직접 설치
pip install --force                              # 위험 플래그
# 경고:
npm install express                              # 버전 미고정
```

#### console-log-warning.sh — "프로덕션에 디버그 로그 금지"

```
AI가 console.log("debug:", data) 작성
훅: [WARNING] console.log 감지. 프로덕션 코드에서는 제거하세요.
```

#### prettier-format.sh — "자동 맞춤법 검사"

파일 수정 후 Prettier가 자동 실행됩니다. AI가 들여쓰기를 잘못 해도, 저장하면 자동 교정.

#### tsc-check.sh — "타입 안전 검사"

TypeScript 파일 수정 시 타입 에러를 즉시 감지합니다.

```
AI가 number 타입에 string을 넣음
훅: [ERROR] Type 'string' is not assignable to type 'number'
AI: 즉시 타입 수정
```

#### ruff-format.sh — "Python 자동 정리"

Python 파일 수정 시 ruff로 린트 + 포맷 자동 실행.

#### loop-detector.sh — "같은 실수 반복 감지"

```
AI가 main.py를 1번째 수정 → OK
AI가 main.py를 2번째 수정 → OK
AI가 main.py를 3번째 수정 → OK
AI가 main.py를 4번째 수정 → [WARNING] 같은 파일 4회 수정!
   "다른 접근 방식을 고려하세요. 근본 원인을 다시 분석해보세요."
```

**비유**: 같은 시험 문제를 4번 틀리면 선생님이 "잠깐, 다시 개념부터 보자"라고 하는 것.

### PostToolUseFailure: 실패 분석 훅 (1개)

#### failure-explainer.sh — "왜 실패했는지 3단계 추적"

```
명령 실패 시:
1. 에러 분류 (syntax? runtime? permission?)
2. WHY 3단계 추적 (왜? → 왜? → 왜?)
3. 같은 에러 3회 반복 → 에스컬레이션 (접근 방식 자체를 바꿔라)
```

### Stop: 종료 전 검증 훅 (2개)

#### pre-completion-check.sh — "퇴근 전 체크리스트"

```
AI가 "작업 완료!"라고 할 때:
훅: "잠깐 — 코드를 변경했는데 테스트를 실행한 적이 없습니다.
     테스트를 먼저 실행하세요."
```

#### session-learning.sh — "오늘 뭘 배웠나 정리"

세션 종료 시 이번 세션에서 발견한 패턴, 실수, 배운 점을 정리하도록 리마인드.

## 훅의 출력 포맷

훅은 JSON으로 Claude에게 지시합니다:

```json
// 차단
{"decision": "block", "reason": "[SECURITY] API 키 감지됨"}

// 승인 + 경고 메시지 주입
{"decision": "approve", "reason": "[WARNING] 버전 미고정"}

// 아무것도 안 함 (통과)
(출력 없이 exit 0)
```

## settings.json에 등록하기

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/hooks/dangerous-command-blocker.sh",
          "timeout": 5
        }]
      }
    ]
  }
}
```

- `matcher`: 어떤 도구에 적용할지 (Bash, Edit, Write 등)
- `timeout`: 최대 실행 시간 (초)
- 같은 이벤트에 여러 훅 등록 가능 (순차 실행)

## 파이프라인 전체 그림

```
사용자 메시지
  → env-context-injector (환경 브리핑)
  → AI 작업 시작
     → dangerous-command-blocker (위험 차단)
     → secret-detector (시크릿 차단)
     → [도구 실행]
     → dependency-audit (패키지 검사)
     → console-log-warning (디버그 로그 경고)
     → prettier/tsc/ruff (자동 포맷+타입 체크)
     → loop-detector (반복 편집 감지)
     → trace-logger (실행 기록)
  → 실패 시 → failure-explainer (WHY 분석)
  → AI 작업 완료
     → pre-completion-check (테스트 실행 확인)
     → session-learning (학습 정리)
```

다음 편에서는 세 번째 축인 **에이전트 오케스트레이션**을 다룹니다.

---

> **시리즈 목차**
> - Part 1. 왜 하네스 엔지니어링인가?
> - Part 2. CLAUDE.md — AI에게 주는 업무 매뉴얼
> - **Part 3. 훅(Hooks) — 자동화의 핵심** (현재)
> - Part 4. 에이전트 오케스트레이션 — 혼자 다 하지 마라
> - Part 5. 실전 셋업 따라하기
