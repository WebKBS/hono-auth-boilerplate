import healthRoute from "@/common/routes/health.route.ts";
import { envConfig } from "@/config/env.ts";
import adminRoute from "@/modules/admin/admin.route.ts";
import serviceRoute from "@/modules/service/service.route.ts";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { z } from "zod";
import { AppError } from "@/utils/appError.ts";

const app = new Hono();

app.use(
  cors({
    origin: envConfig.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(
  csrf({
    origin: envConfig.CORS_ORIGIN,
    secFetchSite: "same-origin", // CSRF 보호를 위해 sec-fetch-site 헤더 검사 - same-origin는 같은 출처에서 온 요청만 허용
  }),
);

app.use(
  secureHeaders({
    xFrameOptions: "DENY",
  }),
);
app.use(logger());
app.use(prettyJSON());

app.route("/health", healthRoute);
app.route("/", serviceRoute);
app.route("/", adminRoute);

/**
 * swagger openapi
 */
// Swagger UI 설정
app.get("/docs/service", swaggerUI({ url: "/service/openapi.json" }));
app.get("/docs/admin", swaggerUI({ url: "/admin/openapi.json" }));

// OpenAPI JSON 문서 엔드포인트
app.get(
  "/service/openapi.json",
  openAPIRouteHandler(serviceRoute, {
    documentation: {
      info: {
        title: "세진유과 API",
        version: "1.0.0",
        description: "세진유과 API 명세서",
      },

      externalDocs: {
        description: "세진유과 Admin API",
        url: "http://localhost:8000/docs/admin",
      },

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
  }),
);

app.get(
  "/admin/openapi.json",
  openAPIRouteHandler(adminRoute, {
    documentation: {
      info: {
        title: "세진유과 Admin API",
        version: "1.0.0",
        description: "세진유과 Admin API 명세서",
      },

      externalDocs: {
        description: "세진유과 API",
        url: "http://localhost:8000/docs/service",
      },

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
  }),
);

app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.onError((error, c) => {
  console.error("🔥 Error occurred:", error);

  if (error instanceof z.ZodError) {
    console.error(error);
    return c.json(
      { message: error.issues.map((issue) => issue.message).join(", ") },
      400,
    );
  }

  if (error instanceof AppError) {
    return c.json({ message: error.message }, { status: error.status });
  }

  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, { status: error.status });
  }

  // 예상치 못한 서버 오류
  return c.json({ error: "Internal Server Error" }, 500);
});

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};
