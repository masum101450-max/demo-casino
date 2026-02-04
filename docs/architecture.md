# Technical Architecture

## Backend (Express + TypeScript)

- Modular controllers/services for auth, compliance, and game logic.
- Cryptographically secure RNG for slot outcomes.
- In-memory stores used as placeholders for production data access layers.
- Audit logging helper ready for persistence to a dedicated store.

## Frontend (Next.js + Tailwind)

- Demo lobby, slot page, and responsible gaming views.
- Ready for API integration to the backend endpoints.

## Database (PostgreSQL)

- Schema includes users, wallets, audit logs, sessions, and spins.
- Demo balances enabled; real balances present but disabled by config.

## Upgrade Path (Licensed)

The backend services include clear entry points for licensed real-money extensions:

- Payment processing (deposit/withdrawal) in a dedicated wallet module.
- KYC/AML verification in the auth service.
- Jurisdictional game certification hooks in the slot engine.
