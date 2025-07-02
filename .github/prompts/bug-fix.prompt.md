# 버그 수정 가이드

버그 수정 시 다음 체계적인 접근법을 사용해주세요:

## 버그 분석 단계

1. **문제 재현**: 버그 발생 조건 명확히 파악
2. **근본 원인 분석**: 로그, 에러 메시지, 코드 플로우 추적
3. **영향 범위 파악**: 관련된 컴포넌트와 기능 식별
4. **해결 방안 계획**: 최소 침습적 수정 방법 선택

## Stock Portfolio 특화 버그 패턴

- **가격 데이터 오류**: 소수점 처리, 통화 포맷팅
- **실시간 업데이트 문제**: WebSocket 연결, 상태 동기화
- **포트폴리오 계산 오류**: 수익률 계산, 총액 합계
- **UI 반응성**: 로딩 상태, 에러 처리

## 수정 체크리스트

- [ ] 버그 재현 테스트 케이스 작성
- [ ] 수정 코드 구현
- [ ] 기존 테스트 실행으로 regression 확인
- [ ] 새 테스트로 수정 사항 검증
- [ ] 코드 리뷰 준비

## 일반적인 버그 카테고리

### 1. 데이터 처리 버그

```typescript
// 잘못된 예
const price = data.price; // undefined일 가능성

// 올바른 예
const price = data?.price ?? 0;
```

### 2. 상태 관리 버그

```typescript
// 잘못된 예
setStocks(stocks.push(newStock)); // 배열 변경

// 올바른 예
setStocks([...stocks, newStock]); // 불변성 유지
```

### 3. 비동기 처리 버그

```typescript
// 잘못된 예
useEffect(() => {
  fetchData().then(setData);
}, []); // cleanup 없음

// 올바른 예
useEffect(() => {
  let cancelled = false;
  fetchData().then((data) => {
    if (!cancelled) setData(data);
  });
  return () => {
    cancelled = true;
  };
}, []);
```

## 문서화 요구사항

- 버그 원인과 해결 방법 주석 추가
- CHANGELOG.md 업데이트
- 관련 README 섹션 수정 (필요시)

## 품질 보증

- TypeScript 타입 검사 통과
- ESLint 경고 제거
- 모든 테스트 통과
- 성능 영향도 검토
