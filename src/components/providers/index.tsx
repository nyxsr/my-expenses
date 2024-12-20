import { TooltipProvider } from '../ui/tooltip';
import { ThemeProvider } from './theme-provider';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
