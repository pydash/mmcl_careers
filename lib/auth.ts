import { cookies } from "next/headers";

async function getSession() {
  try {
    const cookieStore = await cookies();
    const session_token = await cookieStore.get("session_token")?.value;
    if (!session_token) {
      return false;
    }
  } catch (error) {
    console.error("Error occurred while fetching session:", error);
    return false;
  }
}

async function getUserRole(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const session_role = await cookieStore.get("session_role");
    if (!session_role) {
      return null;
    }
    return session_role.value || null;
  } catch (error) {
    console.error("Error occurred while fetching user role:", error);
    return null;
  }
}

export { getSession, getUserRole };
