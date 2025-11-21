# Deployment Guide - Akademyx Programme Webpage

## 🚀 Quick Deployment to Vercel

### Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- WorkOS account with configured application
- Convex account with deployed backend

### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Akademyx Programme Webpage"

# Create a new repository on GitHub
# Then add the remote and push
git remote add origin https://github.com/YOUR_USERNAME/akademyx-programme-web.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit <https://vercel.com>
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables**

   Click on "Environment Variables" and add the following:

   ```env
   # WorkOS Configuration
   WORKOS_API_KEY=sk_live_your_production_api_key
   WORKOS_CLIENT_ID=client_your_production_client_id
   WORKOS_COOKIE_PASSWORD=generate_a_secure_random_32_char_string
   NEXT_PUBLIC_WORKOS_REDIRECT_URI=https://your-domain.vercel.app/api/auth/callback

   # Convex Configuration
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
   CONVEX_DEPLOY_KEY=prod:your_convex_deploy_key

   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

### Step 3: Configure WorkOS for Production

1. **Update Redirect URI in WorkOS Dashboard**
   - Go to your WorkOS Dashboard
   - Navigate to your application settings
   - Add the production redirect URI: `https://your-domain.vercel.app/api/auth/callback`

2. **Update Environment Variables**
   - Copy your production API key and Client ID
   - Update them in Vercel environment variables

### Step 4: Deploy Convex Backend

```bash
# Deploy Convex to production
npx convex deploy

# This will output your production Convex URL
# Update NEXT_PUBLIC_CONVEX_URL in Vercel with this URL
```

### Step 5: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Click on "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update WorkOS Redirect URI**
   - Update the redirect URI to use your custom domain
   - Example: `https://akademyx.com/api/auth/callback`

3. **Update Environment Variables**
   - Update `NEXT_PUBLIC_WORKOS_REDIRECT_URI` in Vercel

## 🔧 Alternative Deployment Options

### Deploy to Netlify

1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**
   - Add the same environment variables as listed above

4. **Deploy**
   - Click "Deploy site"

### Deploy to Railway

1. **Create New Project**
   - Go to Railway Dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure**
   - Railway will auto-detect Next.js
   - Add environment variables
   - Deploy

### Self-Hosted Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "akademyx" -- start
pm2 save
pm2 startup
```

## 🧪 Pre-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] WorkOS redirect URI is configured for production
- [ ] Convex backend is deployed to production
- [ ] Email service is configured (if using email features)
- [ ] Build passes locally: `npm run build`
- [ ] Tests pass: `npm run test`
- [ ] E2E tests pass: `npx playwright test`
- [ ] Performance audit completed
- [ ] Security headers configured
- [ ] CORS settings reviewed
- [ ] Rate limiting implemented (if needed)

## 🔒 Security Considerations

### 1. Environment Variables

- Never commit `.env.local` to git
- Use different credentials for development and production
- Rotate secrets regularly

### 2. WorkOS Configuration

- Use production API keys only in production
- Enable MFA for WorkOS dashboard access
- Review and limit API permissions

### 3. Convex Security

- Enable Row Level Security (RLS) in Convex
- Review and test authentication rules
- Monitor Convex logs for suspicious activity

### 4. Next.js Security Headers

Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ]
}
```

## 📊 Post-Deployment Monitoring

### 1. Set Up Error Tracking

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize Sentry
npx @sentry/wizard@latest -i nextjs
```

### 2. Set Up Analytics

```bash
# Vercel Analytics (if using Vercel)
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 3. Monitor Performance

- Use Vercel Analytics or Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring (e.g., UptimeRobot)

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Build Fails on Vercel

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Test build locally**: `npm run build`
4. **Check Node.js version** matches local environment

### Authentication Not Working

1. **Verify WorkOS redirect URI** matches deployment URL
2. **Check environment variables** are set in production
3. **Review WorkOS dashboard** for error logs
4. **Test with WorkOS test mode** first

### Convex Connection Issues

1. **Verify Convex deployment** is active
2. **Check NEXT_PUBLIC_CONVEX_URL** is correct
3. **Review Convex logs** for errors
4. **Test Convex functions** in Convex dashboard

## 📞 Support

For deployment issues:

- Check Vercel documentation: <https://vercel.com/docs>
- WorkOS documentation: <https://workos.com/docs>
- Convex documentation: <https://docs.convex.dev>

---

**Last Updated**: November 21, 2025
**Deployment Status**: Ready for Production ✅
