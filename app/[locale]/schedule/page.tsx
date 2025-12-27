import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return {
    title: `${t('schedule')} - Tim's Yoga`,
  };
}

interface ClassSchedule {
  id: string;
  type: string;
  titleEn: string;
  titleRu: string;
  descEn?: string | null;
  descRu?: string | null;
  dayOfWeek?: number | null;
  startTime: string;
  duration: number;
  capacity: number;
  isActive: boolean;
}

async function getClasses(): Promise<ClassSchedule[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/classes`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch classes');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

const dayNames = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
};

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRu = locale === 'ru';
  const classes = await getClasses();

  // Group classes by day of week
  const classesByDay: Record<number, ClassSchedule[]> = {};
  const privateClasses: ClassSchedule[] = [];

  classes.forEach((classItem) => {
    if (classItem.dayOfWeek !== null && classItem.dayOfWeek !== undefined) {
      if (!classesByDay[classItem.dayOfWeek]) {
        classesByDay[classItem.dayOfWeek] = [];
      }
      classesByDay[classItem.dayOfWeek].push(classItem);
    } else {
      privateClasses.push(classItem);
    }
  });

  // Sort days
  const sortedDays = Object.keys(classesByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-b from-calm-50 to-beige-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-calm-900 mb-4 text-center">
          {isRu ? 'Расписание занятий' : 'Class Schedule'}
        </h1>
        <p className="text-center text-calm-600 mb-12 max-w-2xl mx-auto">
          {isRu
            ? 'Выберите удобное время для практики. Для записи свяжитесь со мной через Instagram или Telegram.'
            : 'Choose a time that works for you. Contact me via Instagram or Telegram to book your spot.'}
        </p>

        {/* Schedule Grid */}
        <div className="space-y-6 mb-12">
          {sortedDays.map((dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-calm-600 text-white px-6 py-3">
                <h2 className="text-xl font-semibold">
                  {isRu ? dayNames.ru[dayIndex] : dayNames.en[dayIndex]}
                </h2>
              </div>
              <div className="divide-y divide-calm-100">
                {classesByDay[dayIndex].map((classItem) => (
                  <div key={classItem.id} className="p-6 hover:bg-calm-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-calm-800">
                            {classItem.startTime}
                          </span>
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-calm-100 text-calm-800">
                            {isRu
                              ? classItem.type === 'group'
                                ? 'Групповое занятие'
                                : classItem.type === 'private'
                                ? 'Индивидуальное'
                                : 'Разовое занятие'
                              : classItem.type === 'group'
                              ? 'Group Class'
                              : classItem.type === 'private'
                              ? 'Private'
                              : 'Drop-in Class'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-calm-900 mb-1">
                          {isRu ? classItem.titleRu : classItem.titleEn}
                        </h3>
                        {(isRu ? classItem.descRu : classItem.descEn) && (
                          <p className="text-sm text-calm-600 mb-2">
                            {isRu ? classItem.descRu : classItem.descEn}
                          </p>
                        )}
                        <div className="flex gap-4 text-sm text-calm-600">
                          <span>⏱ {classItem.duration} min</span>
                          <span>👥 {classItem.capacity} spots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Private Sessions */}
        {privateClasses.length > 0 && (
          <div className="bg-gradient-to-r from-calm-600 to-calm-700 rounded-lg shadow-lg p-8 mb-12 text-white">
            <h2 className="text-2xl font-bold mb-3">
              {isRu ? '🧘 Индивидуальные занятия' : '🧘 Private Sessions'}
            </h2>
            {privateClasses.map((classItem) => (
              <div key={classItem.id} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {isRu ? classItem.titleRu : classItem.titleEn}
                </h3>
                <p className="opacity-90">
                  {isRu ? classItem.descRu : classItem.descEn}
                </p>
              </div>
            ))}
            <p className="text-sm opacity-75 mt-4">
              {isRu
                ? 'Свяжитесь со мной, чтобы обсудить расписание и детали'
                : 'Contact me to discuss scheduling and details'}
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-calm-900 mb-4">
            {isRu ? 'Готовы записаться?' : 'Ready to Book?'}
          </h2>
          <p className="text-calm-600 mb-6">
            {isRu
              ? 'Свяжитесь со мной для записи на занятие'
              : 'Get in touch to reserve your spot'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="primary" className="w-full sm:w-auto">
                📱 {isRu ? 'Instagram' : 'Instagram'}
              </Button>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="secondary" className="w-full sm:w-auto">
                ✈️ {isRu ? 'Telegram' : 'Telegram'}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
