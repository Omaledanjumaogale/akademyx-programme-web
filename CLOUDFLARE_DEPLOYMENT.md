# 🚀 Cloudflare Pages Deployment Guide

## Overview

Deploy the Akademyx Programme Webpage to Cloudflare Pages for global, high-performance hosting.

---

## Prerequisites

- ✅ Cloudflare account (free tier available)
- ✅ GitHub repository with latest code
- ✅ Convex backend deployed
- ✅ WorkOS authentication configured
- ✅ Wrangler CLI installed

---

## Method 1: Cloudflare Dashboard (Recommended)

### Step 1: Connect GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Pages**
3. Click **"Create application"** → **"Connect to Git"**
4. Authorize Cloudflare to access your GitHub account
5. Select repository: `Omaledanjumaogale/akademyx-programme-web`

### Step 2: Configure Build Settings

Set the following build configuration:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `.next` |
| **Root directory** | `/` |
| **Node version** | `18` |

### Step 3: Add Environment Variables

Click **"Environment variables"** and add:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=prod:your_deploy_key

# WorkOS Authentication
WORKOS_API_KEY=sk_live_your_api_key
WORKOS_CLIENT_ID=client_your_client_id
WORKOS_COOKIE_PASSWORD=your_32_character_random_string
NEXT_PUBLIC_WORKOS_REDIRECT_URI=https://akademyx-programme-web.pages.dev/api/auth/callback

# Application Settings
NEXT_PUBLIC_APP_URL=https://akademyx-programme-web.pages.dev
NODE_ENV=production
```

**Important**: Add these for both **Production** and **Preview** environments.

### Step 4: Deploy

1. Click **"Save and Deploy"**
2. Cloudflare will build and deploy your application
3. You'll get a URL like: `https://akademyx-programme-web.pages.dev`

---

## Method 2: Wrangler CLI

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser for authentication.

### Step 3: Deploy

```bash
# Build the application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=akademyx-programme-web
```

### Step 4: Set Environment Variables

```bash
# Set production environment variables
wrangler pages secret put NEXT_PUBLIC_CONVEX_URL --project-name=akademyx-programme-web
wrangler pages secret put WORKOS_API_KEY --project-name=akademyx-programme-web
wrangler pages secret put WORKOS_CLIENT_ID --project-name=akademyx-programme-web
wrangler pages secret put WORKOS_COOKIE_PASSWORD --project-name=akademyx-programme-web
wrangler pages secret put NEXT_PUBLIC_WORKOS_REDIRECT_URI --project-name=akademyx-programme-web
```

---

## Post-Deployment Configuration

### 1. Update WorkOS Redirect URI

After deployment:

1. Go to [WorkOS Dashboard](https://dashboard.workos.com)
2. Navigate to your application settings
3. Add redirect URI: `https://akademyx-programme-web.pages.dev/api/auth/callback`
4. If using custom domain: `https://yourdomain.com/api/auth/callback`

### 2. Deploy Convex Backend

```bash
# Deploy Convex to production
npx convex deploy

# Copy the production URL
# Update NEXT_PUBLIC_CONVEX_URL in Cloudflare Pages settings
```

### 3. Configure Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `akademyx.com`)
4. Follow DNS configuration instructions
5. Update WorkOS redirect URI with new domain

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | `https://xxx.convex.cloud` |
| `CONVEX_DEPLOYMENT` | Convex deployment name | `happy-otter-123` (from convex dashboard) |
| `CONVEX_DEPLOY_KEY` | Convex deployment key | `prod:xxx` |
| `WORKOS_API_KEY` | WorkOS API key | `sk_live_xxx` |
| `WORKOS_CLIENT_ID` | WorkOS Client ID | `client_xxx` |
| `WORKOS_COOKIE_PASSWORD` | 32+ char random string | Generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_WORKOS_REDIRECT_URI` | OAuth callback URL | `https://your-domain.pages.dev/api/auth/callback` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `https://your-domain.pages.dev` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Email server host |
| `SMTP_PORT` | Email server port |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password |

---

## Cloudflare Pages Features

### Automatic Deployments

- Every push to `main` triggers a production deployment
- Pull requests get preview deployments automatically
- Preview URLs: `https://[commit-hash].akademyx-programme-web.pages.dev`

### Performance Benefits

- **Global CDN**: Content served from 275+ locations worldwide
- **Automatic SSL**: Free SSL certificates
- **DDoS Protection**: Built-in security
- **Unlimited Bandwidth**: No bandwidth limits on free tier
- **Fast Builds**: Optimized build infrastructure

### Analytics & Monitoring

- Built-in Web Analytics (privacy-friendly)
- Real-time deployment logs
- Performance metrics

---

## Continuous Deployment

### Automatic Deployments

Cloudflare Pages automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Cloudflare automatically builds and deploys
```

### Preview Deployments

Every pull request gets a unique preview URL:

- Create a PR → Get preview URL
- Test changes before merging
- Preview URL format: `https://[pr-number].akademyx-programme-web.pages.dev`

---

## Troubleshooting

### Build Fails

**Issue**: Build fails on Cloudflare Pages

**Solutions**:

1. Check build logs in Cloudflare dashboard
2. Verify Node.js version matches (18.x)
3. Test build locally: `npm run build`
4. Ensure all dependencies are in `package.json`
5. Check for missing environment variables

### Authentication Issues

**Issue**: WorkOS authentication not working

**Solutions**:

1. Verify redirect URI matches exactly (including `/api/auth/callback`)
2. Check environment variables are set in Cloudflare
3. Ensure WorkOS is in production mode
4. Test with WorkOS dashboard logs

### Convex Connection Errors

**Issue**: "Failed to connect to Convex"

**Solutions**:

1. Verify `NEXT_PUBLIC_CONVEX_URL` is correct
2. Check Convex deployment is active: `npx convex deploy`
3. Ensure URL starts with `https://`
4. Test Convex functions in Convex dashboard

### Environment Variables Not Loading

**Issue**: Variables are undefined in application

**Solutions**:

1. Ensure client-side variables start with `NEXT_PUBLIC_`
2. Redeploy after adding/updating variables
3. Check variable names match exactly (case-sensitive)
4. Clear Cloudflare cache and redeploy

---

## Useful Commands

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=akademyx-programme-web

# List deployments
wrangler pages deployments list --project-name=akademyx-programme-web

# View deployment logs
wrangler pages deployments tail --project-name=akademyx-programme-web

# Set environment variable
wrangler pages secret put VARIABLE_NAME --project-name=akademyx-programme-web

# Delete deployment
wrangler pages deployments delete [deployment-id] --project-name=akademyx-programme-web
```

---

## Comparison: Cloudflare Pages vs Vercel

| Feature | Cloudflare Pages | Vercel |
|---------|------------------|--------|
| **Free Tier Builds** | 500/month | 100/month |
| **Bandwidth** | Unlimited | 100GB/month |
| **Build Time** | 20 min/build | 45 min/month |
| **Global CDN** | 275+ locations | 100+ locations |
| **DDoS Protection** | Included | Enterprise only |
| **Analytics** | Free | Paid add-on |
| **Custom Domains** | Unlimited | 1 on free tier |

---

## Security Best Practices

### 1. Environment Variables

- Never commit `.env.local` to git
- Use different credentials for dev/prod
- Rotate secrets regularly
- Use Cloudflare's encrypted secrets

### 2. Access Control

- Enable Cloudflare Access for admin routes
- Use WorkOS for authentication
- Implement rate limiting
- Enable bot protection

### 3. Headers & Security

The application already includes security headers in `next.config.js`:

- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

---

## Monitoring & Analytics

### Enable Cloudflare Web Analytics

1. Go to Cloudflare Dashboard → Analytics
2. Enable Web Analytics for your Pages project
3. View real-time visitor data, page views, and performance

### Set Up Alerts

1. Navigate to Notifications in Cloudflare Dashboard
2. Set up alerts for:
   - Build failures
   - High error rates
   - Performance degradation

---

## Next Steps

After successful deployment:

1. ✅ Test all application features
2. ✅ Verify authentication flow
3. ✅ Test form submissions
4. ✅ Check admin dashboard access
5. ✅ Run E2E tests against production
6. ✅ Set up monitoring and alerts
7. ✅ Configure custom domain
8. ✅ Enable Cloudflare Analytics

---

## Support Resources

- **Cloudflare Pages Docs**: <https://developers.cloudflare.com/pages>
- **Wrangler CLI Docs**: <https://developers.cloudflare.com/workers/wrangler>
- **Next.js on Cloudflare**: <https://developers.cloudflare.com/pages/framework-guides/nextjs>
- **Convex Docs**: <https://docs.convex.dev>
- **WorkOS Docs**: <https://workos.com/docs>

---

**Created**: November 21, 2025  
**Platform**: Cloudflare Pages  
**Status**: Ready to Deploy 🚀
