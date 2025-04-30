import { db } from "@/db/drizzle";
import { assignments } from "@/models/assignments";
import { eq } from "drizzle-orm";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Assignment = InferSelectModel<typeof assignments>;
export type NewAssignment = InferInsertModel<typeof assignments>;

export async function dbCreateAssignment(
  data: NewAssignment
): Promise<Assignment> {
  const [newAssignment] = await db
    .insert(assignments)
    .values(data)
    .returning();
  return newAssignment;
}

export async function dbGetAllAssignments(): Promise<Assignment[]> {
  return db.select().from(assignments);
}

export async function dbGetAssignmentsByItemId(
  itemId: number
): Promise<Assignment[]> {
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.itemId, itemId));
}

export async function dbGetAssignmentsByParticipantId(
  participantId: number
): Promise<Assignment[]> {
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.participantId, participantId));
}

export async function dbGetAssignmentById(
  id: number
): Promise<Assignment | null> {
  const [assignment] = await db
    .select()
    .from(assignments)
    .where(eq(assignments.id, id))
    .limit(1);
  return assignment ?? null;
}

export async function dbUpdateAssignment(
  id: number,
  data: Partial<NewAssignment>
): Promise<Assignment[]> {
  return db
    .update(assignments)
    .set(data)
    .where(eq(assignments.id, id))
    .returning();
}

export async function dbDeleteAssignment(id: number): Promise<void> {
  await db.delete(assignments).where(eq(assignments.id, id));
}
