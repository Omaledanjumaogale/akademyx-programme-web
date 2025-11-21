#!/usr/bin/env node

/**
 * Pre-build script to generate Convex code
 * This script runs before the Next.js build and generates the necessary Convex files
 */

const { execSync } = require('child_process');

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
    console.error('❌ Error: NEXT_PUBLIC_CONVEX_URL environment variable is not set');
    console.error('Please set NEXT_PUBLIC_CONVEX_URL in your Cloudflare Pages environment variables');
    process.exit(1);
}

console.log('🔧 Generating Convex code...');
console.log(`📡 Using Convex URL: ${convexUrl}`);

try {
    // Run convex codegen with the URL
    execSync(`npx convex codegen --url "${convexUrl}"`, {
        stdio: 'inherit',
        env: { ...process.env }
    });

    console.log('✅ Convex code generated successfully!');
} catch (error) {
    console.error('❌ Failed to generate Convex code');
    console.error(error.message);
    process.exit(1);
}
