# 컴포넌트 설계 및 UI/UX 가이드

## 1. 주요 컴포넌트 구조

- StockList: 주식 항목 리스트
- StockForm: 항목 생성/수정 폼
- StockPieChart: 비중 파이차트
- Layout: 공통 레이아웃 및 다크모드 지원
- Loading, Error, Empty: 상태별 UI

## 2. UI/UX 원칙

- VSCode 다크 테마 스타일 (Tailwind 커스텀)
- 모바일 우선 반응형
- 접근성(a11y) 준수 (aria, 키보드 네비게이션 등)
- 입력값 검증 및 에러 메시지 명확화
- 로딩/에러/빈 상태 명확하게 표시

## 3. 예시 Tailwind 다크모드 설정

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        accent: '#007acc',
      },
    },
  },
};
```
