export const ALL_INTERVIEWS_QUERY = `
SELECT
    i.id,
    a.id AS appid,
    up.first_name,
    up.last_name,
  jp.position,
    i.scheduled_at,
    i.mode,
    i.link,
    i.location,
    up.email_address
FROM interviews i
LEFT JOIN applications a
    ON a.id = i.application_id
LEFT JOIN user_accounts ua
    ON ua.id = a.profile_id
LEFT JOIN user_profiles up
    ON up.id = ua.id
LEFT JOIN job_postings jp ON a.job_id = jp.id
ORDER BY a.id DESC; 
`;
