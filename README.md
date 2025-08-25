# BetterLogs/App
> [!WARNING]
> This project is in a very early stage of development.

> [!IMPORTANT]
> Not production-ready. Expect breaking changes, incomplete features, and rough edges.

This repository contains the **BetterLogs monorepo**, which is the foundation of the project.
It includes both the backend API and the frontend web dashboard, built with a modern TypeScript stack.

BetterLogs aims to provide a better way to handle application logs, **open source, self-hostable, and extensible**.
Right now, this is only the **beginning of the journey**.

## Why Open Source from Day 1

BetterLogs is **open source even in its early stage** because:

* We want to **invite early feedback** and ideas from developers.
* Contributions can help shape the project as it grows.
* Transparency ensures the project stays **developer-first and community-driven**.
* Early visibility helps build trust and credibility before launching a hosted version.

Even if the project is rough, sharing it now accelerates learning, improvement, and adoption.

> BetterLogs is currently in the planning phase. Contributions, ideas, and feedback are highly welcome! https://github.com/BetterLogs/.github/discussions/categories/ideas

> Our vision: https://github.com/BetterLogs/.github/blob/main/profile/README.md

---

## Tech Stack

This project was bootstrapped with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), combining the following technologies:

* **TypeScript** – End-to-end type safety
* **Next.js** – Full-stack React framework (frontend)
* **TailwindCSS** – Utility-first CSS framework
* **shadcn/ui** – Reusable, accessible UI components
* **Hono** – Lightweight, fast server framework (backend)
* **tRPC** – End-to-end type-safe APIs
* **Bun** – Runtime environment
* **Drizzle ORM** – TypeScript-first database ORM
* **PostgreSQL** – Database engine
* **Better Auth** – Authentication (email & password)
* **Turborepo** – Monorepo build system

---

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Setup database

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database running.
2. Update your environment variables in `apps/server/.env`.
3. Push the schema to the database:

   ```bash
   bun db:push
   ```

(Optional) To open the Drizzle Studio UI:

```bash
bun db:studio
```

### 3. Run the dev servers

```bash
bun dev
```

* Web app: [http://localhost:3001](http://localhost:3001)
* API server: [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
betterlogs/
├── apps/
│   ├── web/       # Frontend (Next.js)
│   └── server/    # Backend API (Hono + tRPC)
```

---

## Available Scripts

* `bun dev` – Start all apps in dev mode
* `bun build` – Build all apps
* `bun dev:web` – Start only the web app
* `bun dev:server` – Start only the API server
* `bun check-types` – Check TypeScript types
* `bun db:push` – Push schema changes to database
* `bun db:studio` – Open database studio UI

---

## Roadmap

* ✅ Setup monorepo with Next.js + Hono
* ✅ Add PostgreSQL + Drizzle ORM
* 🚧 Basic auth (Better Auth)
* 🚧 Logging API (MVP)
* 🚧 Web dashboard for exploring logs
* 🚧 SDKs for multiple languages

---
> [!IMPORTANT]
> Not production-ready. Expect breaking changes, incomplete features, and rough edges.
---
 
## Contributing

Contributions are **highly welcome**! 🎉

If you want to contribute, please make sure your work **aligns with the project’s vision**, which you can find here: [BetterLogs Vision](https://github.com/BetterLogs/.github/blob/main/profile/README.md).

We appreciate ideas, bug reports, pull requests, and any help to make BetterLogs better — but please keep contributions **focused on the goals and philosophy of the project**.

