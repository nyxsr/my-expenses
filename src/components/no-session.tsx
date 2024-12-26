'use client';

import { removeCookie } from '@/lib/utils/cookies';
import React from 'react';

export default function NoSession() {
  React.useEffect(() => {
    removeCookie('auth_token');
    window.location.href = '/login';
  }, []);
  return (
    <div className="flex min-h-[20rem] w-full flex-col items-center justify-center px-10">
      <div className="relative h-32 w-32">
        <div className="absolute h-full w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4 text-center text-2xl font-bold text-red-600">
        Waduh! Dilarang Masuk Nih~
      </div>
      <div className="mt-2 text-center text-lg text-gray-600">
        Sesi kamu udah expired nih bestie, login ulang dulu ya! 😊
      </div>
    </div>
  );
}
