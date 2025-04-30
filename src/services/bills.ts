import { db } from "@/db/drizzle";
import { bills } from "@/models/bills";
import { eq } from "drizzle-orm";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Bill = InferSelectModel<typeof bills>;
export type NewBill = InferInsertModel<typeof bills>;

export async function dbCreateBill(data: NewBill): Promise<Bill> {
  const [newBill] = await db.insert(bills).values(data).returning();
  return newBill;
}

export async function dbGetAllBills(): Promise<Bill[]> {
  return db.select().from(bills).orderBy(bills.createdAt);
}

export async function dbGetBillById(id: number): Promise<Bill | null> {
  const [bill] = await db
    .select()
    .from(bills)
    .where(eq(bills.id, id))
    .limit(1);
  return bill ?? null;
}

export async function dbUpdateBill(
  id: number,
  data: Partial<NewBill>
): Promise<Bill[]> {
  return db.update(bills).set(data).where(eq(bills.id, id)).returning();
}

export async function dbDeleteBill(id: number): Promise<void> {
  await db.delete(bills).where(eq(bills.id, id));
}
