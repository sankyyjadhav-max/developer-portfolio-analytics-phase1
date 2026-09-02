# Local setup

1. Install Node.js 20+ and PostgreSQL. Create database `portfolio_analytics`.
2. `cd backend` and copy `.env.example` to `.env`. Set the real PostgreSQL password and a long JWT secret.
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run seed`
7. `cd ../frontend && npm install`
8. Copy `frontend/.env.example` to `frontend/.env.local`.
9. Start backend with `npm run dev` and frontend with `npm run dev`.

## Troubleshooting
- Prisma P1000: verify `DATABASE_URL`, PostgreSQL service and username/password.
- Port conflict: change backend `PORT` or frontend Next port.
- Public page 404: confirm the portfolio is published and the slug matches exactly.
- CORS errors: ensure `FRONTEND_URL` matches the browser origin.

## Frontend environment
Create `frontend/.env.local` from `frontend/.env.example`:
`NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## Commands
Frontend production check: `npm run build` then `npm start`.
Backend production check: `npm run build` then `npm start`.
