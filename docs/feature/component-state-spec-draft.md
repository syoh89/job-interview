## 개요

- Figma 컴포넌트/상태 토큰을 코드에 매핑하기 위한 스펙 초안이다.
- 토큰 키, 적용 위치, 상태별 변화를 명시한다.
- 실제 구현은 `scripts/generate-design-tokens.mjs`의 CSS 변수에 의존한다.

## 공통 규칙

- 색상: `design/design-tokens.json`의 `basic.components.*`를 우선 매핑한다.
- 상태: `light`/`dark`를 분리해 `[data-theme]`에서 전환한다.
- 네이밍: CSS 변수는 `--component-variant-state` 형식을 따른다.

## Button (Primary)

- 토큰 기준
  - `basic.components.button.primary.light|dark`
- CSS 변수
  - `--btn-primary-bg`
  - `--btn-primary-bg-hover`
  - `--btn-primary-bg-active`
  - `--btn-primary-text`
  - `--btn-primary-radius`
  - `--btn-primary-padding-x`
  - `--btn-primary-padding-y`
  - `--btn-primary-font-weight`
- 적용 위치
  - 기본 버튼 컴포넌트(향후 생성)
  - CTA, 강조 버튼

## Card

- 토큰 기준
  - `basic.components.card.default.light|dark`
  - `basic.components.card.elevated`
- CSS 변수
  - `--card-bg`
  - `--card-border`
  - `--card-radius`
  - `--card-padding`
  - `--card-shadow`
  - `--card-elevated-shadow`
  - `--card-elevated-shadow-hover`
- 적용 위치
  - 카드/패널/리스트 박스 기본 스타일

## Tab

- 토큰 기준
  - `basic.colors.semantic.*` 기반 파생
- CSS 변수
  - `--tab-active-bg`
  - `--tab-active-text`
  - `--tab-active-border`
  - `--tab-inactive-text`
  - `--tab-inactive-border`
  - `--tab-hover-border`
- 적용 위치
  - 검색 탭, 카테고리 필터 탭

## Badge

- 토큰 기준
  - `basic.components.badge.difficulty.*`
- CSS 변수
  - `--badge-easy-bg`, `--badge-easy-text`, `--badge-easy-border`
  - `--badge-medium-bg`, `--badge-medium-text`, `--badge-medium-border`
  - `--badge-hard-bg`, `--badge-hard-text`, `--badge-hard-border`
- 적용 위치
  - 난이도, 상태 라벨

## Toast/Alert

- 토큰 기준
  - `basic.colors.success|warning|error`
- CSS 변수
  - `--alert-success-bg`, `--alert-success-text`, `--alert-success-border`
  - `--alert-warning-bg`, `--alert-warning-text`, `--alert-warning-border`
  - `--alert-error-bg`, `--alert-error-text`, `--alert-error-border`
- 적용 위치
  - 안내/성공/오류 메시지, 알림 UI

## Modal

- 토큰 기준
  - `basic.components.modal`
- CSS 변수
  - `--modal-backdrop`
  - `--modal-bg`
  - `--modal-text`
  - `--modal-radius`
  - `--modal-padding`
  - `--modal-max-width`
- 적용 위치
  - 알림/설정/상세 팝업

## Pagination

- 토큰 기준
  - `basic.components.button.secondary.*` 기반 파생
- CSS 변수
  - `--pagination-bg`
  - `--pagination-bg-hover`
  - `--pagination-text`
- 적용 위치
  - 문서 목록 페이지네이션, 검색 결과 페이지네이션

## Input

- 토큰 기준
  - `basic.components.input.light|dark`
- CSS 변수
  - `--input-bg`
  - `--input-border`
  - `--input-border-focus`
  - `--input-text`
  - `--input-placeholder`
  - `--input-radius`
  - `--input-padding-x`
  - `--input-padding-y`
- 적용 위치
  - 검색 입력, 폼 필드

## Code Block

- 토큰 기준
  - `basic.components.codeBlock.light|dark`
- CSS 변수
  - `--code-bg`
  - `--code-text`
  - `--code-border`
- 적용 위치
  - `MarkdownContent`의 코드 블록
  - `@tailwindcss/typography`의 `pre`, `code` 스타일

## Tag/Chip (KeywordTag)

- 토큰 기준
  - `basic.colors.semantic.*` + `basic.colors.gray`
- 적용 방식
  - 배경: `--surface` 또는 `--accent-soft`
  - 보더: `--border-subtle`
  - 텍스트: `--text-muted` → hover 시 `--text-primary`
- 적용 위치
  - `KeywordTag` 컴포넌트

## 다음 단계

- 버튼/인풋 실제 컴포넌트 생성 및 적용 범위 확장
- Typography 플러그인에 `--code-text`, `--code-border` 매핑
- 토큰 변경 시 스펙 문서와 매핑 테이블 동기화
