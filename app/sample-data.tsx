// Dashboard sample data

import { UserPlus, MessagesSquare, HandCoins, Handshake } from "lucide-react";
const overviewData = [
  { title: "Total Users", content: "1,234", icon: UserPlus },
  { title: "Active Sessions", content: "567", icon: MessagesSquare },
  { title: "New Signups", content: "89", icon: Handshake },
  { title: "Revenue", content: "$12,345", icon: HandCoins },
];
const upcomingInterviewData = [
  {
    position: "Frontend Developer",
    time: "10:00 AM",
    date: "7 Oct 2024",
  },
  {
    position: "Backend Developer",
    time: "2:00 PM",
    date: "8 Oct 2024",
  },
];

const recentApplicationsData = [
  {
    jobTitle: "Software Engineer",
    status: "Pending",
    dateApplied: "5 Oct 2024",
  },
  { jobTitle: "Data Analyst", status: "Reviewed", dateApplied: "3 Oct 2024" },
];

const dashboardResumeData = {
  fileName: "myresume.pdf",
  uploadDate: "1 Oct 2024",
};

const exploreJobsData = [
  { jobTitle: "Full Stack Developer", tags: ["JavaScript", "React"] },
  { jobTitle: "UI/UX Designer", tags: ["Figma", "Adobe XD"] },
];

export {
  overviewData,
  upcomingInterviewData,
  recentApplicationsData,
  dashboardResumeData,
  exploreJobsData,
};

// Jobs sample data

const jobsData = [
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "Remote"],
    title: "Senior Software Engineer",
    description: "Develop and maintain software applications.",
    salaryRange: "₱50,000 - ₱70,000",
    datePosted: "2023-10-01",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Part-time", "On-site"],
    title: "Junior Developer",
    description: "Assist in the development of software applications.",
    salaryRange: "₱30,000 - ₱45,000",
    datePosted: "2023-09-15",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Contract", "Hybrid"],
    title: "UI/UX Designer",
    description: "Design user interfaces and improve user experience.",
    salaryRange: "₱40,000 - ₱60,000",
    datePosted: "2023-09-10",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "Remote"],
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets.",
    salaryRange: "₱60,000 - ₱80,000",
    datePosted: "2023-09-05",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "On-site"],
    title: "DevOps Engineer",
    description: "Manage and automate IT infrastructure.",
    salaryRange: "₱55,000 - ₱75,000",
    datePosted: "2023-09-01",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Part-time", "Hybrid"],
    title: "Marketing Specialist",
    description: "Develop and implement marketing strategies.",
    salaryRange: "₱35,000 - ₱50,000",
    datePosted: "2023-08-28",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Contract", "Remote"],
    title: "Content Writer",
    description: "Create engaging content for various platforms.",
    salaryRange: "₱25,000 - ₱40,000",
    datePosted: "2023-08-20",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "On-site"],
    title: "Project Manager",
    description: "Oversee project planning and execution.",
    salaryRange: "₱70,000 - ₱90,000",
    datePosted: "2023-08-15",
  },
];

const menu = [
  {
    title: "Category",
    options: ["Teaching", "Non-teaching"],
  },
  {
    title: "Job Type",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    title: "Location",
    options: ["Remote", "On-site", "Hybrid"],
  },
  {
    title: "Department",
    options: ["IT", "Marketing", "HR", "Finance", "Operations"],
  },
];

export { jobsData, menu };

// Applications sample data

const applicationsData = [
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "Remote"],
    title: "Senior Software Engineer",
    description: "Develop and maintain software applications.",
    salaryRange: "₱50,000 - ₱70,000",
    dateApplied: "2023-10-01",
    status: "Under Review",
    applicationId: "APP-001",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Part-time", "On-site"],
    title: "Junior Developer",
    description: "Assist in the development of software applications.",
    salaryRange: "₱30,000 - ₱45,000",
    dateApplied: "2023-09-15",
    status: "Under Review",
    applicationId: "APP-002",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Contract", "Hybrid"],
    title: "UI/UX Designer",
    description: "Design user interfaces and improve user experience.",
    salaryRange: "₱40,000 - ₱60,000",
    dateApplied: "2023-09-10",
    status: "Under Review",
    applicationId: "APP-003",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "Remote"],
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets.",
    salaryRange: "₱60,000 - ₱80,000",
    dateApplied: "2023-09-05",
    status: "Under Review",
    applicationId: "APP-004",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "On-site"],
    title: "DevOps Engineer",
    description: "Manage and automate IT infrastructure.",
    salaryRange: "₱55,000 - ₱75,000",
    dateApplied: "2023-09-01",
    status: "Under Review",
    applicationId: "APP-005",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Part-time", "Hybrid"],
    title: "Marketing Specialist",
    description: "Develop and implement marketing strategies.",
    salaryRange: "₱35,000 - ₱50,000",
    dateApplied: "2023-08-28",
    status: "Under Review",
    applicationId: "APP-006",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Contract", "Remote"],
    title: "Content Writer",
    description: "Create engaging content for various platforms.",
    salaryRange: "₱25,000 - ₱40,000",
    dateApplied: "2023-08-20",
    status: "Under Review",
    applicationId: "APP-007",
  },
  {
    imgPath: "/placeholder.png",
    badges: ["Full-time", "On-site"],
    title: "Project Manager",
    description: "Oversee project planning and execution.",
    salaryRange: "₱70,000 - ₱90,000",
    dateApplied: "2023-08-15",
    status: "Under Review",
    applicationId: "APP-008",
  },
];

const applicationsMenu = [
  {
    title: "Status",
    options: ["Applied", "Interviewing", "Offered", "Rejected"],
  },
  {
    title: "Date Applied",
    options: ["Last 24 hours", "Last 7 days", "Last 30 days"],
  },
  {
    title: "Type",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
  },
];

export { applicationsData, applicationsMenu };

const userData = {
  account: {
    email: "user@example.com",
    password: "qwerty123",
  },

  basic: {
    name: "User Name",
    email: "user@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    about:
      "This is a sample about section for the user profile. It provides a brief introduction about the user. You can customize this text to include more details about the user's background, interests, and other relevant information. Feel free to modify it as needed.",
    dateOfBirth: "1990-01-01",
    gender: "Female",
    civilStatus: "Single",
    socialMedia: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/sarabusing.daniel",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/danielmarkk_/",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/username",
      },
    ],
  },
  educational: {
    graduateStudies: {
      institution: "University of the Philippines",
      degree: "Doctor of Philosophy",
      major: "Computer Science",
      yearGraduated: "2020",
      achievements: "Best Thesis Award, Dean's Lister",
    },
    undergraduateStudies: {
      institution: "Ateneo de Manila University",
      degree: "Bachelor of Science",
      major: "Information Technology",
      yearGraduated: "2015",
      achievements: "Cum Laude, Dean's Lister",
    },
  },
  credentials: {
    licenses: [
      {
        name: "Professional License",
        issuingOrganization: "Professional Regulation Commission",
        licenseNumber: "123456789",
        issueDate: "2021-01-01",
      },
      {
        name: "Professional Teaching License",
        issuingOrganization: "Professional Regulation Commission",
        licenseNumber: "987654321",
        issueDate: "2018-05-15",
      },
    ],
    certifications: [
      {
        name: "Certified Project Manager",
        issuingOrganization: "Project Management Institute",
        certificateNumber: "PMI-123456",
        issueDate: "2019-03-10",
      },
      {
        name: "Certified Scrum Master",
        issuingOrganization: "Scrum Alliance",
        certificateNumber: "CSM-654321",
        issueDate: "2020-07-22",
      },
    ],
  },
  employment: [
    {
      company: "Tech Solutions Inc.",
      industry: "Information Technology",
      position: "Senior Software Engineer",
      employmentPeriod: "June 2020 - Present",
      salary: "₱80,000 - ₱100,000",
    },
    {
      company: "Web Innovations Ltd.",
      industry: "Web Development",
      position: "Frontend Developer",
      employmentPeriod: "August 2015 - June 2020",
      salary: "₱50,000 - ₱70,000",
    },
  ],
  skills: {
    technicalSkills: ["JavaScript", "React", "TypeScript"],
    softSkills: ["Communication", "Teamwork", "Problem-solving"],
  },
  attachments: [
    {
      fileName: "Resume.pdf",
      fileType: "PDF",
      fileSize: "500KB",
      uploadDate: "2023-08-01",
    },
    {
      fileName: "CoverLetter.docx",
      fileType: "Word Document",
      fileSize: "200KB",
      uploadDate: "2023-08-02",
    },
  ],
};

export { userData };
