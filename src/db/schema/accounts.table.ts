import { usersTable } from "@/db/schema/users.table.ts";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const providerEnum = pgEnum("provider", [
  "credentials",
  "google",
  "naver",
  "kakao",
]);

export type ProviderType = (typeof providerEnum.enumValues)[0];

export const accountsTable = pgTable("accounts", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  provider: providerEnum("provider").notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),

  // 이메일 로그인일 때만 필요함
  passwordHash: varchar("password_hash", { length: 255 }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});
