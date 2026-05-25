import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

dayjs.extend(weekOfYear);

export async function getWeekPendingGoals() {
    const firstDayOfWeek = dayjs().startOf("week").toDate();
    const lastDayOfWeek = dayjs().endOf("week").toDate();

    const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
        })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    );

    const goalCompletionCounts = db.$with("goal_completion_counts").as(
        db
            .select({
                goal_id: goalCompletions.goalId,
                completion_count: count(goalCompletions.id).as("completion_count"),
            })
            .from(goalCompletions)
            .where(
                and(
                    gte(goalCompletions.createdAt, firstDayOfWeek),
                    lte(goalCompletions.createdAt, lastDayOfWeek),
                ),
            )
            .groupBy(goalCompletions.goalId),
    );

    const pendingGoals = await db
        .with(goalsCreatedUpToWeek, goalCompletionCounts)
        .select({
            id: goalsCreatedUpToWeek.id,
            title: goalsCreatedUpToWeek.title,
            desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
            completionCount: sql<number>`coalesce(${goalCompletionCounts.completion_count}, 0)`.mapWith(Number),
        })
        .from(goalsCreatedUpToWeek)
        .leftJoin(
            goalCompletionCounts,
            eq(goalsCreatedUpToWeek.id, goalCompletionCounts.goal_id),
        )
        .where(
            sql`coalesce(${goalCompletionCounts.completion_count}, 0) < ${goalsCreatedUpToWeek.desiredWeeklyFrequency}`,
        );

    return { pendingGoals };
}
  
