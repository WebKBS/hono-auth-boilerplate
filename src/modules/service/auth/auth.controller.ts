import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { loginService, registerService } from "./auth.service";

export const registerHandler = async (c: Context) => {
  const body = await c.req.json();
  try {
    const data = await registerService(body);
    return c.json(data, 201);
  } catch (error) {
    if (error instanceof Error) {
      throw new HTTPException(400, { message: error.message });
    }

    console.error("Unexpected error:", error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
};

export const loginHandler = async (c: Context) => {
  const body = await c.req.json();
  try {
    const data = await loginService(body);
    return c.json(data, 200);
  } catch (error) {
    if (error instanceof Error) {
      throw new HTTPException(401, { message: error.message });
    }

    console.error("Unexpected error:", error);
    throw new HTTPException(500, { message: "Internal Server Error" });
  }
};
