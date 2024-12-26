import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string({ required_error: 'Nama lengkap gak boleh kosong' }),
  email: z.string({ required_error: 'Email gak boleh kosong' }).email({
    message: 'Kayanya ini bukan email yang bener deh',
  }),
  password: z
    .string({ required_error: 'Password gak boleh kosong' })
    .min(8, { message: 'Password minimal 8 karakter ya' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: 'Password kamu harus punya huruf, angka, dan simbol',
    }),
});

export type SignupForm = z.infer<typeof SignupSchema>;
