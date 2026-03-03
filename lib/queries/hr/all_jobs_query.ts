const getAllJobs = `
SELECT
    jp.id,
    jp.public_id,
    jp.position,
    jp.created_at AS date_posted,
    COUNT(a.id) AS total_applicants,
    jp.is_open
FROM job_postings jp
LEFT JOIN applications a ON a.job_id = jp.id
GROUP BY jp.id
ORDER BY jp.created_at DESC;
`;

export { getAllJobs };
