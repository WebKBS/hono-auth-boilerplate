import {
  loginController,
  registerController,
  snsLoginController,
} from "@/modules/service/auth/auth.controller.ts";
import {
  responseLoginSchema,
  responseRegisterSchema,
  validateLoginSchema,
  validateRegisterSchema,
  validateSnsLoginSchema,
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
  registerController,
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
  loginController,
);

authRoute.post(
  "/sns",
  describeRoute({
    tags: ["Auth"],
    summary: "SNS 로그인 (자동 회원가입 포함)",
    description: "provider + providerId를 기반으로 SNS 로그인 처리.",
    responses: {
      200: {
        description: "성공",
        content: {
          "application/json": { schema: resolver(responseLoginSchema) },
        },
      },
    },
  }),
  validateSnsLoginSchema,
  snsLoginController,
);

export default authRoute;
