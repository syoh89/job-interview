---
title: React 컴포넌트 설계 질문 모음
createdAt: 2026-01-23
updatedAt: 2026-01-23
keywords: React,Frontend,Component,State
category: technical
---

# 질문 문서 제목

## 2026-01-23 - 2026-01-23

## 키워드: React,Frontend,Component,State

### 질문1

컴포넌트를 어떻게 분리하고 책임을 나누나요?

### 답변1

재사용성과 변경 가능성을 기준으로 나누되, 사용자 플로우와 상태의 경계를 우선 고려합니다.

### 질문2

상태는 어떤 기준으로 상위/하위 컴포넌트에 둡니까?

### 답변2

상태를 공유하는 범위에 맞춰 상위로 올리고, 단일 컴포넌트에서만 쓰는 값은 하위에 둡니다.

#### 참조

- React 공식 문서
