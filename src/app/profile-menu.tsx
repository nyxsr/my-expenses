'use client';
import ButtonDialog from '@/components/button-dialog';
import ThemeSelector from '@/components/theme-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import useAuthStore from '@/lib/store/useAuth';
import { getNameInitials } from '@/lib/utils';
import { MoonIcon, Power, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import LogoutDialog from './logout-dialog';

export default function ProfileMenu() {
  const { name } = useAuthStore();
  const { theme } = useTheme();

  const themeIcon = () => {
    if (theme === 'light') {
      return <SunIcon className="h-4 w-4" />;
    }
    return <MoonIcon className="h-4 w-4" />;
  };

  return (
    <Command>
      <CommandList>
        <CommandItem>
          <span className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${getNameInitials(name)}`}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Hi, {name.split(' ')[0]}</span>
          </span>
        </CommandItem>
        <CommandItem>
          <ButtonDialog
            trigger={
              <span className="flex w-full items-center gap-2">
                {themeIcon()}
                <span>Tema</span>
              </span>
            }
          >
            <ThemeSelector />
          </ButtonDialog>
        </CommandItem>
        <CommandItem className="data-[selected=true]:bg-red-500/10">
          <ButtonDialog
            trigger={
              <div className="flex items-center gap-2">
                <Power />
                <span>Keluar</span>
              </div>
            }
          >
            <LogoutDialog />
          </ButtonDialog>
        </CommandItem>
      </CommandList>
    </Command>
  );
}
