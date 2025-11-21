# 🔧 Cloudflare Pages Environment Variables Setup

## Required Environment Variables

You **MUST** add these environment variables in your Cloudflare Pages dashboard for the build to succeed.

### Step-by-Step Instructions

1. **Go to Cloudflare Dashboard**
   - Navigate to: <https://dash.cloudflare.com>
   - Select your Pages project: `akademyx-programme-web`

2. **Open Settings**
   - Click on **Settings** tab
   - Scroll to **Environment variables** section

3. **Add Required Variables**

Click **Add variable** for each of the following:

#### Required for Build

| Variable Name | Value | Where to Find |
|--------------|-------|---------------|
| `CONVEX_DEPLOYMENT` | Your deployment name | Convex Dashboard → Settings → Deployment name (e.g., `happy-otter-123`) |
| `NEXT_PUBLIC_CONVEX_URL` | Your Convex URL | Convex Dashboard → Settings → Deployment URL (e.g., `https://happy-otter-123.convex.cloud`) |

#### Required for Runtime

| Variable Name | Value | Where to Find |
|--------------|-------|---------------|
| `WORKOS_API_KEY` | Your WorkOS API key | WorkOS Dashboard → API Keys (starts with `sk_live_` or `sk_test_`) |
| `WORKOS_CLIENT_ID` | Your WorkOS Client ID | WorkOS Dashboard → Your App → Client ID (starts with `client_`) |
| `WORKOS_COOKIE_PASSWORD` | 32+ character random string | Generate with: `openssl rand -base64 32` |
| `NEXT_PUBLIC_WORKOS_REDIRECT_URI` | Your callback URL | `https://akademyx-programme-web.pages.dev/api/auth/callback` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `https://akademyx-programme-web.pages.dev` |

#### Optional (for email features)

| Variable Name | Value |
|--------------|-------|
| `SMTP_HOST` | Your SMTP host (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (e.g., `587`) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | Your email password or app-specific password |

### Important Notes

1. **Environment Selection**: For each variable, select **BOTH** "Production" and "Preview" environments
2. **CONVEX_DEPLOYMENT**: This is the most critical one for the build to succeed
3. **Save After Each Variable**: Click "Save" after adding each variable

### How to Find Your Convex Deployment Name

#### Option 1: From Convex Dashboard

1. Go to <https://dashboard.convex.dev>
2. Select your project
3. Go to **Settings**
4. Look for **Deployment name** or **Deployment URL**
5. The deployment name is the subdomain part (e.g., if URL is `https://happy-otter-123.convex.cloud`, the name is `happy-otter-123`)

#### Option 2: From Your Local .env.local

1. Open your `.env.local` file
2. Look at `NEXT_PUBLIC_CONVEX_URL`
3. Extract the subdomain (the part before `.convex.cloud`)

### After Adding Variables

1. **Save all variables**
2. Go to **Deployments** tab
3. Click **Retry deployment** on the latest failed deployment
4. The build should now succeed! 🎉

### Troubleshooting

If the build still fails:

1. **Verify all variables are set** for both Production and Preview
2. **Check for typos** in variable names (they're case-sensitive)
3. **Ensure CONVEX_DEPLOYMENT** matches exactly what's in your Convex dashboard
4. **Try triggering a fresh deployment** by pushing a small change to GitHub

---

**Last Updated**: November 21, 2025
