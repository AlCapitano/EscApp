# EscApp
City Escape Application

## Project goal
Make an application for mobile phone to use in city escape games.

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
(See readme in backend directory)

2. Install Docker desktop and start the local development stack with Docker Compose:

```bash
docker compose up --build
```
Do this for both postgres and backend:
```bash
docker compose up postgres --build
```
```bash
docker compose up backend --build
```
PS. If you prefer to run only the backend without Docker, make sure `DATABASE_URL` points to a running PostgreSQL instance and then:

```bash
cd backend
npm run prisma:generate
npm run start:dev
```

3. Backend commands
From the `backend/` folder! 

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
- Current build focus is backend prototype, frontend prototype and game state flow.
- Docker Compose is configured to expose the backend on port `3000`.
- The `start_escapp.bat` script now gracefully manages Docker services using `docker-compose down -v` for shutdown and `docker-compose up -d` for startup.
- you can query if everything is running by typing 
```bash
curl http://localhost:3000
```

## GIT
Main is only for functional application; make a branch if you want to make changes.

Check if main has done any commits/changes using
 ```bash
 --oneline --graph --decorate main [yourbranchnamehere]
 ```
No commits/changes on main OR other commits have been made that don't need to be preserved?
```bash
git checkout main
git merge --ff-only [yourbranchnamehere]
git push origin main
```
Other commits have been made to main, and they need to be preserved? Rebase main into your branch first:
```bash
git checkout [yourbranchnamehere]
git fetch origin
git rebase origin/main
git checkout main
git merge --ff-only [yourbranchnamehere]
git push origin main
```