# E-Waste Frontend (SPA)

Vite + React single-page app. Deploys to Vercel as a static site and talks to the
separate backend API.

## Run locally

```bash
npm install            # or pnpm install
cp .env.example .env   # set VITE_API_URL to your backend (local or Render)
npm run dev            # http://localhost:8080  (proxies /api -> VITE_API_URL)
npm run build          # outputs to dist/
```

## How API calls work

The app calls the API with **relative `/api/...` paths** (no code changes needed
when the backend URL changes).

- **Dev:** Vite proxies `/api` → `VITE_API_URL` (see `vite.config.js`).
- **Production (Vercel):** add a rewrite so `/api/*` forwards to your backend.

Create `vercel.json` in this folder:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://YOUR-BACKEND.onrender.com/api/$1" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

Replace `YOUR-BACKEND.onrender.com` with your real Render URL. The first rule
proxies the API (same-origin in the browser → no CORS); the second is the SPA
fallback for client-side routing.

## Deploy to Vercel

1. Push this folder to its own GitHub repo.
2. Vercel → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
4. Add the `VITE_*` environment variables (build-time — set before deploying).
5. Add the `vercel.json` above with your real backend URL, then deploy.
