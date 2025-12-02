import { Context } from "hono";
import { adminLoginService } from "./auth.service";

export const adminLoginHandler = async (c: Context) => {
  const body = await c.req.json();

  const result = await adminLoginService(body);
  return c.json(result, 200);
};
