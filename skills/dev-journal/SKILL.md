---
name: dev-journal
description: Generate and manage development journal logs.
---

# Development Journal Skill

?먮룞?쇰줈 媛쒕컻 ?쇱?瑜??앹꽦?섍퀬 愿由ы븯???꾨줈?앺듃 ?덉뒪?좊━, ?섏궗寃곗젙, 臾몄젣 ?닿껐 怨쇱젙??泥닿퀎?곸쑝濡?臾몄꽌?뷀빀?덈떎.

## Purpose

媛쒕컻 怨쇱젙?먯꽌 諛쒖깮?섎뒗 紐⑤뱺 以묒슂???뺣낫瑜??먮룞?쇰줈 異붿쟻?섍퀬 臾몄꽌?뷀븯??
- ?좉퇋 ????⑤낫??媛?랁솕
- ?섏궗寃곗젙 洹쇨굅 異붿쟻
- 諛섎났?곸씤 臾몄젣 ?닿껐 ?쒓컙 ?⑥텞
- ?꾨줈?앺듃 ?뚭퀬 ?먮즺 ?뺣낫
- 吏???먯떎 諛⑹?

## When to Use

?ㅼ쓬 ?곹솴?먯꽌 ???ㅽ궗???ъ슜?섏꽭??
- ?ㅽ봽由고듃 醫낅즺 ??二쇨컙 ?붿빟 ?꾩슂
- 以묒슂???꾪궎?띿쿂 寃곗젙 湲곕줉
- 踰꾧렇 ?섏젙 怨쇱젙 臾몄꽌??
- ?붽컙 媛쒕컻 由ы룷???앹꽦
- ?꾨줈?앺듃 ?몄닔?멸퀎 以鍮?

## ?쇱? ?좏삎

### 1. Daily Log (?쇱씪 濡쒓렇)

Git commit 湲곕컲 ?먮룞 ?앹꽦:

```markdown
# 2026-01-29 媛쒕컻 ?쇱?

## 而ㅻ컠 ?붿빟 (3 commits)

### [feat] Add user authentication (#42)
**Time:** 10:23 AM
**Author:** ?띻만??
**Files:** `src/auth/`, `tests/auth/`

- JWT 湲곕컲 ?몄쬆 援ы쁽
- Access token + Refresh token ?⑦꽩
- 80% ?뚯뒪??而ㅻ쾭由ъ? ?ъ꽦

**Related Issue:** #38
**Review:** https://github.com/org/repo/pull/42

---

### [fix] Resolve race condition in cache (#43)
**Time:** 2:15 PM
**Author:** 源泥좎닔
**Files:** `src/cache/redis.ts`

**Problem:** ?숈떆 ?붿껌 ??罹먯떆 miss濡?DB ??쬆
**Solution:** Redis distributed lock ?곸슜
**Impact:** DB 荑쇰━ 95% 媛먯냼

**Related Issue:** #40
**Before/After:**
- Before: 1000 req/s ??800 DB queries/s
- After: 1000 req/s ??50 DB queries/s

---

### [refactor] Simplify error handling (#44)
**Time:** 4:45 PM
**Author:** ?댁쁺??
**Files:** `src/utils/errors.ts`

- Result<T, E> ????꾩엯
- try-catch ?쒓굅 (30媛???5媛?
- ?먮윭 ?몃뱾留??쇨????뺣낫

---

## ?섏궗寃곗젙 (Decisions Made)

### ?몄쬆 諛⑹떇: JWT vs Session
**Decision:** JWT (stateless)
**Rationale:**
- 留덉씠?щ줈?쒕퉬???꾪궎?띿쿂???곹빀
- ?섑룊 ?뺤옣 ?⑹씠
- 紐⑤컮????吏???꾩슂

**Trade-offs:**
- ??Stateless, ?뺤옣 ?⑹씠
- ??Token revocation ?대젮? ??Refresh token?쇰줈 ?꾪솕

**Alternatives Considered:**
- Session (rejected: Redis ?섏〈?? ?뺤옣 蹂듭옟)
- OAuth 2.0 (deferred: ?꾩옱 遺덊븘??

**ADR:** docs/adr/0042-jwt-authentication.md

---

## 臾몄젣 ?닿껐 (Problems Solved)

### 1. Race Condition in Cache
**Impact:** HIGH
**Root Cause:** ?숈떆 ?붿껌 ??罹먯떆 miss 諛쒖깮 ??紐⑤몢 DB 議고쉶
**Solution:** Redis SETNX濡?distributed lock
**Time to Resolve:** 3 hours
**Learnings:** 遺꾩궛 ?섍꼍?먯꽌 罹먯떆 warming ?꾨왂 ?꾩슂

---

## 踰꾧렇 (Bugs Fixed)

| ID | ?쒕ぉ | ?ш컖??| ?뚯슂 ?쒓컙 | 而ㅻ컠 |
|----|------|--------|----------|------|
| #40 | Cache race condition | HIGH | 3h | abc1234 |
| #41 | User creation 500 error | MEDIUM | 1h | def5678 |

---

## ?뚯뒪??(Tests Written)

- **Unit Tests:** 12 added (auth module)
- **Integration Tests:** 3 added (API endpoints)
- **E2E Tests:** 1 added (login flow)
- **Coverage:** 78% ??82% (+4%)

---

## 硫뷀듃由?(Metrics)

- **Commits:** 3
- **Lines Added:** +450
- **Lines Deleted:** -230
- **Files Changed:** 15
- **Pull Requests:** 2 merged, 1 pending
- **Code Review Comments:** 8 resolved

---

## ?댁씪 ????(Tomorrow)

- [ ] Refresh token rotation 援ы쁽
- [ ] ?몄쬆 E2E ?뚯뒪??異붽?
- [ ] ?깅뒫 ?뚯뒪??(1000 req/s)
- [ ] 臾몄꽌 ?낅뜲?댄듃 (API 紐낆꽭??
```

### 2. Weekly Summary (二쇨컙 ?붿빟)

```markdown
# 二쇨컙 ?붿빟 (2026-01-23 ~ 2026-01-29)

## Highlights

### ?? 二쇱슂 ?깃낵
1. **?ъ슜???몄쬆 ?쒖뒪???꾨즺** (Issue #38)
   - JWT 湲곕컲 ?몄쬆 援ы쁽
   - 80%+ ?뚯뒪??而ㅻ쾭由ъ?
   - 蹂댁븞 由щ럭 ?듦낵

2. **?깅뒫 媛쒖꽑** (Issue #40)
   - 罹먯떆 race condition ?닿껐
   - DB 荑쇰━ 95% 媛먯냼
   - ?묐떟 ?쒓컙 200ms ??50ms

3. **肄붾뱶 ?덉쭏 ?μ긽**
   - Result ????꾩엯?쇰줈 ?먮윭 泥섎━ 媛쒖꽑
   - ESLint ?꾨컲 30媛???0媛?

### ?뱤 ?듦퀎

| 吏??| ?대쾲 二?| 吏??二?| 蹂??|
|------|---------|---------|------|
| Commits | 18 | 12 | +50% |
| PRs Merged | 6 | 4 | +50% |
| Issues Closed | 8 | 5 | +60% |
| Test Coverage | 82% | 78% | +4% |
| Code Review Time | 3h avg | 5h avg | -40% |

### ?맀 踰꾧렇 ?닿껐

- **HIGH:** 1媛?(cache race condition)
- **MEDIUM:** 3媛?
- **LOW:** 2媛?
- **Total MTTR:** 2.5 hours (?됯퇏)

### ?렞 紐⑺몴 ?ъ꽦瑜?

- ???몄쬆 ?쒖뒪??援ы쁽 (100%)
- ???깅뒫 理쒖쟻??(100%)
- ??API 臾몄꽌??(60% - 吏꾪뻾 以?
- ??紐⑤컮??SDK ?쒖옉 (0% - ?ㅼ쓬 二?

---

## Architecture Decisions

### ADR-042: JWT Authentication
**Status:** ??Accepted
**Date:** 2026-01-27
**Impact:** HIGH

**Context:** ?ъ슜???몄쬆 諛⑹떇 寃곗젙 ?꾩슂
**Decision:** JWT (stateless) 梨꾪깮
**Consequences:** ?뺤옣 ?⑹씠, token revocation ?대젮?
**Link:** docs/adr/0042-jwt-authentication.md

### ADR-043: Redis Distributed Lock
**Status:** ??Accepted
**Date:** 2026-01-29
**Impact:** MEDIUM

**Context:** 罹먯떆 race condition ?닿껐 ?꾩슂
**Decision:** Redis SETNX濡?distributed lock 援ы쁽
**Consequences:** 罹먯떆 ?쇨????뺣낫, Redis ?섏〈??利앷?
**Link:** docs/adr/0043-redis-distributed-lock.md

---

## Technical Debt

### 異붽???遺梨?
1. **Refresh token rotation 誘멸뎄??*
   - Priority: HIGH
   - Estimated: 2 days
   - Reason: ?쒓컙 遺議? ?곗꽑?쒖쐞 ??쓬

### ?닿껐??遺梨?
1. ??**Error handling 遺덉씪移?*
   - Result ????꾩엯?쇰줈 ?닿껐
   - 30媛?try-catch ??5媛?

---

## Learnings & Insights

### 諛곗슫 寃?
1. **遺꾩궛 ?섍꼍 罹먯떛**
   - ?⑥닚 罹먯떆??race condition 諛쒖깮
   - Distributed lock ?꾩닔
   - Cache warming ?꾨왂 ?꾩슂

2. **JWT 蹂댁븞**
   - Access token 吏㏐쾶 (15遺?
   - Refresh token rotation ?꾩슂
   - HttpOnly cookie 沅뚯옣

### 媛쒖꽑 ?ъ씤??
1. **肄붾뱶 由щ럭 ?쒓컙 ?⑥텞**
   - Before: 5h avg
   - After: 3h avg
   - How: PR ?ш린 ?쒗븳 (300 LOC), ?먮룞?붾맂 泥댄겕由ъ뒪??

2. **?뚯뒪??而ㅻ쾭由ъ? 利앷?**
   - 78% ??82%
   - TDD ?뚰겕?뚮줈???곸슜 ?④낵

---

## Risks & Issues

### ?뵶 HIGH Risk
- **Refresh token rotation 誘멸뎄??*
  - Impact: 蹂댁븞 痍⑥빟??
  - Mitigation: ?ㅼ쓬 二??곗꽑 泥섎━

### ?윞 MEDIUM Risk
- **API 臾몄꽌 誘몄셿??*
  - Impact: ?꾨줎?몄뿏??媛쒕컻 吏??媛??
  - Mitigation: ?대쾲 二?湲덉슂?쇨퉴吏 ?꾨즺

---

## Next Week Goals

1. **Refresh token rotation** (HIGH)
2. **API 臾몄꽌 ?꾩꽦** (MEDIUM)
3. **紐⑤컮??SDK ?쒖옉** (MEDIUM)
4. **E2E ?뚯뒪???뺣?** (LOW)

---

## Team Updates

- **?띻만??** ?몄쬆 ?쒖뒪??由щ뱶, ?ㅼ쓬 二?紐⑤컮??SDK ?쒖옉
- **源泥좎닔:** ?깅뒫 理쒖쟻???꾨즺, ?ㅼ쓬 二?罹먯떛 ?꾨왂 臾몄꽌??
- **?댁쁺??** 肄붾뱶 ?덉쭏 媛쒖꽑, ?ㅼ쓬 二?由ы뙥?좊쭅 怨꾩냽
```

### 3. Architecture Decision Record (ADR)

```markdown
# ADR-042: JWT 湲곕컲 ?몄쬆 梨꾪깮

**Status:** Accepted
**Date:** 2026-01-27
**Deciders:** ?띻만?? 源泥좎닔, ?댁쁺??
**Tags:** #authentication #security #architecture

---

## Context

?ъ슜???몄쬆 ?쒖뒪??援ы쁽???꾩슂?⑸땲?? ?꾩옱 ?쒖뒪??
- 紐⑤?由ъ떇 ??留덉씠?щ줈?쒕퉬???꾪솚 ?덉젙
- ??+ 紐⑤컮?????숈떆 吏???꾩슂
- ?ъ슜??5留?紐??덉긽 (6媛쒖썡 ??

**?붽뎄?ы빆:**
- Stateless (?섑룊 ?뺤옣 媛??
- CORS 吏??
- 紐⑤컮??移쒗솕??
- 蹂댁븞 ?쒖? 以??

---

## Decision

**JWT (JSON Web Token) 湲곕컲 ?몄쬆**??梨꾪깮?⑸땲??

**援ы쁽 諛⑹떇:**
```
Access Token (JWT):
- Expiry: 15 minutes
- Storage: Memory (React state)
- Claims: user_id, email, roles

Refresh Token:
- Expiry: 7 days
- Storage: HttpOnly cookie
- Purpose: Access token ?щ컻湲?

Token Rotation:
- Refresh ???덈줈??Refresh token 諛쒓툒 (誘멸뎄?? ?ㅼ쓬 二?異붽?)
```

---

## Consequences

### Positive

1. **?뺤옣??*
   - Stateless: ?쒕쾭 媛??몄뀡 怨듭쑀 遺덊븘??
   - ?섑룊 ?뺤옣 ?⑹씠

2. **留덉씠?щ줈?쒕퉬??移쒗솕??*
   - 媛??쒕퉬?ㅺ? JWT 寃利?媛??
   - API Gateway?먯꽌 以묒븰 寃利?媛??

3. **紐⑤컮??吏??*
   - Token 湲곕컲?대씪 ?ㅼ씠?곕툕 ?깆뿉 ?곹빀
   - Cookie ?섏〈???놁쓬

4. **CORS 媛꾨떒**
   - Authorization ?ㅻ뜑 ?ъ슜
   - Preflight ?붿껌 理쒖냼??

### Negative

1. **Token Revocation ?대젮?**
   - JWT??諛쒓툒 ??痍⑥냼 遺덇???
   - Mitigation: 吏㏃? expiry (15遺? + Refresh token

2. **Token ?ш린**
   - ?몄뀡 ID蹂대떎 ??(200-300 bytes)
   - 留??붿껌留덈떎 ?꾩넚
   - Impact: 臾댁떆 媛??(gzip ?곸슜 ??

3. **蹂댁븞 由ъ뒪??*
   - XSS 怨듦꺽 ??Access token ?덉랬 媛??
   - Mitigation: HttpOnly cookie??Refresh token ???

### Neutral

1. **異붽? 援ы쁽 ?꾩슂**
   - Refresh token rotation (?ㅼ쓬 二?
   - Token blacklist (optional, ?곗꽑?쒖쐞 ??쓬)

---

## Alternatives Considered

### 1. Session-based Authentication
**Pros:**
- ?쒕쾭?먯꽌 ?몄뀡 痍⑥냼 媛??
- 媛꾨떒??援ы쁽

**Cons:**
- Stateful: Redis/DB ?꾩슂
- ?섑룊 ?뺤옣 蹂듭옟
- 留덉씠?щ줈?쒕퉬?ㅼ뿉 遺?곹빀

**Decision:** ??Rejected

---

### 2. OAuth 2.0 (Authorization Code Flow)
**Pros:**
- ?쒖? ?꾨줈?좎퐳
- ?⑤뱶?뚰떚 濡쒓렇??吏??

**Cons:**
- ?꾩옱 遺덊븘??(?먯껜 ?몄쬆留?
- 援ы쁽 蹂듭옟???믪쓬
- 異붽? ?명봽???꾩슂 (Authorization Server)

**Decision:** ?몌툘 Deferred (?ν썑 ?뚯뀥 濡쒓렇??異붽? ???ш???

---

### 3. Opaque Token + Introspection
**Pros:**
- Token revocation 媛??
- Payload ?몄텧 ?놁쓬

**Cons:**
- 留??붿껌留덈떎 DB 議고쉶
- ?깅뒫 蹂묐ぉ 媛??

**Decision:** ??Rejected (Stateless ?붽뎄?ы빆 ?꾨같)

---

## Implementation Plan

### Phase 1: 湲곕낯 援ы쁽 (?꾨즺)
- [x] JWT 諛쒓툒 (Access + Refresh)
- [x] ?좏겙 寃利?誘몃뱾?⑥뼱
- [x] Login/Logout ?붾뱶?ъ씤??
- [x] 80%+ ?뚯뒪??而ㅻ쾭由ъ?

### Phase 2: 蹂댁븞 媛뺥솕 (?ㅼ쓬 二?
- [ ] Refresh token rotation
- [ ] Rate limiting (login endpoint)
- [ ] Brute-force 諛⑹뼱

### Phase 3: 紐⑤땲?곕쭅 (2二???
- [ ] Token 諛쒓툒/寃利?硫뷀듃由?
- [ ] ?ㅽ뙣 濡쒓렇 ?섏쭛
- [ ] ?뚮┝ ?ㅼ젙

---

## References

- [RFC 7519: JSON Web Token](https://tools.ietf.org/html/rfc7519)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [Internal Security Review](link-to-doc)
- [PR #42: JWT Implementation](https://github.com/org/repo/pull/42)

---

## Related ADRs

- ADR-038: API Gateway Architecture
- ADR-040: Microservices Communication
- ADR-043: Redis Distributed Lock (related: token blacklist 寃??

---

## Follow-up

- **2二???由щ럭:** Refresh token rotation ?④낵 痢≪젙
- **1媛쒖썡 ???뚭퀬:** 蹂댁븞 ?댁뒋 諛쒖깮 ?щ? ?뺤씤
- **3媛쒖썡 ???ы룊媛:** OAuth 2.0 ?꾩슂???ш???
```

### 4. Problem-Solution Log

```markdown
# 臾몄젣 ?닿껐 濡쒓렇

## 2026-01-29: Cache Race Condition

### 臾몄젣 (Problem)
**Severity:** HIGH
**Impact:** DB 荑쇰━ 10諛?利앷?, ?묐떟 ?쒓컙 5諛?利앷?
**Reporter:** 紐⑤땲?곕쭅 ?뚮┝ (Datadog)

**利앹긽:**
- ?숈떆 ?붿껌 1000 req/s ??DB 荑쇰━ 800 queries/s
- Expected: 50 queries/s (cache hit ratio 95%)
- ?쇳겕 ??꾩뿉 DB CPU 100%

**?ы쁽 議곌굔:**
```bash
# ?숈떆 ?붿껌 100媛?
ab -n 100 -c 100 http://localhost:8000/api/users/123
```

**?먮윭 濡쒓렇:**
```
[ERROR] Cache miss for key: user:123
[ERROR] Cache miss for key: user:123
[ERROR] Cache miss for key: user:123
... (?숈떆??100媛?諛쒖깮)
```

---

### 洹쇰낯 ?먯씤 (Root Cause)

**遺꾩꽍 怨쇱젙:**
1. 罹먯떆 濡쒖쭅 ?뺤씤 ??Cache-Aside ?⑦꽩 ?ъ슜
2. ?숈떆 ?붿껌 ??紐⑤몢 cache miss 諛쒖깮
3. 紐⑤몢 DB 議고쉶 ??紐⑤몢 罹먯떆 ???(race condition)

**Root Cause:**
```typescript
// 湲곗〈 肄붾뱶 (臾몄젣)
async function getUser(id: string): Promise<User> {
  // 1. 紐⑤몢 罹먯떆 ?뺤씤 ??miss
  const cached = await cache.get(`user:${id}`);
  if (cached) return cached;

  // 2. 紐⑤몢 DB 議고쉶 (?숈떆??100媛?荑쇰━!)
  const user = await db.users.findById(id);

  // 3. 紐⑤몢 罹먯떆 ???
  await cache.set(`user:${id}`, user, 3600);

  return user;
}
```

**Diagram:**
```
Request 1: [Cache Miss] ??[DB Query] ??[Cache Set]
Request 2: [Cache Miss] ??[DB Query] ??[Cache Set]  ???숈떆 諛쒖깮
Request 3: [Cache Miss] ??[DB Query] ??[Cache Set]
...
```

---

### ?닿껐 諛⑸쾿 (Solution)

**Approach:** Redis Distributed Lock (SETNX)

```typescript
// 媛쒖꽑??肄붾뱶
import Redis from 'ioredis';

const redis = new Redis();

async function getUser(id: string): Promise<User> {
  const cacheKey = `user:${id}`;
  const lockKey = `lock:${cacheKey}`;

  // 1. 罹먯떆 ?뺤씤
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  // 2. Lock ?띾뱷 ?쒕룄 (10珥?TTL)
  const lockAcquired = await redis.set(
    lockKey,
    'locked',
    'EX', 10,
    'NX'  // SET if Not eXists
  );

  if (lockAcquired) {
    try {
      // 3. Double-check cache (?ㅻⅨ ?꾨줈?몄뒪媛 ??ν뻽?????덉쓬)
      const cachedAgain = await cache.get(cacheKey);
      if (cachedAgain) return cachedAgain;

      // 4. DB 議고쉶 (lock ?띾뱷??1媛쒕쭔 ?ㅽ뻾)
      const user = await db.users.findById(id);

      // 5. 罹먯떆 ???
      await cache.set(cacheKey, user, 3600);

      return user;
    } finally {
      // 6. Lock ?댁젣
      await redis.del(lockKey);
    }
  } else {
    // 7. Lock ?湲?(?ㅻⅨ ?꾨줈?몄뒪媛 DB 議고쉶 以?
    await sleep(100);  // 100ms ?湲?
    return getUser(id);  // ?ъ떆??(?대쾲??罹먯떆 hit)
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

**媛쒖꽑 寃곌낵:**
```
Before:
  1000 req/s ??800 DB queries/s
  Response time: 200ms avg

After:
  1000 req/s ??50 DB queries/s (95% cache hit)
  Response time: 50ms avg

Improvement:
  - DB queries: -94%
  - Response time: -75%
```

---

### ?숈뒿 ?댁슜 (Learnings)

1. **Cache-Aside ?⑦꽩???쒓퀎**
   - 怨좏듃?섑뵿 ?섍꼍?먯꽌 race condition 諛쒖깮
   - Distributed lock ?꾩닔

2. **Distributed Lock 援ы쁽**
   - Redis SETNX ?ъ슜
   - TTL ?ㅼ젙?쇰줈 deadlock 諛⑹?
   - Double-check ?⑦꽩?쇰줈 遺덊븘?뷀븳 ?湲?諛⑹?

3. **紐⑤땲?곕쭅 以묒슂??*
   - 臾몄젣瑜?議곌린??諛쒓껄 (Datadog ?뚮┝)
   - 硫뷀듃由?異붿쟻?쇰줈 媛쒖꽑 ?④낵 痢≪젙

---

### 異붽? 媛쒖꽑 ?ы빆

1. **Cache Warming**
   - ?쒕쾭 ?쒖옉 ???멸린 ?곗씠??誘몃━ 罹먯떛
   - Cold start 臾몄젣 ?닿껐

2. **Lock 理쒖쟻??*
   - Redlock ?뚭퀬由ъ쬁 ?곸슜 (怨좉??⑹꽦)
   - Lock timeout ?쒕떇 (10珥???5珥?

3. **紐⑤땲?곕쭅 媛뺥솕**
   - Lock ?띾뱷 ?쒓컙 硫뷀듃由?異붽?
   - Lock ?湲??잛닔 異붿쟻

---

### 愿???먮즺

- **PR:** #43 - Add Redis distributed lock
- **ADR:** docs/adr/0043-redis-distributed-lock.md
- **Issue:** #40 - Cache race condition
- **Commit:** def5678 - Fix cache race condition

---

### ?쒓컙 ?뚯슂

- **遺꾩꽍:** 1 hour
- **援ы쁽:** 1.5 hours
- **?뚯뒪??** 0.5 hour
- **Total:** 3 hours
```

---

## ?먮룞 ?앹꽦 ?뚰겕?뚮줈??

### Git Commit 湲곕컲 ?쇱? ?앹꽦

```bash
# ?ㅻ뒛 而ㅻ컠?ㅻ줈 ?쇱? ?앹꽦
git log --since="today" --pretty=format:"%h|%an|%ad|%s" --date=format:"%H:%M" \
  | while IFS='|' read hash author time subject; do
    echo "### [$subject]"
    echo "**Time:** $time"
    echo "**Author:** $author"
    echo "**Commit:** $hash"
    echo ""
    # ?뚯씪 紐⑸줉
    git show --name-only --pretty="" $hash | head -5
    echo ""
  done > journal/$(date +%Y-%m-%d).md
```

### Claude Code濡??쇱? ?앹꽦

```bash
# ?쇱씪 濡쒓렇
/dev-journal --daily

# 二쇨컙 ?붿빟
/dev-journal --weekly

# ADR ?앹꽦
/dev-journal --adr "JWT Authentication"

# 臾몄젣 ?닿껐 濡쒓렇
/dev-journal --problem "Cache race condition"
```

---

## 異쒕젰 ?뺤떇

???ㅽ궗 ?ъ슜 ???ㅼ쓬 ?뺤떇?쇰줈 異쒕젰:

1. **Markdown ?뚯씪 ?앹꽦**
   - ?꾩튂: `docs/journal/YYYY-MM-DD.md`
   - Git???먮룞 而ㅻ컠 (optional)

2. **?붿빟 ?듦퀎**
   - 而ㅻ컠 ?? PR ?? ?댁뒋 ??
   - ?뚯뒪??而ㅻ쾭由ъ? 蹂??
   - 二쇱슂 蹂寃??ы빆

3. **?먮룞 ?쒓렇**
   - #bug, #feature, #refactor
   - #high-impact, #performance
   - #security, #architecture

---

## ?듯빀 湲곕뒫

### GitHub Integration

```yaml
# .github/workflows/dev-journal.yml
name: Daily Journal

on:
  schedule:
    - cron: '0 18 * * *'  # 留ㅼ씪 ???6??(KST)

jobs:
  generate-journal:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 100  # 理쒓렐 100 而ㅻ컠

      - name: Generate daily log
        run: |
          # ?ㅻ뒛 而ㅻ컠 ?섏쭛
          git log --since="today" --pretty=format:"%h|%an|%ad|%s" \
            > temp_commits.txt

          # Claude Code濡??쇱? ?앹꽦
          claude-code /dev-journal --daily --input temp_commits.txt

      - name: Commit journal
        run: |
          git config user.name "Journal Bot"
          git config user.email "bot@example.com"
          git add docs/journal/
          git commit -m "docs: Add daily journal $(date +%Y-%m-%d)"
          git push
```

### Slack ?뚮┝

```typescript
// 二쇨컙 ?붿빟??Slack???먮룞 ?꾩넚
import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_TOKEN);

async function sendWeeklySummary() {
  const summary = generateWeeklySummary();  // ?쇱? ?앹꽦

  await slack.chat.postMessage({
    channel: '#dev-updates',
    text: '?대쾲 二?媛쒕컻 ?붿빟',
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '?뱤 二쇨컙 媛쒕컻 ?붿빟' }
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: summary }
      }
    ]
  });
}
```

---

## 寃??& ?쒓렇

### ?쒓렇 湲곕컲 寃??

```bash
# ?뱀젙 ?쒓렇濡?寃??
/dev-journal --search "#authentication"

# ?щ윭 ?쒓렇
/dev-journal --search "#bug #high-impact"

# ?좎쭨 踰붿쐞
/dev-journal --search --from 2026-01-01 --to 2026-01-31
```

### ?꾨Ц 寃??

```bash
# ?ㅼ썙??寃??
/dev-journal --search "race condition"

# ?뱀젙 ?묒꽦??
/dev-journal --search --author "?띻만??

# ADR留?寃??
/dev-journal --search --type adr
```

---

## ?ъ슜 ?덉떆

### ?좉퇋 ????⑤낫??

```bash
# 理쒓렐 ????二쇱슂 寃곗젙 ?ы빆
/dev-journal --summary --last 30days --type adr

# 異쒕젰:
# ?뱥 Architecture Decisions (Last 30 Days)
#
# 1. ADR-042: JWT Authentication (Jan 27)
#    - JWT 湲곕컲 ?몄쬆 梨꾪깮
#    - Impact: HIGH
#
# 2. ADR-043: Redis Distributed Lock (Jan 29)
#    - 罹먯떆 race condition ?닿껐
#    - Impact: MEDIUM
#
# 3. ADR-041: GraphQL ??REST (Jan 25)
#    - GraphQL ?쒓굅, REST濡??⑥닚??
#    - Impact: HIGH
```

### ?꾨줈?앺듃 ?뚭퀬

```bash
# ?대쾲 ??紐⑤뱺 ?쒕룞 ?붿빟
/dev-journal --monthly --month 2026-01

# 異쒕젰:
# ?뱤 ?붽컙 由ы룷??(2026??1??
#
# ## Highlights
# - ?몄쬆 ?쒖뒪???꾨즺
# - ?깅뒫 95% 媛쒖꽑
# - 20媛?踰꾧렇 ?닿껐
#
# ## Metrics
# - 72 commits
# - 24 PRs merged
# - 32 issues closed
# - ?뚯뒪??而ㅻ쾭由ъ?: 78% ??85%
```

### ?몄닔?멸퀎

```bash
# ?꾨줈?앺듃 ?꾩껜 ?덉뒪?좊━ ?앹꽦
/dev-journal --export --output handover.md

# 異쒕젰:
# - 紐⑤뱺 ADR
# - 二쇱슂 踰꾧렇 ?닿껐 怨쇱젙
# - ?꾪궎?띿쿂 蹂寃??대젰
# - 誘명빐寃?湲곗닠 遺梨?
```

---

## ?ㅼ젙

### .clauderc ?ㅼ젙

```json
{
  "dev-journal": {
    "output_dir": "docs/journal",
    "auto_commit": true,
    "tags": {
      "enabled": true,
      "auto_detect": ["bug", "feature", "performance", "security"]
    },
    "slack": {
      "enabled": true,
      "channel": "#dev-updates",
      "weekly_summary": true
    },
    "templates": {
      "daily": "templates/daily-log.md",
      "weekly": "templates/weekly-summary.md",
      "adr": "templates/adr.md"
    }
  }
}
```

---

## 紐⑤쾾 ?щ?

1. **留ㅼ씪 ?묒꽦**
   - Git commit 湲곕컲 ?먮룞 ?앹꽦
   - ??곸뿉 ?섎（ ?붿빟 由щ럭

2. **二쇨컙 ?뚭퀬**
   - 留ㅼ＜ 湲덉슂??二쇨컙 ?붿빟 ?앹꽦
   - ?怨?怨듭쑀

3. **ADR ?꾩닔**
   - 以묒슂??寃곗젙? ADR ?묒꽦
   - 誘몃옒???섎? ?꾪븳 臾몄꽌

4. **?쒓렇 ?쒖슜**
   - 寃?됱쓣 ?꾪븳 ?쇨????쒓렇
   - #bug, #feature, #performance ??

5. **留곹겕 ?곌껐**
   - Issue, PR, Commit 留곹겕 ?ы븿
   - 留λ씫 異붿쟻 ?⑹씠
