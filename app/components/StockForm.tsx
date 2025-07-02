import React, { useState, useCallback } from 'react';
import type { Stock } from '../types/stock';

export interface StockFormProps {
  initial?: Partial<Stock>;
  onSubmit: (stock: Stock) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * 주식 항목 생성/수정 폼 컴포넌트
 */
export const StockForm: React.FC<StockFormProps> = React.memo(
  ({ initial = {}, onSubmit, onCancel, isLoading, error }) => {
    const [form, setForm] = useState<Stock>({
      name: initial.name || '',
      ticker: initial.ticker || '',
      buyPrice: initial.buyPrice ?? 0,
      currentPrice: initial.currentPrice ?? 0,
      quantity: initial.quantity ?? 0,
    });
    const handleChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >((e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: name === 'name' || name === 'ticker' ? value : Number(value),
      }));
    }, []);
    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
      },
      [form, onSubmit],
    );
    return (
      <form
        className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow flex flex-col gap-3"
        onSubmit={handleSubmit}
        aria-label="주식 항목 입력 폼"
      >
        <label className="flex flex-col gap-1">
          <span>종목명</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input input-bordered"
            aria-required="true"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>티커(선택)</span>
          <input
            name="ticker"
            value={form.ticker}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>매입가 (KRW)</span>
          <input
            name="buyPrice"
            type="number"
            step="0.01"
            min="0"
            value={form.buyPrice}
            onChange={handleChange}
            required
            className="input input-bordered"
            aria-required="true"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>현재가 (KRW)</span>
          <input
            name="currentPrice"
            type="number"
            step="0.01"
            min="0"
            value={form.currentPrice}
            onChange={handleChange}
            required
            className="input input-bordered"
            aria-required="true"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>보유수량</span>
          <input
            name="quantity"
            type="number"
            step="1"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            required
            className="input input-bordered"
            aria-required="true"
          />
        </label>
        {error && <div className="text-red-500 text-sm">에러: {error}</div>}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? '저장 중...' : '저장'}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary flex-1"
              onClick={onCancel}
            >
              취소
            </button>
          )}
        </div>
      </form>
    );
  },
);
StockForm.displayName = 'StockForm';
