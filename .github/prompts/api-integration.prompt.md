# API 통합 가이드

주식 데이터 API 통합 시 다음 패턴을 따라주세요:

## API 클라이언트 구조

- `app/lib/api/` 디렉토리에 API 함수들 정의
- TypeScript 타입 정의 필수
- 에러 처리 및 재시도 로직 포함

## 데이터 fetching 패턴

- React Router의 loader 함수 활용
- 캐싱 전략 적용
- 로딩 상태 관리

## 주식 API 특화 요구사항

- 실시간 가격 업데이트 처리
- 시장 개장/폐장 시간 고려
- Rate limiting 준수
- 데이터 정규화

## 예시 구조

```typescript
// types
interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// API 함수
export async function fetchStockData(symbol: string): Promise {
  // 구현
}

// Loader 함수
export async function stockLoader({ params }: LoaderFunctionArgs) {
  const data = await fetchStockData(params.symbol);
  return data;
}
```

## 에러 처리

- 네트워크 에러 처리
- API 응답 검증
- 사용자 친화적 에러 메시지
- 재시도 메커니즘

## 보안 고려사항

- API 키 환경변수 관리
- 클라이언트 사이드 검증
- CORS 설정
