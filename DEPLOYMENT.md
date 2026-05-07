# Quant Platform Deployment (Path A: Fast MVP)

This guide deploys a quant trading content platform with:
- `web` (Next.js)
- `api` (FastAPI/Node API)
- `worker` (news crawler + feed jobs)
- `redis`
- `nginx`

## 1) Prerequisites
- Docker + Docker Compose plugin
- Domain DNS already pointed to server IP
- `.env.production` created from `.env.production.example`

## 2) Environment variables
Copy and edit:

```bash
cp .env.production.example .env.production
```

Required secrets:
- `POSTGRES_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `NEWS_API_KEYS`

## 3) Deploy

```bash
./scripts/deploy.sh
```

This will:
1. Pull latest images
2. Start/recreate services
3. Run health checks

## 4) Verify

```bash
curl -f http://localhost/health
curl -f http://localhost/api/health
```

## 5) Operations
- Logs: `docker compose logs -f`
- Restart: `docker compose restart`
- Rollback: pin previous image tags in `docker-compose.yml` and rerun deploy script.

## 6) Backups
Run daily backup with cron:

```bash
0 3 * * * /workspace/Playground/scripts/backup.sh
```

## 7) CI/CD (GitHub Actions)
Workflow file `.github/workflows/deploy.yml` supports manual deploy and push-to-main deploy.
