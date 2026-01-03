export const JOB_POST_ITEM_LIST_QUERY = `
SELECT
  jp.id,
  jp.title,
  jp.description,
  jp.salary_min,
  jp.salary_max,
  COALESCE(
    json_agg(jt.tag) FILTER (WHERE jt.tag IS NOT NULL),
    '[]'
  ) AS tags
FROM job_posts jp
LEFT JOIN job_tags jt ON jp.id = jt.job_id
WHERE jp.is_active = true
GROUP BY jp.id;
`;
