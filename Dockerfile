### Base deps
FROM node:20-alpine AS deps
WORKDIR /app

# Enable pnpm (project has pnpm-lock.yaml)
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

### Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma client generation needs schema
RUN pnpm -s generate
RUN pnpm -s build

### Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

# Only bring what we need to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Install production deps (includes prisma client runtime)
# We keep devDependencies because Prisma CLI is needed at runtime
# to run `prisma migrate deploy` in the entrypoint.
RUN pnpm install --frozen-lockfile

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["pnpm", "start"]