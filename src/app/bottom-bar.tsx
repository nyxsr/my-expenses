'use client';

import DropdownButton from '@/components/dropdown-button';
import { FileText, Plus, User } from 'lucide-react';
import Link from 'next/link';
import ProfileMenu from './profile-menu';
import ButtonDialog from '@/components/button-dialog';
import AddTransactionDialog from './add-transaction-dialog';
import { usePathname } from 'next/navigation';

export default function BottomBar() {
  const pathname = usePathname();

  if (['/login', '/signup'].includes(pathname)) return null;

  return (
    <>
      <div className="sticky inset-x-auto bottom-0 mx-auto w-full max-w-[500px] border-t bg-white px-6 py-2">
        <div className="relative flex w-full items-center justify-between">
          <ButtonDialog
            trigger={
              <button className="absolute inset-x-0 -top-6 mx-auto w-fit rounded-full bg-primary p-4 text-white dark:text-black">
                <Plus size={30} />
              </button>
            }
          >
            <AddTransactionDialog />
          </ButtonDialog>
          <Link href="/transaksi" className="w-[5rem]">
            <div className="flex flex-col items-center gap-2">
              <FileText size={24} />
              <span className="text-sm">Transaksi</span>
            </div>
          </Link>
          <DropdownButton
            trigger={
              <div className="flex w-[5rem] flex-col items-center gap-2">
                <User size={24} />
                <span className="text-sm">Profil</span>
              </div>
            }
          >
            <ProfileMenu />
          </DropdownButton>
        </div>
      </div>
    </>
  );
}
