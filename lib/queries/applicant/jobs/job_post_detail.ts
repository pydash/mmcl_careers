export const JOB_POST_ITEM_DETAIL_QUERY = `
SELECT
  jp.id,
  jp.title,
  jp.description,
  jp.requirements,
  jp.responsibilities,
  jp.salary_min,
  jp.salary_max,
  jp.department,
  jp.expiry_date,
  jp.created_at AS posted_at,
  COALESCE(
    json_agg(jt.tag) FILTER (WHERE jt.tag IS NOT NULL),
    '[]'
  ) AS tags
FROM job_posts jp
LEFT JOIN job_tags jt ON jp.id = jt.job_id
WHERE jp.id = $1
GROUP BY jp.id;
`;
