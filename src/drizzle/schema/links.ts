import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { users } from './user'

export const links = sqliteTable('link', {
  id: text('id').primaryKey(),
  originalUrl: text('original_url').notNull(),
  shortId: text('short_id').notNull(),
  visits: integer('visits').default(0),
  createAt: integer('create_at', { mode: 'timestamp' }).default(new Date()),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  userId: text('user_id').references(() => users.id )
})

export const linkRelations = relations(links, ({ one }) => ({
  users: one(users, {
    fields: [links.userId],
    references: [users.id]
  })
}))
