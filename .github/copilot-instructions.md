# Stock Portfolio 프로젝트 지침

이 프로젝트는 React Router 기반의 현대적인 풀스택 주식 포트폴리오 애플리케이션입니다. 다음 가이드라인을 따라 개발해주세요.

## 코드 표준

### 기술스택 우선순위

- React Router 6+ 사용 (SSR 지원)
- TypeScript 필수 사용 (JavaScript 대신)
- TailwindCSS 스타일링 (다른 CSS 프레임워크 대신)
- Vite 기반 개발 환경

### 코딩 컨벤션

- 함수형 컴포넌트와 React Hooks 사용
- TypeScript strict 모드 준수
- 컴포넌트명은 PascalCase, 파일명은 kebab-case 사용
- 절대 경로 import 사용 (상대 경로 최소화)
- ESLint와 Prettier 설정 준수

### 파일 구조 규칙

- `app/routes/`: 라우트 컴포넌트들
- `app/components/`: 재사용 가능한 UI 컴포넌트
- `app/lib/`: 유틸리티 함수와 공통 로직
- `app/types/`: TypeScript 타입 정의
- `public/`: 정적 자산

## 개발 워크플로우

### 필수 실행 명령어

- 개발 서버: `npm run dev`
- 프로덕션 빌드: `npm run build`
- 타입 체크: `npm run typecheck`
- 린팅: `npm run lint`

### 테스트 요구사항

- 새로운 컴포넌트에는 기본 렌더링 테스트 추가
- 비즈니스 로직 함수에는 유닛 테스트 필수
- API 연동 부분에는 모킹 테스트 추가

## 주식 포트폴리오 특화 지침

### 데이터 처리

- 주식 가격은 소수점 2자리로 표시
- 수익률 계산시 정확한 소수점 처리
- 통화 형식은 한국 원화(KRW) 기본 사용

### UI/UX 가이드라인

- 반응형 디자인 필수 (모바일 우선)
- 다크모드 지원 고려
- 접근성(a11y) 기준 준수
- 로딩 상태와 에러 처리 UI 필수

### 성능 최적화

- React.memo와 useMemo 적절히 활용
- 이미지 최적화 (WebP 형식 우선)
- 코드 스플리팅 적용
- 번들 크기 모니터링

## 보안 고려사항

- API 키는 환경변수로 관리
- 클라이언트에서 민감한 정보 노출 방지
- XSS 방지를 위한 입력값 검증
- CORS 설정 확인

## 배포 관련

- Docker 컨테이너 지원
- 환경별 설정 파일 분리
- 프로덕션 빌드 최적화
- 헬스체크 엔드포인트 포함

이 지침들을 따라 일관성 있고 유지보수 가능한 코드를 작성해주세요.

## 참조 URL

- [](https://docs.github.com/ko/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks)
- [](https://lucumr.pocoo.org/2025/6/12/agentic-coding/)
