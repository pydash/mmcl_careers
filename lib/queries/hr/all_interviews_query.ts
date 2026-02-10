export const ALL_INTERVIEWS_QUERY = `
SELECT
    ja.id,
    up.first_name,
    up.last_name,
    i.title,
    i.scheduled_at,
    ua.email
FROM job_interviews i
LEFT JOIN job_applications ja
    ON ja.id = i.app_id
LEFT JOIN user_accounts ua
    ON ua.id = ja.acc_id
LEFT JOIN user_profiles up
    ON up.id = ua.id;
`;
