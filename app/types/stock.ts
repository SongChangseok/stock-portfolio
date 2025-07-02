// 주식 항목 타입 정의
export interface Stock {
  name: string; // 종목명
  ticker?: string; // 미국장일 때만 사용
  buyPrice: number; // 매입가 (KRW, 소수점 2자리)
  currentPrice: number; // 현재가 (KRW, 소수점 2자리)
  quantity: number; // 보유수량
}
