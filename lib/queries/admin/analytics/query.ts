const getTotalApplicationsQuery = `
WITH counts AS (
  SELECT
    COUNT(*) FILTER (
      WHERE created_at >= date_trunc('month', NOW())
    ) AS this_month,

    COUNT(*) FILTER (
      WHERE created_at >= date_trunc('month', NOW()) - INTERVAL '1 month'
        AND created_at <  date_trunc('month', NOW())
    ) AS last_month
  FROM job_applications
)
SELECT
  this_month,
  last_month,
  CASE
    WHEN last_month = 0 THEN NULL
    ELSE ROUND(
      ((this_month - last_month)::numeric / last_month) * 100,
      2
    )
  END AS percentage_change
FROM counts;
`;

const getTotalHiresQuery = `
WITH counts AS (
  SELECT
    COUNT(*) FILTER (
      WHERE status = 'Hired'
        AND updated_at >= date_trunc('month', NOW())
    ) AS this_month,

    COUNT(*) FILTER (
      WHERE status = 'Hired'
        AND updated_at >= date_trunc('month', NOW()) - INTERVAL '1 month'
        AND updated_at <  date_trunc('month', NOW())
    ) AS last_month
  FROM job_applications
)
SELECT
  this_month,
  last_month,
  this_month - last_month AS absolute_change,
  CASE
    WHEN last_month = 0 THEN NULL
    ELSE ROUND(
      ((this_month - last_month)::numeric / last_month) * 100,
      2
    )
  END AS percentage_change
FROM counts;
`;

const getTotalOpenPositionsQuery = `
WITH counts AS (
  SELECT
    COUNT(*) FILTER (
      WHERE is_active = TRUE
        AND created_at >= date_trunc('month', NOW())
    ) AS this_month,

    COUNT(*) FILTER (
      WHERE is_active = TRUE
        AND created_at >= date_trunc('month', NOW()) - INTERVAL '1 month'
        AND created_at <  date_trunc('month', NOW())
    ) AS last_month
  FROM job_posts
)
SELECT
  this_month,
  last_month,
  this_month - last_month AS absolute_change,
  CASE
    WHEN last_month = 0 THEN NULL
    ELSE ROUND(
      ((this_month - last_month)::numeric / last_month) * 100,
      2
    )
  END AS percentage_change
FROM counts;
`;

const getOfferAcceptanceRateQuery = `
SELECT
  COUNT(*) FILTER (WHERE status = 'accepted') AS accepted,
  COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'accepted')::numeric
    / NULLIF(
        COUNT(*) FILTER (WHERE status IN ('accepted', 'rejected')),
        0
      ) * 100,
    2
  ) AS acceptance_rate
FROM job_offers;
`;

const getApplicationTrendQuery = `
WITH months AS (
  SELECT * FROM (VALUES
    (1, 'Jan'), (2, 'Feb'), (3, 'Mar'), (4, 'Apr'),
    (5, 'May'), (6, 'Jun'), (7, 'Jul'), (8, 'Aug'),
    (9, 'Sep'), (10, 'Oct'), (11, 'Nov'), (12, 'Dec')
  ) AS m(month_num, month)
)
SELECT
  m.month,
  COUNT(a.id) AS applications,
  COUNT(a.id) FILTER (WHERE a.status = 'hired') AS hired
FROM months m
LEFT JOIN job_applications a
  ON EXTRACT(MONTH FROM a.created_at) = m.month_num
 AND EXTRACT(YEAR FROM a.created_at) = '2026'
GROUP BY m.month, m.month_num
ORDER BY m.month_num;
`;

const getApplicationsByDepartmentQuery = `
SELECT
  jp.department AS department,
  COUNT(ja.id) AS application_count
FROM job_posts jp
LEFT JOIN job_applications ja
  ON ja.job_id = jp.id
GROUP BY jp.department
ORDER BY application_count DESC;
`;

export {
  getTotalApplicationsQuery,
  getTotalHiresQuery,
  getTotalOpenPositionsQuery,
  getOfferAcceptanceRateQuery,
  getApplicationTrendQuery,
  getApplicationsByDepartmentQuery,
};
