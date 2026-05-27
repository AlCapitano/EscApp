FROM node:24-bullseye-slim AS builder

WORKDIR /usr/src/app

# Install all dependencies (including dev for build)
COPY package*.json ./
RUN npm ci

# Copy app source and build
COPY . .
RUN npm run prisma:generate
RUN npm run build

# Production image
FROM node:24-bullseye-slim

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
