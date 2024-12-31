import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Halifax Permit Finder',
  description: 'Find and apply for building permits in Halifax',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
