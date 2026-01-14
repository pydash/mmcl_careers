import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJob, type PostJobData } from "@/services/hr/jobs/postJob";
import { type JobFormData, initialJobFormData } from "@/models/JobForm";

export function usePostJob() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(initialJobFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): void => {
    if (!formData.title.trim()) {
      throw new Error("Job title is required");
    }
    if (!formData.description.trim()) {
      throw new Error("Job description is required");
    }
    if (!formData.responsibilities.trim()) {
      throw new Error("Responsibilities are required");
    }
    if (!formData.requirements.trim()) {
      throw new Error("Requirements are required");
    }
    if (!formData.deadline_date) {
      throw new Error("Application deadline is required");
    }
    if (!formData.salary_min || !formData.salary_max) {
      throw new Error("Salary range is required");
    }

    const salaryMin = parseInt(formData.salary_min);
    const salaryMax = parseInt(formData.salary_max);

    if (isNaN(salaryMin) || isNaN(salaryMax)) {
      throw new Error("Salary values must be valid numbers");
    }

    if (salaryMin > salaryMax) {
      throw new Error("Minimum salary cannot be greater than maximum salary");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      validateForm();

      const jobData: PostJobData = {
        is_active: formData.is_active === "true",
        title: formData.title.trim(),
        job_type: formData.job_type,
        department: formData.department,
        deadline_date: formData.deadline_date,
        description: formData.description.trim(),
        responsibilities: formData.responsibilities.trim(),
        requirements: formData.requirements.trim(),
        salary_min: parseInt(formData.salary_min),
        salary_max: parseInt(formData.salary_max),
      };

      await postJob(jobData);
      setSuccess(true);

      setTimeout(() => {
        router.push("/hr/jobs");
        router.refresh();
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
}
