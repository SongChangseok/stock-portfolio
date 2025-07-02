# 주식 CRUD 기능 구현

<!-- gh create issue --title "주식 CRUD 기능 구현" --body-file "docs/issues/005-stock-crud.md" --label "feature,priority-high" -->

## 📋 설명

주식 데이터의 생성, 읽기, 수정, 삭제(CRUD) 기능을 구현하여 사용자가 포트폴리오를 관리할 수 있도록 합니다.

## 🎯 목표

- [ ] 주식 추가 폼 컴포넌트 구현
- [ ] 주식 목록 표시 컴포넌트 구현
- [ ] 주식 수정 기능 구현
- [ ] 주식 삭제 기능 구현
- [ ] 데이터 검증 및 에러 처리

## 📝 작업 상세

### 1. 주식 추가 기능 (Create)

#### StockForm 컴포넌트

- [ ] 종목명 입력 필드
- [ ] 주식 심볼 입력 (대문자 자동 변환)
- [ ] 보유 수량 입력 (숫자만 허용)
- [ ] 평균 매수가 입력 (화폐 형식)
- [ ] 실시간 총 가치 계산 표시
- [ ] 폼 검증 및 에러 메시지

#### 검증 규칙

```typescript
const stockValidation = {
  symbol: {
    required: true,
    pattern: /^[A-Z]{1,10}$/,
    message: '주식 심볼은 1-10자의 영문 대문자여야 합니다',
  },
  name: {
    required: true,
    minLength: 1,
    maxLength: 100,
    message: '회사명을 입력해주세요',
  },
  shares: {
    required: true,
    min: 0.000001,
    type: 'number',
    message: '보유 수량을 입력해주세요',
  },
  avgPrice: {
    required: true,
    min: 0.01,
    type: 'number',
    message: '평균 매수가를 입력해주세요',
  },
};
```

### 2. 주식 조회 기능 (Read)

#### StockList 컴포넌트

- [ ] 반응형 그리드/테이블 레이아웃
- [ ] 주식 정보 카드 형태로 표시
- [ ] 총 가치 및 비율 계산 표시
- [ ] 정렬 기능 (이름, 가치, 비율별)
- [ ] 검색 및 필터링 기능

#### StockCard 컴포넌트

- [ ] 주식 기본 정보 표시
- [ ] 가격 및 수량 정보
- [ ] 총 가치 및 포트폴리오 비율
- [ ] 편집/삭제 액션 버튼

### 3. 주식 수정 기능 (Update)

#### 편집 모드

- [ ] 인라인 편집 또는 모달 편집
- [ ] 기존 데이터 사전 입력
- [ ] 변경사항 실시간 미리보기
- [ ] 저장/취소 기능

#### 최적 업데이트

- [ ] 낙관적 업데이트 (Optimistic Update)
- [ ] 에러 시 롤백 기능
- [ ] 변경 내역 추적

### 4. 주식 삭제 기능 (Delete)

#### 삭제 확인

- [ ] 삭제 확인 다이얼로그
- [ ] 삭제할 주식 정보 표시
- [ ] 포트폴리오 영향 미리보기
- [ ] 실행 취소 기능 (선택사항)

#### 안전 삭제

- [ ] 소프트 삭제 구현 (선택사항)
- [ ] 삭제 전 백업
- [ ] 관련 데이터 정리

### 5. 상태 관리

#### useStockCrud 훅

```typescript
interface UseStockCrud {
  stocks: Stock[];
  loading: boolean;
  error: string | null;

  addStock: (data: StockFormData) => Promise<void>;
  updateStock: (id: string, data: Partial<StockFormData>) => Promise<void>;
  deleteStock: (id: string) => Promise<void>;
  getStock: (id: string) => Stock | null;
}
```

#### 상태 최적화

- [ ] 메모이제이션 적용
- [ ] 불필요한 리렌더링 방지
- [ ] 로딩 상태 관리
- [ ] 에러 상태 처리

### 6. 사용자 경험 개선

#### 로딩 상태

- [ ] 스켈레톤 UI
- [ ] 로딩 스피너
- [ ] 비활성화 상태 표시

#### 에러 처리

- [ ] 사용자 친화적 에러 메시지
- [ ] 재시도 기능
- [ ] 에러 복구 가이드

#### 성공 피드백

- [ ] 토스트 알림
- [ ] 성공 애니메이션
- [ ] 상태 변경 표시

## ✅ 완료 조건

- [ ] 모든 CRUD 기능 정상 작동
- [ ] 폼 검증 및 에러 처리 완료
- [ ] 반응형 디자인 구현
- [ ] 접근성 표준 준수 (키보드 내비게이션, ARIA)
- [ ] 단위 테스트 및 통합 테스트 작성
- [ ] 성능 최적화 적용

## 🔗 관련 문서

- [CRUD Scaffold Prompt](../.github/prompts/crud-scaffold.prompt.md)
- [Technical Specification - Components](../TECHNICAL_SPEC.md#components)

## 🏷️ 라벨

`feature`, `priority-high`

## ⏱️ 예상 소요 시간

4-5일

## 👥 담당자

프론트엔드 개발자

## 📋 체크리스트

### StockForm 컴포넌트

- [ ] 기본 폼 레이아웃 구현
- [ ] 입력 필드 검증 로직
- [ ] 실시간 총 가치 계산
- [ ] 에러 메시지 표시
- [ ] 제출 및 취소 핸들러

### StockList 컴포넌트

- [ ] 기본 목록 레이아웃
- [ ] 반응형 그리드 구현
- [ ] 정렬 기능 구현
- [ ] 검색/필터 기능
- [ ] 빈 상태 처리

### StockCard 컴포넌트

- [ ] 주식 정보 표시
- [ ] 액션 버튼 (편집/삭제)
- [ ] 카드 호버 효과
- [ ] 상태별 스타일링

### CRUD 훅 구현

- [ ] useStockCrud 훅 구현
- [ ] 상태 관리 로직
- [ ] 에러 처리 및 복구
- [ ] 최적화 (메모이제이션)

### 폼 검증

- [ ] 클라이언트 검증 규칙
- [ ] 실시간 검증 피드백
- [ ] 서버 검증 (localStorage)
- [ ] 에러 메시지 다국어화

### 사용자 경험

- [ ] 로딩 상태 UI
- [ ] 성공/에러 피드백
- [ ] 애니메이션 및 전환효과
- [ ] 접근성 개선

### 테스트

- [ ] 컴포넌트 단위 테스트
- [ ] CRUD 로직 테스트
- [ ] 사용자 시나리오 테스트
- [ ] 접근성 테스트
