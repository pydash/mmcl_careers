export function validatePassword(password: string): boolean {
  if (!password) return false;
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}
