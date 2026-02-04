import crypto from "crypto";

export function cryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) {
    throw new Error("maxExclusive must be greater than 0");
  }
  return crypto.randomInt(0, maxExclusive);
}

export function cryptoRandomFloat(): number {
  const buffer = crypto.randomBytes(7);
  const value = buffer.readUIntBE(0, 7);
  return value / 0x1fffffffffffff;
}
