// src/services/participants.ts
import { db } from "@/db/drizzle";
import { participants } from "@/models/participants";
import { eq } from "drizzle-orm";

export async function createParticipant(data: typeof participants.$inferInsert) {
  return db.insert(participants).values(data).returning();
}

export async function getParticipantsByBill(billId: number) {
  return db.select().from(participants).where(eq(participants.billId, billId));
}

export async function updateParticipant(id: number, data: Partial<typeof participants.$inferInsert>) {
  return db.update(participants).set(data).where(eq(participants.id, id));
}

export async function deleteParticipant(id: number) {
  return db.delete(participants).where(eq(participants.id, id));
}