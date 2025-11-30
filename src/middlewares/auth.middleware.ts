import { verifyToken } from "@/libs/jwt.ts";
import { MiddlewareHandler } from "hono";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return c.json({ message: "Unauthorized" }, 401);

  try {
    const payload = await verifyToken(token);
    c.set("user", payload); // { id, role }
    await next();
  } catch {
    return c.json({ message: "Invalid token" }, 401);
  }
};
