const get_all_job_post = `
SELECT
    jp.public_id,
    jp.position,
    jp.department,
    jp.employment_type,
    jp.description,
    jp.is_open,
    jp.expiration_date,
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM applications a
            WHERE a.job_id = jp.id AND a.profile_id = $1
        ) THEN true
        ELSE false
    END AS has_applied
FROM job_postings jp
ORDER BY jp.created_at DESC;
`;

export { get_all_job_post };
