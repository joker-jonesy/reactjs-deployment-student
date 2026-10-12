# Tasks App — React + Express + Prisma

A small CRUD app we'll deploy to Netlify in class. Get it running on your computer **before** class.

## What you need
- [Node.js](https://nodejs.org) version 20 or newer (`node -v` to check)
- A free [Neon](https://neon.tech) account (this is the database)
- A free [Netlify](https://netlify.com) account and a GitHub account

## Setup

**1. Make a database.** In Neon, create a project. Open **Connect**, turn on **Connection pooling**, and copy the connection string.

**2. Install and configure.**
```bash
git clone <this repo's url>
cd <the folder>
npm install
cp .env.example .env
```
Open `.env` and replace the placeholder with your Neon connection string. Keep the quotes. Never commit this file (it's already in `.gitignore`).

**3. Create the table and add sample data.**
```bash
npm run db:push
npm run db:seed
```

**4. Run it.**
```bash
npm run dev
```
Open http://localhost:5173.

## What to expect
The page will sit on "Loading…" forever. That's on purpose: the React side doesn't read from the server yet. We'll fix it together in class.

You can check the API itself is working by opening http://localhost:3001/api/tasks in your browser. You should see your sample tasks as JSON.

## How it's organized
```
client/    the React app (react-router, TaskContext)
server/    the Express API (server/app.js has all the routes)
prisma/    the database schema and seed data
```
