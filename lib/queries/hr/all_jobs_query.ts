export const ALL_JOBS_QUERY = `
SELECT
    jp.id,
    jp.public_id,
    jp.title,
    jp.created_at AS date_posted,
    COUNT(ja.id) AS total_applicants,
    jp.is_active
FROM job_posts jp
LEFT JOIN job_applications ja
    ON ja.job_id = jp.id
GROUP BY jp.id, jp.title
ORDER BY jp.id;
`;
