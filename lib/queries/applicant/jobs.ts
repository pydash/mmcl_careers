const getAllJobs = `
SELECT
  jp.public_id,
  jp.position,
  jp.department,
  jp.employment_type,
  jp.expiration_date,
  a.id AS app_id,
  (a.id IS NOT NULL) AS has_applied
FROM job_postings jp
LEFT JOIN applications a
  ON a.job_id = jp.id
  AND a.profile_id = $1;
`;

const getJobPostDetails = `
SELECT
  jp.public_id,
  jp.position,
  jp.department,
  jp.employment_type,
  jp.description,
  jp.expiration_date,
  jp.created_at
FROM job_postings jp
WHERE jp.public_id = $1
`;

// Apply Queries
const getApplicantDetails = `
SELECT jsonb_build_object(
  'profile', to_jsonb(p),

  'media_accounts', COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(ma))
      FROM media_accounts ma
      WHERE ma.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'credentials', COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(c))
      FROM credentials c
      WHERE c.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'education_background', COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(eb))
      FROM education_backgrounds eb
      WHERE eb.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'work_experience', COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(we))
      FROM work_experiences we
      WHERE we.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'government_ids', COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(gid))
      FROM government_ids gid
      WHERE gid.profile_id = p.id
    ),
    '[]'::jsonb
  )

) AS applicant
FROM user_profiles p
WHERE p.id = $1;
`;

const getIdFromJobPublicId = `
SELECT id FROM job_postings WHERE public_id = $1;
`;

const createApplication = `
INSERT INTO applications (profile_id, job_id, pitch)
VALUES ($1, $2, $3)
RETURNING id;
`;

export {
  getAllJobs,
  getJobPostDetails,
  getApplicantDetails,
  getIdFromJobPublicId,
  createApplication,
};
