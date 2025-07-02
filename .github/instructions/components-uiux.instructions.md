# Custom Instructions: 컴포넌트 및 UI/UX

## 목적

UI 컴포넌트 및 UX 구현 시 아래 기준을 반드시 준수하세요.

## 지침

- 함수형 컴포넌트, React Hooks만 사용
- TailwindCSS 기반, VSCode 다크 테마 스타일 적용
- 모바일 우선 반응형 레이아웃
- 접근성(a11y) 속성(aria 등) 필수 적용
- 로딩/에러/빈 상태 UI 구현
- 입력값 검증 및 에러 메시지 명확화
- 컴포넌트는 app/components/에 작성, 라우트는 app/routes/에 작성

## 예시

```jsx
<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  {/* ... */}
</div>
```
