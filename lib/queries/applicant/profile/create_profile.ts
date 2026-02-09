export const createApplicantProfile = `
WITH inserted_user AS (
  INSERT INTO user_profiles (
    id,
    first_name,
    middle_name,
    last_name,
    honorific,
    sex,
    phone_number,
    birth_date,
    email_address,
    physical_address,
    citizenship,
    civil_status,
    about
  )
    SELECT
      $2,
      p.first_name,
      p.middle_name,
      p.last_name,
      p.honorific,
      p.sex,
      p.phone,
      CASE
        WHEN p.birthdate IS NULL OR p.birthdate = '' THEN NULL
        WHEN length(p.birthdate) = 7 THEN to_date(p.birthdate || '-01', 'YYYY-MM-DD')
        ELSE to_date(p.birthdate, 'YYYY-MM-DD')
      END,
      p.email,
      p.address,
      p.citizenship,
      p.civil_status,
      p.about
    FROM jsonb_to_record($1::jsonb -> 'personal') AS p(
      honorific TEXT,
      first_name TEXT,
      middle_name TEXT,
      last_name TEXT,
      sex TEXT,
      phone TEXT,
      birthdate TEXT,
      email TEXT,
      address TEXT,
      citizenship TEXT,
      civil_status TEXT,
      about TEXT
    )
  RETURNING id
),
ins_education AS (
  INSERT INTO educational_backgrounds (
    id,
    degree,
    institution,
    course,
    status,
    units_earned,
    year_finished,
    honors
  )
  SELECT
    u.id,
    e.degree,
    e.institution,
    e.course,
    e.status,
    e.units_earned,
    CASE
      WHEN e.year_finished IS NULL OR e.year_finished = '' THEN NULL
      WHEN length(e.year_finished) = 7 THEN split_part(e.year_finished, '-', 1)::int
      ELSE e.year_finished::int
    END,
    CASE
      WHEN e.honors IS NULL THEN NULL
      ELSE ARRAY(SELECT jsonb_array_elements_text(e.honors))
    END
  FROM inserted_user u
  JOIN jsonb_to_recordset(COALESCE($1::jsonb -> 'education', '[]')) AS e(
    degree TEXT,
    institution TEXT,
    course TEXT,
    status TEXT,
    units_earned INT,
    year_finished TEXT,
    honors JSONB
  ) ON TRUE
  RETURNING 1
),
ins_employment AS (
  INSERT INTO employment_histories (
    acc_id,
    job_title,
    position_specialization,
    company_name,
    industry,
    monthly_salary,
    date_started,
    date_ended
  )
  SELECT
    u.id,
    e.job_title,
    e.position_specialization,
    e.company_name,
    e.industry,
    e.monthly_salary,
    CASE
      WHEN e.date_started IS NULL OR e.date_started = '' THEN NULL
      WHEN length(e.date_started) = 7 THEN to_date(e.date_started || '-01', 'YYYY-MM-DD')
      ELSE to_date(e.date_started, 'YYYY-MM-DD')
    END,
    CASE
      WHEN e.date_ended IS NULL OR e.date_ended = '' THEN NULL
      WHEN length(e.date_ended) = 7 THEN to_date(e.date_ended || '-01', 'YYYY-MM-DD')
      ELSE to_date(e.date_ended, 'YYYY-MM-DD')
    END
  FROM inserted_user u
  JOIN jsonb_to_recordset(COALESCE($1::jsonb -> 'employment', '[]')) AS e(
    job_title TEXT,
    position_specialization TEXT,
    company_name TEXT,
    industry TEXT,
    monthly_salary NUMERIC,
    date_started TEXT,
    date_ended TEXT
  ) ON TRUE
  RETURNING 1
),
ins_licenses AS (
  INSERT INTO license_certifications (
    acc_id,
    title,
    issuing_organization,
    number,
    date_issued,
    expiry_date
  )
  SELECT
    u.id,
    c.title,
    c.issuing_organization,
    c.number,
    c.date_issued,
    NULLIF(c.expiry_date, '')
  FROM inserted_user u
  JOIN jsonb_to_recordset(
    COALESCE($1::jsonb -> 'licenses_certifications', '[]')
  ) AS c(
    title TEXT,
    issuing_organization TEXT,
    number TEXT,
    date_issued TEXT,
    expiry_date TEXT
  ) ON TRUE
  RETURNING 1
)
SELECT id FROM inserted_user;
`;

// -- =========================
// -- ATTACHMENTS
// -- =========================
// INSERT INTO user_attachments (
//   acc_id,
//   file_name,
//   file_url
// )
// SELECT
//   u.id,
//   a.file_name,
//   a.file_url
// FROM inserted_user u
// JOIN jsonb_to_recordset(COALESCE($1::jsonb -> 'attachments', '[]')) AS a(
//   file_name TEXT,
//   attachment JSONB
// ) ON TRUE;
