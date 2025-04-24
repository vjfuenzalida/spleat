// src/models/items.ts
import { pgTable, serial, text, numeric, integer } from "drizzle-orm/pg-core";
import { bills } from "./bills";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id")
    .references(() => bills.id)
    .notNull(),
  name: text("name").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});
