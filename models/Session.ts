interface Session {
  id: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
}

export type { Session };
