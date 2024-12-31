import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Halifax Permit Finder',
  description: 'Find and apply for permits in Halifax',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground p-4">
          <h1 className="text-2xl font-bold">Halifax Permit Finder</h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center">
          <p>&copy; 2023 Halifax Permit Finder. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

