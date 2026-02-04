# Demo Casino Platform (Legal, Free-to-Play)

This repository provides a **legal-by-default** demo casino and slot gaming platform with a modular architecture designed to be upgradeable to real-money operations **only after proper licensing**.

> ✅ **Demo mode only** — no real-money wagering, deposits, or withdrawals are implemented.

## Core Principles

- **No real-money gambling**
- **No payment gateways**
- **Real-money features are hard-disabled by configuration**
- **Audit logs and compliance controls included**

## Tech Stack

- **Frontend**: Next.js (React) + Tailwind CSS
- **Backend**: Node.js + Express (TypeScript)
- **Database**: PostgreSQL
- **Auth**: JWT + email verification
- **RNG**: Cryptographically secure RNG

## Configuration Guardrails

Real-money features are **explicitly disabled** using configuration:

```
REAL_MONEY_ENABLED=false
```

All wallet logic enforces demo/bonus balances and **rejects any real-money mutations**. Licensed hooks are commented in the codebase so that a licensed operator can extend functionality responsibly later.

## Repository Structure

```
/frontend       Next.js app (demo UI)
/backend        Express API (TypeScript)
/database       SQL schema + seed data
/docs           Compliance + technical docs
.env.example    Environment configuration sample
```

## Quick Start (Developer)

> This is a structural template intended for local development and review.

1. Install dependencies in each app:
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. Copy `.env.example` to `.env` and update values.
3. Start the backend:
   - `cd backend && npm run dev`
4. Start the frontend:
   - `cd frontend && npm run dev`

## Compliance Features Included

- Age verification (18+)
- Geo-restriction support (denylist/allowlist)
- Session limits
- Self-exclusion flags
- Audit logging

## Legal Notice

This project is **not** intended for real-money gambling. Enabling real-money functionality requires proper licensing, regulatory approvals, and additional compliance work (KYC/AML, payment processing, jurisdictional controls, audits). The codebase includes explicit safeguards to ensure demo-only behavior.

See: `docs/legal.md` and `docs/compliance.md`.
