'use client';
import { getSession } from '@/actions/auth.actions';
import { getCookie } from '@/lib/utils/cookies';
import { useQuery } from '@tanstack/react-query';
import LoadingState from './loading-state';
import NoSession from './no-session';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';
import useAuthStore from '@/lib/store/useAuth';

const AUTH_PATHS = ['/login', '/signup'];

export default function AuthProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie('auth_token');
  const pathname = usePathname();
  const { setAuth } = useAuthStore();

  const isAuthPath = AUTH_PATHS.includes(pathname);

  if (isAuthPath && token) {
    redirect('/');
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth-checker'],
    queryFn: async () => {
      if (!token) {
        return;
      }
      const { user, jwtPayload } = await getSession(token);
      return { user, jwtPayload };
    },
    enabled: !isAuthPath,
  });

  React.useEffect(() => {
    if (data?.user) {
      setAuth({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt,
      });
    }
  }, [data, setAuth]);

  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center">
        <NoSession />;
      </div>
    );
  }

  return children;
}
