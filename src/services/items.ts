import { db } from "@/db/drizzle";
import { items } from "@/models/items";
import { eq } from "drizzle-orm";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Item = InferSelectModel<typeof items>;
export type NewItem = InferInsertModel<typeof items>;

export async function dbCreateItem(data: NewItem): Promise<Item> {
  const [newItem] = await db.insert(items).values(data).returning();
  return newItem;
}

export async function dbGetAllItems(): Promise<Item[]> {
  return db.select().from(items);
}

export async function dbGetItemsByBillId(billId: number): Promise<Item[]> {
  return db.select().from(items).where(eq(items.billId, billId));
}

export async function dbGetItemById(id: number): Promise<Item | null> {
  const [item] = await db
    .select()
    .from(items)
    .where(eq(items.id, id))
    .limit(1);
  return item ?? null;
}

export async function dbUpdateItem(
  id: number,
  data: Partial<NewItem>
): Promise<Item[]> {
  return db.update(items).set(data).where(eq(items.id, id)).returning();
}

export async function dbDeleteItem(id: number): Promise<void> {
  await db.delete(items).where(eq(items.id, id));
}
