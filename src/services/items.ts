import { db } from "@/db/drizzle";
import { assignments } from "@/models/assignments";
import { items, SplitMode } from "@/models/items";
import { eq } from "drizzle-orm";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NewAssignment } from "./assignments";

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
  const [item] = await db.select().from(items).where(eq(items.id, id)).limit(1);
  return item ?? null;
}

export async function dbUpdateItem(
  id: number,
  data: Partial<NewItem>
): Promise<Item[]> {
  return db.update(items).set(data).where(eq(items.id, id)).returning();
}

export async function updateItemWithAssignments(
  itemId: number,
  data: {
    name: string;
    unitPrice: number;
    quantity: number;
    splitMode: SplitMode;
  },
  newAssignments: NewAssignment[]
) {
  await db
    .update(items)
    .set({
      name: data.name,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      splitMode: data.splitMode,
    })
    .where(eq(items.id, itemId));

  await db.delete(assignments).where(eq(assignments.itemId, itemId));

  for (const a of newAssignments) {
    const val =
      data.splitMode === SplitMode.QUANTITY
        ? a.quantity
        : data.splitMode === SplitMode.SHARES
        ? a.shares
        : undefined;

    await db.insert(assignments).values({
      itemId,
      participantId: a.participantId,
      quantity: data.splitMode === SplitMode.QUANTITY ? val : undefined,
      shares: data.splitMode === SplitMode.SHARES ? val : undefined,
    });
  }
}

export async function dbDeleteItem(id: number): Promise<void> {
  await db.delete(items).where(eq(items.id, id));
}
