import { env } from "../env";
import { link } from "./schema/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({ url: env.DB_FILE_NAME });

const db = drizzle(client, {
  schema: {
    link,
  },
});

export { db };
