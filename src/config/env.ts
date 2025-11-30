import { z } from "zod";

const envConfigSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX: z.coerce.number().default(100), // limit each IP to 100 requests per windowMs

  ADMIN_ID: z.email(),
  ADMIN_PASSWORD_HASH: z.string(),
});

const parsed = envConfigSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.issues);
  process.exit(1); // 잘못된 경우 서버 실행 중단
}

export const envConfig = parsed.data;
