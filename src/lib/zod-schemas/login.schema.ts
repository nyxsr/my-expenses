import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string({ required_error: 'Email gak boleh kosong' }).email({
    message: 'Kayanya ini bukan email yang bener deh',
  }),
  password: z.string({ required_error: 'Password gak boleh kosong' }),
});

export type LoginForm = z.infer<typeof LoginSchema>;
