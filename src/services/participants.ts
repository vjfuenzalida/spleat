import { db } from "@/db/drizzle";
import { participants } from "@/models/participants";
import { eq } from "drizzle-orm";

export async function dbCreateParticipant(data: typeof participants.$inferInsert) {
  const [newParticipant] = await db.insert(participants).values(data).returning();
  return newParticipant;
}

export async function dbGetParticipantById(id: number) {
  const [participant] = await db
    .select()
    .from(participants)
    .where(eq(participants.id, id));
  return participant ?? null;
}

export async function dbGetParticipantsByBillId(billId: number) {
  return db.select().from(participants).where(eq(participants.billId, billId));
}

export async function dbUpdateParticipant(
  id: number,
  data: Partial<typeof participants.$inferInsert>
) {
  return db.update(participants).set(data).where(eq(participants.id, id)).returning();
}

export async function dbDeleteParticipant(id: number) {
  return db.delete(participants).where(eq(participants.id, id));
}
