'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type SignupForm,
  SignupSchema,
} from '@/lib/zod-schemas/sign-up.schema';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/app/(auth)/signup/actions';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const form = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      await signUp(data);
    },
    onMutate: () => {
      toast.loading('Mendaftar...', {
        id: 'signup-toast',
      });
    },
    onSuccess: () => {
      toast.success('Akun kamu berhasil didaftarin!', {
        id: 'signup-toast',
      });
      router.push('/login');
    },
    onError: (error) => {
      toast.error('Aduh, kayanya ada kesalahan waktu ngedaftarin akun kamu!', {
        id: 'signup-toast',
      });
      console.error(error);
    },
  });

  const onSubmit = (data: SignupForm) => {
    signupMutation.mutateAsync(data);
  };
  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Yuk bikin akunmu!</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Masukin data kamu di bawah ini buat daftar ya
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Udin Gezos" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="udingezos@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Daftar
          </Button>
        </div>
        <div className="text-center text-sm">
          Sudah punya akun?{' '}
          <a href="/login" className="underline underline-offset-4">
            Masuk sini
          </a>
        </div>
      </form>
    </Form>
  );
}
