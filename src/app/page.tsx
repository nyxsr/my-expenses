'use client';
import { MainChart } from './main-chart';
import {
  getChartsData,
  getTotalTransactions,
  getTransactions,
} from '@/actions/expense.actions';
import TransactionItem from './transaction-item';
import HeadBar from './head-bar';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const data = await getTransactions({ limit: 6 });
      return data;
    },
  });
  const { data: total } = useQuery({
    queryKey: ['total'],
    queryFn: async () => {
      const { totalIncome, totalExpense } = await getTotalTransactions();
      return { totalIncome, totalExpense };
    },
  });
  const { data: chartData } = useQuery({
    queryKey: ['chartData'],
    queryFn: async () => {
      const data = await getChartsData();
      return data;
    },
  });
  return (
    <section className="min-h-screen">
      <HeadBar
        totalIncome={total?.totalIncome || 0}
        totalExpense={total?.totalExpense || 0}
      />
      <div className="p-3">
        <MainChart chartData={chartData || []} />
      </div>
      <div className="my-4 px-3">
        <h2 className="font-semibold">Transaksi baru-baru ini</h2>
        <div className="my-4 flex max-h-[20rem] flex-col overflow-y-auto">
          {isLoading ? (
            <span className="py-10 text-center text-sm text-muted-foreground">
              Memuat...
            </span>
          ) : isError ? (
            <span className="py-10 text-center text-sm text-muted-foreground">
              Gagal memuat data
            </span>
          ) : transactions?.length === 0 ? (
            <span className="py-10 text-center text-sm text-muted-foreground">
              Tidak ada transaksi
            </span>
          ) : (
            transactions
              ?.slice(0, 5)
              .map((transaction) => (
                <TransactionItem key={transaction.id} {...transaction} />
              ))
          )}
        </div>
        {transactions && transactions.length > 5 && (
          <span className="py-10 text-center text-sm text-muted-foreground">
            Tampilkan lebih banyak
          </span>
        )}
      </div>
    </section>
  );
}
