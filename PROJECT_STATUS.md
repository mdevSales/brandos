# BrandOS - Project Status & Implementation Guide

## 🎯 Overview

BrandOS is a privacy-first LinkedIn brand-building web application. This document outlines what's built, what's mocked, and how to complete the implementation.

---

## ✅ COMPLETED COMPONENTS

### 1. Foundation & Architecture
- [x] Next.js 14 project initialized with TypeScript
- [x] Tailwind CSS + shadcn/ui components
- [x] Privacy-first database schema (Prisma)
- [x] Minimal data storage model
- [x] Project structure

### 2. Database Schema (Prisma)
- [x] User model (name, email only)
- [x] Session model (completion tracking)
- [x] EmailPreference model (opt-in, frequency, timezone)
- [x] EmailLog model (sent emails tracking)
- [x] TempSessionData model (24h auto-cleanup)

**Location:** `prisma/schema.prisma`

### 3. AI Generation System
- [x] Anthropic Claude integration
- [x] Voice calibration system
- [x] Generation functions for all steps:
  - Voice profile
  - Identity outputs
  - Authority outputs
  - Perspective outputs
  - Profile rewrites
  - Content generation
  - 30-day plan

**Locations:**
- `lib/ai/generate.ts`
- `lib/ai/prompts.ts`

### 4. Email System (Real - Resend)
- [x] Email templates (packet, reminders)
- [x] Send functions
- [x] Reminder scheduling logic
- [x] Unsubscribe handling

**Locations:**
- `lib/email/send.ts`
- `lib/email/templates.ts`

### 5. PDF Generation
- [x] Complete packet PDF generation (jsPDF)
- [x] Structured layout with all outputs

**Location:** `lib/pdf/generate.ts`

### 6. UI Components
- [x] Base components (Button, Input, Card, etc.)
- [x] Progress tracker
- [x] Step wrapper
- [x] Landing page (fully designed)

**Locations:**
- `components/ui/*`
- `components/progress-tracker.tsx`
- `components/step-wrapper.tsx`
- `app/page.tsx` (landing)

### 7. Type System
- [x] Complete TypeScript types for all data models
- [x] SessionState interface (in-memory data structure)

**Location:** `lib/types.ts`

---

## 🚧 IN PROGRESS / NEEDS COMPLETION

### 1. App Routes (CRITICAL)

Need to create these pages:

#### `/start` - Entry Point
- Collect name and email
- Brief introduction
- Start button → `/app/voice`

#### `/app/*` - Main Workflow

**Layout:** `app/app/layout.tsx`
- Should include ProgressTracker
- SessionState management (React Context)

**Pages to build:**

1. `/app/voice` - Voice Calibration (Step 0)
   - Writing sample textarea
   - Tone preference questions
   - 4 sliders (concise-expressive, etc.)
   - Generate voice profile button
   - Next → `/app/identity`

2. `/app/identity` - Identity (Step 1)
   - Form: role, industry, known for, etc.
   - Generate positioning button
   - Show 3 outputs
   - Next → `/app/authority`

3. `/app/authority` - Authority (Step 2)
   - Form: wins, challenges, strengths
   - Generate authority outputs
   - Show proof points
   - Next → `/app/perspective`

4. `/app/perspective` - Perspective (Step 3)
   - Form: beliefs, disagreements, over/underrated
   - Generate pillars & angles
   - Next → `/app/profile`

5. `/app/profile` - Profile Rewrite (Step 4)
   - Form: current headline, about, experience
   - Generate rewrites
   - Show before/after
   - Next → `/app/content`

6. `/app/content` - Content Engine (Step 5)
   - Form: topics, post types
   - Generate 10 ideas, 3 posts, 5 hooks
   - Next → `/app/plan`

7. `/app/plan` - 30-Day Plan (Step 6)
   - Auto-generate on load
   - Show weekly breakdown
   - Next → `/app/dashboard`

8. `/app/dashboard` - Final Dashboard (Step 7)
   - Show all outputs
   - Download PDF button
   - Email packet button (with email input)
   - Email reminder opt-in
   - Edit sections (optional)

#### Other Routes

- `/app/settings` - Email preferences
- `/unsubscribe?userId=xxx` - Unsubscribe handler
- `/api/generate/*` - AI generation endpoints
- `/api/email/send` - Send packet email
- `/api/email/reminders` - Send scheduled reminders
- `/api/scheduler/run` - Cron job endpoint

---

### 2. API Routes

Need to create:

**Generation APIs:**
- `POST /api/generate/voice` - Generate voice profile
- `POST /api/generate/identity` - Generate positioning
- `POST /api/generate/authority` - Generate authority
- `POST /api/generate/perspective` - Generate pillars
- `POST /api/generate/profile` - Rewrite profile
- `POST /api/generate/content` - Generate content
- `POST /api/generate/plan` - Generate plan

**Email APIs:**
- `POST /api/email/send` - Send packet
- `POST /api/email/reminders` - Trigger reminders
- `GET /api/scheduler/run` - Cron job (protected by CRON_SECRET)

**User APIs:**
- `POST /api/user/create` - Create user record
- `POST /api/user/complete` - Mark session complete
- `POST /api/user/preferences` - Update email preferences
- `POST /api/user/unsubscribe` - Unsubscribe from emails

---

### 3. Session State Management

Create React Context for managing session state:

**Location:** `app/context/session-context.tsx`

Should manage:
- SessionState object
- Save to localStorage (backup)
- Update functions for each step
- Clear after completion

---

### 4. Database Setup

**To initialize:**

```bash
# 1. Set up PostgreSQL database
# Update DATABASE_URL in .env

# 2. Run Prisma migrations
npx prisma generate
npx prisma db push

# 3. (Optional) Seed data
# npx prisma db seed
```

---

### 5. Environment Variables

**Required:**

```bash
DATABASE_URL="postgresql://..."
ANTHROPIC_API_KEY="sk-ant-..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="https://brandos.app"
CRON_SECRET="secret-for-cron-protection"
```

Get API keys from:
- Anthropic: https://console.anthropic.com/
- Resend: https://resend.com/

---

### 6. Scheduler Setup (Vercel Cron)

**File:** `vercel.json`

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

Runs at 8 AM, 12 PM, 5 PM daily (Pacific Time).

---

## 🎨 UI/UX NOTES

### Design Principles
- Clean, minimal interface
- Whitespace and breathing room
- Clear progress indication
- Instant feedback on generation
- Editable outputs

### Loading States
- Show spinner during AI generation
- Disable buttons while processing
- Show "Generating..." text

### Error Handling
- Toast notifications for errors
- Retry buttons
- Graceful degradation

---

## 📦 WHAT'S MOCKED VS REAL

### ✅ REAL (Working)
- AI generation (Claude API)
- Email sending (Resend)
- PDF generation (jsPDF)
- Database (Prisma)
- Type system
- UI components

### 🚧 NEEDS IMPLEMENTATION
- All `/app/*` pages
- All API routes
- Session state management
- Form validation
- Error handling
- Loading states
- Unsubscribe flow
- Cron job logic

---

## 🚀 NEXT STEPS TO LAUNCH

### Phase 1: Core Workflow (Priority 1)
1. Create `/start` page
2. Create `/app/voice` page with form
3. Create API route for voice generation
4. Test voice → identity flow
5. Repeat for all 7 steps

### Phase 2: Dashboard & Output (Priority 1)
1. Create `/app/dashboard` page
2. Implement PDF download
3. Implement email packet
4. Add email preference opt-in

### Phase 3: API & Backend (Priority 2)
1. Create all `/api/generate/*` routes
2. Create `/api/email/send` route
3. Create `/api/user/*` routes
4. Test end-to-end flow

### Phase 4: Reminders & Scheduler (Priority 3)
1. Create `/api/scheduler/run` route
2. Implement reminder logic
3. Test with Vercel Cron
4. Create unsubscribe page

### Phase 5: Polish (Priority 3)
1. Add loading states
2. Add error handling
3. Add toast notifications
4. Responsive design review
5. Accessibility audit

---

## 🧪 TESTING CHECKLIST

- [ ] User can complete full workflow
- [ ] AI generates distinct outputs
- [ ] Voice calibration influences tone
- [ ] PDF downloads correctly
- [ ] Email packet sends
- [ ] Reminders fire on schedule
- [ ] Unsubscribe works
- [ ] No data stored long-term
- [ ] Session recovers on refresh (localStorage)
- [ ] Works on mobile

---

## 📝 DEVELOPMENT NOTES

### Session Flow
1. User lands on `/` → clicks "Start"
2. Goes to `/start` → enters name/email
3. User record created (or retrieved)
4. Session started in DB
5. User progresses through `/app/*` steps
6. Data held in React state + localStorage
7. Reaches `/app/dashboard`
8. Generates PDF → emails → marks complete
9. Detailed data deleted, only metadata persists

### Data Storage Rules
- **Store:** name, email, timestamps, preferences
- **DON'T store:** inputs, outputs, voice profile, generated content
- **Temporary storage:** max 24h for session recovery

### Voice Calibration Critical
- Must influence ALL outputs
- Held in memory during session
- Passed to every generation API call
- Never persisted to DB

---

## 🛠️ QUICK START FOR DEVELOPMENT

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📚 FILE STRUCTURE

```
brandos/
├── app/
│   ├── page.tsx (landing ✅)
│   ├── start/ (needs build 🚧)
│   ├── app/
│   │   ├── layout.tsx (needs build 🚧)
│   │   ├── voice/ (needs build 🚧)
│   │   ├── identity/ (needs build 🚧)
│   │   ├── authority/ (needs build 🚧)
│   │   ├── perspective/ (needs build 🚧)
│   │   ├── profile/ (needs build 🚧)
│   │   ├── content/ (needs build 🚧)
│   │   ├── plan/ (needs build 🚧)
│   │   └── dashboard/ (needs build 🚧)
│   ├── api/
│   │   ├── generate/ (needs build 🚧)
│   │   ├── email/ (needs build 🚧)
│   │   ├── user/ (needs build 🚧)
│   │   └── scheduler/ (needs build 🚧)
│   └── unsubscribe/ (needs build 🚧)
├── components/
│   ├── ui/ (✅)
│   ├── progress-tracker.tsx (✅)
│   └── step-wrapper.tsx (✅)
├── lib/
│   ├── db.ts (✅)
│   ├── types.ts (✅)
│   ├── utils.ts (✅)
│   ├── ai/
│   │   ├── generate.ts (✅)
│   │   └── prompts.ts (✅)
│   ├── email/
│   │   ├── send.ts (✅)
│   │   └── templates.ts (✅)
│   └── pdf/
│       └── generate.ts (✅)
└── prisma/
    └── schema.prisma (✅)
```

---

## 💡 IMPLEMENTATION TIPS

### For Voice Calibration Page
```typescript
// Example structure
const [writingSample, setWritingSample] = useState('')
const [sliders, setSliders] = useState({
  conciseExpressive: 50,
  warmAuthoritative: 50,
  reflectiveTactical: 50,
  casualPolished: 50,
})

const handleGenerate = async () => {
  const response = await fetch('/api/generate/voice', {
    method: 'POST',
    body: JSON.stringify({ writingSample, sliders, ... }),
  })
  const voiceProfile = await response.json()
  // Save to session state
}
```

### For Dashboard
- Fetch all session data from context
- Generate PDF with `generatePacketPDF(sessionState)`
- Offer download or email option
- Show preview of outputs

---

## 🎯 SUCCESS METRICS

MVP is complete when:
1. ✅ User can complete full workflow
2. ✅ PDF packet downloads with all outputs
3. ✅ Email packet sends successfully
4. ✅ Voice calibration affects tone
5. ✅ No personal content stored long-term
6. ✅ Reminders send on schedule
7. ✅ Unsubscribe works

---

**Status:** Foundation complete. Pages and API routes need implementation.

**Estimated time to MVP:** 8-12 hours of focused development.
