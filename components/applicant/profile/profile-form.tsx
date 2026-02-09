"use client";

// UI Components
import { Separator } from "@/components/ui/separator";

// React
import { useState } from "react";

// Forms
import PersonalForm from "./personal-form";
import EducationalForm from "./educational-form";
import EmploymentForm from "./employment-form";
import LicenseCertificationsForm from "./license-certifications-form";
import AttachmentsForm from "./attachments-form";

// Models
import {
  PersonalFormData,
  EducationalFormData,
  EmploymentFormData,
  LicenseCertificationFormData,
  AttachmentFormData,
} from "@/models/applicant/ProfileForms";
import { Button } from "@/components/ui/button";
import { useProfileCreate } from "@/hooks/applicant/profile/useProfileCreate";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const { createProfile, loading, error } = useProfileCreate();
  const router = useRouter();
  const [personalData, setPersonalData] = useState<PersonalFormData>({
    honorific: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    sex: "",
    phone: "",
    birthdate: null,
    email: "",
    address: "",
    citizenship: "",
    civil_status: "",
    about: "",
  });
  const [educData, setEducData] = useState<EducationalFormData[]>([]);
  const [employmentData, setEmploymentData] = useState<EmploymentFormData[]>(
    [],
  );
  const [licenseCertData, setLicenseCertData] = useState<
    LicenseCertificationFormData[]
  >([]);

  // const [attachmentsData, setAttachmentsData] = useState<AttachmentFormData[]>(
  //   [],
  // );

  function addEducationEntry(newEntry: EducationalFormData) {
    setEducData([...educData, newEntry]);
  }

  function deleteEducationEntry(index: number) {
    setEducData(educData.filter((_, i) => i !== index));
  }

  function addEmploymentEntry(newEntry: EmploymentFormData) {
    setEmploymentData([...employmentData, newEntry]);
  }

  function deleteEmploymentEntry(index: number) {
    setEmploymentData(employmentData.filter((_, i) => i !== index));
  }

  function addLicenseCertEntry(newEntry: LicenseCertificationFormData) {
    setLicenseCertData([...licenseCertData, newEntry]);
  }

  function deleteLicenseCertEntry(index: number) {
    setLicenseCertData(licenseCertData.filter((_, i) => i !== index));
  }

  // function addAttachmentEntry(newEntry: AttachmentFormData) {
  //   setAttachmentsData([...attachmentsData, newEntry]);
  // }

  // function deleteAttachmentEntry(index: number) {
  //   setAttachmentsData(attachmentsData.filter((_, i) => i !== index));
  // }

  const buildPayload = () => {
    const payload = {
      personal: personalData,
      education: educData,
      employment: employmentData,
      licenses_certifications: licenseCertData,
      // attachments: attachmentsData,
    };
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildPayload();
    console.log(payload);

    try {
      await createProfile(payload);
      router.push("/applicant/");
    } catch (err) {
      alert("An error occurred while creating the profile.");
      console.error("Profile creation error:", err);
    }
  };

  function clearAllFields() {
    setPersonalData({
      honorific: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      sex: "",
      phone: "",
      birthdate: null,
      email: "",
      address: "",
      citizenship: "",
      civil_status: "",
      about: "",
    });
    setEducData([]);
    setEmploymentData([]);
    setLicenseCertData([]);
    // setAttachmentsData([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="mb-4">
        <h1 className="font-semibold">Personal Information</h1>
        <Separator className="my-4" />
        <PersonalForm
          personalData={personalData}
          onPersonalDataChange={setPersonalData}
        />
      </section>
      <section className="mb-4">
        <h1 className="font-semibold">Educational Background</h1>
        <Separator className="my-4" />
        <EducationalForm
          educationalData={educData}
          onAddEducation={addEducationEntry}
          onDeleteEducation={deleteEducationEntry}
        />
      </section>
      <section className="mb-4">
        <h1 className="font-semibold">Employment Background</h1>
        <Separator className="my-4" />
        <EmploymentForm
          employmentData={employmentData}
          onAddEmployment={addEmploymentEntry}
          onDeleteEmployment={deleteEmploymentEntry}
        />
      </section>
      <section className="mb-4">
        <h1 className="font-semibold">License & Certifications</h1>
        <Separator className="my-4" />
        <LicenseCertificationsForm
          licenseCertificationData={licenseCertData}
          onAddLicenseCertification={addLicenseCertEntry}
          onDeleteLicenseCertification={deleteLicenseCertEntry}
        />
      </section>
      {/* <section className="mb-4">
        <h1 className="font-semibold">Attachments</h1>
        <Separator className="my-4" />
        <AttachmentsForm
          attachmentsData={attachmentsData}
          onAddAttachment={addAttachmentEntry}
          onDeleteAttachment={deleteAttachmentEntry}
        />
      </section> */}
      <Separator className="my-4" />
      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Profile
        </Button>
        <Button type="button" onClick={clearAllFields} variant="outline">
          Clear All
        </Button>
      </div>
    </form>
  );
}
