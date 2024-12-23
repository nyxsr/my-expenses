'use client';
import ButtonDialog from '@/components/button-dialog';
import { cn, formatToRupiah } from '@/lib/utils';
import { ArrowBigDown, ArrowBigUp, ShoppingBag } from 'lucide-react';
import { motion, useAnimate } from 'motion/react';
import React from 'react';
import RemoveTransactionDialog from './remove-transaction-dialog';

type Props = {
  id: number;
  name: string;
  amount: number;
  type: string;
};

export default function TransactionItem(props: Props) {
  const [isHover, setIsHover] = React.useState(false);
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (isHover) {
      animate(scope.current, {
        width: '30%',
        paddingLeft: '24px',
        paddingRight: '24px',
      });
    } else {
      animate(scope.current, {
        width: 0,
        paddingLeft: 0,
        paddingRight: 0,
      });
    }
  }, [isHover]);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative mb-3 flex items-center justify-between gap-2 rounded-xl border p-3 shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-muted p-2">
          {props.type === 'INCOME' ? (
            <ArrowBigDown fill="#16a34a" stroke="#16a34a" />
          ) : (
            <ArrowBigUp fill="#ef4444" stroke="#ef4444" />
          )}
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
      <ButtonDialog
        trigger={
          <motion.button
            ref={scope}
            initial={{
              width: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            className="absolute right-0 h-full rounded-r-xl bg-red-500 text-white"
          >
            <motion.span
              initial={{ display: 'none', opacity: 0 }}
              animate={{
                opacity: 1,
                display: 'block',
                transition: {
                  delay: 0.2,
                  duration: 0.2,
                },
              }}
            >
              Hapus
            </motion.span>
          </motion.button>
        }
      >
        <RemoveTransactionDialog id={props.id} />
      </ButtonDialog>
    </div>
  );
}
