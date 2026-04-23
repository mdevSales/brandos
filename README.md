# BrandOS by Southasiaforce

**Privacy-first LinkedIn brand-building web app used in live workshops**

---

## 🎯 What is BrandOS?

BrandOS is a guided, session-based web application that helps users build their LinkedIn brand in **one focused session** (45-60 minutes).

### Core Features:

- ✅ **Voice Calibration** - Ensures outputs match your natural tone, not generic AI
- ✅ **Step-by-step workflow** - Identity → Authority → Perspective → Profile → Content → Plan
- ✅ **Complete brand packet** - Positioning, rewritten profile, 10 post ideas, 3 ready-to-use posts, 30-day plan
- ✅ **Privacy-first** - No long-term storage of personal content
- ✅ **Real AI generation** - Powered by Claude Sonnet 4
- ✅ **Email delivery** - Automatic packet delivery + optional reminders

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Anthropic API key
- Resend API key (for emails)

### Installation

```bash
# Install dependencies (already done)
npm install

# Set up environment variables
# Edit .env with your credentials:
# - DATABASE_URL (PostgreSQL)
# - ANTHROPIC_API_KEY
# - RESEND_API_KEY

# Initialize database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**📖 Complete setup guide:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📊 Implementation Status

### ✅ Complete (Production-Ready)

- Landing page with full design
- Start page with user creation
- Voice calibration (Step 0) - complete workflow
- Identity step (Step 1) - complete example
- Session management (Context + localStorage)
- Database schema (privacy-first)
- AI generation service (Claude Sonnet 4)
- Email service (Resend)
- PDF generation (jsPDF)
- All TypeScript types
- UI component library

### 🚧 Needs Implementation (~8-12 hours)

- Steps 2-7 workflow pages (authority, perspective, profile, content, plan, dashboard)
- Remaining API routes (follow voice/identity pattern)
- Dashboard with download/email functionality
- Email reminder cron job
- Unsubscribe page
- Error handling + loading states
- Mobile responsive polish

**📖 See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed breakdown**

---

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **AI:** Anthropic Claude Sonnet 4
- **Email:** Resend
- **PDF:** jsPDF
- **UI:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel (recommended)

### Key Design Principles

#### Privacy-First Data Model

**What we store:**
- Name, email, completion status, email preferences, timestamps

**What we DON'T store:**
- Writing samples, form inputs, generated content, voice profiles, personal stories

#### Voice Calibration System (Critical Feature)

- Collects writing sample + tone preferences + 4 calibration sliders
- Generates "Voice DNA" profile
- Influences ALL subsequent AI outputs
- Held in memory only (never persisted)

---

## 📁 Project Structure

```
brandos/
├── app/
│   ├── page.tsx                    # Landing page ✅
│   ├── start/page.tsx              # Entry point ✅
│   ├── app/                        # Main workflow
│   │   ├── layout.tsx              # Progress tracker ✅
│   │   ├── voice/page.tsx          # Voice calibration ✅
│   │   ├── identity/page.tsx       # Identity step ✅
│   │   └── ...                     # Other steps 🚧
│   ├── api/
│   │   ├── user/create/            # Create user ✅
│   │   └── generate/               # AI generation ✅/🚧
│   └── context/
│       └── session-context.tsx     # Session state ✅
├── lib/
│   ├── ai/                         # AI generation ✅
│   ├── email/                      # Email service ✅
│   ├── pdf/                        # PDF generation ✅
│   └── types.ts                    # TypeScript types ✅
└── prisma/
    └── schema.prisma               # Database schema ✅
```

---

## 🔑 Environment Variables

Create `.env` with:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/brandos"
ANTHROPIC_API_KEY="sk-ant-..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CRON_SECRET="your-secret-here"
```

**Get API keys:**
- Anthropic: https://console.anthropic.com/
- Resend: https://resend.com/

---

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions + API keys + deployment
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Detailed implementation status + what's next
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Architecture decisions + implementation plan

---

## 🎯 Next Steps to Complete MVP

1. **Create remaining workflow pages** (authority, perspective, profile, content, plan)
   - Copy pattern from `app/app/identity/page.tsx`
   - Each takes ~30-45 minutes

2. **Create remaining API routes** (6 routes)
   - Copy pattern from `app/api/generate/identity/route.ts`
   - Each takes ~10 minutes

3. **Build dashboard page** 
   - Display all outputs
   - PDF download button
   - Email packet functionality

4. **Add email reminder system**
   - Create `/api/scheduler/run` endpoint
   - Set up Vercel Cron

**Estimated time:** 8-12 hours of focused development

---

## 🚀 Deployment (Vercel)

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# - Add environment variables
# - Deploy

# 3. Set up PostgreSQL database
# Use Supabase, Neon, or Railway

# 4. Run migrations
npx prisma db push
```

---

## 📝 Development Notes

### Pattern for New Pages

Every workflow page follows this structure:
1. Form for data collection
2. Generate button → calls API
3. Display AI outputs
4. Continue button → next step

See [app/app/identity/page.tsx](./app/app/identity/page.tsx) for complete example.

### Critical Rules

- **Always pass voice profile** to AI generation calls
- **Never store** detailed user content in database
- **Use session state** for workflow data
- **Handle errors gracefully**

---

## 🤝 Contributing

Built by Southasiaforce for workshop use.

For issues or feature requests, open a GitHub issue.

---

**Built with ❤️ by Southasiaforce**

*Building brands, one session at a time.*
