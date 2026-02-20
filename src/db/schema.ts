import { integer, text, boolean, pgTable, string, uuid, timestamp } from "drizzle-orm/pg-core";

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
