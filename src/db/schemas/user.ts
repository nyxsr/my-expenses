import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Session } from './session';
import { Expense } from './expense';

export const User = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('createdAt').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updatedAt')
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
});

export const UserRelations = relations(User, ({ one, many }) => ({
  sessions: one(Session),
  expenses: many(Expense),
}));

export type User = typeof User.$inferSelect;
export type UserInsert = typeof User.$inferInsert;
