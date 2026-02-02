---
name: frontend-codemap
description: Analyze frontend code and map UI structure.
---

# Frontend Codemap Skill

?꾨줎?몄뿏??肄붾뱶瑜?遺꾩꽍?섏뿬 **UI 援ъ“? 肄붾뱶瑜?留ㅽ븨??臾몄꽌**瑜??먮룞 ?앹꽦?⑸땲?? 媛쒕컻?먭? ?ㅽ겕由곗꺑 ?놁씠 "??而댄룷?뚰듃??? 遺遺?怨좎퀜以??쇨퀬 吏곴??곸쑝濡??붿껌?????덇쾶 ?⑸땲??

## Purpose

**湲곗〈 諛⑹떇??臾몄젣:**
```
媛쒕컻?? "?ш린 ?ㅽ겕由곗꺑 李띿뼱??.. ??踰꾪듉 ?꾩튂 諛붽퓭以?
Claude: "?대뼡 ?뚯씪???대뒓 肄붾뱶?멸???"
媛쒕컻?? "??.. ?좉퉸 肄붾뱶 李얠븘蹂쇨쾶..."
```

**?덈줈??諛⑹떇:**
```
媛쒕컻?? "UserProfile???대찓???쒖떆 遺遺??됱긽 蹂寃쏀빐以?
Claude: "ProfileHeader.tsx:30 ?섏젙?⑸땲?? (利됱떆 ?댄빐)
```

---

## When to Use

?ㅼ쓬 ?곹솴?먯꽌 ?ъ슜?섏꽭??
- ?꾨줈?앺듃 ?⑤낫?????꾨줎?몄뿏??援ъ“ ?뚯븙
- UI ?섏젙 ?붿껌 ???뺥솗??肄붾뱶 ?꾩튂 ?앸퀎
- 而댄룷?뚰듃 由ы뙥?좊쭅 怨꾪쉷 ?섎┰
- ?붿옄?대꼫/湲고쉷?먯? ?묒뾽 ??UI-肄붾뱶 ?곌껐
- ?좉퇋 ????⑤낫???먮즺

---

## Output Format

### 1. ?섏씠吏蹂?Component Map

```markdown
# Frontend Component Map - User Profile

## ?뱞 `/profile` ?섏씠吏

### ?붾㈃ 援ъ“
```
?뚢???????????????????????????????????????????
??UserProfilePage                         ??
???뱛 src/pages/UserProfile.tsx            ??
??                                        ??
?? ?뚢?????????????????????????????????????먥봻
?? ???렓 ProfileHeader                   ?귘봻
?? ???뱛 components/ProfileHeader.tsx     ?귘봻
?? ??                                    ?귘봻
?? ?? ?벜 Avatar        (line 20)        ?귘봻
?? ?? ?뫀 User Name     (line 25)        ?귘봻
?? ?? ?벁 Email         (line 30)        ?귘봻
?? ?? ?숋툘  Settings Btn (line 35)        ?귘봻
?? ?붴?????????????????????????????????????섃봻
??                                        ??
?? ?뚢?????????????????????????????????????먥봻
?? ???뱷 ProfileForm                     ?귘봻
?? ???뱛 components/ProfileForm.tsx       ?귘봻
?? ??                                    ?귘봻
?? ?? ?륅툘  Name Input    (line 45)       ?귘봻
?? ?? ?됵툘  Email Input   (line 55)       ?귘봻
?? ?? ?벑 Phone Input   (line 65)       ?귘봻
?? ?? ?뮶 Save Button   (line 80)       ?귘봻
?? ?붴?????????????????????????????????????섃봻
??                                        ??
?? ?뚢?????????????????????????????????????먥봻
?? ???뱤 ActivityLog                     ?귘봻
?? ???뱛 components/ActivityLog.tsx       ?귘봻
?? ??                                    ?귘봻
?? ?? ?뱟 Activity List (line 30-60)    ?귘봻
?? ?? ?뵿 Load More Btn (line 70)       ?귘봻
?? ?붴?????????????????????????????????????섃봻
?붴???????????????????????????????????????????
```

---

## ?벀 而댄룷?뚰듃 ?곸꽭

### ProfileHeader
**?뚯씪**: `src/components/ProfileHeader.tsx`
**?쇱씤**: 15-45

**UI ?붿냼:**
1. **?꾨컮? ?대?吏**
   - 肄붾뱶: `<Avatar src={user.avatar} size="large" />` (line 20)
   - Props: `avatar: string, size: 'small' | 'medium' | 'large'`
   - ?ㅽ??? `className="avatar-container"`

2. **?ъ슜???대쫫**
   - 肄붾뱶: `<h1 className="user-name">{user.name}</h1>` (line 25)
   - 議곌굔: `{user.verified && <VerifiedBadge />}` (line 26)
   - ?ㅽ??? `text-2xl font-bold text-gray-900`

3. **?대찓??二쇱냼**
   - 肄붾뱶: `<p className="user-email">{user.email}</p>` (line 30)
   - ?ㅽ??? `text-sm text-gray-500`
   - 蹂寃?異붿쿇: ?됱긽?????고븯寃?(gray-400)

4. **?ㅼ젙 踰꾪듉**
   - 肄붾뱶: `<Button onClick={handleSettings}>Settings</Button>` (line 35)
   - ?몃뱾?? `handleSettings()` (line 50)
   - ?대룞: `/settings` ?섏씠吏濡??쇱슦??

**?섏젙 ?덉떆:**
- "ProfileHeader???대찓???됱긽 蹂寃쏀빐以? ??line 30 ?섏젙
- "?꾨컮? ?ш린 ?ㅼ썙以? ??line 20 `size="large"` ??`size="xl"`
- "?ㅼ젙 踰꾪듉 ?꾩튂 ?ㅻⅨ履쎌쑝濡? ??line 35 ?ㅽ???異붽?

---

### ProfileForm
**?뚯씪**: `src/components/ProfileForm.tsx`
**?쇱씤**: 20-90

**UI ?붿냼:**
1. **?대쫫 ?낅젰 ?꾨뱶**
   - 肄붾뱶: `<Input name="name" value={formData.name} onChange={handleChange} />` (line 45)
   - 寃利? `required, minLength: 2` (line 100)
   - ?먮윭 硫붿떆吏: `{errors.name && <Error>{errors.name}</Error>}` (line 47)

2. **?대찓???낅젰 ?꾨뱶**
   - 肄붾뱶: `<Input type="email" name="email" value={formData.email} />` (line 55)
   - 寃利? `email validation, unique` (line 105)
   - ?쎄린 ?꾩슜: `disabled={user.emailVerified}` (line 56)

3. **?꾪솕踰덊샇 ?낅젰**
   - 肄붾뱶: `<PhoneInput name="phone" value={formData.phone} />` (line 65)
   - ?щ㎎: `(010) 1234-5678` (PhoneInput 而댄룷?뚰듃媛 ?먮룞 泥섎━)
   - ?좏깮 ?ы빆: `required={false}`

4. **???踰꾪듉**
   - 肄붾뱶: `<Button type="submit" loading={isSubmitting}>Save</Button>` (line 80)
   - ?몃뱾?? `handleSubmit()` (line 110)
   - 濡쒕뵫 ?곹깭: `isSubmitting` (line 15)

**API ?몄텧:**
- ?붾뱶?ъ씤?? `PUT /api/users/{userId}` (line 115)
- ?깃났 ?? Toast ?뚮┝ + ?꾨줈???덈줈怨좎묠
- ?ㅽ뙣 ?? ?먮윭 硫붿떆吏 ?쒖떆

**?섏젙 ?덉떆:**
- "?대찓???꾨뱶 ??긽 ?섏젙 媛?ν븯寃? ??line 56 `disabled` ?쒓굅
- "???踰꾪듉 ?됱긽 ?뚮??됱쑝濡? ??line 80 `variant="primary"` 異붽?
- "?꾪솕踰덊샇 ?꾩닔濡?蹂寃? ??line 65 `required={true}`

---

### ActivityLog
**?뚯씪**: `src/components/ActivityLog.tsx`
**?쇱씤**: 15-80

**UI ?붿냼:**
1. **?쒕룞 紐⑸줉**
   - 肄붾뱶:
     ```tsx
     {activities.map(activity => (
       <ActivityItem key={activity.id} activity={activity} />
     ))}
     ``` (line 30-35)
   - ?쒖떆 ??ぉ: ?≪뀡, ?쒓컙, ?곸꽭 ?뺣낫
   - 理쒕? ?쒖떆: 20媛?(?섏씠吏?ㅼ씠??

2. **??蹂닿린 踰꾪듉**
   - 肄붾뱶: `<Button onClick={loadMore}>Load More</Button>` (line 70)
   - ?몃뱾?? `loadMore()` (line 45)
   - 議곌굔: `{hasMore && ...}` (line 69)

**?곗씠???먮쫫:**
- API: `GET /api/users/{userId}/activities?page={page}&limit=20`
- ?곹깭: `useState<Activity[]>([])` (line 18)
- 臾댄븳 ?ㅽ겕濡?媛?? `useInfiniteScroll` hook 異붽? 寃??

**?섏젙 ?덉떆:**
- "?쒕룞 紐⑸줉 30媛쒕줈 ?섎젮以? ??line 20 `limit: 30`
- "??蹂닿린 踰꾪듉 ?놁븷怨?臾댄븳 ?ㅽ겕濡ㅻ줈" ??`useInfiniteScroll` hook ?곸슜
- "理쒓렐 ?쒕룞 癒쇱? ?쒖떆" ??API??`sort=desc` 異붽?

---

## ?뿺截??쇱슦??援ъ“

```
/                    ??HomePage          (pages/Home.tsx)
/profile             ??UserProfilePage   (pages/UserProfile.tsx)
/profile/edit        ??EditProfilePage   (pages/EditProfile.tsx)
/settings            ??SettingsPage      (pages/Settings.tsx)
/login               ??LoginPage         (pages/Login.tsx)
```

---

## ?렓 怨듯넻 而댄룷?뚰듃

### Button
**?뚯씪**: `src/components/common/Button.tsx`
**Props**:
- `variant`: 'primary' | 'secondary' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `loading`: boolean
- `disabled`: boolean

**?ъ슜 ?꾩튂**:
- ProfileHeader: Settings 踰꾪듉 (line 35)
- ProfileForm: Save 踰꾪듉 (line 80)
- ActivityLog: Load More 踰꾪듉 (line 70)

### Input
**?뚯씪**: `src/components/common/Input.tsx`
**Props**:
- `type`: 'text' | 'email' | 'password' | 'number'
- `name`: string
- `value`: string
- `onChange`: (e: ChangeEvent) => void
- `error`: string | undefined

**?ъ슜 ?꾩튂**:
- ProfileForm: Name ?낅젰 (line 45)
- ProfileForm: Email ?낅젰 (line 55)
- LoginPage: Email/Password (login form)

---

## ?벑 ?곹깭 愿由?

### UserProfile ?섏씠吏 ?곹깭
```typescript
// UserProfile.tsx
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// ProfileForm.tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});
const [errors, setErrors] = useState<FormErrors>({});
const [isSubmitting, setIsSubmitting] = useState(false);

// ActivityLog.tsx
const [activities, setActivities] = useState<Activity[]>([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
```

---

## ?봽 ?곗씠???먮쫫

```
UserProfilePage (遺紐?
    ??(user data)
ProfileHeader (?먯떇)    ProfileForm (?먯떇)    ActivityLog (?먯떇)
    ??display              ??edit                ??display
   User                   API Call              API Call
                         ??(PUT)               ??(GET)
                    /api/users/{id}      /api/users/{id}/activities
```

---

## ?렞 ?섏젙 ?붿껌 ?덉떆

### ??醫뗭? ?붿껌 (codemap ?쒖슜)
```
??"?ш린 踰꾪듉 ?됯퉼 諛붽퓭以? (?대뼡 踰꾪듉?)
??"ProfileForm??Save 踰꾪듉 ?됱긽 ?뚮??됱쑝濡?蹂寃쏀빐以?
   ??src/components/ProfileForm.tsx:80 ?섏젙

??"?대찓??遺遺?醫 ?ш쾶 ?댁쨾"
??"ProfileHeader???대찓???쒖떆(line 30) ?고듃 ?ш린 ?ㅼ썙以?
   ??text-sm ??text-base 蹂寃?

??"??蹂닿린 踰꾪듉 ?놁븷以?
??"ActivityLog??Load More 踰꾪듉(line 70) ?쒓굅?섍퀬 臾댄븳 ?ㅽ겕濡ㅻ줈 蹂寃?
   ??useInfiniteScroll hook ?곸슜
```

---

## ?썱截??ъ슜 諛⑸쾿

### 1. ?꾩껜 ?꾨줎?몄뿏??遺꾩꽍
```bash
/frontend-codemap

# 異쒕젰:
# - docs/frontend/COMPONENT_MAP.md (?꾩껜 援ъ“)
# - docs/frontend/pages/profile.md (?섏씠吏蹂??곸꽭)
# - docs/frontend/components/common.md (怨듯넻 而댄룷?뚰듃)
```

### 2. ?뱀젙 ?섏씠吏留?遺꾩꽍
```bash
/frontend-codemap src/pages/UserProfile.tsx

# 異쒕젰:
# - docs/frontend/pages/user-profile.md
```

### 3. 而댄룷?뚰듃 ?몃━ ?쒓컖??
```bash
/frontend-codemap --tree

# 異쒕젰:
# UserProfilePage
# ?쒋?? ProfileHeader
# ??  ?쒋?? Avatar
# ??  ?쒋?? UserName
# ??  ?붴?? SettingsButton
# ?쒋?? ProfileForm
# ??  ?쒋?? NameInput
# ??  ?쒋?? EmailInput
# ??  ?붴?? SaveButton
# ?붴?? ActivityLog
#     ?붴?? ActivityList
```

---

## ?뵇 遺꾩꽍 湲곕뒫

### ?먮룞?쇰줈 異붿텧?섎뒗 ?뺣낫

1. **而댄룷?뚰듃 怨꾩링 援ъ“**
   - 遺紐??먯떇 愿怨?
   - Props ?꾨떖 ?먮쫫
   - ?뚮뜑留?議곌굔

2. **UI ?붿냼 留ㅽ븨**
   - JSX ?붿냼 ???붾㈃ ?쒖떆 ?꾩튂
   - CSS ?대옒?????ㅽ???
   - 議곌굔遺 ?뚮뜑留?

3. **?곹깭 愿由?*
   - useState, useReducer
   - Context API
   - Redux/Zustand (?덈뒗 寃쎌슦)

4. **?대깽???몃뱾??*
   - onClick, onChange ??
   - ?⑥닔 ?꾩튂 (line number)
   - API ?몄텧 ?먮쫫

5. **API ?곕룞**
   - ?붾뱶?ъ씤??URL
   - Request/Response ???
   - ?먮윭 泥섎━

---

## ?뱤 吏???꾨젅?꾩썙??

| ?꾨젅?꾩썙??| 吏??| ?뱀쭠 |
|-----------|------|------|
| **React** | ??Full | JSX ?뚯떛, Hooks 異붿텧 |
| **Next.js** | ??Full | ?섏씠吏 ?쇱슦?? getServerSideProps |
| **Vue** | ??Full | SFC ?뚯떛, Composition API |
| **Angular** | ??Partial | Component + Template 遺꾩꽍 |
| **Svelte** | ??Full | Reactive statements 異붿텧 |

---

## ?뮕 怨좉툒 湲곕뒫

### Storybook ?곕룞
```bash
/frontend-codemap --with-storybook

# Storybook stories? ?곌껐:
# - Button 而댄룷?뚰듃 ??stories/Button.stories.tsx
# - ?쒓컖???뚯뒪??留곹겕 ?ы븿
```

### ?붿옄???쒖뒪??留ㅽ븨
```bash
/frontend-codemap --design-system

# ?붿옄???좏겙 異붿텧:
# - Color palette ?ъ슜 ?꾪솴
# - Typography ?ъ슜
# - Spacing system
```

### ?묎렐??A11y) 泥댄겕
```bash
/frontend-codemap --a11y

# ?묎렐???댁뒋 ?앸퀎:
# - ?꾨씫??alt ?띿뒪??
# - ARIA labels 遺議?
# - ?ㅻ낫???ㅻ퉬寃뚯씠??臾몄젣
```

---

## ?봽 ?먮룞 ?낅뜲?댄듃

### Git Hook ?ㅼ젙
```bash
# .git/hooks/post-merge
#!/bin/bash
claude-code /frontend-codemap --auto-update

# 留?pull ???먮룞?쇰줈 codemap ?낅뜲?댄듃
```

### CI/CD ?듯빀
```yaml
# .github/workflows/update-codemap.yml
name: Update Frontend Codemap

on:
  push:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.vue'

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Update codemap
        run: claude-code /frontend-codemap
      - name: Commit changes
        run: |
          git add docs/frontend/
          git commit -m "docs: update frontend codemap"
          git push
```

---

## ?뱷 ?ㅼ젣 ?ъ슜 ?덉떆

### Before (鍮꾪슚?⑥쟻)
```
媛쒕컻?? [?ㅽ겕由곗꺑 泥⑤?] "?ш린 踰꾪듉 ?ㅻⅨ履쎌쑝濡???꺼以?
Claude: "?대뼡 ?뚯씪?멸???"
媛쒕컻?? "?좉퉸... 李얠븘蹂쇨쾶??.."
媛쒕컻?? "src/components/ProfileForm.tsx 媛숈???.."
Claude: "紐?踰덉㎏ 以꾩씤媛??"
媛쒕컻?? "??.. ?ㅼ떆 蹂쇨쾶??.."
```

### After (?⑥쑉??
```
媛쒕컻?? "ProfileForm??Save 踰꾪듉(line 80) ?ㅻⅨ履??뺣젹濡?蹂寃?
Claude: "ProfileForm.tsx:80 ?섏젙?⑸땲??
         [利됱떆 肄붾뱶 ?섏젙]

媛쒕컻?? "ProfileHeader ?대찓???됱긽??gray-400?쇰줈"
Claude: "ProfileHeader.tsx:30 text-gray-500 ??text-gray-400"
         [利됱떆 ?섏젙]
```

---

## ?렓 ?쒓컖???듭뀡

### Mermaid ?ㅼ씠?닿렇??
```bash
/frontend-codemap --mermaid

# 異쒕젰: Mermaid ?뺤떇 而댄룷?뚰듃 ?몃━
graph TD
    A[UserProfilePage] --> B[ProfileHeader]
    A --> C[ProfileForm]
    A --> D[ActivityLog]
    B --> E[Avatar]
    B --> F[UserName]
    C --> G[NameInput]
    C --> H[EmailInput]
```

### ASCII Art
```bash
/frontend-codemap --ascii

# 異쒕젰: ?곕??먯뿉??諛붾줈 蹂닿린 醫뗭? ?뺤떇
UserProfilePage
?쒋? ProfileHeader
?? ?쒋? Avatar
?? ?붴? UserName
?쒋? ProfileForm
?? ?쒋? NameInput
?? ?붴? EmailInput
?붴? ActivityLog
```

---

## ?? ?ㅽ뻾 濡쒖쭅

### 1. ?꾨줎?몄뿏??肄붾뱶 ?섏쭛
```typescript
// 紐⑤뱺 而댄룷?뚰듃 ?뚯씪 ?먯깋
const components = glob.sync('src/**/*.{tsx,jsx,vue}');
```

### 2. AST ?뚯떛
```typescript
// TypeScript/JavaScript AST ?뚯떛
import { parse } from '@typescript-eslint/parser';

const ast = parse(code, {
  ecmaFeatures: { jsx: true }
});
```

### 3. 而댄룷?뚰듃 ?뺣낫 異붿텧
```typescript
interface ComponentInfo {
  name: string;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  props: PropInfo[];
  state: StateInfo[];
  jsxElements: JSXElement[];
  eventHandlers: EventHandler[];
  apiCalls: APICall[];
  children: ComponentInfo[];
}
```

### 4. UI 留ㅽ븨 ?앹꽦
```typescript
// JSX ?붿냼 ??UI ?ㅻ챸
<Button onClick={handleSave}>Save</Button>
??
"???踰꾪듉 (line 80)"
- ?대┃ ?? handleSave() ?ㅽ뻾 (line 110)
- API: PUT /api/users/{id}
```

### 5. Markdown 臾몄꽌 ?앹꽦
```markdown
?앹꽦 ?꾩튂: docs/frontend/COMPONENT_MAP.md
?먮룞 ?낅뜲?댄듃: Git hook ?먮뒗 CI/CD
```

---

## ??泥댄겕由ъ뒪??

?꾨줎?몄뿏??codemap ?앹꽦 ??

- [ ] 紐⑤뱺 ?섏씠吏 而댄룷?뚰듃 留ㅽ븨??
- [ ] 怨듯넻 而댄룷?뚰듃 臾몄꽌?붾맖
- [ ] UI ?붿냼 ??肄붾뱶 ?쇱씤 留ㅽ븨 ?뺥솗
- [ ] ?대깽???몃뱾???꾩튂 ?쒖떆??
- [ ] API ?몄텧 ?붾뱶?ъ씤??紐낆떆??
- [ ] Props/State ????뺤쓽??
- [ ] 議곌굔遺 ?뚮뜑留??ㅻ챸??

---

## ?뱴 李멸퀬 ?먮즺

- [React Component Tree](https://reactjs.org/docs/thinking-in-react.html)
- [Storybook Documentation](https://storybook.js.org/)
- [Component-Driven Development](https://www.componentdriven.org/)

---

---

## ?뵩 ?ㅼ젣 援ы쁽 (Implementation)

### AST Parser (TypeScript/JavaScript)

```typescript
// ast-parser.ts
import * as ts from 'typescript';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { readFileSync } from 'fs';
import { glob } from 'glob';

interface ComponentInfo {
  name: string;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  props: PropInfo[];
  state: StateInfo[];
  jsxElements: JSXElementInfo[];
  eventHandlers: EventHandlerInfo[];
  apiCalls: APICallInfo[];
  children: string[];
}

interface JSXElementInfo {
  type: string;  // 'div', 'button', 'Avatar', etc.
  line: number;
  text?: string;  // Inner text if available
  props: Record<string, any>;
  className?: string;
}

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  line: number;
}

interface StateInfo {
  name: string;
  type: string;
  initialValue: any;
  line: number;
}

interface EventHandlerInfo {
  name: string;
  event: string;  // 'onClick', 'onChange', etc.
  line: number;
  targetLine: number;  // Line where handler is defined
}

interface APICallInfo {
  method: string;  // 'GET', 'POST', etc.
  endpoint: string;
  line: number;
}

/**
 * Parse React/TypeScript component file
 */
export function parseComponent(filePath: string): ComponentInfo {
  const code = readFileSync(filePath, 'utf-8');
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const componentInfo: ComponentInfo = {
    name: '',
    filePath,
    lineStart: 0,
    lineEnd: 0,
    props: [],
    state: [],
    jsxElements: [],
    eventHandlers: [],
    apiCalls: [],
    children: []
  };

  traverse(ast, {
    // Extract component name
    FunctionDeclaration(path) {
      if (isReactComponent(path)) {
        componentInfo.name = path.node.id?.name || '';
        componentInfo.lineStart = path.node.loc?.start.line || 0;
        componentInfo.lineEnd = path.node.loc?.end.line || 0;
      }
    },

    // Extract JSX elements
    JSXElement(path) {
      const element = path.node;
      const opening = element.openingElement;
      const tagName = getJSXElementName(opening.name);

      const jsxInfo: JSXElementInfo = {
        type: tagName,
        line: opening.loc?.start.line || 0,
        props: {},
        text: getJSXText(element)
      };

      // Extract props
      opening.attributes.forEach(attr => {
        if (attr.type === 'JSXAttribute') {
          const name = attr.name.name as string;
          jsxInfo.props[name] = getAttributeValue(attr.value);

          // Extract className
          if (name === 'className') {
            jsxInfo.className = getAttributeValue(attr.value);
          }

          // Extract event handlers
          if (name.startsWith('on')) {
            const handler = extractEventHandler(attr, path);
            if (handler) {
              componentInfo.eventHandlers.push(handler);
            }
          }
        }
      });

      componentInfo.jsxElements.push(jsxInfo);
    },

    // Extract useState hooks
    CallExpression(path) {
      if (path.node.callee.type === 'Identifier' &&
          path.node.callee.name === 'useState') {
        const state = extractStateInfo(path);
        if (state) componentInfo.state.push(state);
      }

      // Extract API calls (fetch, axios)
      if (isAPICall(path)) {
        const apiCall = extractAPICall(path);
        if (apiCall) componentInfo.apiCalls.push(apiCall);
      }
    },

    // Extract props (TypeScript interface)
    TSInterfaceDeclaration(path) {
      if (path.node.id.name.endsWith('Props')) {
        const props = extractPropsFromInterface(path);
        componentInfo.props.push(...props);
      }
    }
  });

  return componentInfo;
}

function isReactComponent(path: any): boolean {
  // Check if function returns JSX
  const hasJSXReturn = path.traverse({
    ReturnStatement(returnPath: any) {
      return returnPath.node.argument?.type.startsWith('JSX');
    }
  });
  return hasJSXReturn;
}

function getJSXElementName(name: any): string {
  if (name.type === 'JSXIdentifier') {
    return name.name;
  }
  if (name.type === 'JSXMemberExpression') {
    return `${getJSXElementName(name.object)}.${name.property.name}`;
  }
  return 'Unknown';
}

function getJSXText(element: any): string | undefined {
  if (element.children.length === 1 &&
      element.children[0].type === 'JSXText') {
    return element.children[0].value.trim();
  }
  return undefined;
}

function getAttributeValue(value: any): any {
  if (!value) return true;
  if (value.type === 'StringLiteral') return value.value;
  if (value.type === 'JSXExpressionContainer') {
    if (value.expression.type === 'StringLiteral') {
      return value.expression.value;
    }
    return '[expression]';
  }
  return undefined;
}

function extractEventHandler(attr: any, path: any): EventHandlerInfo | null {
  const handlerName = attr.name.name as string;
  const value = attr.value;

  if (value?.type === 'JSXExpressionContainer') {
    const expression = value.expression;

    if (expression.type === 'Identifier') {
      // onClick={handleClick}
      return {
        name: expression.name,
        event: handlerName,
        line: attr.loc.start.line,
        targetLine: findFunctionDefinition(expression.name, path)
      };
    }

    if (expression.type === 'ArrowFunctionExpression') {
      // onClick={() => ...}
      return {
        name: 'inline',
        event: handlerName,
        line: attr.loc.start.line,
        targetLine: attr.loc.start.line
      };
    }
  }

  return null;
}

function findFunctionDefinition(name: string, path: any): number {
  let line = 0;
  path.scope.traverse(path.scope.block, {
    FunctionDeclaration(funcPath: any) {
      if (funcPath.node.id?.name === name) {
        line = funcPath.node.loc.start.line;
      }
    },
    VariableDeclarator(varPath: any) {
      if (varPath.node.id.name === name &&
          varPath.node.init?.type === 'ArrowFunctionExpression') {
        line = varPath.node.loc.start.line;
      }
    }
  });
  return line;
}

function extractStateInfo(path: any): StateInfo | null {
  const parent = path.parent;
  if (parent.type === 'VariableDeclarator') {
    const id = parent.id;
    if (id.type === 'ArrayPattern' && id.elements.length >= 1) {
      const stateName = id.elements[0]?.name;
      const initialValue = path.node.arguments[0];

      return {
        name: stateName,
        type: inferType(initialValue),
        initialValue: getInitialValue(initialValue),
        line: path.node.loc.start.line
      };
    }
  }
  return null;
}

function extractPropsFromInterface(path: any): PropInfo[] {
  const props: PropInfo[] = [];

  path.node.body.body.forEach((member: any) => {
    if (member.type === 'TSPropertySignature') {
      props.push({
        name: member.key.name,
        type: getTSType(member.typeAnnotation),
        required: !member.optional,
        line: member.loc.start.line
      });
    }
  });

  return props;
}

function isAPICall(path: any): boolean {
  const callee = path.node.callee;

  // fetch('/api/...')
  if (callee.type === 'Identifier' && callee.name === 'fetch') {
    return true;
  }

  // axios.get('/api/...')
  if (callee.type === 'MemberExpression') {
    const object = callee.object;
    if (object.type === 'Identifier' && object.name === 'axios') {
      return true;
    }
  }

  return false;
}

function extractAPICall(path: any): APICallInfo | null {
  const callee = path.node.callee;
  const args = path.node.arguments;

  if (args.length === 0) return null;

  let method = 'GET';
  let endpoint = '';

  // fetch(url, { method: 'POST' })
  if (callee.name === 'fetch') {
    endpoint = getStringValue(args[0]);
    if (args[1]?.type === 'ObjectExpression') {
      const methodProp = args[1].properties.find(
        (p: any) => p.key.name === 'method'
      );
      if (methodProp) {
        method = getStringValue(methodProp.value);
      }
    }
  }

  // axios.get(url) or axios.post(url)
  if (callee.type === 'MemberExpression') {
    method = callee.property.name.toUpperCase();
    endpoint = getStringValue(args[0]);
  }

  return {
    method,
    endpoint,
    line: path.node.loc.start.line
  };
}

function inferType(node: any): string {
  if (!node) return 'unknown';
  if (node.type === 'StringLiteral') return 'string';
  if (node.type === 'NumericLiteral') return 'number';
  if (node.type === 'BooleanLiteral') return 'boolean';
  if (node.type === 'ArrayExpression') return 'array';
  if (node.type === 'ObjectExpression') return 'object';
  return 'unknown';
}

function getInitialValue(node: any): any {
  if (!node) return undefined;
  if (node.type === 'StringLiteral') return node.value;
  if (node.type === 'NumericLiteral') return node.value;
  if (node.type === 'BooleanLiteral') return node.value;
  if (node.type === 'ArrayExpression') return '[]';
  if (node.type === 'ObjectExpression') return '{}';
  return undefined;
}

function getTSType(typeAnnotation: any): string {
  if (!typeAnnotation) return 'any';
  const type = typeAnnotation.typeAnnotation;
  if (type.type === 'TSStringKeyword') return 'string';
  if (type.type === 'TSNumberKeyword') return 'number';
  if (type.type === 'TSBooleanKeyword') return 'boolean';
  if (type.type === 'TSArrayType') return `${getTSType(type.elementType)}[]`;
  return 'unknown';
}

function getStringValue(node: any): string {
  if (node.type === 'StringLiteral') return node.value;
  if (node.type === 'TemplateLiteral') {
    return node.quasis.map((q: any) => q.value.raw).join('${...}');
  }
  return '';
}

/**
 * Generate component map markdown
 */
export function generateComponentMap(components: ComponentInfo[]): string {
  let markdown = '# Frontend Component Map\n\n';

  components.forEach(comp => {
    markdown += `## ${comp.name}\n`;
    markdown += `**File**: \`${comp.filePath}:${comp.lineStart}-${comp.lineEnd}\`\n\n`;

    // Props
    if (comp.props.length > 0) {
      markdown += '**Props**:\n';
      comp.props.forEach(prop => {
        const required = prop.required ? '??Required' : '??Optional';
        markdown += `- \`${prop.name}\`: ${prop.type} (${required}) - line ${prop.line}\n`;
      });
      markdown += '\n';
    }

    // State
    if (comp.state.length > 0) {
      markdown += '**State**:\n';
      comp.state.forEach(state => {
        markdown += `- \`${state.name}\`: ${state.type} = ${state.initialValue} (line ${state.line})\n`;
      });
      markdown += '\n';
    }

    // UI Elements
    if (comp.jsxElements.length > 0) {
      markdown += '**UI Elements**:\n';
      comp.jsxElements.forEach((el, idx) => {
        markdown += `${idx + 1}. **${el.type}** (line ${el.line})\n`;
        if (el.text) {
          markdown += `   - Text: "${el.text}"\n`;
        }
        if (el.className) {
          markdown += `   - Class: \`${el.className}\`\n`;
        }
        if (Object.keys(el.props).length > 0) {
          markdown += `   - Props: ${JSON.stringify(el.props)}\n`;
        }
      });
      markdown += '\n';
    }

    // Event Handlers
    if (comp.eventHandlers.length > 0) {
      markdown += '**Event Handlers**:\n';
      comp.eventHandlers.forEach(handler => {
        markdown += `- \`${handler.event}\` ??\`${handler.name}()\` (line ${handler.targetLine})\n`;
      });
      markdown += '\n';
    }

    // API Calls
    if (comp.apiCalls.length > 0) {
      markdown += '**API Calls**:\n';
      comp.apiCalls.forEach(api => {
        markdown += `- \`${api.method} ${api.endpoint}\` (line ${api.line})\n`;
      });
      markdown += '\n';
    }

    markdown += '---\n\n';
  });

  return markdown;
}

/**
 * CLI Command
 */
export async function analyzeFrontend(pattern: string = 'src/**/*.{tsx,jsx}'): Promise<void> {
  console.log('?뵇 Analyzing frontend components...\n');

  const files = await glob(pattern);
  console.log(`Found ${files.length} component files\n`);

  const components: ComponentInfo[] = [];

  for (const file of files) {
    try {
      const component = parseComponent(file);
      if (component.name) {
        components.push(component);
        console.log(`??${component.name} (${file})`);
      }
    } catch (error) {
      console.error(`??Failed to parse ${file}:`, error.message);
    }
  }

  // Generate markdown
  const markdown = generateComponentMap(components);

  // Write to file
  const fs = require('fs');
  const outputPath = 'docs/frontend/COMPONENT_MAP.md';
  fs.mkdirSync('docs/frontend', { recursive: true });
  fs.writeFileSync(outputPath, markdown);

  console.log(`\n?뱞 Component map generated: ${outputPath}`);
  console.log(`?뱤 Total components: ${components.length}`);
}

// Usage
if (require.main === module) {
  const pattern = process.argv[2] || 'src/**/*.{tsx,jsx}';
  analyzeFrontend(pattern);
}
```

### Vue SFC Parser

```typescript
// vue-parser.ts
import { parse } from '@vue/compiler-sfc';
import { readFileSync } from 'fs';

export function parseVueComponent(filePath: string): ComponentInfo {
  const code = readFileSync(filePath, 'utf-8');
  const { descriptor } = parse(code);

  const componentInfo: ComponentInfo = {
    name: extractComponentName(descriptor),
    filePath,
    lineStart: 0,
    lineEnd: 0,
    props: [],
    state: [],
    jsxElements: [],
    eventHandlers: [],
    apiCalls: [],
    children: []
  };

  // Parse template
  if (descriptor.template) {
    const templateAST = parseVueTemplate(descriptor.template.content);
    componentInfo.jsxElements = extractVueElements(templateAST);
  }

  // Parse script (Composition API)
  if (descriptor.script || descriptor.scriptSetup) {
    const script = descriptor.scriptSetup || descriptor.script;
    parseVueScript(script.content, componentInfo);
  }

  return componentInfo;
}

function extractComponentName(descriptor: any): string {
  // Extract from script or use filename
  return descriptor.scriptSetup?.setup?.name || 'Component';
}

function parseVueTemplate(template: string): any {
  // Parse Vue template to AST
  // Implementation here...
}

function extractVueElements(ast: any): JSXElementInfo[] {
  // Extract v-bind, v-on, etc.
  // Implementation here...
}

function parseVueScript(script: string, componentInfo: ComponentInfo): void {
  // Parse Composition API (ref, reactive, computed)
  // Implementation here...
}
```

### Package.json

```json
{
  "name": "frontend-codemap",
  "version": "1.0.0",
  "description": "Generate UI-to-code mapping for frontend projects",
  "main": "dist/index.js",
  "bin": {
    "frontend-codemap": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "analyze": "ts-node src/ast-parser.ts"
  },
  "dependencies": {
    "@babel/parser": "^7.23.0",
    "@babel/traverse": "^7.23.0",
    "@vue/compiler-sfc": "^3.4.0",
    "typescript": "^5.3.0",
    "glob": "^10.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0"
  }
}
```

---

**踰꾩쟾**: 2.0 (援ы쁽 異붽?)
**?묒꽦??*: 2026-01-29
**理쒖쥌 ?섏젙**: 2026-01-29 (AST ?뚯꽌 援ы쁽 ?꾨즺)
