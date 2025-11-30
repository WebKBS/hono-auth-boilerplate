import { Context } from "hono";

export const validateSchema = (result: any, c: Context) => {
  if (!result.success) {
    return c.json(
      {
        message: result.error.map((err: any) => err.message).join(", "),
      },
      400,
    );
  }
};
