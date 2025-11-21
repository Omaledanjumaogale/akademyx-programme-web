# 🔧 Cloudflare Pages Node.js Version Fix

## Problem

Cloudflare Pages is using Node.js 18.17.0 instead of Node.js 20, causing the build to fail with:

```
ReferenceError: File is not defined
```

## Root Cause

The Convex CLI requires Node.js 20+ because it uses the global `File` API which is only available in Node.js 20 and above.

## Solution

### Option 1: Manual Configuration in Cloudflare Dashboard (RECOMMENDED)

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** → **Builds & deployments**
3. Scroll down to **Build configuration**
4. Click **Edit configuration**
5. Under **Environment variables (advanced)**, add:
   - **Variable name**: `NODE_VERSION`
   - **Value**: `20`
   - **Environment**: Select both **Production** and **Preview**
6. Click **Save**
7. Go to **Deployments** tab
8. Click **Retry deployment** on the latest failed deployment

### Option 2: Using .nvmrc or .node-version Files

The repository now includes both:

- `.nvmrc` file with `20.0.0`
- `.node-version` file with `20.0.0`

Cloudflare Pages should automatically detect these files. If it doesn't:

1. Check that the files are committed to your repository
2. Ensure they're in the root directory
3. Try triggering a new deployment with a fresh commit

### Option 3: Set in Build Command

If the above options don't work, you can force the Node.js version in the build command:

1. Go to Cloudflare Pages → **Settings** → **Builds & deployments**
2. Edit the **Build command** to:

   ```bash
   export NODE_VERSION=20 && npm run build
   ```

## Verification

After applying any of the above solutions:

1. Trigger a new deployment
2. Check the build logs - you should see:

   ```
   Node.js v20.x.x
   ```

   instead of `Node.js v18.17.0`

3. The build should complete successfully

## Additional Notes

- Node.js 20 is required for the `File` API used by Convex
- This is a build-time requirement only
- The runtime environment can still use Node.js 18 if needed (but 20 is recommended)

## If Still Failing

If the build still fails after trying all options above:

1. Check the **exact** build logs to confirm Node.js version
2. Verify environment variables are set for both Production and Preview
3. Try deleting and recreating the Cloudflare Pages project
4. Contact Cloudflare support if the issue persists

---

**Last Updated**: November 21, 2025
