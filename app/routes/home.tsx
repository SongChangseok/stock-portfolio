import React, { useState, useRef } from 'react';
// @ts-ignore
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY';

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

// Alpha Vantage SYMBOL_SEARCH API로 종목 검색
const searchSymbol = async (keyword: string) => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keyword)}&apikey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.bestMatches || [];
  } catch (e) {
    return [];
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

// 포트폴리오 항목 타입 정의
interface PortfolioItem {
  name: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

const Home = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    symbol: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
  });
  // 검색 관련 상태
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFetchPrices = async () => {
    setLoading(true);
    const updated = await Promise.all(
      portfolio.map(async (item) => {
        const price = await fetchCurrentPrice(item.symbol);
        return { ...item, currentPrice: price ?? item.currentPrice };
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

  // 파이차트 라벨: 비율과 티커(symbol) 표시
  const renderPieLabel = (props: any) => {
    const { percent, name, symbol } = props;
    return `${symbol ?? name}: ${(percent * 100).toFixed(0)}%`;
  };

  // 파이차트 툴팁: USD 단위 표시
  const renderPieTooltip = (value: number) => `${value.toLocaleString()} USD`;

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
        currentPrice: newItem.currentPrice ? Number(newItem.currentPrice) : 0,
      },
    ]);
    setNewItem({
      name: '',
      symbol: '',
      quantity: '',
      buyPrice: '',
      currentPrice: '',
    });
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

  // 검색 입력 변경 및 자동 검색
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const results = await searchSymbol(value);
    setSearchResults(results);
    setSearching(false);
  };

  // 검색 결과 클릭 시 입력폼에 자동 채우기
  const handleSearchSelect = (item: any) => {
    setNewItem({
      name: item['2. name'] || '',
      symbol: item['1. symbol'] || '',
      quantity: '',
      buyPrice: '',
      currentPrice: '',
    });
    setSearch(item['2. name'] || '');
    setSearchResults([]);
  };

  // JSON 다운로드
  const handleDownload = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON 업로드
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setPortfolio(json);
        } else {
          alert('올바른 포트폴리오 JSON 파일이 아닙니다.');
        }
      } catch {
        alert('JSON 파싱 오류');
      }
    };
    reader.readAsText(file);
    // 업로드 후 input 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <h2>나의 포트폴리오 (Alpha Vantage 실시간 주가)</h2>
      {/* 업로드/다운로드 버튼 */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleDownload} style={{ marginRight: 8 }}>
          JSON 다운로드
        </button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: 'inline-block' }}
        />
      </div>
      {/* 종목 검색 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="종목명/심볼 검색 (영문)"
          value={search}
          onChange={handleSearchChange}
          style={{ width: 220, marginRight: 8 }}
        />
        {searching && <span style={{ fontSize: 12 }}>검색 중...</span>}
        {searchResults.length > 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #ccc',
              maxHeight: 180,
              overflowY: 'auto',
              position: 'absolute',
              zIndex: 10,
              width: 400,
            }}
          >
            {searchResults.map((item, idx) => (
              <div
                key={item['1. symbol'] + idx}
                style={{
                  padding: 6,
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onClick={() => handleSearchSelect(item)}
              >
                <b>{item['1. symbol']}</b> - {item['2. name']}{' '}
                <span style={{ color: '#888', fontSize: 12 }}>
                  ({item['4. region']})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
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
        <input
          type="number"
          placeholder="현재가 (선택)"
          name="currentPrice"
          value={newItem.currentPrice}
          onChange={(e) =>
            setNewItem({ ...newItem, currentPrice: e.target.value })
          }
          style={{ width: 100 }}
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
            label={renderPieLabel}
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
          <Tooltip formatter={renderPieTooltip} />
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
                    <input
                      name="currentPrice"
                      type="number"
                      value={editItem.currentPrice}
                      onChange={handleEditChange}
                      style={{ width: 90 }}
                    />
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
