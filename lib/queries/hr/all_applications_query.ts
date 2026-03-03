const ALL_APPLICATIONS_QUERY = `
SELECT
  a.id,
  a.job_id,
  up.id AS user_id,
  up.first_name,
  up.last_name,
  up.email_address,
  jp.position AS title,
  a.created_at AS applied_at,
  a.status,
  a.score,
  a.notes
FROM applications a
LEFT JOIN user_profiles up ON up.id = a.profile_id
LEFT JOIN job_postings jp ON jp.id = a.job_id
ORDER BY a.id DESC
`;

export { ALL_APPLICATIONS_QUERY };
