# 키워드 404 디버그 플랜/진행 기록

## 디버그 절차 플랜

1. 가설 수립 (3~5개)
2. 코드 인스트루먼트(로그) 추가
3. 재현 절차 안내
4. 로그 분석으로 가설 판정
5. 증거 기반 수정
6. 검증 로그 확인
7. 로그 제거 및 요약

---

## 실행 내역

### 1) 가설 수립

- H1: `generateStaticParams()`가 실제 키워드 리스트와 불일치
- H2: 키워드 페이지에서 `params.keyword`가 예상과 다르게 전달
- H3: `getDocumentsByKeyword()`에서 keyword 비교가 실패 (대소문자/인코딩/공백)
- H4: 빌드 시 `contentRoot` 또는 키워드 수집 경로가 다른 컨텍스트에서 달라짐

### 2) 인스트루먼트 추가

- `src/app/keywords/[keyword]/page.tsx`
- `src/lib/content.ts` (`getAllStaticKeywords`, `getDocumentsByKeyword`)

### 3) 재현 절차

- 배포 페이지에서 `/job-interview/keywords/Closure/` 접근
- 서버 로그 수집

### 4) 로그 분석

- (대기)

### 5) 수정

- (대기)

### 6) 검증

- (대기)

### 7) 로그 제거/요약

- (대기)
