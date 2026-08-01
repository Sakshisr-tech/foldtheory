import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  projectTypes: text("project_types").notNull(),
  description: text("description").notNull(),
  budget: text("budget"),
  timeline: text("timeline"),
  reference: text("reference"),
  status: text("status").notNull().default("new"),
});
