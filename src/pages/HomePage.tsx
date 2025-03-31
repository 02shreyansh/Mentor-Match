import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Award, Calendar, MessageSquare, BarChart, Shield, User } from 'lucide-react';
import { Link } from "react-router-dom";

const HomePage = () => {
    const careerPaths = [
        { id: "sde", title: "Software Development", icon: <Code className="h-5 w-5" />,image:"https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "electrical", title: "Core Electrical", icon: <BarChart className="h-5 w-5" /> , image:"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "aiml", title: "AI & Machine Learning", icon: <BookOpen className="h-5 w-5" /> ,image:"https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "govt", title: "Government Jobs", icon: <Shield className="h-5 w-5" /> ,image:"https://images.unsplash.com/photo-1585236894319-4c6e2d6b9e3e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { id: "mba", title: "MBA", icon: <Award className="h-5 w-5" /> , image:"https://plus.unsplash.com/premium_photo-1683749808307-e5597ac69f1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ];

    const featuredMentors = [
        {
            name: "Priya Sharma",
            role: "SDE at Google",
            specialty: "Web Development",
            rating: 4.9,
            mentees: 24,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            name: "Rahul Verma",
            role: "ML Engineer",
            specialty: "AI & Machine Learning",
            rating: 4.8,
            mentees: 18,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Anika Patel",
            role: "IAS Officer",
            specialty: "Government Exams",
            rating: 4.7,
            mentees: 32,
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        },
    ];

    return (
        <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <section className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8">
                <div className="space-y-6 lg:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Find Your Perfect <span className="text-primary">Mentor</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Connect with experienced seniors who have been where you want to go. Get personalized guidance to achieve your academic and career goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg"><Link to={"/findMentor"}>Find a Mentor</Link></Button>
                        <Button size="lg" variant="outline"><Link to={"/becomeMentor"}>Become a Mentor</Link></Button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Mentorship illustration"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
            </section>
            <section className="py-8">
                <h2 className="text-3xl font-bold text-center mb-12">How MentorMatch Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="flex flex-col items-center text-center">
                        <CardHeader>
                            <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                                <User className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>Create Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Tell us about your academic background, interests, and what you're looking to achieve.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center text-center">
                        <CardHeader>
                            <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>Get Matched</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Our AI system pairs you with seniors who align with your goals and interests.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center text-center">
                        <CardHeader>
                            <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4">
                                <MessageSquare className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>Start Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Schedule sessions, set goals, and receive personalized guidance from your mentor.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <section className="py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Explore Career Paths</h2>
                <Tabs defaultValue="sde" className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                        {careerPaths.map((path) => (
                            <TabsTrigger key={path.id} value={path.id} className="flex items-center gap-2">
                                {path.icon}
                                <span className="hidden md:block">{path.title}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {careerPaths.map((path) => (
                        <TabsContent key={path.id} value={path.id} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4">{path.title}</h3>
                                    <p className="text-gray-600 mb-4">
                                        Get personalized guidance from seniors who have excelled in {path.title.toLowerCase()} roles at top companies and institutions.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">Technical Skills</Badge>
                                            <Badge variant="outline">Interview Prep</Badge>
                                            <Badge variant="outline">Career Advice</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">Portfolio Review</Badge>
                                            <Badge variant="outline">Industry Insights</Badge>
                                        </div>
                                    </div>
                                    <Button className="mt-6">Find {path.title} Mentors</Button>
                                </div>
                                <div>
                                    <img
                                        src={`${path?.image}`}
                                        alt={`${path.title} career`}
                                        className="rounded-lg shadow w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </section>

            {/* Featured Mentors */}
            <section className="py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Mentors</h2>
                    <Button variant="outline" className="hidden md:block">View All Mentors</Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredMentors.map((mentor, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <img src={mentor.image} alt={mentor.name} />
                                </Avatar>
                                <div>
                                    <CardTitle>{mentor.name}</CardTitle>
                                    <CardDescription>{mentor.role}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Specialty: {mentor.specialty}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">⭐ {mentor.rating}</span>
                                        <span className="text-sm text-gray-500">•</span>
                                        <span className="text-sm text-gray-500">{mentor.mentees} mentees</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">View Profile</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center mt-6 md:hidden">
                    <Button variant="outline">View All Mentors</Button>
                </div>
            </section>

            {/* Platform Features */}
            <section className="py-8">
                <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                            <Award className="h-5 w-5 text-primary mr-2" />
                            <CardTitle className="text-lg">AI Matching</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Our algorithm finds the perfect senior mentor based on your specific needs.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                            <BarChart className="h-5 w-5 text-primary mr-2" />
                            <CardTitle className="text-lg">Progress Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Set goals and track your academic and professional development.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                            <Calendar className="h-5 w-5 text-primary mr-2" />
                            <CardTitle className="text-lg">Session Scheduling</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Book one-on-one or group sessions with your mentor at your convenience.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                            <MessageSquare className="h-5 w-5 text-primary mr-2" />
                            <CardTitle className="text-lg">Live Q&A Forums</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Get your questions answered by multiple experienced seniors.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-8 bg-gray-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Student testimonial" />
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Arjun Mehta</p>
                                    <p className="text-sm text-gray-500">Computer Science Student</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "The guidance I received from my mentor helped me ace my technical interviews and land an internship at Microsoft. The structured approach and industry insights were invaluable."
                            </p>
                            <div className="mt-4 flex text-yellow-400">
                                <span>⭐⭐⭐⭐⭐</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Student testimonial" />
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Neha Gupta</p>
                                    <p className="text-sm text-gray-500">Electrical Engineering Student</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "My mentor helped me navigate the complex world of core electrical companies and prepare for campus placements. I'm now working at my dream company thanks to their guidance."
                            </p>
                            <div className="mt-4 flex text-yellow-400">
                                <span>⭐⭐⭐⭐⭐</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Mentor?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of students who are accelerating their career growth with personalized mentorship.
                </p>
                <Button size="lg" className="px-8">Get Started Today</Button>
            </section>
        </div>
    );
};

export default HomePage;