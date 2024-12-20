import { getAllTransactions } from '@/actions/expense.actions';
import TransactionItem from '../transaction-item';

export default async function TransaksiPage() {
  const transactions = await getAllTransactions();
  return (
    <div>
      {transactions.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">
          Belum ada transaksi
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </div>
      )}
    </div>
  );
}
