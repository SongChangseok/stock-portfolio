# 테스트 시스템 구축

<!-- gh create issue --title "테스트 시스템 구축" --body-file "docs/issues/008-testing-system.md" --label "testing,priority-medium" -->

## 📋 설명

포괄적인 테스트 시스템을 구축하여 코드 품질과 안정성을 보장합니다.

## 🎯 목표

- [ ] 단위 테스트 (Unit Tests) 환경 설정
- [ ] 통합 테스트 (Integration Tests) 구현
- [ ] 접근성 테스트 (A11y Tests) 추가
- [ ] 테스트 커버리지 측정 및 리포팅
- [ ] CI/CD 파이프라인 통합

## 📝 작업 상세

### 1. 테스트 환경 설정

#### 테스트 라이브러리 설치

- [ ] Vitest (빠른 테스트 러너)
- [ ] React Testing Library (컴포넌트 테스트)
- [ ] Jest DOM (DOM 매처)
- [ ] MSW (Mock Service Worker)
- [ ] axe-core (접근성 테스트)

#### 설정 파일

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### 2. 테스트 유틸리티 및 헬퍼

#### 테스트 유틸리티

- [ ] 커스텀 render 함수 (providers 포함)
- [ ] Mock 데이터 생성기
- [ ] 테스트 ID 상수 정의
- [ ] 공통 테스트 헬퍼 함수

#### Mock 설정

- [ ] localStorage 모킹
- [ ] Recharts 컴포넌트 모킹
- [ ] 브라우저 API 모킹
- [ ] 외부 라이브러리 모킹

### 3. 컴포넌트 단위 테스트

#### UI 컴포넌트 테스트

- [ ] Button 컴포넌트 테스트
- [ ] Input 컴포넌트 테스트
- [ ] Modal 컴포넌트 테스트
- [ ] Card 컴포넌트 테스트

#### 비즈니스 로직 컴포넌트 테스트

- [ ] StockForm 컴포넌트 테스트
- [ ] StockList 컴포넌트 테스트
- [ ] PortfolioChart 컴포넌트 테스트
- [ ] Dashboard 컴포넌트 테스트

### 4. 커스텀 훅 테스트

#### 데이터 관리 훅 테스트

- [ ] useLocalStorage 훅 테스트
- [ ] usePortfolio 훅 테스트
- [ ] useStockCrud 훅 테스트
- [ ] useChartData 훅 테스트

#### 테스트 패턴

```typescript
describe('usePortfolio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty portfolio', () => {
    const { result } = renderHook(() => usePortfolio());
    expect(result.current.stocks).toEqual([]);
  });

  it('should add stock successfully', async () => {
    const { result } = renderHook(() => usePortfolio());

    await act(async () => {
      await result.current.addStock(mockStockData);
    });

    expect(result.current.stocks).toHaveLength(1);
  });
});
```

### 5. 통합 테스트

#### 사용자 워크플로우 테스트

- [ ] 주식 추가 완전한 플로우
- [ ] 주식 편집 및 삭제 플로우
- [ ] 포트폴리오 차트 상호작용
- [ ] 내비게이션 및 라우팅

#### 데이터 플로우 테스트

- [ ] localStorage 저장/로딩
- [ ] 데이터 계산 및 집계
- [ ] 에러 처리 및 복구
- [ ] 성능 시나리오

### 6. 접근성 테스트

#### 자동화된 a11y 테스트

- [ ] axe-core 규칙 실행
- [ ] 키보드 내비게이션 테스트
- [ ] 스크린 리더 호환성
- [ ] 색상 대비 검증

#### 접근성 테스트 예시

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<StockForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 7. 시각적 회귀 테스트 (선택사항)

#### 스냅샷 테스트

- [ ] 컴포넌트 렌더링 스냅샷
- [ ] 차트 출력 스냅샷
- [ ] 에러 상태 스냅샷
- [ ] 반응형 레이아웃 스냅샷

### 8. 성능 테스트

#### 렌더링 성능 테스트

- [ ] 컴포넌트 렌더링 시간 측정
- [ ] 메모리 사용량 모니터링
- [ ] 대용량 데이터 처리 성능
- [ ] 차트 렌더링 성능

### 9. E2E 테스트 (선택사항)

#### Playwright 설정

- [ ] 기본 E2E 테스트 환경
- [ ] 주요 사용자 시나리오
- [ ] 브라우저 호환성 테스트
- [ ] 모바일 디바이스 테스트

### 10. CI/CD 통합

#### GitHub Actions 설정

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:ci
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## ✅ 완료 조건

- [ ] 모든 컴포넌트 단위 테스트 완료
- [ ] 커스텀 훅 테스트 완료
- [ ] 통합 테스트 시나리오 구현
- [ ] 접근성 테스트 통과
- [ ] 테스트 커버리지 80% 이상 달성
- [ ] CI/CD 파이프라인 구축

## 🔗 관련 문서

- [Test Generation Prompt](../.github/prompts/test-generation.prompt.md)
- [Testing Guide](../TESTING_GUIDE.md)

## 🏷️ 라벨

`testing`, `priority-medium`

## ⏱️ 예상 소요 시간

4-5일

## 👥 담당자

QA 엔지니어 / 풀스택 개발자

## 📋 체크리스트

### 테스트 환경 설정

- [ ] Vitest 설정 및 구성
- [ ] React Testing Library 설정
- [ ] MSW 모킹 시스템 구축
- [ ] 테스트 유틸리티 함수 작성

### 단위 테스트

- [ ] UI 컴포넌트 테스트 작성
- [ ] 커스텀 훅 테스트 작성
- [ ] 유틸리티 함수 테스트
- [ ] 데이터 모델 테스트

### 통합 테스트

- [ ] 사용자 워크플로우 테스트
- [ ] 데이터 플로우 테스트
- [ ] 에러 시나리오 테스트
- [ ] 라우팅 테스트

### 접근성 테스트

- [ ] axe-core 자동화 테스트
- [ ] 키보드 내비게이션 테스트
- [ ] 스크린 리더 테스트
- [ ] 색상 대비 테스트

### 성능 테스트

- [ ] 컴포넌트 렌더링 성능
- [ ] 메모리 사용량 모니터링
- [ ] 대용량 데이터 처리
- [ ] 차트 렌더링 최적화

### 커버리지 및 리포팅

- [ ] 코드 커버리지 설정
- [ ] 테스트 리포트 생성
- [ ] 커버리지 임계값 설정
- [ ] 품질 게이트 구성

### CI/CD 통합

- [ ] GitHub Actions 워크플로우
- [ ] 자동 테스트 실행
- [ ] 커버리지 업로드
- [ ] PR 상태 체크
