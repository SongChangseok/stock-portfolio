import type { RouteObject } from 'react-router-dom';

// JSX.Element 타입을 element에 허용하기 위한 타입 확장 (react-router v6+)
declare module 'react-router-dom' {
  interface RouteObject {
    element?: React.ReactNode;
  }
}
