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

## Déploiement Coolify

Si Nixpacks ne détecte pas l'application, utiliser le `Dockerfile` fourni :

- Build Pack : `Dockerfile`
- Port exposé : `3000`
- Variable d'environnement runtime : `DATABASE_URL`
- Start command : laisser vide, le `Dockerfile` lance `npm run start`
