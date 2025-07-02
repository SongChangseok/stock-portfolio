# Custom Instructions: 테스트 전략

## 목적

테스트 코드 작성 시 아래 기준을 반드시 준수하세요.

## 지침

- 모든 UI 컴포넌트에 기본 렌더링 테스트 필수
- 비즈니스 로직 함수는 유닛 테스트 필수
- API 연동/비동기 로직은 Mock 테스트 적용
- 테스트는 app/**tests**/ 또는 각 폴더 내 **tests** 디렉터리에 작성
- 테스트 실행: npm run test, typecheck, lint

## 예시

```typescript
test('StockList 렌더링', () => {
  // ...테스트 코드...
});
```
