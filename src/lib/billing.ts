import { Item } from "@/services/items";

export interface Summary {
  subtotal: number;
  tip: number;
  discount: number;
  total: number;
}

export function computeSummary(items: Item[]) {
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const tip = Math.round(subtotal * 0.1);
  const discount = 0;
  return { subtotal, tip, discount, total: subtotal + tip - discount };
}
