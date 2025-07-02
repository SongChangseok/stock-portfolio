import React, { useState, useCallback } from 'react';
import { StockList } from 'app/components/StockList';
import { StockForm } from 'app/components/StockForm';
import { StockPieChart } from 'app/components/StockPieChart';
import type { Stock } from 'app/types/stock';

/**
 * 주식 포트폴리오 CRUD 및 시각화 메인 페이지
 */
export default function PortfolioPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [editing, setEditing] = useState<Stock | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  // 항목 추가/수정
  const handleSubmit = useCallback(
    (stock: Stock) => {
      setError(undefined);
      setLoading(true);
      setTimeout(() => {
        setStocks((prev) => {
          // 수정 모드: ticker 또는 name이 일치하면 교체
          if (editing) {
            return prev.map((s) =>
              (s.ticker && s.ticker === editing.ticker) ||
              (!s.ticker && s.name === editing.name)
                ? { ...stock }
                : s,
            );
          }
          // 추가 모드: 새 항목 추가
          return [...prev, stock];
        });
        setEditing(null);
        setFormOpen(false);
        setLoading(false);
      }, 400); // mock async
    },
    [editing],
  );

  // 항목 삭제
  const handleDelete = useCallback((stock: Stock) => {
    setStocks((prev) =>
      prev.filter(
        (s) =>
          (s.ticker && s.ticker !== stock.ticker) ||
          (!s.ticker && s.name !== stock.name),
      ),
    );
  }, []);

  // 항목 수정 시작
  const handleEdit = useCallback((stock: Stock) => {
    setEditing(stock);
    setFormOpen(true);
  }, []);

  // 폼 닫기
  const handleCancel = useCallback(() => {
    setEditing(null);
    setFormOpen(false);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">주식 포트폴리오</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <StockList
            stocks={stocks}
            isLoading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <button
            className="mt-4 btn btn-primary w-full"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            + 새 주식 추가
          </button>
        </div>
        <div className="flex-1">
          <StockPieChart stocks={stocks} isLoading={loading} error={error} />
        </div>
      </div>
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
            <StockForm
              initial={editing || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}
