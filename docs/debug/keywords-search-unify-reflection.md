## 개요

- `/search` 제거 및 `/keywords` 통합 흐름으로 전환한 작업을 정리한다.
- 쿼리 동기화(`?query=`)와 키워드 클릭 → 검색 필터 전환의 문제/해결을 기록한다.

## 변경 요약

- `/search` 페이지 삭제, 탐색 허브를 `/keywords`로 통일.
- `/keywords`에서 `?query=` 기반 상태 유지/공유 구현.
- 키워드 클릭 시 검색 필터가 즉시 적용되도록 개선.
- Figma 토큰 매핑 확장 및 스펙 문서 업데이트.

## 이슈 및 해결

### 1) ESLint: setState in effect 경고

- **문제**
  - `SearchClient`에서 `useEffect`로 `setState`를 호출해 `react-hooks/set-state-in-effect` 오류 발생.
- **해결**
  - 검색 쿼리를 상위에서 제어하는 **완전 controlled** 방식으로 변경.
  - `query`와 `onQueryChange`를 props로 전달해 URL과 상태를 동기화.

### 2) 탐색 경로 단일화

- **문제**
  - `/search`와 `/keywords`가 공존하면 사용자 흐름이 분산됨.
- **해결**
  - `/search` 삭제 후 `/keywords`로 기능 통합.
  - 문서에서 경로 설명 일괄 수정.

## 학습/개선 포인트

- 쿼리 동기화는 **딥링크/공유**에 효과적이며, 탐색 허브에 적합하다.
- effect 기반 상태 동기화는 lint 정책과 충돌할 수 있으므로, 가능하면 controlled 패턴을 우선 고려한다.

## 다음 단계

- `/keywords/[keyword]` 상세 페이지를 `/keywords?query=` 방식으로 통일할지 결정.
- 탭 상태(`?tab=questions`) URL 동기화 여부 결정.
