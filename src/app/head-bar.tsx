'use client';

import { formatCurrency } from '@/lib/utils';
import { useScroll, useTransform, motion } from 'motion/react';

export default function HeadBar({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  const { scrollY } = useScroll();
  const scaledScrollY = useTransform(scrollY, [0, 100], [1, 0.6]);
  const paddingY = useTransform(scrollY, [0, 100], [40, 5]);
  const marginTop = useTransform(scrollY, [0, 100], [0, -10]);

  return (
    <motion.div
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="sticky top-0 z-50 flex flex-col items-center justify-center bg-white shadow-md"
    >
      <p className="text-sm text-muted-foreground">Saat ini kamu punya</p>
      <motion.p
        style={{ scale: scaledScrollY, marginTop }}
        className="text-[30px] font-semibold"
      >
        {formatCurrency(totalIncome - totalExpense)}
      </motion.p>
    </motion.div>
  );
}
