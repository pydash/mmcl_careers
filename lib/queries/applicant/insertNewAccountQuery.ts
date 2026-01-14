export const insertNewAccountQuery = `
INSERT INTO user_accounts (email, password_hash)
VALUES ($1, $2)
RETURNING id;
`;
