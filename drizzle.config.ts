import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DB_FILE_NAME
  }
} satisfies Config