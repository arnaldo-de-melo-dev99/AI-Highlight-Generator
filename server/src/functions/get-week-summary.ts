import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import {and, gte, lte, count} from "drizzle-orm";

export async function getWeekSummary() {
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
    
    return {
        summary: 'test',
    }
}