// src/services/assignments.ts
import { db } from "@/db/drizzle";
import { assignments } from "@/models/assignments";
import { eq } from "drizzle-orm";

export async function createAssignment(data: typeof assignments.$inferInsert) {
  return db.insert(assignments).values(data).returning();
}

export async function getAssignmentsByItem(itemId: number) {
  return db.select().from(assignments).where(eq(assignments.itemId, itemId));
}

export async function getAssignmentsByParticipant(participantId: number) {
  return db.select().from(assignments).where(eq(assignments.participantId, participantId));
}

export async function updateAssignment(id: number, data: Partial<typeof assignments.$inferInsert>) {
  return db.update(assignments).set(data).where(eq(assignments.id, id));
}

export async function deleteAssignment(id: number) {
  return db.delete(assignments).where(eq(assignments.id, id));
}
