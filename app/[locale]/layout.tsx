import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="bg-white border-t border-calm-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-calm-600">
          <p>&copy; 2025 Tim's Yoga. All rights reserved.</p>
        </div>
      </footer>
    </NextIntlClientProvider>
  );
}
