import { envConfig } from "@/config/env.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
});
