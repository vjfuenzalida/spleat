"use server";

import { z } from "zod";
import { dbCreateBill, dbDeleteBill, dbGetBillById } from "@/services/bills";
import { ActionResult } from "@/types/actions";

const billSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  emoji: z.string().max(2).optional().nullable(),
});

export async function createBillAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = billSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message };
  }

  try {
    await dbCreateBill({
      name: parsed.data.name,
    });

    return { success: true };
  } catch (err) {
    console.error("Error al crear boleta:", err);
    return { success: false, error: "No se pudo crear la boleta." };
  }
}

export async function deleteBillAction(id: number): Promise<ActionResult> {
  try {
    await dbDeleteBill(id);
    return { success: true };
  } catch (err) {
    console.error("Error al eliminar boleta:", err);
    return { success: false, error: "No se pudo eliminar la boleta." };
  }
}

export async function getBillAction(id: number) {
  try {
    return await dbGetBillById(id);
  } catch (err) {
    console.error("Error al obtener boleta:", err);
    return null;
  }
}
