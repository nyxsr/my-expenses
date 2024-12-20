'use client';
import ButtonDialog from '@/components/button-dialog';
import ThemeSelector from '@/components/theme-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandItem, CommandList } from '@/components/ui/command';

export default function ProfileMenu() {
  return (
    <Command>
      <CommandList>
        <CommandItem>
          <span className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Hi, John</span>
          </span>
        </CommandItem>
        <CommandItem>
          <ButtonDialog
            trigger={
              <span className="flex w-full items-center gap-2">Tema</span>
            }
          >
            <ThemeSelector />
          </ButtonDialog>
        </CommandItem>
      </CommandList>
    </Command>
  );
}
