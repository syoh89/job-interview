# 기술 스택

이 문서는 프로젝트 요구사항과 기술 선택 배경, 그리고 정적 export 환경에서의 제약을 정리합니다.

## 프로젝트 요구사항 요약

- 마크다운 기반 콘텐츠 관리(`content/`)
- 키워드 탐색 중심의 문서 탐색 UX
- 정적 배포(GitHub Pages)

## Framework

- **Next.js (App Router)**: 라우팅 구조가 명확하고 정적 export에 적합
- **정적 export 설정**: `next.config.js`에서 `output: "export"` 사용
- **React/React DOM**: `package.json` 기준 `react`, `react-dom` 사용
- **제약 사항**
  - 서버 런타임 의존 기능 사용 제한
  - 동적 라우트는 `generateStaticParams`로 사전 생성 필요
  - 이미지 최적화는 `images.unoptimized: true`로 비활성화

## UI

- **Tailwind CSS**: 빠른 UI 구성과 일관된 스타일링

## Markdown 파이프라인

마크다운은 아래 흐름으로 HTML로 변환됩니다.

- `gray-matter`: frontmatter 파싱
- `remark` + `remark-gfm`: 마크다운 파싱 및 GFM 지원
- `remark-rehype` + `rehype-highlight` + `rehype-stringify`: HTML 변환 및 코드 하이라이트
- 키워드 자동 링크 플러그인(`src/lib/markdown.ts`)
  - 제외 영역: `code`, `inlineCode`, `link`, `linkReference`, `heading`

## Tooling

- **TypeScript**: 타입 안정성
- **ESLint/Prettier**: 코드 품질 및 포맷팅
- **Node/NPM**
  - `npm ci`, `npm run dev`, `npm run build` 기준 운영
