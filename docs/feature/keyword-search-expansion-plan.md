# 키워드 자동 링크 & 검색 확장 계획

## 목표

- 마크다운 본문 안의 키워드가 자동으로 링크화되어 `/keywords/[keyword]`로 이동.
- 키워드/제목 기반 검색 UI 제공 (정적 배포 환경에서도 동작).

## 범위

- 질문 문서, 공부 문서 본문에 적용.
- 코드 블록/기존 링크/헤딩 텍스트는 링크화 제외.
- 검색은 클라이언트 측 필터링으로 구현 (정적 배포 호환).

## 설계 개요

### 1) 키워드 자동 링크

- `src/lib/markdown.ts`에 **커스텀 remark 플러그인** 추가.
- 문서의 `keywords` 목록을 인자로 받아 본문 텍스트 노드에서 일치 항목을 찾고 링크 노드로 변환.
- 변환 제외 대상:
  - `code`, `inlineCode`, `link`, `linkReference`, `heading`
- 대소문자 구분 옵션을 유지 (요구사항 준수).
- 키워드 충돌 처리:
  - 긴 키워드 우선 매칭 (예: `React Query`가 `React`보다 먼저).
  - 동일 위치 중복 매칭 방지.

### 2) 검색 (키워드/제목)

- 정적 배포 친화적으로 **빌드 시 데이터 로딩**.
- 서버 컴포넌트에서 `getAllDocuments()` 결과를 내려주고,
  클라이언트 컴포넌트에서 검색어 입력에 따라 필터링.
- 검색 대상:
  - 문서 제목
  - 키워드 목록
- 검색 페이지:
  - `/keywords` 통합
  - 입력창 + 결과 리스트 + 결과 없을 때 메시지

## 데이터 흐름

```
markdown files -> getAllDocuments() -> server component props
                                  -> SearchClient (client filter)
```

## 구현 계획 (파일 단위)

### 키워드 자동 링크

- `src/lib/markdown.ts`
  - `markdownToHtml(markdown, keywords)` 시그니처 변경
  - remark 플러그인 추가 (텍스트 노드 링크화)
- `src/lib/content.ts`
  - `getDocumentBySlug()`에서 `keywords`를 `markdownToHtml()`로 전달

### 검색 기능

- `src/app/keywords/page.tsx` (서버 컴포넌트)
  - `getAllDocuments("questions")`, `getAllDocuments("studies")` 호출
  - 클라이언트 컴포넌트에 데이터 전달
- `src/components/SearchClient.tsx` (클라이언트 컴포넌트)
  - 검색 입력/필터링/리스트 렌더링
  - 필터 기준: 제목/키워드 포함 여부

## 검토 기준 (100% 구현 확인)

- 본문 키워드 클릭 시 키워드별 문서 페이지로 이동.
- 코드 블록/헤딩/이미 링크된 텍스트는 변환되지 않음.
- `/keywords`에서 키워드/제목으로 문서가 필터링됨.
- 결과가 없을 때 안내 메시지 노출.

## 리스크 및 대응

- 키워드가 흔한 단어일 경우 과도한 링크화 → 헤딩/코드 제외 + 긴 키워드 우선으로 최소화.
- 빌드 시 성능 → 문서 수 증가 시 인덱싱 캐시 고려.
