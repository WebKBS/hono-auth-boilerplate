import { usersTable } from "@/db/schema/users.table.ts";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const addressesTable = pgTable("addresses", {
  /** Primary Key */
  id: serial("id").primaryKey(),

  /** 사용자 ID (외래 키) */
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  /** 수신인 정보 */
  receiverName: varchar("receiver_name", { length: 80 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),

  /** 주소 정보 */
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  address1: varchar("address1", { length: 255 }).notNull(),
  address2: varchar("address2", { length: 255 }),

  /** 생성 타임스탬프 */
  createdAt: timestamp("created_at").defaultNow(),
});
