# Truck Leasing & Rental Platform

A comprehensive Next.js platform for managing truck leasing and rental operations, connecting customers, vendors, and administrators with powerful features and API integrations.

## Features

### Core Functionality
- **Multi-Role System**: Customer, Vendor, and Admin dashboards
- **Truck Management**: List, search, and manage truck inventory
- **Digital Contracts**: Electronic contract signing and management
- **Payment Processing**: Secure payments with recurring billing support
- **Credit Verification**: Automated credit score checking
- **GPS Tracking**: Real-time vehicle location tracking
- **Maintenance Management**: Schedule and track vehicle maintenance
- **Vendor Verification**: Automated carrier verification and validation

### API Integrations
- **Experian API**: Credit score verification and identity validation
- **Authorize.net**: Payment gateway with recurring billing
- **HubSpot CRM**: Customer relationship management and deal tracking
- **Fleetio**: Fleet maintenance management
- **Samsara**: GPS tracking and vehicle telematics
- **Highway.com**: Vendor/carrier verification

## Tech Stack

### Frontend
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with 7-1 architecture
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Backend
- **Next.js API Routes**: RESTful API endpoints
- **Prisma**: Database ORM
- **PostgreSQL**: Primary database
- **NextAuth.js**: Authentication

### State Management
- **Zustand**: Lightweight state management

### DevOps
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Prisma Migrate**: Database migrations

## Project Structure

```
truck-leasing-platform/
├── prisma/
│   └── schema.prisma              # Database schema
├── src/
│   ├── app/                       # Next.js app directory
│   │   ├── (auth)/               # Auth routes (login, register)
│   │   ├── (dashboard)/          # Dashboard routes
│   │   │   ├── customer/
│   │   │   ├── vendor/
│   │   │   └── admin/
│   │   ├── (public)/             # Public routes
│   │   ├── api/                  # API routes
│   │   │   ├── auth/
│   │   │   ├── customers/
│   │   │   ├── vendors/
│   │   │   ├── trucks/
│   │   │   ├── contracts/
│   │   │   ├── payments/
│   │   │   ├── credit-check/
│   │   │   ├── fleet/
│   │   │   ├── tracking/
│   │   │   └── verification/
│   │   └── layout.tsx
│   ├── components/               # React components
│   │   ├── common/              # Shared components
│   │   ├── customer/            # Customer-specific
│   │   ├── vendor/              # Vendor-specific
│   │   ├── admin/               # Admin-specific
│   │   └── layouts/             # Layout components
│   ├── config/                  # Configuration files
│   │   └── env.ts               # Environment config
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Libraries and utilities
│   │   ├── api-clients/         # API client utilities
│   │   ├── utils/               # Helper functions
│   │   ├── validations/         # Zod schemas
│   │   └── prisma.ts            # Prisma client
│   ├── services/                # External API services
│   │   ├── experian/
│   │   ├── authorize-net/
│   │   ├── hubspot/
│   │   ├── fleetio/
│   │   ├── samsara/
│   │   └── highway/
│   ├── store/                   # Zustand stores
│   │   └── slices/
│   ├── styles/                  # SCSS styles
│   │   ├── abstracts/           # Variables, mixins
│   │   ├── base/                # Reset, typography
│   │   ├── components/          # Component styles
│   │   ├── layouts/             # Layout styles
│   │   └── main.scss            # Main entry
│   └── types/                   # TypeScript types
│       └── index.ts
├── .env.example                 # Environment variables template
├── next.config.ts               # Next.js configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd truck-leasing-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:
   - Database URL
   - NextAuth secret
   - API keys for all integrations

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Database Setup

The project uses PostgreSQL with Prisma ORM. Run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (Database GUI)
npx prisma studio
```

## Environment Variables

See `.env.example` for all required environment variables:

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: Secret for NextAuth

### Optional API Keys
- `EXPERIAN_API_KEY`: Credit verification
- `AUTHORIZE_NET_API_LOGIN_ID`: Payment processing
- `HUBSPOT_API_KEY`: CRM integration
- `FLEETIO_API_KEY`: Fleet management
- `SAMSARA_API_KEY`: GPS tracking
- `HIGHWAY_API_KEY`: Vendor verification

## Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## SCSS Architecture

The project follows the **7-1 pattern** for SCSS:

```
styles/
├── abstracts/          # Variables, mixins, functions
├── base/               # Reset, typography, base styles
├── components/         # Component-specific styles
├── layouts/            # Layout styles
├── pages/              # Page-specific styles
├── themes/             # Theme styles
└── main.scss           # Main import file
```

### Using SCSS in Components

```tsx
import styles from './component.module.scss';

export default function Component() {
  return <div className={styles.container}>...</div>;
}
```

### Global SCSS Classes

The platform provides utility classes defined in SCSS:

```tsx
<button className="btn btn--primary btn--lg">Click me</button>
<div className="card">
  <div className="card__header">Title</div>
  <div className="card__body">Content</div>
</div>
```

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Trucks
- `GET /api/trucks` - List trucks
- `POST /api/trucks` - Create truck listing
- `GET /api/trucks/:id` - Get truck details
- `PUT /api/trucks/:id` - Update truck
- `DELETE /api/trucks/:id` - Delete truck

### Contracts
- `POST /api/contracts` - Create contract
- `GET /api/contracts/:id` - Get contract
- `PUT /api/contracts/:id/sign` - Sign contract

### Payments
- `POST /api/payments` - Process payment
- `POST /api/payments/recurring` - Set up recurring payment

## User Roles

### Customer
- Browse and search trucks
- Create rental contracts
- Make payments
- Track rented trucks
- View rental history

### Vendor
- List trucks for rent/lease
- Manage truck inventory
- View maintenance schedules
- Track fleet locations
- Manage contracts and payments

### Admin
- Manage all users
- Oversee all transactions
- Commission tracking
- System analytics
- Platform settings

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

[Your License Here]

## Support

For support, email support@truckleasing.com or open an issue.

## Acknowledgments

- Jeffrey Grabeel (All Service Moving) - Client
- Abdul Wasay - Developer

---

Built with Next.js, TypeScript, and SCSS
