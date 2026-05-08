# Todo Next.js + Postgres

Application Next.js minimale avec une todo list stockée dans Postgres.

## Démarrage

```bash
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

La table `todos` est créée automatiquement au premier chargement de la page.
