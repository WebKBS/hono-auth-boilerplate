import { addressesTable } from "@/db/schema/addresses.table.ts";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const usersTable = pgTable("users", {
  /** Primary Key */
  id: serial("id").primaryKey(),

  /** 이메일 */
  email: varchar("email", { length: 255 }).notNull().unique(),

  /* 이름 및 연락처 */
  name: varchar("name", { length: 80 }).notNull(),
  phone: varchar("phone", { length: 20 }),

  /* 프로필 이미지 URL */
  avatarUrl: varchar("avatar_url", { length: 500 }),

  /* 사용자 역할 */
  role: userRoleEnum("role").notNull().default("user"),

  /* 기본 배송지 ID */
  defaultAddressId: integer("default_address_id"),

  /* 생성 및 수정 타임스탬프 */
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  addresses: many(addressesTable),
  defaultAddress: one(addressesTable, {
    fields: [usersTable.defaultAddressId],
    references: [addressesTable.id],
  }),
}));
