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

export {
  getOpenRolesStats,
  getNewApplicantsStats,
  getInterviewsScheduledStats,
  getOffersMadeStats,
  getPipelineHealthStats,
};
