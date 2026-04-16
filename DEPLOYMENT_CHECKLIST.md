# 📋 Deployment Checklist

## Complete Setup for AIA

### ✅ Completed Tasks

- [x] All React components built and tested
- [x] Zustand state management configured
- [x] Supabase SQL schema created (12 tables with RLS)
- [x] GitHub Actions CI/CD workflows created
- [x] Vercel configuration prepared
- [x] Environment variables templated
- [x] Documentation created

---

## 🏁 Next Steps (In Order)

### Phase 1: GitHub Push (5 minutes)

**Prerequisites:**
- GitHub account created
- GitHub repository created (name: `AIA`)
- Git configured locally

**Commands:**
```bash
# Make script executable
chmod +x scripts/push-github.sh

# Run push script and follow prompts
./scripts/push-github.sh
```

**What happens:**
- [ ] Code initialized as git repository
- [ ] All files committed with message
- [ ] Repository pushed to GitHub
- [ ] Branch automatically named `main`

**Result:** Code visible at `https://github.com/YOUR_USERNAME/AIA`

---

### Phase 2: Supabase Setup (10 minutes)

**Prerequisites:**
- Supabase account created
- Supabase project created

**Steps:**
1. [ ] Go to [Supabase Console](https://app.supabase.com)
2. [ ] Create new project (name: `aia`)
3. [ ] Wait for project to be ready (2-3 minutes)
4. [ ] Go to **SQL Editor**
5. [ ] Create new query and paste contents of `supabase/migrations/001_initial_schema.sql`
6. [ ] Execute query and wait for success ✅
7. [ ] Go to **Settings → API**
8. [ ] Copy `Project URL` and `Anon Key`
9. [ ] Update `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   ```

**Verify:**
- [ ] Go to **Data Studio**
- [ ] Check these tables exist:
  - `stores`
  - `products`
  - `reviews`
  - etc. (12 total)

---

### Phase 3: Vercel Deployment (5 minutes)

**Prerequisites:**
- Vercel account created
- GitHub code pushed (Phase 1 complete)
- Supabase API keys obtained (Phase 2 complete)

**Steps:**
1. [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. [ ] Click **Add New → Project**
3. [ ] Select **Import Git Repository**
4. [ ] Choose your `AIA` GitHub repository
5. [ ] Click **Import**
6. [ ] Go to **Settings → Environment Variables**
7. [ ] Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = (from Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (from Supabase)
8. [ ] Click **Save**
9. [ ] Click **Deploy**
10. [ ] Wait for build to complete (2-5 minutes)

**Verify:**
- [ ] Deployment shows "Ready"
- [ ] You get a URL like `https://aia-yourname.vercel.app`
- [ ] Click the URL and verify app loads

---

### Phase 4: Test Production (5 minutes)

**On your Vercel URL:**
1. [ ] App loads without errors
2. [ ] Click "Let's Start"
3. [ ] Fill in the store design form
4. [ ] Click "Next" through all steps
5. [ ] See store preview appears

**In Supabase Console:**
1. [ ] Go to **Data Studio → stores**
2. [ ] Verify new store record appears
3. [ ] Check `user_id` is populated correctly

---

## 🎯 Commands Quick Reference

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start local development
npm run build            # Build for production
npm run lint             # Check code quality

# Deployment
chmod +x scripts/*.sh    # Make scripts executable
./scripts/setup.sh       # Complete setup
./scripts/push-github.sh # Push to GitHub
./scripts/setup-env.sh   # Setup environment

# Supabase
# (No CLI required - use web dashboard)

# Vercel
# (Connected via GitHub - auto deploy on push)
```

---

## 📧 Environment Variables Summary

### `.env.local` (Add these)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Vercel Dashboard
Same variables added in **Settings → Environment Variables**

---

## 🚨 Important Notes

⚠️ **Never commit `.env.local` to GitHub** - it contains secrets!
- Already in `.gitignore` ✅

⚠️ **Supabase RLS is critical** - it isolates user data
- Already configured in SQL migration ✅
- Verify it's enabled in Supabase dashboard

⚠️ **GitHub Actions auto-deploy** on every push
- Configured in `.github/workflows/deploy.yml`
- Will automatically deploy to Vercel

---

## ✨ After Deployment

Once everything is live:

1. **Share your app**: `https://aia-yourname.vercel.app`
2. **Test all features**:
   - Form submission
   - Store preview
   - Database storage
   - Authentication
3. **Monitor**:
   - Vercel logs for errors
   - Supabase query count
4. **Optimize**:
   - Add custom domain
   - Enable more auth providers
   - Set up backups

---

## 🆘 Troubleshooting

**Issue: GitHub push fails**
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
# Then retry ./scripts/push-github.sh
```

**Issue: Vercel deployment fails**
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Check TypeScript errors: `npm run build`

**Issue: Supabase connection fails**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify anon key is correct
- Check Supabase project is active

**Issue: RLS rejecting queries**
- Verify you're authenticated
- Check RLS policies in Supabase dashboard
- Review SQL migration for policy definitions

---

## 📞 Support

- **Supabase Help**: https://supabase.com/docs
- **Vercel Help**: https://vercel.com/support
- **Next.js Help**: https://nextjs.org/docs

---

**Status**: ✅ Everything prepared. Ready for deployment!

**Estimated time to full deployment**: ~25 minutes
