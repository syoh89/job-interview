## 배경/목표

- Figma에서 정의한 개인 TIL용 디자인 시스템을 코드로 옮겨,
  - 마크다운만 작성해도 일관된 UI(레이아웃, 타이포그래피, 컬러)가 적용되도록 하고
  - 라이트/다크 테마까지 점진적으로 확장할 수 있는 기반을 만든다.
- 이 과정 전체를 설계(plan)와 회고(reflection)로 분리해 `docs/feature`에 남긴다.

## 요구사항 정리

- **작성 경험**
  - 사용자는 오직 markdown만 작성한다.
  - frontmatter와 본문 구조만 신경 쓰면, 나머지 스타일은 디자인 시스템이 책임진다.
- **디자인 일관성**
  - 페이지 레이아웃, 카드/패널, 타이포그래피, 코드 블록, 인라인 코드, 블록 인용 등 공통 요소는 모두 토큰 기반으로 통일한다.
  - 개인용이므로 수정/삭제 버튼 등 관리용 UI는 기본 뷰에서 노출하지 않는다.
- **테마**
  - 1차: light 테마를 안정적으로 적용.
  - 2차: dark 테마 토큰 설계 및 구조만 잡고, 토글 UI는 이후 별도 기능으로 분리한다.

## 설계 개요

### 토큰 계층 구조

- **Primitive 토큰**
  - 색상: brand, neutral(gray 계열), accent, code 배경 등.
  - 타이포: 본문/헤딩/코드 폰트 패밀리, 크기, line-height.
  - Radius/spacing: 카드, 태그, 패널에 공통 적용할 radius/간격.
- **Semantic 토큰**
  - 배경: `bg-surface`, `bg-surface-muted`, `bg-surface-elevated`
  - 텍스트: `text-primary`, `text-muted`
  - 액션: `accent`, `accent-soft`
  - 경계: `border-subtle`
  - 코드: `code-bg`

### 구현 전략(hybrid)

- 1차: Tailwind `theme.extend`에 semantic 토큰을 정의하고, 컴포넌트/레이아웃/타이포그래피에서 이 토큰을 사용한다.
- 2차: 핵심 semantic 토큰 값을 CSS 변수(`:root`, `[data-theme="dark"]`)로 추출한 뒤 Tailwind에서 참조하는 하이브리드 구조로 옮길 수 있도록 여지를 남긴다.

## 단계별 구현 계획

### 1단계: 토큰 스켈레톤 & 레이아웃 테마

- Tailwind `theme.extend`에 아래 항목을 추가한다.
  - `colors`: `surface`, `surface-muted`, `surface-elevated`, `text-primary`, `text-muted`, `accent`, `accent-soft`, `border-subtle`, `code-bg`
  - `fontFamily`: `body`, `heading`, `mono`
  - `borderRadius`: `card`, `tag`
- `globals.css`:
  - `body`에는 색상을 직접 지정하지 않고, 폰트 패밀리 정도만 base 레벨에서 설정한다.
  - 링크 색상은 `accent` 토큰을 사용하도록 정리한다.
- `layout.tsx`:
  - `body` 클래스에 `bg-surface text-text-primary` 등을 사용해 페이지 전역 배경/텍스트를 토큰 기반으로 설정한다.
- **검증**
  - 홈/질문 목록/공부 목록/프로필 페이지에서 배경/텍스트/링크의 일관성을 눈으로 확인한다.

### 2단계: Markdown 타이포그래피 정비

- Tailwind Typography 플러그인에 `prose-til` variant를 정의한다.
  - 제목(`h1~h3`)은 `fontFamily.heading`을 사용하고, 본문은 `fontFamily.body`를 사용한다.
  - 본문, 리스트, 코드, blockquote, 테이블 등 요소의 색상/간격/폰트를 semantic 토큰과 연결한다.
- `MarkdownContent` 컴포넌트:
  - `prose prose-slate` → `prose prose-til`로 교체해 커스텀 타입 스케일을 사용한다.
- **검증**
  - 대표 마크다운 문서(질문/공부/프로필)를 통해 heading, list, inline code, code block, blockquote, table 렌더링을 확인한다.

### 3단계: Light/Dark 토큰 구조 설계

- `html` 또는 `body`에 `data-theme="light" | "dark"`를 둘 수 있는 구조를 상정한다.
- semantic 토큰별로 light/dark 값을 정리한다.
  - 예: `bg-surface(light)`, `bg-surface(dark)`, `text-primary(light)`, `text-primary(dark)` 등.
- 이번 사이클에서는 **light 테마 값**만 실제로 적용하고,
  - dark 값은 주석/도표 형태로 설계만 기록해 둔다.
- **검증**
  - dev 환경에서 `data-theme` 값을 임시로 바꿔보며 대비/가독성 튜닝 방향을 탐색한다(실제 토글 UI는 이후).

### 4단계: 문서 업데이트 & 회고

- 이 문서(`design-system-tokens-plan.md`)에는 각 단계가 끝날 때마다:
  - 실제로 무엇을 구현했는지
  - 계획 대비 변경/추가된 내용
  - 아직 남아 있는 개선 포인트
    를 짧게 기록한다.
- 별도 회고 문서 `design-system-tokens-plan-relfection.md`에는:
  - 각 To-do를 진행하면서 생긴 이슈, 실수, 배운 점, 다음에 바꾸고 싶은 프로세스를 정리해
  - 이후 유사 작업 시 참고할 수 있는 **메타 레벨 가이드**로 만든다.

## 테스트 & 배포 플로우

- 로컬:
  - `npm run dev` 로 페이지 스타일을 수시로 확인한다.
  - 중요 변경 후에는 `npm run build` (및 정적 export 스크립트가 있다면 함께)로 빌드가 깨지지 않는지 확인한다.
- GitHub Pages:
  - 기존 `deploy.yml` 워크플로우를 그대로 사용하되,
  - 이 디자인 시스템 작업 이후에도 빌드/배포가 정상 동작하는지만 확인하면 된다.

## 진행 로그(요약으로 누적)

- 1단계:
  - [ ] 토큰 스켈레톤 정의 및 레이아웃 적용
- 2단계:
  - [ ] Markdown 타이포그래피 적용
- 3단계:
  - [ ] Light/Dark 토큰 구조 설계
- 4단계:
  - [ ] plan/reflection 문서 업데이트 및 회고 정리
