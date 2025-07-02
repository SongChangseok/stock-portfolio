# Custom Instructions: 차트/비즈니스 로직

## 목적

파이차트 및 비즈니스 로직 작성 시 아래 기준을 반드시 준수하세요.

## 지침

- 각 종목의 비중 = (현재가 _ 보유수량) / 전체 평가금액 _ 100, 소수점 2자리
- 파이차트는 다크모드 지원 라이브러리(recharts, chart.js 등) 사용
- 차트 데이터는 항상 최신 상태로 동기화
- 차트 관련 유틸리티 함수는 app/lib/에 작성

## 예시

```typescript
export function getPortfolioTotal(stocks: Stock[]): number {
  return stocks.reduce((sum, s) => sum + s.currentPrice * s.quantity, 0);
}
```
