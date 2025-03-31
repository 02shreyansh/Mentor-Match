// src/components/FindMentorPage.tsx
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl,  
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Zod schema for the filter form
const mentorFilterSchema = z.object({
  careerPath: z.string().optional(),
  technicalInterests: z.array(z.string()).optional(),
  experienceLevel: z.string().optional(),
  availabilityRange: z.array(z.number()).optional(),
  searchQuery: z.string().optional(),
});

type MentorFilterValues = z.infer<typeof mentorFilterSchema>;

// Mock data for dropdowns
const careerPaths = [
  "Software Development Engineer",
  "Core Electrical Engineer",
  "AI/ML Engineer",
  "Government Jobs",
  "MBA",
  "Research",
  "Product Management",
  "Consulting"
];

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

const experienceLevels = [
  "0-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years"
];

// Mock mentor data
const mockMentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Software Engineer at TechCorp",
    experience: "7 years",
    expertise: ["Web Development", "Data Structures & Algorithms", "Cloud Computing"],
    rating: 4.9,
    totalSessions: 45,
    availability: "High (15+ hours/week)",
    about: "Full-stack developer with experience in scaling applications. Passionate about helping new developers navigate their career path.",
    imageUrl: ""
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "AI Research Scientist at DataLabs",
    experience: "5 years",
    expertise: ["Machine Learning", "Data Science", "Python"],
    rating: 4.7,
    totalSessions: 32,
    availability: "Medium (5-10 hours/week)",
    about: "PhD in Computer Science specializing in deep learning. I enjoy breaking down complex ML concepts for beginners.",
    imageUrl: ""
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Manager at InnoTech",
    experience: "8 years",
    expertise: ["Product Management", "UI/UX Design", "Agile Methodologies"],
    rating: 4.8,
    totalSessions: 51,
    availability: "Low (1-5 hours/week)",
    about: "Former developer turned product manager. I can help you understand the transition and skills needed for PM roles.",
    imageUrl: ""
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Embedded Systems Engineer at IoT Solutions",
    experience: "10+ years",
    expertise: ["Embedded Systems", "Hardware Design", "C/C++"],
    rating: 4.6,
    totalSessions: 28,
    availability: "Medium (5-10 hours/week)",
    about: "Hardware enthusiast with experience in various microcontroller platforms. I love helping students with practical embedded projects.",
    imageUrl: ""
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    role: "Cybersecurity Analyst at SecureNet",
    experience: "6 years",
    expertise: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    rating: 4.8,
    totalSessions: 37,
    availability: "High (15+ hours/week)",
    about: "Certified security professional passionate about teaching defensive security principles to the next generation.",
    imageUrl: ""
  }
];

export default function FindMentorPage() {
  const [mentors, setMentors] = useState(mockMentors);
  const [filteredMentors, setFilteredMentors] = useState(mockMentors);

  // Setup form with Zod validation
  const form = useForm<MentorFilterValues>({
    resolver: zodResolver(mentorFilterSchema),
    defaultValues: {
      careerPath: '',
      technicalInterests: [],
      experienceLevel: '',
      availabilityRange: [5, 15],
      searchQuery: '',
    }
  });

  // Handle form submission
  const onSubmit = (data: MentorFilterValues) => {
    console.log("Filter applied:", data);
    
    // Filter the mentors based on the form data
    let filtered = [...mentors];
    
    // Filter by career path if selected
    if (data.careerPath) {
      filtered = filtered.filter(mentor => 
        mentor.expertise.some(exp => exp.toLowerCase().includes(data.careerPath!.toLowerCase()))
      );
    }
    
    // Filter by technical interests if any selected
    if (data.technicalInterests && data.technicalInterests.length > 0) {
      filtered = filtered.filter(mentor => 
        data.technicalInterests!.some(interest => 
          mentor.expertise.some(exp => exp.toLowerCase().includes(interest.toLowerCase()))
        )
      );
    }
    
    // Filter by experience level if selected
    if (data.experienceLevel) {
      filtered = filtered.filter(mentor => {
        const mentorYears = parseInt(mentor.experience.split(' ')[0]);
        const [min, max] = data.experienceLevel!.split('-').map(val => {
          if (val.includes('+')) return 100; // Handle "10+" case
          return parseInt(val);
        });
        return mentorYears >= min && mentorYears <= max;
      });
    }
    
    // Filter by search query if provided
    if (data.searchQuery && data.searchQuery.trim() !== '') {
      const query = data.searchQuery.toLowerCase();
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(query) || 
        mentor.role.toLowerCase().includes(query) || 
        mentor.about.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query))
      );
    }
    
    // Update filtered mentors state
    setFilteredMentors(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    form.reset({
      careerPath: '',
      technicalInterests: [],
      experienceLevel: '',
      availabilityRange: [5, 15],
      searchQuery: '',
    });
    setFilteredMentors(mentors);
  };

  // Handle mentorship request
  const requestMentorship = (mentorId: number) => {
    console.log(`Requesting mentorship from mentor with ID: ${mentorId}`);
    // In a real application, you would send a request to the backend
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Find Your Ideal Mentor</h1>
        <p className="text-gray-600 mb-8">
          Connect with experienced professionals who can guide you through your career journey
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filter sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Filter Mentors</CardTitle>
                <CardDescription>
                  Narrow down mentors based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="searchQuery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Search</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Search by name, role, or skills..." 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="career-path">
                        <AccordionTrigger>Career Path</AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name="careerPath"
                            render={({ field }) => (
                              <FormItem>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select career path" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {careerPaths.map((path) => (
                                      <SelectItem key={path} value={path}>{path}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="technical-interests">
                        <AccordionTrigger>Technical Interests</AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name="technicalInterests"
                            render={() => (
                              <FormItem>
                                <div className="space-y-2">
                                  {technicalInterests.map((interest) => (
                                    <FormField
                                      key={interest}
                                      control={form.control}
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
                                                    ? field.onChange([...(field.value || []), interest])
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
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="experience">
                        <AccordionTrigger>Experience Level</AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name="experienceLevel"
                            render={({ field }) => (
                              <FormItem>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {experienceLevels.map((level) => (
                                      <SelectItem key={level} value={level}>{level}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="availability">
                        <AccordionTrigger>Availability</AccordionTrigger>
                        <AccordionContent>
                          <FormField
                            control={form.control}
                            name="availabilityRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hours per week</FormLabel>
                                <FormControl>
                                  <Slider
                                    defaultValue={field.value}
                                    max={20}
                                    step={1}
                                    onValueChange={field.onChange}
                                    className="py-4"
                                  />
                                </FormControl>
                                <div className="flex justify-between text-sm">
                                  <span>1 hour</span>
                                  <span>10 hours</span>
                                  <span>20+ hours</span>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button type="submit" className="flex-1">Apply Filters</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={resetFilters}
                        className="flex-1"
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Mentor listing */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredMentors.length} {filteredMentors.length === 1 ? 'Mentor' : 'Mentors'} Available
              </h2>
              <Select defaultValue="rating">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="experience">Sort by Experience</SelectItem>
                  <SelectItem value="sessions">Sort by Sessions</SelectItem>
                  <SelectItem value="availability">Sort by Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredMentors.length > 0 ? (
              <div className="space-y-6">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-start">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage src={mentor.imageUrl} />
                            <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.role}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-gray-600">{mentor.rating}</span>
                              </div>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-gray-600">{mentor.totalSessions} sessions</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-gray-600">{mentor.experience} experience</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-gray-700">{mentor.about}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-6 flex flex-col justify-between md:w-1/3">
                        <div>
                          <h4 className="font-medium mb-2">Availability</h4>
                          <p className="text-gray-600 mb-4">{mentor.availability}</p>
                          
                          <h4 className="font-medium mb-2">Common Session Topics</h4>
                          <ul className="text-gray-600 text-sm list-disc pl-4 mb-6">
                            <li>Career guidance</li>
                            <li>Technical interviews</li>
                            <li>Project reviews</li>
                            <li>Industry insights</li>
                          </ul>
                        </div>
                        
                        <div className="mt-auto">
                          <Button 
                            className="w-full" 
                            onClick={() => requestMentorship(mentor.id)}
                          >
                            Request Mentorship
                          </Button>
                          <Button variant="outline" className="w-full mt-2">
                            View Full Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">No mentors found</h3>
                  <p className="text-gray-600 mt-1 mb-4">Try adjusting your filters to find mentors that match your criteria</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </Card>
            )}
            
            {filteredMentors.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-2">Previous</Button>
                <Button variant="outline" className="mx-2">Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}