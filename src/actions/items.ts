"use server";

import { z } from "zod";
import {
  dbCreateItem,
  dbDeleteItem,
  dbUpdateItem,
  dbGetItemById,
} from "@/services/items";
import { ActionResult } from "@/types/actions";

const itemSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  quantity: z.coerce.number().min(1, "Cantidad inválida"),
  unitPrice: z.coerce.number().min(0, "Precio inválido"),
  billId: z.coerce.number().int(),
});

export async function createItemAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = itemSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbCreateItem(parsed.data);
    return { success: true };
  } catch (err: any) {
    console.error("Error al crear ítem:", err);
    return { success: false, error: "No se pudo guardar el ítem. Intenta nuevamente." };
  }
}

export async function updateItemAction(
  id: number,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = itemSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbUpdateItem(id, parsed.data);
    return { success: true };
  } catch (err: any) {
    console.error("Error al actualizar ítem:", err);
    return { success: false, error: "No se pudo actualizar el ítem." };
  }
}

export async function deleteItemAction(id: number): Promise<ActionResult> {
  try {
    await dbDeleteItem(id);
    return { success: true };
  } catch (err: any) {
    console.error("Error al eliminar ítem:", err);
    return { success: false, error: "No se pudo eliminar el ítem." };
  }
}
