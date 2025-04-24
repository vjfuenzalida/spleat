"use server";
import { createBill as dbCreateBill } from "@/services/bills";

export async function createBill(data: { name: string }) {
  return dbCreateBill({ ...data, createdAt: new Date() });
}
