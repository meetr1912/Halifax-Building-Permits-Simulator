import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Building } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Halifax Building Permits - Find, Apply, and Track Your Permits',
  description: 'Navigate the Halifax building permit process with ease. Find required permits, calculate fees, schedule inspections, and track your applications all in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <Building className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">Halifax Permits</span>
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/permit-finder" className="text-sm font-medium hover:text-primary">
                  Permit Finder
                </Link>
                <Link href="/fee-calculator" className="text-sm font-medium hover:text-primary">
                  Fee Calculator
                </Link>
                <Link href="/book-inspection" className="text-sm font-medium hover:text-primary">
                  Book Inspection
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Link href="/login">
                  <Button size="sm">Log In</Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="border-t py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Halifax Building Permits. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
