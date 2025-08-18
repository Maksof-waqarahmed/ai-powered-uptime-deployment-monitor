# 🚀 Website Uptime Monitoring + Slack Alerts

This is a **Next.js 14 + tRPC + Prisma + PostgreSQL** based project that allows users to monitor their websites. Each user can connect their own Slack, and if their website goes down, a notification is sent to their Slack workspace.

---

## ✨ Features

* 🔐 Authentication with NextAuth.js
* 🌐 Users can add multiple websites for monitoring
* ⏰ Cron job based monitoring (custom intervals e.g. every 5 min)
* 🛠️ Logs of all checks stored in database
* 📩 Slack integration per-user (via OAuth2)
* 📊 Dashboard to view all URLs, logs, and status
* 🤖 AI integration to help diagnose issues

---

## 📂 Project Structure

```
├── prisma/              # Prisma schema & db config
├── src/
│   ├── app/             # Next.js app directory (routes, pages, APIs)
│   │   ├── api/         # API routes (auth, slack, trpc)
│   │   ├── dashboard/   # User dashboard (monitoring, logs, chatbot)
│   │   └── settings/    # User settings
│   ├── components/      # Reusable UI components
│   ├── lib/             # API routers, utils, trpc client/server
│   ├── schemas/         # Zod schemas for validation
│   ├── scripts/         # Cron jobs & utility scripts
│   └── trpc-server/     # TRPC setup
```

---

## ⚙️ Tech Stack

* [Next.js 14](https://nextjs.org/) – App Router
* [tRPC](https://trpc.io/) – Type-safe APIs
* [Prisma](https://www.prisma.io/) – ORM
* [PostgreSQL](https://www.postgresql.org/) – Database
* [NextAuth.js](https://next-auth.js.org/) – Authentication
* [Slack API](https://api.slack.com/) – Per-user Slack integration
* [Node-cron](https://www.npmjs.com/package/node-cron) – Scheduling monitor checks
* OpenAI API

---

## 🛠️ Setup Instructions

### 1. Clone repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment

Create a `.env` file:

```env
AUTH_SECRET=
DATABASE_URL

NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

SLACK_APP_ID=
SIGN_SECRET=
VERIFICATION_TOKEN=

SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
BOT_OAUTH_TOKEN=
SLACK_REDIRECT_URI=

OPENAI_API_KEY=
URL_CHATGPT=
```

### 4. Setup database

```bash
pnpm push   # runs prisma generate + db push
```

### 5. Run dev server

```bash
pnpm dev
```

---

## ⏰ Cron Jobs

* Located in `src/scripts/cron.ts`
* Responsible for checking websites at their `nextCheckAt` interval
* Saves results to DB (`MonitorLog` table)
* Triggers Slack notification if the website is down

---

## 🔗 Slack Integration Flow

1. User clicks **Connect Slack** in the dashboard
2. Redirected to the Slack OAuth consent page
3. Slack returns an `access_token` → stored in DB (`SlackInstallation`)
4. During cron checks, the app uses that token to send messages to the user’s Slack

---

## 📊 Dashboard Pages

* `/dashboard` – Overview
* `/dashboard/monitoring/add-urls` – Add a new website to monitor
* `/dashboard/monitoring/allURLs` – List of monitored URLs
* `/dashboard/monitoring/logs` – Monitoring logs
* `/dashboard/chatbot` – AI helper
* `/settings` – Manage account & Slack connection

---

✍️ Made with ❤️ using **Next.js, tRPC & Slack API**