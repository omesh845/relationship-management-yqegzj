import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { validateEnv } from '@/lib/env';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Relationship Manager',
  description: 'Manage your personal and professional connections',
};

validateEnv();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}