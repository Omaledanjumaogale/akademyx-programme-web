# Cloudflare Pages Configuration Guide

## ✅ Code Changes Applied

The following changes have been made to prepare your application for Cloudflare Pages deployment:

### 1. Installed Cloudflare Adapter

```bash
npm install --save-dev @cloudflare/next-on-pages --legacy-peer-deps
```

### 2. Updated `next.config.js`

- ✅ Removed `output: 'standalone'` (Cloudflare adapter handles this)
- ✅ Kept security headers and other optimizations

### 3. Updated Auth Routes

Both `/src/app/auth/signup/route.ts` and `/src/app/auth/callback/route.ts` now use:

```typescript
export const runtime = 'edge'  // Required for Cloudflare Pages
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
```

### 4. Updated `package.json`

```json
"build": "node scripts/prebuild.js && next build && npx @cloudflare/next-on-pages",
"pages:build": "npx @cloudflare/next-on-pages"
```

---

## 🔧 Cloudflare Pages Dashboard Configuration

### Step 1: Build Settings

Go to **Cloudflare Dashboard** → **Pages** → **akademyx-programme-web** → **Settings** → **Builds & deployments**

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `.vercel/output/static` |
| **Node.js version** | `20` |

### Step 2: Environment Variables (CRITICAL!)

Go to **Settings** → **Environment variables**

Add these for **BOTH Production and Preview**:

#### Required for Build

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://fleet-stingray-490.convex.cloud` | Your Convex deployment URL |
| `CONVEX_DEPLOY_KEY` | `dev:fleet-stingray-49...` | From Convex dashboard |
| `NODE_VERSION` | `20` | Force Node.js 20 |

#### Required for Runtime (WorkOS Auth)

| Variable | Value | Example |
|----------|-------|---------|
| `WORKOS_API_KEY` | Your WorkOS API key | `sk_test_a2V5ZxAxS0...` |
| `WORKOS_CLIENT_ID` | Your WorkOS Client ID | `client_01KA50KK1560...` |
| `WORKOS_REDIRECT_URI` | **`https://akademyx-programme-web.pages.dev/api/auth/callback`** | Must match exactly |
| `WORKOS_COOKIE_PASSWORD` | 32+ character random string | `7e8291b0-4921-4d92-9a12-b82910d921e9-secure-auth` |
| `NEXT_PUBLIC_APP_URL` | `https://akademyx-programme-web.pages.dev` | Your deployment URL |

### Step 3: Compatibility Flags

Go to **Settings** → **Functions** → **Compatibility flags**

1. Add `nodejs_compat` (enables Node.js APIs like crypto for auth)
2. Set **Compatibility date** to `2024-10-01` or later

---

## 🔐 WorkOS Configuration

### Update WorkOS Dashboard

1. Log in to [WorkOS Dashboard](https://dashboard.workos.com/)
2. Go to **Configuration** → **Redirect URIs**
3. Add these URIs:

```
https://akademyx-programme-web.pages.dev/api/auth/callback
```

4. Go to **Configuration** → **App homepage URL**
   - Set to: `https://akademyx-programme-web.pages.dev`

5. Go to **Configuration** → **Login endpoint**
   - Set to: `https://akademyx-programme-web.pages.dev/auth/login`

6. Go to **Configuration** → **Logout redirect**
   - Set to: `https://akademyx-programme-web.pages.dev`

---

## 🚀 Deployment Process

### Automatic Deployment

1. Push code to GitHub (already done!)
2. Cloudflare Pages will automatically start building
3. Monitor at: **Dashboard** → **Pages** → **akademyx-programme-web** → **Deployments**

### Expected Build Output

```
✅ Installing dependencies...
✅ Running: node scripts/prebuild.js
🔧 Generating Convex code...
✅ Convex code generated successfully!
✅ Running: next build
✅ Compiled successfully
✅ Running: npx @cloudflare/next-on-pages
✅ Cloudflare Pages adapter completed
✅ Build completed successfully!
```

---

## 🧪 Testing After Deployment

### 1. Basic Functionality

- Visit `https://akademyx-programme-web.pages.dev`
- Homepage should load ✅

### 2. Auth Routes

- Visit `/auth/login` - should redirect properly
- Visit `/auth/signup` - should redirect properly
- Visit `/auth/callback` - should redirect properly

### 3. Full Auth Flow

- Click "Sign In" or "Sign Up"
- Complete WorkOS authentication
- Should redirect back to your app successfully

---

## 🐛 Troubleshooting

### Build Still Failing?

**Check Build Logs:**

- Dashboard → Deployments → Click latest deployment → View logs

**Common Issues:**

| Error | Solution |
|-------|----------|
| `Invalid URL` | Ensure `NEXT_PUBLIC_APP_URL` is set in env vars |
| `CONVEX_DEPLOYMENT not set` | Ensure `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOY_KEY` are set |
| `401 Unauthorized` | Check `CONVEX_DEPLOY_KEY` is correct |
| `Module not found` | Clear build cache: Settings → Builds → Clear cache and retry |

### Runtime Errors?

**Check Function Logs:**

- Dashboard → Your project → Functions → Logs

**Common Issues:**

| Error | Solution |
|-------|----------|
| `WORKOS_REDIRECT_URI not set` | Add to environment variables |
| `Invalid redirect URI` | Must match exactly in WorkOS dashboard |
| `Session errors` | Check `WORKOS_COOKIE_PASSWORD` is 32+ chars |

---

## 📝 Summary Checklist

- [x] Installed `@cloudflare/next-on-pages`
- [x] Updated `next.config.js` (removed `output: 'standalone'`)
- [x] Updated auth routes to use `runtime = 'edge'`
- [x] Updated build script in `package.json`
- [x] Pushed changes to GitHub
- [ ] **Set environment variables in Cloudflare Pages dashboard**
- [ ] **Enable `nodejs_compat` compatibility flag**
- [ ] **Update WorkOS redirect URIs**
- [ ] **Test deployment**

---

## 🎉 Next Steps

1. **Set all environment variables** in Cloudflare Pages (see Step 2 above)
2. **Enable compatibility flags** (see Step 3 above)
3. **Update WorkOS configuration** (see WorkOS Configuration section)
4. **Monitor the deployment** and check for success
5. **Test the live site** at `https://akademyx-programme-web.pages.dev`

**The deployment should now succeed!** 🚀
