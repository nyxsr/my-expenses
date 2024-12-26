import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { User } from './user';

export const Session = sqliteTable('sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionToken: text('sessionToken').notNull(),
  userId: integer('userId').notNull(),
  expires: integer('expires').notNull(),
  isActive: integer('isActive').notNull().default(1),
  createdAt: text('createdAt').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updatedAt')
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, {
    fields: [Session.userId],
    references: [User.id],
  }),
}));

export type Session = typeof Session.$inferSelect;
export type SessionInsert = typeof Session.$inferInsert;
