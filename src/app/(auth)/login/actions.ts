'use server';
import { db } from '@/db';
import { User } from '@/db/schemas/user';
import { compare } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import { tokenGenerator } from '@/lib/utils/jwt';
import { saveSession } from '@/actions/auth.actions';
dotenv.config();

export const login = async (email: string, password: string) => {
  const user = await checkEmailExists(email);

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Email atau Password salah');
  }

  const { password: userPass, ...jwtPayload } = user;
  const token = tokenGenerator(jwtPayload);

  await saveSession(user.id, token.token, token.expiresIn);

  return token;
};

const checkEmailExists = async (email: string) => {
  const [isEmailExists] = await db
    .select()
    .from(User)
    .where(eq(User.email, email));

  if (!isEmailExists) {
    throw new Error('Email atau Password salah');
  }

  return isEmailExists;
};
