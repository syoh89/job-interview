# 프로젝트 구조

이 문서는 폴더/파일의 책임 경계를 빠르게 이해하도록 구조를 설명합니다.

## Top-level 구조

```text
job-interview/
├── content/                     # 마크다운 원본(콘텐츠)
├── docs/                        # 설계/회고/운영 문서
│   ├── dev/                     # 개발/구현 문서
│   ├── debug/                   # 디버깅 기록
│   └── feature/                 # 기능 설계 기록
├── src/                         # Next.js App Router
├── out/                         # 정적 export 산출물
├── next.config.js               # 정적 export/basePath 설정
└── .github/workflows/deploy.yml # GitHub Pages 배포
```

## 콘텐츠 규칙(`content/`)

- 질문 문서: `content/questions/<slug>.md`
- 공부 문서: `content/studies/<slug>.md`
- 프로필: `content/profile.md`

### Frontmatter 필드

- `title` (string)
- `createdAt` (string)
- `updatedAt` (string)
- `keywords` (string | string[])
- `category` (`technical` | `general`)

타입 정의는 `src/lib/types.ts`를 기준으로 합니다.

## App Router 구조(`src/app/`)

- 홈: `src/app/page.tsx` (StarryActivity 메인)
- 키워드 통합: `src/app/keywords/page.tsx` (키워드 목록 + 검색)
- 키워드 상세: `src/app/keywords/[keyword]/page.tsx`
- 질문 목록/상세: `src/app/questions/page.tsx`, `src/app/questions/[slug]/page.tsx`
- 공부 목록/상세: `src/app/studies/page.tsx`, `src/app/studies/[slug]/page.tsx`
- 프로필: `src/app/profile/page.tsx`

## 라이브러리(`src/lib/`)

- `content.ts`: 콘텐츠 루트 탐색, 문서 로딩/정렬, 키워드 인덱싱
- `markdown.ts`: 마크다운 -> HTML 변환 및 키워드 자동 링크
- `types.ts`: 문서 타입 모델 정의

## 컴포넌트(`src/components/`)

- `DocumentList`: 문서 목록 렌더링
- `KeywordTag`: 키워드 태그 렌더링
- `MarkdownContent`: 마크다운 HTML 렌더링
- `Navigation`: 전역 네비게이션
- `SearchClient`: 검색 UI
