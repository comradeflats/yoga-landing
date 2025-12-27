'use client';

import { Link } from '../i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className="bg-white border-b border-calm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-calm-800">
              Tim
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-calm-600 hover:text-calm-800 transition-colors">
                {t('home')}
              </Link>
              <Link href="/about" className="text-calm-600 hover:text-calm-800 transition-colors">
                {t('about')}
              </Link>
              <Link href="/schedule" className="text-calm-600 hover:text-calm-800 transition-colors">
                {t('schedule')}
              </Link>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
