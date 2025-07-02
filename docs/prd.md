# 주식 포트폴리오 PRD (Product Requirements Document)

## 1. 개요

사용자가 보유한 주식 항목(이름, 티커, 매입가, 현재가, 보유수량)을 관리하고, 각 종목의 비중을 파이차트로 시각화하는 현대적 포트폴리오 웹앱을 개발한다. VSCode 다크 테마 스타일과 반응형, 접근성, 성능 최적화를 목표로 한다.

---

## 2. 주요 기능

- 주식 항목 CRUD (생성/수정/삭제)
- 각 종목의 비중을 파이차트로 시각화
- 반응형 UI 및 다크모드 지원
- 입력값 검증 및 에러/로딩 처리
- 접근성(a11y) 준수

---

## 3. 데이터 구조

- 이름(name): string
- 티커(ticker): string (미국장일 때)
- 매입가(buyPrice): number (KRW, 소수점 2자리)
- 현재가(currentPrice): number (KRW, 소수점 2자리)
- 보유수량(quantity): number

---

## 4. UI/UX

- TailwindCSS 기반, VSCode 다크 테마 스타일
- 모바일 우선 반응형 레이아웃
- 파이차트(비중 시각화), 리스트/폼 UI
- 로딩/에러/빈 상태 UI

---

## 5. 기술 스택 및 구조

- React Router 6+, TypeScript(strict), Vite, TailwindCSS
- 컴포넌트: 함수형, React Hooks, 절대경로 import
- 파일구조: routes, components, lib, types, public
- ESLint, Prettier, 타입체크, 테스트 필수

---

## 6. 테스트 및 품질

- 컴포넌트 렌더링 테스트
- 비즈니스 로직 유닛 테스트
- API/Mock 테스트
- TypeScript, ESLint, Prettier, 접근성, 성능 점검

---

## 7. 보안 및 배포

- API 키 환경변수 관리, XSS 방지, CORS 확인
- Docker 지원, 환경별 설정 분리, 헬스체크 엔드포인트

---

## 8. 일정 및 마일스톤

1. 데이터 타입/유틸리티 정의
2. UI 컴포넌트/차트 개발
3. CRUD/상태관리 구현
4. 스타일링/다크모드 적용
5. 테스트/문서화/배포

---

## 9. 참고 및 기타

- 파이차트 라이브러리: recharts, chart.js 등
- 입력값 검증 및 UX 개선
