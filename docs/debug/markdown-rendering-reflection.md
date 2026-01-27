d# Markdown 렌더링 이슈 Reflection

이 문서는 `/Users/syoh/.cursor/plans/markdown_렌더링_이슈_해결_24d50d70.plan.md`의 각 To-do를 수행한 뒤,
단계별로 잘한 점과 실수를 기록해 재발을 방지하기 위한 문서입니다.

## To-do 1: 새 브랜치 생성 및 현재 상태 확인

### 잘한 점

- `fix/markdown-rendering` 브랜치를 분리해 변경 범위를 명확히 함.
- 작업 시작 전에 상태를 확인하여 기본 흐름을 정리함.

### 실수/개선점

- 없음.

---

## To-do 2: Typography 플러그인 설치 및 설정

### 잘한 점

- `@tailwindcss/typography` 설치로 `prose` 클래스가 실제로 동작하도록 복구함.
- `tailwind.config.js`에 플러그인을 추가해 렌더링 스타일 누락 문제를 해소함.
- Tailwind v4 환경에서 `@plugin "@tailwindcss/typography";`를 `globals.css`에 추가해 플러그인이 실제로 로드되도록 보강함.
- Tailwind v4의 설정 인식 범위를 확실히 하기 위해 `@config "../../tailwind.config.js";`를 추가하고 플러그인 선언을 `@import` 앞에 배치함.

### 실수/개선점

- 없음.

---

## To-do 3: remark-rehype 설정 검증

### 잘한 점

- `src/lib/markdown.ts`의 파이프라인을 점검해 HTML 변환이 정상임을 확인함.
- 별도 수정 없이도 `remark → rehype → stringify` 흐름이 적절함을 검증함.

### 실수/개선점

- 없음.

---

## To-do 4: MarkdownContent 컴포넌트 확인

### 잘한 점

- `MarkdownContent`에서 `prose` 클래스 사용이 의도대로 되어 있음을 확인함.
- 추가 변경 없이도 Typography 플러그인으로 해결 가능한 구조임을 검증함.

### 실수/개선점

- 없음.

---

## To-do 5: 로컬 빌드 및 HTML 검증

### 잘한 점

- 로컬 빌드 후 `out/questions/frontend-react/index.html`에서 `<h1>`, `<h2>`, `<ul>` 등이 생성된 것을 확인함.
- 빌드 중 샌드박스 제한으로 실패한 원인을 파악하고 정상 권한으로 재시도하여 검증을 완료함.

### 실수/개선점

- 빌드 과정에서 `tsconfig.json`이 자동 수정되는 것을 사전에 예상하지 못함. 앞으로는 Next.js 빌드의 자동 변경 가능성을 염두에 두고 변경 로그를 더 빠르게 확인해야 함.

---

## To-do 6: ESLint 및 Prettier 적용

### 잘한 점

- 변경 후 `npm run format` 및 `npm run lint`를 반복 실행해 품질 기준을 유지함.
- 포맷 및 린트 실패 없이 정리됨을 확인함.

### 실수/개선점

- 없음.

---

## To-do 7: 최종 검증 및 총체적 정리

### 잘한 점

- 렌더링 문제의 원인이 스타일 누락임을 확인하고, 최소 변경으로 해결함.
- 빌드 산출물에서 실제 HTML 구조를 확인해 문제 재현/해결 과정을 끝까지 검증함.

### 실수/개선점

- 없음.

---

## 총체적 정리

- 문제 원인: `prose` 클래스를 사용하지만 Tailwind Typography 플러그인이 설치되지 않아 Markdown 스타일이 적용되지 않음.
- 해결 방법: `@tailwindcss/typography` 설치 및 Tailwind 플러그인 등록.
- 검증: `out/questions/frontend-react/index.html`에서 Markdown이 HTML로 변환되어 렌더링되는 것을 확인.
- 후속 주의점: `next build`가 `tsconfig.json`을 자동 수정할 수 있으므로 빌드 로그와 변경사항을 항상 확인할 것.
