import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getAllTransactions } from '@/actions/expense.actions';
import type { Expense } from '@/db/schemas/expense';
import React from 'react';

export default function TransactionSelector({
  onNewTransaction,
}: {
  onNewTransaction: () => void;
}) {
  const [search, setSearch] = React.useState('');
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const data = await getAllTransactions(true);
      return data as Pick<Expense, 'id' | 'name'>[];
    },
  });

  const { control, reset, getValues } = useFormContext();

  const handleNewTransaction = () => {
    reset({
      ...getValues(),
      name: 'Lainnya',
      newName: search,
    });
    onNewTransaction();
  };

  return (
    <Controller
      control={control}
      name="name"
      render={({ field }) => (
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-full justify-between',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value
                  ? transactions?.find(
                      (transaction) => transaction.name === field.value
                    )?.name
                  : 'Pilih transaksi'}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="popover-content-width-same-as-its-trigger w-full p-0">
            <Command>
              <CommandInput
                onValueChange={(value) => setSearch(value)}
                placeholder="Cari transaksi..."
              />
              <CommandList>
                <CommandEmpty>
                  <div>
                    <span>
                      Belum ada transaksi{' '}
                      {search ? `dengan nama ${search}` : ''}
                    </span>
                    <Button
                      className="mx-auto mt-2 block"
                      onClick={handleNewTransaction}
                    >
                      Buat transaksi baru
                    </Button>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {transactions?.map((transaction) => (
                    <CommandItem
                      value={String(transaction.name)}
                      key={transaction.id}
                      onSelect={() => {
                        field.onChange(transaction.name);
                      }}
                    >
                      {transaction.name}
                      <Check
                        className={cn(
                          'ml-auto',
                          transaction.name === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
