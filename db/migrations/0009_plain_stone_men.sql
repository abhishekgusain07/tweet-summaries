CREATE TABLE "summary_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"frequency" integer DEFAULT 1 NOT NULL,
	"has_consented" boolean DEFAULT false NOT NULL,
	"created_time" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "summary_settings" ADD CONSTRAINT "summary_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;