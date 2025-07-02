# Custom Instructions: API/Mock 데이터

## 목적

API 연동 및 Mock 데이터 작성 시 아래 기준을 반드시 준수하세요.

## 지침

- Mock 데이터는 실제 데이터 구조와 동일하게 작성
- API 명세(RESTful): GET/POST/PUT/DELETE
- 응답 데이터는 success, data 필드 포함
- Mock 데이터 및 API 명세는 docs/api-mock.md 참고

## 예시

```json
{
  "success": true,
  "data": [
    /* ... */
  ]
}
```
