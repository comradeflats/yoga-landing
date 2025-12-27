# Tim's Yoga Landing Page - Step-by-Step Implementation Guide

**Project Location**: `/Users/comradeflats/Desktop/yoga-landing`

Open your terminal, navigate to the project directory, and follow these steps in order:

```bash
cd /Users/comradeflats/Desktop/yoga-landing
```

---

## Phase 1: Database Setup with Prisma

### Step 1.1: Initialize Prisma

```bash
npx prisma init --datasource-provider sqlite
```

### Step 1.2: Create Prisma Schema

Edit `prisma/schema.prisma` and replace its contents with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  phone     String?
  createdAt DateTime  @default(now())
  bookings  Booking[]
}

model ClassSchedule {
  id          String    @id @default(cuid())
  type        String    // "group", "private", "recurring", "appointment"
  titleEn     String
  titleRu     String
  descEn      String?
  descRu      String?
  dayOfWeek   Int?      // 0-6 for recurring classes (null for appointments)
  startTime   String    // "09:00"
  duration    Int       // minutes
  capacity    Int       // max students (1 for private)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  bookings    Booking[]
}

model Booking {
  id           String          @id @default(cuid())
  userId       String
  user         User            @relation(fields: [userId], references: [id])
  scheduleId   String?
  schedule     ClassSchedule?  @relation(fields: [scheduleId], references: [id])
  date         DateTime        // Actual class date
  startTime    String
  duration     Int
  type         String          // "group", "private", etc.
  status       String          @default("confirmed") // "confirmed", "cancelled", "completed"
  notes        String?
  createdAt    DateTime        @default(now())
  reminderSent Boolean         @default(false)
}

model Admin {
  id       String @id @default(cuid())
  username String @unique
  password String // bcrypt hashed
}
```

### Step 1.3: Run Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 1.4: Create Prisma Client Utility

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Phase 2: Configure Tailwind & Design System

### Step 2.1: Update Tailwind Config

Edit `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        calm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        beige: {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#e8dfd0',
          300: '#d9cab1',
          400: '#c4ad8a',
          500: '#b09168',
          600: '#9c7a55',
          700: '#7e6246',
          800: '#675140',
          900: '#574538',
        },
        accent: {
          DEFAULT: '#a8a29e',
          light: '#d6d3d1',
          dark: '#78716c',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## Phase 3: Configure next-intl for Russian/English

### Step 3.1: Create i18n Configuration

Create `i18n.ts` in the root:

```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default
}));
```

### Step 3.2: Create Translation Files

Create `locales/en.json`:

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "schedule": "Schedule",
    "admin": "Admin"
  },
  "hero": {
    "title": "Find Your Balance with Tim",
    "subtitle": "Discover the practice of mindful movement",
    "cta": "Book a Class"
  },
  "about": {
    "title": "About Tim",
    "placeholder": "Certified yoga instructor passionate about helping students discover balance, strength, and inner peace through mindful practice.",
    "readMore": "Learn More"
  },
  "classes": {
    "title": "Class Options",
    "group": {
      "title": "Group Classes",
      "desc": "Build community in a welcoming environment"
    },
    "private": {
      "title": "Private Sessions",
      "desc": "Personalized attention, custom practice"
    },
    "recurring": {
      "title": "Drop-in Classes",
      "desc": "Flexible weekly schedule"
    },
    "appointment": {
      "title": "By Appointment",
      "desc": "One-on-one at your convenience"
    },
    "pricing": "Contact for rates"
  },
  "contact": {
    "title": "Get in Touch",
    "telegram": "Contact on Telegram",
    "whatsapp": "WhatsApp",
    "email": "Email"
  },
  "booking": {
    "title": "Book a Class",
    "selectClass": "Select a Class",
    "name": "Your Name",
    "email": "Email Address",
    "phone": "Phone Number",
    "notes": "Notes (optional)",
    "submit": "Confirm Booking",
    "success": "Booking Confirmed!",
    "successMessage": "Check your email for confirmation details."
  },
  "admin": {
    "login": "Admin Login",
    "username": "Username",
    "password": "Password",
    "dashboard": "Dashboard",
    "calendar": "Calendar",
    "classes": "Manage Classes",
    "bookings": "Bookings"
  }
}
```

Create `locales/ru.json`:

```json
{
  "nav": {
    "home": "Главная",
    "about": "О нас",
    "schedule": "Расписание",
    "admin": "Админ"
  },
  "hero": {
    "title": "Найдите баланс с Тимом",
    "subtitle": "Откройте для себя практику осознанного движения",
    "cta": "Записаться на занятие"
  },
  "about": {
    "title": "О Тиме",
    "placeholder": "Сертифицированный инструктор по йоге, помогающий студентам обрести баланс, силу и внутренний покой через осознанную практику.",
    "readMore": "Узнать больше"
  },
  "classes": {
    "title": "Варианты занятий",
    "group": {
      "title": "Групповые занятия",
      "desc": "Создайте сообщество в дружелюбной атмосфере"
    },
    "private": {
      "title": "Индивидуальные занятия",
      "desc": "Персональное внимание, индивидуальная практика"
    },
    "recurring": {
      "title": "Регулярные занятия",
      "desc": "Гибкий еженедельный график"
    },
    "appointment": {
      "title": "По записи",
      "desc": "Один на один в удобное время"
    },
    "pricing": "Узнать цены"
  },
  "contact": {
    "title": "Связаться",
    "telegram": "Написать в Telegram",
    "whatsapp": "WhatsApp",
    "email": "Эл. почта"
  },
  "booking": {
    "title": "Записаться на занятие",
    "selectClass": "Выберите занятие",
    "name": "Ваше имя",
    "email": "Электронная почта",
    "phone": "Номер телефона",
    "notes": "Примечания (по желанию)",
    "submit": "Подтвердить запись",
    "success": "Запись подтверждена!",
    "successMessage": "Проверьте электронную почту для получения деталей."
  },
  "admin": {
    "login": "Вход для администратора",
    "username": "Имя пользователя",
    "password": "Пароль",
    "dashboard": "Панель управления",
    "calendar": "Календарь",
    "classes": "Управление занятиями",
    "bookings": "Бронирования"
  }
}
```

### Step 3.3: Update Next.js Config

Edit `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
```

---

## Phase 4: Create Base UI Components

### Step 4.1: Create Button Component

Create `components/ui/Button.tsx`:

```typescript
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-calm-800 text-white hover:bg-calm-700',
    secondary: 'bg-beige-200 text-calm-800 hover:bg-beige-300',
    outline: 'border-2 border-calm-800 text-calm-800 hover:bg-calm-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Step 4.2: Create Card Component

Create `components/ui/Card.tsx`:

```typescript
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-calm-200 ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};
```

### Step 4.3: Create Input Component

Create `components/ui/Input.tsx`:

```typescript
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-calm-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 focus:border-transparent ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
```

---

## Phase 5: Create Layout & Navigation

### Step 5.1: Create Language Toggle Component

Create `components/LanguageToggle.tsx`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-lg border border-calm-300 hover:bg-calm-50 transition-colors"
    >
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
```

### Step 5.2: Create Navigation Component

Create `components/Navigation.tsx`:

```typescript
'use client';

import Link from 'next/link';
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
```

### Step 5.3: Update Root Layout

Edit `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim's Yoga",
  description: "Find your balance with mindful movement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-calm-50`}
      >
        {children}
      </body>
    </html>
  );
}
```

### Step 5.4: Create Locale Layout

Create `app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
```

---

## Phase 6: Create Landing Page

### Step 6.1: Create Home Page

Create `app/[locale]/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-calm-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-calm-600 mb-8">
            {t('hero.subtitle')}
          </p>
          <Link href="/schedule">
            <Button size="lg">{t('hero.cta')}</Button>
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Card padding="lg">
            <h2 className="text-3xl font-bold text-calm-900 mb-4">
              {t('about.title')}
            </h2>
            <p className="text-calm-700 mb-6">
              {t('about.placeholder')}
            </p>
            <Link href="/about">
              <Button variant="outline">{t('about.readMore')}</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Class Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-calm-900 mb-12 text-center">
            {t('classes.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.group.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.group.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.private.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.private.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-calm-800 mb-2">
                {t('classes.recurring.title')}
              </h3>
              <p className="text-calm-600 mb-4">{t('classes.recurring.desc')}</p>
              <p className="text-sm text-calm-500">{t('classes.pricing')}</p>
            </Card>
            <Card>
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
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-calm-900 mb-8">
            {t('contact.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">
              {t('contact.telegram')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('contact.whatsapp')}
            </Button>
            <Button variant="outline" size="lg">
              {t('contact.email')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Phase 7: Environment Variables

Create `.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
ADMIN_JWT_SECRET="your-secret-key-change-this-in-production"

# Email - Create tim.yoga.notifications@gmail.com
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tim.yoga.notifications@gmail.com"
SMTP_PASS="your-gmail-app-password"
EMAIL_FROM="Tim's Yoga <tim.yoga.notifications@gmail.com>"
ADMIN_EMAIL="tims-email@example.com"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Contact Info (placeholders)
NEXT_PUBLIC_CONTACT_EMAIL="tim@example.com"
NEXT_PUBLIC_WHATSAPP=""
NEXT_PUBLIC_TELEGRAM=""
```

---

## Next Steps

This gives you the foundation. From here you'll need to:

1. **Test the basic site**: `npm run dev` and visit `http://localhost:3000/en`
2. **Create About page**: `app/[locale]/about/page.tsx`
3. **Create Schedule/Booking pages**
4. **Build API routes** for bookings
5. **Create Admin panel**
6. **Set up email notifications**
7. **Deploy to Raspberry Pi**

Would you like me to continue with the remaining pages and features?
