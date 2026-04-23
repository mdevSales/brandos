# BrandOS - Complete Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

Already done! ✅

```bash
npm install
```

### 2. Set Up Database

You need a PostgreSQL database. Options:

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb brandos
```

**Option B: Cloud PostgreSQL (Recommended for Production)**
- [Supabase](https://supabase.com/) (Free tier available)
- [Neon](https://neon.tech/) (Free tier available)
- [Railway](https://railway.app/) (Free tier available)

### 3. Configure Environment Variables

Update `.env`:

```bash
# Database - Update with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/brandos"

# Anthropic API - Get from https://console.anthropic.com/
ANTHROPIC_API_KEY="sk-ant-..."

# Resend API - Get from https://resend.com/
RESEND_API_KEY="re_..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Cron Secret (generate a random string)
CRON_SECRET="your-secret-here-change-in-production"
```

### 4. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting API Keys

### Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create a new key
5. Copy and paste into `.env`

**Cost:** Claude Sonnet 4 is ~$3 per million input tokens, ~$15 per million output tokens. A typical session uses ~50k tokens = $0.15-0.30 per user.

### Resend API Key

1. Go to [https://resend.com/](https://resend.com/)
2. Sign up (free tier: 100 emails/day)
3. Add and verify your domain OR use `onboarding@resend.dev` for testing
4. Generate API key
5. Copy and paste into `.env`

**Important:** Update `FROM_EMAIL` in `lib/email/send.ts` with your verified domain.

---

## 📦 Current Implementation Status

### ✅ Fully Implemented

- Landing page (`/`)
- Start page (`/start`)
- Voice calibration page (`/app/voice`)
- API: Create user (`/api/user/create`)
- API: Generate voice profile (`/api/generate/voice`)
- Session management (React Context + localStorage)
- All backend services (AI, email, PDF)
- Database schema
- UI component library

### 🚧 Needs Implementation

The following pages follow the same pattern as `/app/voice`:

1. **`/app/identity/page.tsx`** - Identity step
   - Form with fields from `IdentityData` type
   - Call `/api/generate/identity`
   - Display `IdentityOutputs`

2. **`/app/authority/page.tsx`** - Authority step
   - Form for wins, challenges, strengths
   - Call `/api/generate/authority`
   - Display authority inventory

3. **`/app/perspective/page.tsx`** - Perspective step
   - Form for beliefs, disagreements
   - Call `/api/generate/perspective`
   - Display content pillars

4. **`/app/profile/page.tsx`** - Profile rewrite
   - Form for current profile sections
   - Call `/api/generate/profile`
   - Display before/after comparison

5. **`/app/content/page.tsx`** - Content generation
   - Form for topics and post types
   - Call `/api/generate/content`
   - Display 10 ideas, 3 posts, 5 hooks

6. **`/app/plan/page.tsx`** - 30-day plan
   - Auto-generate on load
   - Call `/api/generate/plan`
   - Display weekly plan

7. **`/app/dashboard/page.tsx`** - Final dashboard
   - Display all outputs
   - Download PDF button
   - Email packet button
   - Email reminder opt-in

### API Routes to Create

Copy the pattern from `/api/generate/voice/route.ts`:

```typescript
// app/api/generate/identity/route.ts
import { NextResponse } from 'next/server'
import { generateIdentityOutputs } from '@/lib/ai/generate'

export async function POST(request: Request) {
  try {
    const { data, voice } = await request.json()
    const outputs = await generateIdentityOutputs(data, voice)
    return NextResponse.json(outputs)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

Create routes for:
- `/api/generate/identity`
- `/api/generate/authority`
- `/api/generate/perspective`
- `/api/generate/profile`
- `/api/generate/content`
- `/api/generate/plan`

Plus:
- `/api/email/send` - Send packet email
- `/api/user/complete` - Mark session complete
- `/api/user/preferences` - Update email preferences
- `/api/scheduler/run` - Cron job for reminders
- `/app/unsubscribe/page.tsx` - Unsubscribe page

---

## 🎨 Page Template

Use this template for remaining workflow pages:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '../../context/session-context'
import { StepWrapper } from '@/components/step-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function StepPage() {
  const router = useRouter()
  const { session, updateSession } = useSession()
  
  const [formData, setFormData] = useState({
    // your form fields
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<any>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate/STEP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: formData,
          voice: session.voice, // CRITICAL: pass voice profile
        }),
      })
      const data = await response.json()
      setOutputs(data)
      
      // Save to session
      updateSession({
        STEP: formData,
        STEPOutputs: data,
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    updateSession({ currentStep: X })
    router.push('/app/NEXT_STEP')
  }

  return (
    <StepWrapper title="Step Title" description="Step description">
      {/* Your form fields */}
      
      <Button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate'}
      </Button>

      {outputs && (
        <div>
          {/* Display outputs */}
        </div>
      )}

      {outputs && (
        <Button onClick={handleNext}>
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      )}
    </StepWrapper>
  )
}
```

---

## 🧪 Testing Checklist

### Local Testing
- [ ] Landing page loads
- [ ] Start page creates user
- [ ] Voice calibration generates profile
- [ ] Generated content matches voice tone
- [ ] Session persists on refresh (localStorage)
- [ ] All steps flow correctly
- [ ] Dashboard displays all outputs
- [ ] PDF downloads correctly
- [ ] Email sends successfully

### AI Quality Testing
- [ ] Voice profile sounds accurate
- [ ] Positioning statements are distinct
- [ ] Content doesn't use banned phrases
- [ ] Tone matches sliders
- [ ] Posts don't sound generic
- [ ] Each output feels unique

### Data Privacy Testing
- [ ] No detailed content in database
- [ ] Only metadata stored
- [ ] Temp data auto-deletes after 24h
- [ ] Unsubscribe works

---

## 📤 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL`
   - `ANTHROPIC_API_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
   - `CRON_SECRET`
4. Deploy

### 3. Set Up Cron Job

Create `vercel.json` in root:

```json
{
  "crons": [
    {
      "path": "/api/scheduler/run",
      "schedule": "0 8,12,17 * * *"
    }
  ]
}
```

This runs at 8 AM, 12 PM, 5 PM daily.

### 4. Configure Database

Use a production PostgreSQL database (Supabase/Neon/Railway), not SQLite.

Update `DATABASE_URL` in Vercel environment variables.

Run migrations:
```bash
npx prisma db push
```

---

## 🐛 Troubleshooting

### "Failed to generate voice profile"

**Cause:** Missing or invalid `ANTHROPIC_API_KEY`

**Fix:**
1. Check `.env` has correct key
2. Verify key is active at console.anthropic.com
3. Check API rate limits

### "Failed to send email"

**Cause:** Missing or invalid `RESEND_API_KEY` OR unverified domain

**Fix:**
1. Check `.env` has correct key
2. Verify domain in Resend dashboard
3. Use `onboarding@resend.dev` for testing
4. Update `FROM_EMAIL` in `lib/email/send.ts`

### "Prisma Client not initialized"

**Fix:**
```bash
npx prisma generate
```

### Session lost on refresh

**Cause:** localStorage not working

**Fix:**
- Check browser allows localStorage
- Open DevTools → Application → Local Storage
- Verify `brandos_session` exists

### AI outputs sound generic

**Cause:** Voice profile not being passed to generation APIs

**Fix:**
- Ensure `voice: session.voice` is in API call body
- Check voice profile was generated in Step 0
- Review prompts in `lib/ai/prompts.ts`

---

## 📚 File Structure Reference

```
brandos/
├── app/
│   ├── page.tsx                    # Landing ✅
│   ├── globals.css                 # Styles ✅
│   ├── layout.tsx                  # Root layout ✅
│   ├── start/
│   │   └── page.tsx                # Start page ✅
│   ├── app/
│   │   ├── layout.tsx              # App layout ✅
│   │   ├── voice/page.tsx          # Voice calibration ✅
│   │   ├── identity/page.tsx       # Identity 🚧
│   │   ├── authority/page.tsx      # Authority 🚧
│   │   ├── perspective/page.tsx    # Perspective 🚧
│   │   ├── profile/page.tsx        # Profile 🚧
│   │   ├── content/page.tsx        # Content 🚧
│   │   ├── plan/page.tsx           # Plan 🚧
│   │   └── dashboard/page.tsx      # Dashboard 🚧
│   ├── context/
│   │   └── session-context.tsx     # Session state ✅
│   ├── api/
│   │   ├── user/
│   │   │   └── create/route.ts     # Create user ✅
│   │   └── generate/
│   │       └── voice/route.ts      # Voice gen ✅
│   └── unsubscribe/page.tsx        # Unsubscribe 🚧
├── components/
│   ├── ui/                         # UI components ✅
│   ├── progress-tracker.tsx        # Progress bar ✅
│   └── step-wrapper.tsx            # Step container ✅
├── lib/
│   ├── db.ts                       # Prisma client ✅
│   ├── types.ts                    # TypeScript types ✅
│   ├── utils.ts                    # Utilities ✅
│   ├── ai/
│   │   ├── generate.ts             # AI generation ✅
│   │   └── prompts.ts              # Prompts ✅
│   ├── email/
│   │   ├── send.ts                 # Email sending ✅
│   │   └── templates.ts            # Email templates ✅
│   └── pdf/
│       └── generate.ts             # PDF generation ✅
├── prisma/
│   └── schema.prisma               # Database schema ✅
├── .env                            # Environment variables ✅
├── .env.example                    # Env template ✅
├── PROJECT_STATUS.md               # Status doc ✅
└── SETUP_GUIDE.md                  # This file ✅
```

---

## ⏱️ Estimated Time to Complete

- **Remaining workflow pages:** 3-4 hours
- **API routes:** 1-2 hours
- **Dashboard + PDF/email:** 2-3 hours
- **Testing + polish:** 2-3 hours

**Total:** 8-12 hours

---

## 💡 Pro Tips

1. **Start with identity step** - It's the simplest pattern to replicate
2. **Test AI generation early** - Make sure API keys work
3. **Use Prisma Studio** - Great for inspecting database
4. **Test email locally** - Use Resend test domain
5. **Keep session state simple** - Don't over-engineer
6. **Voice matters** - Always pass voice profile to AI
7. **PDF can be basic** - Function over form for MVP
8. **Reminders can wait** - Focus on core flow first

---

## 🎯 MVP Launch Checklist

- [ ] All 8 workflow steps work
- [ ] AI generates quality outputs
- [ ] Voice calibration affects tone
- [ ] PDF downloads with all sections
- [ ] Email packet sends
- [ ] Session persists on refresh
- [ ] Mobile responsive
- [ ] No errors in console
- [ ] Database stores minimal data only
- [ ] Deployed to production

---

**Need help?** Review:
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed status
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) for architecture decisions
- Voice calibration page (`app/app/voice/page.tsx`) for pattern reference

Good luck building! 🚀
