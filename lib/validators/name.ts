export function validateName(name: string): boolean {
  if (!name) return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 50) return false;
  const regex = /^[A-Za-zÀ-ÿ' -]+$/;
  return regex.test(trimmed);
}
