import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const link = sqliteTable('link', {
  id: integer('id').primaryKey(),
  originalUrl: text('original_url').notNull(),
  shortId: text('short_id').notNull(),
  createAt: integer('create_at', { mode: 'timestamp_ms' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' })
})