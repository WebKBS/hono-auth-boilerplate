import { envConfig } from "@/config/env.ts";
import { verifyPassword } from "@/libs/hash";
import { createToken } from "@/libs/jwt";
import { LoginType } from "@/modules/admin/auth/auth.dto.ts";
import { AppError } from "@/utils/appError.ts";

export const adminLoginService = async ({ email, password }: LoginType) => {
  if (email !== envConfig.ADMIN_ID) {
    throw new AppError("아이디 또는 비밀번호가 일치하지 않습니다.", 400);
  }

  const isValid = await verifyPassword(
    password,
    atob(process.env.ADMIN_PASSWORD_HASH!),
  );

  if (!isValid) {
    throw new AppError("아이디 또는 비밀번호가 일치하지 않습니다.", 400);
  }

  const accessToken = await createToken({
    id: 999_999_999,
    role: "admin",
  });

  return { accessToken };
};
