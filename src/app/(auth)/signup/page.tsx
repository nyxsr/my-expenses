'use client';
import { NotepadText } from 'lucide-react';
import SignupForm from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <NotepadText className="size-5" />
            </div>
            <div className="flex flex-col">
              <span>Cau</span>
              <small className="font-normal text-muted-foreground">
                Catatan Keuanganku
              </small>
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
