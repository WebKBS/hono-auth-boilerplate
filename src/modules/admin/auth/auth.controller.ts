import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { adminLoginService } from "./auth.service";

export const adminLoginHandler = async (c: Context) => {
  const body = await c.req.json();

  try {
    const result = await adminLoginService(body);
    return c.json(result, 200);
  } catch (error) {
    if (error instanceof Error) {
      throw new HTTPException(401, {
        message: error.message,
      });
    }

    console.error("Unexpected error:", error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
};
