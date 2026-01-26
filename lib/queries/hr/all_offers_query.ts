export const ALL_OFFERS_QUERY = `
SELECT
    jo.id,
    up.first_name,
    up.last_name,
    jp.title,
    jo.offered_at,
    jo.status,
    ua.email
FROM job_offers jo
LEFT JOIN job_applications ja
    ON jo.app_id = ja.id
LEFT JOIN job_posts jp
    ON ja.job_id = jp.id
LEFT JOIN user_accounts ua
    ON ja.acc_id = ua.id
LEFT JOIN user_profiles up
    ON up.id = ua.id;
`;
