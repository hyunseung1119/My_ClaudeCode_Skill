# 셋업 자가진단 점수 — 2026-04-23

> 이 문서는 본 저장소(`My_ClaudeCode_Skill` / 하네스 v7)를 2026-04 시점의
> Claude Code 모범사례·연구·업계 보고서에 대조해 **객관 점수화**하고 다음 마이너
> 리비전(v7.1 → v8) 방향을 제시한다. 프로젝트 단위 권장은 각 프로젝트 문서에서
> 다룸(예: `p6-home/docs/02-development/AI_AUGMENTED_WORKFLOW_2026-04.md`).

**벤치마크 기준**
- Anthropic *Claude Code Best Practices*
- HumanLayer *Harness Engineering for Coding Agents*
- Addy Osmani *My LLM Coding Workflow into 2026*
- arXiv 2508.00083 / 2508.11126 (agentic coding surveys)
- *2026 Agentic Coding Trends Report* (Anthropic)

---

## 1. 종합 점수: **785 / 1000 (A−)**

공개 dotfiles 사례 비교 기준 **상위 5~10%**. Claude Code를 2년+ heavy use +
직접 하네스 튜닝한 개발자 수준.

| 차원 | 측정 근거 | 점수 | 등급 |
|------|-----------|------|------|
| Harness coverage | 29 hooks × 11 이벤트 전 단계 배치 | **95** | S |
| Subagent library | 24 agents (core 7 + quality 10 + domain 4 + meta 3) | **92** | S |
| Skills breadth | 37 skills (개발 + 조사·학습·평가 + 도구) | **90** | S |
| Commands coverage | 31 commands × agent 자동 연결 테이블 완비 | **88** | A+ |
| Session isolation | session-specific lock, trace 7일 보관 | **90** | S |
| Rules clarity | 13 rule files + CLAUDE.md 24줄 (60↓ 준수) | **85** | A |
| Permissions hygiene | allow 28 / deny 3 (rm·del·format) | **80** | A |
| Verification loop | `verification-loop.sh` 활성 | **65** | B+ |
| Memory system 실사용 | 템플릿만 있고 실제 MEMORY.md 작성 얕음 | **55** | B |
| Spec-driven ratio | `/plan` 커맨드는 있으나 SPEC.md 템플릿 없음 | **45** | B− |

### 측정 상세
- **Harness S급(95)**: Session/Pre/Post/Failure/Stop + Token/Worktree/Subagent/
  PermissionDenied 11 이벤트 모두 커버. `progress-loader.sh`·`regression-gate.sh`
  ·`verification-loop.sh`·`failure-explainer.sh`의 조합은 HumanLayer가 말한
  *"back-pressure system"* 정석.
- **Spec-driven B−(45)**: `commands/plan.md`는 있으나, 작성된 SPEC 문서가 저장되는
  표준 경로·템플릿 미정. Addy Osmani의 *"waterfall in 15 minutes"* 실현을
  위해선 `skills/spec-driven/` + `SPEC_TEMPLATE.md` 신설 필요.
- **Memory B(55)**: `CLAUDE.md`의 *"auto memory"* 섹션은 상세하나, 실제
  `~/.claude/projects/*/memory/MEMORY.md`가 비어 있는 경우 다수. 구조는 완비 →
  **활성화**만 남음.

---

## 2. 2026-04 트렌드 대비 gap 3개

### Gap 1 — Spec-driven 단계가 문화로 정착 안 됨
**외부 기준**: Osmani, Anthropic 모두 *"spec이 persistent memory의 일부가 되어야
한다"*고 강조. Spec은 대화 앵커이자 회귀 기준.

**현재**: `/plan` 실행 후 결과물이 일시 파일로만 존재, 후속 세션에서 참조되지 않음.

**제안 v8**:
```
skills/spec-driven/
  SKILL.md              # 언제 발동: 신규 feature/bugfix 시작 시
  SPEC_TEMPLATE.md      # 요구사항/엣지/verification/rollback
rules/spec-driven.md    # "SPEC 없이 구현 금지" + 저장 경로 규칙
hooks/spec-gate.sh      # feature 브랜치 첫 커밋 시 SPEC 파일 존재 검증
```

### Gap 2 — Verification loop이 문법 검사(tsc/ruff)에 치중, 행동 검증이 얕음
**외부 기준**: HumanLayer — *"If you can't verify it, don't ship it."* 빌드
성공 ≠ 동작 정확. 실 E2E 또는 golden path 테스트가 필요.

**현재**: `verification-loop.sh`가 관련 unit test만 실행. E2E runner는 `e2e-runner`
agent에 있으나 자동 트리거 없음.

**제안 v8**:
```
hooks/verification-loop.sh  # 확장: UI 변경 감지 시 e2e-runner agent 자동 호출
  → git diff --name-only | grep -q 'src/.*\.tsx$' && trigger_e2e_smoke
rules/testing.md            # Smoke test 최소 1개를 critical path당 의무화
```

### Gap 3 — Subagent 사용률이 낮아 메인 컨텍스트가 빠르게 오염
**외부 기준**: HumanLayer — *"pushing exploration to a separate window
structurally prevents contamination."*

**현재**: 24 agents가 있지만 대부분 사용자가 명시 호출할 때만 발동. 탐색·검색
단계에서 자동 위임이 약함.

**제안 v8**:
```
rules/agents.md 추가 섹션:
  "파일 4개 이상 Read 예정 or Glob 결과 20+ 파일 시 Explore subagent에
   자동 위임하라 (메인 창 보호)"
hooks/context-guard.sh (신규):
  세션 중 Read 호출 수 누적 > 15 시 경고 + subagent 전환 권유
```

---

## 3. v8 진화 로드맵

| 우선순위 | 변경 | 영향 점수 | 난이도 |
|----------|------|-----------|--------|
| **P1** | `skills/spec-driven/` + SPEC_TEMPLATE 신설 | spec 45 → 80 | 낮음 |
| **P1** | `rules/spec-driven.md` 규칙 + `/plan` 커맨드에 SPEC 저장 의무 | spec 45 → 80 | 낮음 |
| **P2** | `hooks/verification-loop.sh` E2E 자동 트리거 확장 | verification 65 → 85 | 중간 |
| **P2** | `hooks/context-guard.sh` 신설 (Read 15회+ 경고) | rules 85 → 92 | 낮음 |
| **P3** | `hooks/spec-gate.sh` feature 브랜치 SPEC 존재 검증 | spec 80 → 92 | 중간 |
| **P3** | MEMORY.md 자동 writer 훅 — `/learn` 결과를 MEMORY에 누적 | memory 55 → 80 | 중간 |

### 목표
- v8 완성 시 **총점 870+ (A)** 예상
- 추가로 `rules/` 문서 내 **외부 인용 표기** 일관화 시 90점대 진입

---

## 4. 점수 산정 스크립트 (검증 가능)

다음 스크립트로 누구나 동일 점수를 재현할 수 있도록 제공:

```bash
# scripts/score-setup.sh (향후 추가 예정)
#   입력: ~/.claude/ 경로
#   출력: 10개 차원 × 합계 점수 + markdown 리포트
```

구현 아이디어 (의사 코드):
```
hooks_count=$(ls ~/.claude/hooks/*.sh | wc -l)
agents_count=$(ls ~/.claude/agents/*.md | wc -l)
claude_md_lines=$(wc -l < ~/.claude/CLAUDE.md)
allow_count=$(jq '.permissions.allow | length' ~/.claude/settings.json)

# 가중치 (이 문서 섹션 1 표)에 곱해서 합산
```

---

## 5. 참고 자료

- [Claude Code Best Practices (공식)](https://code.claude.com/docs/en/best-practices)
- [Harness Engineering for Coding Agents — HumanLayer](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- [My LLM Coding Workflow — Addy Osmani](https://addyosmani.com/blog/ai-coding-workflow/)
- [Understanding Claude Code's Full Stack — alexop.dev](https://alexop.dev/posts/understanding-claude-code-full-stack/)
- [Context Discipline in 2026 — techtaek.com](https://techtaek.com/claude-code-context-discipline-memory-mcp-subagents-2026/)
- [arXiv 2508.00083 — Survey on Code Generation with LLM-based Agents](https://arxiv.org/html/2508.00083v1)
- [arXiv 2508.11126 — AI Agentic Programming: A Survey](https://arxiv.org/html/2508.11126v1)
- [2026 Agentic Coding Trends Report — Anthropic](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf)

---

*작성 맥락*: `p6-home` 프로젝트 세션에서 `/code-review` + 셋업 자가평가를 수행하며
파생. 프로젝트 단위 추천(Chunked TDD·Quality Gates 등)은 해당 프로젝트 저장소
`docs/02-development/AI_AUGMENTED_WORKFLOW_2026-04.md`를 참조.
