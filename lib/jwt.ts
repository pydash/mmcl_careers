// External
import jwt from "jsonwebtoken";

// Local config
const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Create a signed JWT for the given payload.
 * Keep payload shape flexible; callers should type-guard the returned claims.
 */
export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify and decode a JWT. Returns `null` on failure.
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
