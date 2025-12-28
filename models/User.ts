interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  email_verified: boolean;
  last_login: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export default User;
