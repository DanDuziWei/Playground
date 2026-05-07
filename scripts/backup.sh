#!/usr/bin/env bash
set -euo pipefail

: "${POSTGRES_URL:?POSTGRES_URL is required}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/quant}"
mkdir -p "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

pg_dump "$POSTGRES_URL" | gzip > "$BACKUP_DIR/quant-${STAMP}.sql.gz"
find "$BACKUP_DIR" -type f -name 'quant-*.sql.gz' -mtime +14 -delete

echo "Backup complete: $BACKUP_DIR/quant-${STAMP}.sql.gz"
