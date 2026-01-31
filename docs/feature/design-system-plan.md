## 개요

- Figma 디자인 시스템을 기반으로 메인 페이지와 공통 토큰/타이포/Markdown 렌더링을 단계적으로 적용한다.
- Tailwind 최신 기능을 유지하면서 핵심 토큰은 CSS 변수로 추출하는 하이브리드 구조를 채택한다.
- 테스트/배포 검증과 회고 기록을 포함한다.

## 진행 단계

### 1단계: 현재 구조 및 스타일 진단

- 대상: `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.js`, `src/components/MarkdownContent.tsx`
- 확인 사항:
  - 전역 레이아웃과 토큰 기반 클래스 적용 여부
  - Markdown 렌더링(`prose-til`) 적용 범위
  - Tailwind 색상/타이포 토큰 구조

### 2단계: 토큰 확장 + 하이브리드 토큰 구조 준비

- 대상: `tailwind.config.js`, `src/app/globals.css`
- 구현 내용:
  - Semantic 토큰을 CSS 변수 기반(`hsl(var(--...))`)으로 정리
  - `:root`에 토큰 기본값 선언
  - 카드/패널 전용 `boxShadow` 토큰 추가

### 3단계: 메인 페이지 Starry 스타일 적용

- 대상: `src/app/page.tsx`
- 구현 내용:
  - StarryActivityShowcase/Calendar 느낌의 섹션 구성
  - 키워드 섹션을 하단에 유지하고 카드 스타일 적용
  - 공통 토큰 기반 색상/타이포 정리

### 4단계: Typography 및 Markdown 스타일 정교화

- 대상: `tailwind.config.js`, `src/components/MarkdownContent.tsx`
- 구현 내용:
  - `prose-til`에 heading, list, blockquote, code 스타일 토큰 매핑
  - 인라인 코드와 코드 블록의 배경/보더/폰트 일관화

### 5단계: 테마 구조 설계 (light 우선)

- 대상: `src/app/globals.css`, `src/app/layout.tsx`
- 구현 내용:
  - `data-theme="light"` 기본 지정
  - dark 토큰은 스텁/주석 형태로 구조만 준비

### 6단계: 테스트 및 배포 검증

- 로컬:
  - `npm run dev`로 주요 페이지 시각 확인
  - `npm run build`로 정적 export 검증
- 배포:
  - `.github/workflows/deploy.yml` 기준 GitHub Pages 배포 확인

### 7단계: 회고 및 기록

- 대상: `docs/feature/design-system-plan-relfection.md`
- 구현/이슈/개선점 기록

## 진행 로그 (요약)

- [x] 1단계: 현재 구조 진단 완료
- [x] 2단계: CSS 변수 기반 토큰 구조 적용
- [x] 3단계: 메인 페이지 Starry 스타일 구조 적용
- [x] 4단계: Typography 토큰 보강
- [x] 5단계: light/dark 구조 스텁 준비
- [x] 6단계: 테스트/배포 검증
- [x] 7단계: 회고 기록 정리

## 변경 내역 요약

- `tailwind.config.js`: semantic 토큰을 CSS 변수 기반으로 정리하고 typography/boxShadow 확장
- `src/app/globals.css`: `:root` 토큰 선언 및 dark 테마 스텁 추가
- `src/app/layout.tsx`: `data-theme="light"` 기본 지정
- `src/app/page.tsx`: Starry 스타일 메인 구성 + 키워드 카드 정리
- `src/components/StarryActivityShowcase.tsx`: 신규 Starry 섹션
- `src/components/StarryActivityCalendar.tsx`: 신규 캘린더 섹션
- `src/components/KeywordTag.tsx`: 토큰 기반 태그 스타일로 수정
