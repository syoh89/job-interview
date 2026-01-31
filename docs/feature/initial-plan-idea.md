# 면접 질문 정리 사이트 구축 계획

## 아키텍처 개요

### 기술 스택

#### 프론트엔드: Next.js 14+ (App Router) + TypeScript

##### 스타일링: Tailwind CSS (간결하고 효율적)

##### Markdown 파싱: gray-matter (frontmatter 파싱) + remark + rehype (마크다운 → HTML)

### 배포: Vercel (GitHub 연동, 무료, 자동 배포) 또는 GitHub Pages

### CI/CD: GitHub Actions (자동 빌드 및 배포)

### 프로젝트 구조

```text
job-interview/
├── content/ # GitHub에서 관리할 마크다운 파일들
│ ├── profile.md # 사용자 정보
│ ├── questions/ # 질문 문서들
│ │ ├── frontend-react.md
│ │ ├── javascript-closure.md
│ │ └── ...
│ ├── studies/ # 공부 문서들
│ │ ├── http-protocol.md
│ │ ├── database-index.md
│ │ └── ...
│ └── keywords/ # 키워드 메타데이터 (선택사항)
│ ├── technical.json
│ └── general.json
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── layout.tsx
│ │ ├── page.tsx # 홈 (키워드 목록)
│ │ ├── profile/ # 사용자 정보 페이지
│ │ │ └── page.tsx
│ │ ├── questions/ # 질문 문서 목록/상세
│ │ │ ├── page.tsx # 질문 문서 목록
│ │ │ └── [slug]/ # 개별 질문 문서
│ │ │ └── page.tsx
│ │ ├── studies/ # 공부 문서 목록/상세
│ │ │ ├── page.tsx # 공부 문서 목록
│ │ │ └── [slug]/ # 개별 공부 문서
│ │ │ └── page.tsx
│ │ └── keywords/ # 키워드별 문서 목록
│ │ └── [keyword]/
│ │ └── page.tsx
│ ├── lib/
│ │ ├── markdown.ts # 마크다운 파싱 유틸리티
│ │ ├── content.ts # 콘텐츠 로딩 및 인덱싱
│ │ └── types.ts # TypeScript 타입 정의
│ └── components/
│ ├── MarkdownContent.tsx # 마크다운 렌더링 컴포넌트
│ ├── KeywordTag.tsx # 키워드 태그 컴포넌트
│ ├── DocumentList.tsx # 문서 목록 컴포넌트
│ └── Navigation.tsx # 네비게이션
├── .github/
│ └── workflows/
│ └── deploy.yml # GitHub Actions 배포 워크플로우
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 구현 단계

### 1단계: 프로젝트 초기 설정

- Next.js 프로젝트 생성 (TypeScript, App Router)
- Tailwind CSS 설정
- 필수 패키지 설치:
  - gray-matter: frontmatter 파싱
  - remark: 마크다운 파싱
  - rehype: HTML 변환
  - remark-gfm: GitHub Flavored Markdown 지원
  - rehype-highlight 또는 rehype-prism: 코드 하이라이팅

### 2단계: 타입 정의 및 콘텐츠 구조

- src/lib/types.ts: 문서 타입 정의
- QuestionDocument: 질문 문서 타입
- StudyDocument: 공부 문서 타입
- DocumentMetadata: 공통 메타데이터 타입
- 마크다운 파일 frontmatter 형식 정의:

---

title: 문서 제목
createdAt: 2026-01-23
updatedAt: 2026-01-23
keywords: React,Frontend,JavaScript
category: technical

---

### 3단계: 마크다운 파싱 유틸리티

- src/lib/markdown.ts:
  - frontmatter 파싱
  - 마크다운 → HTML 변환
  - 키워드 추출 및 링크 생성
- src/lib/content.ts:
  - 콘텐츠 파일 읽기
  - 키워드별 인덱싱
  - 검색 및 필터링 기능

### 4단계: 컴포넌트 개발

- MarkdownContent: 마크다운 렌더링 (키워드 자동 링크)
- KeywordTag: 클릭 가능한 키워드 태그
- DocumentList: 문서 목록 표시 (필터링, 정렬)
- Navigation: 사이트 네비게이션

### 5단계: 페이지 구현

- 홈 페이지 (/): 키워드 목록 (기술면접/일반면접 분류)
- 프로필 페이지 (/profile): 사용자 정보
- 질문 문서 목록 (/questions): 모든 질문 문서
- 질문 문서 상세 (`/questions/[slug]`): 개별 질문 문서
- 공부 문서 목록 (/studies): 모든 공부 문서
- 공부 문서 상세 (`/studies/[slug]`): 개별 공부 문서
- 키워드별 문서 (`/keywords/[keyword]`): 특정 키워드 관련 문서 목록

### 6단계: 키워드 링크 기능

- 마크다운 내 키워드 자동 감지 및 링크 생성
- 클릭 시 해당 키워드의 문서 목록 페이지로 이동
- 관련 문서 추천 기능

### 7단계: GitHub Actions 설정

- .github/workflows/deploy.yml:
  - GitHub push 시 자동 트리거
- Next.js 빌드
- Vercel 또는 GitHub Pages 배포

### 8단계: 샘플 콘텐츠 작성

- content/profile.md: 사용자 정보 템플릿
- content/questions/ 예시 문서 2-3개
- content/studies/ 예시 문서 2-3개

## 주요 기능 상세

### 마크다운 파싱 및 렌더링

- frontmatter에서 메타데이터 추출 (제목, 날짜, 키워드)
- 마크다운 본문을 HTML로 변환
- 키워드 태그를 자동으로 링크로 변환
- 코드 블록 하이라이팅

### 키워드 시스템

- 키워드는 대소문자 구분하여 저장
- 키워드 클릭 시 `/keywords/[keyword]`로 이동
- 키워드별 문서 목록 자동 생성
- 기술면접/일반면접 카테고리 분류

### 문서 구조

- 질문 문서: 질문-답변 쌍으로 구성
- 공부 문서: 공부 내역, 이해 정리, 연관 내용, 추가 공부 항목
- 참조 링크는 별도 섹션으로 표시

## 배포 옵션

### 옵션 1: Vercel (추천)

- GitHub 연동 자동 설정
- 무료 플랜 제공
- Next.js 최적화
- 자동 HTTPS, CDN

### 옵션 2: GitHub Pages

- GitHub Actions로 빌드 후 배포
- 정적 사이트만 지원 (Next.js SSG 필요)

## 데이터 흐름

```text
GitHub Repository (markdown files)
↓
GitHub Push Event
↓
GitHub Actions (빌드)
↓
Next.js Build (마크다운 파싱 → 정적 페이지 생성)
↓
Vercel/GitHub Pages 배포
↓
사용자 접근
```

## 확장 가능성

- 검색 기능 추가 (키워드, 제목 검색)
- 다크모드 지원
- 문서 통계 (키워드별 문서 수 등)
- RSS 피드 생성
