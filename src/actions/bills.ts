"use server";

import { z } from "zod";
import {
  dbCreateBill,
  dbUpdateBill,
  dbDeleteBill,
} from "@/services/bills";
import { ActionResult } from "@/types/actions";

const createBillSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  emoji: z.string().max(2).optional().nullable(),
});

const updateBillSchema = createBillSchema.extend({
  id: z.coerce.number().int(),
});

export async function createBillAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = createBillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await dbCreateBill(parsed.data);
    return { success: true };
  } catch (err: any) {
    console.error("Error al crear boleta:", err);
    return { success: false, error: "No se pudo crear la boleta." };
  }
}

export async function updateBillAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const parsed = updateBillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    const { id, ...rest } = parsed.data;
    await dbUpdateBill(id, rest);
    return { success: true };
  } catch (err: any) {
    console.error("Error al actualizar boleta:", err);
    return { success: false, error: "No se pudo actualizar la boleta." };
  }
}

export async function deleteBillAction(id: number): Promise<ActionResult> {
  try {
    await dbDeleteBill(id);
    return { success: true };
  } catch (err: any) {
    console.error("Error al eliminar boleta:", err);
    return { success: false, error: "No se pudo eliminar la boleta." };
  }
}
