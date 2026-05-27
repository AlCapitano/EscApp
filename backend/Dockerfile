FROM node:24-bullseye-slim

WORKDIR /usr/src/app

# Install production dependencies (omit dev to keep image small)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source and build
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
