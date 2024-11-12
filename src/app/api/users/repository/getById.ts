import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { User, users } from "@/app/api/users/schema";

export async function getById(id: string): Promise<User | undefined> {
  try {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  } catch (error) {
    throw error;
  }
}