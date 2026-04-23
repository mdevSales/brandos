# 🚀 Deploy BrandOS - Free & Easy

Your app is ready to share with the world! Here's how to deploy it **for free** in 5 minutes.

---

## ✅ What You'll Get

- **Free hosting** on Vercel
- **Public URL** to share (e.g., `https://brandos.vercel.app`)
- **Automatic deployments** (every git push updates the site)
- **HTTPS** included
- **No credit card required**

---

## 🚀 Deployment Steps

### Method 1: Vercel Web Interface (Easiest)

**1. Create GitHub Repository**

Go to https://github.com/new and create a new repo called `brandos`

**2. Push Your Code**

```bash
cd "/Users/mdevulapalli/Linkedin Brand Development App/brandos"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/brandos.git

# Push code
git push -u origin main
```

**3. Deploy to Vercel**

- Go to https://vercel.com/signup
- Sign up with GitHub (free)
- Click "New Project"
- Import your `brandos` repository
- **Add Environment Variable:**
  - Name: `ANTHROPIC_API_KEY`
  - Value: `your-api-key-here`
- Click "Deploy"

**4. Done!** 

You'll get a URL like: `https://brandos-xyz123.vercel.app`

You can add a custom domain later if you want (optional).

---

### Method 2: Vercel CLI (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd "/Users/mdevulapalli/Linkedin Brand Development App/brandos"
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: brandos
# - Deploy? Yes

# Add environment variable
vercel env add ANTHROPIC_API_KEY
# Paste your API key when prompted

# Deploy to production
vercel --prod
```

---

## 🔒 Important: Database Note

**Current setup:** Your app uses SQLite (local file database)

**For production:** SQLite won't persist data on Vercel (files reset on each deployment)

### Options:

**Option A: Keep SQLite (Simplest)**
- Works fine for workshops
- Data resets on each deployment (not a problem since we don't store content long-term anyway)
- **Recommended for your workshop use case**

**Option B: Upgrade to PostgreSQL (For Persistence)**
If you want user data to persist:

1. Get free PostgreSQL from:
   - Supabase: https://supabase.com (easiest)
   - Neon: https://neon.tech
   - Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres

2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Add `DATABASE_URL` to Vercel environment variables

4. Run migrations:
   ```bash
   npx prisma db push
   ```

---

## 🌐 After Deployment

### Share Your App

Once deployed, you can share:
- **Public URL:** `https://your-app.vercel.app`
- Anyone can access it
- No signup required for users
- They just go through the workflow

### Test It

1. Visit your Vercel URL
2. Click "Start Building Your Brand"
3. Complete the workflow
4. Verify all steps work

### Monitor Usage

- Vercel Dashboard shows:
  - Visitor count
  - Page views
  - Errors (if any)

---

## 💰 Costs

**Everything is FREE:**
- ✅ Vercel hosting: Free (up to 100GB bandwidth/month)
- ✅ GitHub: Free
- ✅ SQLite: Free (built-in)
- 💵 Claude API: Pay-per-use (~$0.15-0.30 per user session)

**Only cost:** Claude API usage

Your API key has credits. For a workshop with 50 people:
- Cost: ~$7.50-15 total
- Worth it for the value delivered!

---

## 🔄 Updating Your App

After deployment, to update:

```bash
# Make changes to your code
# Commit and push
git add .
git commit -m "Update feature"
git push

# Vercel automatically redeploys!
```

---

## 🎯 Custom Domain (Optional)

Want `brandos.com` instead of `brandos.vercel.app`?

1. Buy domain from Namecheap/Google Domains (~$10/year)
2. In Vercel Dashboard → Settings → Domains
3. Add your custom domain
4. Update DNS records (Vercel shows instructions)

---

## 🐛 Troubleshooting

### "Build failed"
- Check Vercel logs
- Make sure `ANTHROPIC_API_KEY` is added
- Make sure all dependencies are in `package.json`

### "API key not working"
- Verify API key is correct in Vercel environment variables
- Check Anthropic console for usage limits

### "Database error"
- If using SQLite: data resets are normal (by design)
- If using PostgreSQL: verify `DATABASE_URL` is set

---

## ✅ Deployment Checklist

Before sharing:
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] `ANTHROPIC_API_KEY` added to Vercel
- [ ] Tested full workflow on production URL
- [ ] Voice calibration works
- [ ] All steps generate content
- [ ] PDF downloads
- [ ] No errors in Vercel logs

---

## 🎉 You're Live!

Once deployed, your workshop attendees can:
1. Visit your URL
2. Build their LinkedIn brand
3. Download their packet
4. Leave happy!

**Your app is ready to help people build their brands!** 🚀

---

Questions? Check Vercel docs: https://vercel.com/docs
