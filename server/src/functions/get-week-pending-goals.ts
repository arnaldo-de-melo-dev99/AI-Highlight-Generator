import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import {and, sql, lte} from "drizzle-orm";
import { count } from "console";

dayjs.extend(weekOfYear);

export function getWeekPendingGoals() {
    const lastDayOfWeek = dayjs().endOf('week').toDate();

    const goalsCreaedUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select({
            ids: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt,
        })
        .from(goals)
        .where(lte(goals.createdAt, lastDayOfWeek))
    );

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: sql`count(${goalCompletions.id})`
        }).from(goalCompletions).groupBy(goalCompletions.goalId)
    )
}