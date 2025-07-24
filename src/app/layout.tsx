import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmartStaff AI - Intelligent Team Management',
  description: 'AI-Powered Team Management Platform for Car Dealerships',
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
