// src/components/SignupPage.tsx
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Form validation schemas using Zod
const menteeFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  careerGoal: z.string().min(1, { message: "Please select a career goal" }),
  technicalInterests: z.array(z.string()).min(1, { message: "Please select at least one technical interest" }),
  yearOfStudy: z.string().min(1, { message: "Please select your year of study" }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const mentorFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  expertise: z.array(z.string()).min(1, { message: "Please select at least one area of expertise" }),
  currentRole: z.string().min(2, { message: "Please enter your current role" }),
  graduationYear: z.string().min(4, { message: "Please enter a valid graduation year" }),
  linkedInProfile: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional().or(z.literal('')),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type MenteeFormValues = z.infer<typeof menteeFormSchema>;
type MentorFormValues = z.infer<typeof mentorFormSchema>;

// Technical interests and career goals data
const technicalInterests = [
  "Data Structures & Algorithms", 
  "Web Development", 
  "Mobile App Development",
  "Machine Learning",
  "Embedded Systems",
  "Cloud Computing",
  "Cybersecurity",
  "UI/UX Design"
];

const careerGoals = [
  "Software Development Engineer",
  "Core Electrical Engineer",
  "AI/ML Engineer",
  "Government Jobs",
  "MBA",
  "Research",
  "Product Management",
  "Consulting"
];

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("mentee");
  
  // Mentee form setup
  const menteeForm = useForm<MenteeFormValues>({
    resolver: zodResolver(menteeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      careerGoal: "",
      technicalInterests: [],
      yearOfStudy: "",
      agreeToTerms: true
    }
  });

  // Mentor form setup
  const mentorForm = useForm<MentorFormValues>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      expertise: [],
      currentRole: "",
      graduationYear: "",
      linkedInProfile: "",
      bio: "",
      agreeToTerms: true
    }
  });

  const onMenteeSubmit = (data: MenteeFormValues) => {
    console.log("Mentee form submitted:", data);
    // Here you would typically send the data to your backend
  };

  const onMentorSubmit = (data: MentorFormValues) => {
    console.log("Mentor form submitted:", data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Join Our Mentorship Platform</h1>
        <p className="text-center mb-8 text-gray-600">Connect with mentors who can guide you through your career journey or become a mentor to help others grow.</p>
        
        <Tabs defaultValue="mentee" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="mentee">Sign Up as Mentee</TabsTrigger>
            <TabsTrigger value="mentor">Sign Up as Mentor</TabsTrigger>
          </TabsList>

          {/* Mentee Signup Form */}
          <TabsContent value="mentee">
            <Card>
              <CardHeader>
                <CardTitle>Mentee Registration</CardTitle>
                <CardDescription>
                  Create an account to find the right mentor for your career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...menteeForm}>
                  <form onSubmit={menteeForm.handleSubmit(onMenteeSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={menteeForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={menteeForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={menteeForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={menteeForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={menteeForm.control}
                        name="careerGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Career Goal</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a career goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {careerGoals.map((goal) => (
                                  <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={menteeForm.control}
                        name="yearOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Study</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1st Year</SelectItem>
                                <SelectItem value="2">2nd Year</SelectItem>
                                <SelectItem value="3">3rd Year</SelectItem>
                                <SelectItem value="4">4th Year</SelectItem>
                                <SelectItem value="5+">5+ Year</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={menteeForm.control}
                      name="technicalInterests"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Technical Interests</FormLabel>
                            <FormDescription>
                              Select at least one area you're interested in learning
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {technicalInterests.map((interest) => (
                              <FormField
                                key={interest}
                                control={menteeForm.control}
                                name="technicalInterests"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={interest}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(interest)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, interest])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== interest
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {interest}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={menteeForm.control}
                      name="agreeToTerms"
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
                              I agree to the terms of service and privacy policy
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">Create Mentee Account</Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Already have an account? <a href="#" className="text-blue-600 hover:underline">Log In</a>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Mentor Signup Form */}
          <TabsContent value="mentor">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Registration</CardTitle>
                <CardDescription>
                  Create an account to help guide and mentor students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...mentorForm}>
                  <form onSubmit={mentorForm.handleSubmit(onMentorSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={mentorForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={mentorForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jane.smith@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={mentorForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={mentorForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={mentorForm.control}
                        name="currentRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={mentorForm.control}
                        name="graduationYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Graduation Year</FormLabel>
                            <FormControl>
                              <Input placeholder="2020" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={mentorForm.control}
                      name="linkedInProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mentorForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Tell us about your background, experience, and how you can help mentees" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mentorForm.control}
                      name="expertise"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Areas of Expertise</FormLabel>
                            <FormDescription>
                              Select the areas where you can mentor others
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {technicalInterests.map((interest) => (
                              <FormField
                                key={interest}
                                control={mentorForm.control}
                                name="expertise"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={interest}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(interest)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, interest])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== interest
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {interest}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mentorForm.control}
                      name="agreeToTerms"
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
                              I agree to the terms of service and privacy policy
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">Create Mentor Account</Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-gray-500">
                  Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Log In</a>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}