import { Context } from "hono";

export const getParams = (c: Context, name: string) => {
  return c.req.query(name) as string;
};
