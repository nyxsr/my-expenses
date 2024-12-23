import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/datepicker';
import toast from 'react-hot-toast';
import { addTransaction } from '@/actions/expense.actions';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import TransactionSelector from '@/components/transaction-selector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const OTHER_TRANSACTION_NAME = 'Lainnya';

const addTransactionSchema = z
  .object({
    name: z.string(),
    newName: z.string().optional(),
    amount: z.number(),
    type: z.string(),
    transactionDate: z.string(),
  })
  .refine(
    (input) => {
      if (input.name === OTHER_TRANSACTION_NAME) {
        return !!input.newName;
      }
      return true;
    },
    {
      message: "Perlu isi nama baru kalau pilihannya 'Lainnya'",
    }
  );

type AddTransactionForm = z.infer<typeof addTransactionSchema>;

export default function AddTransactionDialog({
  setModalOpen,
}: {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const newNameInputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<AddTransactionForm>({
    resolver: zodResolver(addTransactionSchema),
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (data: AddTransactionForm) => {
      await addTransaction({
        name:
          data.name === OTHER_TRANSACTION_NAME
            ? (data.newName as string)
            : String(data.name),
        amount: data.amount,
        createdAt: new Date().toISOString(),
        transactionDate: data.transactionDate,
        type: data.type,
      });
    },
    onMutate: () => {
      toast.loading('Lagi nyimpen transaksi...', {
        id: 'add-transaction-toast',
      });
    },
    onSuccess: () => {
      toast.success('Transaksi udah disimpen!', {
        id: 'add-transaction-toast',
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
      if (setModalOpen) setModalOpen(false);
    },
    onError: (error) => {
      toast.error('Aduh, kayanya ada masalah...', {
        id: 'add-transaction-toast',
      });
      console.error(error);
    },
  });

  const name = form.watch('name');

  const onSubmit = async (data: AddTransactionForm) => {
    await addMutation.mutateAsync(data);
  };

  const focusNewNameInput = () => {
    // Wait for next tick to ensure the input is rendered
    setTimeout(() => {
      newNameInputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <DialogTitle>Tambah transaksi</DialogTitle>
      <DialogDescription>
        <p className="text-sm text-muted-foreground">
          Tambah catatan untuk transaksi baru
        </p>
      </DialogDescription>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Transaksi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis transaksi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INCOME">Pemasukan</SelectItem>
                      <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name === OTHER_TRANSACTION_NAME ? (
              <FormField
                control={form.control}
                name="newName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Transaksi</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nama transaksi yang akan di tampilkan di list transaksi
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Nama Transaksi</FormLabel>
                    <FormControl>
                      <TransactionSelector
                        onNewTransaction={focusNewNameInput}
                      />
                    </FormControl>
                    <FormDescription>
                      Nama transaksi yang akan di tampilkan di list transaksi
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Transaksi</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="peer ps-10"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                        Rp.
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker
                        onChange={field.onChange}
                        value={field.value}
                        className="w-full"
                        placeholder="Pilih tanggal transaksi"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </FormProvider>
    </>
  );
}
