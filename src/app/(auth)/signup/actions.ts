'use server';
import { db } from '@/db';
import { User, UserInsert } from '@/db/schemas/user';
import { SignupSchema } from '@/lib/zod-schemas/sign-up.schema';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt-ts';

export const signUp = async (payload: UserInsert) => {
  const { success, error } = await SignupSchema.spa(payload);
  if (!success) {
    throw new Error(error.message);
  }
  const { name, email, password } = payload;

  await checkEmailExists(email);

  const hashedPassword = await hash(password, 10);

  await db.insert(User).values([
    {
      name,
      email,
      password: hashedPassword,
    },
  ]);
};

const checkEmailExists = async (email: string) => {
  const [isEmailExists] = await db
    .select()
    .from(User)
    .where(eq(User.email, email));

  if (isEmailExists) {
    throw new Error('Email sudah digunakan');
  }
};
