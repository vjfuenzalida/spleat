"use server";

import { z } from "zod";
import {
  dbCreateParticipant,
  dbDeleteParticipant,
  dbUpdateParticipant,
  dbGetParticipantById,
} from "@/services/participants";
import { ActionResult } from "@/types/actions";

const participantSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  billId: z.coerce.number().int(),
});

export async function createParticipantAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = participantSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbCreateParticipant(parsed.data);
    return { success: true };
  } catch (err) {
    console.error("Error al crear participante:", err);
    return { success: false, error: "No se pudo crear el participante." };
  }
}

export async function updateParticipantAction(
  id: number,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = participantSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbUpdateParticipant(id, parsed.data);
    return { success: true };
  } catch (err) {
    console.error("Error al actualizar participante:", err);
    return { success: false, error: "No se pudo actualizar el participante." };
  }
}

export async function deleteParticipantAction(
  id: number
): Promise<ActionResult> {
  try {
    await dbDeleteParticipant(id);
    return { success: true };
  } catch (err) {
    console.error("Error al eliminar participante:", err);
    return { success: false, error: "No se pudo eliminar el participante." };
  }
}

export async function getParticipantAction(id: number) {
  try {
    return await dbGetParticipantById(id);
  } catch (err) {
    console.error("Error al obtener participante:", err);
    return null;
  }
}
