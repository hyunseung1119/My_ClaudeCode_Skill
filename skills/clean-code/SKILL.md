---
name: clean-code
description: 클린코드 및 유지보수 관점에서 코드 리팩토링. 파일명, 함수명, 모듈 분리 등 정석적인 구조 개선
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# 클린코드 리팩토링 가이드 (2026)

## 리팩토링 원칙

### 1. SOLID 원칙
- **S**ingle Responsibility: 함수/클래스는 하나의 책임만
- **O**pen/Closed: 확장에는 열려있고 수정에는 닫혀있게
- **L**iskov Substitution: 하위 타입은 상위 타입을 대체 가능
- **I**nterface Segregation: 클라이언트는 사용하지 않는 인터페이스에 의존하지 않음
- **D**ependency Inversion: 구체가 아닌 추상에 의존

### 2. DRY (Don't Repeat Yourself)
- 중복 코드는 함수/클래스로 추출
- 3회 이상 반복되는 패턴은 즉시 추출

### 3. KISS (Keep It Simple, Stupid)
- 과도한 추상화 지양
- 명확하고 단순한 구조 선호

### 4. YAGNI (You Aren't Gonna Need It)
- 현재 필요하지 않은 기능은 구현하지 않음
- 미래를 위한 "준비" 코드 지양

---

## Backend (FastAPI/Python) 리팩토링

### 파일 구조 (계층형 아키텍처)

```
backend/
├── routes/              # API 엔드포인트 (Presentation Layer)
│   ├── __init__.py
│   ├── multi_excel.py   # 라우트만, 비즈니스 로직 없음
│   └── og_rag.py
├── services/            # 비즈니스 로직 (Business Logic Layer)
│   ├── __init__.py
│   ├── excel_service.py # 엑셀 처리 로직
│   └── rag_service.py   # RAG 검색 로직
├── repositories/        # 데이터 액세스 (Data Access Layer)
│   ├── __init__.py
│   └── database.py      # DB CRUD 연산만
├── models/              # 데이터 모델
│   ├── __init__.py
│   ├── requests.py      # Pydantic 요청 모델
│   └── responses.py     # Pydantic 응답 모델
├── schemas/             # DB 스키마 (SQLAlchemy 등)
│   ├── __init__.py
│   └── tables.py
├── core/                # 핵심 설정 및 유틸리티
│   ├── __init__.py
│   ├── config.py        # 환경 설정
│   ├── dependencies.py  # 의존성 주입
│   └── exceptions.py    # 커스텀 예외
└── utils/               # 공통 유틸리티
    ├── __init__.py
    ├── validators.py    # 유효성 검증
    └── formatters.py    # 포맷팅 함수
```

### 파일명 규칙

```python
# ✅ GOOD - 명확하고 역할이 드러남
excel_service.py          # 서비스: 비즈니스 로직
user_repository.py        # 저장소: 데이터 액세스
authentication_middleware.py  # 역할이 명확

# ❌ BAD - 모호하거나 너무 일반적
utils.py                  # 너무 포괄적
helper.py                 # 역할 불명확
process.py                # 무엇을 처리하는지 불명확
```

### 함수명 규칙

```python
# ✅ GOOD - 동사로 시작, 명확한 의도
def calculate_total_tax(income: Decimal, deductions: Decimal) -> Decimal:
    """총 세금을 계산합니다."""
    pass

def validate_excel_format(file: UploadFile) -> bool:
    """엑셀 파일 형식을 검증합니다."""
    pass

def fetch_user_by_id(user_id: int) -> Optional[User]:
    """ID로 사용자를 조회합니다."""
    pass

# ❌ BAD - 불명확하거나 역할이 모호
def do_stuff():           # 무엇을 하는지 불명확
def process():            # 너무 일반적
def data():               # 동사가 아님
def get_user_by_id_and_validate_and_update():  # 너무 많은 책임
```

### 클래스명 규칙

```python
# ✅ GOOD - 명사, PascalCase, 역할 명확
class ExcelProcessor:
    """엑셀 파일 처리 담당"""
    pass

class TaxCalculator:
    """세금 계산 담당"""
    pass

class UserRepository:
    """사용자 데이터 액세스 담당"""
    pass

# ❌ BAD
class ProcessData:        # 동사 사용
class excel_handler:      # snake_case 사용
class Utils:              # 너무 포괄적
```

### 계층 분리 예시

#### ❌ BAD - 모든 로직이 라우트에 (현재 많은 코드가 이런 구조)

```python
# backend/routes/multi_excel.py
@router.post("/api/v1/process")
async def process_excel(files: list[UploadFile]):
    # DB 접근
    session = get_db_session()

    # 비즈니스 로직
    results = []
    for file in files:
        data = pd.read_excel(file)
        # 복잡한 계산...
        tax = data['income'].sum() * 0.15
        # DB 저장
        session.add(Result(tax=tax))
        results.append(tax)

    session.commit()
    return results
```

#### ✅ GOOD - 계층 분리

```python
# backend/routes/multi_excel.py (Presentation Layer)
@router.post("/api/v1/process", response_model=ProcessResponse)
async def process_excel(
    files: list[UploadFile],
    service: ExcelService = Depends(get_excel_service)
):
    """엑셀 파일 처리 엔드포인트 (라우팅만 담당)"""
    return await service.process_multiple_files(files)


# backend/services/excel_service.py (Business Logic Layer)
class ExcelService:
    def __init__(self, repository: ExcelRepository):
        self.repository = repository

    async def process_multiple_files(
        self, files: list[UploadFile]
    ) -> ProcessResponse:
        """비즈니스 로직: 다중 파일 처리"""
        results = []
        for file in files:
            validated_data = await self._validate_and_parse(file)
            tax_result = self._calculate_tax(validated_data)
            saved_result = await self.repository.save(tax_result)
            results.append(saved_result)

        return ProcessResponse(results=results)

    def _calculate_tax(self, data: ExcelData) -> TaxResult:
        """세금 계산 (단일 책임)"""
        return TaxCalculator.calculate(data)


# backend/repositories/excel_repository.py (Data Access Layer)
class ExcelRepository:
    def __init__(self, db: Session):
        self.db = db

    async def save(self, result: TaxResult) -> SavedResult:
        """DB 저장만 담당"""
        db_result = ResultModel(**result.dict())
        self.db.add(db_result)
        await self.db.commit()
        return SavedResult.from_orm(db_result)
```

### 함수 길이 규칙

```python
# ✅ GOOD - 함수는 15줄 이내 (화면 1/3 이내)
def calculate_income_tax(income: Decimal, deductions: Decimal) -> Decimal:
    """소득세 계산"""
    taxable_income = income - deductions

    if taxable_income <= 0:
        return Decimal("0")

    tax_rate = _determine_tax_rate(taxable_income)
    return taxable_income * tax_rate


def _determine_tax_rate(income: Decimal) -> Decimal:
    """과세 구간에 따른 세율 결정"""
    if income <= 12_000_000:
        return Decimal("0.06")
    elif income <= 46_000_000:
        return Decimal("0.15")
    else:
        return Decimal("0.24")


# ❌ BAD - 50줄 이상의 긴 함수
def process_everything(data):
    # 검증 로직 10줄
    # 변환 로직 15줄
    # 계산 로직 20줄
    # 저장 로직 10줄
    # → 각각 함수로 분리해야 함
```

### Type Hints (필수)

```python
# ✅ GOOD - 모든 함수에 타입 힌트
from typing import Optional, List, Dict, Any
from decimal import Decimal

def calculate_tax(
    income: Decimal,
    deductions: List[Decimal],
    year: int = 2026
) -> Dict[str, Decimal]:
    """세금 계산

    Args:
        income: 총 소득
        deductions: 공제 항목 리스트
        year: 과세 연도

    Returns:
        세금 계산 결과 딕셔너리
    """
    total_deduction = sum(deductions)
    return {
        "taxable_income": income - total_deduction,
        "tax": (income - total_deduction) * Decimal("0.15")
    }


# ❌ BAD - 타입 힌트 없음
def calculate_tax(income, deductions, year=2026):
    # 파라미터 타입을 알 수 없음
    pass
```

---

## Frontend (React/JavaScript) 리팩토링

### 파일 구조 (기능별 분리)

```
frontend_react/src/
├── components/          # UI 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   ├── features/       # 기능별 컴포넌트
│   │   ├── chat/
│   │   │   ├── ChatV1V6Tab.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── InputBox.jsx
│   │   └── excel/
│   │       ├── ExcelUpload.jsx
│   │       └── ExcelResultCardList.jsx
│   └── layout/         # 레이아웃 컴포넌트
│       ├── Header.jsx
│       └── Sidebar.jsx
├── hooks/              # Custom Hooks
│   ├── useChat.js
│   ├── useExcelUpload.js
│   └── useAuth.js
├── services/           # API 호출
│   ├── api.js          # Axios 설정
│   ├── chatService.js
│   └── excelService.js
├── utils/              # 유틸리티 함수
│   ├── validators.js
│   └── formatters.js
├── constants/          # 상수
│   └── config.js
└── contexts/           # React Context
    └── AuthContext.jsx
```

### 컴포넌트 파일명 규칙

```javascript
// ✅ GOOD
ChatV1V6Tab.jsx          // 기능 명확, PascalCase
ExcelResultCardList.jsx  // 역할이 드러남
MessageList.jsx

// ❌ BAD
chat.jsx                 // 너무 일반적
component1.jsx           // 의미 없음
excel_result.jsx         // snake_case
```

### 컴포넌트 분리 (단일 책임)

#### ❌ BAD - 하나의 거대한 컴포넌트

```jsx
// ChatV1V6Tab.jsx (500줄)
const ChatV1V6Tab = () => {
  // 상태 관리
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // API 호출
  const sendMessage = async () => { /* ... */ };
  const fetchHistory = async () => { /* ... */ };

  // UI 렌더링 (모두 한 컴포넌트에)
  return (
    <div>
      {/* 헤더 */}
      {/* 메시지 리스트 */}
      {/* 입력창 */}
      {/* 로딩 스피너 */}
    </div>
  );
};
```

#### ✅ GOOD - 역할별 분리

```jsx
// ChatV1V6Tab.jsx (컨테이너 - 상태 관리만)
import { useChat } from '../../hooks/useChat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatV1V6Tab = () => {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={messages} />
      {loading && <LoadingSpinner />}
      <MessageInput onSend={sendMessage} />
    </div>
  );
};


// hooks/useChat.js (비즈니스 로직 분리)
export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    setLoading(true);
    try {
      const response = await chatService.send(text);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, loading, sendMessage };
};


// MessageList.jsx (프레젠테이션 컴포넌트 - UI만)
const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <MessageItem key={idx} message={msg} />
      ))}
    </div>
  );
};
```

### 함수명 규칙 (React)

```javascript
// ✅ GOOD
const handleSubmit = () => {};      // 이벤트 핸들러: handle*
const fetchUserData = async () => {}; // 데이터 가져오기: fetch*
const validateEmail = (email) => {}; // 검증: validate*
const formatDate = (date) => {};    // 포맷: format*
const isValidInput = (input) => {}; // Boolean: is*, has*, can*

// ❌ BAD
const submit = () => {};            // 너무 짧음
const getUserDataFromServer = () => {}; // 너무 장황
const func1 = () => {};             // 의미 없음
```

### Custom Hooks 명명

```javascript
// ✅ GOOD - use로 시작, 명확한 목적
export const useChat = () => {};
export const useExcelUpload = () => {};
export const useAuth = () => {};
export const useDebounce = (value, delay) => {};

// ❌ BAD
export const chatHook = () => {};   // use로 시작하지 않음
export const hook1 = () => {};      // 의미 없음
```

### Props 구조 분해

```jsx
// ✅ GOOD - Props 구조 분해로 명확성 향상
const MessageItem = ({ message, timestamp, author, onDelete }) => {
  return (
    <div className="message">
      <span>{author}</span>
      <p>{message}</p>
      <small>{formatTime(timestamp)}</small>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

// ❌ BAD - Props 객체로 전달
const MessageItem = (props) => {
  return (
    <div className="message">
      <span>{props.author}</span>
      <p>{props.message}</p>
      {/* props.을 계속 반복 */}
    </div>
  );
};
```

---

## LLM Agent 리팩토링

### 파일 구조 (Agent 아키텍처)

```
src/
├── agents/              # 에이전트 구현
│   ├── __init__.py
│   ├── base.py         # 베이스 에이전트 (추상 클래스)
│   ├── multi_excel/    # 다중 엑셀 에이전트
│   │   ├── __init__.py
│   │   ├── agent.py    # 에이전트 메인 로직
│   │   ├── state.py    # 상태 정의
│   │   ├── tools.py    # 에이전트 도구
│   │   └── synthesizer.py
│   └── tax_calculator/
│       ├── __init__.py
│       └── agent.py
├── prompts/            # 프롬프트 관리 (코드와 분리)
│   ├── __init__.py
│   ├── base.py         # 베이스 프롬프트
│   ├── tax_expert_2026.py
│   └── templates/      # 템플릿 파일
│       └── system.txt
├── ontology/           # RAG 및 지식 관리
│   ├── __init__.py
│   ├── retriever.py    # 검색 로직
│   ├── reranker.py     # 재순위화
│   └── embeddings.py   # 임베딩 관리
└── utils/
    ├── token_counter.py
    └── rate_limiter.py
```

### 에이전트 클래스 구조

#### ❌ BAD - 모놀리식 에이전트

```python
# agent.py (1000줄)
class MultiExcelAgent:
    def __init__(self):
        # 초기화
        self.llm = ...
        self.embeddings = ...
        self.retriever = ...
        # ... 10개 이상의 의존성

    def process(self, files):
        # 파일 검증 50줄
        # 데이터 추출 100줄
        # RAG 검색 150줄
        # 프롬프트 구성 200줄
        # LLM 호출 100줄
        # 결과 처리 100줄
        # ... 전체 로직이 한 클래스에
```

#### ✅ GOOD - 역할별 분리

```python
# agents/base.py (추상 베이스 클래스)
from abc import ABC, abstractmethod
from typing import Generic, TypeVar

TState = TypeVar('TState')
TResult = TypeVar('TResult')

class BaseAgent(ABC, Generic[TState, TResult]):
    """모든 에이전트의 베이스 클래스"""

    def __init__(self, llm, config: AgentConfig):
        self.llm = llm
        self.config = config
        self._validate_config()

    @abstractmethod
    async def process(self, state: TState) -> TResult:
        """에이전트의 메인 처리 로직"""
        pass

    @abstractmethod
    def _validate_config(self) -> None:
        """설정 검증"""
        pass


# agents/multi_excel/agent.py (구체적 구현)
from ..base import BaseAgent
from .state import MultiExcelState
from .tools import ExcelParser, DataValidator
from .synthesizer import ResultSynthesizer

class MultiExcelAgent(BaseAgent[MultiExcelState, ProcessResult]):
    """다중 엑셀 처리 에이전트 (조율만 담당)"""

    def __init__(self, llm, config: AgentConfig):
        super().__init__(llm, config)
        self.parser = ExcelParser()
        self.validator = DataValidator()
        self.synthesizer = ResultSynthesizer(llm)

    async def process(self, state: MultiExcelState) -> ProcessResult:
        """처리 흐름 조율 (각 단계는 위임)"""
        # 1. 검증
        validated_files = await self._validate_files(state.files)

        # 2. 파싱
        parsed_data = await self._parse_files(validated_files)

        # 3. 병렬 처리
        results = await self._process_parallel(parsed_data)

        # 4. 합성
        final_result = await self.synthesizer.synthesize(results)

        return final_result

    async def _validate_files(self, files: list) -> list:
        """파일 검증 (단일 책임)"""
        return [
            file for file in files
            if await self.validator.is_valid(file)
        ]

    async def _parse_files(self, files: list) -> list:
        """파일 파싱 (단일 책임)"""
        return await asyncio.gather(*[
            self.parser.parse(file) for file in files
        ])


# agents/multi_excel/state.py (상태 정의 분리)
from typing import List
from pydantic import BaseModel

class MultiExcelState(BaseModel):
    """다중 엑셀 에이전트 상태"""
    files: List[UploadFile]
    query: str
    context: dict = {}

    class Config:
        arbitrary_types_allowed = True


# agents/multi_excel/tools.py (도구 분리)
class ExcelParser:
    """엑셀 파싱 전용 클래스"""

    async def parse(self, file: UploadFile) -> ParsedData:
        """엑셀 파일 파싱"""
        # 파싱 로직만
        pass


class DataValidator:
    """데이터 검증 전용 클래스"""

    async def is_valid(self, file: UploadFile) -> bool:
        """파일 유효성 검증"""
        # 검증 로직만
        pass
```

### 프롬프트 관리 (코드와 분리)

#### ❌ BAD - 프롬프트가 코드에 하드코딩

```python
class TaxAgent:
    def get_prompt(self, data):
        return f"""
        You are a tax expert.
        Calculate tax for {data}.
        Consider deductions...
        [100줄의 프롬프트가 코드 안에]
        """
```

#### ✅ GOOD - 프롬프트 별도 관리

```python
# prompts/tax_expert_2026.py
from typing import Dict
from pathlib import Path

class TaxExpertPrompt:
    """세금 전문가 프롬프트 관리"""

    def __init__(self):
        self.template_dir = Path(__file__).parent / "templates"
        self._load_templates()

    def _load_templates(self) -> None:
        """템플릿 파일 로드"""
        self.system_prompt = self._read_template("tax_expert_system.txt")
        self.user_prompt_template = self._read_template("tax_query.txt")

    def build_prompt(self, context: Dict) -> str:
        """컨텍스트로 프롬프트 구성"""
        return self.user_prompt_template.format(**context)

    def _read_template(self, filename: str) -> str:
        """템플릿 파일 읽기"""
        with open(self.template_dir / filename, 'r', encoding='utf-8') as f:
            return f.read()


# prompts/templates/tax_expert_system.txt (별도 파일)
"""
당신은 2026년 대한민국 세법 전문가입니다.

주요 역할:
1. 소득세 계산
2. 공제 항목 분석
3. 절세 방법 제안

답변 형식:
- 근거 법령 명시
- 계산 과정 상세 설명
- 주의사항 안내
"""
```

### 에이전트 설정 관리

```python
# agents/config.py
from pydantic import BaseModel, Field
from typing import Optional

class AgentConfig(BaseModel):
    """에이전트 설정 (타입 안전)"""

    model_name: str = Field(default="gpt-4", description="LLM 모델명")
    temperature: float = Field(default=0.0, ge=0.0, le=2.0)
    max_tokens: int = Field(default=2000, gt=0)
    timeout: int = Field(default=30, description="초 단위")
    retry_count: int = Field(default=3, ge=0)
    enable_caching: bool = Field(default=True)

    class Config:
        validate_assignment = True  # 할당 시 검증


# 사용 예시
config = AgentConfig(
    model_name="claude-3-opus",
    temperature=0.1,
    max_tokens=4000
)

agent = MultiExcelAgent(llm, config)
```

---

## 코드 리뷰 체크리스트

### 1. 파일 구조
- [ ] 파일이 한 가지 역할만 하는가?
- [ ] 파일명이 내용을 명확히 반영하는가?
- [ ] 계층 구조가 명확한가? (routes → services → repositories)
- [ ] 순환 의존성이 없는가?

### 2. 함수/메서드
- [ ] 함수가 15줄 이내인가?
- [ ] 함수가 한 가지 일만 하는가? (단일 책임)
- [ ] 함수명이 동사로 시작하는가?
- [ ] Type hints가 모두 있는가?
- [ ] Docstring이 있는가?
- [ ] 부수 효과(side effect)가 명확한가?

### 3. 클래스
- [ ] 클래스가 단일 책임 원칙을 따르는가?
- [ ] Public/Private 메서드가 명확히 구분되는가? (`_private`)
- [ ] 상속보다 조합(composition)을 우선했는가?

### 4. 변수/상수
- [ ] 변수명이 의미를 명확히 전달하는가?
- [ ] Magic number가 상수로 정의되었는가?
- [ ] 전역 변수를 피했는가?

### 5. 에러 처리
- [ ] 예외 처리가 적절한가?
- [ ] 에러 메시지가 명확한가?
- [ ] 리소스 정리가 보장되는가? (try/finally, context manager)

### 6. 테스트
- [ ] 주요 함수에 테스트가 있는가?
- [ ] 테스트가 독립적인가? (순서 무관)
- [ ] Edge case가 테스트되었는가?

### 7. 성능
- [ ] N+1 쿼리가 없는가?
- [ ] 불필요한 반복문이 없는가?
- [ ] 캐싱이 적절히 사용되었는가?

### 8. 보안
- [ ] SQL injection 취약점이 없는가?
- [ ] XSS 취약점이 없는가? (React)
- [ ] API 키가 하드코딩되지 않았는가?
- [ ] 입력 검증이 되는가?

---

## 리팩토링 프로세스

### 1단계: 현재 상태 분석
```bash
# 파일 구조 확인
tree src/ -L 3

# 코드 중복 검사
grep -r "def calculate_tax" src/

# 복잡도 측정 (Python)
radon cc src/ -a -nb
```

### 2단계: 우선순위 결정
1. **높음**: 보안 취약점, 버그 유발 코드
2. **중간**: 중복 코드, 긴 함수, 복잡한 로직
3. **낮음**: 네이밍, 포맷팅

### 3단계: 점진적 리팩토링
- 한 번에 하나씩 변경
- 각 변경 후 테스트 실행
- 작은 커밋으로 이력 관리

### 4단계: 테스트 보강
- 리팩토링 전 테스트 작성
- 리팩토링 후 테스트 통과 확인

### 5단계: 문서 업데이트
- Docstring 갱신
- README 업데이트
- CLAUDE.md 반영

---

## 자동화 도구

### Python (Backend/Agent)
```bash
# 린팅
ruff check src/
pylint src/

# 포맷팅
black src/
isort src/

# 타입 체크
mypy src/

# 복잡도 측정
radon cc src/ -a
```

### JavaScript (Frontend)
```bash
# 린팅
eslint src/

# 포맷팅
prettier --write src/

# 미사용 코드 탐지
npx depcheck
```

---

## 마이그레이션 전략

### 기존 코드 점진적 개선

```python
# 1. 기존 코드 유지하면서 새 구조 추가
# backend/routes/multi_excel.py (기존)
@router.post("/api/v1/process")  # 유지
async def process_excel_old(files: list[UploadFile]):
    # 기존 코드 유지
    pass

# backend/routes/multi_excel_v2.py (새 구조)
@router.post("/api/v2/process")  # 신규
async def process_excel(
    files: list[UploadFile],
    service: ExcelService = Depends(get_excel_service)
):
    return await service.process_multiple_files(files)


# 2. 테스트 후 기존 엔드포인트를 새 구조로 교체
# 3. 구버전 엔드포인트 deprecated 표시
@router.post("/api/v1/process", deprecated=True)
```

---

## 예시: 실전 리팩토링

### Before (현재 코드 패턴)
```python
# backend/routes/og_rag.py
@router.post("/api/rag/query")
async def query_rag(request: dict):
    # 모든 로직이 한 곳에
    query = request["query"]

    # RAG 검색
    retriever = OGRAGSystem()
    docs = retriever.retrieve(query)

    # LLM 호출
    llm = ChatAnthropic(model="claude-3-opus")
    prompt = f"Answer: {query}\nDocs: {docs}"
    response = llm.invoke(prompt)

    # 결과 반환
    return {"answer": response}
```

### After (리팩토링 후)
```python
# backend/routes/rag.py (Presentation Layer)
@router.post("/api/rag/query", response_model=RAGResponse)
async def query_rag(
    request: RAGRequest,
    service: RAGService = Depends(get_rag_service)
) -> RAGResponse:
    """RAG 질의 엔드포인트"""
    return await service.query(request.query)


# backend/services/rag_service.py (Business Logic Layer)
class RAGService:
    """RAG 비즈니스 로직"""

    def __init__(
        self,
        retriever: RAGRetriever,
        llm_client: LLMClient,
        prompt_builder: PromptBuilder
    ):
        self.retriever = retriever
        self.llm_client = llm_client
        self.prompt_builder = prompt_builder

    async def query(self, query: str) -> RAGResponse:
        """RAG 질의 처리"""
        # 1. 검색
        docs = await self.retriever.retrieve(query)

        # 2. 프롬프트 구성
        prompt = self.prompt_builder.build(query, docs)

        # 3. LLM 호출
        response = await self.llm_client.generate(prompt)

        # 4. 응답 구성
        return RAGResponse(
            answer=response.text,
            sources=[doc.metadata for doc in docs],
            confidence=response.confidence
        )


# backend/core/dependencies.py (Dependency Injection)
def get_rag_service() -> RAGService:
    """RAG 서비스 의존성 주입"""
    retriever = RAGRetriever(
        embedding_model=get_embedding_model(),
        vector_store=get_vector_store()
    )
    llm_client = LLMClient(
        model=settings.LLM_MODEL,
        api_key=settings.ANTHROPIC_API_KEY
    )
    prompt_builder = PromptBuilder(
        template_path="prompts/templates/rag_query.txt"
    )

    return RAGService(retriever, llm_client, prompt_builder)
```

---

## 마무리

리팩토링은 **점진적**으로 진행하세요:

1. 테스트 작성 → 2. 작은 변경 → 3. 테스트 통과 → 4. 커밋 → 반복

**Red-Green-Refactor 사이클**:
- 🔴 Red: 실패하는 테스트 작성
- 🟢 Green: 최소한의 코드로 테스트 통과
- 🔵 Refactor: 코드 개선 (테스트는 계속 통과)

코드는 **읽는 사람을 위해** 작성하세요. 6개월 후의 당신도 남입니다.
