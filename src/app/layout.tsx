import type { Metadata } from 'next';
import { Providers } from './providers';
import '../index.css';

export const metadata: Metadata = {
  title: 'Velyn Portrait Studio',
  description: 'Curated portrait templates and editing tools for modern creators.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
