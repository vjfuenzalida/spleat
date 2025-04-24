// src/services/bills.ts
import { db } from "@/db/drizzle";
import { bills } from "@/models/bills";
import { eq } from "drizzle-orm";

export async function createBill(data: typeof bills.$inferInsert) {
  return db.insert(bills).values(data).returning();
}

export async function getAllBills() {
  return db.select().from(bills);
}

export async function getBillById(id: number) {
  const result = await db.select().from(bills).where(eq(bills.id, id)).limit(1);
  return result[0];
}

export async function updateBill(
  id: number,
  data: Partial<typeof bills.$inferInsert>
) {
  return db.update(bills).set(data).where(eq(bills.id, id));
}

export async function deleteBill(id: number) {
  return db.delete(bills).where(eq(bills.id, id));
}
