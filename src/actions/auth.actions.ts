'use server';
import { db } from '@/db';
import { Session } from '@/db/schemas/session';
import { User } from '@/db/schemas/user';
import { tokenVerifier } from '@/lib/utils/jwt';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const saveSession = async (
  userId: number,
  token: string,
  expiresIn: number
) => {
  const [user] = await db.select().from(User).where(eq(User.id, userId));

  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  const [session] = await db
    .select()
    .from(Session)
    .where(and(eq(Session.userId, userId), eq(Session.isActive, 1)));

  if (session) {
    await db
      .update(Session)
      .set({ sessionToken: token, expires: expiresIn })
      .where(and(eq(Session.userId, userId), eq(Session.isActive, 1)));
    return;
  }

  await db.insert(Session).values([
    {
      userId: user.id,
      sessionToken: token,
      expires: expiresIn,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
};

export const deleteSession = async (token: string) => {
  const [session] = await db
    .select()
    .from(Session)
    .where(and(eq(Session.sessionToken, token), eq(Session.isActive, 1)));

  if (!session) {
    throw new Error('Tidak ada sesi yang aktif');
  }

  await db
    .update(Session)
    .set({ isActive: 0 })
    .where(eq(Session.id, session.id));
};

const checkSession = async (token: string) => {
  const [session] = await db
    .select()
    .from(Session)
    .where(and(eq(Session.sessionToken, token), eq(Session.isActive, 1)));

  if (!session) {
    throw new Error('Tidak ada sesi yang valid');
  }

  const isTokenValid = tokenVerifier(token);

  if (!isTokenValid) {
    await deleteSession(token);
    throw new Error('Token tidak valid');
  }

  return session;
};

export const getSession = async (token: string | undefined) => {
  if (!token) {
    redirect('/login');
  }
  const session = await checkSession(token);
  const { userId, ...jwtPayload } = session;
  const [user] = await db.select().from(User).where(eq(User.id, userId));
  return { user, jwtPayload };
};
