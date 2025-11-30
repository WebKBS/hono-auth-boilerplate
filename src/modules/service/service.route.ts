import authRoute from "@/modules/service/auth/auth.route.ts";
import { Hono } from "hono";

const serviceRoute = new Hono().basePath("/api/service");

serviceRoute.route("/auth", authRoute);

export default serviceRoute;
