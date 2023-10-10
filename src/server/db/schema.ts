// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  mysqlTableCreator,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `kiwi-farm_${name}`);

export const orders = mysqlTable(
  "orders",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    name: varchar("name", { length: 256 }),
    surname: varchar("surname", { length: 256 }),
    address: varchar("address", { length: 256 }),
    city: varchar("city", { length: 256 }),
    zip: varchar("zip", { length: 256 }),
    province: varchar("province", { length: 256 }),
    kiwiKg: varchar("kiwiKg", { length: 256 }),
    phone: varchar("phone", { length: 256 }),
    email: varchar("email", { length: 256 }),
    paymentMethod: varchar("paymentMethod", { length: 256 }),
    shipmentType: varchar("shipmentType", { length: 256 }),
  },
  (orders) => ({
    nameIndex: uniqueIndex("name_idx").on(orders.name),
  })
);
