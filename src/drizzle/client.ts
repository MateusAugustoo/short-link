import { env } from "../env";
import { links } from "./schema/links";
import { users } from './schema/user'
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({ url: env.DB_FILE_NAME });

const db = drizzle(client, {
  schema: {
    links,
    users
  },
});

export { db };
