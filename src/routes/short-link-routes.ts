import { z } from "zod";
import { db } from "../drizzle/client";
import { eq } from "drizzle-orm";
import { insertLink } from "../functions/insert-link";
import { generateShortLinkId } from "../functions/generate-short";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const shortLinkRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/shorten",
    {
      schema: {
        tags: ["Short"],
        querystring: z.object({
          id: z.string(),
        }),
        body: z.object({
          url: z.string().url(),
          customId: z.string().min(6).optional(),
        }),
        response: {
          409: z.object({
            message: z.string(),
          }),
          201: z.object({
            shortUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.query;
      const { url, customId } = request.body;

      const shortId = customId || generateShortLinkId();

      const existing = await db.query.links.findFirst({
        where: (links, { eq }) => eq(links.shortId, shortId),
      });

      if (existing) {
        reply.code(409).send({
          message: "Short link already exists",
        });
      }

      try {
        const link = await insertLink({
          url,
          shortId,
          userId: id,
        });

        const shortUrl = `${request.protocol}://${request.hostname}/${link.shortId}`;

        return reply.code(201).send({
          shortUrl,
        });
      } catch (error) {}
    }
  );

  app.get("/:shortId", {
    schema: {
      tags: ["Short"],
      params: z.object({
        shortId: z.string()
      }),
      response: {
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { shortId } = request.params

    const link = await db.query.links.findFirst({
      where: ( links, { eq }) => eq(links.shortId, shortId),
    })

    if (!link) {
      return reply.code(404).send({
        message: 'Link not found'
      })
    }

    try {
      console.log(link);
    } catch (error) {
      
    }
  });
};
