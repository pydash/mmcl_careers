export const INSERT_APPLICATION_QUERY = `
INSERT INTO job_applications (acc_id, job_id, pitch)
VALUES ($1, $2, $3);
`;
