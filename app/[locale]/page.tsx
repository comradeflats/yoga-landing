import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Optimized for square image */}
      <section className="relative min-h-[500px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-calm-900">
        {/* Background Image - centered and contained for square image */}
        <div className="absolute inset-0">
          <Image
            src="/images/tim.jpg"
            alt="Tim practicing yoga"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-calm-900/70 via-calm-900/50 to-calm-900/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <Link href="/schedule">
            <Button size="lg">{t('hero.cta')}</Button>
          </Link>
        </div>
      </section>

      {/* About Preview - Better layout for portrait image */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Card padding="lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/tim1.png"
                  alt="Tim - Yoga Instructor"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-calm-900 mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-calm-700 mb-6 leading-relaxed">
                  {t('about.placeholder')}
                </p>
                <Link href="/about">
                  <Button variant="outline" size="lg">{t('about.readMore')}</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Photo Gallery Section - New section for tim2 and tim3 */}
      <section className="py-20 px-4 bg-gradient-to-b from-calm-50 to-beige-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-calm-900 mb-12 text-center">
            Practice in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/images/tim2.png"
                alt="Yoga practice"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="/images/tim3.png"
                alt="Yoga session"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Class Types */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-calm-900 mb-12 text-center">
            {t('classes.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.group.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.group.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card hover>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.private.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.private.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card hover>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.recurring.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.recurring.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card hover>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.appointment.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.appointment.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-calm-50 to-beige-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-calm-900 mb-8">
            {t('contact.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                {t('contact.instagram')}
              </Button>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                {t('contact.telegram')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
