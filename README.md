# expoinformation

DB Expo 2026 — Virtual Property Expo landing site (React + Vite + MongoDB form storage).

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/257be289-3756-4288-94fe-db54ed669984

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. **Form email (Web3Forms):** follow [WEB3FORMS_SETUP.md](WEB3FORMS_SETUP.md) — get a free key at https://web3forms.com and add it to `.env` as `VITE_WEB3FORMS_ACCESS_KEY`
3. Run the app: `npm run dev`
4. Open http://localhost:3000 and test **Register** / **Become an Exhibitor** forms

## Deploy on Coolify

Use the **Dockerfile** build pack (not Nixpacks). See **[COOLIFY_DEPLOY.md](COOLIFY_DEPLOY.md)** for env vars (`MONGODB_URI`, `VITE_WEB3FORMS_ACCESS_KEY`, port `3000`).
