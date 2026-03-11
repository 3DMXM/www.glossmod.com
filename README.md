# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## GitHub Actions Auto Deploy (SSR via SSH)

This repository includes a workflow at `.github/workflows/deploy.yml`.
When code is pushed to `main`, GitHub Actions will:

1. Install dependencies and build Nuxt.
2. Package `.output` as deployment artifact.
3. Upload artifact to your server via SSH.
4. Restart the app with `pm2`.

### 1. Configure repository secrets

Add these secrets in GitHub: `Settings -> Secrets and variables -> Actions`.

- `DEPLOY_HOST`: Server IP or domain.
- `DEPLOY_USER`: SSH login user.
- `DEPLOY_SSH_KEY`: Private key content used by GitHub Actions.
- `DEPLOY_PORT`: SSH port (usually `22`).
- `DEPLOY_PATH`: Absolute deploy path on server, for example `/var/www/glossmod-web`.

### 2. Prepare server runtime

Install Node.js 20+ and make sure the deploy user can write to `DEPLOY_PATH`.

Optional but recommended (workflow will auto-install if missing):

```bash
npm install -g pm2
```

### 3. Trigger deployment

Push to `main`, or run the workflow manually from the Actions tab.

After deploy, Nuxt server runs from:

```bash
node .output/server/index.mjs
```

The workflow currently starts it with `PORT=3000`. Put Nginx/Caddy in front for reverse proxy and HTTPS.
