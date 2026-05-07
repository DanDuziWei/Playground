#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production (copy from .env.production.example)."
  exit 1
fi

echo "[1/3] Pulling images..."
docker compose pull

echo "[2/3] Starting services..."
docker compose up -d --remove-orphans

echo "[3/3] Health checks..."
curl -fsS http://localhost/health >/dev/null
curl -fsS http://localhost/api/health >/dev/null || echo "Warning: /api/health unavailable."

echo "Deploy complete."
