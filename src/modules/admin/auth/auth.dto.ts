// 로그인 요청 스키마
import { validateSchema } from "@/libs/zod.ts";
import { validator } from "hono-openapi";
import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.email("이메일 형식이 올바르지 않습니다").min(1, {
      error: "이메일은 필수 입력 항목입니다",
    }),
    password: z.string().min(6, {
      error: "비밀번호는 최소 6자 이상이어야 합니다",
    }),
  })
  .describe("로그인 요청 스키마")
  .meta({
    ref: "Login",
    title: "Login",
    example: {
      email: "test@example.com",
      password: "Password123!",
    },
  });

export const responseLoginSchema = z.object({
  accessToken: z.string(),
});

export const validateLoginSchema = validator(
  "json",
  loginSchema,
  validateSchema,
);

export type LoginType = z.infer<typeof loginSchema>;
