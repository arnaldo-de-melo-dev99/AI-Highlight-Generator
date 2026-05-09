import { db } from "../db";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

interface CreateGoalCompletionRequest {
    goalId: string;
}

dayjs.extend(weekOfYear);

export async function createGoalCompletion({
    goalId,
}: CreateGoalCompletionRequest) {
    const firstDayOfWeek = dayjs().startOf("week").toDate();
    const lastDayOfWeek = dayjs().endOf("week").toDate();

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
                    eq(goalCompletions.goalId, goalId),
                ),
            )
            .groupBy(goalCompletions.goalId),
    );

    const result = await db
        .with(goalCompletionCounts)
        .select({
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            completionCount: sql<number>`coalesce(${goalCompletionCounts.completion_count}, 0)`.mapWith(Number),
        })
        .from(goals)
        .leftJoin(
            goalCompletionCounts,
            eq(goals.id, goalCompletionCounts.goal_id),
        )
        .where(eq(goals.id, goalId))
        .limit(1);

    const goal = result[0];

    if (!goal) {
        throw new Error("Goal not found");
    }

    const { desiredWeeklyFrequency, completionCount } = goal;

    if (completionCount >= desiredWeeklyFrequency) {
        throw new Error("Goal already completed for this week");
    }

    const insertResult = await db.insert(goalCompletions).values({ goalId }).returning();

    const goalCompletion = insertResult[0];

    return { goalCompletion };
}
