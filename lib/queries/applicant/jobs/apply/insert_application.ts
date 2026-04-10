export const INSERT_APPLICATION_QUERY = `
INSERT INTO applications (profile_id, job_id, pitch)
VALUES ($1, $2, $3);
`;
