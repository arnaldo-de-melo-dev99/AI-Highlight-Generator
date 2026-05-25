CREATE TABLE "goals" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desired_weekly_frequency" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
