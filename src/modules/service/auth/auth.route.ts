import {
  loginHandler,
  registerHandler,
} from "@/modules/service/auth/auth.controller.ts";
import {
  responseLoginSchema,
  responseRegisterSchema,
  validateLoginSchema,
  validateRegisterSchema,
} from "@/modules/service/auth/auth.dto.ts";
import { Hono } from "hono";
import { describeRoute, resolver } from "hono-openapi";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  describeRoute({
    tags: ["Auth"],
    summary: "회원가입",
    description: "회원가입",
    responses: {
      200: {
        description: "성공",
        content: {
          "application/json": { schema: resolver(responseRegisterSchema) },
        },
      },
    },
  }),
  validateRegisterSchema,
  registerHandler,
);

authRoute.post(
  "/login",
  describeRoute({
    tags: ["Auth"],
    summary: "로그인",
    description: "사용자 로그인",
    responses: {
      200: {
        description: "성공",
        content: {
          "application/json": { schema: resolver(responseLoginSchema) },
        },
      },
    },
  }),
  validateLoginSchema,
  loginHandler,
);

export default authRoute;
