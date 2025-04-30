"use server";

import { z } from "zod";
import { SplitMode } from "@/models/items";
import {
  dbCreateItem,
  dbUpdateItem,
  dbDeleteItem,
} from "@/services/items";
import { ActionResult } from "@/types/actions";

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
  } catch (err: any) {
    console.error("Error al crear ítem:", err);
    return { success: false, error: "No se pudo crear el ítem." };
  }
}

export async function updateItemAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = updateItemSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    const { id, ...rest } = parsed.data;
    await dbUpdateItem(id, rest);
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
