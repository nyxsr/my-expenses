import { deleteSession } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import useAuthStore from '@/lib/store/useAuth';
import { getCookie, removeCookie } from '@/lib/utils/cookies';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function LogoutDialog({
  setModalOpen,
}: {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const authToken = getCookie('auth_token');
  const { reset } = useAuthStore();
  const logoutMutation = useMutation({
    mutationFn: async (token: string) => {
      await deleteSession(token);
    },
    onMutate: () => {
      toast.loading('Lagi ngilangin jejak...', {
        id: 'logout-toast',
      });
    },
    onSuccess: () => {
      toast.success('Kamu berhasil logout!', {
        id: 'logout-toast',
      });
      removeCookie('auth_token');
      reset();
      window.location.href = '/login';
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal logout!', {
        id: 'logout-toast',
      });
      console.error(error);
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync(authToken as string);
  };

  return (
    <>
      <DialogTitle>Logout dari aplikasi</DialogTitle>
      <DialogDescription>
        <p className="text-sm text-muted-foreground">
          Kamu yakin mau logout dari aplikasi ini?
        </p>
      </DialogDescription>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={'outline'}
          onClick={() => setModalOpen && setModalOpen(false)}
        >
          Gak jadi
        </Button>
        <form action={handleLogout}>
          <Button>Iya</Button>
        </form>
      </div>
    </>
  );
}
