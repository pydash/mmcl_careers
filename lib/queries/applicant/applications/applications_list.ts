export const getAllApplications = `
SELECT
    a.id,
    jp.title,
    a.status,
    a.applied_at
FROM applications a
LEFT JOIN job_posts jp ON a.job_id = jp.id
WHERE a.profile_id = $1
ORDER BY a.applied_at DESC;
`;

// `
// SELECT
// json_build_object(
// 'application', json_build_object(
//     'id', a.id,
//     'job_title', jp.title,
//     'status', a.status,
//     'pitch', a.pitch,
//     'applied_at', a.applied_at
// ),
// 'profile', json_build_object(
//     'personal', to_jsonb(up),
//     'education', to_jsonb(eb),
//     'employment', json_agg(to_jsonb(emp)),
//     'license', json_agg(to_jsonb(lc)),
//     'extras', to_jsonb(ue))
// ) AS details
// FROM job_applications a
// LEFT JOIN job_posts jp ON a.job_id = jp.id
// LEFT JOIN user_profiles up ON a.acc_id = up.id
// LEFT JOIN educational_backgrounds eb ON up.id = eb.id
// LEFT JOIN employment_histories emp ON up.id = emp.acc_id
// LEFT JOIN license_certifications lc ON up.id = lc.acc_id
// LEFT JOIN user_extras ue ON up.id = ue.id
// WHERE a.acc_id = $1
// GROUP BY a.id, jp.title, up.id, eb.id, ue.id
// ORDER BY a.applied_at DESC
// `;
