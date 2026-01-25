# 404 원인 점검/해결 계획

## 관찰된 현상
- `/questions`, `/studies` 목록은 정상 표시되나 상세/키워드 페이지는 404.
- 예: `/studies/http-protocol/`, `/keywords/Closure/`

## 핵심 가설
1) 상세 페이지에서 `getDocumentBySlug()`가 `null`을 반환해 `notFound()`가 호출된다.
2) 빌드 시점에 slug/keyword와 파일 경로가 불일치하거나 content 루트가 다르게 해석된다.
3) 정적 export 과정에서 동적 라우트가 404 HTML로 고정 생성된다.

## 실행 절차

### 1) 산출물 확인
- Pages artifact의 `out/`에서 상세/키워드 `index.html`이 404인지 확인.

### 2) slug/keyword 파이프라인 검증
- `getDocumentBySlug()`에서 파일 미존재 시 에러를 throw하여 빌드 로그로 원인 노출.

### 3) content 루트 해석 보강
- `GITHUB_WORKSPACE` 우선, 이후 `process.cwd()`/`__dirname` 기반 상향 탐색으로 루트 안정화.

### 4) 배포 검증
- 배포 후 아래 URL이 200 및 실제 콘텐츠 렌더링인지 확인:
  - `/studies/http-protocol/`
  - `/keywords/HTTP/`

## 관련 파일
- `src/lib/content.ts`
- `src/app/studies/[slug]/page.tsx`
- `src/app/keywords/[keyword]/page.tsx`
- `.github/workflows/deploy.yml`
