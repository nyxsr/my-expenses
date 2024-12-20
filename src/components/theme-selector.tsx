import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import React from 'react';
import { useTheme } from 'next-themes';
import { IButtonDialogChildProps } from '@/types/button-dialog';

export default function ThemeSelector(props: IButtonDialogChildProps) {
  const { setTheme, theme } = useTheme();
  const [value, setValue] = React.useState(theme ?? 'system');

  const onSave = () => {
    setTheme(value);
    props.setModalOpen && props.setModalOpen(false);
  };
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold">Pilih tema yang kamu pengen</h1>
        <small className="text-muted-foreground">
          Soalnya selera itu beda-beda
        </small>
      </div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih tema" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Terang</SelectItem>
            <SelectItem value="dark">Gelap</SelectItem>
            <SelectItem value="system">
              <q>
                <i>Ngikut sistem aja dah</i>
              </q>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          onClick={() => props.setModalOpen && props.setModalOpen(false)}
          variant={'outline'}
          className="w-full"
        >
          Nanti aja
        </Button>
        <Button className="w-full" onClick={onSave}>
          Simpan
        </Button>
      </div>
    </div>
  );
}
