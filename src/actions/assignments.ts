"use server";

import { z } from "zod";
import {
  dbCreateAssignment,
  dbDeleteAssignment,
  dbUpdateAssignment,
  dbGetAssignmentById,
} from "@/services/assignments";
import { ActionResult } from "@/types/actions";

const assignmentSchema = z.object({
  itemId: z.coerce.number().int(),
  participantId: z.coerce.number().int(),
  quantity: z.coerce.number().positive(),
});

export async function createAssignmentAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = assignmentSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbCreateAssignment({
      itemId: parsed.data.itemId,
      participantId: parsed.data.participantId,
      quantity: String(parsed.data.quantity),
    });
    return { success: true };
  } catch (err) {
    console.error("Error al crear asignación:", err);
    return { success: false, error: "No se pudo crear la asignación." };
  }
}

export async function updateAssignmentAction(
  id: number,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = assignmentSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbUpdateAssignment(id, {
      itemId: parsed.data.itemId,
      participantId: parsed.data.participantId,
      quantity: String(parsed.data.quantity),
    });
    return { success: true };
  } catch (err) {
    console.error("Error al actualizar asignación:", err);
    return { success: false, error: "No se pudo actualizar la asignación." };
  }
}

export async function deleteAssignmentAction(
  id: number
): Promise<ActionResult> {
  try {
    await dbDeleteAssignment(id);
    return { success: true };
  } catch (err) {
    console.error("Error al eliminar asignación:", err);
    return { success: false, error: "No se pudo eliminar la asignación." };
  }
}

export async function getAssignmentAction(id: number) {
  try {
    return await dbGetAssignmentById(id);
  } catch (err) {
    console.error("Error al obtener asignación:", err);
    return null;
  }
}
