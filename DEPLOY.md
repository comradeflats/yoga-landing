# Deploying to Vercel

## Quick Setup (5 minutes)

### 1. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import `comradeflats/yoga-landing`
4. Vercel will auto-detect Next.js settings ✓
5. Click "Deploy" (it will fail first time - that's expected!)

### 2. Add Vercel Postgres Database
1. In your Vercel project dashboard, go to "Storage"
2. Click "Create Database" → "Postgres"
3. Choose "Hobby" (Free tier)
4. Click "Create"
5. Vercel will automatically add `DATABASE_URL` to your environment variables

### 3. Set Environment Variables
In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/io.tim/
NEXT_PUBLIC_TELEGRAM=https://t.me/mdrtn
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
ADMIN_JWT_SECRET=your-random-secret-key-here
```

### 4. Initialize Database
1. Go to Vercel project → Deployments
2. Click on the latest deployment → "..." menu → "Redeploy"
3. The database will be initialized with Prisma migrations

### 5. Seed Sample Data (Optional)
After first deployment, you can add sample classes via the Admin Dashboard:
- Go to `https://your-project.vercel.app/en/admin`
- Default password: `tim123yoga`
- Add your yoga classes!

## Done! 🎉

Your site will be live at: `https://your-project.vercel.app`

Tim can:
- View schedule in English: `/en` or Russian: `/ru`
- Manage classes at: `/en/admin/dashboard`
- Students contact him via Instagram/Telegram links

## Changing Admin Password

The admin page uses a simple password check. To change it:
1. Edit `app/[locale]/admin/page.tsx`
2. Change line 32: `if (password === 'tim123yoga')` to your new password
3. Commit and push - Vercel auto-deploys!
