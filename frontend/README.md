# Sahitya Sabha Frontend

Premium modern Hindi Literature Club website built with React + Vite.

## Design Direction

- Warm neutral literary palette: ivory, cream, beige, warm brown, muted gold, terracotta accents
- Editorial-style typography and spacing hierarchy
- Subtle glassmorphism, smooth transitions, responsive layouts
- Expanded long-form landing page with immersive cultural sections

## Routes

- `/` - Expanded landing page (hero, authors, timeline, events, forum preview, members, stats, gallery, about, newsletter, footer)
- `/members` - Searchable member directory + admin CRUD
- `/forum` - Post creation, likes, comments, replies, category browsing + admin moderation
- `/events` - Event cards, registrations + admin CRUD
- `/admin/login` - Admin login
- `/admin` - Protected admin dashboard

## Admin Authentication

- Local demo credentials:
  - Username: `admin`
  - Password: `admin123`
- Auth state and role stored in localStorage
- Protected routes enforced using `ProtectedRoute`

## Data/State Architecture

- Shared app state lives in `src/context/ClubContext.jsx`
- Entities managed:
  - Members
  - Forum categories/posts/comments/replies
  - Events
  - Gallery/Blog items
- CRUD and moderation actions are centralized in context and persisted to localStorage

## Structural Changes

- Added `react-router-dom` for multi-page routing
- Added app-level provider in `src/main.jsx`
- Added shared layout and protected route components:
  - `src/components/SiteLayout.jsx`
  - `src/components/ProtectedRoute.jsx`
- Added/updated page modules:
  - `src/pages/HomePage.jsx`
  - `src/pages/MembersPage.jsx`
  - `src/pages/ForumPage.jsx`
  - `src/pages/EventsPage.jsx`
  - `src/pages/AdminLoginPage.jsx`
  - `src/pages/AdminDashboardPage.jsx`
- Unified UI styling in `src/App.css` and theme tokens in `src/index.css`

## Run

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
