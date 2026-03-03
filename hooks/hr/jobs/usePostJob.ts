import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJob } from "@/services/hr/jobs/postJob";
import { type PostJobData } from "@/models/PostJob";
import { type JobFormData, initialJobFormData } from "@/models/JobForm";

export function usePostJob() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(initialJobFormData);

  const handleInputChange = (
    nameOrEvent:
      | string
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string,
  ) => {
    let fieldName = "";
    let fieldValue = "";

    if (typeof nameOrEvent === "string") {
      fieldName = nameOrEvent;
      fieldValue = value || "";
    } else {
      fieldName = nameOrEvent.target.name;
      fieldValue = nameOrEvent.target.value;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): void => {
    if (!formData.position.trim()) {
      throw new Error("Job position is required");
    }
    if (!formData.description.trim()) {
      throw new Error("Job description is required");
    }
    if (!formData.expiration_date) {
      throw new Error("Application deadline is required");
    }
    if (!formData.employment_type) {
      throw new Error("Employment type is required");
    }
    if (!formData.department) {
      throw new Error("Department is required");
    }

    // Validate salary only if provided
    if (formData.salary) {
      const salary = parseInt(formData.salary);
      if (isNaN(salary) || salary < 0) {
        throw new Error("Salary must be a valid positive number");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      validateForm();

      const jobData: PostJobData = {
        is_open: formData.is_open === "true",
        position: formData.position.trim(),
        employment_type: formData.employment_type,
        department: formData.department,
        expiration_date: formData.expiration_date,
        description: formData.description.trim(),
        salary: formData.salary ? parseInt(formData.salary) : null,
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
