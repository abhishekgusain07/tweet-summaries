ALTER TABLE "summaries" ADD COLUMN "tweet_ids" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "tweet_id";--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "generated_at";