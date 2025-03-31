import { z } from "zod";
export const mentorFormSchema = z.object({
  profileImage: z.string().optional(),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  currentPosition: z
    .string()
    .min(2, { message: "Current position is required." }),
  company: z
    .string()
    .min(2, { message: "Company/institution name is required." }),
  experience: z
    .string()
    .min(1, { message: "Years of experience is required." }),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL." }),
  githubUrl: z
    .string()
    .url({ message: "Please enter a valid GitHub URL." })
    .optional(),
  careerExpertise: z
    .array(z.string())
    .min(1, { message: "Select at least one career area." }),
  technicalInterests: z
    .array(z.string())
    .min(1, { message: "Select at least one technical interest." }),
  academicBackground: z
    .string()
    .min(10, { message: "Please provide your academic background." }),
  extracurricularExpertise: z.array(z.string()).optional(),
  hoursPerWeek: z
    .string()
    .min(1, { message: "Please specify your availability." }),
  mentorshipDuration: z
    .string()
    .min(1, { message: "Please specify your commitment duration." }),
  preferredFormat: z
    .array(z.string())
    .min(1, { message: "Select at least one preferred format." }),
  shortBio: z
    .string()
    .min(50, { message: "Bio should be at least 50 characters." }),
  motivationStatement: z
    .string()
    .min(100, { message: "Please provide a detailed motivation statement." }),
  previousExperience: z.string().optional(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  acceptCodeOfConduct: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the mentor code of conduct.",
    }),
});

export type FormSchema = z.infer<typeof mentorFormSchema>;

export const careerOptions = [
    { value: "sde", label: "Software Development Engineer" },
    { value: "core_electrical", label: "Core Electrical Engineering" },
    { value: "aiml", label: "AI/ML Engineer" },
    { value: "govt_jobs", label: "Government Jobs" },
    { value: "mba", label: "MBA/Management" },
    { value: "research", label: "Research Scholar" },
    { value: "product_management", label: "Product Management" },
    { value: "data_science", label: "Data Science" },
];

export const technicalOptions = [
    { value: "dsa", label: "Data Structures & Algorithms" },
    { value: "web_dev", label: "Web Development" },
    { value: "embedded", label: "Embedded Systems" },
    { value: "networking", label: "Computer Networking" },
    { value: "cloud", label: "Cloud Computing" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "mobile_dev", label: "Mobile Development" },
    { value: "blockchain", label: "Blockchain" },
    { value: "iot", label: "Internet of Things" },
    { value: "devops", label: "DevOps" },
];

export const extracurricularOptions = [
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural Activities" },
    { value: "hackathons", label: "Hackathons & Coding Competitions" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "public_speaking", label: "Public Speaking" },
    { value: "leadership", label: "Leadership Programs" },
    { value: "community_service", label: "Community Service" },
    { value: "student_clubs", label: "Student Clubs & Organizations" },
];

export const formatOptions = [
    { value: "one_on_one", label: "One-on-One Sessions" },
    { value: "group", label: "Group Sessions" },
    { value: "workshops", label: "Workshops" },
    { value: "email", label: "Email Mentoring" },
    { value: "chat", label: "Chat Support" },
    { value: "project_based", label: "Project-Based Mentoring" },
];