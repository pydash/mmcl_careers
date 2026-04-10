export const getApplicationDetails = `
SELECT
    a.id,
    jp.title,
    a.status,
    a.applied_at,
    a.pitch,
    a.notes
FROM applications a
LEFT JOIN job_posts jp ON a.job_id = jp.id
WHERE a.id = $1::integer`;
