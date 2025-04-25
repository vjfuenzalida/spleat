// src/models/items.ts
import { pgTable, serial, text, numeric, integer, real } from "drizzle-orm/pg-core";
import { bills } from "./bills";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id")
    .references(() => bills.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  unitPrice: real("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
});
