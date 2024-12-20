import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  label: string;
  placeholder: string;
  prefix: string;
};

export default function InputPrefix(props: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-11">{props.label}</Label>
      <div className="relative">
        <Input
          id="input-11"
          className="peer ps-16"
          placeholder={props.placeholder}
          type="text"
        />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          {props.prefix}
        </span>
      </div>
    </div>
  );
}
