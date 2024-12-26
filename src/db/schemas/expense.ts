import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { User } from './user';

export const Expense = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  type: text('type').notNull(),
  transactionDate: text('transactionDate').notNull(),
  createdBy: integer('createdBy')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),
  createdAt: text('createdAt').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updatedAt')
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
});

export type Expense = typeof Expense.$inferSelect;
export type ExpenseInsert = typeof Expense.$inferInsert;
