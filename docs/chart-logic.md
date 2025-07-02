# 차트/비즈니스 로직 상세

## 1. 파이차트 비중 계산

- 각 종목의 (현재가 \* 보유수량) 합계로 전체 포트폴리오 총액 계산
- 각 종목의 비중 = (해당 종목 평가금액 / 총액) \* 100
- 소수점 2자리, 원화 포맷 적용

## 2. 예시 코드

```typescript
export function getPortfolioTotal(stocks: Stock[]): number {
  return stocks.reduce((sum, s) => sum + s.currentPrice * s.quantity, 0);
}

export function getStockWeight(stocks: Stock[], stock: Stock): number {
  const total = getPortfolioTotal(stocks);
  if (total === 0) return 0;
  return (
    Math.round(((stock.currentPrice * stock.quantity) / total) * 10000) / 100
  );
}
```

## 3. 차트 라이브러리

- recharts, chart.js 등에서 파이차트 컴포넌트 활용
- 다크모드 지원 여부 확인
