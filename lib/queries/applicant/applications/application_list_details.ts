export const APPLICATION_LIST_DETAILS_QUERY = `
SELECT
    COALESCE(json_agg(jt.tag), '[]'::json) AS job_tags,
    jp.title AS job_title,
    jp.description,
    ja.applied_at
FROM job_applications ja
JOIN job_posts jp ON ja.job_id = jp.id
LEFT JOIN job_tags jt ON jp.id = jt.job_id
WHERE ja.acc_id = $1
GROUP BY jp.id, jp.title, jp.description, ja.applied_at
ORDER BY ja.applied_at DESC
`;
