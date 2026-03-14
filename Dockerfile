FROM node:24

WORKDIR /app

COPY . .

EXPOSE 3000

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install

# Default to running the development server
CMD ["pnpm", "dev"]