export const APPLICANT_PROFILE_QUERY = `
SELECT json_build_object(
    'personal', to_jsonb(up),
    'education', to_jsonb(eb),
    'employment', json_agg(to_jsonb(emp)),
    'license', json_agg(to_jsonb(lc)),
    'extras', to_jsonb(ue),
    'attachments', json_agg(to_jsonb(att))
) AS profile
FROM user_profiles up
LEFT JOIN educational_backgrounds eb ON up.id = eb.profile_id
LEFT JOIN user_extras ue ON up.id = ue.id
LEFT JOIN user_attachments att ON up.id = att.profile_id
LEFT JOIN employment_histories emp ON up.id = emp.profile_id
LEFT JOIN license_certifications lc ON up.id = lc.profile_id
WHERE up.id = $1
GROUP BY up.id, eb.id, ue.id
`;
