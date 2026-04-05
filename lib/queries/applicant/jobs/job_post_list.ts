export const getAllJobPost = `
SELECT
  jp.id,
  jp.public_id,
  jp.title,
  jp.description,
  jp.salary_min,
  jp.salary_max,
  json_build_array(
    jp.department,
    jp.employment_type,
    NULL,
    CASE
      WHEN EXISTS (
        SELECT 1
        FROM job_applications ja
        WHERE ja.job_id = jp.id AND ja.acc_id = $1
      ) THEN true
      ELSE false
    END
  ) AS tags,
  jp.expiry_date,
  jp.is_active
FROM job_posts jp
ORDER BY jp.created_at DESC;
`;
