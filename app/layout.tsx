import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sri Shreya Danda | Data Analyst & Business Analyst',
  description:
    'Data & Business Analyst specializing in SQL, Python, Power BI, and Financial Analytics. Based in Tampa, FL, transforming complex datasets into strategic decisions.',
  keywords: [
    'Data Analyst',
    'Business Analyst',
    'SQL',
    'Python',
    'Power BI',
    'Tableau',
    'Tampa FL',
    'USF',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
