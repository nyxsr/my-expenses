import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import BottomBar from './bottom-bar';
import Providers from '@/components/providers';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'My Expenses',
  description:
    'Expense tracker for my family because other expense trackers suck',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Providers>
          <main className="relative min-h-screen sm:mx-auto sm:max-w-[500px] sm:shadow-md dark:sm:border-x">
            {children}
            <BottomBar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
