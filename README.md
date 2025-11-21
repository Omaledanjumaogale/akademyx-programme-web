# Akademyx Masterclass Programme

> A 21-day intensive digital skills accelerator designed to empower African youths with futuristic career paths, multiple income streams, and real-world digital entrepreneurship.

## 🚀 Enterprise-Grade Features

This application is built with enterprise-grade standards including:

- ✅ **Comprehensive Testing** - Vitest + React Testing Library
- ✅ **CI/CD Pipeline** - Automated testing and deployment via GitHub Actions
- ✅ **Type Safety** - Strict TypeScript with Zod validation
- ✅ **Security Headers** - OWASP recommended security headers
- ✅ **Error Handling** - Error boundaries and graceful degradation
- ✅ **Performance Monitoring** - Built-in performance tracking utilities
- ✅ **Input Validation** - Server and client-side validation
- ✅ **Environment Validation** - Type-safe environment variables

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Convex account
- WorkOS account
- Cloudflare account (for deployment)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Omaledanjumaogale/akademyx-programme-web.git
cd akademyx-programme-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
WORKOS_API_KEY=sk_test_your_api_key
WORKOS_CLIENT_ID=client_your_client_id
WORKOS_REDIRECT_URI=http://localhost:3000/auth/callback
WORKOS_COOKIE_PASSWORD=your_32_character_minimum_password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check

# Linting
npm run lint
```

See [TESTING.md](./TESTING.md) for more details.

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Backend**: Convex (serverless)
- **Authentication**: WorkOS AuthKit
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript + Zod
- **Testing**: Vitest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Cloudflare Pages

## 📁 Project Structure

```text
├── .github/workflows/     # CI/CD pipelines
├── convex/               # Backend (mutations, queries, schema)
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js pages (App Router)
│   ├── components/      # React components
│   ├── lib/             # Utilities and shared logic
│   └── test/            # Test setup
├── wrangler.toml        # Cloudflare configuration
├── ARCHITECTURE.md      # Architecture documentation
├── TESTING.md          # Testing guide
└── README.md           # This file
```

## 🚢 Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Connect repository in Cloudflare Pages dashboard
3. Configure build settings (Next.js preset)
4. Add environment variables
5. Deploy!

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables for Production

Make sure to set all environment variables from `.env.example` in Cloudflare Pages dashboard.

## 🔒 Security

This application implements multiple security layers:

- **Authentication**: Enterprise-grade auth via WorkOS
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Input Validation**: Zod schemas on client and server
- **Environment Validation**: Type-safe env vars
- **Error Handling**: Graceful error boundaries

## 📊 CI/CD

The project includes a GitHub Actions workflow that runs on every push and PR:

- ESLint checks
- TypeScript type checking
- Unit and integration tests
- Build verification
- Security audit

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and type checking
4. Submit a pull request

### Pre-commit Checklist

- [ ] Tests pass (`npm run test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code reviewed

## 📝 License

[Add your license here]

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.

---

Built with ❤️ for African youth empowerment
