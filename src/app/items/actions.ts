"use server";

import {
  createItem as dbCreateItem,
  deleteItem as dbDeleteItem,
  updateItem as dbUpdateItem,
} from "@/services/items";

export async function createItem(data: {
  name: string;
  price: number;
  billId: number;
}) {
  return dbCreateItem(data);
}

export async function updateItem(
  id: number,
  data: { name?: string; price?: number }
) {
  return dbUpdateItem(id, data);
}

export async function deleteItem(id: number) {
  return dbDeleteItem(id);
}
