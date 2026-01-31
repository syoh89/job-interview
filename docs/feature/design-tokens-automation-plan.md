## 개요

- `design/design-tokens.json`을 기준으로 CSS 변수와 Tailwind 토큰을 자동 생성하는 흐름을 정교화한다.
- Figma 토큰 자동화(혼합 방식)를 전제로, 컴포넌트/상태 스펙 문서와 병행한다.
- 현재 코드 구조(`scripts/`, `src/app/design-tokens.css`, `tailwind.config.js`)를 유지하며 확장한다.

## 현재 구조 점검 요약

- 토큰 원본: `design/design-tokens.json`
- 변환 스크립트: `scripts/generate-design-tokens.mjs`
- 산출물: `src/app/design-tokens.css` (`globals.css`에서 import)
- Tailwind 연동: `tailwind.config.js`에서 CSS 변수 참조

## 매핑 규칙 정교화 방향

### 1) Semantic 우선 매핑 원칙

- `basic.colors.semantic.light|dark`를 최상위 기준으로 사용한다.
- 현재 변수에 매핑되는 기준:
  - `--surface`: `semantic.light.bg`
  - `--surface-muted`: `gray.100` (대체 가능: `semantic.light.card` + 알파 조정)
  - `--surface-elevated`: `semantic.light.card`
  - `--text-primary`: `semantic.light.textPrimary`
  - `--text-muted`: `semantic.light.textSecondary`
  - `--accent`: `semantic.light.link`
  - `--accent-soft`: `primary.100`
  - `--border-subtle`: `semantic.light.border`
  - `--code-bg`: `components.codeBlock.light.bg`

### 2) 컴포넌트 토큰 반영

- 컴포넌트별 토큰을 CSS 변수로 승격해 공통 스타일로 재사용한다.
- 예시:
  - `components.button.primary.light` → `--btn-primary-bg`, `--btn-primary-bg-hover`, `--btn-primary-text` 등
  - `components.input.light` → `--input-bg`, `--input-border`, `--input-placeholder`
  - `components.codeBlock.light` → `--code-bg`, `--code-text`, `--code-border`

### 3) 폰트/타이포 매핑

- `basic.typography.fontFamily`와 `fontSize`를 분리해 적용한다.
- 현재는 폰트 패밀리만 CSS 변수로 매핑하고 있으므로,
  - 추후 `fontSize`는 Tailwind `theme.extend.fontSize`로 직접 매핑하거나
  - `--font-size-*` 변수로 추가해 Typography 플러그인에 연결한다.

### 4) Dark 토큰 분리 전략

- `semantic.dark.*`는 `:root`가 아닌 `[data-theme="dark"]` 블록에 매핑한다.
- 다크 토큰 적용 시 대비(contrast) 체크리스트를 포함한다.

## 자동화 흐름(구현 계획)

### 단계 1: 토큰 매핑 테이블 고도화

- `scripts/generate-design-tokens.mjs`에 매핑 테이블 상수를 추가
- 매핑을 명시적으로 관리해 사람이 읽어도 쉽게 이해되도록 한다.

### 단계 2: 컴포넌트 토큰 출력 확장

- `components.button`, `components.input`, `components.codeBlock` 등을
  CSS 변수로 추출해 출력한다.
- `--btn-*`, `--input-*`, `--code-*` 네이밍을 통일한다.

### 단계 3: Tailwind 연동 확장

- `tailwind.config.js`에 컴포넌트 토큰 대응 유틸리티 추가
  - 예: `boxShadow`, `borderRadius`, `colors` 확장
- Typography 플러그인에 `codeBlock` 토큰 연결

### 단계 4: 스펙 문서 보완

- `docs/feature`에 컴포넌트 상태 스펙 문서 작성
- 스펙 문서에는 “토큰 키 → 실제 스타일 적용 위치”까지 기록

## 아이디어 코멘트

- 혼합 방식은 실제 운영에서 가장 안정적인 패턴이다.
- 토큰 자동화와 스펙 문서가 병행되면 디자인 의도와 구현 일관성이 동시에 확보된다.
- 단, 자동화 매핑 규칙을 명확히 문서화하지 않으면 유지보수 비용이 높아질 수 있다.

## 다음 액션 체크리스트

- [ ] 매핑 테이블 문서화 및 코드 반영
- [ ] 컴포넌트 토큰 CSS 변수화 확장
- [ ] Typography 토큰 적용 범위 확대
- [ ] 스펙 문서(컴포넌트/상태) 작성
