# GitHub Pages 배포

이 문서는 GitHub Pages 배포 흐름과 실패 시 확인 포인트를 정리합니다.

## 배포 개요

- 정적 export 기반 Next.js 사이트를 GitHub Pages로 배포
- 빌드 산출물은 `out/`에 생성됨

## 워크플로우

배포 워크플로우는 `.github/workflows/deploy.yml`에 정의되어 있습니다.

- 트리거: `main` 브랜치 push
- 단계:
  1. `actions/checkout`
  2. `actions/setup-node` (Node 20)
  3. `npm ci`
  4. `npm run build`
  5. `./out` 아티팩트 업로드
  6. `actions/deploy-pages`

## 로컬 검증 체크리스트

- `npm ci`
- `npm run build`
- `out/` 디렉토리 생성 확인
- 실제 경로가 `/job-interview/...` 기준으로 동작하는지 확인

## 자주 발생하는 문제

- **Pages 404**
  - `basePath`/`assetPrefix` 미적용 또는 링크 경로 생성 오류
- **`out/` 미생성**
  - 정적 export 설정 누락 또는 빌드 실패
