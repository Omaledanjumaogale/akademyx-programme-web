#!/usr/bin/env node

/**
 * Pre-build script to generate Convex code
 * This script runs before the Next.js build and generates the necessary Convex files
 */

const { execSync } = require('child_process');

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const deployKey = process.env.CONVEX_DEPLOY_KEY;

if (!convexUrl) {
    console.error('❌ Error: NEXT_PUBLIC_CONVEX_URL environment variable is not set');
    console.error('Please set NEXT_PUBLIC_CONVEX_URL in your Cloudflare Pages environment variables');
    process.exit(1);
}

// Extract deployment name from URL (e.g., "fleet-stingray-490" from "https://fleet-stingray-490.convex.cloud")
const deploymentName = convexUrl.replace('https://', '').replace('.convex.cloud', '').trim();

console.log('🔧 Generating Convex code...');
console.log(`📡 Using Convex URL: ${convexUrl}`);
console.log(`📦 Deployment name: ${deploymentName}`);
console.log(`🔑 Deploy key: ${deployKey ? 'Set ✓' : 'Not set (may cause auth errors)'}`);

try {
    // Prepare environment variables
    const env = {
        ...process.env,
        CONVEX_DEPLOYMENT: deploymentName
    };

    // Add deploy key if available
    if (deployKey) {
        env.CONVEX_DEPLOY_KEY = deployKey;
    }

    // Run convex codegen with the URL
    execSync(`npx convex codegen --url "${convexUrl}"`, {
        stdio: 'inherit',
        env: env
    });

    console.log('✅ Convex code generated successfully!');
} catch (error) {
    console.error('❌ Failed to generate Convex code');
    console.error(error.message);
    process.exit(1);
}
