import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJob } from "@/services/hr/jobs/postJob";
import { JobForm } from "@/models/Job";

const initialJobFormData: JobForm = {
  title: "",
  department: "",
  employment_type: "Full time",
  description: "",
  requirements: "",
  responsibilities: "",
  salary: null,
  status: "Open",
  expiry_date: null,
  teaching_type: "Teaching",
  open_vacancies: null,
};

export function usePostJob() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<JobForm>(initialJobFormData);

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

  const validateForm = () => {
    if (!formData.title.trim()) {
      throw new Error("Job title is required");
    }
    if (!formData.description.trim()) {
      throw new Error("Job description is required");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      validateForm();

      const jobData: JobForm = {
        status: formData.status,
        title: formData.title.trim(),
        employment_type: formData.employment_type,
        department: formData.department,
        expiry_date: formData.expiry_date,
        description: formData.description.trim(),
        responsibilities: formData.responsibilities?.trim(),
        requirements: formData.requirements?.trim(),
        salary: formData.salary ? formData.salary : null,
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
