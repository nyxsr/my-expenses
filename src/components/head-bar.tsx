import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function HeadBar({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-6 py-4">
      <div className="flex w-full items-center justify-center gap-2">
        <Link className="absolute left-5" href={backHref}>
          <ChevronLeft />
        </Link>
        <h1 className="flex-1 text-center text-xl">{title}</h1>
      </div>
    </div>
  );
}
