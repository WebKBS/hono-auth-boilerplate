import { ProviderType } from "@/db/schema/accounts.table.ts";
import { hashPassword, verifyPassword } from "@/libs/hash.ts";
import { createToken } from "@/libs/jwt.ts";
import { LoginType, RegisterType } from "@/modules/service/auth/auth.dto.ts";
import {
  createCredentialsAccount,
  createSNSAccount,
  createUser,
  findCredentialsAccountByEmail,
  findSNSAccount,
  findUserByEmail,
  findUserById,
} from "@/modules/service/auth/auth.provider.ts";
import { AppError } from "@/utils/appError.ts";

export const registerService = async ({
  email,
  password,
  name,
  phone,
  avatarUrl,
}: RegisterType) => {
  // 1) email 중복 → users 테이블 기준으로 검사
  const existUser = await findUserByEmail(email);

  if (existUser.length) {
    throw new AppError("이미 사용 중인 이메일입니다.", 409);
  }

  // 2) 비밀번호 해싱
  const hashed = await hashPassword(password);

  // 3) user 생성
  const [user] = await createUser({ email, name, phone, avatarUrl });

  // 4) credentials account 생성
  await createCredentialsAccount({
    userId: user.id,
    email,
    passwordHash: hashed,
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export const loginService = async ({ email, password }: LoginType) => {
  const accounts = await findCredentialsAccountByEmail(email);
  if (!accounts.length)
    throw new AppError("아이디 또는 비밀번호가 일치하지 않습니다.", 401);

  const account = accounts[0];

  const isValid = await verifyPassword(password, account.passwordHash!);
  if (!isValid)
    throw new AppError("아이디 또는 비밀번호가 일치하지 않습니다.", 401);

  const userData = await findUserById(account.userId);
  const user = userData[0];

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

export const snsLoginService = async ({
  provider,
  providerId,
  email,
  name,
  phone,
  avatarUrl,
}: {
  provider: ProviderType;
  providerId: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
}) => {
  // 1) SNS 계정 존재 여부 확인
  const accounts = await findSNSAccount(provider, providerId);

  if (accounts.length) {
    // 기존 유저 → 로그인 처리
    const userData = await findUserById(accounts[0].userId);
    const user = userData[0];

    const token = await createToken({ id: user.id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  // 2) 새로운 SNS 사용자 → 자동 회원가입
  const [user] = await createUser({
    email,
    name,
    phone,
    avatarUrl,
  });

  await createSNSAccount({
    userId: user.id,
    provider,
    providerId,
  });

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
