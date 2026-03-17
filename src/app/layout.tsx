import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'AgilizaCRM - CRM Moderno',
  description: 'Plataforma moderna de CRM para vendas e relacionamento com clientes',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
