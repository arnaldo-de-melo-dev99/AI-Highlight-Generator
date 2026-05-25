ALTER TABLE "goal_completions" ALTER COLUMN "goal_id" SET DATA TYPE text USING "goal_id"::text;--> statement-breakpoint
ALTER TABLE "goal_completions" ADD CONSTRAINT "goal_completions_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
