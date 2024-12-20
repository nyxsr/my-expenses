import { formatCurrency } from '@/lib/utils';
import { MainChart } from './main-chart';
import {
  getChartsData,
  getTotalTransactions,
  getTransactions,
} from '@/actions/expense.actions';
import TransactionItem from './transaction-item';
import HeadBar from './head-bar';

export default async function Home() {
  const transactions = await getTransactions({ limit: 6 });
  const { totalIncome, totalExpense } = await getTotalTransactions();
  const chartData = await getChartsData();
  return (
    <section className="min-h-screen">
      <HeadBar totalIncome={totalIncome} totalExpense={totalExpense} />
      <div className="p-3">
        <MainChart chartData={chartData} />
      </div>
      <div className="my-4 px-3">
        <h2 className="font-semibold">Transaksi baru-baru ini</h2>
        <div className="my-4 flex max-h-[20rem] flex-col gap-3 overflow-y-auto">
          {transactions.length === 0 ? (
            <span className="py-10 text-center text-sm text-muted-foreground">
              Tidak ada transaksi
            </span>
          ) : (
            transactions
              .slice(0, 5)
              .map((transaction) => (
                <TransactionItem key={transaction.id} {...transaction} />
              ))
          )}
        </div>
        {transactions.length > 5 && (
          <span className="py-10 text-center text-sm text-muted-foreground">
            Tampilkan lebih banyak
          </span>
        )}
      </div>
    </section>
  );
}
