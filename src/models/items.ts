import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
import { bills } from "./bills";

export enum SplitMode {
  QUANTITY = "quantity",
  EQUAL = "equal",
  SHARES = "shares",
} 

export const splitModeEnum = pgEnum("split_mode", [
  SplitMode.QUANTITY,
  SplitMode.EQUAL,
  SplitMode.SHARES,
]);

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id")
    .references(() => bills.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 4 })
    .notNull()
    .$type<number>(),
  quantity: integer("quantity").notNull(),
  splitMode: splitModeEnum("split_mode").notNull(),
});
