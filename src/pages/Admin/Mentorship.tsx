import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Users,
    Medal,
    Calendar,
    BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock data for mentorships
const mentorshipData = [
    {
        id: '1',
        mentee: 'Alex Johnson',
        mentor: 'Dr. Sarah Williams',
        category: 'AIML',
        interests: 'Deep Learning, Computer Vision',
        startDate: '2025-03-10',
        rating: 4.8,
        status: 'active',
        meetings: 12
    },
    {
        id: '2',
        mentee: 'Michael Chen',
        mentor: 'Prof. David Kumar',
        category: 'SDE',
        interests: 'DSA, Web Development',
        startDate: '2025-02-15',
        rating: 4.5,
        status: 'active',
        meetings: 8
    },
    {
        id: '3',
        mentee: 'Priya Sharma',
        mentor: 'Dr. Robert Lee',
        category: 'Core Electrical',
        interests: 'Embedded Systems, IoT',
        startDate: '2025-01-20',
        rating: 4.2,
        status: 'paused',
        meetings: 5
    },
    {
        id: '4',
        mentee: 'James Wilson',
        mentor: 'Prof. Lisa Wang',
        category: 'MBA',
        interests: 'Marketing, Finance',
        startDate: '2025-03-05',
        rating: 4.9,
        status: 'active',
        meetings: 7
    },
    {
        id: '5',
        mentee: 'Emma Davis',
        mentor: 'Dr. Anil Patel',
        category: 'Govt Jobs',
        interests: 'UPSC, Public Administration',
        startDate: '2025-02-28',
        rating: 4.4,
        status: 'completed',
        meetings: 15
    },
    {
        id: '6',
        mentee: 'Raj Mehta',
        mentor: 'Prof. Jennifer Adams',
        category: 'SDE',
        interests: 'Mobile Development, Cloud Computing',
        startDate: '2025-01-15',
        rating: 4.7,
        status: 'active',
        meetings: 10
    },
    {
        id: '7',
        mentee: 'Sophia Garcia',
        mentor: 'Dr. Tom Wilson',
        category: 'AIML',
        interests: 'NLP, Reinforcement Learning',
        startDate: '2025-02-05',
        rating: 4.6,
        status: 'active',
        meetings: 9
    },
    {
        id: '8',
        mentee: 'Daniel Kim',
        mentor: 'Prof. Maria Rodriguez',
        category: 'Core Electrical',
        interests: 'Power Systems, VLSI',
        startDate: '2025-03-18',
        rating: 4.3,
        status: 'active',
        meetings: 4
    },
];

// Chart data
const categoryData = [
    { name: 'AIML', mentorships: 45 },
    { name: 'SDE', mentorships: 68 },
    { name: 'Core Electrical', mentorships: 27 },
    { name: 'MBA', mentorships: 32 },
    { name: 'Govt Jobs', mentorships: 21 },
];

const monthlyData = [
    { name: 'Jan', mentorships: 12 },
    { name: 'Feb', mentorships: 19 },
    { name: 'Mar', mentorships: 25 },
    { name: 'Apr', mentorships: 32 },
];

const ratingDistribution = [
    { name: '5 Stars', value: 42 },
    { name: '4 Stars', value: 35 },
    { name: '3 Stars', value: 15 },
    { name: '2 Stars', value: 6 },
    { name: '1 Star', value: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function AdminMentorshipsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredData = mentorshipData.filter(item => {
        return (
            (item.mentee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.mentor.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (categoryFilter === "" || item.category === categoryFilter) &&
            (statusFilter === "" || item.status === statusFilter)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Mentorship Management</h1>
                <p className="text-gray-500">Monitor and manage all mentorships on the platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Mentorships</p>
                                <p className="text-2xl font-bold">193</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg Session Rating</p>
                                <p className="text-2xl font-bold">4.7</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Medal className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Completed Sessions</p>
                                <p className="text-2xl font-bold">1,247</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Resources Shared</p>
                                <p className="text-2xl font-bold">892</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Mentorship Growth</CardTitle>
                        <CardDescription>Monthly mentorship registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsLineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="mentorships" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rating Distribution</CardTitle>
                        <CardDescription>Mentorship quality ratings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ratingDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {ratingDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>Mentorships by career category</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="mentorships" fill="#8884d8" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <div>
                        <CardTitle>All Mentorships</CardTitle>
                        <CardDescription>Manage active and past mentorship relationships</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-48">
                            <Input
                                placeholder="Search mentors/mentees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:w-36">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="--Select--">All Categories</SelectItem>
                                    <SelectItem value="SDE">SDE</SelectItem>
                                    <SelectItem value="AIML">AIML</SelectItem>
                                    <SelectItem value="Core Electrical">Core Electrical</SelectItem>
                                    <SelectItem value="MBA">MBA</SelectItem>
                                    <SelectItem value="Govt Jobs">Govt Jobs</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full sm:w-36">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="--Status--">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mentee</TableHead>
                                    <TableHead>Mentor</TableHead>
                                    <TableHead className="hidden md:table-cell">Category</TableHead>
                                    <TableHead className="hidden lg:table-cell">Interests</TableHead>
                                    <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                                    <TableHead className="hidden sm:table-cell">Rating</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((mentorship) => (
                                    <TableRow key={mentorship.id}>
                                        <TableCell className="font-medium">{mentorship.mentee}</TableCell>
                                        <TableCell>{mentorship.mentor}</TableCell>
                                        <TableCell className="hidden md:table-cell">{mentorship.category}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{mentorship.interests}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{mentorship.startDate}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{mentorship.rating}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    mentorship.status === "active" ? "bg-green-100 text-green-800" :
                                                        mentorship.status === "paused" ? "bg-amber-100 text-amber-800" :
                                                            "bg-blue-100 text-blue-800"
                                                }
                                            >
                                                {mentorship.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Message Participants</DropdownMenuItem>
                                                    <DropdownMenuItem>View Session History</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Mentorship</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">End Mentorship</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminMentorshipsPage;