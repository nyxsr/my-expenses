'use server';

import { db } from '@/db';
import { Expense, ExpenseInsert } from '@/db/schemas/expense';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTransactions(params?: {
  offset?: number;
  limit?: number;
}) {
  const transactions = await db
    .select()
    .from(Expense)
    .orderBy(desc(Expense.transactionDate))
    .limit(params?.limit ?? 50)
    .offset(params?.offset ?? 0);
  return transactions;
}

export async function getAllTransactions(nameOnly = false) {
  const transactions = await db
    .select(nameOnly ? { name: Expense.name } : {})
    .from(Expense)
    .orderBy(desc(Expense.transactionDate));
  return transactions;
}

export async function getChartsData() {
  const data = await db.select().from(Expense);

  const chartData = data.reduce(
    (acc, item) => {
      const month = item.transactionDate.slice(0, 7);
      const income = item.type === 'INCOME' ? item.amount : 0;
      const expense = item.type === 'EXPENSE' ? item.amount : 0;

      // Find if month already exists in accumulator
      const existingMonth = acc.find((x) => x.month === month);

      if (existingMonth) {
        // If month exists, add to existing values
        existingMonth.income += income;
        existingMonth.expense += expense;
      } else {
        // If month doesn't exist, create new entry
        acc.push({
          month,
          income,
          expense,
        });
      }

      return acc;
    },
    [] as { month: string; income: number; expense: number }[]
  );

  if (chartData.length === 0) {
    return [];
  }

  const firstMonth = new Date(chartData[0].month);
  firstMonth.setMonth(firstMonth.getMonth() - 1);

  const initialData = {
    month: firstMonth.toISOString().slice(0, 7),
    income: 0,
    expense: 0,
  };

  return [initialData, ...chartData];
}

export async function getTotalTransactions() {
  const data = await db.select().from(Expense);

  const totalIncome = data
    .filter((item) => item.type === 'INCOME')
    .reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = data
    .filter((item) => item.type === 'EXPENSE')
    .reduce((acc, item) => acc + item.amount, 0);

  return { totalIncome, totalExpense };
}

export async function addTransaction(payload: ExpenseInsert) {
  await db.insert(Expense).values([
    {
      name: payload.name,
      amount: payload.amount,
      type: payload.type,
      transactionDate: payload.transactionDate,
      createdBy: payload.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  revalidatePath('/');
}

export async function deleteTransaction(id: number) {
  await db.delete(Expense).where(eq(Expense.id, id));
  revalidatePath('/');
}
