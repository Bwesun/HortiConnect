# Pages Reference — HortiConnect

This document lists the application pages found by inspecting `src/App.tsx`. Each entry contains:
- route path
- authentication requirement
- purpose / responsibilities
- expected data & service calls (inferred)
- primary UI actions and navigation targets
- TODOs where implementation-specific details are needed

Note: The page implementations were not all fetched while generating this doc; descriptions are inferred from filenames and typical app behavior. Replace the TODOs with exact details from the implementations.

---

## Public pages

### /login — LoginPage
- Auth: public
- Purpose: Authenticate existing users (email/phone + password or other provider)
- Expected fields: identifier (email/phone), password, possibly "remember me"
- Service calls:
  - POST ${VITE_API_URL}/auth/login -> returns token and user info (inferred)
- On success:
  - Store token (secure storage if on device)
  - Update AuthContext
  - Redirect to `/home` or `/admin/dashboard` (based on `user.role`)
- TODO: Confirm exact request/response shapes and any multi-factor flows.

### /register — RegisterPage
- Auth: public
- Purpose: Create new user account
- Expected fields: name, contact details, password, role selection (inferred)
- Service calls:
  - POST ${VITE_API_URL}/auth/register
- On success:
  - Possibly auto-login and redirect similar to Login
- TODO: Confirm required registration fields and activation flows.

### /home — Home
- Auth: public (visible to unauthenticated users)
- Purpose: App landing; show highlights, featured marketplace items, recent knowledge articles, cluster highlights
- Expected data:
  - GET ${VITE_API_URL}/marketplace/featured
  - GET ${VITE_API_URL}/knowledge/recent
  - GET ${VITE_API_URL}/clusters/highlight
- Navigation:
  - Item taps -> `/marketplace` or detailed pages
  - Knowledge -> `/knowledgehub`
- TODO: Confirm data contracts and components used.

### /knowledgehub — KnowledgeHub
- Auth: public
- Purpose: Browse and read horticulture knowledge articles
- Features:
  - List articles, category filters, search
  - Article detail views (likely separate route or modal)
- Admin:
  - Admins access `/admin/knowledge` and editors via `/admin/knowledge/create`
- Service calls:
  - GET ${VITE_API_URL}/knowledge
  - GET ${VITE_API_URL}/knowledge/:id
- TODO: Clarify article detail route and editor behavior.

---

## Authenticated pages (require login)

### /clusters — ClusterDirectory
- Auth: required
- Purpose: Directory of clusters (farmer groups)
- Expected data:
  - GET ${VITE_API_URL}/clusters
- Actions:
  - View cluster -> `/viewcluster/:id`
  - Search and filter clusters
- TODO: Confirm membership actions (join/request).

### /viewcluster/:id — ViewCluster
- Auth: required
- Purpose: View details about a cluster (members, location, posts, produce)
- Expected data:
  - GET ${VITE_API_URL}/clusters/:id
  - GET ${VITE_API_URL}/clusters/:id/members
- Actions:
  - Contact cluster admin, join cluster, view member profiles (`/viewprofile/:id`)

### /profile — Profile
- Auth: required
- Purpose: The logged-in user's profile
- Features:
  - Edit profile
  - View user listings (marketplace)
  - Manage cluster memberships
- Service calls:
  - GET ${VITE_API_URL}/users/me
  - PUT ${VITE_API_URL}/users/me
- TODO: Confirm fields and edit flow.

### /viewprofile/:id — ViewProfile
- Auth: required
- Purpose: Public profile view for other users
- Service calls:
  - GET ${VITE_API_URL}/users/:id

### /marketplace — MarketPlace
- Auth: required
- Purpose: Browse and manage listings (if user is seller)
- Features:
  - List items, filters, search
  - View item details and contact seller -> `/contactseller/:id`
- Services:
  - GET ${VITE_API_URL}/marketplace
  - GET ${VITE_API_URL}/marketplace/:id
  - POST ${VITE_API_URL}/marketplace (create listing, seller)
  - DELETE / PUT for managing listings (seller)
- TODO: Confirm listing currency, images upload flow and storage.

### /contactseller/:id — ContactSeller
- Auth: required
- Purpose: Start negotiation or ask a question about a listing
- Expected:
  - A messaging form that targets seller id or listing id
  - POST ${VITE_API_URL}/messages or use chat socket
- Navigation:
  - On send, open communication view or chat thread `/chat/:id`.

### /communication — Communication
- Auth: required
- Purpose: Messaging center — list of conversations, group announcements and threads
- Actions:
  - Select conversation -> `/chat/:id`
- Services:
  - GET ${VITE_API_URL}/messages/conversations
  - Use WebSocket for live chat (inferred)

### /chat/:id — Chat
- Auth: required
- Purpose: Real-time chat view for a conversation
- Features:
  - Message list, send message, attachments, timestamps
- Services:
  - WebSocket or POST ${VITE_API_URL}/messages/send
  - GET ${VITE_API_URL}/messages/conversations/:id/messages
- TODO: Confirm WebSocket implementation details and presence of read receipts, typing indicators.

---

## Admin pages (private & RBAC protected)
These pages are only accessible to admin users (App shows admin dashboard tab instead of Home).

### /admin/dashboard — Dashboard
- Purpose: Admin overview with system metrics and quick actions
- Expected widgets:
  - New users pending approval, clusters pending approval, marketplace reports, usage metrics
- Services:
  - GET ${VITE_API_URL}/admin/dashboard (inferred)

### /admin/users — ManageUsers
- Purpose: CRUD user management (approve, suspend, change roles)
- Services:
  - GET ${VITE_API_URL}/admin/users
  - PUT ${VITE_API_URL}/admin/users/:id
  - DELETE ${VITE_API_URL}/admin/users/:id

### /admin/clusters — ManageClusters
- Purpose: Approve or manage clusters
- Services:
  - GET ${VITE_API_URL}/admin/clusters
  - PUT ${VITE_API_URL}/admin/clusters/:id

### /admin/knowledge — KnowledgeHub (admin)
- Purpose: Manage knowledge articles, categories and moderation
- Services:
  - GET ${VITE_API_URL}/admin/knowledge
  - DELETE ${VITE_API_URL}/admin/knowledge/:id

### /admin/knowledge/create & /admin/knowledge/edit/:id — KnowledgeEditor
- Purpose: Create and edit knowledge articles
- Features:
  - WYSIWYG editor or rich text form
  - Attach images and set categories
- Services:
  - POST ${VITE_API_URL}/admin/knowledge
  - PUT ${VITE_API_URL}/admin/knowledge/:id

### /admin/groups — ManageGroups
- Purpose: Group-level management for clusters, interest groups or other categories
- Services:
  - GET ${VITE_API_URL}/admin/groups
  - POST/PUT/DELETE as needed

---

## Navigation notes & UX patterns
- Bottom tab bar (Home, Marketplace, Clusters, Profile) on most pages
- Tab bar hidden on auth pages (`/login` and `/register`)
- `PrivateRoute` pattern sends unauthenticated users to `/login`
- `AuthContext` manages `isLoading`, `isAuthenticated`, and `user` (used to show loader and decide admin/home tab target)

---

## How to update this document
- Replace the TODOs with exact endpoints, request/response examples and the actual component names and prop lists from the source files under `src/pages`.
- If you want, provide the `src/pages` folder contents and I will expand this file with exact props and component-level documentation.