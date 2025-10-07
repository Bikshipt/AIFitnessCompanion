## AI Fitness Companion

An AI-powered fitness web app that acts as your personal trainer and nutritionist. It combines workout planning, diet planning, progress tracking, challenges, and an AI coach into a single experience.

### What it does
- **AI workout plans**: Generate personalized routines by fitness level, goal, equipment, duration, and frequency.
- **AI diet plans**: Create tailored weekly meal plans based on calorie targets, diet types, restrictions, and goals.
- **Form analysis**: Get technique feedback for a given exercise from a natural-language description.
- **Fitness insights**: Summarize progress and provide optimization tips from your workout/diet history and goals.
- **Tracking**: CRUD for workouts, exercises, meals, and progress records.
- **Challenges & community**: Browse/join challenges and view basic community elements on the dashboard.
- **Clean dashboard UI**: Stats, charts, goals, today's plan, AI chat, and challenges.
- **RPG System**: Create characters, complete quests, gain XP, level up, and join guilds in a fitness gamification experience.

### Tech stack
- **Client**: React 18, Vite 5, Wouter (routing), TanStack Query, Tailwind CSS + shadcn-inspired UI components.
- **Server**: Express (TypeScript), single server handling API and client in production.
- **AI**: Google Generative AI (Gemini) via `@google/generative-ai`.
- **Storage**: In-memory implementation in `server/storage.ts` using shared Zod schemas from `shared/schema.ts`.

### Project structure
- `client/` React app (root mounted from `client/index.html` → `client/src/main.tsx`).
- `server/` Express server, routes, Vite dev integration, and AI handlers.
- `shared/` Zod schemas for types shared across server boundaries.
- `vite.config.ts` Vite config with client root and output to `dist/public` for production serving.

### Getting started
Prerequisite: Node.js 20+

1) Install dependencies
```bash
npm install
```

2) Set environment variables
```bash
set GEMINI_API_KEY=your_key_here   # Windows PowerShell/CMD
# or
export GEMINI_API_KEY=your_key_here # macOS/Linux
```

3) Run in development
```bash
npm run dev
```
- Starts Express on `localhost:8081`.
- In development, the server mounts Vite middlewares for HMR.

4) Build and run production
```bash
npm run build
npm start
```
- Builds the client to `dist/public` and bundles the server to `dist/index.js`.
- Serves both API and static client from the same Express server on `localhost:8081`.

### Environment variables
- **`GEMINI_API_KEY`**: Required for AI endpoints under `/api/ai/*`. Without it, those routes will fail. The UI still renders and the dashboard’s chat uses a local simulated response.

### NPM scripts
```bash
npm run dev     # Start dev server (Express + Vite middleware)
npm run build   # Build client and bundle server into dist/
npm start       # Start production server (serves API and client)
npm run check   # TypeScript type check
npm run db:push # Drizzle schema push (if/when wired to a DB)
```

### API overview
Base URL: `http://localhost:8081`

- **Auth**
  - `POST /api/auth/register` – Create a user (validates input with Zod). Returns user sans password.
  - `POST /api/auth/login` – Demo login (plain-text password comparison, not for production).
  - `GET  /api/auth/user/:id` – Get a user by id (sans password).

- **Workouts**
  - `GET    /api/workouts?userId=...`
  - `GET    /api/workouts/:id`
  - `POST   /api/workouts`
  - `PUT    /api/workouts/:id`
  - `DELETE /api/workouts/:id`

- **Exercises**
  - `GET  /api/exercises` (filters: `type`, `muscleGroup`)
  - `GET  /api/exercises/:id`
  - `POST /api/exercises`

- **Workout exercises**
  - `GET    /api/workouts/:id/exercises`
  - `POST   /api/workouts/:id/exercises`
  - `DELETE /api/workouts/:workoutId/exercises/:exerciseId`

- **Meals**
  - `GET    /api/meals?userId=...`
  - `POST   /api/meals`
  - `PUT    /api/meals/:id`
  - `DELETE /api/meals/:id`

- **Progress**
  - `GET  /api/progress/:userId`
  - `POST /api/progress`

- **Challenges**
  - `GET    /api/challenges`
  - `GET    /api/challenges/:id`
  - `POST   /api/challenges`
  - `POST   /api/challenges/:id/join`
  - `DELETE /api/challenges/:id/leave?userId=...`
  - `GET    /api/users/:id/challenges`

- **AI** (requires `GEMINI_API_KEY`)
  - `POST /api/ai/workout-plan`
    - Body: `fitnessLevel`, `goal`, `equipment?`, `duration`, `frequency`, `preferences?`, `restrictions?`
  - `POST /api/ai/diet-plan`
    - Body: `calorieGoal`, `dietType`, `restrictions?`, `goal`, `mealsPerDay?`
  - `POST /api/ai/form-analysis`
    - Body: `exercise`, `formDescription`
  - `POST /api/ai/fitness-insights`
    - Body: `workoutHistory`, `dietHistory?`, `progressMetrics?`, `goal`
  - `POST /api/ai/fitness-question`
    - Body: `question`

- **RPG System**
  - `GET    /api/rpg/quests` – List all available quests
  - `POST   /api/rpg/quests` – Create new quest (admin)
  - `POST   /api/rpg/characters` – Create character
  - `GET    /api/rpg/characters/:id` – Get character details
  - `GET    /api/rpg/users/:userId/characters` – Get user's characters
  - `POST   /api/rpg/characters/:id/xp` – Add XP to character

### Client routes
- `/` – Dashboard with stats, charts, goals, today's workout/diet, AI chat, challenges.
- `/workouts` – Workout generator and related UI.
- `/diet` – Diet planner UI.
- `/community` – Community/challenges UI.
- `/support` – Support page stub.
- `/settings` – Settings page stub.
- `/character` – RPG character creation and management.
- `/quests` – Quest board with available challenges.
- `/progress-rpg` – Character progression and XP tracking.
- `/guilds` – Guild system for group challenges.

### Notes & limitations
- The demo uses in-memory storage (`server/storage.ts`); data resets on server restart.
- Auth is a simplified demo; passwords are stored and compared as plain text. Do not use as-is in production.
- The AI chat in the dashboard simulates responses unless you wire the UI to call the AI API routes.

### License
MIT


"# AIFitnessCompanion" 
