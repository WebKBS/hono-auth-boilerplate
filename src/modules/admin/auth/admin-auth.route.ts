import { Hono } from "hono";
import { describeRoute, resolver } from "hono-openapi";
import { adminLoginHandler } from "./auth.controller.ts";
import { responseLoginSchema, validateLoginSchema } from "./auth.dto.ts";

const adminLoginRoute = new Hono();

adminLoginRoute.post(
  "/login",
  describeRoute({
    tags: ["Admin Auth"],
    description: "관리자 로그인",
    security: [{ bearerAuth: [] }],
    responses: {
      201: {
        description: "로그인 성공",
        content: {
          "application/json": { schema: resolver(responseLoginSchema) },
        },
      },
    },
  }),
  validateLoginSchema,
  adminLoginHandler,
);

export default adminLoginRoute;
