# React 컴포넌트 생성

React 컴포넌트 생성 시 다음 요구사항을 준수해주세요:

## 컴포넌트 구조

- TypeScript로 작성
- 함수형 컴포넌트 사용
- Props 인터페이스 정의
- 적절한 JSDoc 주석 추가

## 스타일링

- TailwindCSS 클래스 사용
- 반응형 디자인 적용
- 다크모드 지원 고려
- 접근성(a11y) 속성 포함

## 성능 최적화

- 필요시 React.memo 적용
- 이벤트 핸들러 useCallback 사용
- 복잡한 계산은 useMemo 활용

## 파일 네이밍

- 컴포넌트 파일: `ComponentName.tsx`
- 스토리북 파일: `ComponentName.stories.tsx`
- 테스트 파일: `ComponentName.test.tsx`

## 예시 구조

```typescript
interface ComponentProps {
  // props 정의
}

/**
 * 컴포넌트 설명
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 구현
  return {
    /* JSX */
  };
}
```

## Stock Portfolio 특화 요구사항

- 주식 데이터 표시시 가격 포맷팅 적용
- 수익/손실에 따른 색상 구분 (녹색/빨간색)
- 로딩 상태와 에러 처리 UI 포함
- 모바일 친화적 레이아웃
