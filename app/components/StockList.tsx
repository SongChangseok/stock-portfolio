import React from 'react';
import type { Stock } from 'app/types/stock';
import { formatKRW, getReturnRate } from 'app/lib/format';

export interface StockListProps {
  stocks: Stock[];
  isLoading?: boolean;
  error?: string;
  onEdit?: (stock: Stock) => void;
  onDelete?: (stock: Stock) => void;
}

/**
 * 주식 항목 리스트를 표시하는 컴포넌트
 */
export const StockList: React.FC<StockListProps> = React.memo(
  ({ stocks, isLoading, error, onEdit, onDelete }) => {
    if (isLoading) {
      return (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500">
          로딩 중...
        </div>
      );
    }
    if (error) {
      return <div className="py-8 text-center text-red-500">에러: {error}</div>;
    }
    if (!stocks.length) {
      return (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500">
          보유한 주식이 없습니다.
        </div>
      );
    }
    return (
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2">종목명</th>
              <th className="px-3 py-2">티커</th>
              <th className="px-3 py-2">매입가</th>
              <th className="px-3 py-2">현재가</th>
              <th className="px-3 py-2">수익률</th>
              <th className="px-3 py-2">보유수량</th>
              <th className="px-3 py-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const returnRate = getReturnRate(
                stock.buyPrice,
                stock.currentPrice,
              );
              const isProfit = returnRate >= 0;
              return (
                <tr
                  key={stock.ticker || stock.name}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-3 py-2 font-medium">{stock.name}</td>
                  <td className="px-3 py-2">{stock.ticker || '-'}</td>
                  <td className="px-3 py-2">{formatKRW(stock.buyPrice)}</td>
                  <td className="px-3 py-2">{formatKRW(stock.currentPrice)}</td>
                  <td
                    className={
                      'px-3 py-2 font-semibold ' +
                      (isProfit
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400')
                    }
                  >
                    {returnRate > 0 ? '+' : ''}
                    {returnRate}%
                  </td>
                  <td className="px-3 py-2">{stock.quantity}</td>
                  <td className="px-3 py-2 flex gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        aria-label="수정"
                        className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                        onClick={() => onEdit(stock)}
                      >
                        수정
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        aria-label="삭제"
                        className="px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                        onClick={() => onDelete(stock)}
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);
StockList.displayName = 'StockList';
