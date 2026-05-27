# Production image for Coolify / Docker (avoids heavy Nixpacks builds)
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* into the client bundle at build time — set in Coolify "Build Variables"
ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY

RUN npm run build

# --- Runtime ---
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY --from=build /app/dist ./dist

EXPOSE 3000

# API + static site (forms use /api/* and Web3Forms)
CMD ["npm", "start"]
