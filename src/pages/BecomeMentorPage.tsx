// src/pages/BecomeMentor.tsx
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Github, Linkedin, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Zod schema for mentor form validation
const mentorFormSchema = z.object({
    // Personal Information
    profileImage: z.string().optional(),
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),

    // Professional Information
    currentPosition: z.string().min(2, { message: "Current position is required." }),
    company: z.string().min(2, { message: "Company/institution name is required." }),
    experience: z.string().min(1, { message: "Years of experience is required." }),
    linkedinUrl: z.string().url({ message: "Please enter a valid LinkedIn URL." }),
    githubUrl: z.string().url({ message: "Please enter a valid GitHub URL." }).optional(),

    // Mentorship Details
    careerExpertise: z.array(z.string()).min(1, { message: "Select at least one career area." }),
    technicalInterests: z.array(z.string()).min(1, { message: "Select at least one technical interest." }),
    academicBackground: z.string().min(10, { message: "Please provide your academic background." }),
    extracurricularExpertise: z.array(z.string()).optional(),

    // Availability & Commitment
    hoursPerWeek: z.string().min(1, { message: "Please specify your availability." }),
    mentorshipDuration: z.string().min(1, { message: "Please specify your commitment duration." }),
    preferredFormat: z.array(z.string()).min(1, { message: "Select at least one preferred format." }),

    // Additional Information
    shortBio: z.string().min(50, { message: "Bio should be at least 50 characters." }),
    motivationStatement: z.string().min(100, { message: "Please provide a detailed motivation statement." }),
    previousExperience: z.string().optional(),

    // Terms and Agreements
    acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
    acceptCodeOfConduct: z.boolean().refine(val => val === true, { message: "You must accept the mentor code of conduct." }),
});

type MentorFormValues = z.infer<typeof mentorFormSchema>;

const BecomeMentor: React.FC = () => {
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    // Initialize form with default values
    const form = useForm<MentorFormValues>({
        resolver: zodResolver(mentorFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            currentPosition: "",
            company: "",
            experience: "",
            linkedinUrl: "",
            githubUrl: "",
            careerExpertise: [],
            technicalInterests: [],
            academicBackground: "",
            extracurricularExpertise: [],
            hoursPerWeek: "",
            mentorshipDuration: "",
            preferredFormat: [],
            shortBio: "",
            motivationStatement: "",
            previousExperience: "",
            acceptTerms: false,
            acceptCodeOfConduct: false,
        },
    });

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                form.setValue("profileImage", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission handler
    const onSubmit = (data: MentorFormValues) => {
        console.log("Form submitted:", data);
        setFormSubmitted(true);
        // Here you would typically send the data to your API
    };

    // Career areas options
    const careerOptions = [
        { value: "sde", label: "Software Development Engineer" },
        { value: "core_electrical", label: "Core Electrical Engineering" },
        { value: "aiml", label: "AI/ML Engineer" },
        { value: "govt_jobs", label: "Government Jobs" },
        { value: "mba", label: "MBA/Management" },
        { value: "research", label: "Research Scholar" },
        { value: "product_management", label: "Product Management" },
        { value: "data_science", label: "Data Science" },
    ];

    // Technical interests options
    const technicalOptions = [
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

    // Extracurricular options
    const extracurricularOptions = [
        { value: "sports", label: "Sports" },
        { value: "cultural", label: "Cultural Activities" },
        { value: "hackathons", label: "Hackathons & Coding Competitions" },
        { value: "entrepreneurship", label: "Entrepreneurship" },
        { value: "public_speaking", label: "Public Speaking" },
        { value: "leadership", label: "Leadership Programs" },
        { value: "community_service", label: "Community Service" },
        { value: "student_clubs", label: "Student Clubs & Organizations" },
    ];

    // Mentorship format options
    const formatOptions = [
        { value: "one_on_one", label: "One-on-One Sessions" },
        { value: "group", label: "Group Sessions" },
        { value: "workshops", label: "Workshops" },
        { value: "email", label: "Email Mentoring" },
        { value: "chat", label: "Chat Support" },
        { value: "project_based", label: "Project-Based Mentoring" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Become a Mentor</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Share your knowledge and experience to help the next generation of professionals
                    </p>
                </div>

                {formSubmitted ? (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-center text-green-600 flex items-center justify-center gap-2">
                                <CheckCircle className="h-6 w-6" />
                                Application Submitted Successfully!
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center mb-4">
                                Thank you for applying to become a mentor. Our team will review your application
                                and get back to you within 3-5 business days.
                            </p>
                            <div className="flex justify-center">
                                <Button variant="outline" onClick={() => window.location.href = "/"}>
                                    Return to Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Mentor Application Form</CardTitle>
                            <CardDescription>
                                Fill out the form below to apply as a mentor. Fields marked with * are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                    <TabsTrigger value="professional">Professional</TabsTrigger>
                                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                                    <TabsTrigger value="commitment">Commitment</TabsTrigger>
                                </TabsList>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <TabsContent value="personal">
                                            <div className="space-y-6">
                                                <Alert className="mb-6">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <AlertTitle>Important</AlertTitle>
                                                    <AlertDescription>
                                                        Your profile information will be visible to mentees. Please ensure all details are accurate.
                                                    </AlertDescription>
                                                </Alert>

                                                <div className="flex flex-col items-center mb-6">
                                                    <div className="mb-4">
                                                        {previewImage ? (
                                                            <Avatar className="h-24 w-24">
                                                                <AvatarImage src={previewImage} alt="Profile preview" />
                                                                <AvatarFallback>ME</AvatarFallback>
                                                            </Avatar>
                                                        ) : (
                                                            <Avatar className="h-24 w-24">
                                                                <AvatarFallback>ME</AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                    </div>
                                                    <FormItem>
                                                        <FormLabel className="cursor-pointer">
                                                            <div className="flex items-center gap-2 px-4 py-2 border rounded-md bg-gray-50 hover:bg-gray-100">
                                                                <Upload className="h-4 w-4" />
                                                                <span>Upload Profile Picture</span>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                            />
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Please upload a professional profile picture
                                                        </FormDescription>
                                                    </FormItem>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="firstName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>First Name *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="John" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="lastName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Last Name *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Doe" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email Address *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="john.doe@example.com" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="phone"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Phone Number *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <Button type="button" onClick={() => {
                                                    const element = document.querySelector('[data-value="professional"]') as HTMLElement | null;
                                                    element?.click();
                                                }}>
                                                    Next: Professional Info
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="professional">
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="currentPosition"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Current Position *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Senior Software Engineer" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="company"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Company/Institution *</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Tech Solutions Inc." {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="experience"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Years of Experience *</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select years of experience" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="1-2">1-2 years</SelectItem>
                                                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                                                    <SelectItem value="5-10">5-10 years</SelectItem>
                                                                    <SelectItem value="10+">10+ years</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="linkedinUrl"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="flex items-center gap-2">
                                                                    <Linkedin className="h-4 w-4" />
                                                                    LinkedIn Profile URL *
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="githubUrl"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="flex items-center gap-2">
                                                                    <Github className="h-4 w-4" />
                                                                    GitHub Profile URL
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="https://github.com/johndoe" {...field} />
                                                                </FormControl>
                                                                <FormDescription>
                                                                    Optional, but recommended for technical mentors
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="academicBackground"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Academic Background *</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="B.Tech in Computer Science (2015-2019), M.Tech in AI (2019-2021)..."
                                                                    className="min-h-[100px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Please provide details about your education, degrees, and institutions
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="mt-6 flex justify-between">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => (document.querySelector('[data-value="personal"]') as HTMLElement)?.click()}
                                                >
                                                    Previous: Personal Info
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const element = document.querySelector('[data-value="expertise"]') as HTMLElement | null;
                                                        element?.click();
                                                    }}
                                                >
                                                    Next: Expertise
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="expertise">
                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="careerExpertise"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel>Career Expertise Areas *</FormLabel>
                                                                <FormDescription>
                                                                    Select the career areas where you can guide mentees
                                                                </FormDescription>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {careerOptions.map((option) => (
                                                                    <FormField
                                                                        key={option.value}
                                                                        control={form.control}
                                                                        name="careerExpertise"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={option.value}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(option.value)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                return checked
                                                                                                    ? field.onChange([...field.value, option.value])
                                                                                                    : field.onChange(
                                                                                                        field.value?.filter(
                                                                                                            (value) => value !== option.value
                                                                                                        )
                                                                                                    );
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                                        {option.label}
                                                                                    </FormLabel>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="technicalInterests"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel>Technical Expertise *</FormLabel>
                                                                <FormDescription>
                                                                    Select the technical areas where you have expertise
                                                                </FormDescription>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {technicalOptions.map((option) => (
                                                                    <FormField
                                                                        key={option.value}
                                                                        control={form.control}
                                                                        name="technicalInterests"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={option.value}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(option.value)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                return checked
                                                                                                    ? field.onChange([...field.value, option.value])
                                                                                                    : field.onChange(
                                                                                                        field.value?.filter(
                                                                                                            (value) => value !== option.value
                                                                                                        )
                                                                                                    );
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                                        {option.label}
                                                                                    </FormLabel>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="extracurricularExpertise"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel>Extracurricular Interests</FormLabel>
                                                                <FormDescription>
                                                                    Select areas where you can guide mentees outside academics/career
                                                                </FormDescription>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {extracurricularOptions.map((option) => (
                                                                    <FormField
                                                                        key={option.value}
                                                                        control={form.control}
                                                                        name="extracurricularExpertise"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={option.value}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(option.value)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                return checked
                                                                                                    ? field.onChange([...(field.value || []), option.value])
                                                                                                    : field.onChange(
                                                                                                        field.value?.filter(
                                                                                                            (value) => value !== option.value
                                                                                                        )
                                                                                                    );
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                                        {option.label}
                                                                                    </FormLabel>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="mt-6 flex justify-between">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => (document.querySelector('[data-value="professional"]') as HTMLElement)?.click()}
                                                >
                                                    Previous: Professional Info
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const element = document.querySelector('[data-value="commitment"]') as HTMLElement | null;
                                                        element?.click();
                                                    }}
                                                >
                                                    Next: Commitment
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="commitment">
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="hoursPerWeek"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Hours per Week *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select availability" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="1-2">1-2 hours</SelectItem>
                                                                        <SelectItem value="3-5">3-5 hours</SelectItem>
                                                                        <SelectItem value="5-10">5-10 hours</SelectItem>
                                                                        <SelectItem value="10+">10+ hours</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormDescription>
                                                                    Estimated time you can dedicate to mentoring per week
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="mentorshipDuration"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Mentorship Duration *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select duration" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="3_months">3 months</SelectItem>
                                                                        <SelectItem value="6_months">6 months</SelectItem>
                                                                        <SelectItem value="1_year">1 year</SelectItem>
                                                                        <SelectItem value="ongoing">Ongoing commitment</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormDescription>
                                                                    How long are you willing to commit to mentoring?
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="preferredFormat"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel>Preferred Mentoring Format *</FormLabel>
                                                                <FormDescription>
                                                                    Select all mentoring formats you're comfortable with
                                                                </FormDescription>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {formatOptions.map((option) => (
                                                                    <FormField
                                                                        key={option.value}
                                                                        control={form.control}
                                                                        name="preferredFormat"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={option.value}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(option.value)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                return checked
                                                                                                    ? field.onChange([...field.value, option.value])
                                                                                                    : field.onChange(
                                                                                                        field.value?.filter(
                                                                                                            (value) => value !== option.value
                                                                                                        )
                                                                                                    );
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                                        {option.label}
                                                                                    </FormLabel>
                                                                                </FormItem>
                                                                            );
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="shortBio"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Short Bio *</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Tell us about yourself, your journey, and what makes you a great mentor..."
                                                                    className="min-h-[100px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This will be visible on your mentor profile
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="motivationStatement"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Motivation for Mentoring *</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Why do you want to become a mentor? What do you hope to achieve?"
                                                                    className="min-h-[100px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Explain why you want to join our mentorship platform
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="previousExperience"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Previous Mentoring Experience</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Have you mentored others before? Tell us about your experience..."
                                                                    className="min-h-[100px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Optional. Share any past mentoring experience you have
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Separator className="my-6" />

                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="acceptTerms"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>
                                                                        I accept the terms and conditions *
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        By checking this box, you agree to our{" "}
                                                                        <a href="#" className="text-blue-600 hover:underline">
                                                                            Terms of Service
                                                                        </a>{" "}
                                                                        and{" "}
                                                                        <a href="#" className="text-blue-600 hover:underline">
                                                                            Privacy Policy
                                                                        </a>
                                                                    </FormDescription>
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="acceptCodeOfConduct"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>
                                                                        I accept the mentor code of conduct *
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        By checking this box, you agree to abide by our{" "}
                                                                        <a href="#" className="text-blue-600 hover:underline">
                                                                            Mentor Code of Conduct
                                                                        </a>
                                                                    </FormDescription>
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 flex justify-between">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const element = document.querySelector('[data-value="expertise"]') as HTMLElement | null;
                                                        element?.click();
                                                    }}
                                                >
                                                    Previous: Expertise
                                                </Button>
                                                <Button type="submit">Submit Application</Button>
                                            </div>
                                        </TabsContent>
                                    </form>
                                </Form>
                            </Tabs>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start border-t pt-6">
                            <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                                <li>Our team will review your application within 3-5 business days</li>
                                <li>You may be asked to participate in a brief video interview</li>
                                <li>Once approved, you'll be onboarded and matched with mentees based on your expertise</li>
                                <li>You'll gain access to our mentor resources, training materials, and community</li>
                            </ol>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    Need help? Contact{" "}
                                    <a href="mailto:mentor-support@example.com" className="text-blue-600 hover:underline">
                                        mentor-support@example.com
                                    </a>
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                )}

                <div className="mt-8">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="faq-1">
                            <AccordionTrigger>What is expected of mentors?</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Mentors are expected to provide guidance, support, and insights to mentees based on their expertise
                                    and experience. This includes regular check-ins, providing feedback on goals and progress, sharing
                                    resources, and being available during agreed-upon times for questions and discussions.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-2">
                            <AccordionTrigger>How are mentors matched with mentees?</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Our AI-based matching system analyzes mentor profiles and mentee requirements to create the most
                                    compatible matches. Factors considered include career goals, technical interests, academic background,
                                    extracurricular activities, and availability. Both mentors and mentees can provide feedback on matches
                                    to improve future recommendations.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-3">
                            <AccordionTrigger>What resources are provided to mentors?</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Mentors receive access to our mentorship guide, structured session templates, goal-setting
                                    frameworks, progress tracking tools, and a community of other mentors to share best practices.
                                    We also provide regular webinars and workshops to help mentors develop their mentoring skills.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-4">
                            <AccordionTrigger>Is there compensation for mentors?</AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    While mentorship is primarily a volunteer opportunity to give back to the community, active mentors
                                    can receive recognition through our Mentor Achievement Program, which includes certificates,
                                    profile badges, and opportunities to participate in exclusive events and networking opportunities.
                                    Some specialized mentorship programs may offer honorariums for extensive time commitments.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Why Become a Mentor?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="font-medium mb-2">Give Back to the Community</h3>
                            <p className="text-sm text-gray-600">
                                Share your knowledge and experience to help the next generation of professionals succeed.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="font-medium mb-2">Develop Leadership Skills</h3>
                            <p className="text-sm text-gray-600">
                                Mentoring others helps you enhance your own communication, leadership, and coaching abilities.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="font-medium mb-2">Expand Your Network</h3>
                            <p className="text-sm text-gray-600">
                                Connect with other mentors and professionals in your field, creating valuable relationships.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <h2 className="text-xl font-semibold mb-4">Our Star Mentors</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-16 w-16 mb-2">
                                <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Ravi Singh</p>
                            <p className="text-sm text-gray-600">Tech Lead at Google</p>
                            <div className="mt-1 flex gap-1">
                                <Badge variant="secondary">AI/ML</Badge>
                                <Badge variant="secondary">DSA</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-16 w-16 mb-2">
                                <AvatarFallback>PJ</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Priya Joshi</p>
                            <p className="text-sm text-gray-600">Product Manager at Microsoft</p>
                            <div className="mt-1 flex gap-1">
                                <Badge variant="secondary">MBA</Badge>
                                <Badge variant="secondary">Leadership</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-16 w-16 mb-2">
                                <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Arun Kumar</p>
                            <p className="text-sm text-gray-600">Research Scientist at IBM</p>
                            <div className="mt-1 flex gap-1">
                                <Badge variant="secondary">Research</Badge>
                                <Badge variant="secondary">Data Science</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeMentor;