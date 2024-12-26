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
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginForm, LoginSchema } from '@/lib/zod-schemas/login.schema';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/app/(auth)/login/actions';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/lib/utils/cookies';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const token = await login(data.email, data.password);
      return token;
    },
    onMutate: () => {
      toast.loading('Masuk...', {
        id: 'login-toast',
      });
    },
    onSuccess: (token) => {
      toast.success('Login berhasil!', {
        id: 'login-toast',
      });
      const expirationDate = new Date(token.expiresIn * 1000);
      setCookie('auth_token', token.token, {
        expires: expirationDate,
      });
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Aduh, kayanya ada kesalahan waktu masuk!', {
        id: 'login-toast',
      });
      console.error(error);
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutateAsync(data);
  };
  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Yuk masuk ke akunmu!</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Masukin email kamu di bawah ini buat login ya
          </p>
        </div>
        <div className="grid gap-6">
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
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Lupa password?
                    </a>
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
            Masuk
          </Button>
        </div>
        <div className="text-center text-sm">
          Belum punya akun?{' '}
          <a href="/signup" className="underline underline-offset-4">
            Daftar dulu
          </a>
        </div>
      </form>
    </Form>
  );
}
