'use client';

import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { id as idLocale } from 'date-fns/locale';

type DatePickerProps = {
  onChange: (date: string) => void;
  value?: string;
  className?: string;
  placeholder?: string;
};

export default function DatePicker(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  // Calculate date ranges for 90 days in the past and 30 days in the future
  const startMonth = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  const endMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  React.useEffect(() => {
    setDate(props.value ? new Date(props.value) : undefined);
  }, [props.value]);

  React.useEffect(() => {
    if (date) {
      props.onChange(format(date, 'yyyy-MM-dd', { locale: idLocale }));
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            props.className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: idLocale })
          ) : (
            <span>{props.placeholder || 'Pick a date'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
}
