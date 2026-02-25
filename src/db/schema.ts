import {
  text,
  boolean,
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull().default("USER"),
  status: text("status").notNull().default("PENDING"),
  emailVerified: boolean("email_verified").notNull().default(false),
  failedLoginAttempts: text("failed_login_attempts").notNull().default(0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 6,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 6,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 6,
  })
    .notNull()
    .defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text(),
  price: numeric().notNull(),
  imageUrl: varchar("image_url").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 6,
  })
    .notNull()
    .defaultNow(),
    category: uuid().references(() => categories.id, { onDelete: 'set null' }).notNull()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}))

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.category],
    references: [categories.id]
  })
}))

