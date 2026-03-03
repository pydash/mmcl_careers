const getProfileDetails = `
SELECT jsonb_build_object(

  'profile', jsonb_build_object(
    'id', p.id,
    'first_name', p.first_name,
    'middle_name', p.middle_name,
    'last_name', p.last_name,
    'email_address', p.email_address,
    'mobile_number', p.mobile_number,
    'gender', p.gender,
    'civil_status', p.civil_status,
    'citizenship', p.citizenship,
    'birth_place', p.birth_place,
    'permanent_address', p.permanent_address,
    'mailing_address', p.mailing_address
  ),

  'education_background', COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', e.id,
        'level', e.level,
        'degree', e.degree,
        'school_name', e.school_name,
        'status', e.status,
        'year_graduated', e.year_graduated,
        'units_earned', e.units_earned
      ))
      FROM education_backgrounds e
      WHERE e.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'work_experience', COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', w.id,
        'company', w.company,
        'position', w.position,
        'department', w.department,
        'date_started', w.date_started,
        'date_ended', w.date_ended,
        'courses_handled', w.courses_handled,
        'salary', w.salary
      ))
      FROM work_experiences w
      WHERE w.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'credentials', COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', c.id,
        'title', c.title,
        'authority', c.authority,
        'number', c.number,
        'date_taken', c.date_taken,
        'valid_until', c.valid_until
      ))
      FROM credentials c
      WHERE c.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'government_ids', COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', g.id,
        'id_type', g.id_type,
        'id_number', g.id_number
      ))
      FROM government_ids g
      WHERE g.profile_id = p.id
    ),
    '[]'::jsonb
  ),

  'media_accounts', COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', m.id,
        'platform', m.platform,
        'link', m.link
      ))
      FROM media_accounts m
      WHERE m.profile_id = p.id
    ),
    '[]'::jsonb
  )

) AS profile_details

FROM user_profiles p
WHERE p.id = $1;
`;

const updatePersonalProfile = `
UPDATE user_profiles
SET first_name = $1,
    middle_name = $2,
    last_name = $3,
    gender = $4,
    birth_place = $5,
    civil_status = $6,
    citizenship = $7,
    religion = $8,
    mobile_number = $9,
    email_address = $10,
    permanent_address = $11,
    mailing_address = $12,
    landline_number = $13
WHERE id = $14;
`;

// Education Queries

const createEducationEntry = `
  INSERT INTO education_backgrounds (
    profile_id,
    school_name,
    level,
    degree,
    status,
    units_earned,
    year_graduated
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

const updateEducationEntry = `
  UPDATE education_backgrounds
  SET school_name = $2,
      level = $3,
      degree = $4,
      status = $5,
      units_earned = $6,
      year_graduated = $7
  WHERE id = $1 AND profile_id = $8
`;

const deleteEducationEntry = `
  DELETE FROM education_backgrounds
  WHERE id = $1 AND profile_id = $2
`;

export {
  getProfileDetails,
  updatePersonalProfile,
  createEducationEntry,
  updateEducationEntry,
  deleteEducationEntry,
};
