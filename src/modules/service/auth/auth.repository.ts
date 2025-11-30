import { db } from "@/db";
import { usersTable } from "@/db/schema.ts";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) =>
  await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

export const createUser = async (email: string, password: string) =>
  await db
    .insert(usersTable)
    .values({ email, password, role: "user" })
    .returning(); // returning()을 사용하여 생성된 레코드를 반환
