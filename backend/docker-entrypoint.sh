#!/bin/bash
export DB_USER="user"
export DB_PASS="password"
export DB_HOST="postgres"
export DB_PORT="5432"
export DB_NAME="app_db"
export DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
export JWT_ACCESS_TOKEN_SECRET="access-secret"
export JWT_ACCESS_TOKEN_EXPIRATION="60m"
export JWT_REFRESH_TOKEN_SECRET="refresh-secret"
export JWT_REFRESH_TOKEN_EXPIRATION="1d"

npm run prisma:generate && sleep 2 && npm run prisma:db:push && npm run start:dev
