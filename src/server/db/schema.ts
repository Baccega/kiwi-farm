// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  numeric
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kiwi-farm_${name}`);

export const products = createTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    price: numeric("price").notNull(),
    strikedPrice: numeric("striked_price"),
    description: varchar("description", { length: 256 }),
    image: varchar("images", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);


// export const warehouse = createTable(
//   "warehouse",
//   {
//     id: serial("id").primaryKey(),
//     product: products.id.references().notNull(),
//     quantity: numeric("quantity").notNull(),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );
