# Censono Tech Developers

This code was developed by [Matur Innocent J.](https://my-portfolio-nu-three-79.vercel.app/) 

# AgriBusiness Cluster

A mobile-first Ionic React application that connects horticulture cluster members, sellers, buyers and administrators. AgriBusiness Cluster provides a cluster directory, marketplace, knowledge hub, communication and chat features, plus an admin area for management.

## Quick links
- Repository: https://github.com/Bwesun/HortiConnect
- Main app entry: `src/App.tsx`
- App bootstrap: `src/main.tsx`
- Theme variables: `src/theme/variables.css`
- Assets: `src/assets/hortiLogo.png`
- Contexts: `src/contexts` (contains `AuthContext` — used as `useAuth`)
- Pages: `src/pages` (see PAGES.md for per-page documentation)
- Services: `src/services` (see docs/services.md for service contracts and templates)
- **App Walkthrough Guide**: `APP_WALKTHROUGH_GUIDE.md` (comprehensive guide for creating user onboarding walkthroughs)

---

## Project summary

- Tech stack (observed / inferred)
  - Ionic React (UI + mobile-ready components)
  - React + TypeScript
  - React Router (v5-style Route API used in `App.tsx`)
  - Vite (dev server & build)
  - Capacitor (StatusBar and other native integrations)
  - lucide-react (icons)
  - Testing: Vitest and Cypress referenced in package.json scripts (inferred)
  - Linting: ESLint
  - Styling: Ionic core CSS + `src/theme/variables.css` and `src/main.css`
  - State: `AuthContext` (uses `useAuth()` in `App.tsx`)

- Application type: Hybrid mobile/web app (Ionic + Capacitor + Vite)

---

## What I inspected
- `package.json` — scripts and dependencies
- `src/App.tsx` — full routing, tab navigation, PrivateRoute, status bar init
- File & folder structure evidence shown in the repository listing

Where full file contents were not available I made explicit, reasonable inferences. See docs/ files for more detail.

---

## Key features & pages (short)
- Authentication: `/login`, `/register`
- Public: `/home`, `/knowledgehub`
- Marketplace: `/marketplace` and `/contactseller/:id`
- Clusters (directory & detail): `/clusters`, `/viewcluster/:id`
- Profiles: `/profile`, `/viewprofile/:id`
- Messaging & Communication: `/communication`, `/chat/:id`
- Admin area: `/admin/dashboard`, `/admin/users`, `/admin/clusters`, `/admin/knowledge`, `/admin/groups`, `/admin/knowledge/create`, `/admin/knowledge/edit/:id`

---

## Installation & Local Development

Prerequisites
- Node.js (LTS recommended, e.g., >= 18)
- npm (or yarn/pnpm)
- For native builds: Capacitor CLI, Android Studio or Xcode

Steps (web / dev)
1. Clone
   - git clone https://github.com/Bwesun/HortiConnect.git
   - cd HortiConnect
2. Install dependencies
   - npm install
3. Development server
   - npm run dev
   - Visit the Vite dev server (default, e.g. http://localhost:5173)
4. Ionic serve (if configured)
   - npm run ionic:serve

Build (production)
- npm run build
- Preview:
  - npm run preview

Mobile build (Capacitor)
1. npm run build
2. npx cap add android # or ios
3. npx cap copy
4. npx cap open android # or ios

---

## Environment variables (recommended)
Create `.env` or `.env.local` with keys similar to the examples below (these are inferred — replace values and names if your app uses different env variable names):

- VITE_API_URL=https://api.example.com

---

## Scripts (observed in package.json)

- npm run dev — start Vite dev server
- npm run build — build production assets
- npm run preview — preview production build
- npm run ionic:serve — Ionic dev serve (if configured)
- npm run ionic:build — build script wrapped for Ionic
- npm run test.unit — run unit tests (Vitest inferred)
- npm run test.e2e — run end-to-end tests (Cypress inferred)
- npm run lint — run ESLint

---

## Routing & navigation (summary from `src/App.tsx`)

Public routes:
- /login -> LoginPage
- /register -> RegisterPage
- /home -> Home
- /knowledgehub -> KnowledgeHub

Private routes (authentication required):
- /clusters -> ClusterDirectory
- /viewcluster/:id -> ViewCluster
- /profile -> Profile
- /marketplace -> MarketPlace
- /contactseller/:id -> ContactSeller
- /viewprofile/:id -> ViewProfile
- /communication -> Communication
- /chat/:id -> Chat

Admin routes (private & role-based):
- /admin/dashboard -> Dashboard
- /admin/users -> ManageUsers
- /admin/clusters -> ManageClusters
- /admin/knowledge -> KnowledgeHub (admin view)
- /admin/knowledge/create -> KnowledgeEditor
- /admin/knowledge/edit/:id -> KnowledgeEditor
- /admin/groups -> ManageGroups

Tab bar:
- Bottom tab bar with Home, Marketplace, Clusters, Profile
- Hidden on /login and /register
- Home button points to /admin/dashboard if logged-in user has `role === 'admin'`

---

## Authentication & guards
- `AuthContext` exposes:
  - `isLoading` — used to show initial loading screen
  - `isAuthenticated` — used by `PrivateRoute`
  - `user` — used for role checks (example: admin)
- `PrivateRoute` is a wrapper that redirects to `/login` when `isAuthenticated` is false.

---

## Testing & CI
- Unit testing with Vitest (inferred)
- E2E testing with Cypress (inferred)
- Lint with ESLint
- Recommendation: Add a GitHub Actions workflow to run `npm ci`, `npm run lint`, `npm run test.unit` and optionally `npm run test.e2e` for PR checks.

---

## Security & production recommendations
- Use secure storage for tokens (Capacitor secure storage plugin recommended)
- Always enforce auth & RBAC server-side
- Use HTTPS & secure WebSockets
- Sanitize user-submitted content (market listings, knowledge articles, comments)
- Rate-limit public endpoints as necessary
