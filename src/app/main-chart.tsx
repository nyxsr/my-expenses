'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  income: {
    label: 'Pemasukan',
    color: 'hsl(var(--chart-1))',
  },
  expense: {
    label: 'Pengeluaran',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function MainChart({
  chartData,
}: {
  chartData: { month: string; income: number; expense: number }[];
}) {
  const monthStringParser = (month: string) => {
    const date = new Date(month + '-01');
    return date.toLocaleString('en-US', { month: 'long' });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Pemasukan & Pengeluaran</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => monthStringParser(value)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke="green"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="red"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
