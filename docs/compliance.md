# Compliance & Safety Controls

This project includes the following compliance-ready controls:

- **Age verification (18+)** enforced at registration.
- **Geo-restriction support** via allowlist/denylist configuration.
- **Session limits** to cap play duration.
- **Self-exclusion flags** that block access.
- **Audit logs** for user actions and critical events.

## Demo Wallet Rules

- `demo_balance` and `bonus_balance` are enabled.
- `real_balance` exists but is **hard-disabled**.
- Configuration flag `REAL_MONEY_ENABLED=false` prevents real-money operations.

## RNG & RTP

The slot engine uses cryptographically secure randomness and applies RTP targets without guaranteed outcomes.

## Future Licensed Extensions

Licensed features (KYC, AML, payment processing, jurisdictional reporting) should be implemented in a separate module with strict feature flags and regulatory review.
