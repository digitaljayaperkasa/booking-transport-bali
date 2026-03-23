import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Tiketopia - Bali Airport Transfer & Car Charter',
  description: 'Book your Bali airport transfer and private car charter easily.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="bg-zinc-50 font-sans text-zinc-900 antialiased">
        <div className="mx-auto min-h-screen max-w-[480px] bg-white shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
