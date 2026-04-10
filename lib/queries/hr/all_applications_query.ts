export const ALL_APPLICATIONS_QUERY = `
SELECT
    a.id,
    a.job_id,
    ua.id AS userid,
    CONCAT( up.first_name, ' ', up.last_name ) AS name,
    ua.email,
    jp.title,
    a.applied_at,
    a.status,
    a.notes
FROM applications a
LEFT JOIN job_posts jp
    ON a.job_id = jp.id
LEFT JOIN user_accounts ua
    ON a.profile_id = ua.id
LEFT JOIN user_profiles up
    ON ua.id = up.id
ORDER BY a.id;
`;
