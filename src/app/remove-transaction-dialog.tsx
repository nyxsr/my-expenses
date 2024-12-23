import { deleteTransaction } from '@/actions/expense.actions';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function RemoveTransactionDialog({
  id,
  setModalOpen,
}: {
  id: number;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await deleteTransaction(id);
    },
    onMutate: () => {
      toast.loading('Lagi hapus transaksi...', {
        id: 'remove-transaction-toast',
      });
    },
    onSuccess: () => {
      toast.success('Sip! Transaksi udah kehapus!', {
        id: 'remove-transaction-toast',
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
      if (setModalOpen) setModalOpen(false);
    },
    onError: (error) => {
      toast.error('Waduh, ada masalah nih pas hapus transaksi...', {
        id: 'remove-transaction-toast',
      });
      console.error(error);
    },
  });
  return (
    <div>
      <DialogTitle>Hapus Transaksi ?</DialogTitle>
      <DialogDescription className="mt-2">
        <p className="text-sm text-muted-foreground">
          Kamu yakin mau hapus transaksi ini?
        </p>
        <p className="font-semibold text-red-500">
          Aksi ini gak bisa diundo dan datanya bakal kehapus di database!
        </p>
      </DialogDescription>
      <DialogFooter className="mt-3">
        <Button
          variant={'outline'}
          onClick={() => setModalOpen && setModalOpen(false)}
        >
          Batal
        </Button>
        <Button variant={'destructive'} onClick={() => mutation.mutate()}>
          Hapus
        </Button>
      </DialogFooter>
    </div>
  );
}
