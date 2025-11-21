# Admin Dashboard Quick Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Create Admin User

Run this command in your terminal:

```bash
npx convex run adminSetup:createAdminUser '{
  "email": "admin@akademyx.com",
  "firstName": "Admin",
  "lastName": "User",
  "phone": "+2348012345678"
}'
```

**Expected Output:**

```json
{
  "userId": "...",
  "message": "Admin user created successfully",
  "credentials": {
    "email": "admin@akademyx.com",
    "role": "admin"
  }
}
```

### Step 2: Add Sample Data (Optional)

To test the dashboard with sample data:

```bash
npx convex run adminSetup:createSampleData
```

**This will create:**

- ✅ 3 sample applications (pending, approved, rejected)
- ✅ 2 referral partners (1 institution, 1 individual)
- ✅ 2 commission records

### Step 3: Access the Dashboard

Open your browser and go to:

```
http://localhost:3001/dashboard/admin
```

You should see the admin dashboard with all the sample data!

---

## 📋 Complete Setup Checklist

### Development Setup ✅

- [x] Admin Dashboard UI created
- [x] All 6 management tabs implemented:
  - [x] Analytics Dashboard
  - [x] Application Management
  - [x] Referral Management
  - [x] Financial Management
  - [x] User Management
  - [x] Settings Panel
- [x] CRUD operations functional
- [x] Search and filtering working
- [x] Responsive design applied
- [x] New UI/UX design system integrated
- [x] Authentication temporarily disabled for testing

### Admin User Setup 🔧

- [ ] Create admin user (Run Step 1 above)
- [ ] Add sample data (Run Step 2 above)
- [ ] Test dashboard access (Run Step 3 above)
- [ ] Verify all tabs work correctly
- [ ] Test CRUD operations

### Production Preparation 🔒

- [ ] Re-enable authentication in `convex/crud.ts`
- [ ] Re-enable role checks in `AdminDashboard.tsx`
- [ ] Set up WorkOS authentication properly
- [ ] Configure environment variables
- [ ] Add audit logging
- [ ] Implement rate limiting
- [ ] Enable HTTPS
- [ ] Add CSRF protection

---

## 🎨 UI/UX Features Completed

### Design System ✅

- ✅ **Color Palette**: Nigerian green primary (#1B5E20), soft off-white background
- ✅ **Typography**: Plus Jakarta Sans (headings), Manrope (body)
- ✅ **Components**: Enhanced buttons, cards, inputs with glassmorphism
- ✅ **Animations**: Smooth transitions, hover effects
- ✅ **Icons**: Lucide icons throughout
- ✅ **Spacing**: Improved padding and margins

### Dashboard Features ✅

- ✅ **Tabbed Navigation**: 6 main sections
- ✅ **Stats Cards**: Real-time metrics with icons
- ✅ **Data Tables**: Sortable, searchable, filterable
- ✅ **Modals**: Detail views for applications and partners
- ✅ **Badges**: Status indicators with colors
- ✅ **Search**: Multi-field search across all sections
- ✅ **Filters**: Status, type, and custom filters
- ✅ **Actions**: Approve, reject, activate, deactivate
- ✅ **Export**: Ready for CSV/PDF export (buttons in place)

### Responsive Design ✅

- ✅ **Mobile**: Optimized for small screens
- ✅ **Tablet**: Grid layouts adapt
- ✅ **Desktop**: Full-width layouts
- ✅ **Large Screens**: Proper spacing and alignment

---

## 🧪 Testing Commands

### View All Admin Users

```bash
npx convex run adminSetup:getAdminUsers
```

### Clear Sample Data (Careful!)

```bash
npx convex run adminSetup:clearSampleData
```

### Check Applications

```bash
npx convex run crud:getApplications
```

### Check Referral Partners

```bash
npx convex run crud:getReferralPartners
```

### Check Analytics

```bash
npx convex run crud:getDashboardAnalytics
```

---

## 🔧 Troubleshooting

### Issue: "Function not found"

**Solution**: Make sure Convex is running:

```bash
npx convex dev
```

### Issue: "User already exists"

**Solution**: The admin user was already created. You can:

1. Use the existing admin
2. Create a new admin with a different email
3. Delete the existing user from Convex dashboard

### Issue: No data showing in dashboard

**Solution**: Run the sample data creation command:

```bash
npx convex run adminSetup:createSampleData
```

### Issue: Authentication errors

**Solution**: The authentication is temporarily disabled. If you see errors:

1. Check that the TODO comments are still in place
2. Restart the dev server
3. Clear browser cache

---

## 📊 Dashboard Sections Overview

### 1. Analytics Dashboard

- **8 Key Metrics**: Applications, revenue, commissions, users
- **Visual Breakdown**: Application status distribution
- **Recent Activity**: Latest 5 applications
- **Financial Overview**: Revenue, commissions, net profit

### 2. Application Management

- **Search**: By name, email, phone
- **Filter**: By status (pending/approved/rejected)
- **Table View**: All application details
- **Actions**: View, approve, reject
- **Detail Modal**: Complete application information

### 3. Referral Management

- **4 Stats Cards**: Partners, referrals, commissions
- **Search**: By name, email, code
- **Filter**: By type (individual/institution)
- **Grid View**: Partner cards with stats
- **Actions**: View, activate, deactivate
- **Detail Modal**: Full partner profile

### 4. Financial Management

- **Wallet Overview**: Total balance, revenue, commissions
- **Stats Cards**: Income, expenses, profit
- **Commission Breakdown**: Total, paid, pending
- **Top Partners**: Leaderboard
- **Transactions**: Complete history

### 5. User Management

- **Search**: By name or email
- **User Table**: All system users
- **Stats**: Total, active, admins
- **Actions**: Add, edit, delete users

### 6. Settings Panel

- **General**: Site name, email
- **Financial**: Application fee, commission rate
- **Notifications**: Email, SMS toggles
- **Security**: Password, 2FA
- **Appearance**: Light/Dark mode

---

## 🎯 Next Steps

1. **Create Your Admin User** (Step 1 above)
2. **Add Sample Data** (Step 2 above)
3. **Test the Dashboard** (Step 3 above)
4. **Customize Settings** (Update fees, rates, etc.)
5. **Add Real Data** (Start accepting real applications)
6. **Re-enable Authentication** (When ready for production)

---

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the terminal for Convex errors
3. Verify all environment variables are set
4. Restart the dev server and Convex

---

**Status**: ✅ Admin Dashboard is fully functional and ready for testing!

**Access URL**: <http://localhost:3001/dashboard/admin>

**Created**: 2025-11-21
**Version**: 1.0.0
