# 데이터 타입 및 유틸리티 설계서

## 1. 주식 항목 타입 정의

```typescript
export interface Stock {
  name: string; // 종목명
  ticker?: string; // 미국장일 때만 사용
  buyPrice: number; // 매입가 (KRW, 소수점 2자리)
  currentPrice: number; // 현재가 (KRW, 소수점 2자리)
  quantity: number; // 보유수량
}
```

## 2. 유틸리티 함수 예시

- 소수점 2자리 변환
- 원화 포맷팅
- 수익률 계산

```typescript
export function formatKRW(value: number): string {
  return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}

export function toFixed2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getReturnRate(buyPrice: number, currentPrice: number): number {
  if (buyPrice === 0) return 0;
  return toFixed2(((currentPrice - buyPrice) / buyPrice) * 100);
}
```

## 3. 타입스크립트 strict 모드 권장

- 모든 타입 명시
- 옵셔널 체이닝, nullish 병합 연산자 적극 활용
