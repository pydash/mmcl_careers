const getAllApplications = `
SELECT
    a.id,
    jp.position,
    jp.department,
    a.status,
    a.created_at
FROM applications a
LEFT JOIN job_postings jp ON a.job_id = jp.id
WHERE a.profile_id = $1
ORDER BY a.created_at DESC
`;

const getApplicationDetails = `
SELECT jsonb_build_object(

  'application',
  to_jsonb(a)
  || jsonb_build_object(
       'position', jp.position,
       'department', jp.department,
       'description', jp.description
     ),

  'interview', (
    SELECT to_jsonb(i)
    FROM interviews i
    WHERE i.application_id = a.id
    LIMIT 1
  ),

  'offer', (
    SELECT to_jsonb(o)
    FROM offers o
    WHERE o.application_id = a.id
    LIMIT 1
  )

) AS application_details

FROM applications a
JOIN job_postings jp ON jp.id = a.job_id
WHERE a.id = $1;
`;

export { getAllApplications, getApplicationDetails };
