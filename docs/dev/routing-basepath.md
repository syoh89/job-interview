# 라우팅/경로(basePath) 주의사항

GitHub Pages 배포 환경에서 경로가 깨지지 않도록 `basePath` 규칙을 정리합니다.

## 현재 설정 요약

`next.config.js` 기준 설정값:

- `output: "export"`
- `basePath: "/job-interview"`
- `assetPrefix: "/job-interview"`
- `trailingSlash: true`
- `images.unoptimized: true`

## 배포 URL 기준 경로 규칙

- 모든 라우트와 자산 경로는 `/job-interview/...` 형태로 동작합니다.
- 로컬 개발(`npm run dev`)과 배포 URL의 경로가 다르므로, 링크 생성 시 반드시 `basePath` 기준을 고려합니다.

## 링크/자산 생성 주의사항

- `next/link`를 사용하면 내부 라우트는 `basePath`가 자동 적용됩니다.
- 문자열로 직접 URL을 구성하는 경우 `basePath`가 누락되지 않도록 주의합니다.
- 키워드 경로는 `encodeURIComponent`로 안전하게 인코딩합니다.

## 동적 라우트와 정적 파라미터

정적 export 환경에서는 동적 라우트가 빌드 시 확정되어야 합니다.

- `generateStaticParams()`로 가능한 파라미터 목록을 생성
- `dynamicParams = false`로 예상하지 못한 경로 접근을 차단
- `dynamic = "force-static"`로 정적 렌더링 강제

예시 대상: `src/app/keywords/[keyword]/page.tsx`
