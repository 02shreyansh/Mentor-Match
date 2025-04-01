import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Users 
} from 'lucide-react';

// Create a schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  userType: z.enum(["mentee", "mentor", "other"]),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      userType: 'mentee',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form data submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Contact Us</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Have questions about our mentorship platform? Reach out to our team and we'll get back to you shortly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
              <CardDescription>
                We're here to help with any questions you may have.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-500">support@mentorshipplatform.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-500">+1 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-500">
                    123 Mentorship Drive,<br />
                    Education Valley, CA 94025
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-4">
                <p className="text-sm font-medium">Connect With Us</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Building2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="contact">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          {...register("name")} 
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email")}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (123) 456-7890"
                          {...register("phone")}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="userType">I am a</Label>
                        <Select defaultValue="mentee" {...register("userType")}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="mentee">Mentee (Junior)</SelectItem>
                              <SelectItem value="mentor">Mentor (Senior)</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        {...register("subject")}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your inquiry in detail..."
                        rows={5}
                        {...register("message")}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => reset()}>
                    Clear Form
                  </Button>
                  <Button 
                    type="submit" 
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </CardFooter>
                {isSuccess && (
                  <div className="bg-green-100 text-green-700 p-4 mx-6 mb-6 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find quick answers to common questions about our mentorship platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">How does the matching system work?</h3>
                    <p className="text-sm text-gray-600">
                      Our AI-based matching system analyzes your career goals, technical interests, academic performance, 
                      and extracurricular activities to recommend the most suitable mentors.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Can I be both a mentor and a mentee?</h3>
                    <p className="text-sm text-gray-600">
                      Yes! Many platform members serve as mentors in areas where they excel while seeking mentorship
                      in areas where they want to grow.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">How is my data protected on the platform?</h3>
                    <p className="text-sm text-gray-600">
                      We take data privacy seriously. All personal information is encrypted, and we never share your
                      data with third parties without explicit consent.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Is the platform completely free?</h3>
                    <p className="text-sm text-gray-600">
                      The basic features are free for all users. Premium features like advanced goal tracking and
                      priority matching are available through subscription plans.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All FAQs
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;