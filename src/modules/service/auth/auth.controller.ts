import { Context } from "hono";
import { loginService, registerService, snsLoginService } from "./auth.service";

export const registerController = async (c: Context) => {
  const body = await c.req.json();
  const data = await registerService(body);
  return c.json(data, 201);
};

export const loginController = async (c: Context) => {
  const body = await c.req.json();
  const data = await loginService(body);
  return c.json(data, 200);
};

export const snsLoginController = async (c: Context) => {
  const body = await c.req.json();

  const data = await snsLoginService(body);
  return c.json(data, 200);
};
