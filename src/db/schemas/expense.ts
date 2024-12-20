import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Expense = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  type: text('type').notNull(),
  transactionDate: text('transactionDate').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt')
    .notNull()
    .$onUpdateFn(() => new Date().toISOString()),
});

export type Expense = typeof Expense.$inferSelect;
export type ExpenseInsert = typeof Expense.$inferInsert;
