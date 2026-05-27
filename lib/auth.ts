// Next.js server helpers
import { cookies } from "next/headers";

// External
import jwt from "jsonwebtoken";

/**
 * Minimal, forgiving payload shape used across the app.
 * Keep optional fields so tokens signed with either `id` or `userId` are accepted.
 */
interface CustomJwtPayload {
  id?: string;
  userId?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

/**
 * Decode and normalize a JWT token. Returns `null` if verification fails.
 */
function decodeAuthToken(token: string): CustomJwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || typeof decoded === "string") return null;

    return decoded as CustomJwtPayload;
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;
  }
}

export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  return decodeAuthToken(token);
}

export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = decodeAuthToken(token);
  return decoded ? (decoded.id ?? decoded.userId ?? null) : null;
}

export async function getUserRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = decodeAuthToken(token);
  return decoded?.role ?? null;
}

export async function getUserEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = decodeAuthToken(token);
  return decoded?.email ?? null;
}
