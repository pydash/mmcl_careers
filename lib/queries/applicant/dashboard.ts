// Dashboard Queries
const getDashboardOverview = `
SELECT COUNT(*) FROM applications WHERE profile_id = $1;
`;

const getPendingApplications = `
SELECT COUNT(*) FROM applications WHERE profile_id = $1 AND status = 'pending';
`;

const getUpcomingInterviews = `
SELECT COUNT(*)
FROM interviews i
JOIN applications a ON i.application_id = a.id
WHERE a.profile_id = $1 AND i.scheduled_at >= NOW();
`;

// Recent Applications Queries
const getRecentApplication = `
SELECT
    a.id,
    jp.position,
    jp.department,
    a.status,
    a.created_at
FROM applications a
JOIN job_postings jp ON a.job_id = jp.id
WHERE a.profile_id = $1
ORDER BY a.updated_at DESC
LIMIT 1;
`;

// Explore Jobs Queries
const getJobs = `
SELECT 
  jp.public_id,
  jp.position,
  jp.department,
  jp.expiration_date
FROM job_postings jp
WHERE 
  jp.expiration_date >= NOW()
  AND jp.is_open = true
  AND NOT EXISTS (
    SELECT 1
    FROM applications a
    WHERE a.job_id = jp.id
      AND a.profile_id = $1
  )
ORDER BY jp.expiration_date ASC
LIMIT 4;
`;

// Interview Queries
const getInterviews = `
SELECT
  a.id AS application_id,
  jp.position,
  i.scheduled_at,
  i.mode,
  i.status
FROM interviews i
LEFT JOIN applications a ON i.application_id = a.id
LEFT JOIN job_postings jp ON a.job_id = jp.id
WHERE a.profile_id = $1 AND i.scheduled_at >= NOW()
ORDER BY i.scheduled_at ASC;
`;

export {
  getDashboardOverview,
  getPendingApplications,
  getUpcomingInterviews,
  getRecentApplication,
  getJobs,
  getInterviews,
};
