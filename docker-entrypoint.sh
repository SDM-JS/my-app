#!/usr/bin/env bash
set -euo pipefail

if [[ "${SKIP_MIGRATIONS:-}" != "1" ]]; then
  echo "Running Prisma migrations (deploy)…"
  pnpm -s deploy
fi

echo "Starting Next.js…"
exec "$@"

