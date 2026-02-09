export const ALL_APPLICATIONS_QUERY = `
SELECT
    ja.id,
    ja.acc_id AS userid,
    ja.job_id,
    ja.applied_at,
    ja.status,
    ja.notes,
    jp.title,
    ua.email,
    up.first_name,
    up.last_name
FROM job_applications ja
LEFT JOIN job_posts jp
    ON ja.job_id = jp.id
LEFT JOIN user_accounts ua
    ON ja.acc_id = ua.id
LEFT JOIN user_profiles up
    ON ua.id = up.id
ORDER BY ja.applied_at DESC;
`;
