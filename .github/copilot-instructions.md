## Quick orientation for AI coding agents

This repository contains a React + Vite frontend and a Node/Express + TypeORM backend. The goal of these notes is to give an AI agent the minimal, actionable context to be productive immediately.

- Backend entrypoint: `backend/index.ts` — initializes TypeORM datasource, starts the scheduler and the Express server.
- DB config: `backend/config/environment.ts` (env keys) and `backend/config/datasource.ts` (TypeORM config). Note: `synchronize: true` — schema auto-syncs in dev.
- Business logic: `backend/domainEngine/*` (organizers, league logic, scheduler). Example: `domainEngine/organizer/organizeNewSeason.ts` wires repository calls and `generateFixtures`.
- Domain models: `backend/domainObjects/*` — plain TS classes used across domainEngine and fixtures.
- Persistence layer: `backend/entities/*.entity.ts` map domain objects to TypeORM entities; `backend/repositories/repositories.ts` exports shared repository instances used by domainEngine.
- Routes: `backend/routes/*.ts` expose REST endpoints and delegate to domainEngine/repositories.

Project scripts and quick commands

- Backend: from repo root
  - Install & run tests: `cd backend && npm install && npm run test` (Jest + ts-jest; see `backend/jest.config.js`).
  - Start dev server: `cd backend && npm install && npm run start-dev` (uses nodemon to run `index.ts`).
- Frontend: `cd frontend && npm install && npm run dev` (Vite). Build: `npm run build`.

Environment & runtime notes

- Environment variables used (see `backend/config/environment.ts`): `PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `TOKEN_SECRET`, `CLOCK_INTERVAL`.
- Database: Postgres via `pg` and `typeorm` (connection configured in `backend/config/datasource.ts`). During development the DB schema is auto-synchronized.

Codebase conventions & patterns to follow

- Business logic lives in `domainEngine` as free functions and small modules (not classes). Prefer editing/adding modules under `domainEngine` and `domainObjects` for behavior changes.
- Persistence uses TypeORM entities in `entities/*.entity.ts`. Domain objects and entities are separate; when adding fields, update both the domain object and the entity mapping.
- Repositories are singletons exported from `repositories/repositories.ts` and injected by importing — modify that file if you need custom repository wiring.
- Scheduling/time-related behavior is centralized under `domainEngine/time` (see `scheduler.ts` and `timekeeper.ts`). The scheduler is started at backend startup in `index.ts`.
- Tests: backend uses Jest + ts-jest; put unit tests under the same folder alongside implementation (project already has tests under `domainEngine/league/tests` and `utils/tests`). Keep tests fast and sandboxed (no automatic DB dependency).

Examples and useful entry points to inspect when making changes

- Implement game/fixture logic: `backend/domainEngine/league/fixtureGenerator.ts` (uses `utils/randomizer` and `utils/generalHelperFunctions`).
- Create/organize seasons: `backend/domainEngine/organizer/organizeNewSeason.ts` — shows how the repo and domain objects are used together.
- API surface: `backend/routes/*.ts` (e.g. `playerRoutes.ts`, `clubRoutes.ts`) — follow existing route patterns when adding new endpoints.
- Authentication: `backend/utils/authenticationUtils.ts` and `validators/*` for request validation.

Safety and developer hints for automated edits

- Changing entities can change DB schema immediately because `synchronize: true`. For non-trivial migrations, prefer creating explicit migrations or coordinate with a human.
- When adding public API endpoints, update route files and add a corresponding service in the frontend under `frontend/src/services` if necessary.
- Keep domain logic in `domainEngine` not inside route handlers — routes should be thin.

If anything here is unclear or you want the instructions to emphasize additional patterns (tests, CI, preferred code style), tell me which parts to expand and I will iterate.
