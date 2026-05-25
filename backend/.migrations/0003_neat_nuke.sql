ALTER TABLE "goal_completions" DROP CONSTRAINT "goal_completions_goal_id_goals_id_fk";--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "id" SET DATA TYPE text USING "id"::text;
