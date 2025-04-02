import React, { useState } from "react";
import { z } from "zod";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Search, Filter, RefreshCw, CheckCircle, XCircle, Eye } from "lucide-react";

// Zod schemas for user validation
const UserBaseSchema = z.object({
    id: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    profileImage: z.string().optional(),
    registeredDate: z.date(),
    status: z.enum(["pending", "verified", "rejected"]),
    university: z.string(),
    department: z.string(),
    yearOfStudy: z.number().optional(),
    yearsOfExperience: z.number().optional(),
});

const MenteeSchema = UserBaseSchema.extend({
    careerGoals: z.array(z.string()),
    technicalInterests: z.array(z.string()),
    academicPerformance: z.object({
        cgpa: z.number().min(0).max(10),
        strongSubjects: z.array(z.string()),
        weakSubjects: z.array(z.string()),
    }),
    extracurricularInterests: z.array(z.string()),
});

const MentorSchema = UserBaseSchema.extend({
    expertise: z.array(z.string()),
    currentPosition: z.string(),
    company: z.string().optional(),
    mentorshipAreas: z.array(z.string()),
    achievements: z.array(z.string()),
    availabilityHours: z.number(),
});

type Mentee = z.infer<typeof MenteeSchema>;
type Mentor = z.infer<typeof MentorSchema>;
type User = Mentee | Mentor;

// Mock data
const mockMentees: Mentee[] = [
    {
        id: "mentee-1",
        name: "Alex Johnson",
        email: "alex@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 2, 20),
        status: "pending",
        university: "MIT",
        department: "Computer Science",
        yearOfStudy: 2,
        careerGoals: ["SDE", "AIML"],
        technicalInterests: ["Web Dev", "DSA"],
        academicPerformance: {
            cgpa: 8.5,
            strongSubjects: ["Programming", "Databases"],
            weakSubjects: ["Networking"],
        },
        extracurricularInterests: ["Hackathons", "Chess"],
    },
    {
        id: "mentee-2",
        name: "Sarah Williams",
        email: "sarah@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 3, 1),
        status: "verified",
        university: "Stanford",
        department: "Electrical Engineering",
        yearOfStudy: 3,
        careerGoals: ["Core Electrical", "Embedded Systems"],
        technicalInterests: ["Microcontrollers", "IoT"],
        academicPerformance: {
            cgpa: 9.2,
            strongSubjects: ["Digital Electronics", "Signals"],
            weakSubjects: ["Communication Systems"],
        },
        extracurricularInterests: ["Robotics Club", "Swimming"],
    },
    {
        id: "mentee-3",
        name: "Miguel Rodriguez",
        email: "miguel@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 3, 10),
        status: "rejected",
        university: "UCLA",
        department: "Computer Science",
        yearOfStudy: 1,
        careerGoals: ["SDE", "Govt Jobs"],
        technicalInterests: ["DSA", "Cybersecurity"],
        academicPerformance: {
            cgpa: 7.8,
            strongSubjects: ["Programming", "Mathematics"],
            weakSubjects: ["Physics", "Databases"],
        },
        extracurricularInterests: ["Basketball", "Debate"],
    },
];

const mockMentors: Mentor[] = [
    {
        id: "mentor-1",
        name: "Dr. Emily Chen",
        email: "emily@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 2, 15),
        status: "verified",
        university: "Harvard",
        department: "Computer Science",
        yearsOfExperience: 8,
        expertise: ["AIML", "Data Science"],
        currentPosition: "Senior Data Scientist",
        company: "Google",
        mentorshipAreas: ["Research", "Industry Preparation"],
        achievements: ["3 IEEE papers", "Best mentor award 2024"],
        availabilityHours: 5,
    },
    {
        id: "mentor-2",
        name: "John Smith",
        email: "john@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 2, 28),
        status: "pending",
        university: "MIT",
        department: "Electrical Engineering",
        yearsOfExperience: 5,
        expertise: ["Embedded Systems", "IoT"],
        currentPosition: "Hardware Engineer",
        company: "Apple",
        mentorshipAreas: ["Technical Skills", "Interview Preparation"],
        achievements: ["2 Patents", "TechFest Winner 2023"],
        availabilityHours: 3,
    },
    {
        id: "mentor-3",
        name: "Priya Patel",
        email: "priya@example.com",
        profileImage: "/api/placeholder/32/32",
        registeredDate: new Date(2025, 3, 5),
        status: "rejected",
        university: "Stanford",
        department: "Management",
        yearsOfExperience: 10,
        expertise: ["MBA", "Finance"],
        currentPosition: "Senior Manager",
        company: "McKinsey",
        mentorshipAreas: ["Career Guidance", "Soft Skills"],
        achievements: ["MBA Gold Medalist", "Published book on leadership"],
        availabilityHours: 4,
    },
];

// Mock chart data
const menteesByDepartment = [
    { name: "Computer Science", value: 45 },
    { name: "Electrical Engineering", value: 30 },
    { name: "Mechanical Engineering", value: 15 },
    { name: "Civil Engineering", value: 10 },
];

const mentorsByExpertise = [
    { name: "AIML", value: 25 },
    { name: "Web Dev", value: 20 },
    { name: "Embedded Systems", value: 15 },
    { name: "MBA", value: 10 },
    { name: "Govt Jobs", value: 5 },
];

const registrationTimelineData = [
    { name: "Jan", mentors: 10, mentees: 25 },
    { name: "Feb", mentors: 15, mentees: 30 },
    { name: "Mar", mentors: 20, mentees: 45 },
    { name: "Apr", mentors: 8, mentees: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminUsersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("mentees");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter users based on search and status filter
    const filteredMentees = mockMentees.filter(mentee => {
        const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentee.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || mentee.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredMentors = mockMentors.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || mentor.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleVerify = (id: string, userType: 'mentee' | 'mentor') => {
        // In a real app, this would make an API call
        console.log(`Verifying ${userType} with ID: ${id}`);
        // Then update state accordingly
    };

    const handleReject = (id: string, userType: 'mentee' | 'mentor') => {
        // In a real app, this would make an API call
        console.log(`Rejecting ${userType} with ID: ${id}`);
        // Then update state accordingly
    };

    const viewDetails = (user: User) => {
        setSelectedUser(user);
        setDetailsOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "verified":
                return <Badge className="bg-green-500">Verified</Badge>;
            case "rejected":
                return <Badge className="bg-red-500">Rejected</Badge>;
            default:
                return <Badge className="bg-yellow-500">Pending</Badge>;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard - User Management</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockMentees.length + mockMentors.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockMentees.filter(m => m.status === "pending").length +
                                mockMentors.filter(m => m.status === "pending").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockMentees.filter(m => m.status === "verified").length +
                                mockMentors.filter(m => m.status === "verified").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Rejected Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockMentees.filter(m => m.status === "rejected").length +
                                mockMentors.filter(m => m.status === "rejected").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                        <CardDescription>Breakdown of mentees by department and mentors by expertise</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activeTab === "mentees" ? menteesByDepartment : mentorsByExpertise}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {(activeTab === "mentees" ? menteesByDepartment : mentorsByExpertise).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Registration Timeline</CardTitle>
                        <CardDescription>Monthly registration counts for mentors and mentees</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={registrationTimelineData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="mentees" fill="#0088FE" />
                                    <Bar dataKey="mentors" fill="#00C49F" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Table with Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>User Verification</CardTitle>
                    <CardDescription>
                        Verify mentor and mentee profiles before allowing platform access
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="verified">Verified</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button variant="outline" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="mentees">Mentees</TabsTrigger>
                            <TabsTrigger value="mentors">Mentors</TabsTrigger>
                        </TabsList>

                        <TabsContent value="mentees">
                            <div className="rounded-md border">
                                <Table>
                                    <TableCaption>Total Mentees: {filteredMentees.length}</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Year</TableHead>
                                            <TableHead>Career Goals</TableHead>
                                            <TableHead>Registered</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMentees.map((mentee) => (
                                            <TableRow key={mentee.id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar>
                                                            <AvatarImage src={mentee.profileImage} />
                                                            <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{mentee.name}</div>
                                                            <div className="text-sm text-gray-500">{mentee.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentee.department}</TableCell>
                                                <TableCell>{mentee.yearOfStudy}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {mentee.careerGoals.slice(0, 2).map((goal, idx) => (
                                                            <Badge key={idx} variant="outline">{goal}</Badge>
                                                        ))}
                                                        {mentee.careerGoals.length > 2 && <span>+{mentee.careerGoals.length - 2}</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentee.registeredDate.toLocaleDateString()}</TableCell>
                                                <TableCell>{getStatusBadge(mentee.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => viewDetails(mentee)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {mentee.status === "pending" && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-green-600"
                                                                    onClick={() => handleVerify(mentee.id, 'mentee')}
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-600"
                                                                    onClick={() => handleReject(mentee.id, 'mentee')}
                                                                >
                                                                    <XCircle className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="mentors">
                            <div className="rounded-md border">
                                <Table>
                                    <TableCaption>Total Mentors: {filteredMentors.length}</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Expertise</TableHead>
                                            <TableHead>Registered</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMentors.map((mentor) => (
                                            <TableRow key={mentor.id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar>
                                                            <AvatarImage src={mentor.profileImage} />
                                                            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{mentor.name}</div>
                                                            <div className="text-sm text-gray-500">{mentor.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentor.department}</TableCell>
                                                <TableCell>{mentor.currentPosition}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {mentor.expertise.slice(0, 2).map((exp, idx) => (
                                                            <Badge key={idx} variant="outline">{exp}</Badge>
                                                        ))}
                                                        {mentor.expertise.length > 2 && <span>+{mentor.expertise.length - 2}</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentor.registeredDate.toLocaleDateString()}</TableCell>
                                                <TableCell>{getStatusBadge(mentor.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => viewDetails(mentor)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {mentor.status === "pending" && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-green-600"
                                                                    onClick={() => handleVerify(mentor.id, 'mentor')}
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-600"
                                                                    onClick={() => handleReject(mentor.id, 'mentor')}
                                                                >
                                                                    <XCircle className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* User Details Dialog */}
            {selectedUser && (
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedUser.profileImage} />
                                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {selectedUser.name}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedUser.email} · {getStatusBadge(selectedUser.status)}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                                <div className="space-y-2">
                                    <div>
                                        <Label className="text-sm text-gray-500">University</Label>
                                        <p>{selectedUser.university}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-gray-500">Department</Label>
                                        <p>{selectedUser.department}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-gray-500">Registered On</Label>
                                        <p>{selectedUser.registeredDate.toLocaleDateString()}</p>
                                    </div>
                                    {'yearOfStudy' in selectedUser ? (
                                        <div>
                                            <Label className="text-sm text-gray-500">Year of Study</Label>
                                            <p>{selectedUser.yearOfStudy}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label className="text-sm text-gray-500">Years of Experience</Label>
                                            <p>{selectedUser.yearsOfExperience}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                {/* Mentee/Mentor-specific details */}
                                {'careerGoals' in selectedUser ? (
                                    // Mentee details
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Mentee Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-sm text-gray-500">Career Goals</Label>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedUser.careerGoals.map((goal, idx) => (
                                                        <Badge key={idx} variant="secondary">{goal}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Technical Interests</Label>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedUser.technicalInterests.map((interest, idx) => (
                                                        <Badge key={idx} variant="secondary">{interest}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Academic Performance</Label>
                                                <p className="mt-1">CGPA: {selectedUser.academicPerformance.cgpa}</p>
                                                <div className="mt-1">
                                                    <span className="text-xs text-gray-500">Strong Subjects: </span>
                                                    {selectedUser.academicPerformance.strongSubjects.join(", ")}
                                                </div>
                                                <div className="mt-1">
                                                    <span className="text-xs text-gray-500">Weak Subjects: </span>
                                                    {selectedUser.academicPerformance.weakSubjects.join(", ")}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Extracurricular Interests</Label>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedUser.extracurricularInterests.map((interest, idx) => (
                                                        <Badge key={idx} variant="outline">{interest}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Mentor details
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Mentor Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-sm text-gray-500">Current Position</Label>
                                                <p>{selectedUser.currentPosition} {selectedUser.company && `at ${selectedUser.company}`}</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Expertise</Label>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedUser.expertise.map((exp, idx) => (
                                                        <Badge key={idx} variant="secondary">{exp}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Mentorship Areas</Label>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedUser.mentorshipAreas.map((area, idx) => (
                                                        <Badge key={idx} variant="secondary">{area}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Achievements</Label>
                                                <ul className="list-disc list-inside mt-1">
                                                    {selectedUser.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="text-sm">{achievement}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <Label className="text-sm text-gray-500">Weekly Availability</Label>
                                                <p>{selectedUser.availabilityHours} hours</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            {selectedUser.status === "pending" && (
                                <>
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => {
                                            handleReject(selectedUser.id, 'careerGoals' in selectedUser ? 'mentee' : 'mentor');
                                            setDetailsOpen(false);
                                        }}
                                    >
                                        <XCircle className="mr-2 h-4 w-4" /> Reject Profile
                                    </Button>
                                    <Button
                                        className="flex-1 bg-green-500 hover:bg-green-600"
                                        onClick={() => {
                                            handleVerify(selectedUser.id, 'careerGoals' in selectedUser ? 'mentee' : 'mentor');
                                            setDetailsOpen(false);
                                        }}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" /> Verify Profile
                                    </Button>
                                </>
                            )}
                            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AdminUsersPage;