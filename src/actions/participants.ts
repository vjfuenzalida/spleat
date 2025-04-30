"use server";

import { z } from "zod";
import {
  dbCreateParticipant,
  dbUpdateParticipant,
  dbDeleteParticipant,
} from "@/services/participants";
import { ActionResult } from "@/types/actions";

const createParticipantSchema = z.object({
  billId: z.coerce.number().int(),
  name: z.string().min(1, "El nombre es obligatorio"),
});

const updateParticipantSchema = createParticipantSchema.extend({
  id: z.coerce.number().int(),
});

export async function createParticipantAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = createParticipantSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await dbCreateParticipant(parsed.data);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al crear participante:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function updateParticipantAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = updateParticipantSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    const { id, ...rest } = parsed.data;
    await dbUpdateParticipant(id, rest);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al actualizar participante:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function deleteParticipantAction(
  id: number
): Promise<ActionResult> {
  try {
    await dbDeleteParticipant(id);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al eliminar participante:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}
