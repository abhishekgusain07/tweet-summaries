import { z } from "zod";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users, subscriptions, subscriptionPlans, invoices, creators, userCreators, summaries, summaryMedia } from "@/db/schema";
export type userCreateProps = z.infer<typeof userCreateSchema>;

const userCreateSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(3, { message: "First name is required" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .min(3, { message: "Last name is required" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

export type userUpdateProps = z.infer<typeof userUpdateSchema>;

const userUpdateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" })
    .describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .describe("user last name"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});




// Infer the types directly from the schema
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Subscription = InferSelectModel<typeof subscriptions>;
export type NewSubscription = InferInsertModel<typeof subscriptions>;

export type SubscriptionPlan = InferSelectModel<typeof subscriptionPlans>;
export type NewSubscriptionPlan = InferInsertModel<typeof subscriptionPlans>;

export type Invoice = InferSelectModel<typeof invoices>;
export type NewInvoice = InferInsertModel<typeof invoices>;

export type Creator = InferSelectModel<typeof creators>;
export type NewCreator = InferInsertModel<typeof creators>;

export type UserCreator = InferSelectModel<typeof userCreators>;
export type NewUserCreator = InferInsertModel<typeof userCreators>;

// Types for related data
export interface UserWithCreators extends User {
  userCreators: (UserCreator & {
    creator: Creator;
  })[];
}

export interface CreatorWithUsers extends Creator {
  userCreators: (UserCreator & {
    user: User;
  })[];
}

export interface NewCreatorData {
  username: string;
  xId: string;
  name?: string;
  profileImageUrl?: string;
}


// Add new types for summaries and summary media
export type Summary = InferSelectModel<typeof summaries>;
export type NewSummary = InferInsertModel<typeof summaries>;

export type SummaryMedia = InferSelectModel<typeof summaryMedia>;
export type NewSummaryMedia = InferInsertModel<typeof summaryMedia>;

// Add related data types for summaries
export interface SummaryWithMedia extends Summary {
  media: SummaryMedia[];
  user: User;
}

export interface SummaryMediaWithSummary extends SummaryMedia {
  summary: Summary;
}

// Add type for the media enum
export type MediaType = 'image' | 'video' | 'gif';

// Add type for creating a new summary
export interface NewSummaryData {
  userId: string;
  creatorIds: string[];
  tweetId: string;
  content: string;
  generatedAt: Date;
}

// Add type for creating new summary media
export interface NewSummaryMediaData {
  summaryId: string;
  url: string;
  thumbnailUrl?: string;
  type: MediaType;
}