import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { accountsTable, ProviderType } from "@/db/schema/accounts.table.ts";
import { usersTable } from "@/db/schema/users.table.ts";

/** 이메일 조회 */
export const findUserByEmail = async (email: string) =>
  await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

/** credentials 계정(email) 조회 */
export const findCredentialsAccountByEmail = async (email: string) =>
  await db
    .select()
    .from(accountsTable)
    .where(
      and(
        eq(accountsTable.provider, "credentials"),
        eq(accountsTable.providerAccountId, email),
      ),
    )
    .limit(1);

/** SNS 계정 조회 */
export const findSNSAccount = async (
  provider: ProviderType,
  providerId: string,
) =>
  await db
    .select()
    .from(accountsTable)
    .where(
      and(
        eq(accountsTable.provider, provider),
        eq(accountsTable.providerAccountId, providerId),
      ),
    )
    .limit(1);

/** 유저 찾기 */
export const findUserById = async (id: number) =>
  await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);

/** 유저 생성 (비밀번호 없음) */
export const createUser = async ({
  email,
  name,
  phone,
  avatarUrl,
}: {
  email: string;
  name: string;
  phone?: string | null;
  avatarUrl?: string | null;
}) =>
  await db
    .insert(usersTable)
    .values({
      email,
      name,
      phone,
      avatarUrl,
    })
    .returning();

/** credentials 계정 생성 */
export const createCredentialsAccount = async ({
  userId,
  email,
  passwordHash,
}: {
  userId: number;
  email: string;
  passwordHash: string;
}) =>
  await db
    .insert(accountsTable)
    .values({
      userId,
      provider: "credentials",
      providerAccountId: email,
      passwordHash,
    })
    .returning();

/** SNS 계정 생성 */
export const createSNSAccount = async ({
  userId,
  provider,
  providerId,
}: {
  userId: number;
  provider: ProviderType;
  providerId: string;
}) =>
  await db
    .insert(accountsTable)
    .values({
      userId,
      provider,
      providerAccountId: providerId,
    })
    .returning();
