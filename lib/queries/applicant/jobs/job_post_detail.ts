export const getJobPostDetails = `
SELECT
  jp.id,
  jp.title,
  jp.public_id,
  jp.employment_type,
  jp.description,
  jp.requirements,
  jp.responsibilities,
  jp.salary,
  jp.department,
  jp.expiry_date,
  jp.created_at AS posted_at
  FROM job_posts jp
  WHERE jp.public_id = $1
`;
