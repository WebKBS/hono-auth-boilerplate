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
    name: z.string().min(1, {
      error: "이름은 필수 입력 항목입니다",
    }),
    phone: z.string().min(1, {
      error: "전화번호는 필수 입력 항목입니다",
    }),
    provider: z.string().optional(),
    providerId: z.string().optional(),

    avatarUrl: z.url().optional(),
  })
  .describe("회원가입 요청 스키마")
  .meta({
    ref: "Register",
    title: "Register",
    example: {
      email: "test1@example.com",
      password: "Password123!",
      name: "홍길동",
      phone: "010-1234-5678",
      avatarUrl: "https://example.com/avatar.jpg",
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

export const snsLoginSchema = z
  .object({
    provider: z.string("SNS 제공자는 필수 입력 항목입니다").min(1, {
      error: "SNS 제공자는 필수 입력 항목입니다",
    }),
    providerId: z.string("SNS 제공자 ID는 필수 입력 항목입니다").min(1, {
      error: "SNS 제공자 ID는 필수 입력 항목입니다",
    }),
    email: z.email().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    avatarUrl: z.url().optional(),
  })
  .describe("SNS 로그인 요청 스키마")
  .meta({
    ref: "SnsLogin",
    title: "SnsLogin",
    example: {
      provider: "google",
      providerId: "google-unique-id-12345",
      email: "example@example.com",
      name: "홍길동",
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

export const validateSnsLoginSchema = validator(
  "json",
  snsLoginSchema,
  validateSchema,
);

// 로그인 응답 스키마
export const responseLoginSchema = z
  .object({
    user: z.object({
      id: z.number(),
      email: z.email(),
      role: z.string(),
      accessToken: z.string(),
    }),
  })
  .describe("로그인 응답 스키마")
  .meta({
    title: "LoginResponse",
    example: {
      user: {
        id: 1,
        email: "test@example.com",
        role: "user",
        accessToken: "asdasdqwd",
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
