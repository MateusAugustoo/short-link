import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { links } from './links'

export const users = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links)
}))