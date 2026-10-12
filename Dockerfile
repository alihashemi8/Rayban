# Multi-stage Dockerfile for Rayban Studio

# 1. Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2. Production runner stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV RAYBAN_HOST=0.0.0.0
ENV RAYBAN_PORT=4188

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.ssr-build ./.ssr-build
COPY --from=builder /app/server ./server
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/public ./public

RUN mkdir -p /app/.data && chown -R node:node /app

USER node

EXPOSE 4188

VOLUME ["/app/.data"]

CMD ["node", "server/index.mjs"]
