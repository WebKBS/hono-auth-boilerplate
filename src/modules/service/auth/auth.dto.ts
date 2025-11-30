import { validateSchema } from "@/libs/zod.ts";
import { validator } from "hono-openapi";
import { z } from "zod";

// 회원가입 요청 스키마
export const registerSchema = z
  .object({
    email: z.email("이메일 형식이 올바르지 않습니다").min(1, {
      error: "이메일은 필수 입력 항목입니다",
    }),
    password: z
      .string()
      .min(6, {
        error: "비밀번호는 최소 6자 이상이어야 합니다",
      })
      .regex(/[A-Z]/, {
        error: "비밀번호에는 최소 하나의 대문자가 포함되어야 합니다",
      }),
  })
  .describe("회원가입 요청 스키마")
  .meta({
    ref: "Register",
    title: "Register",
    example: {
      email: "test@example.com",
      password: "Password123!",
    },
  });

// 로그인 요청 스키마
export const loginSchema = z
  .object({
    email: z.email("이메일 형식이 올바르지 않습니다").min(1, {
      error: "이메일은 필수 입력 항목입니다",
    }),
    password: z.string().min(6, {
      error: "로그인에 실패했습니다",
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

// 스키마 검증 미들웨어
export const validateRegisterSchema = validator(
  "json",
  registerSchema,
  validateSchema,
);
export const validateLoginSchema = validator(
  "json",
  loginSchema,
  validateSchema,
);

// 로그인 응답 스키마
export const responseLoginSchema = z
  .object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.email(),
      role: z.string(),
    }),
  })
  .describe("로그인 응답 스키마")
  .meta({
    title: "LoginResponse",
    example: {
      token: "asdasdqwd",
      user: {
        id: 1,
        email: "test@example.com",
        role: "user",
      },
    },
  });

export const responseRegisterSchema = z
  .object({
    id: z.number(),
    email: z.email(),
    createdAt: z.string(),
  })
  .describe("회원가입 응답 스키마")
  .meta({
    title: "RegisterResponse",
    example: {
      id: 1,
      email: "test@example.com",
      createdAt: "2023-10-01T12:34:56Z",
    },
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
