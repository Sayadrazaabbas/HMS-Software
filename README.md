# 🏥 BN Hospital Management System

A complete Hospital Management System built with Next.js 14, Express, and PostgreSQL.

## 📁 Project Structure

```
HMS_App/
├── backend/           # Express API Server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/          # Helpers (JWT, response)
│   │   └── index.ts        # Entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Sample data
│   └── package.json
│
└── frontend/          # Next.js 14 App
    ├── src/
    │   ├── app/
    │   │   ├── login/          # Login page
    │   │   └── (dashboard)/    # Protected pages
    │   │       ├── dashboard/
    │   │       └── patients/
    │   ├── components/
    │   │   ├── layout/         # Sidebar, Header
    │   │   └── dashboard/      # Stats cards
    │   └── lib/                # API client, auth
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+ (with database: `bn_hospital_dev`)
- npm

### 1. Setup Database

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE bn_hospital_dev;
\q
```

### 2. Start Backend

```bash
cd backend

# Update DATABASE_URL in .env (if needed)
# Default: postgresql://postgres:postgres123@localhost:5432/bn_hospital_dev

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Seed sample data
npm run db:seed

# Start server
npm run dev
```

Backend runs at: http://localhost:3001

### 3. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: http://localhost:3000

### 4. Login

Open http://localhost:3000 and use:
- **Email:** admin@bnhospital.com
- **Password:** Admin@123

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/login | Login |
| GET | /api/v1/auth/me | Get current user |
| GET | /api/v1/dashboard/stats | Dashboard statistics |
| GET | /api/v1/dashboard/recent-patients | Recent patients |
| GET | /api/v1/patients | List patients |
| GET | /api/v1/patients/:id | Get patient |
| POST | /api/v1/patients | Create patient |
| PUT | /api/v1/patients/:id | Update patient |
| DELETE | /api/v1/patients/:id | Delete patient |

---

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bnhospital.com | Admin@123 |
| Doctor | doctor@bnhospital.com | Admin@123 |
| Receptionist | reception@bnhospital.com | Admin@123 |

---

## 🎨 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Lucide Icons

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## 📋 Implemented Features

- ✅ User Authentication (JWT)
- ✅ Role-based Access Control
- ✅ Dashboard with Statistics
- ✅ Patient Management (CRUD)
- ✅ Responsive UI
- 🔄 Appointments (coming soon)
- 🔄 Billing (coming soon)
- 🔄 Pharmacy (coming soon)

---

## 🔧 Commands Reference

```bash
# Backend
cd backend
npm run dev          # Start dev server
npm run db:push      # Push schema to DB
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio

# Frontend
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
```

---

Built with ❤️ for BN Hospital
