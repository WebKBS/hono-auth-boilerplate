/** 비밀번호 해시 유틸리티 */
export const hashPassword = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, {
    algorithm: "argon2id",
  });
};

/** 비밀번호 검증 유틸리티 */
export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hash, "argon2id");
};
