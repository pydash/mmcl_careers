export const getApplicationDetails = `
SELECT
    jp.title,
    ja.status,
    ja.applied_at,
    ja.notes,
    ja.pitch
FROM job_applications ja
JOIN job_posts jp ON ja.job_id = jp.id
WHERE jp.public_id = $1
GROUP BY jp.title, ja.status, ja.applied_at, ja.notes, ja.pitch
ORDER BY ja.applied_at DESC
`;
