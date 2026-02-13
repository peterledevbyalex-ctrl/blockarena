import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/Providers';
import { BottomNav } from '@/components/BottomNav';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'BlockArena — Real-time Prediction Game',
  description: 'Predict price movements at MegaETH speed. Play, streak, win.',
  openGraph: {
    title: 'BlockArena',
    description: 'Real-time crypto prediction arena on MegaETH',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen overflow-x-hidden font-mono">
        <Providers>
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
