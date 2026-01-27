# 프로젝트 NightLog

면접 질문/학습 내용을 마크다운으로 관리하고, 키워드 기반으로 탐색할 수 있도록 정적으로 배포하는 프로젝트입니다.
Next.js(App Router)로 페이지를 구성하고, `content/` 아래의 Markdown을 파싱해 문서 목록/상세/키워드 페이지를 생성합니다.
해당 프로젝트의 기능 추가 및 업데이트나 업그레이드는 Cursor의 다양한 모드 등을 활용했으며, Cursor 활용 내역/계획/디버그/업데이트 기록을 `docs/` 하위에 분리했습니다.
프로젝트 문서 구조는 `docs/` 에 정리되어 있으며, 상세 기술 문서는 `docs/dev`, 기획은 `docs/feature`, 디버그는 `docs/debug`에서 확인할 수 있습니다.

## 주요 기능

- 마크다운 콘텐츠 관리: `content/` 폴더의 `.md` 파일을 소스 데이터로 사용
- 문서 분류: `questions`, `studies`, `profile`
- 키워드 기반 탐색: 키워드별 문서 목록/상세 연결
- 정적 export + GitHub Pages 배포

## 콘텐츠 작성 가이드(요약)

### 파일 위치

- 질문 문서: `content/questions/<slug>.md`
- 공부 문서: `content/studies/<slug>.md`
- 프로필: `content/profile.md`

### Frontmatter 예시

```yaml
---
title: 문서 제목
createdAt: 2026-01-23
updatedAt: 2026-01-23
keywords: React,Frontend,JavaScript
category: technical
---
```

## 상세 문서

- [기술 스택](docs/dev/tech-stack.md)
- [프로젝트 구조](docs/dev/project-structure.md)
- [GitHub Pages 배포](docs/dev/deploy-github-pages.md)
- [라우팅/basePath 주의사항](docs/dev/routing-basepath.md)
- [콘텐츠 파이프라인](docs/dev/content-pipeline.md)
