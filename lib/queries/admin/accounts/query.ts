export const getAllAccountsQuery = `
SELECT
    ua.id,
    ua.email,
    CONCAT_WS(' ', up.first_name, up.last_name) AS full_name,
    ua.created_at
FROM user_accounts ua
LEFT JOIN user_profiles up ON ua.id = up.id
WHERE ua.role = 'hr'
ORDER BY ua.created_at DESC;
`;
