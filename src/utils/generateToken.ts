import { sign } from "hono/jwt";

// require("crypto").randomBytes(32).toString("hex");

export const generateToken = async (userId: string) => {
  try {
    const secret = process.env.JWT_SECRET!;

    const now = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로

    const payload = {
      sub: userId,
      iat: now,
      // exp: now + 60 * 60 * 24 * 7, // 7일 후 만료
      exp: now + 60, // test - 1분 후 만료
    };
    return await sign(payload, secret);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax" as const,
  path: "/",
  // maxAge: 60 * 60 * 24 * 7, // 7 days
  maxAge: 60, // test - 1 minute
};
