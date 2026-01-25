# 404 원인 점검 Reflection

이 문서는 `/Users/syoh/.cursor/plans/404_원인_점검_계획_b9001cbd.plan.md`의 각 To-do를 수행한 뒤,
단계별로 잘한 점과 실수를 기록해 재발을 방지하기 위한 문서입니다.

## To-do 1: Pages artifact/out 산출물에서 404 생성 여부 확인

### 잘한 점
- 최신 GitHub Pages artifact를 다운로드해 실제 `out/` 산출물을 확인함.
- `studies/http-protocol/index.html`가 404 HTML로 생성되는 것을 확인하여 렌더 단계 `notFound()` 호출로 원인을 좁힘.

### 실수/개선점
- artifact 확인 전까지 원인을 추정으로만 접근함. 앞으로는 먼저 산출물/로그로 확정 후 수정.

---

## To-do 2: content 경로/슬러그 검증 로직 추가 및 원인 식별

### 잘한 점
- `getDocumentBySlug()`에서 파일 미존재 시 빌드가 실패하도록 에러를 발생시키고, `contentRoot/cwd/availableFiles`를 로그로 남기도록 개선함.
- 404가 조용히 생성되는 대신, 빌드 로그로 원인이 드러나도록 설계함.
- prerender 단계에서 `params`가 `Promise`처럼 동작할 가능성을 고려해 `await params`로 slug/keyword를 안정적으로 추출하도록 변경함.

### 실수/개선점
- 초기에는 404가 산출물에 생성되는 구조를 확인하지 않고 추정으로 접근함.
- 에러 메시지에 필요한 진단 정보를 명시적으로 포함하도록 미리 설계했어야 함.

---

## To-do 3: 경로 고정 및 정적 생성 강제 후 배포 검증

### 잘한 점
- `GITHUB_WORKSPACE`, `process.cwd()`, `__dirname` 순서로 content 루트를 탐색하도록 보강해 CI/로컬 경로 차이를 흡수함.
- 상위 디렉터리 탐색 로직을 공통 함수로 분리해 디버깅이 쉬워짐.

### 실수/개선점
- 초기 구현에서 CI 환경 변수 경로를 우선 적용하지 않아 동일 문제가 반복될 여지가 있었음.

---

## To-do 4: docs/404-debug-plan.md 문서 추가

### 잘한 점
- 점검 가설/절차/검증 URL을 문서화해 팀/미래 작업에 바로 공유 가능하게 정리함.

### 실수/개선점
- 실행 도중에 문서화를 미루어 흐름이 분산되었음. 초기 단계에서 문서 스켈레톤을 먼저 만드는 편이 낫다.

