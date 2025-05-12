import { db } from "../drizzle/client";
import { ulid } from "ulid";
import { links } from "../drizzle/schema/links";

interface InsertLink {
  url: string;
  shortId: string;
  userId: string | null;
}

const id = ulid();
export const insertLink = async ({ url, shortId, userId }: InsertLink) => {
  const result = await db.insert(links).values({
    id,
    originalUrl: url,
    shortId,
    userId,
  })
  
  return {
    shortId
  };
};
