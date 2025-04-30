import { pgTable, serial, integer, numeric } from "drizzle-orm/pg-core";
import { items } from "./items";
import { participants } from "./participants";

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id")
    .references(() => items.id, { onDelete: "cascade" })
    .notNull(),
  participantId: integer("participant_id")
    .references(() => participants.id, { onDelete: "cascade" })
    .notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 4 }).$type<number>(),
  shares: numeric("shares", { precision: 10, scale: 4 }).$type<number>(),
});
