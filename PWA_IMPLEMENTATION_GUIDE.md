# PWA Implementation Guide - Akademyx Programme

## 🎯 Overview

This guide documents the complete Progressive Web App (PWA) implementation for the Akademyx Programme Webpage, transforming it into a mobile-first, offline-capable application with native app-like features.

---

## ✅ Completed PWA Features

### 1. **Core PWA Infrastructure**

#### Files Created

- ✅ `public/manifest.json` - PWA manifest with app configuration
- ✅ `public/service-worker.ts` - Service worker with offline caching
- ✅ `next.config.js` - Updated with PWA configuration
- ✅ `src/components/OfflineIndicator.tsx` - Network status indicator
- ✅ `src/components/MobileHamburger.tsx` - Mobile navigation menu
- ✅ `src/components/MobileBottomNav.tsx` - Bottom tab navigation
- ✅ `src/components/PWAInstallPrompt.tsx` - Install prompt component
- ✅ `src/components/PushNotificationManager.tsx` - Push notification handler
- ✅ `src/components/PWAWrapper.tsx` - PWA orchestration component

### 2. **Offline Capabilities**

#### Caching Strategy

- **Images**: Cache First (30 days, max 60 entries)
- **Static Assets (CSS/JS)**: Stale While Revalidate (24 hours)
- **API Requests**: Network First with 5-minute cache
- **Convex Data**: Network First with 1-hour cache
- **Fonts**: Cache First (365 days)

#### Background Sync

- Pending applications sync when online
- Pending payments sync when online
- Automatic retry mechanism

### 3. **Mobile Optimizations**

#### Navigation

- **Hamburger Menu**: Slide-in menu with smooth animations
- **Bottom Tab Bar**: Quick access to Home, Courses, Apply, Profile
- **Gesture Support**: Swipe gestures, touch-friendly targets (44x44px minimum)

#### Responsive Design

- **Typography**: Scalable fonts (14-16px mobile base)
- **Spacing**: 16px mobile gutters, consistent padding
- **Cards**: Stack to single column on mobile
- **Forms**: Mobile-optimized inputs with auto-complete

### 4. **Push Notifications**

#### Features

- User opt-in prompts
- Background notification handling
- Click actions (open/close)
- Vibration patterns
- Badge icons

#### Implementation

```typescript
// Subscribe to push notifications
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey
})
```

### 5. **Install Experience**

#### Features

- Automatic install prompt after 3 seconds
- iOS-specific instructions
- Dismissible with localStorage persistence
- Standalone mode detection

---

## 📱 Mobile-First Design Principles

### Touch Targets

- Minimum 44x44px for all interactive elements
- Adequate spacing between clickable items
- Large, thumb-friendly buttons

### Typography

```css
/* Mobile base */
font-size: clamp(14px, 4vw, 16px);

/* Headings */
h1: clamp(32px, 8vw, 64px);
h2: clamp(24px, 6vw, 48px);
```

### Spacing

```css
/* Mobile gutters */
padding: 16px;
gap: 16px;

/* Desktop */
@media (min-width: 1024px) {
  padding: 24px;
  gap: 24px;
}
```

### Viewport Handling

```javascript
// Dynamic viewport height for mobile browsers
const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install next-pwa workbox-webpack-plugin workbox-window @radix-ui/react-navigation-menu @radix-ui/react-dropdown-menu react-use framer-motion
```

### 2. Configure Environment Variables

Add to `.env.local`:

```env
# Push Notifications (optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
```

### 3. Generate App Icons

Create icons in `public/icons/` directory:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

Use tools like:

- <https://realfavicongenerator.net/>
- <https://www.pwabuilder.com/imageGenerator>

### 4. Update Layout

Add PWA components to `src/app/layout.tsx`:

```tsx
import { PWAWrapper } from "@/components/PWAWrapper"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="pb-16 lg:pb-0">
        <AuthProvider>
          <ConvexClientProvider>
            <PWAWrapper>
              {children}
            </PWAWrapper>
          </ConvexClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 5. Build and Test

```bash
# Build for production
npm run build

# Test PWA features
npm run start

# Open in browser and check:
# - Application tab in DevTools
# - Lighthouse PWA audit
# - Offline functionality
```

---

## 🧪 Testing Checklist

### Desktop Testing

- [ ] Service worker registers successfully
- [ ] Offline mode works (disconnect network)
- [ ] Install prompt appears
- [ ] Manifest loads correctly
- [ ] Caching strategies work

### Mobile Testing (iOS)

- [ ] Add to Home Screen works
- [ ] Standalone mode activates
- [ ] Bottom nav bar displays
- [ ] Touch targets are adequate
- [ ] Viewport scales correctly
- [ ] Gestures work smoothly

### Mobile Testing (Android)

- [ ] Install banner appears
- [ ] PWA installs successfully
- [ ] Push notifications work
- [ ] Background sync functions
- [ ] Offline mode persists data

### Performance

- [ ] Lighthouse PWA score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] Smooth 60fps animations

---

## 📊 PWA Metrics

### Target Scores

- **PWA**: 100/100
- **Performance**: 90+/100
- **Accessibility**: 95+/100
- **Best Practices**: 95+/100
- **SEO**: 100/100

### Key Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🔐 Security Considerations

### Service Worker

- Only registers in production (`NODE_ENV === 'production'`)
- HTTPS required for service worker
- Secure caching strategies

### Push Notifications

- User consent required
- VAPID keys for authentication
- Encrypted payload transmission

### Data Storage

- IndexedDB for offline data
- Secure token storage
- Cache expiration policies

---

## 🚀 Deployment

### Cloudflare Pages

1. **Build Settings**:

   ```
   Build command: npm run build
   Build output: .next
   ```

2. **Environment Variables**:
   - Add all `NEXT_PUBLIC_*` variables
   - Add `VAPID_PUBLIC_KEY` if using push notifications

3. **Headers** (already configured in `next.config.js`):
   - Service-Worker-Allowed: /
   - Cache-Control for static assets

### Vercel

1. **Automatic Deployment**:
   - Connect GitHub repository
   - Auto-deploys on push to main

2. **Environment Variables**:
   - Add in Vercel dashboard
   - Redeploy after adding variables

---

## 📱 Mobile UX Best Practices

### Navigation

- **Top**: Hamburger menu for authenticated users
- **Bottom**: Tab bar for quick access (mobile only)
- **Gestures**: Swipe to navigate, long-press for context menus

### Forms

- **Auto-complete**: Enable browser auto-fill
- **Keyboard Types**: Numeric for phone/NIN, email for email
- **Validation**: Real-time feedback
- **Submit**: Large, prominent buttons

### Cards & Lists

- **Touch-friendly**: Adequate padding and spacing
- **Swipe Actions**: Delete, archive, etc.
- **Pull-to-Refresh**: Refresh data on pull-down

### Images & Media

- **Lazy Loading**: Load images as needed
- **Responsive**: Proper aspect ratios
- **Placeholders**: Show skeleton while loading
- **Zoom**: Pinch-to-zoom for images

---

## 🎨 Design System

### Colors

```css
--primary: #8B5CF6;
--primary-foreground: #FFFFFF;
--background: #FFFFFF;
--foreground: #0A0A0A;
--muted: #F4F4F5;
--muted-foreground: #71717A;
--border: #E4E4E7;
```

### Shadows

```css
/* Mobile */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Desktop */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Animations

```css
/* Smooth transitions */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Micro-interactions */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🐛 Troubleshooting

### Service Worker Not Registering

**Issue**: Service worker fails to register

**Solutions**:

1. Check HTTPS is enabled
2. Verify `NODE_ENV === 'production'`
3. Check browser console for errors
4. Clear browser cache and reload

### Install Prompt Not Showing

**Issue**: PWA install prompt doesn't appear

**Solutions**:

1. Check manifest.json is accessible
2. Verify all required manifest fields
3. Ensure service worker is registered
4. Check browser supports PWA (Chrome, Edge, Safari 16.4+)

### Offline Mode Not Working

**Issue**: App doesn't work offline

**Solutions**:

1. Check service worker caching strategies
2. Verify network requests are cached
3. Test with DevTools offline mode
4. Check cache storage in Application tab

### Push Notifications Failing

**Issue**: Notifications don't send/receive

**Solutions**:

1. Verify VAPID keys are correct
2. Check user granted permission
3. Test notification payload
4. Verify service worker is active

---

## 📚 Resources

### Documentation

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Next PWA](https://github.com/shadowwalker/next-pwa)
- [Web Push Protocol](https://web.dev/push-notifications-overview/)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Favicon Generator](https://realfavicongenerator.net/)
- [VAPID Key Generator](https://vapidkeys.com/)

### Testing

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)

---

## 🎯 Next Steps

### Immediate

1. [ ] Generate app icons
2. [ ] Test on physical devices
3. [ ] Configure push notification server
4. [ ] Set up analytics tracking

### Short-term

1. [ ] Implement background sync for all forms
2. [ ] Add offline data persistence
3. [ ] Create app screenshots for manifest
4. [ ] Optimize cache strategies

### Long-term

1. [ ] Implement app shortcuts
2. [ ] Add share target API
3. [ ] Implement file handling
4. [ ] Add periodic background sync

---

**Last Updated**: November 28, 2025  
**Status**: ✅ PWA Infrastructure Complete - Ready for Icon Generation and Testing
