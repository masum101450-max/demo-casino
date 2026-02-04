# Legal Online Casino Platform Blueprint (Compliance-First)

## Scope & Product Guardrails
- **Operate only in jurisdictions where online gambling is legal.** Enforce geo-restrictions at the edge, API, and payment layers.
- **No fake gambling logic.** Use licensed RNG providers and certified game integrations only.
- **No underage access.** Age verification must be completed before account creation or gameplay.
- **No win guarantees.** All odds and payouts are RNG-based and auditable.
- **Payments only via licensed PSPs** (Stripe restricted mode, approved local PSPs, crypto only where legal).

## Data Model (PostgreSQL)

### Core tables
- `users`
  - `id` (uuid, pk)
  - `email` (unique, indexed)
  - `password_hash`
  - `status` (enum: pending_verification, active, suspended, self_excluded)
  - `created_at`, `updated_at`
- `user_profiles`
  - `user_id` (fk -> users.id, unique)
  - `first_name`, `last_name`, `dob`
  - `country_code`, `region_code`, `city`, `address`
  - `phone`
- `geo_restrictions`
  - `country_code` (pk)
  - `is_allowed` (bool)
  - `legal_notes`
- `age_verifications`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `status` (enum: pending, verified, failed)
  - `provider` (enum: inhouse, third_party)
  - `verified_at`
- `kyc_checks`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `status` (enum: pending, approved, rejected, needs_review)
  - `provider_reference`
  - `verified_at`
- `aml_checks`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `status` (enum: pending, approved, rejected, needs_review)
  - `risk_score` (int)
  - `verified_at`
- `wallets`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `currency` (char(3))
  - `real_balance` (decimal(12,2))
  - `bonus_balance` (decimal(12,2))
  - `created_at`, `updated_at`
- `transactions`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `wallet_id` (fk)
  - `type` (enum: deposit, withdrawal, wager, win, bonus_credit, bonus_release)
  - `amount` (decimal(12,2))
  - `currency` (char(3))
  - `status` (enum: pending, completed, failed, reversed)
  - `provider_reference`
  - `created_at`
- `games`
  - `id` (uuid, pk)
  - `provider` (enum: pragmatic_play, netent, playngo, other)
  - `provider_game_id`
  - `name`
  - `category` (enum: slots, roulette, blackjack)
  - `rtp` (decimal(5,2))
  - `is_active` (bool)
- `game_sessions`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `game_id` (fk)
  - `session_token`
  - `started_at`, `ended_at`
- `bonuses`
  - `id` (uuid, pk)
  - `name`
  - `bonus_type` (enum: welcome, reload, free_spins)
  - `max_amount` (decimal(12,2))
  - `wagering_multiplier` (int)
  - `terms`
- `bonus_claims`
  - `id` (uuid, pk)
  - `user_id` (fk)
  - `bonus_id` (fk)
  - `status` (enum: active, completed, forfeited)
  - `wagered_amount` (decimal(12,2))
- `responsible_gambling`
  - `user_id` (fk, unique)
  - `self_excluded_until` (timestamp)
  - `deposit_limit_daily` (decimal(12,2))
  - `deposit_limit_weekly` (decimal(12,2))
  - `deposit_limit_monthly` (decimal(12,2))
- `audit_logs`
  - `id` (uuid, pk)
  - `actor_user_id` (fk -> users.id, nullable)
  - `action` (string)
  - `target_type` (string)
  - `target_id` (uuid)
  - `metadata` (jsonb)
  - `created_at`

### Key relationships & constraints
- Only allow `users.status = active` to access real-money play.
- Wallet debits/credits must be transactionally consistent (use DB transactions).
- Store all compliance events in `audit_logs` (e.g., KYC approvals, AML reviews, withdrawals).

## API Structure (Node.js/Express or Django/Laravel Equivalent)

### Auth & Onboarding
- `POST /api/auth/register` → requires **age verification** + geo-allowed country
- `POST /api/auth/login` → OAuth + email verification required
- `POST /api/auth/verify-email`
- `POST /api/auth/logout`

### Compliance & Responsible Gambling
- `GET /api/compliance/geo-eligibility` → returns allowed/blocked region, legal note
- `POST /api/compliance/age-verify`
- `POST /api/compliance/kyc/start`
- `GET /api/compliance/kyc/status`
- `POST /api/compliance/aml/check`
- `POST /api/responsible/self-exclusion`
- `POST /api/responsible/deposit-limits`

### Wallet & Payments
- `GET /api/wallets` → balances (real + bonus)
- `POST /api/wallets/deposit` → licensed PSP only
- `POST /api/wallets/withdraw` → KYC/AML required
- `GET /api/transactions`

### Games
- `GET /api/games` → lobby listing with RTP
- `GET /api/games/:id` → metadata + provider info
- `POST /api/games/:id/session` → create provider session

### Admin
- `GET /api/admin/users`
- `GET /api/admin/transactions`
- `POST /api/admin/games`
- `GET /api/admin/audit-logs`

## Sample Frontend Pages (Next.js)

### Public pages
- `/` — marketing + responsible gambling notice + geo eligibility check banner
- `/auth/register` — requires age verification step before account creation
- `/auth/login`
- `/legal/responsible-gambling`
- `/legal/fair-play`

### Authenticated user
- `/lobby` — slot game lobby with categories and RTP labels
- `/wallet` — real/bonus balances, deposit/withdraw, limits
- `/bonuses` — bonus activation + wagering progress
- `/settings/compliance` — KYC/AML status and document upload
- `/settings/self-exclusion` — self-exclusion and deposit limits

### Admin
- `/admin` — dashboard overview
- `/admin/users` — user status, KYC, self-exclusion
- `/admin/games` — game catalog + RTP
- `/admin/transactions` — deposits/withdrawals
- `/admin/audit-logs`

## Compliance Logic Notes
- **Geo-restriction:** Use GeoIP at edge, plus validation in API; deny access and deposits for blocked regions.
- **Age verification:** Block registration until verified; store verification outcome and provider references.
- **KYC/AML:** Require for withdrawals and high-risk activity; log all checks.
- **RNG integrity:** Only use certified game providers; do not simulate outcomes.

## Security Best Practices
- Encrypt PII at rest and in transit (TLS + DB encryption).
- Use OAuth + email verification with 2FA options.
- Apply strict RBAC for admin endpoints.
- Maintain immutable audit logs (append-only).
- Enable rate limiting and fraud monitoring.
- Store payment data only via licensed PSPs (PCI scope reduction).
- Implement continuous logging + SIEM monitoring.

## Deployment Checklist
- [ ] Obtain legal review per jurisdiction.
- [ ] Integrate licensed PSPs and certified RNG game providers.
- [ ] Configure geo-blocking in CDN and backend.
- [ ] Deploy KYC/AML provider integrations.
- [ ] Set responsible gambling limits and self-exclusion flows.
- [ ] Enable audit logs and retention policies.
- [ ] Run security testing and penetration tests.
- [ ] Configure data residency and GDPR/CCPA compliance as needed.
- [ ] Publish terms, privacy, fair play, and responsible gambling policies.

## Legal Risk Notes & Alternatives
- **Crypto payments** are illegal in some jurisdictions: disable where prohibited.
- **Real-money gameplay** must be blocked for restricted countries: offer **free-to-play demo mode** only.
- **Bonus promotions** can be regulated: ensure terms are explicit and regionally compliant.

