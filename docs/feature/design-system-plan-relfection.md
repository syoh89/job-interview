## 목적

- 디자인 시스템 적용 과정에서 발생한 이슈, 실수, 개선점을 기록한다.
- 다음 사이클에서 같은 시행착오를 줄이고 효율을 높인다.

## 단계별 회고

### 1. analyze-current-styling

- What happened
  - 전역 레이아웃/토큰/Markdown 렌더링 구조를 빠르게 점검하고 적용 범위를 확정했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 구조 점검 시 `docs/dev` 문서와 코드 구조를 동시에 확인하는 루틴을 유지한다.

### 2. define-design-tokens

- What happened
  - Tailwind 색상 토큰을 CSS 변수 기반으로 전환하고 `:root`에 기본값을 선언했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - Figma 토큰이 제공되면 변수 값을 바로 치환할 수 있도록 JSON 매핑 테이블을 문서화한다.

### 3. main-page-starrry-style

- What happened
  - Starry 스타일의 Showcase/Calendar 섹션을 메인에 배치하고 키워드 영역은 하단 카드로 유지했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 실제 Figma 컴포넌트 스펙(간격/타이포)을 확보하면 수치 기반으로 정밀 보정한다.

### 4. typography-markdown

- What happened
  - `prose-til` typography 설정에 heading/list/blockquote/code 토큰을 반영했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 대표 마크다운 문서 2~3개로 시각 회귀 테스트를 루틴화한다.

### 5. theme-structure

- What happened
  - `data-theme="light"` 기본 지정 및 dark 토큰 스텁을 주석으로 정리했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 향후 dark 토큰 정의 시 대비(contrast) 체크리스트를 먼저 정의한다.

### 6. test-deploy

- What happened
  - `npm run build`로 정적 빌드 및 SSG 생성이 정상 완료되었다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 디자인 변경 후 `out/` 구조 확인을 추가해 배포 전 검증 루틴을 강화한다.

### 7. docs-reflection

- What happened
  - 디자인 시스템 적용 계획/회고 문서를 분리해 작성했다.
- Pain points
  - 없음.
- Mistakes
  - 없음.
- Improvements
  - 단계별 체크리스트를 더 세분화해 작업 소요를 추적한다.

## 종합 회고

- 프로세스 관점
  - 디자인 시스템 적용은 토큰-타이포-컴포넌트-페이지 순으로 진행하면 변경 폭을 통제하기 좋다.
- 도구 활용에서 배운 점
  - Tailwind의 `hsl(var(--...)/<alpha-value>)` 패턴은 하이브리드 토큰 설계에 유용하다.
- 다음 사이클 액션 아이템
  - [ ] Figma 토큰 값 확보 시 `:root` 변수 치환 자동화 방안 정리
  - [ ] Markdown 대표 문서 시각 테스트 체크리스트 문서화
