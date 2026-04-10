export const getAllJobPost = `
SELECT
  jp.id,
  jp.public_id,
  jp.title,
  jp.description,
  jp.salary,
  jp.open_vacancies,
  (
    SELECT COUNT(a.acc_id)
    FROM applications a
    WHERE a.job_id = jp.id
  ) AS applications_count,
  json_build_array(
    jp.department,
    jp.employment_type,
    jp.teaching_type,
    CASE
      WHEN EXISTS (
        SELECT 1
        FROM applications a
        WHERE a.job_id = jp.id AND a.acc_id = $1
      ) THEN true
      ELSE false
    END
  ) AS tags,
  jp.expiry_date,
  jp.is_active
FROM job_posts jp
ORDER BY jp.expiration_date DESC;
`;
