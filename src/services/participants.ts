import { db } from "@/db/drizzle";
import { participants } from "@/models/participants";
import { eq } from "drizzle-orm";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Participant = InferSelectModel<typeof participants>;
export type NewParticipant = InferInsertModel<typeof participants>;

export async function dbCreateParticipant(
  data: NewParticipant
): Promise<Participant> {
  const [newParticipant] = await db
    .insert(participants)
    .values(data)
    .returning();
  return newParticipant;
}

export async function dbGetAllParticipants(): Promise<Participant[]> {
  return db.select().from(participants);
}

export async function dbGetParticipantsByBillId(
  billId: number
): Promise<Participant[]> {
  return db.select().from(participants).where(eq(participants.billId, billId));
}

export async function dbGetParticipantById(
  id: number
): Promise<Participant | null> {
  const [participant] = await db
    .select()
    .from(participants)
    .where(eq(participants.id, id))
    .limit(1);
  return participant ?? null;
}

export async function dbUpdateParticipant(
  id: number,
  data: Partial<NewParticipant>
): Promise<Participant[]> {
  return db
    .update(participants)
    .set(data)
    .where(eq(participants.id, id))
    .returning();
}

export async function dbDeleteParticipant(id: number): Promise<void> {
  await db.delete(participants).where(eq(participants.id, id));
}
