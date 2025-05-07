import { z } from "zod";
import { db } from "../drizzle/client";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema/user";
import { hashedPassword } from "../functions/hashed-password";
import { registerUser } from "../functions/user-register-functions";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const usersRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const hash = hashedPassword(password);

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!email || !hash) {
        return reply.code(400).send({
          error: "Invalid email or password",
        });
      }

      if (user) {
        return reply.code(400).send({
          error: "User already exists",
        });
      }

      try {
        await registerUser({
          email,
          password: hash,
        });

        return reply.code(201).send();
      } catch (error) {
        return reply.code(500).send({
          error: "Internal server error",
        });
      }
    }
  );
};
