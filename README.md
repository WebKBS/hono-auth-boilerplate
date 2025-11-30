# Auth API

Bun, Hono, Drizzle ORM을 기반으로 한 현대적인 웹 API 서버입니다. PostgreSQL 데이터베이스와 함께 확장 가능하고 안전한 REST API를 제공합니다.

## 🚀 주요 기능

- **현대적인 스택**: Bun + Hono + Drizzle ORM + PostgreSQL
- **API 문서화**: Swagger UI를 통한 자동 API 문서 생성
- **보안**: CORS, CSRF, Secure Headers 미들웨어 적용
- **모듈화된 구조**: 서비스와 관리자 API 분리
- **타입 안전성**: TypeScript 기반 개발
- **데이터베이스 마이그레이션**: Drizzle Kit을 통한 스키마 관리

## 📁 프로젝트 구조

```
src/
├── common/           # 공통 라우트 (헬스체크 등)
├── config/          # 환경 설정
├── db/              # 데이터베이스 스키마 및 마이그레이션
├── libs/            # 외부 라이브러리 설정
├── middlewares/     # 사용자 정의 미들웨어
├── modules/         # 모듈별 API 로직
│   ├── admin/       # 관리자 API
│   └── service/     # 서비스 API
├── utils/           # 유틸리티 함수
└── index.ts         # 애플리케이션 진입점
```

## 🛠 설치 및 실행

### 의존성 설치
```bash
bun install
```

### 환경 변수 설정
```bash
# .env 파일 생성
DATABASE_URL=postgresql://username:password@localhost:5432/database
CORS_ORIGIN=http://localhost:3000
```

### 개발 서버 실행
```bash
bun run dev
```

서버는 http://localhost:8000 에서 실행됩니다.

## 📖 API 문서

개발 서버 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:

- **서비스 API**: http://localhost:8000/docs/service
- **관리자 API**: http://localhost:8000/docs/admin

## 🛡 보안 기능

- **CORS**: 허용된 도메인에서만 API 접근 가능
- **CSRF**: Cross-Site Request Forgery 공격 방지
- **Secure Headers**: 보안 헤더 자동 추가
- **Bearer Token**: JWT 기반 인증 지원

## 🗃 데이터베이스

- **ORM**: Drizzle ORM
- **데이터베이스**: PostgreSQL
- **마이그레이션**: Drizzle Kit을 통한 스키마 버전 관리

### 마이그레이션 명령어
```bash
# 마이그레이션 파일 생성
bunx drizzle-kit generate

# 마이그레이션 실행
bunx drizzle-kit push
```

## 🧪 기술 스택

- **Runtime**: Bun
- **Web Framework**: Hono
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Language**: TypeScript
- **API Documentation**: Swagger UI + OpenAPI
- **Code Formatting**: Prettier
