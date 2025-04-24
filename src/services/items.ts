// src/services/items.ts
import { db } from "@/db/drizzle";
import { items } from "@/models/items";

import { eq } from "drizzle-orm";

// Insert a new item
export async function createItem(data: typeof items.$inferInsert) {
  return db.insert(items).values(data).returning();
}

// Get all items
export async function getAllItems() {
  return db.select().from(items);
}

// Get item by ID
export async function getItemById(id: number) {
  return db.select().from(items).where(eq(items.id, id)).limit(1);
}

// Update item
export async function updateItem(
  id: number,
  data: Partial<typeof items.$inferInsert>
) {
  return db.update(items).set(data).where(eq(items.id, id));
}

// Delete item
export async function deleteItem(id: number) {
  return db.delete(items).where(eq(items.id, id));
}
