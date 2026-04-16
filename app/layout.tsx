import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIA - منصة تصميم المتاجر الإلكترونية',
  description: 'صمم متجرك الإلكتروني الاحترافي بسهولة مع AIA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic">{children}</body>
    </html>
  );
}
