CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'gif');--> statement-breakpoint
CREATE TABLE "summaries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"creator_ids" text[] NOT NULL,
	"tweet_id" text NOT NULL,
	"content" text NOT NULL,
	"generated_at" timestamp NOT NULL,
	"created_time" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "summary_media" (
	"id" text PRIMARY KEY NOT NULL,
	"summary_id" text NOT NULL,
	"url" text NOT NULL,
	"thumbnail_url" text,
	"type" "media_type" NOT NULL,
	"created_time" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summary_media" ADD CONSTRAINT "summary_media_summary_id_summaries_id_fk" FOREIGN KEY ("summary_id") REFERENCES "public"."summaries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "creator_ids_index" ON "summaries" USING btree ("creator_ids");--> statement-breakpoint
CREATE UNIQUE INDEX "summary_id_index" ON "summary_media" USING btree ("summary_id");