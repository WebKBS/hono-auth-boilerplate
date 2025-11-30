import { envConfig } from "@/config/env.ts";
import { verifyToken } from "@/libs/jwt";
import { MiddlewareHandler } from "hono";

export const adminAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const payload = await verifyToken(token);

    // role이 실제 필요 없더라도 future-proof
    if (payload.role !== "admin" || payload.id !== envConfig.ADMIN_ID) {
      return c.json({ message: "Forbidden" }, 403);
    }

    c.set("admin", payload);
    await next();
  } catch {
    return c.json({ message: "Invalid token" }, 401);
  }
};
