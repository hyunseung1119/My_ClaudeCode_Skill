---
name: prompt-optimizer
description: Optimize prompts and LangGraph performance.
---

# ?렞 Prompt & LangGraph Optimizer (2026)

## 媛쒖슂
?꾨＼?꾪듃 ?붿??덉뼱留곴낵 LangGraph 援ъ꽦???먮룞?쇰줈 理쒖쟻?뷀븯???깅뒫, 鍮꾩슜, ?띾룄瑜?媛쒖꽑?⑸땲??

## 二쇱슂 湲곕뒫

### 1截뤴깵 Prompt ?먮룞 理쒖쟻??
- **?좏겙 ?뺤텞**: ?섎? ?좎??섎㈃??湲몄씠 20-40% 媛먯냼
- **紐낇솗??媛쒖꽑**: 紐⑦샇???쒗쁽 ?쒓굅, 援ъ껜??吏?쒖궗??異붽?
- **Few-shot ?먮룞 ?앹꽦**: ?덉젣 ?먮룞 ?좊퀎 諛?異붽?
- **A/B ?뚯뒪??*: ?щ윭 踰꾩쟾 鍮꾧탳 諛?理쒖쟻 ?좏깮

### 2截뤴깵 LangGraph 援ъ“ 遺꾩꽍
- **?몃뱶 ?⑥쑉??遺꾩꽍**: 遺덊븘?뷀븳 ?몃뱶 ?먯?
- **蹂묐젹??媛?μ꽦 寃??*: ?쒖감 ?ㅽ뻾??蹂묐젹濡??꾪솚
- **?먮윭 ?몃뱾留?媛쒖꽑**: Retry 濡쒖쭅, Fallback 異붽?
- **?곹깭 愿由?理쒖쟻??*: 遺덊븘?뷀븳 ?곹깭 ?쒓굅

### 3截뤴깵 鍮꾩슜 理쒖쟻??
- **紐⑤뜽 ?좏깮 ?먮룞??*: Haiku vs Sonnet vs Opus 鍮꾧탳
- **Prompt Caching ?곸슜**: ?ъ궗??媛?ν븳 遺遺?罹먯떛
- **Batch 泥섎━**: 媛?ν븳 ?붿껌 臾띠쓬 泥섎━

### 4截뤴깵 ?깅뒫 ?꾨줈?뚯씪留?
- **?몃뱶蹂??ㅽ뻾 ?쒓컙**: 蹂묐ぉ 吏???먯?
- **?좏겙 ?ъ슜??異붿쟻**: ?몃뱶蹂?input/output ?좏겙
- **鍮꾩슜 遺꾩꽍**: API ?몄텧??鍮꾩슜 怨꾩궛

---

## ?ъ슜 諛⑸쾿

### Case 1: Prompt 理쒖쟻??

```bash
/prompt-optimizer --file src/prompts/templates/tax_expert_system.txt
```

**遺꾩꽍 寃곌낵:**
```markdown
# ?렞 Prompt 理쒖쟻??蹂닿퀬??

## ?꾩옱 ?꾨＼?꾪듃 遺꾩꽍

**?뚯씪**: `src/prompts/templates/tax_expert_system.txt`
**?좏겙 ??*: 487 tokens
**?덉긽 鍮꾩슜** (1,000???몄텧):
- Input: $1.46 (Claude 3.5 Sonnet)
- **Caching 媛??*: $0.15 (90% ?덇컧)

---

## ?뵇 諛쒓껄??臾몄젣??

### 1. 以묐났 ?쒗쁽 (?좏겙 ??퉬)
```diff
- ?뱀떊? ??쒕?援?援?꽭泥?湲곗? ?몃Т ?꾨Ц媛?낅땲??
- 2026???꾩옱 ?쒗뻾 以묒씤 ?몃쾿??湲곗??쇰줈 ?뺥솗?섍쾶 ?듬??⑸땲??
+ ?뱀떊? 2026????쒕?援??몃쾿 湲곗? ?몃Т ?꾨Ц媛?낅땲??
```
**?덇컧**: 8 tokens (-1.6%)

### 2. 紐⑦샇??吏?쒖궗??
```diff
- 援ъ껜??湲덉븸 怨꾩궛 ???곗텧 怨쇱젙 ?④퀎蹂??쒖떆
+ 湲덉븸 怨꾩궛 ??諛섎뱶???ㅼ쓬 ?뺤떇 ?ъ슜:
  1. 怨쇱꽭?쒖?: 50,000,000??
  2. ?곸슜 ?몄쑉: 24%
  3. ?곗텧?몄븸: 50,000,000 횞 0.24 - 576留뚯썝 = 6,240,000??
```
**?④낵**: 怨꾩궛 ?ㅻ쪟 50% 媛먯냼 (?ㅽ뿕 寃곌낵)

### 3. Few-shot ?덉젣 遺議?
**異붿쿇**: 2-3媛??덉젣 異붽?
```
?먯삁??1: ?ъ뾽?뚮뱷 怨꾩궛??
吏덈Ц: ??留ㅼ텧 8,000留뚯썝, ?꾩슂寃쎈퉬 3,000留뚯썝??寃쎌슦 醫낇빀?뚮뱷?몃뒗?

?듬?:
1. ?ъ뾽?뚮뱷湲덉븸: 8,000留뚯썝 - 3,000留뚯썝 = 5,000留뚯썝
2. 怨쇱꽭?쒖? (?뚮뱷怨듭젣 ?놁쓬 媛??: 5,000留뚯썝
3. ?곗텧?몄븸: 5,000留뚯썝 횞 0.24 - 576留뚯썝 = 624留뚯썝
4. 吏諛⑹냼?앹꽭: 62.4留뚯썝
5. 珥??⑸??몄븸: 686.4留뚯썝

洹쇨굅: ?뚯냼?앹꽭踰뺛???5議?(2026??湲곗?)
```
**?④낵**: ?뺤떇 以?섏쑉 90% ??98%

---

## ??理쒖쟻?붾맂 踰꾩쟾

### Version A (?좏겙 理쒖냼??
- **紐⑺몴**: 鍮꾩슜 ?덇컧
- **?좏겙**: 487 ??389 (-20%)
- **紐낇솗??*: ?좎?
- **異붿쿇 ?곹솴**: API ?몄텧 鍮덈룄 ?믪쓣 ??

### Version B (?뺥솗???곗꽑)
- **紐⑺몴**: ?깅뒫 ?μ긽
- **?좏겙**: 487 ??612 (+26%)
- **Few-shot ?덉젣**: 3媛?異붽?
- **異붿쿇 ?곹솴**: 蹂듭옟??怨꾩궛 留롮쓣 ??

### Version C (洹좏삎)
- **紐⑺몴**: 鍮꾩슜-?깅뒫 諛몃윴??
- **?좏겙**: 487 ??445 (-9%)
- **媛쒖꽑 ?ы빆**: 以묐났 ?쒓굅 + 紐낇솗??媛쒖꽑
- **異붿쿇**: 狩?湲곕낯 沅뚯옣

---

## ?뱤 A/B ?뚯뒪??寃곌낵 (100媛?吏덈Ц)

| 踰꾩쟾 | ?뺥솗??| 鍮꾩슜 | ?됯퇏 ?묐떟 ?쒓컙 | ?뺤떇 以?섏쑉 |
|------|--------|------|----------------|-------------|
| ?꾩옱 | 87% | $0.146 | 2.3珥?| 92% |
| Ver A | 85% | $0.117 | 2.1珥?| 90% |
| Ver B | 94% | $0.183 | 2.5珥?| 98% |
| Ver C | 91% | $0.133 | 2.2珥?| 96% |

**異붿쿇**: Version C (?뺥솗??+4%, 鍮꾩슜 -9%)

---

## ?? 利됱떆 ?곸슜 媛?ν븳 媛쒖꽑

### 1. Prompt Caching ?ㅼ젙
```python
# backend/routes/og_rag/generation.py
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    system=[{
        "type": "text",
        "text": system_prompt,
        "cache_control": {"type": "ephemeral"}  # ??異붽?
    }],
    messages=[...]
)
```
**?덉긽 ?덇컧**: ??$380 ??$50 (87% ?덇컧)

### 2. 紐⑤뜽 ?좏깮 理쒖쟻??
```python
# 媛꾨떒??吏덈Ц (30% of queries)
model = "claude-3-haiku-20240307"  # $0.25/1M tokens

# 蹂듭옟??吏덈Ц (70% of queries)
model = "claude-3-5-sonnet-20241022"  # $3/1M tokens
```
**?덉긽 ?덇컧**: ?됯퇏 鍮꾩슜 40% 媛먯냼

### 3. 援ъ“?붾맂 異쒕젰 媛뺤젣
```python
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    response_format={"type": "json_object"},  # ??JSON 媛뺤젣
    messages=[...]
)
```
**?④낵**: ?뚯떛 ?먮윭 0%, ?ъ떆??遺덊븘??

---

## ?뮶 ????듭뀡

```bash
# 理쒖쟻?붾맂 踰꾩쟾 ???
/prompt-optimizer --save version_c

# 寃곌낵:
# - src/prompts/templates/tax_expert_system.txt (諛깆뾽)
# - src/prompts/templates/tax_expert_system_v2.txt (理쒖쟻??踰꾩쟾)
# - docs/optimization/tax_expert_system_report.md (蹂닿퀬??
```
```

---

### Case 2: LangGraph 援ъ“ 理쒖쟻??

```bash
/prompt-optimizer --langgraph src/multi_excel/graph.py
```

**遺꾩꽍 寃곌낵:**
```markdown
# ?㎥ LangGraph 理쒖쟻??蹂닿퀬??

## ?꾩옱 洹몃옒??遺꾩꽍

**?뚯씪**: `src/multi_excel/graph.py`
**?몃뱶 ??*: 6媛?
**珥??ㅽ뻾 ?쒓컙**: ?됯퇏 12.3珥?
**蹂묐젹 泥섎━**: 2/6 ?몃뱶留?蹂묐젹

---

## ?뱤 ?몃뱶蹂??깅뒫 ?꾨줈?뚯씪

| ?몃뱶 | ?됯퇏 ?쒓컙 | ?좏겙 ?ъ슜 | 鍮꾩슜 | 蹂묐ぉ? |
|------|-----------|-----------|------|-------|
| parse_files | 1.2珥?| 0 | $0 | ??|
| analyze_sheets | 4.5珥?| 3,200 | $0.0096 | ?좑툘 |
| validate | 2.1珥?| 1,500 | $0.0045 | ??|
| synthesize | 3.8珥?| 2,800 | $0.0084 | ?좑툘 |
| extract_company | 0.7珥?| 800 | $0.0024 | ??|
| **Total** | **12.3珥?* | **8,300** | **$0.0249** | |

**蹂묐ぉ 吏??*: analyze_sheets (37%), synthesize (31%)

---

## ?뵇 諛쒓껄??臾몄젣??

### 1. ?쒖감 ?ㅽ뻾 (蹂묐젹??媛??

**?꾩옱:**
```python
# ?쒖감 ?ㅽ뻾 (?먮┝)
result = graph.invoke({
    "files": files,
    "processing_status": "parsing"
})
# parse ??analyze ??validate ??synthesize (?쒖감)
```

**媛쒖꽑??**
```python
# 蹂묐젹 ?ㅽ뻾 (鍮좊쫫)
from langgraph.pregel import Send

def route_to_parallel(state):
    # 媛??뚯씪???낅┰?곸쑝濡?泥섎━
    return [
        Send("analyze_file", {"file": file})
        for file in state["files"]
    ]

graph = StateGraph(MultiExcelState)
graph.add_node("parse_files", parse_files_node)
graph.add_node("analyze_file", analyze_single_file)  # 蹂묐젹
graph.add_conditional_edges("parse_files", route_to_parallel)
```

**?덉긽 ?④낵**:
- 3媛??뚯씪: 12.3珥???5.8珥?(53% 媛쒖꽑)
- 5媛??뚯씪: 19.2珥???6.1珥?(68% 媛쒖꽑)

---

### 2. 遺덊븘?뷀븳 LLM ?몄텧

**?꾩옱:**
```python
# analyze_sheets_node?먯꽌 紐⑤뱺 ?쒗듃??LLM ?몄텧
for sheet in file.sheets:
    sheet_type = llm.classify(sheet)  # LLM ?몄텧 (?먮┝)
```

**媛쒖꽑??**
```python
# Rule-based + LLM Fallback
for sheet in file.sheets:
    # 1. 鍮좊Ⅸ 洹쒖튃 湲곕컲 遺꾨쪟 ?쒕룄
    sheet_type = rule_based_classifier(sheet)

    # 2. 遺덊솗?ㅽ븳 寃쎌슦留?LLM ?몄텧
    if sheet_type == "unknown":
        sheet_type = llm.classify(sheet)
```

**?덉긽 ?④낵**:
- LLM ?몄텧: 100% ??20% (80% 媛먯냼)
- 鍮꾩슜: $0.025 ??$0.008 (68% ?덇컧)
- ?쒓컙: 4.5珥???1.2珥?(73% 媛쒖꽑)

---

### 3. 以묐났 寃利?(validate ?몃뱶)

**?꾩옱:**
```python
# 紐⑤뱺 ?뚯씪/?쒗듃瑜??ㅼ떆 寃利?
def validate_node(state):
    for file in state["files"]:
        for sheet in file.sheets:
            validate_sheet(sheet)  # 以묐났 ?묒뾽
```

**媛쒖꽑??**
```python
# analyze ?④퀎?먯꽌 寃利앸룄 ?④퍡
def analyze_sheets_node(state):
    for sheet in file.sheets:
        sheet.data = extract_data(sheet)
        sheet.validation_status = validate_inline(sheet.data)  # ?숈떆??
```

**?덉긽 ?④낵**:
- ?몃뱶 ?쒓굅: 6媛???5媛?
- ?쒓컙: 2.1珥??덉빟
- 肄붾뱶 蹂듭옟?? 媛먯냼

---

## ??理쒖쟻?붾맂 洹몃옒??援ъ“

### Before (?쒖감)
```
START ??parse ??analyze ??validate ??synthesize ??END
         1.2s    4.5s      2.1s       3.8s        = 12.3s
```

### After (蹂묐젹 + ?듯빀)
```
START ??parse ??[analyze_file1, analyze_file2, analyze_file3] ??synthesize ??END
         1.2s           2.3s (蹂묐젹)                               2.1s      = 5.6s
```

**媛쒖꽑??*: 54% 鍮⑤씪吏?

---

## ?렞 援ы쁽 怨꾪쉷

### Step 1: ?뚯씪蹂?蹂묐젹 泥섎━ (?곗꽑?쒖쐞: High)
```python
# src/multi_excel/graph.py
def create_parallel_graph():
    graph = StateGraph(MultiExcelState)

    # ?몃뱶 ?뺤쓽
    graph.add_node("parse_files", parse_files_node)
    graph.add_node("analyze_file", analyze_single_file_node)
    graph.add_node("synthesize", synthesize_node)

    # ?ｌ?: parse ??媛??뚯씪濡?遺꾩궛 (Send API)
    graph.add_conditional_edges(
        "parse_files",
        lambda state: [
            Send("analyze_file", {"file": f})
            for f in state["files"]
        ]
    )

    # 紐⑤뱺 analyze_file ?꾨즺 ??synthesize
    graph.add_edge("analyze_file", "synthesize")
    graph.add_edge("synthesize", END)

    return graph.compile()
```

**?덉긽 ?쒓컙**: 2-3?쒓컙
**?덉긽 ?④낵**: 50-70% ?띾룄 媛쒖꽑

---

### Step 2: Rule-based Classifier (?곗꽑?쒖쐞: Medium)
```python
# src/multi_excel/utils/sheet_classifier.py
def rule_based_classify(sheet_name: str, data: dict) -> str:
    """鍮좊Ⅸ 洹쒖튃 湲곕컲 遺꾨쪟"""
    name_lower = sheet_name.lower()

    # ?ㅼ썙??留ㅼ묶
    if any(k in name_lower for k in ["?먯씡", "income", "pl"]):
        return "income_statement"
    elif any(k in name_lower for k in ["?щТ?곹깭", "balance", "bs"]):
        return "balance_sheet"
    elif any(k in data.keys() for k in ["留ㅼ텧??, "?곸뾽?댁씡"]):
        return "income_statement"

    return "unknown"  # LLM ?몄텧 ?꾩슂
```

**?덉긽 ?쒓컙**: 1-2?쒓컙
**?덉긽 ?④낵**: 鍮꾩슜 70% ?덇컧

---

### Step 3: Analyze + Validate ?듯빀 (?곗꽑?쒖쐞: Low)
```python
# src/multi_excel/agents/analyzer.py
def analyze_with_validation(sheet: SheetData) -> SheetData:
    """遺꾩꽍怨?寃利앹쓣 ?숈떆??""
    # 1. ?곗씠??異붿텧
    sheet.data = extract_financial_data(sheet.raw_data)

    # 2. ?숈떆??寃利?
    sheet.validation_errors = validate_data(sheet.data)
    sheet.validation_status = "valid" if not sheet.validation_errors else "invalid"

    return sheet
```

**?덉긽 ?쒓컙**: 1?쒓컙
**?덉긽 ?④낵**: 2珥??덉빟 + 肄붾뱶 媛꾧껐??

---

## ?뱤 理쒖쟻???꾪썑 鍮꾧탳

### ?깅뒫 吏??
| 吏??| Before | After | 媛쒖꽑 |
|------|--------|-------|------|
| **?됯퇏 泥섎━ ?쒓컙 (3 ?뚯씪)** | 12.3珥?| 5.6珥?| -54% |
| **?됯퇏 泥섎━ ?쒓컙 (5 ?뚯씪)** | 19.2珥?| 6.1珥?| -68% |
| **?좏겙 ?ъ슜** | 8,300 | 2,500 | -70% |
| **鍮꾩슜** | $0.025 | $0.008 | -68% |
| **LLM ?몄텧 ?잛닔** | 15??| 3??| -80% |

### 鍮꾩슜 ?덇컧 (??1,000 ?붿껌 湲곗?)
- Before: $25/??
- After: $8/??
- **?덇컧**: $17/??(68%)

---

## ?뵩 異붽? 理쒖쟻???듭뀡

### 1. Streaming 吏??
```python
# 以묎컙 寃곌낵瑜??ㅼ떆媛꾩쑝濡?諛섑솚
async for chunk in graph.astream(state):
    if chunk.get("processing_status"):
        await websocket.send_json({
            "status": chunk["processing_status"],
            "progress": chunk["progress_percent"]
        })
```

**?④낵**: UX 媛쒖꽑 (?ъ슜?먭? 吏꾪뻾 ?곹솴 ?뺤씤)

---

### 2. Checkpointing (?μ븷 蹂듦뎄)
```python
# ?몃뱶 ?ㅽ뻾 寃곌낵 ???
graph = create_graph().compile(
    checkpointer=MemorySaver()  # ?먮뒗 PostgresSaver
)

# ?ㅽ뙣 ??留덉?留?泥댄겕?ъ씤?몃????ш컻
result = graph.invoke(state, config={
    "configurable": {"thread_id": session_id}
})
```

**?④낵**: ?좊ː???μ긽 (?ㅽ뙣 ??泥섏쓬遺???ъ떆??遺덊븘??

---

### 3. 紐⑤뜽 ?좏깮 ?먮룞??
```python
def select_model(sheet_complexity: str) -> str:
    """?쒗듃 蹂듭옟?꾩뿉 ?곕씪 紐⑤뜽 ?좏깮"""
    if sheet_complexity == "simple":
        return "claude-3-haiku-20240307"  # 鍮좊Ⅴ怨????
    elif sheet_complexity == "medium":
        return "claude-3-5-sonnet-20241022"  # 洹좏삎
    else:
        return "claude-opus-4-20250514"  # ?뺥솗??理쒖슦??
```

**?④낵**: 鍮꾩슜-?깅뒫 理쒖쟻??

---

## ?뮶 理쒖쟻??寃곌낵 ???

```bash
# 理쒖쟻?붾맂 洹몃옒?????
/prompt-optimizer --save optimized_graph

# 寃곌낵:
# - src/multi_excel/graph.py (諛깆뾽)
# - src/multi_excel/graph_v2.py (理쒖쟻??踰꾩쟾)
# - docs/optimization/multi_excel_graph_report.md (蹂닿퀬??
```
```

---

### Case 3: ?먮룞 Few-shot ?앹꽦

```bash
/prompt-optimizer --generate-examples --task "?щТ?쒗몴 遺꾩꽍"
```

**異쒕젰:**
```markdown
# ?럳 Few-shot ?덉젣 ?먮룞 ?앹꽦

## ?쒖뒪?? ?щТ?쒗몴 遺꾩꽍

### ?덉젣 1: ?먯씡怨꾩궛??湲곕낯 遺꾩꽍
```json
{
  "input": {
    "sheet_name": "?먯씡怨꾩궛??,
    "data": {
      "留ㅼ텧??: 150000000,
      "留ㅼ텧?먭?": 80000000,
      "?먮ℓ愿由щ퉬": 30000000
    }
  },
  "output": {
    "sheet_type": "income_statement",
    "key_metrics": {
      "留ㅼ텧??: 150000000,
      "留ㅼ텧?먭?": 80000000,
      "留ㅼ텧珥앹씠??: 70000000,
      "?곸뾽?댁씡": 40000000,
      "留ㅼ텧珥앹씠?듬쪧": 46.67,
      "?곸뾽?댁씡瑜?: 26.67
    },
    "analysis": "留ㅼ텧珥앹씠?듬쪧 46.67%, ?곸뾽?댁씡瑜?26.67%濡?嫄댁쟾???섏씡援ъ“"
  }
}
```

### ?덉젣 2: ?щТ?곹깭??湲곕낯 遺꾩꽍
```json
{
  "input": {
    "sheet_name": "?щТ?곹깭??,
    "data": {
      "?먯궛珥앷퀎": 500000000,
      "遺梨꾩킑怨?: 200000000,
      "?먮낯珥앷퀎": 300000000
    }
  },
  "output": {
    "sheet_type": "balance_sheet",
    "key_metrics": {
      "?먯궛珥앷퀎": 500000000,
      "遺梨꾩킑怨?: 200000000,
      "?먮낯珥앷퀎": 300000000,
      "遺梨꾨퉬??: 66.67,
      "?먭린?먮낯鍮꾩쑉": 60.00
    },
    "analysis": "遺梨꾨퉬??66.67%, ?덉젙?곸씤 ?щТ援ъ“"
  }
}
```

### ?덉젣 3: 鍮꾩젙???곗씠??(Unknown)
```json
{
  "input": {
    "sheet_name": "硫붾え",
    "data": {
      "鍮꾧퀬": "2026???ъ뾽 怨꾪쉷",
      "?대떦??: "?띻만??
    }
  },
  "output": {
    "sheet_type": "unknown",
    "key_metrics": {},
    "analysis": "?щТ ?곗씠?곌? ?꾨떂"
  }
}
```

---

## ?뱿 ?꾨＼?꾪듃 ?곸슜

### Before (Few-shot ?놁쓬)
```python
prompt = "?ㅼ쓬 ?쒗듃 ?곗씠?곕? 遺꾩꽍?섏꽭?? {data}"
```
**?뺥솗??*: 82%

### After (Few-shot 3媛?異붽?)
```python
prompt = """
?ㅼ쓬 ?덉젣瑜?李멸퀬?섏뿬 ?쒗듃 ?곗씠?곕? 遺꾩꽍?섏꽭??

[?덉젣 1]
?낅젰: ...
異쒕젰: ...

[?덉젣 2]
?낅젰: ...
異쒕젰: ...

[?덉젣 3]
?낅젰: ...
異쒕젰: ...

?댁젣 ?ㅼ쓬 ?곗씠?곕? 遺꾩꽍?섏꽭??
{data}
"""
```
**?뺥솗??*: 94% (+12%p)

---

## ?뮕 ?곸슜 諛⑸쾿

```python
# src/multi_excel/agents/sheet_analyzer.py
FEW_SHOT_EXAMPLES = load_template("sheet_analysis_examples.txt")

def analyze_sheet(sheet: SheetData) -> SheetData:
    prompt = f"""
{FEW_SHOT_EXAMPLES}

?ㅼ젣 ?곗씠??
{sheet.to_dict()}
"""
    result = llm.generate(prompt)
    return result
```
```

---

## ?듭떖 湲곕뒫

### 1. Prompt 遺꾩꽍
- ?좏겙 ??怨꾩궛
- 以묐났 ?쒗쁽 ?먯?
- 紐⑦샇??吏?쒖궗??諛쒓껄
- 援ъ“ 媛쒖꽑 ?쒖븞

### 2. LangGraph ?꾨줈?뚯씪留?
- ?몃뱶蹂??ㅽ뻾 ?쒓컙
- 蹂묐젹??媛?μ꽦 遺꾩꽍
- 遺덊븘?뷀븳 ?몃뱶 ?먯?
- ?곹깭 ?ш린 理쒖쟻??

### 3. 鍮꾩슜 遺꾩꽍
- ?좏겙 ?ъ슜??異붿쟻
- 紐⑤뜽蹂?鍮꾩슜 鍮꾧탳
- 罹먯떛 ?④낵 ?덉륫
- ROI 怨꾩궛

### 4. A/B ?뚯뒪??
- ?щ윭 踰꾩쟾 ?먮룞 ?앹꽦
- 100媛?吏덈Ц?쇰줈 ?뚯뒪??
- ?뺥솗?? 鍮꾩슜, ?띾룄 鍮꾧탳
- 理쒖쟻 踰꾩쟾 異붿쿇

---

## 異쒕젰 ?뺤떇

1. **遺꾩꽍 蹂닿퀬??* (Markdown)
2. **理쒖쟻?붾맂 ?뚯씪** (諛깆뾽 + ??踰꾩쟾)
3. **?깅뒫 鍮꾧탳??* (Before/After)
4. **援ы쁽 媛?대뱶** (?④퀎蹂?肄붾뱶)

---

## ?먮룞???듭뀡

```bash
# CI/CD???듯빀
/prompt-optimizer --auto --threshold 10%

# 10% ?댁긽 媛쒖꽑 ???먮룞?쇰줈 PR ?앹꽦
```
