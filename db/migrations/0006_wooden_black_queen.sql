CREATE TABLE "creators" (
	"id" text PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"username" text NOT NULL,
	"x_id" text NOT NULL,
	"name" text,
	"bio" text,
	"profile_image_url" text,
	"followers_count" text,
	"verified" text,
	CONSTRAINT "creators_username_unique" UNIQUE("username"),
	CONSTRAINT "creators_x_id_unique" UNIQUE("x_id")
);
--> statement-breakpoint
CREATE TABLE "user_creators" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"creator_id" text NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"notes" text,
	"added_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_creators" ADD CONSTRAINT "user_creators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_creators" ADD CONSTRAINT "user_creators_creator_id_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id") ON DELETE no action ON UPDATE no action;