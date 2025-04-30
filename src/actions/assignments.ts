"use server";

import { z } from "zod";
import {
  dbCreateAssignment,
  dbUpdateAssignment,
  dbDeleteAssignment,
} from "@/services/assignments";
import { ActionResult } from "@/types/actions";

const createAssignmentSchema = z.object({
  itemId: z.coerce.number().int(),
  participantId: z.coerce.number().int(),
  quantity: z.coerce.number().min(0, "Cantidad inválida").optional(),
  shares: z.coerce.number().min(0, "Shares inválidos").optional(),
});

const updateAssignmentSchema = createAssignmentSchema.extend({
  id: z.coerce.number().int(),
});

export async function createAssignmentAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = createAssignmentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await dbCreateAssignment(parsed.data);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al crear asignación:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function updateAssignmentAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = updateAssignmentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    const { id, ...rest } = parsed.data;
    await dbUpdateAssignment(id, rest);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al actualizar asignación:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function deleteAssignmentAction(
  id: number
): Promise<ActionResult> {
  try {
    await dbDeleteAssignment(id);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al eliminar asignación:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}
