export const ALL_JOBS_QUERY = `
    SELECT
    jp.id,
    jp.public_id,
    jp.title,
    jp.created_at AS date_posted,
    COUNT(a.id) AS total_applicants,
    jp.status
    FROM job_posts jp
    LEFT JOIN applications a ON a.job_id = jp.id
    GROUP BY jp.id, jp.title
    ORDER BY jp.id;
`;
