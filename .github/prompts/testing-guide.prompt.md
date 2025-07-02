# 테스트 작성 가이드

Stock Portfolio 프로젝트의 테스트 작성 시 다음 가이드라인을 준수해주세요:

## 테스트 도구

- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright (필요시)
- **Mocking**: MSW (Mock Service Worker)

## 테스트 구조

```
app/
├── components/
│   ├── StockCard.tsx
│   └── StockCard.test.tsx
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── routes/
    ├── portfolio.tsx
    └── portfolio.test.tsx
```

## 컴포넌트 테스트 패턴

```typescript
import { render, screen } from '@testing-library/react';
import { StockCard } from './StockCard';

describe('StockCard', () => {
  it('displays stock information correctly', () => {
    const mockStock = {
      symbol: 'AAPL',
      price: 150.0,
      change: 2.5,
      changePercent: 1.69,
    };

    render();

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });
});
```

## API 모킹

- MSW를 사용한 API 응답 모킹
- 다양한 시나리오 테스트 (성공, 실패, 로딩)
- 실제 API 구조와 일치하는 목 데이터

## 주식 데이터 테스트 특화

- 가격 포맷팅 검증
- 수익률 계산 정확성
- 실시간 업데이트 시뮬레이션
- 시장 시간 로직 테스트

## 테스트 카테고리

1. **Unit Tests**: 순수 함수, 유틸리티
2. **Integration Tests**: API 통합, 데이터 플로우
3. **Component Tests**: UI 렌더링, 사용자 상호작용
4. **Accessibility Tests**: 접근성 준수

## 테스트 실행

- `npm test`: 전체 테스트 실행
- `npm test -- --watch`: 개발 모드
- `npm test -- --coverage`: 커버리지 리포트

## 커버리지 기준

- Line Coverage: 80% 이상
- Function Coverage: 90% 이상
- Branch Coverage: 75% 이상
