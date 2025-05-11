import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contacts table for HubSpot form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  organisation: text("organisation").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});

// ROI calculator results for saving calculations
export const roiResults = pgTable("roi_results", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  employees: integer("employees").notNull(),
  hiresRate: integer("hires_rate").notNull(),
  roleChangeRate: integer("role_change_rate").notNull(),
  departureRate: integer("departure_rate").notNull(),
  adminCost: integer("admin_cost").notNull(),
  annualSavings: integer("annual_savings").notNull(),
  fiveYearSavings: integer("five_year_savings").notNull(),
  timeSaved: integer("time_saved").notNull(),
  securityImprovement: integer("security_improvement").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRoiResultSchema = createInsertSchema(roiResults).omit({
  id: true,
  createdAt: true
});

// Email shares table for tracking email sharing
export const emailShares = pgTable("email_shares", {
  id: serial("id").primaryKey(),
  recipientEmail: text("recipient_email").notNull(),
  roiResultId: integer("roi_result_id").references(() => roiResults.id, { onDelete: "cascade" }),
  sent: boolean("sent").default(false),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmailShareSchema = createInsertSchema(emailShares).omit({
  id: true,
  sentAt: true,
  createdAt: true
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertRoiResult = z.infer<typeof insertRoiResultSchema>;
export type RoiResult = typeof roiResults.$inferSelect;

export type InsertEmailShare = z.infer<typeof insertEmailShareSchema>;
export type EmailShare = typeof emailShares.$inferSelect;
