const getAllJobs = `
SELECT
    *
FROM job_posts
ORDER BY expiry_date DESC;
`;

export { getAllJobs };
