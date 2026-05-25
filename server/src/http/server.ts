//import "biome" from "@biomejs/biome";
import fastify from "fastify";
import { createGoalRoute } from "./routes/create-goals";

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from "fastify-type-provider-zod";

import z from "zod";
import { AppError } from "../errors/app-error";
import { createGoalCompletionsRoute } from "./routes/create-completions";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionsRoute);

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            message: error.message,
        });
    }

    console.error(error);

    return reply.status(500).send({
        message: "Internal Server Error",
    });
});




app.listen({
    port: 3333,
}).then(() => {
    console.log("Server is running on http://localhost:3333");
});