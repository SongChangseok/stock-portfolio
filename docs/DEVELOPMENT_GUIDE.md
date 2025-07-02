# 개발 가이드라인 (Development Guidelines)

# 주식 포트폴리오 관리 애플리케이션

**문서 버전**: v1.0  
**작성일**: 2025년 7월 2일  
**관련 문서**: [PRD.md](./PRD.md), [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md)

---

## 📋 목차

1. [개발 환경 설정](#개발-환경-설정)
2. [코딩 스타일 가이드](#코딩-스타일-가이드)
3. [컴포넌트 개발 규칙](#컴포넌트-개발-규칙)
4. [상태 관리 패턴](#상태-관리-패턴)
5. [성능 최적화 가이드](#성능-최적화-가이드)
6. [테스팅 가이드](#테스팅-가이드)
7. [Git 워크플로우](#git-워크플로우)
8. [배포 프로세스](#배포-프로세스)
9. [문제 해결 가이드](#문제-해결-가이드)

---

## 개발 환경 설정

### 필수 도구

- **Node.js**: 20.x 이상
- **npm**: 10.x 이상
- **VS Code**: 최신 버전 (권장)

### VS Code 확장 프로그램

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

### 개발 환경 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 추가 패키지 설치
npm install lucide-react @headlessui/react

# 3. 개발 서버 실행
npm run dev

# 4. 타입 체크
npm run typecheck

# 5. 빌드 테스트
npm run build
```

### 환경 변수 설정

```bash
# .env.local (로컬 개발용)
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=Stock Portfolio Manager
VITE_DEBUG_MODE=true
```

---

## 코딩 스타일 가이드

### TypeScript 스타일

```typescript
// ✅ Good: 명확한 타입 정의
interface StockFormProps {
  stock?: Stock;
  onSubmit: (data: StockFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// ✅ Good: 함수형 컴포넌트 with explicit return type
export const StockForm: React.FC<StockFormProps> = ({
  stock,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  // Component logic
  return <div>...</div>;
};

// ❌ Bad: any 타입 사용
const handleSubmit = (data: any) => { ... };

// ❌ Bad: 타입 정의 없음
export const StockForm = ({ stock, onSubmit }) => { ... };
```

### 네이밍 컨벤션

```typescript
// 컴포넌트: PascalCase
export const StockListItem = () => { ... };

// 훅: use prefix + camelCase
export const usePortfolio = () => { ... };

// 타입/인터페이스: PascalCase
interface StockData { ... }
type SortDirection = 'asc' | 'desc';

// 상수: SCREAMING_SNAKE_CASE
export const STORAGE_KEYS = {
  STOCKS: 'stocks',
  PREFERENCES: 'user_preferences',
} as const;

// 함수/변수: camelCase
const calculateTotalValue = (stocks: Stock[]) => { ... };
const isValidStock = true;
```

### 파일 구조 규칙

```
// 파일명: kebab-case
stock-form.tsx          // ❌ Bad
StockForm.tsx          // ✅ Good
stock_form.tsx         // ❌ Bad

// 폴더명: kebab-case
portfolioComponents/   // ❌ Bad
portfolio-components/  // ✅ Good
portfolio_components/  // ❌ Bad
```

### Import/Export 규칙

```typescript
// ✅ Good: Named exports 우선
export const StockForm = () => { ... };
export const useStockForm = () => { ... };

// ✅ Good: 타입은 type-only import
import type { Stock, Portfolio } from '~/types';

// ✅ Good: 그룹별 import 정렬
import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon } from 'lucide-react';

import { Button, Modal } from '~/components/ui';
import { usePortfolio } from '~/hooks';
import type { Stock } from '~/types';

// ❌ Bad: default export 남발
export default StockForm;

// ❌ Bad: 혼재된 import
import { useState } from 'react';
import type { Stock } from '~/types';
import React from 'react';
```

### Prettier 설정

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

## 컴포넌트 개발 규칙

### 컴포넌트 구조

```typescript
// 1. Imports (순서대로)
import React, { useState, useCallback } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button, Input } from '~/components/ui';
import { usePortfolio } from '~/hooks';
import type { Stock, StockFormData } from '~/types';

// 2. Types/Interfaces
interface StockFormProps {
  stock?: Stock;
  onSubmit: (data: StockFormData) => void;
  onCancel: () => void;
}

// 3. Component
export const StockForm: React.FC<StockFormProps> = ({
  stock,
  onSubmit,
  onCancel,
}) => {
  // 4. State
  const [formData, setFormData] = useState<StockFormData>({
    symbol: stock?.symbol ?? '',
    name: stock?.name ?? '',
    shares: stock?.shares?.toString() ?? '',
    avgPrice: stock?.avgPrice?.toString() ?? '',
  });

  // 5. Custom hooks
  const { addStock, updateStock } = usePortfolio();

  // 6. Event handlers
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  // 7. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 8. Render helpers (if needed)
  const renderFormField = (label: string, value: string) => (
    <Input label={label} value={value} onChange={setValue} />
  );

  // 9. JSX
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
};
```

### Props 설계 원칙

```typescript
// ✅ Good: 명확한 책임 분리
interface StockListProps {
  stocks: Stock[]; // Data
  onEdit: (stock: Stock) => void; // Actions
  onDelete: (id: string) => void; // Actions
  isLoading?: boolean; // State
  className?: string; // Styling
}

// ✅ Good: Optional props with defaults
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Default in component
  size?: 'sm' | 'md' | 'lg'; // Default in component
  disabled?: boolean; // Default: false
}

// ❌ Bad: 너무 많은 props
interface BadComponentProps {
  data: any;
  config: any;
  handlers: any;
  styles: any;
  flags: any;
  // ... 10+ more props
}
```

### 조건부 렌더링

```typescript
// ✅ Good: Early return for loading/error states
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

if (stocks.length === 0) {
  return <EmptyState message="주식을 추가해보세요." />;
}

// ✅ Good: 논리 연산자 활용
return (
  <div>
    {hasData && <DataComponent data={data} />}
    {showModal && <Modal onClose={closeModal} />}
  </div>
);

// ❌ Bad: 삼항 연산자 중첩
return (
  <div>
    {isLoading ? (
      <LoadingSpinner />
    ) : error ? (
      <ErrorMessage />
    ) : data.length === 0 ? (
      <EmptyState />
    ) : (
      <DataList data={data} />
    )}
  </div>
);
```

---

## 상태 관리 패턴

### 커스텀 훅 패턴

```typescript
// ✅ Good: 단일 책임 원칙
export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addStock = useCallback((stockData: StockInput) => {
    const newStock: Stock = {
      ...stockData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStocks((prev) => [...prev, newStock]);
  }, []);

  return {
    stocks,
    isLoading,
    addStock,
    // ... other methods
  };
};

// ✅ Good: 상태와 파생 데이터 분리
export const usePortfolioSummary = (stocks: Stock[]) => {
  return useMemo(() => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.totalValue, 0);
    const stockCount = stocks.length;

    return { totalValue, stockCount };
  }, [stocks]);
};
```

### 로컬 스토리지 패턴

```typescript
// ✅ Good: 타입 안전한 localStorage 훅
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error saving to localStorage:`, error);
      }
    },
    [key],
  );

  return [value, setStoredValue];
};
```

### 폼 상태 관리

```typescript
// ✅ Good: 제네릭 폼 훅
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: ValidationSchema<T>,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        validateField(field, value);
      }
    },
    [touched, validationSchema],
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, values[field]);
    },
    [values, validationSchema],
  );

  // ... validation logic

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid: Object.keys(errors).length === 0,
  };
};
```

---

## 성능 최적화 가이드

### 메모이제이션 전략

```typescript
// ✅ Good: 비싼 계산 메모이제이션
const portfolioSummary = useMemo(() => {
  return calculatePortfolioSummary(stocks);
}, [stocks]);

// ✅ Good: 컴포넌트 메모이제이션
export const StockListItem = memo(({ stock, onEdit, onDelete }: Props) => {
  return (
    <div className="stock-item">
      {/* Component content */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return prevProps.stock.updatedAt === nextProps.stock.updatedAt;
});

// ✅ Good: 콜백 메모이제이션
const handleEdit = useCallback((stock: Stock) => {
  setEditingStock(stock);
  setShowEditModal(true);
}, []);

// ❌ Bad: 불필요한 메모이제이션
const simpleValue = useMemo(() => props.value, [props.value]); // Just use props.value directly
```

### 렌더링 최적화

```typescript
// ✅ Good: 조건부 렌더링 최적화
const StockList = ({ stocks, filter }: Props) => {
  const filteredStocks = useMemo(() => {
    return stocks.filter(stock =>
      stock.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [stocks, filter]);

  return (
    <div>
      {filteredStocks.map(stock => (
        <StockListItem key={stock.id} stock={stock} />
      ))}
    </div>
  );
};

// ✅ Good: 가상화 (대량 데이터 시)
import { FixedSizeList as List } from 'react-window';

const VirtualizedStockList = ({ stocks }: Props) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <StockListItem stock={stocks[index]} />
    </div>
  );

  return (
    <List
      height={400}
      itemCount={stocks.length}
      itemSize={80}
    >
      {Row}
    </List>
  );
};
```

### 번들 크기 최적화

```typescript
// ✅ Good: Tree-shaking 친화적 import
import { PlusIcon, EditIcon } from 'lucide-react';

// ✅ Good: 조건부 import
const DevTools =
  process.env.NODE_ENV === 'development'
    ? lazy(() => import('./DevTools'))
    : null;

// ✅ Good: 동적 import
const handleExport = async () => {
  const { exportToCSV } = await import('~/utils/export');
  exportToCSV(data);
};

// ❌ Bad: 전체 라이브러리 import
import * as LucideIcons from 'lucide-react';
import _ from 'lodash'; // Use lodash-es or specific functions
```

---

## 테스팅 가이드

### 컴포넌트 테스트

```typescript
// StockForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StockForm } from '../StockForm';

describe('StockForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', () => {
    render(<StockForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/종목 코드/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/종목명/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/보유 수량/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/평균 매입가/i)).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<StockForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.click(screen.getByRole('button', { name: /저장/i }));

    expect(screen.getByText('종목 코드를 입력해주세요.')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit valid form data', async () => {
    const user = userEvent.setup();
    render(<StockForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/종목 코드/i), 'AAPL');
    await user.type(screen.getByLabelText(/종목명/i), 'Apple Inc.');
    await user.type(screen.getByLabelText(/보유 수량/i), '10');
    await user.type(screen.getByLabelText(/평균 매입가/i), '150');

    await user.click(screen.getByRole('button', { name: /저장/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: '10',
        avgPrice: '150',
      });
    });
  });
});
```

### 훅 테스트

```typescript
// usePortfolio.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePortfolio } from '../usePortfolio';

describe('usePortfolio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty portfolio', () => {
    const { result } = renderHook(() => usePortfolio());

    expect(result.current.stocks).toEqual([]);
    expect(result.current.totalValue).toBe(0);
  });

  it('should add stock correctly', () => {
    const { result } = renderHook(() => usePortfolio());

    act(() => {
      result.current.addStock({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 10,
        avgPrice: 150,
        totalValue: 1500,
        color: '#3B82F6',
      });
    });

    expect(result.current.stocks).toHaveLength(1);
    expect(result.current.stocks[0].symbol).toBe('AAPL');
    expect(result.current.totalValue).toBe(1500);
  });

  it('should persist data to localStorage', () => {
    const { result } = renderHook(() => usePortfolio());

    act(() => {
      result.current.addStock({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 10,
        avgPrice: 150,
        totalValue: 1500,
        color: '#3B82F6',
      });
    });

    const storedData = JSON.parse(localStorage.getItem('stocks') || '[]');
    expect(storedData).toHaveLength(1);
    expect(storedData[0].symbol).toBe('AAPL');
  });
});
```

### 통합 테스트

```typescript
// Portfolio.integration.test.tsx
describe('Portfolio Management Integration', () => {
  it('should complete full CRUD workflow', async () => {
    const user = userEvent.setup();
    render(<App />);

    // 초기 상태 확인
    expect(screen.getByText(/포트폴리오가 비어있습니다/i)).toBeInTheDocument();

    // 주식 추가
    await user.click(screen.getByRole('button', { name: /주식 추가/i }));
    await user.type(screen.getByLabelText(/종목 코드/i), 'AAPL');
    await user.type(screen.getByLabelText(/종목명/i), 'Apple Inc.');
    await user.type(screen.getByLabelText(/보유 수량/i), '10');
    await user.type(screen.getByLabelText(/평균 매입가/i), '150');
    await user.click(screen.getByRole('button', { name: /저장/i }));

    // 추가된 주식 확인
    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    });

    // 차트 렌더링 확인
    expect(screen.getByRole('img', { name: /포트폴리오 차트/i })).toBeInTheDocument();

    // 주식 수정
    await user.click(screen.getByLabelText(/수정/i));
    await user.clear(screen.getByLabelText(/보유 수량/i));
    await user.type(screen.getByLabelText(/보유 수량/i), '20');
    await user.click(screen.getByRole('button', { name: /저장/i }));

    // 수정 확인
    await waitFor(() => {
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    // 주식 삭제
    await user.click(screen.getByLabelText(/삭제/i));
    await user.click(screen.getByRole('button', { name: /확인/i }));

    // 삭제 확인
    await waitFor(() => {
      expect(screen.getByText(/포트폴리오가 비어있습니다/i)).toBeInTheDocument();
    });
  });
});
```

---

## Git 워크플로우

### 브랜치 전략

```bash
# 메인 브랜치
main            # 배포 가능한 코드
develop         # 개발 통합 브랜치

# 기능 브랜치
feature/add-stock-form
feature/portfolio-chart
feature/dark-theme

# 수정 브랜치
fix/chart-rendering-bug
fix/localStorage-error

# 릴리스 브랜치
release/v1.0.0
```

### 커밋 메시지 규칙

```bash
# 타입: 제목 (50자 이내)
#
# 본문 (72자 이내로 줄바꿈)
#
# 꼬리말 (이슈 번호, 브레이킹 체인지 등)

# 타입 종류
feat:     새로운 기능 추가
fix:      버그 수정
docs:     문서 수정
style:    코드 스타일 변경 (포맷팅, 세미콜론 등)
refactor: 코드 리팩토링
test:     테스트 코드 추가/수정
chore:    빌드 관련, 패키지 설정 등

# 예시
feat: 주식 추가 폼 컴포넌트 구현

사용자가 새로운 주식을 포트폴리오에 추가할 수 있는
폼 컴포넌트를 구현했습니다.

- 입력 검증 기능 추가
- 에러 상태 처리
- 반응형 디자인 적용

Closes #123
```

### Pull Request 가이드

```markdown
## 변경 사항

- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 문서 업데이트

## 설명

이 PR은 주식 포트폴리오 차트 컴포넌트를 구현합니다.

### 구현 내용

- Recharts를 이용한 파이차트 구현
- 반응형 디자인 적용
- 색상 테마 통일

### 테스트

- [ ] 단위 테스트 작성/업데이트
- [ ] 통합 테스트 확인
- [ ] 수동 테스트 완료

### 스크린샷

![차트 스크린샷](screenshot.png)

### 체크리스트

- [ ] 코드 리뷰 준비 완료
- [ ] 테스트 통과
- [ ] 타입 체크 통과
- [ ] 빌드 성공
- [ ] 문서 업데이트

Closes #456
```

---

## 배포 프로세스

### 로컬 빌드 검증

```bash
# 1. 린트 체크
npm run lint

# 2. 타입 체크
npm run typecheck

# 3. 테스트 실행
npm run test

# 4. 빌드
npm run build

# 5. 빌드 결과 확인
npm run preview
```

### Docker 배포

```bash
# 1. Docker 이미지 빌드
docker build -t stock-portfolio:latest .

# 2. 로컬 테스트
docker run -p 3000:80 stock-portfolio:latest

# 3. 이미지 최적화 확인
docker images | grep stock-portfolio
```

### 환경별 설정

```typescript
// config/environments.ts
export const environments = {
  development: {
    API_URL: 'http://localhost:3000',
    DEBUG: true,
    STORAGE_PREFIX: 'dev_',
  },
  production: {
    API_URL: 'https://api.portfolio.com',
    DEBUG: false,
    STORAGE_PREFIX: 'prod_',
  },
} as const;

export const config = environments[process.env.NODE_ENV || 'development'];
```

---

## 문제 해결 가이드

### 일반적인 문제들

#### 1. TypeScript 에러

```typescript
// 문제: Property 'xxx' does not exist on type 'yyy'
// 해결: 타입 정의 확인 및 수정

// Before
const stock = data.stock; // Error: Property 'stock' does not exist

// After
interface ApiResponse {
  stock: Stock;
  success: boolean;
}
const response = data as ApiResponse;
const stock = response.stock;
```

#### 2. 상태 업데이트 문제

```typescript
// 문제: 상태가 업데이트되지 않음
// 해결: 불변성 유지

// Before ❌
const addStock = (newStock: Stock) => {
  stocks.push(newStock); // 원본 배열 변경
  setStocks(stocks);
};

// After ✅
const addStock = (newStock: Stock) => {
  setStocks((prev) => [...prev, newStock]); // 새 배열 생성
};
```

#### 3. 성능 문제

```typescript
// 문제: 불필요한 리렌더링
// 해결: 메모이제이션 적용

// Before ❌
const StockList = ({ stocks, onEdit }) => {
  const sortedStocks = stocks.sort((a, b) => a.name.localeCompare(b.name));
  return <div>{/* render stocks */}</div>;
};

// After ✅
const StockList = ({ stocks, onEdit }) => {
  const sortedStocks = useMemo(
    () => stocks.sort((a, b) => a.name.localeCompare(b.name)),
    [stocks]
  );
  return <div>{/* render stocks */}</div>;
};
```

#### 4. LocalStorage 문제

```typescript
// 문제: JSON parse 에러
// 해결: 에러 핸들링 추가

// Before ❌
const loadStocks = () => {
  const data = localStorage.getItem('stocks');
  return JSON.parse(data); // 에러 가능성
};

// After ✅
const loadStocks = (): Stock[] => {
  try {
    const data = localStorage.getItem('stocks');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load stocks from localStorage:', error);
    return [];
  }
};
```

### 디버깅 도구

```typescript
// React DevTools 활용
const StockForm = (props) => {
  // DevTools에서 확인 가능
  useDebugValue(props.stock ? 'editing' : 'creating');

  return <form>{/* form content */}</form>;
};

// 커스텀 디버그 훅
const useDebugRender = (name: string, props: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} rendered with:`, props);
    }
  });
};

// 성능 측정
const usePerformanceLogger = (name: string) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${name} render time: ${end - start}ms`);
    };
  });
};
```

### 일반적인 워크플로우

1. **문제 재현**: 최소한의 케이스로 문제 재현
2. **로그 확인**: Console, Network, React DevTools 확인
3. **타입 검증**: TypeScript 에러 먼저 해결
4. **상태 추적**: React DevTools로 상태 변경 확인
5. **성능 분석**: React Profiler로 성능 병목 확인
6. **테스트**: 수정 후 관련 테스트 실행

---

## 개발 팁

### VS Code 스니펫

```json
// .vscode/snippets.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({",
      "  $3",
      "}) => {",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "};"
    ],
    "description": "React Functional Component with TypeScript"
  },

  "Custom Hook": {
    "prefix": "hook",
    "body": [
      "import { useState, useCallback } from 'react';",
      "",
      "export const use${1:HookName} = () => {",
      "  const [${2:state}, set${2/(.*)/${1:/capitalize}/}] = useState($3);",
      "",
      "  const handle${4:Action} = useCallback(() => {",
      "    $5",
      "  }, []);",
      "",
      "  return {",
      "    ${2:state},",
      "    handle${4:Action},",
      "  };",
      "};"
    ],
    "description": "Custom React Hook"
  }
}
```

### 유용한 명령어

```bash
# 개발 중 자주 사용하는 명령어들
npm run dev           # 개발 서버 실행
npm run typecheck     # 타입 체크만 실행
npm run build         # 프로덕션 빌드
npm run preview       # 빌드 결과 미리보기

# 의존성 관리
npm outdated          # 업데이트 가능한 패키지 확인
npm audit             # 보안 취약점 확인
npm audit fix         # 자동 보안 수정

# Git 단축 명령어
git status            # 상태 확인
git add .             # 모든 변경사항 스테이징
git commit -m "msg"   # 커밋
git push origin HEAD  # 현재 브랜치 푸시
```

---

이 가이드는 개발 진행에 따라 지속적으로 업데이트되며, 팀 내 모든 개발자가 일관된 코드 품질을 유지할 수 있도록 돕습니다.
