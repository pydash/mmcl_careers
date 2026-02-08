export const getApplicationDetails = `
SELECT
    ja.id,
    jp.title,
    ja.status,
    ja.applied_at,
    ja.notes,
    ja.pitch
FROM job_applications ja
LEFT JOIN job_posts jp ON ja.job_id = jp.id
WHERE ja.id = $1::integer`;