import { hashPassword, verifyPassword } from "@/libs/hash.ts";
import { createToken } from "@/libs/jwt.ts";
import { LoginType } from "@/modules/service/auth/auth.dto.ts";
import {
  createUser,
  findUserByEmail,
} from "@/modules/service/auth/auth.repository.ts";

export const registerService = async ({ email, password }: LoginType) => {
  console.log("registerService called", email, password);
  const exist = await findUserByEmail(email);
  if (exist.length) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }

  const hashed = await hashPassword(password);
  const [user] = await createUser(email, hashed);

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export const loginService = async ({ email, password }: LoginType) => {
  const found = await findUserByEmail(email);

  if (!found.length) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }

  const user = found[0];

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }

  const token = await createToken({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
