# ============================================================
# Satnam Singh Chana — Dockerfile for Railway Deployment
# ============================================================
# Multi-stage build: deps → build → production
# - Local dev uses SQLite (fast, no setup)
# - Railway production uses PostgreSQL (persistent, scalable)
# - The Dockerfile auto-switches Prisma provider at build time
# ============================================================

# ---------- Stage 1: Base ----------
FROM node:22-slim AS base
WORKDIR /app

# Install Bun
RUN npm install -g bun

# Install OpenSSL (needed by Prisma)
RUN apt-get update -qq && apt-get install -y openssl sed && rm -rf /var/lib/apt/lists/*

# ---------- Stage 2: Dependencies ----------
FROM base AS deps

# Copy package files
COPY package.json bun.lock ./
COPY prisma ./prisma/

# Switch Prisma provider from sqlite to postgresql for production
RUN sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Generate Prisma client (with PostgreSQL provider)
RUN bunx prisma generate

# ---------- Stage 3: Build ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Switch Prisma provider from sqlite to postgresql for production
RUN sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

# Copy source code
COPY . .

# Set environment to production for Next.js build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js app (standalone output)
RUN bun run build

# ---------- Stage 4: Production ----------
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install OpenSSL for Prisma + prisma CLI for migrations
RUN apt-get update -qq && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built assets from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy Prisma schema (already switched to postgresql) and migrations
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Install prisma CLI in runner for migrations (pinned to v6 to match package.json)
RUN npm install -g prisma@6

# Change ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start: Run migrations first, then start the server
CMD ["sh", "-c", "prisma migrate deploy && node server.js"]
