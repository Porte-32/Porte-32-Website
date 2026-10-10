import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import { introScript } from '@/lib/intro';
import './globals.css';

const bodoni = Bodoni_Moda({ subsets: ['latin'], axes: ['opsz'], variable: '--font-bodoni', display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' });

export const metadata: Metadata = {
  title: 'Porte32',
  description: 'Small, curated sessions where a handful of curious people sit down with one professional to hear how their world really works.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
