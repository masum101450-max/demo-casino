INSERT INTO users (id, email, password_hash, age, country_code, email_verified)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'demo@example.com', 'replace-with-hash', 25, 'US', true);

INSERT INTO wallets (user_id, demo_balance, bonus_balance, real_balance)
VALUES
  ('00000000-0000-0000-0000-000000000001', 1000.00, 250.00, 0.00);
