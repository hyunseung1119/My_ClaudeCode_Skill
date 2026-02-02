---
name: agent-evaluator
description: Agent/chatbot evaluation and performance reporting.
---

# ?뱤 Agent ?먮룞 ?됯? & 踰ㅼ튂留덊겕 Skill (2026)

## 媛쒖슂
?먯씠?꾪듃? 梨쀫큸???먮룞?쇰줈 ?뚯뒪?명븯怨??깅뒫 吏?쒕? ?곗텧?섏뿬 媛앷??곸씤 ?됯? 蹂닿퀬?쒕? ?앹꽦?⑸땲??

## 二쇱슂 湲곕뒫

### 1截뤴깵 ?먮룞 ?뚯뒪???곗씠???앹꽦
- **?⑹꽦 ?곗씠??*: LLM?쇰줈 ?뚯뒪??吏덈Ц ?먮룞 ?앹꽦
- **?ㅼ젣 ?곗씠??*: ?꾨줈?뺤뀡 濡쒓렇?먯꽌 ?섑뵆留?
- **Edge Cases**: ?덉쇅 ?곹솴 而ㅻ쾭由ъ?
- **?쒖씠??遺꾨쪟**: Easy / Medium / Hard

### 2截뤴깵 ?ㅼ감???깅뒫 ?됯?
- **?뺥솗??*: Ground Truth? 鍮꾧탳
- **愿?⑥꽦**: 吏덈Ц-?듬? ?곌???
- **?쇨???*: 媛숈? 吏덈Ц???숈씪 ?듬?
- **?섍컖 諛⑹?**: 洹쇨굅 ?녿뒗 二쇱옣 ?먯?
- **鍮꾩슜**: API ?몄텧 鍮꾩슜 怨꾩궛
- **?띾룄**: ?묐떟 ?쒓컙 痢≪젙

### 3截뤴깵 RAG ?꾩슜 硫뷀듃由?
- **Context Precision**: 寃???뺥솗??
- **Context Recall**: 寃???ы쁽??
- **Faithfulness**: ?듬? 洹쇨굅 異⑹떎??
- **Answer Relevancy**: ?듬? 愿?⑥꽦

### 4截뤴깵 鍮꾧탳 遺꾩꽍
- 踰꾩쟾 媛?鍮꾧탳 (v1 vs v2 vs v3)
- A/B ?뚯뒪???먮룞??
- ?듦퀎???좎쓽??寃利?
- ?뚭? ?먯? (?깅뒫 ?섎씫 媛먯?)

---

## ?ъ슜 諛⑸쾿

### Case 1: 湲곕낯 ?됯?

```bash
/agent-evaluator --target chatbot_v9 --dataset qa_100
```

**?ㅽ뻾 怨쇱젙:**
1. ?뚯뒪???곗씠??濡쒕뱶 (100媛?吏덈Ц)
2. ?먯씠?꾪듃???쒖감 吏덉쓽
3. ?묐떟 ?섏쭛 諛?硫뷀듃由?怨꾩궛
4. 蹂닿퀬???앹꽦

**異쒕젰:**
```markdown
# ?뱤 Agent ?됯? 蹂닿퀬??

## ?뚯뒪???뺣낫
- **???*: ChatBot V9 (OG-RAG)
- **?곗씠?곗뀑**: qa_100 (100 questions)
- **?ㅽ뻾 ?쒓컙**: 2026-01-27 21:30
- **珥??뚯슂 ?쒓컙**: 8遺?23珥?

---

## ?렞 醫낇빀 ?먯닔

| 吏??| ?먯닔 | ?깃툒 | 紐⑺몴 |
|------|------|------|------|
| **?꾩껜 ?됯?** | **82.3/100** | B+ | A (85+) |
| ?뺥솗??| 87.5% | A- | 90% |
| 愿?⑥꽦 | 91.2% | A | 85% |
| ?섍컖 諛⑹? | 78.4% | B | 85% |
| 鍮꾩슜 ?⑥쑉??| 85.0% | A- | 80% |
| ?묐떟 ?띾룄 | 73.1% | C+ | 80% |

**二쇱슂 諛쒓껄:**
- ??媛뺤젏: ?믪? 愿?⑥꽦, 鍮꾩슜 ?⑥쑉??
- ?좑툘 媛쒖꽑 ?꾩슂: ?섍컖 諛⑹? (78.4%), ?묐떟 ?띾룄 (2.8珥?

---

## ?뱢 ?곸꽭 硫뷀듃由?

### 1. ?뺥솗??(Accuracy): 87.5%

**?뺤쓽**: Ground Truth ?듬?怨쇱쓽 ?쇱튂??

**寃곌낵:**
- ?뺥솗???듬?: 63/100 (63%)
- 遺遺??뺥솗: 25/100 (25%)
- 遺?뺥솗: 12/100 (12%)

**?ㅻ떟 遺꾩꽍:**
```
吏덈Ц #23: "2026??洹쇰줈?뚮뱷怨듭젣 ?쒕룄??"
?덉긽: 2,000留뚯썝
?ㅼ젣: 1,500留뚯썝
?먯씤: 2025???몃쾿 ?곸슜 (理쒖떊 ?뺣낫 遺議?

吏덈Ц #47: "諛곗슦??怨듭젣?≪??"
?덉긽: 150留뚯썝
?ㅼ젣: 100留뚯썝
?먯씤: ?쒗뻾??vs ?쒗뻾洹쒖튃 ?쇰룞
```

**媛쒖꽑 諛⑹븞:**
1. 2026???몃쾿 ?곗씠?곕쿋?댁뒪 ?낅뜲?댄듃
2. ?쒗뻾???쒗뻾洹쒖튃 援щ텇 ?꾨＼?꾪듃 媛뺥솕

---

### 2. RAG 硫뷀듃由?

#### Context Precision: 0.74
**?뺤쓽**: 寃?됰맂 臾몄꽌 以?愿??臾몄꽌 鍮꾩쑉

| Top-K | Precision | Ideal |
|-------|-----------|-------|
| Top-1 | 0.82 | 0.90+ |
| Top-3 | 0.78 | 0.85+ |
| Top-5 | 0.74 | 0.80+ |

**遺꾩꽍**: Top-5?먯꽌 ?뺥솗???섎씫 ??遺덊븘?뷀븳 臾몄꽌 ?ы븿

**媛쒖꽑 諛⑹븞**: Reranker ?곸슜 (?덉긽 +10-15%p)

---

#### Context Recall: 0.68
**?뺤쓽**: 愿??臾몄꽌 以?寃?됰맂 鍮꾩쑉

**寃곌낵:**
- 寃???ㅽ뙣: 32% (愿??臾몄꽌 ?덉?留?寃??????
- ?먯씤 遺꾩꽍:
  - ?좎궗??誘몄쿂由?(?? "怨듭젣" vs "媛먮㈃")
  - 蹂듯빀 吏덈Ц 泥섎━ 遺議?(Multi-hop)

**媛쒖꽑 諛⑹븞**:
1. Query Expansion (?숈쓽??異붽?)
2. HyDE (媛???듬? ?앹꽦 ??寃??

---

#### Faithfulness: 0.81
**?뺤쓽**: ?듬???寃??寃곌낵??洹쇨굅???뺣룄

**寃곌낵:**
- ?꾩쟾 洹쇨굅: 65% (醫뗭쓬)
- 遺遺?洹쇨굅: 23% (?덉슜)
- 洹쇨굅 ?놁쓬: 12% (臾몄젣!) ???섍컖

**?섍컖 ?щ?:**
```
吏덈Ц: "醫낇빀?뚮뱷???좉퀬 湲고븳??"
?듬?: "留ㅻ뀈 6??30?쇨퉴吏?낅땲??  ???由?
寃??寃곌낵: "5??31?? (?뺥솗)
?먯씤: LLM ?ъ쟾 吏???곗꽑 (寃??寃곌낵 臾댁떆)
```

**媛쒖꽑 諛⑹븞**:
```python
# Grounding 媛뺤젣 ?꾨＼?꾪듃
system_prompt = """
?좑툘 寃쎄퀬: ?쒓났??踰뺤“臾몄뿉留??섏〈?섏꽭??
寃??寃곌낵???녿뒗 ?뺣낫???덈? 異붿륫?섏? 留덉꽭??
遺덊솗?ㅽ븯硫?"異붽? ?뺤씤 ?꾩슂"?쇨퀬 ?듬??섏꽭??
"""
```

---

#### Answer Relevancy: 0.91
**?뺤쓽**: ?듬???吏덈Ц怨?愿?⑤맂 ?뺣룄

**寃곌낵:** ?곗닔 (紐⑺몴 ?鍮?+6%p)

**?덉떆:**
```
吏덈Ц: "?꾨━?쒖꽌 醫낇빀?뚮뱷??怨꾩궛 諛⑸쾿??"
?듬?: "1. ?ъ뾽?뚮뱷湲덉븸 怨꾩궛... 2. ?꾩슂寃쎈퉬 怨듭젣... 3. 怨쇱꽭?쒖?..."
愿?⑥꽦: 狩먥춴狩먥춴狩?(?꾨꼍?섍쾶 愿??
```

---

### 3. ?깅뒫 吏??

#### ?됯퇏 ?묐떟 ?쒓컙: 2.8珥?
**紐⑺몴**: 2.0珥??댄븯

**蹂묐ぉ 遺꾩꽍:**
| ?④퀎 | ?쒓컙 | 鍮꾩쑉 |
|------|------|------|
| Query Router | 0.3珥?| 11% |
| Retrieval (Vector + Graph) | 0.9珥?| 32% |
| Reranking | 0.5珥?| 18% |
| LLM Generation | 1.0珥?| 36% |
| Post-processing | 0.1珥?| 3% |

**媛쒖꽑 諛⑹븞:**
1. Retrieval 蹂묐젹??(Vector + Graph ?숈떆 ?ㅽ뻾)
2. Prompt Caching (LLM ?띾룄 +10%)
3. Haiku 紐⑤뜽 ?ъ슜 (媛꾨떒??吏덈Ц)

**?덉긽 ?④낵**: 2.8珥???1.9珥?(32% 媛쒖꽑)

---

#### API 鍮꾩슜: $0.0187/吏덈Ц
**???덉긽 鍮꾩슜** (10,000 吏덈Ц): $187

**鍮꾩슜 遺꾩꽍:**
| 紐⑤뜽 | ?몄텧 ?잛닔 | 鍮꾩슜 | 鍮꾩쑉 |
|------|-----------|------|------|
| Query Router (Haiku) | 1 | $0.0002 | 1% |
| Retrieval Eval (Haiku) | 1 | $0.0003 | 2% |
| Answer Gen (Sonnet) | 1 | $0.0180 | 96% |
| Reflection (Haiku) | 0.3 | $0.0002 | 1% |

**理쒖쟻??諛⑹븞:**
1. Prompt Caching ??-90% Input ?좏겙
2. 媛꾨떒??吏덈Ц Haiku ?쇱슦????-83% 鍮꾩슜

**?덉긽 ?덇컧**: $187/????$58/??(69% ?덇컧)

---

### 4. ?먮윭 遺꾩꽍

#### ?먮윭?? 3% (3/100 ?ㅽ뙣)

**?먮윭 ?좏삎:**
```
1. Timeout (1嫄?:
   - 吏덈Ц #56: "蹂듭옟???ㅻ떒怨?怨꾩궛"
   - ?먯씤: LangGraph 臾댄븳 猷⑦봽
   - ?닿껐: Max iterations ?쒗븳

2. Parsing Error (1嫄?:
   - 吏덈Ц #73: "踰뺤씤?몄? ?뚮뱷??李⑥씠"
   - ?먯씤: JSON ?묐떟 遺덉셿??
   - ?닿껐: Structured Output 媛뺤젣

3. API Rate Limit (1嫄?:
   - 吏덈Ц #89: ?곗냽 ?몄텧
   - ?먯씤: Rate limit 珥덇낵
   - ?닿껐: Exponential backoff
```

---

## ?뵦 ?レ뒪??遺꾩꽍

### 媛???먮┛ 吏덈Ц Top 5
1. 吏덈Ц #56 (8.3珥?: "?щ윭 ?뚮뱷 ?좏삎 ?듯빀 怨꾩궛"
2. 吏덈Ц #42 (6.1珥?: "?몃쾿 媛쒖젙 ?꾪썑 鍮꾧탳"
3. 吏덈Ц #78 (5.9珥?: "蹂듭옟??怨듭젣 議고빀"

**怨듯넻??*: Multi-hop 異붾줎 ?꾩슂 ??Graph Traversal 蹂묐ぉ

---

### 媛??鍮꾩떬 吏덈Ц Top 5
1. 吏덈Ц #34 ($0.087): "50?④퀎 怨꾩궛 怨쇱젙"
2. 吏덈Ц #67 ($0.062): "踰뺣졊 ?꾩껜 ?몄슜"
3. 吏덈Ц #91 ($0.055): "?곸꽭??洹쇨굅 ?붽뎄"

**怨듯넻??*: 異쒕젰 ?좏겙 怨쇰떎 ??Max tokens ?쒗븳 ?꾩슂

---

### ?섍컖??留롮? 二쇱젣 Top 3
1. 理쒖떊 ?몃쾿 媛쒖젙 (2026??: 35% ?섍컖
2. 吏諛⑹꽭 愿?? 28% ?섍컖
3. ?먮? ?몄슜: 22% ?섍컖

**?먯씤**: ?곗씠?곕쿋?댁뒪???뺣낫 遺議?

**?닿껐**: 2026???몃쾿 ?щ·留?+ 吏諛⑹꽭 DB 異붽?

---

## ?뱤 踰꾩쟾 鍮꾧탳

### V8 vs V9 ?깅뒫 鍮꾧탳

| 吏??| V8 (Legacy) | V9 (OG-RAG) | 媛쒖꽑 |
|------|-------------|-------------|------|
| ?뺥솗??| 81.2% | 87.5% | +6.3%p |
| Context Precision | 0.63 | 0.74 | +17% |
| Faithfulness | 0.72 | 0.81 | +13% |
| ?됯퇏 ?묐떟 ?쒓컙 | 3.5珥?| 2.8珥?| -20% |
| 鍮꾩슜 | $0.025 | $0.019 | -24% |
| ?섍컖??| 18% | 12% | -33% |

**寃곕줎**: V9媛 紐⑤뱺 吏?쒖뿉???곗닔 ??

---

## ?렞 媛쒖꽑 ?곗꽑?쒖쐞

### High Priority (利됱떆 ?곸슜)

#### 1. Reranker ?곸슜
- **紐⑺몴**: Context Precision 0.74 ??0.85
- **援ы쁽 ?쒓컙**: 1-2??
- **?덉긽 ?④낵**: ?뺥솗??+5-8%p

#### 2. Prompt Caching
- **紐⑺몴**: 鍮꾩슜 -90%
- **援ы쁽 ?쒓컙**: 1?쒓컙
- **?덉긽 ?④낵**: $187/????$20/??

#### 3. 2026???몃쾿 ?낅뜲?댄듃
- **紐⑺몴**: ?섍컖??35% ??10%
- **援ы쁽 ?쒓컙**: 2-3??
- **?덉긽 ?④낵**: ?뺥솗??+3-5%p

---

### Medium Priority (1二???

#### 4. Query Expansion
- **紐⑺몴**: Context Recall 0.68 ??0.80
- **援ы쁽 ?쒓컙**: 3-4??
- **?덉긽 ?④낵**: 寃???ㅽ뙣 32% ??15%

#### 5. Retrieval 蹂묐젹??
- **紐⑺몴**: ?묐떟 ?쒓컙 2.8珥???2.0珥?
- **援ы쁽 ?쒓컙**: 2??
- **?덉긽 ?④낵**: ?띾룄 +29%

---

### Low Priority (2二???

#### 6. Multi-Agent 援ъ“
- **紐⑺몴**: 蹂듭옟??吏덈Ц 泥섎━ 媛쒖꽑
- **援ы쁽 ?쒓컙**: 1-2二?
- **?덉긽 ?④낵**: ?쒖젣 ?뺥솗??+15%

---

## ?뱚 寃곌낵 ???

### ?앹꽦?섎뒗 ?뚯씪
```
docs/evaluation/
?쒋?? chatbot_v9_report_2026-01-27.md       # 醫낇빀 蹂닿퀬??
?쒋?? chatbot_v9_metrics.json               # 硫뷀듃由?(JSON)
?쒋?? chatbot_v9_errors.csv                 # ?먮윭 濡쒓렇
?쒋?? chatbot_v9_slow_queries.csv           # ?먮┛ 吏덈Ц
?쒋?? chatbot_v9_hallucinations.csv         # ?섍컖 ?щ?
?붴?? chatbot_v9_comparison.png             # 踰꾩쟾 鍮꾧탳 李⑦듃
```

### JSON 異쒕젰 ?덉떆
```json
{
  "metadata": {
    "target": "chatbot_v9",
    "dataset": "qa_100",
    "timestamp": "2026-01-27T21:30:00Z",
    "duration_seconds": 503
  },
  "overall_score": 82.3,
  "metrics": {
    "accuracy": 0.875,
    "context_precision": 0.74,
    "context_recall": 0.68,
    "faithfulness": 0.81,
    "answer_relevancy": 0.91,
    "avg_response_time": 2.8,
    "avg_cost": 0.0187,
    "error_rate": 0.03,
    "hallucination_rate": 0.12
  },
  "distribution": {
    "difficulty": {
      "easy": {"count": 40, "accuracy": 0.95},
      "medium": {"count": 45, "accuracy": 0.87},
      "hard": {"count": 15, "accuracy": 0.67}
    }
  },
  "errors": [
    {
      "question_id": 56,
      "type": "timeout",
      "message": "Max iterations exceeded"
    }
  ]
}
```

---

## ?㎦ ?뚯뒪???곗씠???앹꽦

### ?먮룞 ?앹꽦 (LLM ?ъ슜)

```bash
/agent-evaluator --generate-dataset --topic "醫낇빀?뚮뱷?? --count 50
```

**?앹꽦 ?덉떆:**
```json
[
  {
    "id": 1,
    "question": "2026??醫낇빀?뚮뱷??理쒓퀬 ?몄쑉??",
    "ground_truth": "45% (怨쇱꽭?쒖? 10?듭썝 珥덇낵)",
    "difficulty": "easy",
    "category": "tax_rate",
    "requires_retrieval": true
  },
  {
    "id": 2,
    "question": "?꾨━?쒖꽌???꾩슂寃쎈퉬?⑥??",
    "ground_truth": "?낆쥌???곕씪 ?ㅻ쫫. ?몄쟻?⑹뿭 60-80%, 湲고? 30-50%",
    "difficulty": "medium",
    "category": "deduction",
    "requires_retrieval": true
  },
  {
    "id": 3,
    "question": "?ъ뾽?뚮뱷怨?洹쇰줈?뚮뱷??紐⑤몢 諛쏅뒗 寃쎌슦 醫낇빀?뚮뱷??怨꾩궛 諛⑸쾿??",
    "ground_truth": "1. 媛??뚮뱷湲덉븸 ?⑹궛 2. 醫낇빀?뚮뱷怨듭젣 ?곸슜 3. 怨쇱꽭?쒖? 怨꾩궛 4. ?몄븸 怨꾩궛",
    "difficulty": "hard",
    "category": "calculation",
    "requires_retrieval": true
  }
]
```

---

## ?봽 吏?띿쟻 紐⑤땲?곕쭅

### CI/CD ?듯빀

```yaml
# .github/workflows/agent-eval.yml
name: Agent Evaluation

on:
  pull_request:
    paths:
      - 'src/ontology/**'
      - 'src/prompts/**'
      - 'backend/routes/og_rag/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Evaluation
        run: |
          /agent-evaluator --dataset qa_smoke_test --threshold 85
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: '## ?쨼 Agent Evaluation\n\n' + results
            })
```

**?④낵**:
- PR留덈떎 ?먮룞 ?됯?
- ?깅뒫 ?뚭? ?먮룞 ?먯?
- 諛고룷 ???덉쭏 寃利?

---

## ?뱤 ??쒕낫??

### Grafana ?듯빀

```python
# backend/monitoring/metrics.py
from prometheus_client import Histogram, Counter

agent_response_time = Histogram(
    'agent_response_seconds',
    'Agent response time'
)

agent_accuracy = Counter(
    'agent_accuracy_total',
    'Agent accuracy count',
    ['is_correct']
)

@agent_response_time.time()
def handle_query(query: str):
    result = agent.run(query)

    # ?뺥솗??異붿쟻
    is_correct = evaluate(result)
    agent_accuracy.labels(is_correct=is_correct).inc()

    return result
```

**Grafana ??쒕낫??**
- ?ㅼ떆媛??뺥솗??異붿씠
- P50/P90/P99 ?묐떟 ?쒓컙
- ?먮윭??紐⑤땲?곕쭅
- 鍮꾩슜 異붿쟻

---

## ?럳 踰ㅼ튂留덊겕 鍮꾧탳

### ?몃? 踰ㅼ튂留덊겕

| 踰ㅼ튂留덊겕 | ?곕━ ?먯닔 | SOTA | ?됯퇏 |
|----------|-----------|------|------|
| **BEIR (Retrieval)** | 0.68 | 0.75 | 0.52 |
| **RAGAS (RAG)** | 0.81 | 0.88 | 0.65 |
| **TruthfulQA (?섍컖)** | 0.88 | 0.92 | 0.78 |

**遺꾩꽍**:
- Retrieval: ?됯퇏 ?댁긽, SOTA ?鍮?-9%
- RAG ?꾩껜: ?됯퇏 ?鍮?+25%, ?곗닔
- ?섍컖 諛⑹?: ?됯퇏 ?鍮?+13%, ?곗닔

**媛쒖꽑 紐⑺몴**: Retrieval??SOTA ?섏??쇰줈 (Reranker ?곸슜)

---

## ?뮕 ?ъ슜 ??

### 1. 鍮좊Ⅸ ?뚯뒪??(媛쒕컻 以?
```bash
/agent-evaluator --quick --count 10
# 10媛?吏덈Ц?쇰줈 鍮좊Ⅴ寃??뚯뒪??(1遺?
```

### 2. ?뱀젙 二쇱젣留?
```bash
/agent-evaluator --filter "category:tax_rate"
# ?몄쑉 愿??吏덈Ц留??뚯뒪??
```

### 3. ?뚭? ?뚯뒪??
```bash
/agent-evaluator --compare-with v8
# ?댁쟾 踰꾩쟾怨?鍮꾧탳
```

### 4. ?ㅼ떆媛?紐⑤땲?곕쭅
```bash
/agent-evaluator --watch --interval 1h
# 1?쒓컙留덈떎 ?먮룞 ?됯?
```

---

## ?렞 紐⑺몴 ?ㅼ젙 ?덉떆

```yaml
# evaluation_config.yml
targets:
  accuracy: 90%
  context_precision: 0.85
  context_recall: 0.80
  faithfulness: 0.90
  answer_relevancy: 0.88
  avg_response_time: 2.0s
  avg_cost: $0.015
  error_rate: <1%
  hallucination_rate: <8%

alerts:
  - metric: accuracy
    threshold: 85%
    action: slack_notify
  - metric: error_rate
    threshold: 5%
    action: pagerduty
```

---

## ?뱴 李멸퀬 硫뷀듃由??ㅻ챸

### RAGAS Framework
- **Context Precision**: 寃???뺥솗??
- **Context Recall**: 寃???ы쁽??
- **Faithfulness**: ?듬? 洹쇨굅 異⑹떎??
- **Answer Relevancy**: ?듬? 愿?⑥꽦

### 異붽? 硫뷀듃由?
- **Latency P50/P90/P99**: ?묐떟 ?쒓컙 遺꾪룷
- **Token Efficiency**: 異쒕젰 ?좏겙/?덉쭏 鍮꾩쑉
- **Hallucination Rate**: ?섍컖 鍮꾩쑉
- **User Satisfaction**: ?ъ슜??留뚯”??(?쇰뱶諛?湲곕컲)
