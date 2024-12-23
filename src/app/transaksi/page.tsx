'use client';
import { getTransactions } from '@/actions/expense.actions';
import TransactionItem from '../transaction-item';
import { useQuery } from '@tanstack/react-query';

export default function TransaksiPage() {
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const transactions = await getTransactions();
      return transactions;
    },
  });
  return (
    <div>
      {transactions?.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">
          Belum ada transaksi
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4">
          {transactions?.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </div>
      )}
    </div>
  );
}
