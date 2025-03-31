import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { FormSchema, mentorFormSchema } from "@/types/mentor";
import { SuccessMessage } from "@/components/becomeMentor/Success-Message";
import { PersonalInfoForm } from "@/components/becomeMentor/PersonalInfoForm";
import { ProfessionalInfoForm } from "@/components/becomeMentor/ProfessionalinfoForm";
import { ExpertiseForm } from "@/components/becomeMentor/ExpertiseForm";
import { CommitmentForm } from "@/components/becomeMentor/CommitmentForm";
import MentorFAQ from "@/components/becomeMentor/MentorFAQ";
import MentorBenefits from "@/components/becomeMentor/MentorBenefits";
import StarMentors from "@/components/becomeMentor/StarMentors";

const BecomeMentor: React.FC = () => {
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    // Initialize form with default values
    const form = useForm<FormSchema>({
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
    const onSubmit = (data: FormSchema) => {
        console.log("Form submitted:", data);
        setFormSubmitted(true);
        // Here you would typically send the data to your API
    };

    // Navigate to next tab
    const navigateToTab = (tabValue: string) => {
        const element = document.querySelector(`[data-value="${tabValue}"]`) as HTMLElement | null;
        if (element) element.click();
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Become a Mentor</CardTitle>
                    <CardDescription className="text-lg mt-2">
                        Share your knowledge and experience to help the next generation of professionals
                    </CardDescription>
                </CardHeader>

                {formSubmitted ? (
                    <SuccessMessage />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Mentor Application Form</CardTitle>
                            <CardDescription>
                                Fill out the form below to apply as a mentor. Fields marked with * are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="personal">
                                <TabsList className="grid grid-cols-4 mb-8">
                                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                    <TabsTrigger value="professional">Professional</TabsTrigger>
                                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                                    <TabsTrigger value="commitment">Commitment</TabsTrigger>
                                </TabsList>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <TabsContent value="personal">
                                            <PersonalInfoForm
                                                form={form}
                                                previewImage={previewImage}
                                                handleImageChange={handleImageChange}
                                                navigateToTab={navigateToTab}
                                            />
                                        </TabsContent>

                                        <TabsContent value="professional">
                                            <ProfessionalInfoForm
                                                form={form}
                                                navigateToTab={navigateToTab}
                                            />
                                        </TabsContent>

                                        <TabsContent value="expertise">
                                            <ExpertiseForm
                                                form={form}
                                                navigateToTab={navigateToTab}
                                            />
                                        </TabsContent>

                                        <TabsContent value="commitment">
                                            <CommitmentForm
                                                form={form}
                                                navigateToTab={navigateToTab}
                                            />
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
                    <MentorFAQ />
                </div>

                <div className="mt-8">
                    <MentorBenefits />
                </div>

                <div className="mt-8">
                    <StarMentors />
                </div>
            </div>
        </div>
    );
};

export default BecomeMentor;