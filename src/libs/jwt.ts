import { envConfig } from "@/config/env.ts";
import { sign, verify } from "hono/jwt";

export type JwtPayload = {
  /** 사용자 고유 ID */
  id: number;
  /** 사용자 역할 */
  role: string;
  exp?: number;
};

/**
 * JWT 토큰 생성
 * @param payload 토큰에 포함할 페이로드
 * @param expiresInSeconds 토큰 만료 시간(초 단위, 기본값: 3600초 - 1시간)
 * @returns 생성된 JWT 토큰
 */
export const createToken = (payload: JwtPayload, expiresInSeconds = 3600) => {
  const now = Math.floor(Date.now() / 1000);

  const exp = now + expiresInSeconds;

  return sign({ ...payload, exp }, envConfig.JWT_SECRET);
};
/**
 * JWT 토큰 검증
 * @param token 검증할 JWT 토큰
 * @returns 검증된 페이로드
 */
export const verifyToken = (token: string) =>
  verify(token, envConfig.JWT_SECRET);
