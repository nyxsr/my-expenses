import { cn, formatToRupiah } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

type Props = {
  name: string;
  amount: number;
  type: string;
};

export default function TransactionItem(props: Props) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border p-3">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-muted p-2">
          <ShoppingBag />
        </span>
        <div className="flex flex-col">
          <p className="font-semibold">{props.name}</p>
          <p className="text-sm text-muted-foreground">
            {props.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p
          className={cn(
            'font-semibold',
            props.type === 'INCOME' ? 'text-green-600' : 'text-red-500'
          )}
        >
          {formatToRupiah(props.amount)}
        </p>
      </div>
    </div>
  );
}
