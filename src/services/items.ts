import { db } from "@/db/drizzle";
import { items } from "@/models/items";
import { eq } from "drizzle-orm";

export async function dbCreateItem(data: typeof items.$inferInsert) {
  const [newItem] = await db.insert(items).values(data).returning();
  return newItem;
}

export async function dbGetItemById(id: number) {
  const [item] = await db.select().from(items).where(eq(items.id, id));
  return item ?? null;
}

export async function dbGetItemsByBillId(billId: number) {
  return db.select().from(items).where(eq(items.billId, billId));
}

export async function dbUpdateItem(
  id: number,
  data: Partial<typeof items.$inferInsert>
) {
  return db.update(items).set(data).where(eq(items.id, id)).returning();
}

export async function dbDeleteItem(id: number) {
  return db.delete(items).where(eq(items.id, id));
}
