import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.classSchedule.deleteMany();
  await prisma.user.deleteMany();

  // Create sample classes
  const classes = await prisma.classSchedule.createMany({
    data: [
      {
        type: 'group',
        titleEn: 'Morning Flow',
        titleRu: 'Утренняя практика',
        descEn: 'Energizing vinyasa flow to start your day',
        descRu: 'Бодрящая виньяса-флоу для начала дня',
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        duration: 60,
        capacity: 15,
        isActive: true,
      },
      {
        type: 'group',
        titleEn: 'Evening Relax',
        titleRu: 'Вечерняя релаксация',
        descEn: 'Gentle stretches and relaxation',
        descRu: 'Мягкая растяжка и релаксация',
        dayOfWeek: 1, // Monday
        startTime: '19:00',
        duration: 60,
        capacity: 15,
        isActive: true,
      },
      {
        type: 'group',
        titleEn: 'Hatha Yoga',
        titleRu: 'Хатха-йога',
        descEn: 'Traditional hatha practice for all levels',
        descRu: 'Традиционная практика хатха-йоги для всех уровней',
        dayOfWeek: 3, // Wednesday
        startTime: '10:00',
        duration: 75,
        capacity: 12,
        isActive: true,
      },
      {
        type: 'recurring',
        titleEn: 'Power Yoga',
        titleRu: 'Силовая йога',
        descEn: 'Build strength and flexibility',
        descRu: 'Развитие силы и гибкости',
        dayOfWeek: 5, // Friday
        startTime: '18:00',
        duration: 60,
        capacity: 20,
        isActive: true,
      },
      {
        type: 'group',
        titleEn: 'Sunday Flow',
        titleRu: 'Воскресная практика',
        descEn: 'Weekend vinyasa flow',
        descRu: 'Виньяса-флоу выходного дня',
        dayOfWeek: 0, // Sunday
        startTime: '11:00',
        duration: 90,
        capacity: 15,
        isActive: true,
      },
      {
        type: 'private',
        titleEn: 'Private Session',
        titleRu: 'Индивидуальное занятие',
        descEn: 'One-on-one personalized practice',
        descRu: 'Индивидуальная персонализированная практика',
        dayOfWeek: null,
        startTime: '14:00',
        duration: 60,
        capacity: 1,
        isActive: true,
      },
    ],
  });

  console.log(`Created ${classes.count} sample classes`);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
