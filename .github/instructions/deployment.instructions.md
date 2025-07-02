# Custom Instructions: 배포 및 운영

## 목적

배포 및 운영 자동화, 환경설정 시 아래 기준을 반드시 준수하세요.

## 지침

- Vite 프로덕션 빌드, Docker 컨테이너 지원
- 환경별 설정 파일(.env, .env.production 등) 분리
- 헬스체크 엔드포인트(`/healthz`) 구현
- 배포 자동화(CI/CD), 번들 크기/성능 모니터링

## 예시

```sh
npm run build
# Dockerfile, .env.production 등 참고
```
