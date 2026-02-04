CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18),
  country_code TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  self_excluded BOOLEAN DEFAULT FALSE,
  session_limit_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE wallets (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  demo_balance NUMERIC(12, 2) NOT NULL DEFAULT 1000.00,
  bonus_balance NUMERIC(12, 2) NOT NULL DEFAULT 250.00,
  real_balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_id UUID,
  action TEXT NOT NULL,
  metadata JSONB,
  occurred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE game_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE slot_spins (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  game_id TEXT NOT NULL,
  bet_amount NUMERIC(12, 2) NOT NULL,
  win_amount NUMERIC(12, 2) NOT NULL,
  rtp NUMERIC(4, 2) NOT NULL,
  volatility TEXT NOT NULL,
  occurred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
