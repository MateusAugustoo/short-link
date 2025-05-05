import { z } from 'zod'

export const envSchema = z.object({
  DB_FILE_NAME: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)