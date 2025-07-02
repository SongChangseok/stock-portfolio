import React, { useMemo } from 'react';
import type { Stock } from '../types/stock';
import { getPortfolioTotal, formatKRW } from '../lib/format';

export interface StockPieChartProps {
  stocks: Stock[];
  isLoading?: boolean;
  error?: string;
}

/**
 * 포트폴리오 비중 파이차트 컴포넌트 (recharts 기반)
 */
export const StockPieChart: React.FC<StockPieChartProps> = React.memo(
  ({ stocks, isLoading, error }) => {
    // recharts는 실제 프로젝트에 설치 필요. 여기선 구조만 예시로 작성.
    const total = useMemo(() => getPortfolioTotal(stocks), [stocks]);
    if (isLoading) {
      return (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500">
          차트 로딩 중...
        </div>
      );
    }
    if (error) {
      return <div className="py-8 text-center text-red-500">에러: {error}</div>;
    }
    if (!stocks.length || total === 0) {
      return (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500">
          표시할 데이터가 없습니다.
        </div>
      );
    }
    // recharts PieChart 구조 예시
    return (
      <div className="w-full max-w-md mx-auto">
        {/* 실제 사용시 recharts PieChart로 교체 */}
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">
            [파이차트 자리]
          </span>
        </div>
        <ul className="mt-4 space-y-1">
          {stocks.map((stock) => {
            const value = stock.currentPrice * stock.quantity;
            const percent = Math.round((value / total) * 10000) / 100;
            return (
              <li
                key={stock.ticker || stock.name}
                className="flex justify-between text-sm"
              >
                <span className="font-medium">{stock.name}</span>
                <span>
                  {formatKRW(value)} ({percent}%)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
StockPieChart.displayName = 'StockPieChart';
