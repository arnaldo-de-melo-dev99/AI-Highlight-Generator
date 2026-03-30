import { client, db } from ".";
import { goals, goalCompletions } from "./schema";

async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

    const result =await db.insert(goals).values([
        {title: 'Acordar cedo', desiredWeeklyFrequency: 5},
        {title: 'Fazer exercícios', desiredWeeklyFrequency: 3},
        {title: 'Meditar', desiredWeeklyFrequency: 1},
    ]).returning();

    await db.insert(goalCompletions).values([
        {goalId: result[0].id, completedAt: new Date()},
        {goalId: result[1].id, completedAt: new Date()}
    ]);
}

seed().finally(() => {
    client.end();
})