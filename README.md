<p align="center">
  <img src="public/logo.png" alt="All Service Rental" width="200" />
</p>

<h1 align="center">🚛 All Service Rental</h1>

<p align="center">
  <strong>Enterprise-grade truck leasing & rental platform — built for scale, deployed on the edge.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Cloudflare_Workers-Edge-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-database-schema">Database</a> •
  <a href="#-api-integrations">Integrations</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Features

### 🏢 Multi-Role Dashboards

| Role | Capabilities |
|------|-------------|
| **Customer** | Browse equipment, create bookings, make payments, track rentals, manage notifications & profile settings |
| **Vendor** | Manage fleet & equipment listings, handle bookings, view payment history, configure profile & settings |
| **Admin** | User management, vendor oversight, rental management, payment tracking, maintenance coordination, reports & analytics |

### 🔧 Core Platform

- **Equipment Catalog** — Browse, search, and filter trucks by type, location, and availability
- **Digital Contracts** — Electronic contract signing with secure signature storage
- **Payment Processing** — Secure credit/debit card & ACH payments with recurring billing
- **GPS Tracking** — Real-time vehicle location and telematics data
- **Fleet Maintenance** — Schedule, track, and manage vehicle maintenance records
- **Credit Verification** — Automated credit score checking before contract approval
- **Vendor Verification** — DOT/MC number validation via Highway.com integration
- **Commission Tracking** — Automated vendor commission calculation and payouts

### 🌐 Marketing Pages

- **Homepage** — Hero section, featured equipment, testimonials
- **About** — Company story and team showcase
- **Equipment** — Full catalog with filtering
- **How It Works** — Step-by-step leasing guide
- **FAQ** — Searchable accordion-style FAQ
- **Contact** — Contact form with validation

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org/) | `16.2.6` | App Router, RSC, Server Actions |
| [React](https://react.dev/) | `19.2.0` | UI library with React Compiler |
| [TypeScript](https://www.typescriptlang.org/) | `5.x` | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | `4.x` | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | `12.x` | Animations & transitions |
| [Recharts](https://recharts.org/) | `3.x` | Dashboard charts & analytics |
| [Swiper](https://swiperjs.com/) | `12.x` | Touch-friendly carousels |
| [Lucide React](https://lucide.dev/) | `1.x` | Icon system |

### State & Forms

| Technology | Purpose |
|-----------|---------|
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight global state management |
| [React Hook Form](https://react-hook-form.com/) | Performant form handling |
| [Zod](https://zod.dev/) | Schema validation (shared client ↔ server) |

### Backend & Database

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Prisma](https://www.prisma.io/) | `7.x` | Type-safe ORM with migrations |
| [PostgreSQL](https://www.postgresql.org/) | — | Primary relational database |
| [NextAuth.js](https://next-auth.js.org/) | `4.x` | Authentication & session management |
| [Axios](https://axios-http.com/) | `1.x` | HTTP client for external APIs |

### Infrastructure & Deployment

| Technology | Purpose |
|-----------|---------|
| [Cloudflare Workers](https://workers.cloudflare.com/) | Edge deployment via OpenNext |
| [OpenNext](https://opennext.js.org/) | Next.js → Cloudflare adapter |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | Cloudflare CLI & dev tools |

### Design System

| Font | Usage |
|------|-------|
| **Outfit** | Primary / headings |
| **Manrope** | Body text |
| **Plus Jakarta Sans** | UI elements |
| **Space Grotesk** | Monospace / accents |
| **Inter** | Fallback / data tables |

**Brand Colors:**  
`#001C2F` Primary Navy · `#28A745` Secondary Green · `#050E1B` Dark Background · `#050505` Brand Black

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Cloudflare Workers (Edge)                   │
│                        OpenNext Adapter                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │  Marketing   │  │  Auth Pages  │  │  Dashboard Panels  │    │
│  │  (SSR/RSC)   │  │  (SSR/RSC)   │  │  Customer│Vendor│  │    │
│  │              │  │              │  │  Admin              │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Next.js API Routes                      │   │
│  │        /api/payment  ·  (future endpoints)               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Prisma ORM (v7)                        │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │   PostgreSQL    │
                   └─────────────────┘

External Services:
  Experian ──── Credit Checks
  Authorize.net ── Payments
  HubSpot ───── CRM & Deals
  Fleetio ───── Fleet Maintenance
  Samsara ───── GPS Tracking
  Highway.com ─ Carrier Verification
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | `18+` |
| PostgreSQL | `14+` |
| npm | `9+` |

### 1. Clone & Install

```bash
git clone <repository-url>
cd all-service-rental-staging
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# ── Database ──────────────────────────────────
DATABASE_URL="postgresql://user:password@localhost:5432/all_service_rental"

# ── Authentication ────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# ── API Integrations (optional) ───────────────
EXPERIAN_API_KEY=""
AUTHORIZE_NET_API_LOGIN_ID=""
AUTHORIZE_NET_TRANSACTION_KEY=""
HUBSPOT_API_KEY=""
FLEETIO_API_KEY=""
FLEETIO_ACCOUNT_TOKEN=""
SAMSARA_API_KEY=""
HIGHWAY_API_KEY=""
```

### 3. Setup Database

```bash
# Generate the Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio GUI
npx prisma studio
```

### 4. Start Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Project Structure

```
all-service-rental-staging/
│
├── prisma/
│   ├── migrations/                # Database migration history
│   └── schema.prisma              # Database schema (8 models, 12 enums)
│
├── public/                        # Static assets (images, fonts)
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── welcome/
│   │   │
│   │   ├── (marketing)/           # Public marketing pages (SSR)
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── about/
│   │   │   ├── equipment/
│   │   │   ├── how-it-works/
│   │   │   ├── faq/
│   │   │   └── contact/
│   │   │
│   │   ├── (customer)/            # Customer dashboard (route group)
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   ├── tracking/
│   │   │   ├── notifications/
│   │   │   └── settings/
│   │   │
│   │   ├── customer/              # Customer portal
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   ├── tracking/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   │
│   │   ├── vendor/                # Vendor portal
│   │   │   ├── profile-setup/
│   │   │   └── (dashboard)/
│   │   │       ├── dashboard/
│   │   │       ├── fleet/
│   │   │       ├── bookings/
│   │   │       ├── payments/
│   │   │       ├── history/
│   │   │       ├── profile/
│   │   │       └── settings/
│   │   │
│   │   ├── admin/                 # Admin portal
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── vendors/
│   │   │   ├── rentals/
│   │   │   ├── payments/
│   │   │   ├── maintenance/
│   │   │   └── reports/
│   │   │
│   │   ├── api/                   # API routes
│   │   │   └── payment/
│   │   │
│   │   ├── global.css             # Tailwind CSS 4 entry point
│   │   └── layout.tsx             # Root layout
│   │
│   ├── components/
│   │   ├── common/                # Shared components
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── VehicleCard.tsx
│   │   │   └── ToastProvider.tsx
│   │   │
│   │   ├── ui/                    # Reusable UI primitives
│   │   │   ├── AccordionItem.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── MetricBadge.tsx
│   │   │   ├── PageHeroBg.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── SliderArrows.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── TeamCard.tsx
│   │   │
│   │   ├── dashboard/             # Dashboard-specific components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── admin/
│   │   │   └── vendor/
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── pages/                 # Page-level component sections
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── equipment/
│   │   │   ├── how_it_works/
│   │   │   ├── faq/
│   │   │   ├── contact/
│   │   │   ├── auth/
│   │   │   └── vendor/
│   │   │
│   │   └── data/                  # Static data / content
│   │
│   ├── config/
│   │   └── navigation.ts          # Route configuration
│   │
│   ├── hooks/
│   │   └── useFleet.ts            # Fleet management hook
│   │
│   ├── lib/
│   │   ├── storageNamespace.ts    # Storage key namespacing
│   │   └── validations/           # Zod validation schemas
│   │
│   └── types/
│       ├── equipment.ts           # Equipment type definitions
│       ├── user.ts                # User type definitions
│       └── vendor.ts              # Vendor type definitions
│
├── .agents/                       # AI agent skill definitions
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS 4 theme & tokens
├── prisma.config.ts               # Prisma client configuration
├── postcss.config.mjs             # PostCSS with nesting support
├── tsconfig.json                  # TypeScript strict configuration
├── wrangler.jsonc                 # Cloudflare Workers config
├── open-next.config.ts            # OpenNext adapter config
└── package.json
```

---

## 🗄 Database Schema

The Prisma schema defines **8 models** and **12 enums** for the platform:

```mermaid
erDiagram
    User ||--o| CustomerProfile : has
    User ||--o| VendorProfile : has
    User ||--o{ Truck : owns
    User ||--o{ Contract : "customer/vendor"
    User ||--o{ Payment : makes

    Truck ||--o{ Contract : "rented via"
    Truck ||--o{ MaintenanceRecord : has
    Truck ||--o{ GPSTracking : tracked

    Contract ||--o{ Payment : receives
    Contract ||--o| Commission : generates

    VendorProfile ||--o{ MaintenanceRecord : manages
    VendorProfile ||--o{ Commission : earns
```

### Models Overview

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `User` | All platform users | `email`, `role` (CUSTOMER / VENDOR / ADMIN), `status` |
| `CustomerProfile` | Customer-specific data | `creditScore`, `driversLicense`, `budgetMin/Max`, `preferredTypes` |
| `VendorProfile` | Vendor business info | `companyName`, `dotNumber`, `mcNumber`, `insuranceProvider`, `highwayVerified` |
| `Truck` | Equipment listings | `type`, `make/model/year`, `dailyRate/weeklyRate/monthlyRate`, GPS coords |
| `Contract` | Rental agreements | `startDate/endDate`, `totalAmount`, `signatureUrl`, `hubspotDealId` |
| `Payment` | Financial transactions | `amount`, `method` (CREDIT_CARD / DEBIT_CARD / ACH), Authorize.net IDs |
| `Commission` | Vendor payouts | `rentalAmount`, `commissionRate`, `commissionAmount` |
| `MaintenanceRecord` | Service records | `type`, `priority`, `cost`, `fleetioId` |
| `GPSTracking` | Vehicle location data | `latitude/longitude`, `speed`, `heading`, `samsaraDeviceId` |

### Truck Types

`BOX_TRUCK` · `FLATBED` · `REFRIGERATED` · `DUMP_TRUCK` · `SEMI_TRUCK` · `MOVING_VAN`

---

## 🔗 API Integrations

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| **Experian** | Credit score verification & identity validation | `CustomerProfile.creditScore` |
| **Authorize.net** | Payment gateway with recurring billing & customer profiles | `Payment.transactionId`, `Payment.subscriptionId` |
| **HubSpot CRM** | Deal tracking & customer relationship management | `Contract.hubspotDealId` |
| **Fleetio** | Fleet maintenance scheduling & tracking | `Truck.fleetioVehicleId`, `MaintenanceRecord.fleetioId` |
| **Samsara** | GPS tracking & vehicle telematics | `Truck.samsaraDeviceId`, `GPSTracking.samsaraDeviceId` |
| **Highway.com** | Carrier/vendor DOT & MC number verification | `VendorProfile.highwayVerified` |

---

## ☁️ Deployment

### Cloudflare Workers (Production)

The platform deploys to the Cloudflare Workers edge network via **OpenNext**:

```bash
# Build for Cloudflare
npm run build:cf

# Deploy to Cloudflare Workers
npm run deploy
```

**Wrangler config:** `wrangler.jsonc`  
**Worker name:** `all-service-rental`  
**Compatibility flags:** `nodejs_compat`

### Local Development

```bash
npm run dev          # Start dev server (Webpack)
npm run build        # Production build (Webpack)
npm run start        # Start production server
npm run lint         # ESLint checks
```

---

## 🔒 Security Headers

The platform enforces the following security headers on all routes:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |

---

## 🧑‍💻 Contributing

1. Create a feature branch from `main`
2. Follow [conventional commits](https://www.conventionalcommits.org/) for commit messages
3. Ensure `npm run lint` passes with zero warnings
4. Write/update tests where applicable
5. Submit a pull request with a clear description

---

<p align="center">
  Built with ❤️ using <strong>Next.js 16</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS 4</strong><br/>
  Deployed on <strong>Cloudflare Workers</strong> at the edge 🌍
</p>
