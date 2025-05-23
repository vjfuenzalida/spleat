import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { bills } from "./bills";

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id")
    .references(() => bills.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
});
