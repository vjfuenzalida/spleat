"use server";

import { createBill as dbCreateBill } from "@/services/bills";
import { z } from "zod";

const CreateBillSchema = z.object({
  name: z.string().min(1),
});

export async function createBill(data: unknown) {
  const { name } = CreateBillSchema.parse(data);
  return dbCreateBill({ name });
}
