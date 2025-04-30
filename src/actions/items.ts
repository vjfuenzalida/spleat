"use server";

import { z } from "zod";
import { SplitMode } from "@/models/items";
import {
  dbCreateItem,
  dbDeleteItem,
  updateItemWithAssignments,
} from "@/services/items";
import { ActionResult } from "@/types/actions";
import { NewAssignment } from "@/services/assignments";

const createItemSchema = z.object({
  billId: z.coerce.number().int(),
  name: z.string().min(1, "El nombre es obligatorio"),
  unitPrice: z.coerce.number().min(0, "Precio inválido"),
  quantity: z.coerce.number().int().min(1, "Cantidad inválida"),
  splitMode: z.nativeEnum(SplitMode),
});

const updateItemSchema = createItemSchema.extend({
  id: z.coerce.number().int(),
});

export async function createItemAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = createItemSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await dbCreateItem(parsed.data);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al crear item:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function updateItemAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const flat = Object.fromEntries(formData.entries());
  let parsed;
  try {
    parsed = updateItemSchema.parse(flat);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error al parsear datos:", error);
    return { success: false, error: "Error desconocido" };
  }

  const { id, name, unitPrice, quantity, splitMode } = parsed;

  const assignments: NewAssignment[] = [];
  for (const [key] of formData.entries()) {
    if (key.startsWith("quantity_")) {
      const pid = Number(key.replace("quantity_", ""));
      assignments.push({ itemId: id, participantId: pid });
    }
  }

  try {
    await updateItemWithAssignments(
      id,
      { name, unitPrice, quantity, splitMode },
      assignments
    );
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al actualizar item:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}

export async function deleteItemAction(id: number): Promise<ActionResult> {
  try {
    await dbDeleteItem(id);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error al eliminar item:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Se produjo un error desconocido";
    return { success: false, error: message };
  }
}
