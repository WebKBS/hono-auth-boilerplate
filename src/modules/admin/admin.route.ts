import adminLoginRoute from "@/modules/admin/auth/admin-auth.route.ts";
import { Hono } from "hono";

const adminRoute = new Hono().basePath("/api/admin");

adminRoute.route("/auth", adminLoginRoute);

export default adminRoute;
