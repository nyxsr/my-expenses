import AuthProtector from '../auth-protector';
import { TooltipProvider } from '../ui/tooltip';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <TooltipProvider>
          <AuthProtector>{children}</AuthProtector>
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
