export const getAllApplications = `
SELECT
    ja.id,
    jp.title,
    ja.status,
    ja.applied_at
FROM job_applications ja
LEFT JOIN job_posts jp ON ja.job_id = jp.id
WHERE ja.acc_id = $1
ORDER BY ja.applied_at DESC;
`;

// `
// SELECT
// json_build_object(
// 'application', json_build_object(
//     'id', ja.id,
//     'job_title', jp.title,
//     'status', ja.status,
//     'pitch', ja.pitch,
//     'applied_at', ja.applied_at
// ),
// 'profile', json_build_object(
//     'personal', to_jsonb(up),
//     'education', to_jsonb(eb),
//     'employment', json_agg(to_jsonb(emp)),
//     'license', json_agg(to_jsonb(lc)),
//     'extras', to_jsonb(ue))
// ) AS details
// FROM job_applications ja
// LEFT JOIN job_posts jp ON ja.job_id = jp.id
// LEFT JOIN user_profiles up ON ja.acc_id = up.id
// LEFT JOIN educational_backgrounds eb ON up.id = eb.id
// LEFT JOIN employment_histories emp ON up.id = emp.acc_id
// LEFT JOIN license_certifications lc ON up.id = lc.acc_id
// LEFT JOIN user_extras ue ON up.id = ue.id
// WHERE ja.acc_id = $1
// GROUP BY ja.id, jp.title, up.id, eb.id, ue.id
// ORDER BY ja.applied_at DESC
// `;
