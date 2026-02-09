export const getProfileDetails = `
SELECT jsonb_build_object(
  'has_profile', CASE WHEN up.id IS NOT NULL THEN true ELSE false END,
  'personal', COALESCE(
    jsonb_build_object(
      'first_name', up.first_name,
      'middle_name', up.middle_name,
      'last_name', up.last_name,
      'honorifics', up.honorific,
      'phone_number', up.phone_number,
      'physical_address', up.physical_address,
      'birth_date', up.birth_date,
      'sex', up.sex,
      'citizenship', up.citizenship,
      'civil_status', up.civil_status,
      'about', up.about,
      'email_address', up.email_address
    ),
    '{}'::jsonb
  ),

  'education', COALESCE(
    jsonb_build_object(
      'degree', eb.degree,
      'institution', eb.institution,
      'course', eb.course,
      'status', eb.status,
      'units_earned', eb.units_earned,
      'year_finished', eb.year_finished,
      'honors', eb.honors
    ),
    '{}'::jsonb
  ),

  'employment', COALESCE(eh.employment, '[]'::jsonb),

  'gov_ids', COALESCE(
    jsonb_build_object(
      'id_type', gid.id_type,
      'id_number', gid.id_number,
      'issued_by', gid.issued_by,
      'issued_date', gid.issued_date,
      'expiry_date', gid.expiry_date
    ),
    '{}'::jsonb
  ),

  'license', COALESCE(lc.licenses, '[]'::jsonb),

  'attachments', COALESCE(
    jsonb_build_object(
      'file_name', ua.file_name,
      'file_type', ua.file_type,
      'file_size', ua.file_size,
      'file_url', ua.file_url
    ),
    '{}'::jsonb
  ),

  'extras', COALESCE(
    jsonb_build_object(
      'wfh_capability', ue.wfh_capability,
      'onsite_willing', ue.onsite_willing,
      'start_date_preference', ue.start_date_preference,
      'sources', ue.sources,
      'skills', ue.skills
    ),
    '{}'::jsonb
  ),

  'socials', COALESCE(us.socials, '[]'::jsonb)
) AS response
FROM (SELECT 1) AS dummy

LEFT JOIN user_profiles up ON up.id = $1
LEFT JOIN educational_backgrounds eb ON up.id = eb.id
LEFT JOIN gov_ids gid ON up.id = gid.acc_id
LEFT JOIN user_attachments ua ON up.id = ua.acc_id
LEFT JOIN user_extras ue ON up.id = ue.id

LEFT JOIN LATERAL (
  SELECT jsonb_agg(
    jsonb_build_object(
      'job_title', eh.job_title,
      'position_specialization', eh.position_specialization,
      'company_name', eh.company_name,
      'industry', eh.industry,
      'monthly_salary', eh.monthly_salary,
      'date_started', eh.date_started,
      'date_ended', eh.date_ended
    )
    ORDER BY eh.date_started DESC
  ) AS employment
  FROM employment_histories eh
  WHERE eh.acc_id = $1
) eh ON TRUE

LEFT JOIN LATERAL (
  SELECT jsonb_agg(
    jsonb_build_object(
      'title', lc.title,
      'issuing_organization', lc.issuing_organization,
      'number', lc.number,
      'date_issued', lc.date_issued,
      'expiry_date', lc.expiry_date,
      'image_url', lc.image_url
    )
    ORDER BY lc.date_issued DESC
  ) AS licenses
  FROM license_certifications lc
  WHERE lc.acc_id = $1
) lc ON TRUE

LEFT JOIN LATERAL (
  SELECT jsonb_agg(
    jsonb_build_object(
      'platform', us.platform,
      'url', us.platform_url
    )
    ORDER BY us.platform
  ) AS socials
  FROM user_socials us
  WHERE us.id = $1
) us ON TRUE;
`;
