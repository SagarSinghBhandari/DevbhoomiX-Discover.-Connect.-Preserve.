# UttaraKhand

Frontend-only digital platform for Uttarakhand: knowledge magazine, culture archive, community square and civic issue tracker.

**Discover → Document → Discuss → Verify → Learn → Act**

This app runs entirely on mock data. API modules are shaped for a future Python FastAPI + LangGraph backend.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query, React Hook Form, Zod, Leaflet, Recharts, Framer Motion.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format
```

## Environment

Copy `.env.example` to `.env`.

- `VITE_USE_MOCK_API=true` — use `src/mocks` (default, no backend)
- `VITE_USE_MOCK_API=false` — call FastAPI via `VITE_API_BASE_URL`
- `VITE_API_BASE_URL` — never hardcode backend URLs in components

UI does not change between mock and live modes. Swap happens in `src/api/*`.

## Architecture

- `src/api` — HTTP client + resource modules (`apiClient.get/post/patch/delete`)
- `src/types` — UUID / ISO timestamp / enum types aligned with future Pydantic schemas
- `src/mocks` — realistic Uttarakhand content
- `src/components` — UI only; no fetch calls except through hooks/api
- `src/pages` — route screens
- `src/hooks` — TanStack Query wrappers

## Future FastAPI map

| Frontend | Backend |
| --- | --- |
| `createIssue()` | `POST /api/issues` |
| `createArticle()` / `saveDraft()` / `publishArticle()` | `/api/articles` |
| `sendAgentMessage()` | `POST /api/agent/chat` |
| streaming placeholder | `POST /api/agent/stream` |
| `searchEverything()` | `GET /api/search` |

Ask Uttarakhand is a chat UI only. No model inference ships in this repo.

## Design

Forest green, Himalayan blue, earthy brown, warm off-white, saffron. Editorial serif headlines, Aipan-inspired hairline, mountain photography. Dark mode via `next-themes`.
"# DevbhoomiX-Discover.-Connect.-Preserve." 
