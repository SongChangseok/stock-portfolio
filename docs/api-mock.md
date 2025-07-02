# API/Mock 데이터 명세

## 1. Mock 데이터 예시

```json
[
  {
    "name": "삼성전자",
    "ticker": "005930.KS",
    "buyPrice": 70000,
    "currentPrice": 80000,
    "quantity": 10
  },
  {
    "name": "Apple",
    "ticker": "AAPL",
    "buyPrice": 150,
    "currentPrice": 180,
    "quantity": 5
  }
]
```

## 2. API 명세 예시

- GET /api/stocks: 전체 목록 조회
- POST /api/stocks: 항목 추가
- PUT /api/stocks/:id: 항목 수정
- DELETE /api/stocks/:id: 항목 삭제

## 3. 응답 예시

```json
{
  "success": true,
  "data": [
    /* ... */
  ]
}
```
