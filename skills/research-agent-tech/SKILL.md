---
name: research-agent-tech
description: Survey and apply latest LLM/agent technologies.
---

# ?뵮 AI Agent 理쒖떊 湲곗닠 議곗궗 & ?곸슜 Skill (2026)

## 媛쒖슂
2026??理쒖떊 LLM/Agent ?쇰Ц怨?湲곗닠 ?몃젋?쒕? ?먮룞?쇰줈 議곗궗?섍퀬, ?꾩옱 ?꾨줈?앺듃???곸슜 媛?ν븳 ?щ?瑜??섏쭛?섏뿬 ?ㅽ뻾 怨꾪쉷???쒖븞?⑸땲??

## 二쇱슂 湲곕뒫

### 1截뤴깵 理쒖떊 ?쇰Ц ?먮룞 ?섏쭛
- **ArXiv 寃??*: 2026??諛쒗몴??Agent/LLM 愿???쇰Ц
- **?ㅼ썙??*: Multi-Agent, RAG, Tool-Use, ReAct, Chain-of-Thought, Self-Reflection, etc.
- **?꾪꽣留?*: ?몄슜?? 愿?⑥꽦, 援ы쁽 媛?μ꽦 湲곗?

### 2截뤴깵 湲곗닠 ?몃젋??遺꾩꽍
- **GitHub Trending**: ?멸린 Agent ?꾨젅?꾩썙??(LangGraph, AutoGPT, CrewAI, etc.)
- **Hugging Face**: 理쒖떊 紐⑤뜽 諛??곕え
- **Anthropic Blog**: Claude 愿??理쒖떊 湲곕뒫 (Extended Thinking, Tool Use 媛쒖꽑 ??
- **LangChain Blog**: 2026???낅뜲?댄듃 ?ы빆

### 3截뤴깵 ?곸슜 媛?μ꽦 ?됯?
```
媛?湲곗닠?????
- ?쒖씠?? Easy / Medium / Hard
- ?덉긽 ?④낵: ?뺥솗???μ긽, ?묐떟 ?띾룄 媛쒖꽑, 鍮꾩슜 ?덇컧 ??
- 援ы쁽 ?쒓컙: 1??/ 1二?/ 1媛쒖썡
- ?꾩슂 由ъ냼?? API, 紐⑤뜽, ?명봽??
```

### 4截뤴깵 ?ㅽ뻾 怨꾪쉷 ?앹꽦
- ?④퀎蹂?援ы쁽 濡쒕뱶留?
- 肄붾뱶 ?덉떆 諛?李멸퀬 ?먮즺
- ?깅뒫 吏??痢≪젙 諛⑸쾿

---

## ?ъ슜 諛⑸쾿

### Case 1: ?뱀젙 二쇱젣 議곗궗
```bash
/research-agent-tech "RAG ?뺥솗???μ긽"
```

**異쒕젰 ?덉떆:**
```markdown
# ?뵮 RAG ?뺥솗???μ긽 湲곗닠 議곗궗 (2026??1??湲곗?)

## ?뱞 愿???쇰Ц Top 5

### 1. Self-RAG: Learning to Retrieve, Generate, and Critique (2024)
- **?듭떖 ?꾩씠?붿뼱**: Retrieval-Generate-Critique ?ъ씠?대줈 ?섍컖 媛먯냼
- **?곸슜 媛?μ꽦**: 狩먥춴狩먥춴狩?(?꾩옱 OG-RAG??吏곸젒 ?곸슜 媛??
- **?덉긽 ?④낵**: Context Precision +15-25%
- **援ы쁽 ?쒖씠??*: Medium (3-5??

**?꾩옱 ?꾨줈?앺듃 ?곸슜 諛⑹븞:**
```python
# src/ontology/self_rag.py (?좉퇋 ?앹꽦)
class SelfRAG:
    def retrieve_and_critique(self, query: str):
        # 1. 珥덇린 寃??
        docs = self.retriever.retrieve(query, top_k=10)

        # 2. 媛?臾몄꽌?????愿?⑥꽦 ?됯? (Self-Reflection)
        scored_docs = []
        for doc in docs:
            relevance_score = self.critique_relevance(query, doc)
            if relevance_score > 0.7:  # ?꾧퀎媛?
                scored_docs.append((doc, relevance_score))

        # 3. ?곸쐞 臾몄꽌濡??듬? ?앹꽦
        answer = self.generate_with_critique(query, scored_docs)

        # 4. ?듬? 寃利?(Hallucination Check)
        is_grounded = self.verify_grounding(answer, scored_docs)

        return answer if is_grounded else "洹쇨굅 遺議?
```

**踰ㅼ튂留덊겕 寃곌낵 (?쇰Ц):**
- Context Precision: 0.63 ??0.81 (+29%)
- Faithfulness: 0.72 ??0.88 (+22%)

**?곸슜 ?곗꽑?쒖쐞**: ?뵦 High (利됱떆 ?곸슜 沅뚯옣)

---

### 2. Corrective RAG (CRAG) (2024)
- **?듭떖**: Retrieval ?덉쭏 ?됯? ??Web Search濡?蹂댁젙
- **?곸슜 媛?μ꽦**: 狩먥춴狩먥춴 (?몃? 寃??API ?꾩슂)
- **?덉긽 ?④낵**: Recall +20%, 理쒖떊 ?뺣낫 諛섏쁺
- **援ы쁽 ?쒖씠??*: Medium (5-7??

**?꾩옱 ?꾨줈?앺듃 ?곸슜 諛⑹븞:**
```python
# backend/routes/og_rag/search.py??異붽?
class CorrectiveRAG:
    def search_with_correction(self, query: str):
        # 1. ?대? 寃??(ChromaDB + Graph)
        internal_results = self.og_rag.retrieve(query, top_k=5)

        # 2. 寃???덉쭏 ?됯?
        quality_score = self.evaluate_retrieval_quality(internal_results)

        # 3. ?덉쭏????쑝硫??몃? 寃?됱쑝濡?蹂댁젙
        if quality_score < 0.6:
            # Tavily API ?먮뒗 Serper API ?ъ슜
            external_results = self.web_search(query)
            return self.merge_results(internal_results, external_results)

        return internal_results
```

**?곸슜 ?곗꽑?쒖쐞**: ?윞 Medium (踰뺣졊 ?뺣낫???대?濡?異⑸텇, ?먮????몃? 寃???좎슜)

---

### 3. HyDE (Hypothetical Document Embeddings) (2023)
- **?듭떖**: 吏덈Ц ???"媛???듬?"???꾨쿋?⑺븯??寃??
- **?곸슜 媛?μ꽦**: 狩먥춴狩먥춴狩?(肄붾뱶 10以?異붽?濡?媛??
- **?덉긽 ?④낵**: Semantic Search ?뺥솗??+10-15%
- **援ы쁽 ?쒖씠??*: Easy (1-2??

**?꾩옱 ?꾨줈?앺듃 ?곸슜 諛⑹븞:**
```python
# src/ontology/hybrid_retriever.py ?섏젙
class HybridRetriever:
    def retrieve_with_hyde(self, query: str, top_k: int = 5):
        # 1. 媛???듬? ?앹꽦 (LLM ?ъ슜)
        hypothetical_answer = self.llm.generate(
            f"??吏덈Ц??????꾨Ц媛 ?듬????묒꽦?섏꽭?? {query}"
        )

        # 2. 媛???듬??쇰줈 寃??(吏덈Ц蹂대떎 ?뺥솗)
        results = self.vector_store.similarity_search(
            hypothetical_answer,  # 吏덈Ц ????듬??쇰줈 寃??
            top_k=top_k
        )

        return results
```

**踰ㅼ튂留덊겕 寃곌낵 (?쇰Ц):**
- nDCG@10: 0.52 ??0.61 (+17%)
- MRR: 0.43 ??0.51 (+19%)

**?곸슜 ?곗꽑?쒖쐞**: ?뵦 High (援ы쁽 ?ъ? + ?④낵 ?뺤떎)

---

## ?썱截?利됱떆 ?곸슜 媛?ν븳 湲곗닠 Top 3

### 1. Adaptive RAG (?곗꽑?쒖쐞: ?뵦)
**What**: 吏덈Ц ?좏삎???곕씪 寃???꾨왂 ?먮룞 ?좏깮

**Why**:
- Simple 吏덈Ц ??Vector Search留?
- Complex 吏덈Ц ??Graph Traversal 異붽?
- Multi-hop 吏덈Ц ??Iterative Retrieval

**How**:
```python
# src/ontology/adaptive_retriever.py (?대? 議댁옱!)
# ?꾩옱: ?섎룞?쇰줈 mode ?좏깮
result = og_rag.retrieve(query, mode=RetrievalMode.HYBRID)

# 媛쒖꽑: ?먮룞?쇰줈 理쒖쟻 紐⑤뱶 ?좏깮
result = adaptive_rag.auto_retrieve(query)  # 吏덈Ц 遺꾩꽍 ???먮룞 ?좏깮
```

**Impact**:
- 媛꾨떒??吏덈Ц: ?묐떟 ?띾룄 50% 媛쒖꽑
- 蹂듭옟??吏덈Ц: ?뺥솗??15-20% 媛쒖꽑
- API 鍮꾩슜: ?됯퇏 30% ?덇컧

**ROI**: 狩먥춴狩먥춴狩?(?몃젰 ?鍮??④낵 理쒓퀬)

---

### 2. Prompt Caching (Claude 3.5 Sonnet 吏??
**What**: 湲??쒖뒪???꾨＼?꾪듃瑜?罹먯떛?섏뿬 ?좏겙 鍮꾩슜 ?덇컧

**Why**:
- ?꾩옱: 留??붿껌留덈떎 2,000 ?좏겙 ?꾨＼?꾪듃 ?꾩넚
- 媛쒖꽑 ?? 泥??붿껌留??꾩넚, ?댄썑 90% ?좎씤

**How**:
```python
# ?꾩옱 (backend/routes/og_rag/generation.py)
response = client.chat.completions.create(
    model="claude-3-5-sonnet-20241022",
    messages=[
        {"role": "system", "content": system_prompt},  # 留ㅻ쾲 ?꾩넚
        {"role": "user", "content": user_query}
    ]
)

# 媛쒖꽑 (Prompt Caching ?곸슜)
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": system_prompt,
            "cache_control": {"type": "ephemeral"}  # 5遺꾧컙 罹먯떛
        }
    ],
    messages=[{"role": "user", "content": user_query}]
)
```

**Impact**:
- Input ?좏겙 鍮꾩슜: 90% ?덇컧 (1,000 ?붿껌 ??$3 ??$0.3)
- ?묐떟 ?띾룄: 5-10% 媛쒖꽑 (?꾨＼?꾪듃 泥섎━ ?쒓컙 媛먯냼)

**ROI**: 狩먥춴狩먥춴狩?(10遺??묒뾽?쇰줈 鍮꾩슜 90% ?덇컧)

---

### 3. Tool Use with Structured Output (Claude 3.5)
**What**: JSON ?ㅽ궎留?媛뺤젣濡?援ъ“?붾맂 ?묐떟 蹂댁옣

**Why**:
- ?꾩옱: LLM ?묐떟 ?뚯떛 ?ㅽ뙣 媛??
- 媛쒖꽑: 100% ?좊ː 媛?ν븳 JSON ?묐떟

**How**:
```python
# src/multi_excel/agents/synthesizer.py 媛쒖꽑
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    tools=[{
        "name": "analyze_financial_data",
        "description": "?щТ?쒗몴 ?곗씠??遺꾩꽍",
        "input_schema": {
            "type": "object",
            "properties": {
                "留ㅼ텧??: {"type": "number"},
                "?곸뾽?댁씡": {"type": "number"},
                "?곸뾽?댁씡瑜?: {"type": "number"}
            },
            "required": ["留ㅼ텧??, "?곸뾽?댁씡", "?곸뾽?댁씡瑜?]
        }
    }],
    tool_choice={"type": "tool", "name": "analyze_financial_data"}
)

# ?묐떟? ??긽 ?ㅽ궎留덈? ?곕쫫 (?뚯떛 ?먮윭 0%)
```

**Impact**:
- ?뚯떛 ?먮윭?? 5-10% ??0%
- ?곗씠???덉쭏: 95% ??100%
- ?붾쾭源??쒓컙: 50% 媛먯냼

**ROI**: 狩먥춴狩먥춴 (?덉젙???ш쾶 ?μ긽)

---

## ?뱤 湲곗닠 鍮꾧탳 留ㅽ듃由?뒪

| 湲곗닠 | ?쒖씠??| ?④낵 | 援ы쁽 ?쒓컙 | 鍮꾩슜 | ?곗꽑?쒖쐞 |
|------|--------|------|-----------|------|----------|
| Self-RAG | Medium | 狩먥춴狩먥춴狩?| 3-5??| 臾대즺 | ?뵦 High |
| HyDE | Easy | 狩먥춴狩먥춴 | 1-2??| +10% ?좏겙 | ?뵦 High |
| Prompt Caching | Easy | 狩먥춴狩먥춴狩?| 10遺?| -90% | ?뵦 High |
| CRAG | Medium | 狩먥춴狩?| 5-7??| +30% (?몃? API) | ?윞 Medium |
| Structured Output | Easy | 狩먥춴狩먥춴 | 2-3??| ?숈씪 | ?뵦 High |
| Multi-Agent | Hard | 狩먥춴狩먥춴狩?| 2二?| +50% | ?윟 Low |

---

## ?렞 ?대쾲 二??ㅽ뻾 怨꾪쉷

### Day 1-2: Prompt Caching ?곸슜
```bash
1. backend/routes/og_rag/generation.py ?섏젙
2. 罹먯떛 ?④낵 痢≪젙 (鍮꾩슜 ?덇컧??
3. ?ㅻⅨ ?붾뱶?ъ씤?몄뿉???곸슜
```

### Day 3-4: HyDE 援ы쁽
```bash
1. src/ontology/hybrid_retriever.py??HyDE 異붽?
2. A/B ?뚯뒪??(湲곗〈 vs HyDE)
3. nDCG, MRR 吏??痢≪젙
```

### Day 5: Self-RAG ?꾨줈?좏???
```bash
1. src/ontology/self_rag.py ?앹꽦
2. 媛꾨떒??愿?⑥꽦 ?됯? 濡쒖쭅 援ы쁽
3. 10媛?吏덈Ц?쇰줈 ?뚯뒪??
```

---

## ?뱴 李멸퀬 ?먮즺

### ?쇰Ц
- Self-RAG: https://arxiv.org/abs/2310.11511
- CRAG: https://arxiv.org/abs/2401.15884
- HyDE: https://arxiv.org/abs/2212.10496

### 援ы쁽 ?덉젣
- LangChain Self-RAG: https://github.com/langchain-ai/langgraph/tree/main/examples/rag/self-rag
- Anthropic Prompt Caching: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching

### 踰ㅼ튂留덊겕 ?곗씠?곗뀑
- BEIR: Information Retrieval 踰ㅼ튂留덊겕
- RAGAS: RAG ?쒖뒪???됯?
```

---

## 異쒕젰 ?뺤떇

### 1. 湲곗닠 紐⑸줉 (Table)
| 湲곗닠紐?| ?쇰Ц/異쒖쿂 | ?곸슜 媛?μ꽦 | ?덉긽 ?④낵 | 援ы쁽 ?쒖씠??|
|--------|-----------|-------------|-----------|-------------|
| ... | ... | 狩먥춴狩먥춴狩?| +30% ?뺥솗??| Easy |

### 2. ?곸꽭 遺꾩꽍 (媛?湲곗닠蹂?
- ?듭떖 ?꾩씠?붿뼱
- ?꾩옱 ?꾨줈?앺듃 ?곸슜 諛⑹븞 (肄붾뱶 ?덉떆)
- 踰ㅼ튂留덊겕 寃곌낵
- ?덉긽 ROI

### 3. ?ㅽ뻾 怨꾪쉷
- ?④린 (1二?: 利됱떆 ?곸슜 媛??
- 以묎린 (1媛쒖썡): ?꾨줈?좏???媛쒕컻
- ?κ린 (3媛쒖썡): ?洹쒕え 由ы뙥?좊쭅

---

## 寃???뚯뒪

1. **ArXiv**: cs.AI, cs.CL, cs.LG 移댄뀒怨좊━
2. **Papers with Code**: State-of-the-art 異붿쟻
3. **GitHub Trending**: ?멸린 ??μ냼
4. **Anthropic Docs**: Claude 理쒖떊 湲곕뒫
5. **LangChain Blog**: ?꾨젅?꾩썙???낅뜲?댄듃
6. **Hugging Face**: 紐⑤뜽 諛??곗씠?곗뀑

---

## ?먮룞???듭뀡

### Weekly Digest
```bash
# 留ㅼ＜ ?붿슂???먮룞 ?ㅽ뻾
/research-agent-tech --mode weekly-digest

# 異쒕젰: 吏?쒖＜ 諛쒗몴??二쇱슂 ?쇰Ц 5媛?+ ?곸슜 媛?μ꽦 ?됯?
```

### Compare with Existing
```bash
# ?꾩옱 援ы쁽怨?鍮꾧탳
/research-agent-tech "RAG ?뺥솗?? --compare-current

# 異쒕젰: ?꾩옱 ?깅뒫 vs ?쇰Ц 踰ㅼ튂留덊겕 vs 媛쒖꽑 ???덉긽 ?깅뒫
```

---

## ?깃났 ?щ? (?덉떆)

### Case: Prompt Caching ?꾩엯 (2026-01)
- **Before**: ??API 鍮꾩슜 $500
- **After**: ??API 鍮꾩슜 $120
- **?덇컧**: $380/??(76%)
- **援ы쁽 ?쒓컙**: 30遺?

### Case: HyDE ?곸슜 (2026-01)
- **Before**: Context Precision 0.62
- **After**: Context Precision 0.74 (+19%)
- **援ы쁽 ?쒓컙**: 2??

---

## 二쇱쓽?ы빆

1. **?쇰Ц ???ㅼ쟾**: 踰ㅼ튂留덊겕 ?깅뒫???ㅼ젣 ?꾨줈?앺듃?먯꽌 ?ы쁽?섏? ?딆쓣 ???덉쓬
2. **鍮꾩슜 怨좊젮**: ?쇰? 湲곗닠? API ?몄텧 利앷? ??鍮꾩슜 利앷?
3. **?먯쭊???꾩엯**: ??踰덉뿉 ?щ윭 湲곗닠 ?꾩엯 ???붾쾭源??대젮?
4. **A/B ?뚯뒪???꾩닔**: ?ㅼ젣 ?곗씠?곕줈 ?④낵 寃利?

---

## 硫뷀듃由??뺤쓽

- **Context Precision**: 寃?됰맂 臾몄꽌 以?愿??臾몄꽌 鍮꾩쑉
- **Context Recall**: 愿??臾몄꽌 以?寃?됰맂 鍮꾩쑉
- **Faithfulness**: ?듬???寃??寃곌낵??洹쇨굅???뺣룄
- **Answer Relevancy**: ?듬???吏덈Ц怨?愿?⑤맂 ?뺣룄
- **nDCG**: Normalized Discounted Cumulative Gain
- **MRR**: Mean Reciprocal Rank
