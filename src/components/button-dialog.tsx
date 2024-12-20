'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  IButtonDialogChildProps,
  IButtonDialogProps,
} from '@/types/button-dialog';

function ButtonDialog({
  trigger,
  children,
  className,
  tooltip,
  closeOnClickOutside = true,
}: IButtonDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const childWithAction = React.isValidElement<IButtonDialogChildProps>(
    children
  )
    ? React.cloneElement(children, {
        isModalOpen: isOpen,
        setModalOpen: setIsOpen,
      })
    : children;

  return (
    <Tooltip>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent className="max-w-[20rem]">{tooltip}</TooltipContent>
        )}
        <DialogContent
          onInteractOutside={(e) => {
            if (!closeOnClickOutside) {
              e.preventDefault();
            }
          }}
          className={clsx(
            `max-h-[85vh] min-w-[35%] overflow-y-auto`,
            className
          )}
        >
          {childWithAction}
        </DialogContent>
      </Dialog>
    </Tooltip>
  );
}

export default ButtonDialog;
