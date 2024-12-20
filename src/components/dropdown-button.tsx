import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { RefAttributes } from 'react';

export default function DropdownButton({
  trigger,
  children,
  triggerClassName,
  ...menuContent
}: {
  trigger: React.ReactNode;
  triggerClassName?: string;
  children: React.ReactNode;
} & Omit<DropdownMenuContentProps & RefAttributes<HTMLDivElement>, 'ref'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(triggerClassName)}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent {...menuContent}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
