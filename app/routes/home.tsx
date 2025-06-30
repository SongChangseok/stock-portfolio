import React, { useState } from 'react';
// @ts-ignore
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY';

const initialPortfolio = [
  {
    name: 'Apple',
    symbol: 'AAPL',
    quantity: 10,
    buyPrice: 170,
    currentPrice: 0,
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    quantity: 5,
    buyPrice: 320,
    currentPrice: 0,
  },
];

const fetchCurrentPrice = async (symbol: string) => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const price = data['Global Quote']?.['05. price'];
    return price ? parseFloat(price) : null;
  } catch (e) {
    return null;
  }
};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28BFE',
  '#FF6699',
];

const Home = () => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    symbol: '',
    quantity: '',
    buyPrice: '',
  });

  const handleFetchPrices = async () => {
    setLoading(true);
    const updated = await Promise.all(
      portfolio.map(async (item) => {
        const price = await fetchCurrentPrice(item.symbol);
        return { ...item, currentPrice: price ?? 0 };
      }),
    );
    setPortfolio(updated);
    setLoading(false);
  };

  // 파이차트용 데이터: 보유수량 * 현재가 (현재가 없으면 0)
  const pieData = portfolio.map((item) => ({
    name: item.name,
    symbol: item.symbol,
    value: item.quantity * (item.currentPrice || 0),
  }));

  // value가 모두 0이면 차트 표시 안함
  const hasPieData = pieData.some((d) => d.value > 0);

  // label의 타입 명시 (any로 지정)
  const renderLabel = (props: any) => {
    const { name, percent } = props;
    return `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`;
  };

  // 추가
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newItem.name ||
      !newItem.symbol ||
      !newItem.quantity ||
      !newItem.buyPrice
    )
      return;
    setPortfolio([
      ...portfolio,
      {
        name: newItem.name,
        symbol: newItem.symbol.toUpperCase(),
        quantity: Number(newItem.quantity),
        buyPrice: Number(newItem.buyPrice),
        currentPrice: 0,
      },
    ]);
    setNewItem({ name: '', symbol: '', quantity: '', buyPrice: '' });
  };

  // 삭제
  const handleDelete = (idx: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== idx));
  };

  // 수정 시작
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditItem({ ...portfolio[idx] });
  };

  // 수정 입력 변경
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: name === 'symbol' ? value.toUpperCase() : value,
    });
  };

  // 수정 저장
  const handleEditSave = (idx: number) => {
    const updated = [...portfolio];
    updated[idx] = {
      ...editItem,
      quantity: Number(editItem.quantity),
      buyPrice: Number(editItem.buyPrice),
    };
    setPortfolio(updated);
    setEditIdx(null);
    setEditItem(null);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditIdx(null);
    setEditItem(null);
  };

  return (
    <div>
      <h2>나의 포트폴리오 (Alpha Vantage 실시간 주가)</h2>
      {/* 추가 폼 */}
      <form
        onSubmit={handleAdd}
        style={{
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="종목명"
          name="name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={{ width: 100 }}
        />
        <input
          type="text"
          placeholder="심볼"
          name="symbol"
          value={newItem.symbol}
          onChange={(e) =>
            setNewItem({ ...newItem, symbol: e.target.value.toUpperCase() })
          }
          style={{ width: 80, textTransform: 'uppercase' }}
        />
        <input
          type="number"
          placeholder="수량"
          name="quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          style={{ width: 60 }}
        />
        <input
          type="number"
          placeholder="매입가"
          name="buyPrice"
          value={newItem.buyPrice}
          onChange={(e) => setNewItem({ ...newItem, buyPrice: e.target.value })}
          style={{ width: 80 }}
        />
        <button type="submit">추가</button>
      </form>
      <button
        onClick={handleFetchPrices}
        disabled={loading}
        style={{ marginBottom: 12, padding: '8px 16px' }}
      >
        {loading ? '조회 중...' : '실시간 주가 조회'}
      </button>
      {/* 파이차트: 데이터가 있을 때만 표시 */}
      {hasPieData && (
        <PieChart width={400} height={300} style={{ margin: '0 auto' }}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            nameKey="symbol"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
      <table
        border={1}
        cellPadding={8}
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th>종목명</th>
            <th>심볼</th>
            <th>보유수량</th>
            <th>매입가</th>
            <th>현재가</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item, idx) => (
            <tr key={idx}>
              {editIdx === idx ? (
                <>
                  <td>
                    <input
                      name="name"
                      value={editItem.name}
                      onChange={handleEditChange}
                      style={{ width: 80 }}
                    />
                  </td>
                  <td>
                    <input
                      name="symbol"
                      value={editItem.symbol}
                      onChange={handleEditChange}
                      style={{ width: 60, textTransform: 'uppercase' }}
                    />
                  </td>
                  <td>
                    <input
                      name="quantity"
                      type="number"
                      value={editItem.quantity}
                      onChange={handleEditChange}
                      style={{ width: 50 }}
                    />
                  </td>
                  <td>
                    <input
                      name="buyPrice"
                      type="number"
                      value={editItem.buyPrice}
                      onChange={handleEditChange}
                      style={{ width: 70 }}
                    />
                  </td>
                  <td>
                    {item.currentPrice
                      ? item.currentPrice.toLocaleString() + ' USD'
                      : '-'}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditSave(idx)}
                      style={{ marginRight: 4 }}
                    >
                      저장
                    </button>
                    <button onClick={handleEditCancel}>취소</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td>{item.quantity}</td>
                  <td>{item.buyPrice.toLocaleString()} USD</td>
                  <td>
                    {item.currentPrice
                      ? item.currentPrice.toLocaleString() + ' USD'
                      : '-'}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(idx)}
                      style={{ marginRight: 4 }}
                    >
                      수정
                    </button>
                    <button onClick={() => handleDelete(idx)}>삭제</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: '0.9em', color: '#888', marginTop: 8 }}>
        * Alpha Vantage 무료 API는 분당 5회, 하루 500회 제한이 있습니다.
        <br />* 한국 주식은 지원하지 않습니다. (미국 주식 심볼만 가능)
      </p>
    </div>
  );
};

export default Home;
