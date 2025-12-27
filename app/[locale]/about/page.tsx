import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Link } from '../../../i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return {
    title: `${t('about')} - Tim's Yoga`,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRu = locale === 'ru';

  return (
    <div className="min-h-screen bg-gradient-to-b from-calm-50 to-beige-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-calm-900 mb-6">
            {isRu ? 'О Тиме' : 'About Tim'}
          </h1>
          <p className="text-xl text-calm-600">
            {isRu
              ? 'Сертифицированный инструктор по йоге'
              : 'Certified Yoga Instructor'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Portrait */}
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/tim1.png"
                alt="Tim - Yoga Instructor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-calm-900 mb-4">
                  {isRu ? 'Моя история' : 'My Journey'}
                </h2>
                <p className="text-lg text-calm-700 leading-relaxed">
                  {isRu
                    ? 'Сертифицированный инструктор по йоге, увлечённый помощью студентам в обретении баланса, силы и внутреннего спокойствия через осознанную практику.'
                    : 'Certified yoga instructor passionate about helping students discover balance, strength, and inner peace through mindful practice.'}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-calm-900 mb-3">
                  {isRu ? 'Специализация' : 'Specializations'}
                </h3>
                <ul className="space-y-2 text-calm-700">
                  <li className="flex items-start">
                    <span className="text-calm-600 mr-2">✓</span>
                    {isRu ? 'Хатха-йога' : 'Hatha Yoga'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-calm-600 mr-2">✓</span>
                    {isRu ? 'Виньяса флоу' : 'Vinyasa Flow'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-calm-600 mr-2">✓</span>
                    {isRu ? 'Медитация и дыхательные практики' : 'Meditation & Breathwork'}
                  </li>
                  <li className="flex items-start">
                    <span className="text-calm-600 mr-2">✓</span>
                    {isRu ? 'Индивидуальный подход для всех уровней' : 'Personalized Practice for All Levels'}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-calm-900 mb-3">
                  {isRu ? 'Философия' : 'Philosophy'}
                </h3>
                <p className="text-lg text-calm-700 leading-relaxed">
                  {isRu
                    ? 'Йога — это больше, чем физическая практика. Это путь к самопознанию, внутреннему росту и гармонии между телом и разумом.'
                    : 'Yoga is more than physical practice. It\'s a journey to self-discovery, inner growth, and harmony between body and mind.'}
                </p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/tim2.png"
                alt="Yoga practice"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/tim3.png"
                alt="Yoga session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-calm-900 mb-6">
              {isRu ? 'Готовы начать свою практику?' : 'Ready to Start Your Practice?'}
            </h2>
            <p className="text-lg text-calm-600 mb-8">
              {isRu
                ? 'Посмотрите расписание занятий и свяжитесь со мной'
                : 'Check out the class schedule and get in touch'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/schedule">
                <Button variant="primary" size="lg">
                  {isRu ? 'Посмотреть расписание' : 'View Schedule'}
                </Button>
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  {isRu ? 'Связаться' : 'Contact'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
