export const ALL_APPLICATIONS_QUERY = `
SELECT
    ja.id,
    ua.id AS userid,
    up.first_name,
    up.last_name,
    ua.email,
    ja.job_id,
    jp.title,
    ja.applied_at,
    ja.status,
    ja.notes
FROM job_applications ja
LEFT JOIN job_posts jp
    ON ja.job_id = jp.id
LEFT JOIN user_accounts ua
    ON ja.acc_id = ua.id
LEFT JOIN user_profiles up
    ON ua.id = up.id
ORDER BY ja.id;
`;
