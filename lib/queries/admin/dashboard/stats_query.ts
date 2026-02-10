export const getDashboardStats = `
SELECT
    (
    SELECT COUNT(*) FROM job_posts WHERE is_active = TRUE
    ) AS open_roles,

    (SELECT COUNT(DISTINCT acc_id)
    FROM job_applications
    WHERE status IN ('pending', 'interviewed', 'offered')
    ) AS applicants_total,

    (SELECT COUNT(*)
    FROM job_interviews
    WHERE scheduled_at >= NOW()
    ) AS upcoming_interviews,

    (SELECT COUNT(*)
    FROM job_offers
    WHERE status IN ('pending', 'accepted')
    AND created_at >= CURRENT_DATE - INTERVAL '3 days'
    ) AS recent_offers;
`;
