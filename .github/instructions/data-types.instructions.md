# Custom Instructions: 데이터 타입 및 유틸리티

## 목적

주식 포트폴리오의 데이터 타입과 유틸리티 함수 작성 시 아래 기준을 반드시 준수하세요.

## 지침

- 모든 주식 데이터는 TypeScript strict 모드로 타입을 명확히 정의
- 가격, 수익률 등 숫자 데이터는 소수점 2자리로 처리
- 통화 표시는 항상 한국 원화(KRW)로 포맷팅
- 유틸리티 함수는 app/lib/에 작성, 타입은 app/types/에 정의
- 옵셔널 체이닝, nullish 병합 연산자 적극 활용

## 예시

```typescript
export interface Stock {
  name: string;
  ticker?: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
}

export function formatKRW(value: number): string {
  return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}
```
