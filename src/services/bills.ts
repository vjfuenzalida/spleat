import { db } from "@/db/drizzle";
import { bills } from "@/models/bills";
import { eq } from "drizzle-orm";

export async function dbCreateBill(data: typeof bills.$inferInsert) {
  const [newBill] = await db.insert(bills).values(data).returning();
  return newBill;
}

export async function dbGetAllBills() {
  return db.select().from(bills).orderBy(bills.createdAt);
}

export async function dbGetBillById(id: number) {
  const [bill] = await db.select().from(bills).where(eq(bills.id, id));
  return bill ?? null;
}

export async function dbDeleteBill(id: number) {
  return db.delete(bills).where(eq(bills.id, id));
}
