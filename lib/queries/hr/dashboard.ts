// Statistics
const getOpenRolesStats = `
WITH base AS (
    SELECT 
        COUNT(*) FILTER (WHERE is_open = TRUE) AS count,
        COUNT(*) FILTER (
            WHERE created_at >= date_trunc('week', CURRENT_DATE)
              AND created_at <  date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
        ) AS this_week,
        COUNT(*) FILTER (
            WHERE created_at >= date_trunc('week', CURRENT_DATE) - INTERVAL '1 week'
              AND created_at <  date_trunc('week', CURRENT_DATE)
        ) AS last_week
    FROM job_postings
)
SELECT 
    count,
    (this_week - last_week) AS delta
FROM base;
`;

const getNewApplicantsStats = `
WITH base AS (
    SELECT
        COUNT(*) FILTER (
            WHERE created_at >= NOW() - INTERVAL '7 days'
        ) AS last_7_days,
        COUNT(*) FILTER (
            WHERE created_at >= date_trunc('day', NOW())
        ) AS today_count
    FROM applications
)
SELECT
    last_7_days AS count,
    today_count AS delta
FROM base;
`;

const getInterviewsScheduledStats = `
WITH base AS (
    SELECT
        COUNT(*) FILTER (
            WHERE scheduled_at >= NOW() - INTERVAL '7 days'
        ) AS interviews_7_days,
        COUNT(*) FILTER (
            WHERE scheduled_at >= date_trunc('day', NOW())
        ) AS today_count
    FROM interviews
)
SELECT
    interviews_7_days AS count,
    today_count AS delta
FROM base;
`;
const getOffersMadeStats = `
WITH base AS (
    SELECT
        COUNT(*) FILTER (
            WHERE created_at >= NOW() - INTERVAL '7 days'
        ) AS offers_7_days,
        COUNT(*) FILTER (
            WHERE created_at >= NOW() - INTERVAL '7 days'
              AND status = 'scheduled'
        ) AS scheduled_7_days
    FROM offers
)
SELECT
    offers_7_days AS count,
    scheduled_7_days AS delta
FROM base;
`;

// Pipeline health
const getPipelineHealthStats = `
WITH pipeline AS (
    SELECT
        (SELECT COUNT(*) 
         FROM applications 
         WHERE created_at >= NOW() - INTERVAL '7 days') AS applied,

        (SELECT COUNT(*) 
         FROM interviews 
         WHERE scheduled_at >= NOW() - INTERVAL '7 days') AS interview,

        (SELECT COUNT(*) 
         FROM offers 
         WHERE created_at >= NOW() - INTERVAL '7 days') AS offer
)
SELECT * FROM pipeline;
`;

// Upcoming interviews
const getUpcomingInterviewsStats = `
SELECT
    i.id,
    i.scheduled_at,
    jp.position,
    CONCAT(up.first_name, ' ', up.last_name) AS applicant_name
FROM interviews i
JOIN applications a ON i.application_id = a.id 
JOIN user_profiles up ON a.profile_id = up.id
JOIN job_postings jp ON a.job_id = jp.id
WHERE i.scheduled_at >= NOW()
ORDER BY i.scheduled_at ASC
LIMIT 5;
`;

// Recent applicants
const getRecentApplicantsStats = `
SELECT
    CONCAT(up.first_name, ' ', up.last_name) AS name,
    jp.position AS role,
    a.status,
    a.created_at AS submitted
FROM applications a
JOIN user_profiles up ON a.profile_id = up.id
JOIN job_postings jp ON a.job_id = jp.id
WHERE a.created_at >= NOW() - INTERVAL '7 days'
ORDER BY a.created_at DESC
LIMIT 5;
`;

export {
  getOpenRolesStats,
  getNewApplicantsStats,
  getInterviewsScheduledStats,
  getOffersMadeStats,
  getPipelineHealthStats,
  getUpcomingInterviewsStats,
  getRecentApplicantsStats,
};
