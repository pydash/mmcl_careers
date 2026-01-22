export const getJobPostDetails = `
SELECT
  jp.id,
  jp.title,
  jp.public_id,
  jp.employment_type,
  jp.description,
  jp.requirements,
  jp.responsibilities,
  jp.salary_min,
  jp.salary_max,
  jp.department,
  jp.expiry_date,
  jp.created_at AS posted_at
  FROM job_posts jp
  WHERE jp.public_id = $1
  GROUP BY jp.id;
  `;

// LEFT JOIN job_tags jt ON jp.id = jt.job_id
// COALESCE(
//   json_agg(jt.tag) FILTER (WHERE jt.tag IS NOT NULL),
//   '[]'
// ) AS tags
