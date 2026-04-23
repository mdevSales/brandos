# Database Setup Guide

You need a PostgreSQL database for BrandOS. Here are your options:

---

## ✅ RECOMMENDED: Cloud PostgreSQL (Easiest)

### Option 1: Supabase (Free, 500MB)

1. Go to [https://supabase.com/](https://supabase.com/)
2. Sign up / Log in
3. Click "New Project"
4. Name: `brandos`
5. Password: (generate strong password)
6. Region: Choose closest to you
7. Wait for project to provision (~2 minutes)
8. Go to Project Settings → Database
9. Copy "Connection string" (URI format)
10. Update `.env`:
   ```bash
   DATABASE_URL= "postgresql://postgres:[YOUR-PASSWORD]@db.nlhdqelcxeyoyhqbekry.supabase.co:5432/postgres"
   ```

**Then run:**
```bash
npm run db:push
```

### Option 2: Neon (Free, 512MB)

1. Go to [https://neon.tech/](https://neon.tech/)
2. Sign up / Log in
3. Create new project: `brandos`
4. Copy connection string
5. Update `.env`:
   ```bash
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]"
   ```

**Then run:**
```bash
npm run db:push
```

### Option 3: Railway (Free $5/month credit)

1. Go to [https://railway.app/](https://railway.app/)
2. Sign up / Log in
3. New Project → Deploy PostgreSQL
4. Click PostgreSQL service
5. Connect → Copy connection string
6. Update `.env`

---

## 🔧 LOCAL PostgreSQL (For Development)

### macOS (via Homebrew)

```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create database
createdb brandos

# Update .env
DATABASE_URL="postgresql://postgres:[Vaibhav@123#]@db.nlhdqelcxeyoyhqbekry.supabase.co:5432/postgres"
```

**Then run:**
```bash
npm run db:generate
npm run db:push
```

### Windows (via Installer)

1. Download from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Install PostgreSQL 16
3. Remember the password you set
4. Open pgAdmin
5. Right-click Databases → Create → Database
6. Name: `brandos`
7. Update `.env`:
   ```bash
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/brandos"
   ```

### Linux (Ubuntu/Debian)

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb brandos

# Update .env
DATABASE_URL="postgresql://postgres@localhost:5432/brandos"
```

---

## 🧪 TEST YOUR DATABASE CONNECTION

After setting up your database, test the connection:

```bash
# Generate Prisma client (already done)
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio to view database
npm run db:studio
```

If `db:push` succeeds, you'll see:
```
✔ Applied 4 changes to the database
```

---

## 🔍 TROUBLESHOOTING

### "Can't reach database server"

**Cause:** Database not running or wrong connection string

**Fix:**
- Cloud: Check your connection string is copied correctly
- Local: Make sure PostgreSQL is running
  ```bash
  # macOS
  brew services list
  brew services restart postgresql@16
  
  # Linux
  sudo systemctl status postgresql
  sudo systemctl restart postgresql
  ```

### "Role does not exist"

**Fix:**
```bash
# macOS/Linux
createuser -s postgres
```

### "Database does not exist"

**Fix:**
```bash
createdb brandos
```

### "Connection string is invalid"

**Format should be:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Example:
```
postgresql://postgres:mypassword@localhost:5432/brandos
```

---

## ✅ VERIFY SETUP

Once database is configured, verify:

```bash
# 1. Generate client
npm run db:generate
# Should see: ✔ Generated Prisma Client

# 2. Push schema
npm run db:push
# Should see: ✔ Applied X changes to the database

# 3. Open Prisma Studio
npm run db:studio
# Should open http://localhost:5555 with your database tables
```

You should see these tables:
- User
- Session
- EmailPreference
- EmailLog
- TempSessionData

---

## 📝 NEXT STEPS

Once database is set up:

1. ✅ Database configured
2. ✅ Schema pushed
3. ✅ Prisma Studio works
4. Get API keys (Anthropic, Resend)
5. Run `npm run dev`
6. Test the app at http://localhost:3000

---

## 🚀 QUICK START (RECOMMENDED)

**For quickest setup, use Supabase:**

1. Go to supabase.com → Sign up
2. New Project → Name: `brandos`
3. Copy connection string
4. Paste in `.env` as `DATABASE_URL`
5. Run: `npm run db:push`
6. Done! ✅

Takes ~3 minutes total.
