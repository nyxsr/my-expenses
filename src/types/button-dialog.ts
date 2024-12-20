import { ReactElement } from 'react';
export type IActionMap = Record<string, boolean>;

export type IButtonDialogProps = {
  trigger: React.ReactNode;
  children: ReactElement<IButtonDialogChildProps>;
  className?: string;
  tooltip?: string | React.ReactNode;
  closeOnClickOutside?: boolean;
};

export type IButtonDialogChildProps = {
  isModalOpen?: boolean;
  setModalOpen?: (open: boolean) => void;
};
