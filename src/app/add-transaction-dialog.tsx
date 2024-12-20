import { useForm } from 'react-hook-form';
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

const addTransactionSchema = z.object({
  name: z.string(),
  amount: z.number(),
  type: z.string(),
  transactionDate: z.string(),
});

type AddTransactionForm = z.infer<typeof addTransactionSchema>;

export default function AddTransactionDialog({
  setModalOpen,
}: {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddTransactionForm>({
    resolver: zodResolver(addTransactionSchema),
  });

  const onSubmit = async (data: AddTransactionForm) => {
    const toastId = toast.loading('Lagi nyimpen transaksi...');
    try {
      await addTransaction({
        name: data.name,
        amount: data.amount,
        createdAt: new Date().toISOString(),
        transactionDate: data.transactionDate,
        type: data.type,
      });

      toast.success('Transaksi udah disimpen!', {
        id: toastId,
      });

      if (setModalOpen) setModalOpen(false);
    } catch (error) {
      toast.error('Aduh, kayanya ada masalah...', {
        id: toastId,
      });
      console.error(error);
    }
  };
  return (
    <>
      <DialogTitle>Tambah transaksi</DialogTitle>
      <DialogDescription>
        <p className="text-sm text-muted-foreground">
          Tambah catatan untuk transaksi baru
        </p>
      </DialogDescription>
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Transaksi</FormLabel>
                <FormControl>
                  <Input placeholder="Membeli meja, dll" {...field} />
                </FormControl>
                <FormDescription>
                  Nama transaksi yang akan di tampilkan di list transaksi
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </>
  );
}
