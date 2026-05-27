# Deploy on Coolify (Docker)

The Nixpacks auto-build can fail on small servers (heavy Nix downloads, exit code 255). This repo includes a **Dockerfile** — use that instead.

## 1. Coolify settings

1. Open your application in Coolify.
2. **Build Pack** → choose **Dockerfile** (not Nixpacks).
3. **Port** → `3000` (or leave empty if Coolify detects `EXPOSE 3000`).
4. **Base Directory** → `/` (repo root).

## 2. Environment variables

### Runtime (required for forms)

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `MONGODB_DB` | `db_expo` |

### Build time (required for Web3Forms in the UI)

| Variable | Notes |
|----------|--------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Add as **Build Variable** / build-time env in Coolify so `npm run build` embeds it |

Optional runtime (email still works if only set at build):

| Variable | Notes |
|----------|--------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Can also set at runtime if you rebuild |

## 3. Deploy

1. Push this repo to GitHub (`main`).
2. Redeploy in Coolify.
3. Open your site URL — test **Register** and check MongoDB / email.

## 4. Health check

- `GET /api/health` — should return `{ "ok": true, "mongo": true }` when MongoDB is connected.

### Form returns 503?

That means **MongoDB is not connected** on the server. Common causes:

1. `MONGODB_URI` not set in Coolify **runtime** env vars
2. Still using `mongodb://127.0.0.1:27017` (only works on your PC — use **MongoDB Atlas** in production)
3. Atlas **Network Access** does not allow your server IP (use `0.0.0.0/0` for testing)
4. Wrong username/password in the connection string (URL-encode special characters in passwords)

After redeploy, open `https://YOUR-URL/api/health` — if `"mongo": false`, fix `MONGODB_URI` and redeploy.

**Note:** If Web3Forms is configured at build time, forms can still succeed via email when the database is down (after you deploy the latest code).

## 5. If build still fails

- Increase server RAM (Nixpacks needs ~2GB+; Dockerfile needs much less).
- Confirm **Dockerfile** is selected, not Nixpacks.
- Check Coolify build logs for `npm run build` errors.
