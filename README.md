# Attira — AI Stylist Prototype (Engineering Intern Task)

Recreation of the supplied Figma prototype in **React Native CLI + TypeScript**,
with the **Outfit Detail** screen's "TRY ON" action wired end-to-end to a small
**Express + TypeScript** backend that calls **Google Gemini** for a one-sentence
styling note and returns the supplied mock result image.

| Part | Stack | Location |
| --- | --- | --- |
| Mobile app | React Native 0.87 CLI · TypeScript · React Navigation 7 (native-stack + bottom-tabs) · Redux Toolkit + RTK Query · redux-persist | [`mobile/`](mobile/) |
| Backend | Node · Express 4 · TypeScript · `@google/generative-ai` | [`backend/`](backend/) |

> The task asks for **one** screen wired end-to-end. That core — Outfit Detail →
> `POST /api/try-on` → Gemini → phased UI — is fully built and is the thing to
> review. The rest of the prototype flow is recreated around it (see below).

---

## The wired feature — Outfit Detail "TRY ON"

`OutfitDetailScreen` has a hero image, an **AIRA** note box, an items list, and
the primary **TRY ON** CTA. That CTA is the task's "Generate Try-On" action:

| Phase | UI |
| --- | --- |
| **initial** | hero = outfit image, note box = static "AIRA REASONING", button `TRY ON` |
| **loading** | button spinner + "GENERATING…", note box "AIRA is writing your styling note…" |
| **success** | hero swaps to the backend result image, note box fills with the Gemini note, button `TRY ON AGAIN`. Result is persisted (redux-persist / AsyncStorage) and restored on relaunch. |
| **error** | inline "TRY-ON FAILED" in the stage with a **Retry** action; message derived from the backend's JSON error (network / timeout / missing key / upstream) |

Screenshots: [`screenshots/`](screenshots/) — `07`–`09` are this flow on the iOS
simulator against a live Gemini response.

---

## Backend

### `POST /api/try-on`

```jsonc
// request
{ "outfitName": "Monochrome Power — oversized blazer, tailored trousers, white shirt" }

// 200
{
  "status": "completed",
  "resultImageUrl": "http://localhost:4000/static/mock-result.jpg?v=1788344468251",
  "styleNote": "This sharp monochrome ensemble balances tailored precision with oversized ease…"
}
```

Failure — always non-2xx + JSON:

| Status | `code` | When |
| --- | --- | --- |
| `400` | `INVALID_REQUEST` | `outfitName` missing / not a non-empty string |
| `500` | `MISSING_API_KEY` | `GEMINI_API_KEY` not set on the server |
| `502` | `UPSTREAM_ERROR` | Gemini call failed or returned nothing |
| `500` | `INTERNAL_ERROR` | anything else |

- `GEMINI_API_KEY` is read server-side only (`backend/.env`) and never sent to the client.
- The result image is a bundled static asset from `backend/public/` — no image
  generation, per the task's mock-result note. A `?v=<timestamp>` cache-buster is
  appended so a repeated try-on always re-renders in the app.
- Model is configurable via `GEMINI_MODEL` (default `gemini-3.6-flash` —
  `gemini-2.0-flash` / `gemini-2.5-flash` are retired for new API keys).
- `GET /health` → `{ "status": "ok", "geminiConfigured": true|false }`

### Run

```bash
cd backend
npm install
cp .env.example .env        # then paste your real GEMINI_API_KEY
npm run dev                  # http://localhost:4000
```

---

## Mobile app

### Run (iOS)

```bash
cd mobile
npm install
bundle install && bundle exec pod install --project-directory=ios
npm start                    # Metro, separate terminal
npm run ios                  # builds & launches the iOS simulator
```

Android: `npm run android` (emulator reaches the host on `10.0.2.2`, handled in
`src/shared/config/index.ts`).

### Backend URL

`mobile/src/shared/config/index.ts` picks `http://localhost:4000` (iOS sim) or
`http://10.0.2.2:4000` (Android emulator). For a physical device set
`API_BASE_URL_OVERRIDE` there to your machine's LAN IP and set `PUBLIC_BASE_URL`
in `backend/.env` to the same host.

### Tests

```bash
cd mobile   && npm test          # slice, API-error-mapping, app render
cd backend  && npm run typecheck
```

---

## Navigation & screens

`@react-navigation` native-stack + bottom-tabs (no hand-rolled navigation, no
custom tab bar — the bottom bar is the library's, with icons exported from the
Figma "Bottom nav" component).

```
RootStack (native-stack, headerless)
├── Splash  ──►  Welcome (3-slide pager)  ──►  Create Account / Log in
├── Style Quiz (6 steps)  ──►  Reveal ("AIRA has styled you")
└── Main  =  BottomTabs
        ├── Discover     card stack → OutfitDetail
        ├── Wardrobe     item grid, readiness meter
        ├── AIRA         dark home, quick actions → StyleMe / OutfitDetail
        ├── Saved        loved looks + boards
        └── Profile      style DNA + settings list
```

`OutfitDetail` is pushed inside the Discover / AIRA stacks so it keeps the tab
bar and gets a native header (back + `SAVE`), matching the Figma frame.

## Project layout (mobile)

Feature-first: `src/features/<feature>/{api,hooks,model,components,screens,data}`,
`src/shared` for theme / config / reusable UI, `src/app` for the store and the
navigation tree.

```
mobile/src/
  app/
    navigation/         RootNavigator, MainTabs, param-list types, header options
    providers/ store    Redux store, typed hooks, providers
  shared/               theme tokens, runtime config, ShadowButton / ChipRow / TextField / Spark / Tag
  features/
    onboarding/         Splash, Welcome, StyleQuiz, Reveal (+ quiz data)
    auth/               Signup, Login (+ SocialButtons)
    discover/           DiscoverScreen
    wardrobe/           WardrobeScreen (+ item data)
    aira/               AiraScreen, StyleMeScreen
    saved/ profile/     SavedScreen, ProfileScreen
    outfit/             static outfit content + item / related-look rows
    tryOn/
      api/               RTK Query endpoint + error → TryOnFailure mapping
      hooks/             useGenerateTryOn — owns the phase machine
      model/             slice (persisted last result), selectors, types
      components/        TryOnStage, StylingNote
      screens/           OutfitDetailScreen
```

---

## Notes / trade-offs

- **Scope:** the brief is one screen wired end-to-end; the rest of the flow was
  added afterwards for context and is faithful-but-static (auth submits nothing,
  Discover/Wardrobe/Saved are presentational). The reviewable substance is the
  Try-On path.
- **Mock result image** is bundled, matching the "return the supplied mock
  result" instruction — the async path (Gemini call, phased UI, error handling,
  persistence) is the focus.
- **Redux Toolkit + RTK Query** is heavier than one endpoint needs, but gives
  request lifecycle state, caching and a clean error boundary for free.
- **Fonts:** the Figma's condensed display face isn't bundled — system font with
  weight/spacing stands in.
- **`react-native-gesture-handler`** was dropped: it doesn't compile against RN
  0.87, and native-stack + bottom-tabs don't require it.
- Figma assets exported via the Figma REST API, committed under
  `mobile/src/assets/` and `_figma/`.
- **No secrets committed** — `.env.example` files hold placeholders only; real
  `.env` is gitignored (verified: the key is in zero tracked files / commits).
