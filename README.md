# FoundaBrain

AI-powered freelance marketplace foundation.

## Setup

1. Copy `.env.example` to `.env` and update with your credentials.
2. Run `npm run setup` to install packages and generate Prisma client.
3. Use `npm run dev` to start the Next.js frontend.
4. Run `node api/index.js` or your custom server to start the Express API.
5. Seed sample data with `npm run seed`.
6. Run tests with `npm test`.

Environment variables include `DATABASE_URL`, `PGVECTOR_URL`, `OPENAI_API_KEY`, `PORT`, `JWT_SECRET`, `SESSION_EXPIRY`, and `CMS_DEFAULT_PAGE_COUNT`.

## API Routes

- `POST /api/register` – create a freelancer account
- `POST /api/login` – obtain JWT token
- `POST /api/tools/submit` – submit a tool (auth required)
- `POST /api/admin/moderate` – approve/reject/flag tools (admin only)
