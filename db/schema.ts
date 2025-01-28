import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  gender: text("gender"),
  profileImageUrl: text("profile_image_url"),
  userId: text("user_id").unique(),
  subscription: text("subscription"),
  credits: text("credits"),
});


export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  subscriptionId: text("subscription_id"),
  stripeUserId: text("stripe_user_id"),
  status: text("status"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  planId: text("plan_id"),
  defaultPaymentMethodId: text("default_payment_method_id"),
  email: text("email"),
  userId: text("user_id"),
});

export const subscriptionPlans = pgTable("subscriptions_plans", {
  id: serial("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  planId: text("plan_id"),
  name: text("name"),
  description: text("description"),
  amount: text("amount"),
  currency: text("currency"),
  interval: text("interval"),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  invoiceId: text("invoice_id"),
  subscriptionId: text("subscription_id"),
  amountPaid: text("amount_paid"),
  amountDue: text("amount_due"),
  currency: text("currency"),
  status: text("status"),
  email: text("email"),
  userId: text("user_id"),
});

export const creators = pgTable("creators", {
  id: text("id").primaryKey(),
  createdTime: timestamp("created_time").defaultNow(),
  username: text("username").unique().notNull(),
  xId: text("x_id").unique().notNull(),  // Twitter/X ID
  name: text("name"),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  followersCount: text("followers_count"),
  verified: text("verified"),
});

// Junction table for many-to-many relationship between users and creators
export const userCreators = pgTable("user_creators", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  creatorId: text("creator_id").notNull().references(() => creators.id),
  createdTime: timestamp("created_time").defaultNow(),
  // You can add additional fields specific to the relationship here
  notes: text("notes"),  // Optional: User's private notes about this creator
  addedAt: timestamp("added_at").defaultNow(),
});

// This tells Drizzle that one creator can have many entries in userCreators table
export const creatorsRelations = relations(creators, ({ many }) => ({
  userCreators: many(userCreators)
}));

// This defines two relationships for the userCreators junction table:
export const userCreatorsRelations = relations(userCreators, ({ one }) => ({
  // 1. Each userCreators entry connects to exactly one user
  user: one(users, {
    fields: [userCreators.userId],     // the foreign key in userCreators table
    references: [users.id]             // the primary key in users table
  }),
  // 2. Each userCreators entry connects to exactly one creator
  creator: one(creators, {
    fields: [userCreators.creatorId],  // the foreign key in userCreators table
    references: [creators.id]          // the primary key in creators table
  })
}));

// This tells Drizzle that one user can have many entries in userCreators table
export const usersRelations = relations(users, ({ many }) => ({
  userCreators: many(userCreators)
}));