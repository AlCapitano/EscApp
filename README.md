# EscApp
City Escape Application

## Overview
EscApp is a city escape game prototype built with a NestJS backend, Prisma ORM, and a Docker-based local development stack. The app includes user authentication, admin APIs, route and checkpoint management, and game session state tracking.

## Architecture
- `backend/` — NestJS application with Prisma and JWT auth
- `docker-compose.yml` — local PostgreSQL + backend development service
- `backend/prisma/` — Prisma schema and client configuration
- `backend/src/` — backend source code for auth, admin, game sessions, and API controllers

## Prerequisites
- Node.js 24+ and npm
- Docker (optional, recommended for local PostgreSQL)

## Quick start
1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Create environment variables:

```bash
cd backend
copy .env.example .env
```

3. Start the local development stack with Docker Compose:

```bash
docker compose up --build
```

4. If you prefer to run only the backend without Docker, make sure `DATABASE_URL` points to a running PostgreSQL instance and then:

```bash
cd backend
npm run prisma:generate
npm run start:dev
```

## Backend commands
From the `backend/` folder:

- `npm run start:dev` — start NestJS in watch mode
- `npm run build` — compile the backend
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:db:push` — sync Prisma schema to database
- `npm run prisma:migrate` — run migrations
- `npm run test` — execute unit tests

## Environment variables
The backend loads config from `.env`. Example values are in `backend/.env.example`.

Main variables:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRATION`
- `JWT_REFRESH_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_EXPIRATION`

## API routes
The backend exposes routes such as:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /admin/users`
- `GET /admin/users/:id`
- `PATCH /admin/users/:id/role`
- `DELETE /admin/users/:id`
- `POST /game-sessions`
- `GET /game-sessions`

## Notes
- The application is currently focused on the backend prototype and game state flow.
- Docker Compose is configured to expose the backend on port `3000`.
- Use `backend/.env.example` as the starting point for local configuration.

## Project goals
- NestJS backend with strict TypeScript
- Prisma data modeling for game entities
- Auth/role-based user and admin API separation
- Game session state management
- Static UI support and future real-time enhancements

