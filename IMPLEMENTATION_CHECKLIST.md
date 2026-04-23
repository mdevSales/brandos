# Implementation Checklist

Use this checklist to complete the remaining BrandOS features.

---

## ✅ COMPLETED

- [x] Project initialization
- [x] Database schema
- [x] Type definitions
- [x] AI generation service
- [x] Email service
- [x] PDF generation
- [x] UI components
- [x] Landing page
- [x] Start page
- [x] Voice calibration page + API
- [x] Identity page + API
- [x] Session context
- [x] Progress tracker

---

## 🚧 TO COMPLETE

### Step 1: Authority Page (30 min)

**File:** `app/app/authority/page.tsx`

**Form fields:**
```typescript
- wins: string[] (3 items)
- challenges: string[] (2 items)
- strengths: string
- keyProject: string
```

**API endpoint:** `POST /api/generate/authority`

**Outputs to display:**
- Authority inventory (paragraph)
- Proof points (5 items)
- Credibility paragraph

**Next step:** `/app/perspective`

---

### Step 2: Perspective Page (30 min)

**File:** `app/app/perspective/page.tsx`

**Form fields:**
```typescript
- beliefs: string
- disagreements: string
- overrated: string
- underrated: string
```

**API endpoint:** `POST /api/generate/perspective`

**Outputs to display:**
- Content pillars (3 items)
- Post angles (5 items)

**Next step:** `/app/profile`

---

### Step 3: Profile Page (45 min)

**File:** `app/app/profile/page.tsx`

**Form fields:**
```typescript
- currentHeadline: string
- currentAbout: string (textarea)
- experience: string (textarea)
```

**API endpoint:** `POST /api/generate/profile`

**Outputs to display:**
- Rewritten headline (with character count)
- Improved About (before/after comparison)
- Better role description

**Next step:** `/app/content`

---

### Step 4: Content Page (45 min)

**File:** `app/app/content/page.tsx`

**Form fields:**
```typescript
- topics: string[] (comma-separated → array)
- postTypes: string[] (checkboxes: Story, How-to, Opinion, etc.)
```

**API endpoint:** `POST /api/generate/content`

**Outputs to display:**
- 10 post ideas (numbered list)
- 5 hooks (with copy button)
- 3 full posts (formatted with line breaks)

**Next step:** `/app/plan`

---

### Step 5: Plan Page (30 min)

**File:** `app/app/plan/page.tsx`

**No form - auto-generate on page load**

**API endpoint:** `POST /api/generate/plan`

**Outputs to display:**
- Weekly plan (Week 1-4)
- Posting cadence
- Engagement strategy

**Next step:** `/app/dashboard`

---

### Step 6: Dashboard Page (2 hours)

**File:** `app/app/dashboard/page.tsx`

**Features:**
1. Display summary of all outputs
2. Download PDF button
   ```typescript
   const handleDownload = () => {
     const blob = generatePacketPDF(session)
     downloadPDF(blob, `${session.name}-BrandOS-Packet.pdf`)
   }
   ```

3. Email packet section
   ```typescript
   const handleEmail = async () => {
     await fetch('/api/email/send', {
       method: 'POST',
       body: JSON.stringify({ userId: session.userId })
     })
   }
   ```

4. Email preferences (opt-in)
   - Radio buttons: light, standard, intensive
   - Save to `/api/user/preferences`

5. Mark session complete
   ```typescript
   await fetch('/api/user/complete', {
     method: 'POST',
     body: JSON.stringify({ sessionId })
   })
   ```

---

### Step 7: API Routes (1 hour)

Create these files by copying the pattern from `app/api/generate/identity/route.ts`:

#### `app/api/generate/authority/route.ts`
```typescript
import { generateAuthorityOutputs } from '@/lib/ai/generate'
// ... same pattern
```

#### `app/api/generate/perspective/route.ts`
```typescript
import { generatePerspectiveOutputs } from '@/lib/ai/generate'
// ... same pattern
```

#### `app/api/generate/profile/route.ts`
```typescript
import { generateProfileOutputs } from '@/lib/ai/generate'
// ... same pattern
```

#### `app/api/generate/content/route.ts`
```typescript
import { generateContentOutputs } from '@/lib/ai/generate'
// ... same pattern
```

#### `app/api/generate/plan/route.ts`
```typescript
import { generatePlanOutputs } from '@/lib/ai/generate'
// ... same pattern
```

---

### Step 8: Email & User APIs (1 hour)

#### `app/api/email/send/route.ts`
```typescript
import { prisma } from '@/lib/db'
import { sendPacketEmail } from '@/lib/email/send'
import { generatePacketPDF } from '@/lib/pdf/generate'

export async function POST(request: Request) {
  const { userId } = await request.json()
  
  // Get user data
  const user = await prisma.user.findUnique({ where: { id: userId } })
  
  // Generate PDF (convert to base64 or upload to storage)
  // For MVP: include link to download from dashboard
  
  // Send email
  await sendPacketEmail(userId, user.email, user.name, packetUrl)
  
  // Mark packet sent
  await prisma.session.updateMany({
    where: { userId },
    data: { packetSent: true }
  })
  
  return NextResponse.json({ success: true })
}
```

#### `app/api/user/complete/route.ts`
```typescript
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const { sessionId } = await request.json()
  
  await prisma.session.update({
    where: { id: sessionId },
    data: { completedAt: new Date() }
  })
  
  return NextResponse.json({ success: true })
}
```

#### `app/api/user/preferences/route.ts`
```typescript
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const { userId, frequency, timezone } = await request.json()
  
  await prisma.emailPreference.upsert({
    where: { userId },
    create: { userId, frequency, timezone },
    update: { frequency, timezone }
  })
  
  return NextResponse.json({ success: true })
}
```

---

### Step 9: Scheduler (1 hour)

#### `app/api/scheduler/run/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { getUsersForReminders } from '@/lib/email/send'
import {
  send24HourReminder,
  sendWeeklyReminder,
  sendInactivityReminder
} from '@/lib/email/send'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { immediate, weekly, inactive } = await getUsersForReminders()
  
  // Send 24h reminders
  for (const user of immediate) {
    await send24HourReminder(user.id, user.email, user.name)
  }
  
  // Send weekly reminders
  for (const user of weekly) {
    await sendWeeklyReminder(
      user.id,
      user.email,
      user.name,
      user.emailPreference?.frequency || 'standard'
    )
  }
  
  // Send inactivity reminders
  for (const user of inactive) {
    await sendInactivityReminder(user.id, user.email, user.name)
  }
  
  return NextResponse.json({
    sent: {
      immediate: immediate.length,
      weekly: weekly.length,
      inactive: inactive.length
    }
  })
}
```

**Then create:** `vercel.json`
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

---

### Step 10: Unsubscribe Page (30 min)

#### `app/unsubscribe/page.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (userId) {
      fetch('/api/user/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'))
    }
  }, [userId])

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === 'success' && (
        <div>
          <h1>Successfully unsubscribed</h1>
          <p>You won't receive any more emails from BrandOS.</p>
        </div>
      )}
    </div>
  )
}
```

#### `app/api/user/unsubscribe/route.ts`
```typescript
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const { userId } = await request.json()
  
  await prisma.emailPreference.upsert({
    where: { userId },
    create: { userId, unsubscribed: true },
    update: { unsubscribed: true }
  })
  
  return NextResponse.json({ success: true })
}
```

---

## 🎨 Optional Enhancements

- [ ] Loading skeletons
- [ ] Toast notifications (sonner)
- [ ] Form validation
- [ ] Copy-to-clipboard buttons
- [ ] Edit outputs inline
- [ ] Save progress indicator
- [ ] Mobile responsive improvements
- [ ] Dark mode support
- [ ] Analytics tracking
- [ ] Error boundary

---

## 🧪 Testing Checklist

- [ ] Complete full workflow start to finish
- [ ] Voice calibration affects output tone
- [ ] All outputs are distinct (not repetitive)
- [ ] PDF downloads correctly
- [ ] Email sends successfully
- [ ] Session persists on refresh
- [ ] Database has minimal data only
- [ ] Mobile works well
- [ ] Error handling works
- [ ] Unsubscribe works

---

## 📦 Pre-Launch Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] API keys valid
- [ ] Email domain verified (Resend)
- [ ] Cron job configured
- [ ] Privacy policy added (optional)
- [ ] Terms of service (optional)
- [ ] Analytics setup (optional)
- [ ] Monitoring setup (Sentry, etc.)

---

## 🚀 Launch!

Once all checkboxes are complete:

1. Test full workflow 3+ times
2. Have someone else test it
3. Deploy to production
4. Share with first users
5. Collect feedback
6. Iterate

---

**Estimated total time:** 8-12 hours of focused work

**Priority order:**
1. Steps 1-6 (workflow pages) - 4 hours
2. Dashboard + PDF/email - 2 hours
3. API routes - 1 hour
4. Email/user APIs - 1 hour
5. Polish + testing - 2 hours
6. Scheduler (can wait) - 1 hour
7. Unsubscribe - 30 min

Good luck! 🎯
