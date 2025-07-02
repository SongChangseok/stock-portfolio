// 유틸리티 함수 모음

/**
 * 원화(KRW) 통화 포맷팅
 */
export function formatKRW(value: number): string {
  return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}

/**
 * 소수점 2자리 변환
 */
export function toFixed2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * 수익률 계산 (소수점 2자리)
 */
export function getReturnRate(buyPrice: number, currentPrice: number): number {
  if (buyPrice === 0) return 0;
  return toFixed2(((currentPrice - buyPrice) / buyPrice) * 100);
}
