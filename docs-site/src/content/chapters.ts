export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  sections: Section[];
}

export const chapters: Chapter[] = [
  // ─────────────────────────────────────────────
  // Chapter 1: Claude Code란?
  // ─────────────────────────────────────────────
  {
    slug: "intro",
    number: 1,
    title: "Claude Code란?",
    subtitle: "터미널 기반 AI 코딩 도구의 새로운 패러다임",
    description:
      "Claude Code가 무엇인지, 기존 AI 코딩 도구와 어떻게 다른지, 왜 터미널 기반인지를 이해합니다.",
    sections: [
      {
        id: "what-is-claude-code",
        title: "Claude Code 소개",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">Claude Code는 Anthropic이 만든 <strong>터미널(CLI) 기반 AI 코딩 도구</strong>입니다. 웹 브라우저나 에디터가 아닌, 개발자가 가장 많이 사용하는 터미널에서 직접 동작합니다.</p>

<p class="mt-4 text-stone-700 leading-relaxed">단순히 코드를 제안하는 수준이 아닙니다. 프로젝트 전체 코드베이스를 탐색하고, 파일을 직접 읽고 쓰며, 테스트를 실행하고, Git 커밋까지 수행하는 <strong>에이전틱(agentic) AI</strong>입니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
"Claude Code는 개발자 옆에 24시간 앉아있는 시니어 개발자 + QA 엔지니어 + 보안 전문가입니다."
</div>

<h4 class="mt-6 text-lg font-semibold text-stone-900">무엇을 할 수 있나요?</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>새 기능 구현: 설계부터 테스트까지 전체 흐름을 자동화</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>버그 디버깅: 에러 메시지를 붙여넣으면 코드베이스에서 원인 추적</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>코드 리팩토링: 수십 개 파일에 걸친 대규모 구조 변경</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>TDD 워크플로우: 테스트 먼저 작성 후 구현하는 흐름 강제</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>Git 자동화: 커밋 메시지 작성, PR 생성, 브랜치 관리</span></li>
</ul>`,
      },
      {
        id: "comparison",
        title: "ChatGPT / Cursor / Copilot과 비교",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">기존 AI 코딩 도구들은 각각 다른 인터페이스와 한계를 가지고 있습니다. Claude Code는 터미널에서 직접 동작하기 때문에 근본적으로 다른 접근 방식을 취합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">비교 항목</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">ChatGPT</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">Cursor</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">GitHub Copilot</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">Claude Code</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 text-stone-600">작동 방식</td><td class="p-3 border-b border-stone-100">웹 브라우저 채팅</td><td class="p-3 border-b border-stone-100">VS Code 확장</td><td class="p-3 border-b border-stone-100">에디터 인라인</td><td class="p-3 border-b border-stone-100 font-medium">터미널 CLI</td></tr>
    <tr><td class="p-3 border-b border-stone-100 text-stone-600">코드 실행</td><td class="p-3 border-b border-stone-100">불가</td><td class="p-3 border-b border-stone-100">제한적</td><td class="p-3 border-b border-stone-100">불가</td><td class="p-3 border-b border-stone-100 font-medium">직접 실행</td></tr>
    <tr><td class="p-3 border-b border-stone-100 text-stone-600">프로젝트 이해</td><td class="p-3 border-b border-stone-100">붙여넣기만</td><td class="p-3 border-b border-stone-100">열린 파일 위주</td><td class="p-3 border-b border-stone-100">현재 파일</td><td class="p-3 border-b border-stone-100 font-medium">전체 코드베이스 탐색</td></tr>
    <tr><td class="p-3 border-b border-stone-100 text-stone-600">Git 연동</td><td class="p-3 border-b border-stone-100">없음</td><td class="p-3 border-b border-stone-100">제한적</td><td class="p-3 border-b border-stone-100">없음</td><td class="p-3 border-b border-stone-100 font-medium">커밋/PR/브랜치 직접 조작</td></tr>
    <tr><td class="p-3 border-b border-stone-100 text-stone-600">자동화</td><td class="p-3 border-b border-stone-100">없음</td><td class="p-3 border-b border-stone-100">제한적</td><td class="p-3 border-b border-stone-100">없음</td><td class="p-3 border-b border-stone-100 font-medium">훅/에이전트/커맨드</td></tr>
    <tr><td class="p-3 text-stone-600">확장성</td><td class="p-3">플러그인</td><td class="p-3">VS Code 확장</td><td class="p-3">제한적</td><td class="p-3 font-medium">Rules + Hooks + Agents + Skills</td></tr>
  </tbody>
</table>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>핵심 차이점:</strong> ChatGPT는 "대화"하고, Cursor는 "편집"하지만, Claude Code는 "직접 행동"합니다. 파일 시스템, 터미널, Git에 대한 완전한 접근 권한을 가집니다.</p>
</div>`,
      },
      {
        id: "why-terminal",
        title: "왜 터미널인가?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">많은 분이 "왜 굳이 터미널?"이라고 묻습니다. GUI가 더 편하지 않냐고요. 하지만 <strong>에이전틱 AI</strong>에게 터미널은 최적의 환경입니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">에이전틱 패러다임이란?</h4>
<p class="mt-4 text-stone-700 leading-relaxed">기존 AI 코딩 도구는 "제안형"입니다. 코드를 추천하면 개발자가 수락/거절합니다. 에이전틱 AI는 다릅니다. <strong>스스로 계획하고, 실행하고, 검증하는 자율적 행동 루프</strong>를 가집니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 에이전틱 AI의 행동 루프
Plan    -> 요구사항 분석, 구현 계획 수립
Act     -> 파일 읽기/쓰기, 코드 실행
Observe -> 테스트 결과 확인, 에러 분석
Reflect -> 결과 평가, 다음 행동 결정
Repeat  -> 목표 달성까지 반복
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">터미널은 이 루프의 모든 단계를 수행할 수 있는 유일한 인터페이스입니다. 파일 시스템 접근, 프로세스 실행, 네트워크 통신 등 운영체제의 모든 기능을 사용할 수 있기 때문입니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">터미널의 장점</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>편집기 독립적:</strong> VS Code, Vim, Neovim, JetBrains 어떤 에디터와도 함께 사용 가능</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>자동화 친화적:</strong> CI/CD 파이프라인에 통합 가능 (Headless Mode)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>도구 체인 통합:</strong> grep, git, npm, pytest 등 기존 개발 도구와 자연스럽게 연결</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>병렬 작업:</strong> 여러 터미널에서 동시에 다른 작업 수행 가능 (Worktree)</span></li>
</ul>`,
      },
      {
        id: "market-2026",
        title: "2026년 시장 현황",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">2026년 현재, AI 코딩 도구 시장은 에이전틱 패러다임으로 빠르게 이동하고 있습니다. Claude Code는 이 전환의 중심에 있습니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">주요 수치</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>46% 선호도:</strong> 개발자 설문에서 Claude Code가 AI 코딩 도구 1위 선호도 기록</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>SWE-bench Verified:</strong> Claude 모델이 소프트웨어 엔지니어링 벤치마크에서 최고 성적</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Terminal Bench 2.0:</strong> 하네스 엔지니어링으로 동일 모델에서 +13.7점 성능 향상 가능</span></li>
</ul>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
"모델을 바꾸지 않고 하네스만 최적화해도 성능을 대폭 올릴 수 있다는 것이 2026년의 핵심 발견입니다. 이 저장소가 바로 그 하네스입니다."
</div>

<p class="mt-4 text-stone-700 leading-relaxed">Claude Code의 강점은 단순히 모델 성능만이 아닙니다. <strong>Rules, Hooks, Agents, Skills, Commands</strong>라는 5가지 확장 시스템을 통해 개발자가 자신의 워크플로우를 완전히 커스터마이징할 수 있다는 점입니다. 이 튜토리얼에서 다루는 하네스 셋업이 바로 이 확장 시스템을 최적화한 결과물입니다.</p>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 2: 하네스 엔지니어링
  // ─────────────────────────────────────────────
  {
    slug: "harness",
    number: 2,
    title: "하네스 엔지니어링",
    subtitle: "모델을 바꾸지 않고 성능을 올리는 기술",
    description:
      "하네스 엔지니어링이 무엇인지, 왜 중요한지, 이 저장소가 어떻게 구현하는지를 설명합니다.",
    sections: [
      {
        id: "what-is-harness",
        title: "하네스란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>하네스(Harness)</strong>는 AI 모델을 감싸는 시스템 전체를 말합니다. 자동차에 비유하면 이해하기 쉽습니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">자동차</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">AI 하네스</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">엔진</td><td class="p-3 border-b border-stone-100">AI 모델 (Claude Opus/Sonnet/Haiku)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">안전벨트, 에어백</td><td class="p-3 border-b border-stone-100">Hooks (위험 명령어 차단, 시크릿 감지)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">네비게이션</td><td class="p-3 border-b border-stone-100">Rules (워크플로우 규칙, 코딩 스타일)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">자동 주행 보조</td><td class="p-3 border-b border-stone-100">Agents (전문가 에이전트 팀)</td></tr>
    <tr><td class="p-3">매뉴얼/지식</td><td class="p-3">Skills (전문 지식 라이브러리)</td></tr>
  </tbody>
</table>

<p class="mt-4 text-stone-700 leading-relaxed">같은 엔진(모델)이라도 차체(하네스)의 설계에 따라 성능과 안전성이 크게 달라집니다. 하네스 엔지니어링은 <strong>모델을 교체하지 않고 감싸는 시스템만 개선하여 성능을 높이는 방법론</strong>입니다.</p>`,
      },
      {
        id: "langchain-case",
        title: "LangChain 사례: 52.8% -> 66.5%",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">하네스 엔지니어링의 효과를 가장 잘 보여주는 사례는 LangChain의 Terminal Bench 2.0 실험입니다.</p>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>실험 결과:</strong> 동일한 모델(Claude)을 사용하면서 하네스만 개선한 결과, Terminal Bench 2.0에서 52.8%에서 66.5%로 <strong>+13.7점</strong> 상승했습니다. 순위로는 Top 30에서 Top 5로 진입했습니다.</p>
</div>

<p class="mt-4 text-stone-700 leading-relaxed">어떻게 가능했을까요? LangChain 팀이 변경한 것은 세 가지뿐입니다:</p>

<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">1.</span><span><strong>System Prompt 개선:</strong> 문제 해결 절차를 4단계(Plan, Build, Verify, Fix)로 구조화</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">2.</span><span><strong>도구 구성 최적화:</strong> 원자적이고 견고한 도구 제공</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">3.</span><span><strong>미들웨어 추가:</strong> 반복 루프 감지, 자기 검증 강제, 환경 맥락 주입</span></li>
</ul>

<p class="mt-4 text-stone-700 leading-relaxed">모델 자체는 한 줄도 바꾸지 않았습니다. 이것이 하네스 엔지니어링의 핵심입니다.</p>`,
      },
      {
        id: "three-axes",
        title: "하네스 3축: Prompt + Tools + Middleware",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">하네스를 바꿀 수 있는 지점은 정확히 세 가지로 압축됩니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">1. System Prompt (행동 규칙)</h4>
<p class="mt-4 text-stone-700 leading-relaxed">AI가 어떻게 행동해야 하는지 정의합니다. Claude Code에서는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/rules/</code> 디렉토리의 마크다운 파일들이 이 역할을 합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">2. Tools (도구)</h4>
<p class="mt-4 text-stone-700 leading-relaxed">AI가 사용할 수 있는 도구를 선택하고 구성합니다. 에이전트별로 사용 가능한 도구를 제한하여 안전성과 효율성을 높입니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">3. Middleware (미들웨어)</h4>
<p class="mt-4 text-stone-700 leading-relaxed">모델 호출과 도구 호출을 감싸는 훅입니다. Claude Code에서는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/hooks/</code> 디렉토리의 셸 스크립트들이 미들웨어 역할을 합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 미들웨어 파이프라인 (이 저장소의 구현)

Agent Request
  -> env-context-injector.sh      (환경 맥락 자동 주입)
  -> dangerous-command-blocker.sh  (위험 명령어 차단)
  -> secret-detector.sh            (시크릿/API 키 감지)
Agent Action
  -> verification-loop.sh          (코드 변경 후 테스트 자동 실행)
  -> loop-detector.sh              (반복 편집 감지)
  -> console-log-warning.sh        (console.log 경고)
Agent Response
  -> pre-completion-check.sh       (종료 전 검증)
  -> session-learning.sh           (세션 학습 리마인더)
</pre>`,
      },
      {
        id: "repo-implementation",
        title: "이 저장소의 구현 방식",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">이 저장소는 하네스 엔지니어링의 세 축을 Claude Code의 확장 시스템에 맞게 구현합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">하네스 축</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">Claude Code 매핑</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">이 저장소의 구현</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">System Prompt</td><td class="p-3 border-b border-stone-100">Rules + CLAUDE.md</td><td class="p-3 border-b border-stone-100">12개 규칙 파일 + 전역 지침</td></tr>
    <tr><td class="p-3 border-b border-stone-100">Tools</td><td class="p-3 border-b border-stone-100">Agents + Skills + Commands</td><td class="p-3 border-b border-stone-100">24개 에이전트 + 37개 스킬 + 30개 커맨드</td></tr>
    <tr><td class="p-3">Middleware</td><td class="p-3">Hooks</td><td class="p-3">25개 훅 스크립트 (7-Stage 파이프라인)</td></tr>
  </tbody>
</table>

<p class="mt-4 text-stone-700 leading-relaxed">총 <strong>91개 이상의 도구</strong>가 11개 카테고리(code-quality, testing, security, planning, frontend, backend, ai-ml, devops, documentation, learning, product)로 체계화되어 있습니다.</p>

<div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
  <p class="text-amber-800 text-sm"><strong>설계 원칙 - Rippable:</strong> 모델이 똑똑해지면 제거할 수 있는 로직만 넣습니다. 거대한 제어 흐름이나 하드코딩된 파이프라인은 만들지 않습니다. 모델 버전마다 최적 구조가 다르기 때문입니다.</p>
</div>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 3: 설치하기
  // ─────────────────────────────────────────────
  {
    slug: "install",
    number: 3,
    title: "설치하기",
    subtitle: "15분 안에 완전한 하네스 셋업 완료",
    description:
      "사전 준비부터 설치, 확인, 업데이트, 제거까지 모든 설치 관련 과정을 다룹니다.",
    sections: [
      {
        id: "prerequisites",
        title: "사전 준비",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">설치 전 다음 도구들이 설치되어 있어야 합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">도구</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">용도</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">확인 명령어</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-medium">Claude Code CLI</td><td class="p-3 border-b border-stone-100">핵심 도구</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">claude --version</code></td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">Git</td><td class="p-3 border-b border-stone-100">저장소 클론</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">git --version</code></td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">Node.js 18+</td><td class="p-3 border-b border-stone-100">JS/TS 관련 훅</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">node --version</code></td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">jq</td><td class="p-3 border-b border-stone-100">훅에서 JSON 파싱</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">jq --version</code></td></tr>
    <tr><td class="p-3 font-medium">Python 3.10+ (선택)</td><td class="p-3">Python 관련 스킬</td><td class="p-3"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">python --version</code></td></tr>
  </tbody>
</table>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>Claude Code CLI 설치:</strong> 아직 설치하지 않았다면 <code class="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">npm install -g @anthropic-ai/claude-code</code> 로 설치하세요. Anthropic API 키가 필요합니다.</p>
</div>`,
      },
      {
        id: "install-steps",
        title: "설치 단계",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Step 1: 저장소 클론</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
git clone https://github.com/hyunseung1119/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Step 2: 설치 스크립트 실행</h4>

<p class="mt-4 text-stone-700 leading-relaxed"><strong>macOS / Linux:</strong></p>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
chmod +x setup.sh
./setup.sh
</pre>

<p class="mt-4 text-stone-700 leading-relaxed"><strong>Windows (PowerShell 관리자 권한):</strong></p>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\\setup.ps1
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Step 3: Claude Code 재시작</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 터미널을 닫고 다시 열거나
claude  # Claude Code 재시작
</pre>`,
      },
      {
        id: "what-setup-does",
        title: "설치 스크립트가 하는 일",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">설치 스크립트는 원본 파일을 복사하지 않고 <strong>심볼릭 링크(symbolic link)</strong>를 생성합니다. 이를 통해 저장소를 업데이트하면 자동으로 최신 버전이 적용됩니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 설치 스크립트의 핵심 동작

# 1. 디렉토리 생성
mkdir -p ~/.claude/skills ~/.claude/agents ~/.claude/rules ~/.claude/hooks

# 2. Skills 심볼릭 링크 (37개 디렉토리)
ln -sf /path/to/repo/skills/product-planner ~/.claude/skills/product-planner
ln -sf /path/to/repo/skills/tdd-workflow   ~/.claude/skills/tdd-workflow
# ... 37개 스킬 디렉토리

# 3. Agents 심볼릭 링크 (24개 파일)
ln -sf /path/to/repo/agents/planner.md     ~/.claude/agents/planner.md
ln -sf /path/to/repo/agents/code-reviewer.md ~/.claude/agents/code-reviewer.md
# ... 24개 에이전트 파일

# 4. Rules 심볼릭 링크 (12개 파일)
ln -sf /path/to/repo/rules/workflow.md     ~/.claude/rules/workflow.md
ln -sf /path/to/repo/rules/security.md     ~/.claude/rules/security.md
# ... 12개 규칙 파일

# 5. Hooks 심볼릭 링크 + 실행 권한 (25개 파일)
ln -sf /path/to/repo/hooks/dangerous-command-blocker.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
</pre>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>심볼릭 링크의 장점:</strong> <code class="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">git pull</code>만 하면 모든 규칙, 훅, 에이전트, 스킬이 자동으로 업데이트됩니다. 별도의 재설치가 필요 없습니다.</p>
</div>`,
      },
      {
        id: "verify-install",
        title: "설치 확인 방법",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">설치 스크립트가 완료되면 다음과 같은 확인 메시지가 출력됩니다:</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
==================================================
  Installation Complete!
==================================================
Success: 98 | Failed: 0

Verifying installation...
  37 skills installed
  24 agents installed
  12 rules installed
  25 hooks installed

Next Steps:
1. Restart Claude Code CLI
2. Test a skill: /product-planner "AI education platform"
3. See all skills: ls ~/.claude/skills
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">수동으로 확인하려면:</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 각 디렉토리 파일 수 확인
ls ~/.claude/skills  | wc -l   # 37
ls ~/.claude/agents  | wc -l   # 24
ls ~/.claude/rules   | wc -l   # 12
ls ~/.claude/hooks   | wc -l   # 25

# Claude Code에서 도구 레지스트리 확인
claude
> /tool-registry list all
# "Tool Registry: 91 tools available" 출력 확인
</pre>`,
      },
      {
        id: "update-uninstall",
        title: "업데이트 / 제거",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">업데이트</h4>
<p class="mt-4 text-stone-700 leading-relaxed">심볼릭 링크 방식이므로 저장소를 업데이트하면 자동 반영됩니다.</p>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
cd /path/to/My_ClaudeCode_Skill
git pull origin main
# 끝! 자동으로 최신 버전 적용
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">제거</h4>
<p class="mt-4 text-stone-700 leading-relaxed">제거 스크립트로 깔끔하게 정리할 수 있습니다.</p>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# macOS / Linux
./uninstall.sh

# Windows (PowerShell)
.\\uninstall.ps1
</pre>

<div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
  <p class="text-amber-800 text-sm"><strong>주의:</strong> 제거 스크립트는 심볼릭 링크만 삭제합니다. 직접 만든 규칙이나 스킬은 영향받지 않습니다. <code class="bg-amber-100 px-1.5 py-0.5 rounded text-xs">settings.local.json</code>의 훅 설정은 수동으로 제거해야 합니다.</p>
</div>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 4: Rules
  // ─────────────────────────────────────────────
  {
    slug: "rules",
    number: 4,
    title: "Rules -- AI 행동 규칙",
    subtitle: "12개 규칙 파일로 AI의 행동을 체계적으로 제어",
    description:
      "규칙이 무엇인지, 12개 규칙 파일 각각의 역할, 규칙이 실제로 어떤 차이를 만드는지 설명합니다.",
    sections: [
      {
        id: "what-are-rules",
        title: "규칙이란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>규칙(Rules)</strong>은 AI에게 주는 업무 매뉴얼입니다. 신입 사원이 첫 출근했을 때 받는 "우리 팀은 이렇게 일합니다" 문서와 같습니다.</p>

<p class="mt-4 text-stone-700 leading-relaxed">Claude Code는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/rules/</code> 디렉토리의 모든 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">.md</code> 파일을 세션 시작 시 자동으로 읽어들입니다. 이 파일들이 AI의 행동 방식, 코딩 스타일, 보안 기준, 워크플로우를 결정합니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
비유: 규칙이 없는 Claude Code는 실력 좋지만 우리 팀 컨벤션을 모르는 프리랜서입니다. 규칙을 설정하면 우리 팀 방식을 완벽히 아는 팀원이 됩니다.
</div>

<h4 class="mt-6 text-lg font-semibold text-stone-900">12개 규칙 파일 전체 목록</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">파일명</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">역할</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">적용 시점</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">workflow.md</td><td class="p-3 border-b border-stone-100">핵심 워크플로우 (Explain->Approve->Execute)</td><td class="p-3 border-b border-stone-100">항상</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">defaults.md</td><td class="p-3 border-b border-stone-100">기본 행동 규칙, 모드 전환, Git 규칙</td><td class="p-3 border-b border-stone-100">항상</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">coding-style.md</td><td class="p-3 border-b border-stone-100">코딩 스타일, 함수/파일 길이 제한</td><td class="p-3 border-b border-stone-100">코드 작성 시</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">testing.md</td><td class="p-3 border-b border-stone-100">TDD 강제, 80%+ 커버리지</td><td class="p-3 border-b border-stone-100">테스트 관련</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">security.md</td><td class="p-3 border-b border-stone-100">OWASP Top 10, 시크릿 관리</td><td class="p-3 border-b border-stone-100">보안 관련</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">agents.md</td><td class="p-3 border-b border-stone-100">24개 에이전트 디스패치 규칙</td><td class="p-3 border-b border-stone-100">항상</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">hooks.md</td><td class="p-3 border-b border-stone-100">25개 훅 스크립트 가이드</td><td class="p-3 border-b border-stone-100">훅 설정 변경 시</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">git-workflow.md</td><td class="p-3 border-b border-stone-100">Conventional Commits, PR 워크플로우</td><td class="p-3 border-b border-stone-100">Git 관련</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">context-management.md</td><td class="p-3 border-b border-stone-100">세션 관리, 컴팩트, 멀티 세션</td><td class="p-3 border-b border-stone-100">세션 관리 시</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">harness-engineering.md</td><td class="p-3 border-b border-stone-100">하네스 설계 원칙, 미들웨어 패턴</td><td class="p-3 border-b border-stone-100">참조용</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">cs-boost.md</td><td class="p-3 border-b border-stone-100">CS 역량 강화 (변경 요약, 에러 분해)</td><td class="p-3 border-b border-stone-100">항상</td></tr>
    <tr><td class="p-3 font-mono text-xs">advanced-workflows.md</td><td class="p-3">Headless, Worktree, /loop, Auto Mode</td><td class="p-3">고급 기능 사용 시</td></tr>
  </tbody>
</table>`,
      },
      {
        id: "workflow-rule",
        title: "workflow.md 상세",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">가장 중요한 규칙 파일입니다. AI가 코드를 작성하기 전 반드시 거쳐야 하는 <strong>4단계 루프</strong>를 정의합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# Core Loop (ALWAYS)

1. Explain  -> 문제 분석 + WHY + 대안 트레이드오프 (코드 없이)
              접근법 2개+: Option A: [이름] -- [근거] (장단점)
2. Approve  -> 사용자 확인 후 진행
3. Execute  -> 코드 작성
4. Reflect  -> 핵심 설계 결정 1~2문장 요약
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">이 규칙이 없으면 AI는 요청을 받자마자 바로 코드를 작성합니다. 이 규칙이 있으면 <strong>먼저 설명하고 승인을 받은 후에만</strong> 코드를 작성합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Evidence Rule</h4>
<p class="mt-4 text-stone-700 leading-relaxed">설계나 라이브러리 선택 시 반드시 근거를 제시해야 합니다.</p>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>허용: 벤치마크 수치, 공식 문서, 팀 컨벤션, "근거 없음 -- 측정 필요"</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>금지: "~것 같다", "~면 좋을 것 같다", "권장됩니다"</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Command -> Agent 자동 연결</h4>
<p class="mt-4 text-stone-700 leading-relaxed">슬래시 커맨드를 실행하면 대응하는 에이전트가 자동으로 호출됩니다:</p>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
/plan         -> planner 에이전트
/code-review  -> code-reviewer 에이전트
/tdd          -> tdd-guide 에이전트
/verify       -> build-error-resolver (빌드 실패 시)
/e2e          -> e2e-runner 에이전트
/multi-agent  -> coordinator 에이전트
</pre>`,
      },
      {
        id: "coding-style-rule",
        title: "coding-style.md 상세",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">코드 품질을 일관되게 유지하기 위한 구체적인 수치 기준을 정의합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">핵심 원칙</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Functional Core, Imperative Shell:</strong> 순수 비즈니스 로직을 I/O에서 분리</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Type-Driven:</strong> 타입/인터페이스를 먼저 정의하고 구현</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Immutability:</strong> 기존 객체를 변경하지 않고 새 객체 생성</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">수치 제한</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">메트릭</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">목표값</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">함수 길이</td><td class="p-3 border-b border-stone-100">50줄 미만</td></tr>
    <tr><td class="p-3 border-b border-stone-100">파일 길이</td><td class="p-3 border-b border-stone-100">400줄 미만 (최대 800줄)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">순환 복잡도</td><td class="p-3 border-b border-stone-100">함수당 10 미만</td></tr>
    <tr><td class="p-3 border-b border-stone-100">중첩 깊이</td><td class="p-3 border-b border-stone-100">4단계 미만</td></tr>
    <tr><td class="p-3">테스트 커버리지</td><td class="p-3">80% 이상</td></tr>
  </tbody>
</table>

<p class="mt-4 text-stone-700 leading-relaxed">이 규칙들은 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">*.ts, *.js, *.tsx, *.jsx, *.py, *.go, *.rs</code> 파일에 대해 적용됩니다 (globs 설정).</p>`,
      },
      {
        id: "testing-security-rules",
        title: "testing.md / security.md 상세",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">testing.md -- TDD 강제</h4>
<p class="mt-4 text-stone-700 leading-relaxed">테스트를 선택이 아닌 의무로 만듭니다. 모든 새 기능은 반드시 TDD 워크플로우를 따라야 합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 필수 TDD 워크플로우
1. Write test first (RED)    -- 테스트 먼저 작성
2. Run test - should FAIL    -- 실패 확인
3. Write minimal code (GREEN) -- 최소 구현
4. Run test - should PASS    -- 통과 확인
5. Refactor (IMPROVE)        -- 리팩토링
6. Verify coverage (80%+)    -- 커버리지 확인
</pre>

<p class="mt-4 text-stone-700 leading-relaxed"><strong>금지 패턴</strong> (테스트를 약화시키는 행위):</p>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">toBeTruthy()</code>로 구체적 매처를 대체하는 것</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>이유 없는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">test.skip</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">xit</code> 사용</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>30초 이상 타임아웃 설정 (정당한 이유 없이)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>테스트 통과를 위해 assertion 제거</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">security.md -- OWASP API Top 10</h4>
<p class="mt-4 text-stone-700 leading-relaxed">모든 보안 관련 코드에 대해 OWASP API Top 10 리스크를 체크합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">리스크</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">규칙</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-medium">BOLA</td><td class="p-3 border-b border-stone-100">데이터 반환 전 객체 소유권 확인 필수</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">BFLA</td><td class="p-3 border-b border-stone-100">관리자 엔드포인트에 역할 체크 미들웨어 필수</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">Mass Assignment</td><td class="p-3 border-b border-stone-100">req.body 직접 전달 금지, 허용 필드 화이트리스트</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">Data Exposure</td><td class="p-3 border-b border-stone-100">DTO 사용, 필요한 필드만 반환</td></tr>
    <tr><td class="p-3 font-medium">Rate Limiting</td><td class="p-3">전역 + 인증 엔드포인트 엄격 제한</td></tr>
  </tbody>
</table>`,
      },
      {
        id: "rules-comparison",
        title: "규칙이 없을 때 vs 있을 때",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">같은 요청을 규칙 없이 vs 규칙과 함께 했을 때의 차이를 비교합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">요청: "사용자 인증 API를 만들어줘"</h4>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">규칙 없이</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">규칙과 함께</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">바로 코드 작성 시작</td><td class="p-3 border-b border-stone-100">먼저 2가지 접근법 제시 (JWT vs Session)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">비밀번호 평문 저장 가능</td><td class="p-3 border-b border-stone-100">bcrypt + salt 필수 (security.md)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">테스트 없음</td><td class="p-3 border-b border-stone-100">TDD로 테스트 먼저 작성 (testing.md)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">console.log 사용</td><td class="p-3 border-b border-stone-100">구조화된 로거 사용 (coding-style.md)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">200줄 단일 파일</td><td class="p-3 border-b border-stone-100">50줄 이하 함수들로 분리 (coding-style.md)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">Rate limiting 없음</td><td class="p-3 border-b border-stone-100">인증 엔드포인트 strict rate limit (security.md)</td></tr>
    <tr><td class="p-3">SQL 문자열 보간</td><td class="p-3">파라미터 바인딩 필수 (security.md)</td></tr>
  </tbody>
</table>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>실무 효과:</strong> 규칙은 코드 리뷰에서 지적될 사항을 사전에 방지합니다. AI가 처음부터 팀 표준에 맞는 코드를 작성하므로, 리뷰 시간이 대폭 줄어듭니다.</p>
</div>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 5: Hooks
  // ─────────────────────────────────────────────
  {
    slug: "hooks",
    number: 5,
    title: "Hooks -- 자동 품질 검사",
    subtitle: "25개 셸 스크립트가 만드는 7-Stage 품질 파이프라인",
    description:
      "훅이 무엇인지, 7단계 파이프라인이 어떻게 동작하는지, 각 훅의 역할과 실제 차단 예시를 보여줍니다.",
    sections: [
      {
        id: "what-are-hooks",
        title: "훅이란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>훅(Hooks)</strong>은 AI의 행동 전후에 자동으로 실행되는 검사 스크립트입니다. 공장의 품질 검사 라인에 비유할 수 있습니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
비유: 자동차 공장에서 도장 후 검사, 조립 후 검사, 출하 전 최종 검사를 하듯이, 훅은 AI가 행동할 때마다 자동으로 품질 검사를 수행합니다.
</div>

<p class="mt-4 text-stone-700 leading-relaxed">Claude Code의 훅은 7가지 시점(Stage)에 트리거됩니다. 각 시점에서 하나 이상의 셸 스크립트가 실행되어, AI의 행동을 감시하고 필요하면 차단합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">훅의 핵심 특징</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>자동 실행:</strong> 개발자가 개입하지 않아도 매 행동마다 실행</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>차단 가능:</strong> 위험한 행동을 감지하면 JSON으로 차단 결정 반환</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>피드백 주입:</strong> 검사 결과를 AI의 컨텍스트에 주입하여 자가 수정 유도</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>독립적:</strong> 각 훅은 독립 셸 스크립트, 순서나 의존성 없이 실행</span></li>
</ul>`,
      },
      {
        id: "seven-stage-pipeline",
        title: "7-Stage 파이프라인",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">모든 훅은 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">settings.local.json</code>에서 7개 시점(Stage)에 매핑됩니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">Stage</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">시점</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">실행 훅</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-medium">1. SessionStart</td><td class="p-3 border-b border-stone-100">세션 시작</td><td class="p-3 border-b border-stone-100">env-context-injector, progress-loader, regression-gate</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">2. UserPromptSubmit</td><td class="p-3 border-b border-stone-100">사용자 입력 시</td><td class="p-3 border-b border-stone-100">env-context-injector</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">3. PreToolUse</td><td class="p-3 border-b border-stone-100">도구 실행 전</td><td class="p-3 border-b border-stone-100">dangerous-command-blocker, pre-commit-security, code-quality-gate, test-coverage-gate, secret-detector</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">4. PostToolUse</td><td class="p-3 border-b border-stone-100">도구 실행 후</td><td class="p-3 border-b border-stone-100">dependency-audit, trace-logger, learning-indexer, console-log-warning, loop-detector, verification-loop, observability-metrics</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">5. PostToolUseFailure</td><td class="p-3 border-b border-stone-100">도구 실패 시</td><td class="p-3 border-b border-stone-100">failure-explainer</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">6. PostCompact</td><td class="p-3 border-b border-stone-100">컴팩트 후</td><td class="p-3 border-b border-stone-100">compact-checkpoint</td></tr>
    <tr><td class="p-3 font-medium">7. Stop</td><td class="p-3">세션 종료 시</td><td class="p-3">dod-checker, progress-tracker, pre-completion-check, session-learning</td></tr>
  </tbody>
</table>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 흐름 시각화

Session Start
  |-> env-context-injector (환경 정보 수집)
  |-> progress-loader (진행 상황 로드)
  |-> regression-gate (회귀 테스트 확인)
  v
User Input -> env-context-injector (환경 재확인)
  v
Pre Tool Use
  |-> dangerous-command-blocker (rm -rf, DROP TABLE 차단)
  |-> secret-detector (API 키 감지)
  |-> pre-commit-security (커밋 전 보안 검사)
  v
[Tool Execution]
  v
Post Tool Use
  |-> verification-loop (테스트 자동 실행)
  |-> loop-detector (반복 편집 감지)
  |-> console-log-warning (console.log 경고)
  v
Stop
  |-> pre-completion-check (완료 전 검증)
  |-> session-learning (학습 저장)
</pre>`,
      },
      {
        id: "safety-hooks",
        title: "안전 훅 상세",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">1. dangerous-command-blocker.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed">시스템을 파괴할 수 있는 위험한 명령어를 실행 전에 차단합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 차단 대상 명령어
rm -rf /              # 파일 시스템 삭제
git push --force      # 원격 히스토리 덮어쓰기
git reset --hard      # 커밋되지 않은 변경 영구 삭제
git clean -f          # 추적되지 않는 파일 영구 삭제
DROP TABLE users;     # 데이터베이스 테이블 삭제

# 차단 시 반환하는 JSON
{"decision":"block","reason":"[SAFETY] rm -rf detected. Verify the target path carefully."}
</pre>

<div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
  <p class="text-amber-800 text-sm"><strong>참고:</strong> <code class="bg-amber-100 px-1.5 py-0.5 rounded text-xs">git push --force-with-lease</code>는 안전한 대안이므로 차단하지 않습니다.</p>
</div>

<h4 class="mt-6 text-lg font-semibold text-stone-900">2. secret-detector.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed">코드에 하드코딩된 시크릿(API 키, 토큰, 비밀번호)을 감지합니다. 14개 제공자의 키 패턴을 인식합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 감지 대상 (14개 제공자)
sk-[a-zA-Z0-9]{20,}         # OpenAI API 키
sk-ant-[a-zA-Z0-9]{20,}     # Anthropic API 키
AKIA[0-9A-Z]{16}             # AWS Access Key
ghp_[a-zA-Z0-9]{36}          # GitHub Personal Token
xox[bprs]-...                # Slack 토큰
AIza[a-zA-Z0-9_-]{35}        # Google API 키
whsec_...                    # Stripe Webhook Secret
glpat-...                    # GitLab Personal Token
# ... 총 14개 패턴
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">3. test-coverage-gate.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">git commit</code> 실행 전에 테스트 커버리지가 80% 이상인지 확인합니다. Python(pytest), Node.js(vitest/jest), Go 프로젝트를 자동 감지합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 커버리지 미달 시 반환
{"decision":"block","reason":"[COVERAGE GATE] Python (pytest + coverage) coverage < 80%. Run tests and improve coverage."}

# 10분 캐시로 반복 실행 방지
# 타임아웃 5초로 빌드 차단 방지
</pre>`,
      },
      {
        id: "verification-loop",
        title: "Verification Loop (Spotify Honk 패턴)",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>verification-loop.sh</strong>는 이 하네스의 핵심 훅입니다. 코드를 수정할 때마다 관련 테스트를 자동으로 찾아 실행하고, 실패하면 결과를 AI 컨텍스트에 주입합니다.</p>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>출처:</strong> Spotify의 Honk 시스템에서 영감. 환각 34% 감소, 코드 품질 28% 향상을 보고했습니다. Dust.tt의 test-parse-feedback 사이클도 참고했습니다.</p>
</div>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# Verification Loop 동작 흐름

1. 소스 파일 변경 감지 (*.py, *.ts, *.tsx, *.js, *.jsx, *.go, *.rs)
2. 테스트 파일 자동 검색
   - Python: test_*.py, *_test.py
   - TypeScript: *.test.ts, *.spec.ts
   - Go: *_test.go (같은 패키지)
   - Rust: #[test] 또는 tests/ 디렉토리
3. 테스트 실행 (5초 타임아웃)
4. 성공 -> 조용히 통과 (출력 없음)
5. 실패 -> AI 컨텍스트에 피드백 주입:
   "[Verification Loop] Related test FAILED after code change.
    Source: src/auth.ts
    Test: src/auth.test.ts
    Failure output: ..."
6. AI가 자동으로 실패 원인 파악 및 수정
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">테스트 파일 자체를 수정할 때는 실행하지 않습니다 (무한 루프 방지). 또한 30초 디바운스로 연속 편집 시 과도한 테스트 실행을 방지합니다.</p>`,
      },
      {
        id: "quality-hooks",
        title: "품질 훅 (포맷터, 타입 체크, 린트)",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">프로젝트별로 활성화할 수 있는 코드 품질 훅들입니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">prettier-format.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed">JS/TS/CSS/JSON 파일 편집 후 자동으로 Prettier 포맷팅을 실행합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">tsc-check.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed">TypeScript 파일 편집 후 타입 체크를 실행합니다. 프로젝트의 tsconfig.json을 사용합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">ruff-format.sh</h4>
<p class="mt-4 text-stone-700 leading-relaxed">Python 파일 편집 후 ruff check --fix + ruff format을 자동 실행합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">기타 품질/관측 훅</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">훅</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">역할</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">console-log-warning.sh</td><td class="p-3 border-b border-stone-100">JS/TS에 console.log 추가 시 경고</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">loop-detector.sh</td><td class="p-3 border-b border-stone-100">같은 파일 반복 편집 감지, 접근법 변경 제안</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">failure-explainer.sh</td><td class="p-3 border-b border-stone-100">도구 실행 실패 시 에러 분해, WHY 추적 요구</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">dependency-audit.sh</td><td class="p-3 border-b border-stone-100">npm/pip install 후 취약점 스캔</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">trace-logger.sh</td><td class="p-3 border-b border-stone-100">도구 호출 추적 로그 기록</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">observability-metrics.sh</td><td class="p-3 border-b border-stone-100">편집 빈도, 패턴 메트릭 수집</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">compact-checkpoint.sh</td><td class="p-3 border-b border-stone-100">/compact 실행 시 진행 상황 체크포인트 저장</td></tr>
    <tr><td class="p-3 font-mono text-xs">dod-checker.sh</td><td class="p-3">세션 종료 전 Definition of Done 확인</td></tr>
  </tbody>
</table>`,
      },
      {
        id: "hook-block-example",
        title: "실제 차단 예시",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">훅이 실제로 어떤 순간에 차단하는지 시나리오로 살펴봅니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">시나리오 1: 위험한 명령어</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# AI가 실행하려는 명령어
> rm -rf /tmp/old-builds

# dangerous-command-blocker.sh 반응
{"decision":"block","reason":"[SAFETY] rm -rf detected. Verify the target path carefully and use a more specific command."}

# AI가 대안으로 변경
> rm /tmp/old-builds/*.tar.gz  # 구체적 파일 패턴으로 변경
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">시나리오 2: 시크릿 하드코딩</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# AI가 작성하려는 코드
const apiKey = "sk-ant-abc123def456...";

# secret-detector.sh 반응
{"decision":"block","reason":"[SECURITY] Potential secret/API key detected in code. Use environment variables instead."}

# AI가 수정
const apiKey = process.env.ANTHROPIC_API_KEY;
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">시나리오 3: 커버리지 미달 커밋</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# AI가 git commit 시도
> git commit -m "feat: add payment service"

# test-coverage-gate.sh 반응
{"decision":"block","reason":"[COVERAGE GATE] Node (vitest) coverage < 80%. Run tests and improve coverage before committing."}

# AI가 추가 테스트 작성 후 재시도
</pre>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 6: Agents
  // ─────────────────────────────────────────────
  {
    slug: "agents",
    number: 6,
    title: "Agents -- 전문가 팀",
    subtitle: "24개 에이전트가 자동으로 역할 분담",
    description:
      "에이전트가 무엇인지, 4개 카테고리 24개 에이전트의 역할, 자동 트리거 흐름을 설명합니다.",
    sections: [
      {
        id: "what-are-agents",
        title: "에이전트란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>에이전트(Agent)</strong>는 특정 분야의 전문 지식과 행동 패턴을 가진 AI 역할입니다. 병원에 비유하면 이해하기 쉽습니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
비유: 종합병원에는 내과, 외과, 안과, 피부과 등 전문의가 있습니다. 환자의 증상에 따라 적절한 전문의에게 보내듯, Claude Code는 작업 유형에 따라 적절한 에이전트를 자동으로 호출합니다.
</div>

<p class="mt-4 text-stone-700 leading-relaxed">각 에이전트는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/agents/</code> 디렉토리의 마크다운 파일로 정의됩니다. 파일 안에는 에이전트의 역할, 전문 분야, 사용 가능한 도구, 행동 규칙이 기술됩니다.</p>

<p class="mt-4 text-stone-700 leading-relaxed">이 저장소에는 <strong>4개 카테고리, 24개 에이전트</strong>가 포함되어 있습니다.</p>`,
      },
      {
        id: "agent-categories",
        title: "24개 에이전트 카테고리",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Core Agents (7개) -- 핵심 에이전트</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">에이전트</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">역할</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">모델</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-medium">planner</td><td class="p-3 border-b border-stone-100">복잡한 기능, 리팩토링, 아키텍처 변경 계획</td><td class="p-3 border-b border-stone-100">Opus</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">code-reviewer</td><td class="p-3 border-b border-stone-100">코드 작성/수정 후 리뷰 (필수)</td><td class="p-3 border-b border-stone-100">Sonnet</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">tdd-guide</td><td class="p-3 border-b border-stone-100">TDD 워크플로우 강제 (테스트 먼저)</td><td class="p-3 border-b border-stone-100">Sonnet</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">security-reviewer</td><td class="p-3 border-b border-stone-100">인증, API, 입력 처리, 민감 데이터</td><td class="p-3 border-b border-stone-100">Sonnet</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">build-error-resolver</td><td class="p-3 border-b border-stone-100">빌드 실패, 타입 에러 해결</td><td class="p-3 border-b border-stone-100">Sonnet</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">debugger</td><td class="p-3 border-b border-stone-100">런타임 에러, 테스트 실패 디버깅</td><td class="p-3 border-b border-stone-100">Sonnet</td></tr>
    <tr><td class="p-3 font-medium">architect</td><td class="p-3">시스템 설계, 확장성, 기술 결정</td><td class="p-3">Opus</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Quality & Review Agents (10개) -- 품질 리뷰</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">에이전트</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">역할</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-medium">a11y-reviewer</td><td class="p-3 border-b border-stone-100">WCAG 2.1 접근성 검토</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">database-reviewer</td><td class="p-3 border-b border-stone-100">SQL, 마이그레이션, 스키마 설계</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">python-reviewer</td><td class="p-3 border-b border-stone-100">Python 타입 힌트, async, Pydantic</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">go-reviewer</td><td class="p-3 border-b border-stone-100">Go 이디오매틱 패턴, 동시성, 에러 처리</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">go-build-resolver</td><td class="p-3 border-b border-stone-100">Go 빌드, vet, 컴파일 에러 해결</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">graphql-expert</td><td class="p-3 border-b border-stone-100">GraphQL 스키마, 리졸버, 보안</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">rust-expert</td><td class="p-3 border-b border-stone-100">Rust 소유권, 라이프타임, 성능</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">refactor-cleaner</td><td class="p-3 border-b border-stone-100">데드 코드 제거, 통합</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-medium">performance-optimizer</td><td class="p-3 border-b border-stone-100">API 지연 시간, 토큰 효율, 쿼리 최적화</td></tr>
    <tr><td class="p-3 font-medium">doc-updater</td><td class="p-3">Codemap 생성, README/문서 업데이트</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Domain-Specific (4개) + Meta (3개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Domain:</strong> react-agent, e2e-runner, infrastructure-agent, vector-db-agent</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Meta:</strong> coordinator (멀티 에이전트 조율), critic-agent (자기 비평), tree-of-thoughts (다중 경로 탐색)</span></li>
</ul>`,
      },
      {
        id: "auto-trigger-flow",
        title: "자동 트리거 흐름 예시",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">사용자가 "결제 기능 만들어줘"라고 요청했을 때, 에이전트가 자동으로 연결되는 흐름입니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
사용자: "결제 기능 만들어줘"

1. [AUTO] planner 에이전트 호출 (새 기능 -> 필수)
   - 요구사항 분석, 단계별 계획 수립
   - 사용자 승인 대기

2. [AUTO] tdd-guide 에이전트 호출 (기능 구현)
   - 인터페이스 정의
   - 테스트 먼저 작성 (RED)
   - 최소 구현 (GREEN)
   - 리팩토링 (REFACTOR)

3. [AUTO] security-reviewer 에이전트 호출 (결제 = 인증/API)
   - OWASP 보안 체크
   - 입력 검증 확인
   - 민감 데이터 처리 검토

4. [AUTO] code-reviewer 에이전트 호출 (코드 수정 후 필수)
   - 코드 품질 리뷰
   - 설계 패턴 확인
   - 유지보수성 검토

5. [HOOKS] verification-loop (자동)
   - 작성된 테스트 자동 실행
   - 실패 시 피드백 주입
</pre>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>핵심:</strong> 사용자는 "결제 기능 만들어줘"만 입력했을 뿐입니다. planner, tdd-guide, security-reviewer, code-reviewer가 모두 <strong>자동으로</strong> 호출됩니다.</p>
</div>`,
      },
      {
        id: "reasoning-budget",
        title: "Reasoning Budget과 Tool Strategy",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Reasoning Budget (추론 예산 배분)</h4>
<p class="mt-4 text-stone-700 leading-relaxed">모든 단계에 같은 수준의 추론을 투입하면 비효율적입니다. Terminal Bench 2.0 실측 결과, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">high</code>(63.6%)가 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">xhigh</code>(53.9%)보다 좋았습니다. xhigh는 과도한 내부 토큰(50,000+)으로 타임아웃이 발생했기 때문입니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">단계</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">추론 수준</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">에이전트</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">Planning (계획)</td><td class="p-3 border-b border-stone-100 font-medium">high</td><td class="p-3 border-b border-stone-100">planner, architect (Opus)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">Implementation (구현)</td><td class="p-3 border-b border-stone-100 font-medium">high</td><td class="p-3 border-b border-stone-100">code-reviewer, tdd-guide (Sonnet)</td></tr>
    <tr><td class="p-3 border-b border-stone-100">Verification (검증)</td><td class="p-3 border-b border-stone-100 font-medium">high</td><td class="p-3 border-b border-stone-100">e2e-runner, debugger (Sonnet)</td></tr>
    <tr><td class="p-3">Simple edits (단순)</td><td class="p-3 font-medium">low</td><td class="p-3">doc-updater, refactor-cleaner (Haiku)</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Tool Strategy (Bash-First)</h4>
<p class="mt-4 text-stone-700 leading-relaxed">Princeton/Stanford의 mini-SWE-agent 연구에서 bash-only로 SWE-bench 74%를 달성했습니다. 전용 도구는 bash로 대체 불가능한 5-10% 케이스에만 사용합니다.</p>

<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Core agents:</strong> Read, Grep, Glob, Bash만 사용</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Build agents:</strong> + Edit, Write 추가</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Research agents:</strong> Read, Grep, Glob만 (수정 금지)</span></li>
</ul>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 7: Skills
  // ─────────────────────────────────────────────
  {
    slug: "skills",
    number: 7,
    title: "Skills -- 전문 지식",
    subtitle: "37개 스킬로 구성된 전문 지식 라이브러리",
    description:
      "스킬이 무엇인지, 카테고리별 스킬 소개, 주요 사용 예시, 커스텀 스킬 만들기를 다룹니다.",
    sections: [
      {
        id: "what-are-skills",
        title: "스킬이란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>스킬(Skill)</strong>은 특정 분야의 전문 지식을 구조화한 마크다운 파일입니다. 도서관에 비유할 수 있습니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
비유: 도서관에는 건축, 의학, 법학 등 분야별 전문 서적이 있습니다. 필요할 때 해당 분야 책을 꺼내 참고하듯, Claude Code는 작업에 필요한 스킬을 자동으로 참조합니다.
</div>

<p class="mt-4 text-stone-700 leading-relaxed">스킬은 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/skills/</code> 디렉토리에 저장됩니다. 각 스킬은 디렉토리 형태로, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">SKILL.md</code> 파일이 핵심이고, 필요한 경우 소스 코드, 테스트, 설정 파일이 함께 포함됩니다.</p>

<p class="mt-4 text-stone-700 leading-relaxed">에이전트와의 차이: 에이전트는 "행동하는 전문가"이고, 스킬은 "참고하는 지식"입니다. 에이전트가 스킬을 참조하여 더 정확한 작업을 수행합니다.</p>`,
      },
      {
        id: "skill-categories",
        title: "37개 스킬 카테고리별 소개",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">코드 품질 (3개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>code-review:</strong> 5-layer 코드 리뷰 (정확성/설계/보안/성능/유지보수)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>clean-code:</strong> 클린 코드 원칙, 코딩 표준</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>refactoring:</strong> 안전한 리팩토링, 테스트 검증</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">테스팅 & 보안 (3개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>tdd-workflow:</strong> Red-Green-Refactor 사이클, 80%+ 커버리지</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>security-audit:</strong> 취약점 스캔, 의존성 감사, 시크릿 탐지</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>debugging:</strong> 체계적 디버깅 (가설 기반, bisect, RCA)</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">설계 & API (5개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>architecture-design:</strong> ADR, Clean Architecture, DDD, 마이크로서비스</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>api-design:</strong> RESTful/GraphQL API 설계, OpenAPI 문서</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>api-spec-generator:</strong> PM/개발자용 API 스펙, 기능 명세서</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>backend-api:</strong> FastAPI 기반 백엔드 구현</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>database-schema:</strong> ERD, 스키마 설계, 마이그레이션, 쿼리 최적화</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">AI/ML (8개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>rag-2.0:</strong> 하이브리드 검색, GraphRAG, 검색 패턴</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>prompt-optimizer:</strong> 프롬프트 엔지니어링, LangGraph 최적화</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>llm-app-planner:</strong> LLM 앱 패턴 빠른 참조 (RAG vs Agent 등)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>chatbot-designer, agent-evaluator, agentic-workflows, ai-research-integration, research-agent-tech</strong></span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">프론트엔드 & 문서 & 기타 (18개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>react-component, frontend-codemap, mobile-tablet-redesign</strong> (프론트엔드)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>documentation-gen, dev-blog-writer, dev-journal, portfolio-generator</strong> (문서)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>product-planner, ml-training, performance-optimization, git-workflow, context-compressor, mcp-integration</strong> 등</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>industry-persona-qa, learning-journal, developer-growth, ai-developer-practice</strong></span></li>
</ul>`,
      },
      {
        id: "skill-examples",
        title: "주요 스킬 사용 예시",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">예시 1: product-planner</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /product-planner "AI 교육 플랫폼"

# 출력:
## PRD (Product Requirements Document)
- 비전, 목표 사용자, 핵심 기능
- TAM/SAM/SOM 시장 분석
- JTBD (Jobs to be Done) 프레임워크
- RICE 우선순위 매트릭스
- Lean Canvas
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">예시 2: architecture-design</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> "이 프로젝트의 아키텍처를 분석해줘"

# architect 에이전트가 architecture-design 스킬을 참조하여:
- ADR (Architecture Decision Record) 생성
- 시스템 컴포넌트 다이어그램
- 의존성 그래프
- 확장성 분석
- Clean Architecture 레이어 매핑
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">예시 3: llm-app-planner</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> "고객 상담 챗봇을 만들려는데 어떤 패턴이 좋을까?"

# 스킬이 제공하는 빠른 참조:
| 패턴 | 적합한 경우 | 비용 |
|------|------------|------|
| RAG | 문서 기반 Q&A | 낮음 |
| Agent | 다단계 작업 | 중간 |
| Fine-tuning | 특정 도메인 | 높음 |

추천: RAG + Agent 하이브리드
이유: 문서 검색으로 1차 응답, 복잡한 요청은 에이전트로 처리
</pre>`,
      },
      {
        id: "industry-persona-qa",
        title: "industry-persona-qa 상세 예시",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>industry-persona-qa</strong>는 이 저장소의 특색 있는 스킬입니다. 프로젝트가 속한 산업의 다양한 이해관계자 관점에서 QA를 수행합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> "페르소나 QA" (또는 "industry QA", "persona QA")

# Phase 1: 맥락 수집
"프로젝트가 속한 산업/사업군은 무엇인가요?"
> 핀테크

# Phase 2: 페르소나 자동 생성 (5~8명)
| 이름 | 역할 | 경력 | 핵심 관심사 |
|------|------|------|------------|
| 김현장 | 준법감시인 | 시니어 (15년) | 금융 규제 준수 |
| 박개발 | 핀테크 개발자 | 중급 (5년) | API 안정성 |
| 이사용 | 일반 사용자 | - | 직관적 UI |
| 최보안 | 보안 책임자 | 시니어 (12년) | 개인정보 보호 |
| 정운영 | CS 매니저 | 중급 (7년) | 장애 대응 |

# Phase 3: 각 페르소나별 QA 수행
김현장 (준법감시인):
  "이체 한도 초과 시 이중 인증이 구현되어 있는가?"
  "거래 내역 보관 기간이 전자금융거래법에 부합하는가?"

박개발 (개발자):
  "API rate limiting이 설정되어 있는가?"
  "에러 응답에 내부 스택 트레이스가 노출되지 않는가?"
</pre>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>실무 가치:</strong> 단일 관점이 아닌 5~8명의 현실적 페르소나가 각자의 입장에서 피드백하므로, 출시 전에 놓치기 쉬운 문제를 사전에 발견합니다.</p>
</div>`,
      },
      {
        id: "custom-skills",
        title: "커스텀 스킬 만들기",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/skill-create</code> 커맨드로 자신의 프로젝트 히스토리에서 패턴을 추출하여 스킬을 자동 생성할 수 있습니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# Git 히스토리에서 패턴 추출
/skill-create                    # 현재 저장소 분석
/skill-create --commits 100      # 최근 100개 커밋 분석
/skill-create --output ./skills  # 커스텀 출력 경로

# 동작 과정:
1. Git 히스토리 파싱 (커밋, 파일 변경, 패턴)
2. 반복 워크플로우와 컨벤션 자동 감지
3. SKILL.md 파일 생성
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">수동으로 스킬을 만들려면:</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 디렉토리 생성
mkdir -p ~/.claude/skills/my-custom-skill

# SKILL.md 작성
cat > ~/.claude/skills/my-custom-skill/SKILL.md << 'EOF'
---
name: my-custom-skill
description: 우리 팀의 코딩 컨벤션과 패턴
triggers:
  - "팀 컨벤션"
  - "우리 규칙"
---

# My Custom Skill

## 컨벤션
- API 응답은 항상 { success, data, error } 형태
- 함수명은 동사+명사 (getUserProfile, createOrder)
- ...

## 패턴
- Repository 패턴 사용
- ...
EOF
</pre>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 8: Commands
  // ─────────────────────────────────────────────
  {
    slug: "commands",
    number: 8,
    title: "Commands -- 빠른 실행",
    subtitle: "30개 슬래시 커맨드로 복잡한 워크플로우를 한 줄로",
    description:
      "커맨드가 무엇인지, 카테고리별 30개 커맨드, 주요 커맨드 사용 예시를 다룹니다.",
    sections: [
      {
        id: "what-are-commands",
        title: "커맨드란?",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>커맨드(Command)</strong>는 복잡한 워크플로우를 한 줄의 슬래시 명령어로 실행하는 단축키입니다.</p>

<div class="mt-6 border-l-2 border-stone-300 pl-4 italic text-stone-600">
비유: 스마트폰의 단축어(Shortcuts)와 같습니다. "출근"이라는 단축어 하나로 알람 끄기, 일정 확인, 네비 켜기가 한 번에 실행되듯, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/plan</code> 한 줄로 요구사항 분석, 리스크 평가, 단계별 계획 수립이 한 번에 실행됩니다.
</div>

<p class="mt-4 text-stone-700 leading-relaxed">커맨드는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/commands/</code> 디렉토리의 마크다운 파일로 정의됩니다. Claude Code에서 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/</code>를 입력하면 사용 가능한 커맨드 목록이 나타납니다.</p>

<p class="mt-4 text-stone-700 leading-relaxed">이 저장소에는 <strong>30개 커맨드</strong>가 포함되어 있습니다.</p>`,
      },
      {
        id: "command-categories",
        title: "30개 커맨드 카테고리별",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">계획 & 설계 (5개)</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">커맨드</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/plan</td><td class="p-3 border-b border-stone-100">요구사항 분석, 리스크 평가, 구현 계획 수립</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/orchestrate</td><td class="p-3 border-b border-stone-100">멀티 에이전트 오케스트레이션</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/multi-agent</td><td class="p-3 border-b border-stone-100">여러 에이전트 동시 협업</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/define-dod</td><td class="p-3 border-b border-stone-100">Definition of Done 정의</td></tr>
    <tr><td class="p-3 font-mono text-xs">/setup-pm</td><td class="p-3">패키지 매니저 설정</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">개발 & 테스트 (8개)</h4>
<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">커맨드</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/tdd</td><td class="p-3 border-b border-stone-100">TDD 워크플로우 (테스트 먼저, 80%+ 커버리지)</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/code-review</td><td class="p-3 border-b border-stone-100">코드 리뷰 실행</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/e2e</td><td class="p-3 border-b border-stone-100">Playwright E2E 테스트</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/build-fix</td><td class="p-3 border-b border-stone-100">빌드 에러 점진적 수정</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/verify</td><td class="p-3 border-b border-stone-100">종합 검증 (빌드, 타입, 린트, 테스트, 보안)</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/test-coverage</td><td class="p-3 border-b border-stone-100">커버리지 분석 및 개선</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">/refactor-clean</td><td class="p-3 border-b border-stone-100">데드 코드 정리, 리팩토링</td></tr>
    <tr><td class="p-3 font-mono text-xs">/modern-frontend</td><td class="p-3">모던 프론트엔드 패턴</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Go / Rust (5개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/go-build</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/go-review</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/go-test</code> -- Go 전용 빌드/리뷰/테스트</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/rust</code> -- Rust 개발 패턴</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/frontend-codemap</code> -- UI 구조 매핑</span></li>
</ul>

<h4 class="mt-6 text-lg font-semibold text-stone-900">학습 & 세션 (12개)</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/learn</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/eval</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/checkpoint</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/handoff</code></span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/skill-create</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/evolve</code></span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/instinct-status</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/instinct-export</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/instinct-import</code></span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/token-analysis</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/update-docs</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/update-codemaps</code>, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/tool-registry</code></span></li>
</ul>`,
      },
      {
        id: "plan-example",
        title: "/plan 사용 예시",
        content: `
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /plan 실시간 알림 기능을 추가하고 싶어

# planner 에이전트가 자동 호출됩니다:

## Implementation Plan: Real-Time Notification System

### Requirements Restatement
- 사용자에게 실시간 알림 전송
- 다중 채널 지원 (인앱, 이메일, 웹훅)
- 안정적 전달 보장

### Implementation Phases
Phase 1: Database Schema
  - notifications 테이블 추가
  - user_notification_preferences 테이블
Phase 2: Notification Service
  - BullMQ/Redis 큐 구현
  - 재시도 로직
Phase 3: Integration Points
  - 이벤트 발생 시 알림 큐 추가
Phase 4: Frontend Components
  - NotificationBell 컴포넌트
  - 실시간 업데이트 (WebSocket)

### Risks
- HIGH: 이메일 전달률 (SPF/DKIM)
- MEDIUM: 1000+ 사용자 동시 처리 성능

### Estimated Complexity: MEDIUM

**WAITING FOR CONFIRMATION**: 이 계획으로 진행할까요?
</pre>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>핵심:</strong> planner 에이전트는 사용자가 "yes"라고 명시적으로 확인하기 전까지 코드를 작성하지 않습니다.</p>
</div>`,
      },
      {
        id: "tdd-verify-example",
        title: "/tdd 와 /verify 사용 예시",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">/tdd 사용 예시</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /tdd 유동성 점수 계산 함수를 만들어줘

# tdd-guide 에이전트가 자동 호출:

Step 1: SCAFFOLD -- 인터페이스 정의
  interface MarketData { totalVolume, bidAskSpread, ... }

Step 2: RED -- 실패하는 테스트 작성
  it('should return high score for liquid market', ...)
  it('should handle edge case: zero volume', ...)

Step 3: RUN -- 테스트 실행, 실패 확인
  FAIL: Error: Not implemented

Step 4: GREEN -- 최소 구현
  (weighted average 계산 로직)

Step 5: RUN -- 테스트 통과 확인
  PASS: 3 tests passed

Step 6: REFACTOR -- 상수 추출, 가독성 개선

Step 7: COVERAGE -- 100% 확인
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">/verify 사용 예시</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /verify full

# 종합 검증 실행:

VERIFICATION: PASS

Build:    OK
Types:    OK (0 errors)
Lint:     OK (2 warnings)
Tests:    42/42 passed, 87% coverage
Secrets:  OK (0 found)
Logs:     1 console.log found (src/debug.ts:15)

Ready for PR: YES (console.log 제거 권장)
</pre>

<p class="mt-4 text-stone-700 leading-relaxed"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/verify</code>는 인자에 따라 범위가 달라집니다:</p>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/verify quick</code> -- 빌드 + 타입만</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/verify full</code> -- 모든 검사 (기본값)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/verify pre-commit</code> -- 커밋 관련 검사</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/verify pre-pr</code> -- PR용 전체 검사 + 보안 스캔</span></li>
</ul>`,
      },
      {
        id: "tool-registry-example",
        title: "/tool-registry 사용 예시",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/tool-registry</code>는 91개 도구를 검색하고 추천받는 메타 커맨드입니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /tool-registry list all

Tool Registry: 91 tools available
  30 commands (/) | 24 agents | 37 skills
  11 categories: code-quality, testing, security, planning,
                 frontend, backend, ai-ml, devops,
                 documentation, learning, product
</pre>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /tool-registry search "security"

Found 3 tools across 2 categories:
| Category | Type | Name | Description |
|----------|------|------|-------------|
| security | agent | security-reviewer | OWASP Top 10... |
| security | skill | security-audit | Full security audit... |
| code-quality | command | /code-review | Security and quality... |
</pre>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
> /tool-registry "새로운 API 엔드포인트를 만들려고 해"

Recommended workflow for: "새로운 API 엔드포인트를 만들려고 해"

Step 1: [skill] api-design -- API 설계 원칙 참조
Step 2: [command] /tdd -- TDD로 구현
Step 3: [skill] backend-api -- FastAPI 패턴 참조
Step 4: [agent] security-reviewer -- 보안 검토

Also consider: database-schema, code-reviewer
</pre>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 9: 고급 워크플로우
  // ─────────────────────────────────────────────
  {
    slug: "advanced",
    number: 9,
    title: "고급 워크플로우",
    subtitle: "병렬 에이전트, CI/CD 자동화, 크로스 세션 학습",
    description:
      "Agent Teams, Headless Mode, Worktree, /loop, Auto Mode, MCP, Cross-Session Learning 등 고급 기능을 다룹니다.",
    sections: [
      {
        id: "agent-teams",
        title: "Agent Teams (병렬 에이전트)",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>Agent Teams</strong>는 여러 에이전트를 병렬로 실행하는 실험적 기능입니다. 이 저장소의 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">settings.local.json</code>에서 이미 활성화되어 있습니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
// settings.local.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">이 설정이 활성화되면 독립적인 리뷰 작업(security + performance + type check)을 병렬로 수행할 수 있습니다. 결과가 서로에게 영향을 주지 않는 경우에만 병렬 실행이 적용됩니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Communication Rules</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>각 에이전트는 작업 시작 전 <strong>스코프를 선언</strong> (어떤 파일을 다룰지)</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>병렬 에이전트는 <strong>서로 다른 파일</strong>에서만 작업</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>충돌 발생 시 중단하고 사용자에게 보고</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span>Research/탐색 에이전트는 요약만 반환, 파일 수정 금지</span></li>
</ul>`,
      },
      {
        id: "headless-mode",
        title: "Headless Mode (-p) -- CI/CD 자동화",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><strong>Headless Mode</strong>는 Claude Code를 비대화형으로 실행합니다. CI/CD 파이프라인에서 코드 리뷰를 자동화하면 시간을 40% 단축할 수 있습니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 단일 프롬프트 실행
claude -p "이 PR의 보안 이슈를 검토해줘" --output-format json

# 파이프라인에서 diff 리뷰
git diff main...HEAD | claude -p "코드 리뷰: 보안, 성능, 품질 관점" --output-format json

# 세션 유지 (멀티턴)
claude -p "프로젝트 구조를 분석해줘" --session-id "review-20260326"
claude -p "테스트 커버리지 부족한 파일 찾아줘" --session-id "review-20260326"
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">GitHub Actions 통합 예시</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# .github/workflows/ai-review.yml
- name: AI Code Review
  run: |
    git diff \${{ github.event.pull_request.base.sha }}..HEAD | \\
    claude -p "코드 리뷰: CRITICAL/HIGH/MEDIUM으로 분류" \\
    --output-format json > review.json
</pre>

<div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
  <p class="text-amber-800 text-sm"><strong>주의:</strong> CI에서는 항상 <code class="bg-amber-100 px-1.5 py-0.5 rounded text-xs">--output-format json</code>을 사용하세요. <code class="bg-amber-100 px-1.5 py-0.5 rounded text-xs">--max-turns 10</code>으로 무한 루프를 방지하세요. CI 로그에 코드가 노출될 수 있으니 민감 정보에 주의하세요.</p>
</div>`,
      },
      {
        id: "worktree-loop",
        title: "Worktree (-w)와 /loop 스케줄링",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Worktree -- 격리된 병렬 개발</h4>
<p class="mt-4 text-stone-700 leading-relaxed">Git worktree를 활용하여 격리된 환경에서 병렬 개발이 가능합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 기능 개발용 워크트리
claude -w feature-auth       # .claude/worktrees/feature-auth에 격리 복사본

# 버그 수정 (동시 진행)
claude -w hotfix-login       # 별도 워크트리에서 병렬 작업
</pre>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">시나리오</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">방법</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">기능 A + 기능 B 병렬</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1 rounded text-xs">claude -w feature-a</code> + <code class="bg-stone-100 px-1 rounded text-xs">claude -w feature-b</code></td></tr>
    <tr><td class="p-3 border-b border-stone-100">위험한 리팩토링 실험</td><td class="p-3 border-b border-stone-100"><code class="bg-stone-100 px-1 rounded text-xs">claude -w experiment</code> (실패하면 버리기)</td></tr>
    <tr><td class="p-3">리뷰 중 수정 테스트</td><td class="p-3"><code class="bg-stone-100 px-1 rounded text-xs">claude -w review-test</code> (통과하면 머지)</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">/loop -- cron-like 스케줄링</h4>
<p class="mt-4 text-stone-700 leading-relaxed">반복 작업을 cron처럼 자동화합니다. 기본 간격 10분, 최소 1분.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 5분마다 PR 상태 확인
/loop 5m "gh pr status를 확인하고 머지 가능한 PR이 있으면 알려줘"

# 30분마다 보안 스캔
/loop 30m /verify pre-commit

# 15분마다 테스트 회귀 감시
/loop 15m "npm test 2>&1 | tail -5"

# 중단
/loop stop
</pre>`,
      },
      {
        id: "auto-mode-mcp",
        title: "Auto Mode와 MCP 서버",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Auto Mode -- AI 자동 승인</h4>
<p class="mt-4 text-stone-700 leading-relaxed">AI 안전 분류기가 루틴 동작(파일 읽기, 검색, 빌드)은 자동 승인하고, 위험한 동작(삭제, 푸시)은 사용자 확인을 요청합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">환경</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">권장 모드</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">이유</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100">개인 실험 프로젝트</td><td class="p-3 border-b border-stone-100">auto</td><td class="p-3 border-b border-stone-100">빠른 반복, 낮은 위험</td></tr>
    <tr><td class="p-3 border-b border-stone-100">팀 개발 프로젝트</td><td class="p-3 border-b border-stone-100">default</td><td class="p-3 border-b border-stone-100">변경 사항 검토 필요</td></tr>
    <tr><td class="p-3 border-b border-stone-100">프로덕션 코드</td><td class="p-3 border-b border-stone-100">default + hooks</td><td class="p-3 border-b border-stone-100">다층 검증</td></tr>
    <tr><td class="p-3">CI/CD 파이프라인</td><td class="p-3">default + headless</td><td class="p-3">자동화 + 안전</td></tr>
  </tbody>
</table>

<h4 class="mt-6 text-lg font-semibold text-stone-900">MCP 서버 연동</h4>
<p class="mt-4 text-stone-700 leading-relaxed">이 저장소는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">mcp-integration</code> 스킬을 통해 MCP(Model Context Protocol) 서버 연동을 지원합니다. 주요 MCP 서버:</p>

<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Context7:</strong> 라이브러리 문서 실시간 조회. 최신 API 문서를 컨텍스트에 주입</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>GitHub MCP:</strong> Issue, PR, 코드 검색을 Claude Code 안에서 직접 수행</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>Playwright MCP:</strong> 브라우저 자동화, E2E 테스트, 스크린샷</span></li>
</ul>`,
      },
      {
        id: "cross-session-learning",
        title: "Cross-Session Learning과 Observability",
        content: `
<h4 class="mt-6 text-lg font-semibold text-stone-900">Cross-Session Learning</h4>
<p class="mt-4 text-stone-700 leading-relaxed">세션 간 학습 연속성을 보장합니다. 한 세션에서 배운 패턴을 다음 세션에서 자동으로 참조합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 학습 흐름
1. 자동 인덱싱: /learn 실행 시 ~/.claude/skills/learned/에 저장
2. 자동 추천: 새 세션에서 유사 작업 감지 시 과거 패턴 참조
3. 학습 이력: ~/.claude/traces/learning-index.jsonl에 누적
4. 검색: /instinct-status로 도메인별 조회

# 학습 자동 트리거
- 에러 해결 후 -> 해결 패턴 자동 기록 (failure-explainer 연동)
- 새 라이브러리 사용 후 -> 사용법 요약 자동 기록
- 세션 종료 시 -> session-learning.sh + /learn 자동 실행
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">Observability 메트릭</h4>
<p class="mt-4 text-stone-700 leading-relaxed">여러 훅이 협력하여 AI의 행동을 추적하고 분석합니다.</p>

<table class="mt-4 w-full text-sm">
  <thead class="bg-stone-50">
    <tr>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">훅</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">수집 데이터</th>
      <th class="text-left p-3 font-medium text-stone-700 border-b border-stone-200">저장 위치</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">trace-logger.sh</td><td class="p-3 border-b border-stone-100">도구 호출 로그</td><td class="p-3 border-b border-stone-100">~/.claude/traces/</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">observability-metrics.sh</td><td class="p-3 border-b border-stone-100">편집 빈도, 패턴</td><td class="p-3 border-b border-stone-100">~/.claude/traces/</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">learning-indexer.sh</td><td class="p-3 border-b border-stone-100">학습 패턴 인덱스</td><td class="p-3 border-b border-stone-100">~/.claude/traces/learning-index.jsonl</td></tr>
    <tr><td class="p-3 border-b border-stone-100 font-mono text-xs">progress-tracker.sh</td><td class="p-3 border-b border-stone-100">작업 진행률</td><td class="p-3 border-b border-stone-100">~/.claude/progress/</td></tr>
    <tr><td class="p-3 font-mono text-xs">trace-analyzer.sh</td><td class="p-3">트레이스 분석</td><td class="p-3">~/.claude/traces/</td></tr>
  </tbody>
</table>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>트레이스 기반 개선 루프:</strong> 하네스 변경 -> 벤치마크 실행 -> 트레이스 분석 -> 실패 패턴 식별 -> 하네스 변경. 머신러닝의 부스팅처럼 이전 실패에 집중하여 반복 개선합니다.</p>
</div>`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Chapter 10: 커스터마이징
  // ─────────────────────────────────────────────
  {
    slug: "customize",
    number: 10,
    title: "커스터마이징",
    subtitle: "나만의 규칙, 훅, 에이전트, 스킬 만들기",
    description:
      "규칙 추가/수정, 훅 만들기, 에이전트 만들기, 스킬 만들기, 설정 구조, 팀 공유 방법을 다룹니다.",
    sections: [
      {
        id: "custom-rules",
        title: "규칙 추가/수정",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">새 규칙을 추가하려면 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/rules/</code>에 마크다운 파일을 만들면 됩니다. Claude Code가 세션 시작 시 자동으로 읽어들입니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 새 규칙 파일 생성
cat > ~/.claude/rules/my-team-rules.md << 'EOF'
# My Team Rules

globs: ['**/*.ts', '**/*.tsx']

## API 응답 형식
모든 API 응답은 다음 형태를 따릅니다:
\`\`\`typescript
interface ApiResponse&lt;T&gt; {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  meta?: { total: number; page: number; limit: number };
}
\`\`\`

## 네이밍 컨벤션
- 컴포넌트: PascalCase (UserProfile.tsx)
- 유틸 함수: camelCase (getUserProfile.ts)
- 상수: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- 타입: PascalCase + suffix (UserProfileProps, AuthService)

## 금지 사항
- any 타입 사용 금지 (unknown 사용)
- 인라인 스타일 금지 (Tailwind CSS 사용)
- 상대 경로 import 금지 (@/ alias 사용)
EOF
</pre>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>globs 설정:</strong> 파일 상단에 <code class="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">globs: ['**/*.ts']</code>를 추가하면 해당 패턴의 파일 작업 시에만 규칙이 적용됩니다.</p>
</div>`,
      },
      {
        id: "custom-hooks",
        title: "훅 만들기",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">훅은 셸 스크립트입니다. JSON 형태로 입력을 받고, 필요하면 JSON으로 차단/승인 결정을 반환합니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">셸 스크립트 템플릿</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
#!/bin/bash
# shellcheck shell=bash
# [Stage]: [Description]

# stdin으로 JSON 입력 받기
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# 조건 확인
if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0  # 관심 없는 도구는 패스
fi

# 차단할 패턴 감지
if echo "$COMMAND" | grep -qE 'dangerous_pattern'; then
  # 차단 결정 반환
  cat &lt;&lt;'EOF'
{"decision":"block","reason":"[CUSTOM] 차단 이유 설명"}
EOF
  exit 0
fi

# 경고만 주입 (차단하지 않음)
if echo "$COMMAND" | grep -qE 'warning_pattern'; then
  cat &lt;&lt;'EOF'
{"decision":"approve","reason":"[WARNING] 경고 메시지"}
EOF
  exit 0
fi

# 아무 문제 없으면 조용히 통과
exit 0
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">settings.local.json에 등록</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
// settings.local.json의 hooks 섹션에 추가
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/my-custom-hook.sh",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
</pre>

<div class="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
  <p class="text-amber-800 text-sm"><strong>주의:</strong> 훅의 timeout은 초 단위입니다. 5초 이상 걸리는 훅은 작업 흐름을 방해하므로, 무거운 검사는 비동기로 처리하는 것을 권장합니다.</p>
</div>`,
      },
      {
        id: "custom-agents",
        title: "에이전트 만들기",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">에이전트는 마크다운 파일 하나로 정의됩니다. <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">~/.claude/agents/</code>에 파일을 만들면 됩니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">마크다운 템플릿</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# ~/.claude/agents/my-reviewer.md

# My Reviewer Agent

You are a specialist reviewer for [specific domain].

## Role
- Review [specific type] of code changes
- Ensure compliance with [specific standards]

## When to Use
- After modifying [specific files/patterns]
- When working on [specific features]

## Checklist
1. [ ] Check for [specific concern 1]
2. [ ] Verify [specific concern 2]
3. [ ] Ensure [specific concern 3]

## Output Format
[AGENT: my-reviewer] STATUS: [PASS/FAIL]
Summary: [1-2 sentence summary]
Issues:
- [issue 1]
- [issue 2]

## Tools
- Read, Grep, Glob only (do not modify files)
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">에이전트 설계 시 고려사항:</p>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>스코프 명확히:</strong> 에이전트가 다루는 영역을 구체적으로 정의</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>도구 제한:</strong> Research 에이전트는 Read만, Build 에이전트만 Edit/Write 허용</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">--</span><span><strong>출력 형식:</strong> <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">[AGENT_NAME] STATUS: summary</code> 형태로 통일</span></li>
</ul>`,
      },
      {
        id: "custom-skills-create",
        title: "스킬 만들기 (/skill-create)",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">스킬을 만드는 가장 빠른 방법은 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">/skill-create</code> 커맨드입니다. Git 히스토리에서 코딩 패턴을 자동 추출합니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 자동 추출
/skill-create                    # 현재 저장소의 최근 200개 커밋 분석
/skill-create --commits 100      # 분석할 커밋 수 지정

# 동작 과정:
# 1. git log에서 커밋 메시지, 파일 변경 패턴 분석
# 2. 반복 워크플로우 감지 (예: 항상 test -> implement -> review 순서)
# 3. 네이밍 컨벤션 추출 (예: 컴포넌트 파일명 패턴)
# 4. SKILL.md 파일 자동 생성
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">수동 스킬 SKILL.md 구조</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
---
name: my-skill
description: 이 스킬이 하는 일을 한 줄로
triggers:
  - "트리거 키워드 1"
  - "trigger keyword 2"
---

# Skill Name

## 개요
이 스킬은 [목적]을 위해 [방법]을 사용합니다.

## 단계
1. [단계 1 설명]
2. [단계 2 설명]

## 예시
\`\`\`typescript
// 실제 코드 예시
\`\`\`

## 주의사항
- [주의 1]
- [주의 2]
</pre>

<p class="mt-4 text-stone-700 leading-relaxed">triggers에 지정된 키워드가 사용자 입력에 포함되면 해당 스킬이 자동으로 참조됩니다.</p>`,
      },
      {
        id: "settings-structure",
        title: "settings.json 구조",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed"><code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">settings.local.json</code>은 프로젝트별 Claude Code 설정의 핵심 파일입니다.</p>

<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
{
  "permissions": {
    "allow": [
      "Bash(git:*)",        // git 명령어 허용
      "Bash(npm:*)",        // npm 명령어 허용
      "Bash(python:*)",     // python 명령어 허용
      "Edit", "Write", "Read", "Grep", "Glob",
      "WebSearch",
      "Task",               // 에이전트 호출
      "Skill(react-component)"  // 특정 스킬 허용
    ],
    "deny": [
      "Bash(rm -rf:*)",     // 위험한 삭제 차단
      "Bash(del:*)",
      "Bash(format:*)"
    ],
    "defaultMode": "default"  // auto | default
  },

  "hooks": {
    "SessionStart": [...],      // 세션 시작 시
    "UserPromptSubmit": [...],  // 사용자 입력 시
    "PreToolUse": [...],        // 도구 실행 전
    "PostToolUse": [...],       // 도구 실행 후
    "PostToolUseFailure": [...],// 도구 실패 시
    "PostCompact": [...],       // 컴팩트 후
    "Stop": [...]               // 세션 종료 시
  },

  "enabledPlugins": {
    "frontend-design@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true
  },

  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
</pre>`,
      },
      {
        id: "team-sharing",
        title: "팀에서 공유하기",
        content: `
<p class="mt-4 text-stone-700 leading-relaxed">이 하네스 셋업을 팀 전체가 사용하도록 공유하는 방법입니다.</p>

<h4 class="mt-6 text-lg font-semibold text-stone-900">방법 1: 저장소 Fork (권장)</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 1. 저장소를 팀 조직으로 Fork
# 2. 팀 규칙 추가/수정
# 3. 팀원 각자 설치
git clone https://github.com/your-org/My_ClaudeCode_Skill.git
cd My_ClaudeCode_Skill
./setup.sh  # 또는 setup.ps1
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">방법 2: 프로젝트 내 포함</h4>
<pre class="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto text-sm font-mono">
# 프로젝트 루트에 .claude/ 디렉토리 생성
your-project/
  .claude/
    CLAUDE.md          # 프로젝트별 지침
    settings.local.json # 프로젝트별 설정
    commands/          # 프로젝트별 커맨드
  src/
  ...
</pre>

<h4 class="mt-6 text-lg font-semibold text-stone-900">방법 3: CODEOWNERS 활용</h4>
<p class="mt-4 text-stone-700 leading-relaxed">이 저장소에는 <code class="bg-stone-100 px-1.5 py-0.5 rounded text-sm">CODEOWNERS</code> 파일이 포함되어 있어, 규칙이나 훅 변경 시 특정 팀원의 리뷰를 필수로 요구할 수 있습니다.</p>

<div class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
  <p class="text-emerald-800 text-sm"><strong>운영 팁:</strong> 전역 규칙(<code class="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">~/.claude/rules/</code>)은 개인, 프로젝트 규칙(<code class="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">.claude/</code>)은 팀으로 분리하면 충돌 없이 관리할 수 있습니다. 전역 규칙이 프로젝트 규칙보다 우선합니다.</p>
</div>

<h4 class="mt-6 text-lg font-semibold text-stone-900">다음 단계</h4>
<ul class="mt-3 space-y-2 text-stone-700">
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">1.</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/tool-registry</code>로 91개 도구를 탐색하세요</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">2.</span><span>팀에 맞는 규칙을 추가하세요</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">3.</span><span><code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">/skill-create</code>로 프로젝트 고유 패턴을 스킬화하세요</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">4.</span><span>CI/CD에 Headless Mode를 통합하세요</span></li>
  <li class="flex items-start gap-2"><span class="text-stone-400 mt-1">5.</span><span>트레이스를 분석하고 하네스를 지속 개선하세요</span></li>
</ul>`,
      },
    ],
  },
];
