import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo AI - Sales Team Platform',
  description: 'AI-Powered Car Sales Professional Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
