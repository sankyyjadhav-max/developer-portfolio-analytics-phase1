# Developer Portfolio Analytics — Phase 1

A production-minded developer portfolio builder and user management system. **Phase 1 only**: authentication, portfolio management, project CRUD, templates, theme customization, publishing and responsive public portfolios. Visitor analytics and Phase 2 features are intentionally excluded.

## Stack
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Lucide React
- Backend: Node.js, Express, TypeScript, Prisma
- Database: PostgreSQL
- Auth: JWT in an HttpOnly cookie + bcrypt

## Structure
`frontend/` Next.js application · `backend/` REST API + Prisma · `docs/` setup/schema/API documentation.

## Requirements
Node.js 20+, npm, PostgreSQL 14+.

## Quick start
1. Create a PostgreSQL database named `portfolio_analytics`.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and `JWT_SECRET`.
3. Install dependencies: `npm install` in root, then `npm run install:all`.
4. Run `cd backend && npx prisma generate && npx prisma migrate dev --name init && npx prisma db seed`.
5. Start both apps with root `npm run dev`, or run each package separately.
6. Open `http://localhost:3000`.

## Demo
Email: `demo@example.com`
Password: `Demo@12345`

Demo seed data is for local evaluation only.

## Environment
See `.env.example` and `backend/.env.example` / `frontend/.env.example`.

## API
See `docs/api-documentation.md`. Private endpoints use the JWT cookie; the public portfolio endpoint is unauthenticated.

## Phase 1 scope
Includes registration/login/logout/password reset, protected dashboard, portfolio builder, project CRUD, three templates, curated accents, light/dark mode, publishing and unique public slugs. **No visitor tracking, analytics tables, analytics charts, traffic/device/geographic/session metrics or PDF analytics reports are included.**

## Production notes
Use a managed PostgreSQL instance, a strong secret, HTTPS, a production email provider for password reset delivery, restrictive CORS, secure cookies, image storage/CDN and deployment-specific environment variables.
