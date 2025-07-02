# 데이터 모델 및 타입 정의

<!-- gh create issue --title "데이터 모델 및 타입 정의" --body-file "docs/issues/003-data-models.md" --label "feature,setup,priority-high" -->

## 📋 설명

Stock Portfolio Manager의 핵심 데이터 모델과 TypeScript 타입 정의를 구축합니다.

## 🎯 목표

- [ ] 주식(Stock) 및 포트폴리오(Portfolio) 데이터 모델 정의
- [ ] 타입 안전성을 보장하는 TypeScript 인터페이스 구현
- [ ] 데이터 검증 및 변환 유틸리티 함수 작성
- [ ] localStorage 연동을 위한 직렬화/역직렬화 로직

## 📝 작업 상세

### 1. 핵심 데이터 타입 정의

#### Stock 인터페이스

```typescript
interface Stock {
  id: string; // UUID v4
  symbol: string; // 주식 심볼 (예: "AAPL")
  name: string; // 회사명
  shares: number; // 보유 주식 수
  avgPrice: number; // 평균 매수가
  totalValue: number; // 총 평가금액 (계산값)
  color: string; // 차트 색상 (hex)
  createdAt: Date;
  updatedAt: Date;
}
```

#### Portfolio 인터페이스

```typescript
interface Portfolio {
  id: string;
  name: string;
  stocks: Stock[];
  totalValue: number; // 전체 포트폴리오 가치
  createdAt: Date;
  updatedAt: Date;
}
```

#### PortfolioSummary 인터페이스

```typescript
interface PortfolioSummary {
  totalValue: number;
  totalStocks: number;
  topPerformer: Stock | null;
  allocation: AllocationItem[];
}

interface AllocationItem {
  symbol: string;
  percentage: number;
  value: number;
  color: string;
}
```

### 2. 폼 및 입력 데이터 타입

#### StockFormData

```typescript
interface StockFormData {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
}
```

#### ValidationError

```typescript
interface ValidationError {
  field: string;
  message: string;
  code: string;
}
```

### 3. 차트 데이터 타입

#### ChartDataPoint

```typescript
interface ChartDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
```

### 4. 유틸리티 타입

#### API Response 타입

```typescript
type ApiResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: string;
    };
```

#### 상태 관리 타입

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}
```

### 5. 데이터 검증 스키마

#### Zod 스키마 정의

- [ ] Stock 데이터 검증 스키마
- [ ] Portfolio 데이터 검증 스키마
- [ ] 입력 폼 검증 스키마

### 6. 타입 가드 함수

- [ ] `isValidStock()` 함수
- [ ] `isValidPortfolio()` 함수
- [ ] 런타임 타입 체크 유틸리티

### 7. 데이터 변환 유틸리티

- [ ] Stock 계산 함수 (총 가치, 비율 등)
- [ ] Portfolio 집계 함수
- [ ] 차트 데이터 변환 함수

## ✅ 완료 조건

- [ ] 모든 핵심 타입 정의 완료
- [ ] TypeScript strict mode 통과
- [ ] 데이터 검증 스키마 구현
- [ ] 타입 가드 함수 작성 완료
- [ ] 단위 테스트 작성 (타입 검증, 계산 함수)
- [ ] JSDoc 문서화 완료

## 🔗 관련 문서

- [Data Management Prompt](../.github/prompts/data-management.prompt.md)
- [Technical Specification - Data Models](../TECHNICAL_SPEC.md#data-models)

## 🏷️ 라벨

`feature`, `setup`, `priority-high`

## ⏱️ 예상 소요 시간

2-3일

## 👥 담당자

백엔드/풀스택 개발자

## 📋 체크리스트

### 타입 정의

- [ ] Stock 인터페이스 구현
- [ ] Portfolio 인터페이스 구현
- [ ] PortfolioSummary 인터페이스 구현
- [ ] 폼 데이터 타입 정의
- [ ] 차트 데이터 타입 정의
- [ ] 유틸리티 타입 정의

### 데이터 검증

- [ ] Zod 스키마 라이브러리 설치
- [ ] Stock 검증 스키마 작성
- [ ] Portfolio 검증 스키마 작성
- [ ] 폼 입력 검증 스키마 작성

### 타입 가드 및 유틸리티

- [ ] 타입 가드 함수 구현
- [ ] 데이터 변환 함수 구현
- [ ] 계산 함수 구현 (총 가치, 비율 등)
- [ ] 직렬화/역직렬화 함수

### 테스트 및 문서화

- [ ] 타입 정의 단위 테스트
- [ ] 검증 함수 테스트
- [ ] 계산 함수 테스트
- [ ] JSDoc 문서 작성
- [ ] 타입 사용 예제 작성

### 상수 및 설정

- [ ] 기본 색상 팔레트 정의
- [ ] 검증 메시지 상수
- [ ] 기본값 상수 정의
