# 기술 사양서 (Technical Specification)

# 주식 포트폴리오 관리 애플리케이션

**문서 버전**: v1.0  
**작성일**: 2025년 7월 2일  
**관련 문서**: [PRD.md](./PRD.md)

---

## 📋 목차

1. [시스템 아키텍처](#시스템-아키텍처)
2. [데이터 모델](#데이터-모델)
3. [컴포넌트 설계](#컴포넌트-설계)
4. [상태 관리](#상태-관리)
5. [API 설계](#api-설계)
6. [파일 구조](#파일-구조)
7. [빌드 및 배포](#빌드-및-배포)
8. [성능 최적화](#성능-최적화)
9. [보안 고려사항](#보안-고려사항)

---

## 시스템 아키텍처

### 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Browser                               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │   React App     │  │  LocalStorage   │              │
│  │                 │  │                 │              │
│  │  ┌───────────┐  │  │  ┌───────────┐  │              │
│  │  │Components │  │  │  │Stock Data │  │              │
│  │  └───────────┘  │  │  └───────────┘  │              │
│  │  ┌───────────┐  │  │  ┌───────────┐  │              │
│  │  │   Hooks   │  │  │  │User Prefs │  │              │
│  │  └───────────┘  │  │  └───────────┘  │              │
│  │  ┌───────────┐  │  │                 │              │
│  │  │  Utils    │  │  │                 │              │
│  │  └───────────┘  │  │                 │              │
│  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 기술 스택

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Routing**: React Router 7.5.3
- **Styling**: TailwindCSS 4.1.4
- **Charts**: Recharts 3.0.2
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **Build Tool**: Vite 6.3.3
- **Storage**: Browser LocalStorage

---

## 데이터 모델

### Core Types

```typescript
// app/types/stock.ts

export interface Stock {
  id: string; // UUID v4
  symbol: string; // 종목 코드 (예: "AAPL")
  name: string; // 종목명 (예: "Apple Inc.")
  shares: number; // 보유 수량
  avgPrice: number; // 평균 매입가
  currentPrice?: number; // 현재가 (선택사항)
  totalValue: number; // 총 평가금액 (shares * avgPrice)
  color: string; // 차트 색상 (hex)
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  name: string;
  stocks: Stock[];
  totalValue: number; // 포트폴리오 총 평가금액
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioSummary {
  totalValue: number;
  totalStocks: number;
  largestHolding: {
    stock: Stock;
    percentage: number;
  };
  smallestHolding: {
    stock: Stock;
    percentage: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
```

### Utility Types

```typescript
// app/types/common.ts

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'symbol' | 'totalValue' | 'percentage';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  symbol: string;
  name: string;
  shares: string;
  avgPrice: string;
}
```

---

## 컴포넌트 설계

### Component Tree

```
App
├── Layout
│   ├── Header
│   └── Main
│       ├── PortfolioSummary
│       ├── PortfolioChart
│       ├── StockList
│       │   ├── StockListHeader
│       │   ├── StockListItem[]
│       │   └── EmptyState
│       └── AddStockButton
└── Modals
    ├── StockFormModal
    │   ├── StockForm
    │   └── FormButtons
    └── DeleteConfirmModal
```

### UI Components

```typescript
// app/components/ui/

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface InputProps {
  type: 'text' | 'number' | 'email';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}
```

### Business Components

```typescript
// app/components/portfolio/

interface PortfolioChartProps {
  data: ChartData[];
  size?: number;
}

interface StockListProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (stockId: string) => void;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

interface StockFormProps {
  stock?: Stock; // undefined for create, Stock for edit
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface PortfolioSummaryProps {
  summary: PortfolioSummary;
}
```

---

## 상태 관리

### Custom Hooks

```typescript
// app/hooks/usePortfolio.ts

export interface UsePortfolioReturn {
  // State
  stocks: Stock[];
  isLoading: boolean;
  error: string | null;

  // Summary data
  summary: PortfolioSummary;
  chartData: ChartData[];

  // Actions
  addStock: (stockData: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStock: (id: string, updates: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
  clearAll: () => void;

  // Computed values
  getTotalValue: () => number;
  getStockPercentage: (stockId: string) => number;
  sortStocks: (field: SortField, direction: SortDirection) => Stock[];
}

// app/hooks/useLocalStorage.ts

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  loading: boolean;
  error: string | null;
  clearValue: () => void;
}

// app/hooks/useForm.ts

export interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;

  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  setFieldError: (field: keyof T, error: string) => void;
}
```

### State Flow

```
User Action → Hook Function → Local State Update → LocalStorage Sync → UI Rerender
     ↓              ↓                ↓                    ↓              ↓
  Click Add    → addStock()     → stocks state    → localStorage   → StockList
  Edit Stock   → updateStock()  → stocks state    → localStorage   → StockList
  Delete Stock → deleteStock()  → stocks state    → localStorage   → StockList
  Page Load    → loadStocks()   → stocks state    ← localStorage   → StockList
```

---

## API 설계

### LocalStorage Interface

```typescript
// app/utils/storage.ts

export interface StorageAPI {
  // Stocks
  getStocks(): Stock[];
  saveStocks(stocks: Stock[]): void;

  // User Preferences
  getPreferences(): UserPreferences;
  savePreferences(prefs: UserPreferences): void;

  // Generic methods
  get<T>(key: string, defaultValue: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

// Storage Keys
export const STORAGE_KEYS = {
  STOCKS: 'stocks',
  PREFERENCES: 'user_preferences',
  APP_VERSION: 'app_version',
} as const;
```

### Data Validation

```typescript
// app/utils/validation.ts

export interface ValidationSchema<T> {
  [K in keyof T]: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

// Stock validation schema
export const stockValidationSchema: ValidationSchema<FormData> = {
  symbol: [
    { type: 'required', message: '종목 코드를 입력해주세요.' },
    { type: 'pattern', value: /^[A-Z0-9]{1,10}$/, message: '올바른 종목 코드를 입력해주세요.' }
  ],
  name: [
    { type: 'required', message: '종목명을 입력해주세요.' },
    { type: 'min', value: 1, message: '종목명은 1자 이상이어야 합니다.' },
    { type: 'max', value: 50, message: '종목명은 50자 이하여야 합니다.' }
  ],
  shares: [
    { type: 'required', message: '보유 수량을 입력해주세요.' },
    { type: 'min', value: 1, message: '보유 수량은 1주 이상이어야 합니다.' }
  ],
  avgPrice: [
    { type: 'required', message: '평균 매입가를 입력해주세요.' },
    { type: 'min', value: 0.01, message: '매입가는 0.01 이상이어야 합니다.' }
  ]
};
```

---

## 파일 구조

```
app/
├── components/
│   ├── ui/                     # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts           # re-exports
│   └── portfolio/             # 비즈니스 로직 컴포넌트
│       ├── PortfolioChart.tsx
│       ├── PortfolioSummary.tsx
│       ├── StockList.tsx
│       ├── StockListItem.tsx
│       ├── StockForm.tsx
│       ├── EmptyState.tsx
│       └── index.ts
├── hooks/                     # 커스텀 훅
│   ├── usePortfolio.ts
│   ├── useLocalStorage.ts
│   ├── useForm.ts
│   └── index.ts
├── types/                     # TypeScript 타입 정의
│   ├── stock.ts
│   ├── common.ts
│   └── index.ts
├── utils/                     # 유틸리티 함수
│   ├── storage.ts
│   ├── validation.ts
│   ├── formatting.ts
│   ├── colors.ts
│   ├── calculations.ts
│   └── index.ts
├── constants/                 # 상수 정의
│   ├── colors.ts
│   ├── storage.ts
│   └── index.ts
├── routes/                    # 페이지 라우트
│   └── home.tsx
├── styles/                    # 글로벌 스타일
│   └── globals.css
└── root.tsx                   # 루트 컴포넌트
```

---

## 빌드 및 배포

### Build Configuration

```typescript
// vite.config.ts 확장

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@headlessui/react', 'lucide-react'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```

### Docker Configuration

```dockerfile
# Multi-stage build optimization
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 성능 최적화

### Code Splitting

```typescript
// Lazy loading for large components
const PortfolioChart = lazy(
  () => import('~/components/portfolio/PortfolioChart'),
);
const StockForm = lazy(() => import('~/components/portfolio/StockForm'));

// Route-based splitting
const HomePage = lazy(() => import('~/routes/home'));
```

### Memoization Strategy

```typescript
// Component memoization
export const StockListItem = memo(
  ({ stock, onEdit, onDelete }: Props) => {
    // Component logic
  },
  (prevProps, nextProps) => {
    return prevProps.stock.updatedAt === nextProps.stock.updatedAt;
  },
);

// Hook memoization
export const usePortfolio = () => {
  const chartData = useMemo(
    () =>
      stocks.map((stock) => ({
        name: stock.name,
        value: stock.totalValue,
        percentage: (stock.totalValue / totalValue) * 100,
        color: stock.color,
      })),
    [stocks, totalValue],
  );

  const sortedStocks = useMemo(
    () => sortStocks(stocks, sortConfig.field, sortConfig.direction),
    [stocks, sortConfig],
  );
};
```

### Bundle Size Optimization

```typescript
// Tree-shaking friendly imports
import { PlusIcon } from 'lucide-react'; // ✅ Good
// import * as LucideIcons from 'lucide-react';  // ❌ Bad

// Conditional imports
const DevTools =
  process.env.NODE_ENV === 'development' ? await import('./DevTools') : null;
```

---

## 보안 고려사항

### Input Sanitization

```typescript
// XSS Prevention
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

// SQL Injection Prevention (Not applicable - no server)
// But validate data types strictly
export const validateNumber = (value: string): number => {
  const num = parseFloat(value);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number');
  }
  return num;
};
```

### Data Privacy

```typescript
// No external API calls
// No analytics tracking
// No user identification
// All data stored locally

export const privacyConfig = {
  COLLECT_ANALYTICS: false,
  EXTERNAL_API_CALLS: false,
  DATA_SHARING: false,
  LOCAL_STORAGE_ONLY: true,
} as const;
```

### Content Security Policy

```html
<!-- index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
"
/>
```

---

## 테스팅 전략

### Unit Testing

```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { StockForm } from '../StockForm';

describe('StockForm', () => {
  it('should validate required fields', async () => {
    render(<StockForm onSubmit={jest.fn()} onCancel={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /저장/i }));

    expect(screen.getByText('종목 코드를 입력해주세요.')).toBeInTheDocument();
  });
});

// Hook testing
import { renderHook, act } from '@testing-library/react';
import { usePortfolio } from '../usePortfolio';

describe('usePortfolio', () => {
  it('should add new stock', () => {
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
  });
});
```

### Integration Testing

```typescript
// E2E-like testing for user flows
describe('Portfolio Management Flow', () => {
  it('should allow complete CRUD operations', async () => {
    render(<App />);

    // Add stock
    fireEvent.click(screen.getByText(/주식 추가/i));
    // ... fill form and submit

    // Verify stock appears in list
    expect(screen.getByText('AAPL')).toBeInTheDocument();

    // Edit stock
    fireEvent.click(screen.getByLabelText(/수정/i));
    // ... update form and submit

    // Delete stock
    fireEvent.click(screen.getByLabelText(/삭제/i));
    fireEvent.click(screen.getByText(/확인/i));

    // Verify stock is removed
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });
});
```

---

## 모니터링 및 로깅

### Error Handling

```typescript
// Global error boundary
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio App Error:', error, errorInfo);
    // In production, could send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Hook for error handling
export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: Error | string) => {
    const message = typeof error === 'string' ? error : error.message;
    setError(message);
    console.error('Portfolio Error:', error);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, handleError, clearError };
};
```

### Performance Monitoring

```typescript
// Performance tracking
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Track page load time
    const pageLoadTime = performance.now();
    console.log(`Page loaded in ${pageLoadTime}ms`);

    // Track component render time
    const renderStart = performance.now();
    return () => {
      const renderTime = performance.now() - renderStart;
      console.log(`Component rendered in ${renderTime}ms`);
    };
  }, []);
};

// Bundle size monitoring
const bundleSize = new Intl.NumberFormat().format(
  performance.getEntriesByType('navigation')[0].transferSize,
);
console.log(`Bundle size: ${bundleSize} bytes`);
```

---

이 기술 사양서는 개발 과정에서 지속적으로 업데이트되며, 실제 구현과 일치하도록 유지관리됩니다.
