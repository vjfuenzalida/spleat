import { db } from "@/db/drizzle";
import { assignments } from "@/models/assignments";
import { eq } from "drizzle-orm";

export async function dbCreateAssignment(data: typeof assignments.$inferInsert) {
  const [newAssignment] = await db.insert(assignments).values(data).returning();
  return newAssignment;
}

export async function dbGetAssignmentById(id: number) {
  const [assignment] = await db
    .select()
    .from(assignments)
    .where(eq(assignments.id, id));
  return assignment ?? null;
}

export async function dbGetAssignmentsByItemId(itemId: number) {
  return db.select().from(assignments).where(eq(assignments.itemId, itemId));
}

export async function dbGetAssignmentsByParticipantId(participantId: number) {
  return db.select().from(assignments).where(eq(assignments.participantId, participantId));
}

export async function dbUpdateAssignment(
  id: number,
  data: Partial<typeof assignments.$inferInsert>
) {
  return db.update(assignments).set(data).where(eq(assignments.id, id)).returning();
}

export async function dbDeleteAssignment(id: number) {
  return db.delete(assignments).where(eq(assignments.id, id));
}
