// Dashboard Queries
const getDashboardOverview = `
SELECT COUNT(*) FROM job_applications WHERE acc_id = $1;
`;

const getPendingApplications = `
SELECT COUNT(*) FROM job_applications WHERE acc_id = $1 AND status = 'pending';
`;

const getUpcomingInterviews = `
SELECT COUNT(*)
FROM job_interviews i
JOIN job_applications a ON i.app_id = a.id
WHERE a.acc_id = $1 AND i.scheduled_at >= NOW();
`;

// Recent Applications Queries
const getRecentApplication = `
SELECT
    a.id,
    jp.title,
    jp.department,
    a.status,
    a.created_at
FROM job_applications a
JOIN job_posts jp ON a.job_id = jp.id
WHERE a.acc_id = $1
ORDER BY a.updated_at DESC
LIMIT 1;
`;

// Explore Jobs Queries
const getJobs = `
SELECT 
  jp.public_id,
  jp.title,
  jp.department,
  jp.expiry_date
FROM job_posts jp
WHERE 
  jp.expiry_date >= NOW()
  AND jp.is_active = true
  AND NOT EXISTS (
    SELECT 1
    FROM job_applications a
    WHERE a.job_id = jp.id
      AND a.acc_id = $1
  )
ORDER BY jp.expiry_date ASC
LIMIT 4;
`;

// Interview Queries
const getInterviews = `
SELECT
  a.id AS application_id,
  jp.title,
  i.scheduled_at,
  i.interview_mode,
  i.status
FROM job_interviews i
LEFT JOIN job_applications a ON i.app_id = a.id
LEFT JOIN job_posts jp ON a.job_id = jp.id
WHERE a.acc_id = $1 AND i.scheduled_at >= NOW()
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
