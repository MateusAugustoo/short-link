import { env } from "./env";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { usersRoutes } from "./routes/users-routes";
import { shortLinkRoutes } from "./routes/short-link-routes";

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// temporary solution
server.register(fastifyCors, {
  origin: true,
});

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "short url api",
      description: "short url api",
      version: "0.1.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(usersRoutes)
server.register(shortLinkRoutes)

try {
  server.listen({ port: env.PORT });
  console.log("server started");
} catch (error) {
  console.log(error);
}
