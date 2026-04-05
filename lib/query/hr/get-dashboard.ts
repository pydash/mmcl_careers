const getDashboard = `
SELECT json_build_object(
  'open_positions', (
    SELECT COUNT(*) 
    FROM job_postings 
    WHERE is_open = true
  ),
  'total_applications', (
    SELECT COUNT(*) 
    FROM applications
  ),
  'pending_review', (
    SELECT COUNT(*) 
    FROM applications 
    WHERE status = 'pending'
  ),
  'interviews_scheduled', (
    SELECT COUNT(*) 
    FROM interviews 
    WHERE status = 'scheduled'
  ),
  'recent_applications', (
    SELECT json_agg(
      json_build_object(
        'id', t.id,
        'first_name', t.first_name,
        'middle_name', t.middle_name,
        'last_name', t.last_name,
        'position', t.position,
        'applied_at', t.created_at
      )
    )
    FROM (
      SELECT 
        a.id,
        a.created_at,
        up.first_name,
        up.middle_name,
        up.last_name,
        jp.position
      FROM applications a
      LEFT JOIN job_postings jp ON a.job_id = jp.id
      LEFT JOIN user_profiles up ON a.profile_id = up.id
      WHERE jp.is_open = true
      ORDER BY a.created_at DESC
      LIMIT 5
    ) t
  )
) AS dashboard_data;
`;

export { getDashboard };
