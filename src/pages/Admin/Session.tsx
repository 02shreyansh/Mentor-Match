import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar,  Filter, Search, Users, PieChart, BarChart, CalendarDays } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const AdminSessionsDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for sessions
  const sessions = [
    { 
      id: 1, 
      mentee: 'Alex Johnson', 
      mentor: 'Dr. Sarah Williams', 
      careerGoal: 'AIML', 
      technicalInterest: 'Deep Learning', 
      matchScore: 95,
      sessionDate: '2025-04-05',
      status: 'upcoming',
      duration: 60,
      feedback: null
    },
    { 
      id: 2, 
      mentee: 'Michael Chen', 
      mentor: 'Prof. David Lee', 
      careerGoal: 'SDE', 
      technicalInterest: 'Web Dev', 
      matchScore: 89,
      sessionDate: '2025-04-03',
      status: 'completed',
      duration: 45,
      feedback: 4.8
    },
    { 
      id: 3, 
      mentee: 'Sophia Rodriguez', 
      mentor: 'Maria Garcia', 
      careerGoal: 'MBA', 
      technicalInterest: 'Finance', 
      matchScore: 92,
      sessionDate: '2025-04-04',
      status: 'completed',
      duration: 30,
      feedback: 4.5
    },
    { 
      id: 4, 
      mentee: 'James Wilson', 
      mentor: 'Thomas Brown', 
      careerGoal: 'Core Electrical', 
      technicalInterest: 'Embedded Systems', 
      matchScore: 87,
      sessionDate: '2025-04-06',
      status: 'upcoming',
      duration: 60,
      feedback: null
    },
    { 
      id: 5, 
      mentee: 'Emma Taylor', 
      mentor: 'Robert Miller', 
      careerGoal: 'Govt Jobs', 
      technicalInterest: 'Public Policy', 
      matchScore: 91,
      sessionDate: '2025-04-02',
      status: 'completed',
      duration: 45,
      feedback: 4.9
    },
  ];

  // Filter sessions based on status
  const filteredSessions = sessions.filter(session => {
    if (filter !== 'all' && session.status !== filter) return false;
    if (searchQuery && !session.mentee.toLowerCase().includes(searchQuery.toLowerCase()) && 
       !session.mentor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Chart data
  const careerGoalData = [
    { name: 'AIML', value: 35 },
    { name: 'SDE', value: 30 },
    { name: 'MBA', value: 15 },
    { name: 'Core Electrical', value: 10 },
    { name: 'Govt Jobs', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const sessionTrendData = [
    { month: 'Jan', sessions: 45 },
    { month: 'Feb', sessions: 52 },
    { month: 'Mar', sessions: 61 },
    { month: 'Apr', sessions: 85 },
  ];

  const feedbackData = [
    { rating: '5 Stars', count: 42 },
    { rating: '4 Stars', count: 38 },
    { rating: '3 Stars', count: 10 },
    { rating: '2 Stars', count: 5 },
    { rating: '1 Star', count: 2 },
  ];

  const matchScoreData = [
    { range: '90-100%', sessions: 38 },
    { range: '80-89%', sessions: 45 },
    { range: '70-79%', sessions: 12 },
    { range: '<70%', sessions: 5 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-xl font-bold">Mentor Connect</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sessions Dashboard</h2>
            <p className="text-muted-foreground">Manage and monitor mentorship sessions across the platform</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search mentors or mentees..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <CalendarDays className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Rating</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7/5.0</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Mentorship Sessions</CardTitle>
                <CardDescription>
                  Showing {filteredSessions.length} out of {sessions.length} total sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Mentee</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Focus Area</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">#{session.id}</TableCell>
                        <TableCell>{session.mentee}</TableCell>
                        <TableCell>{session.mentor}</TableCell>
                        <TableCell>{session.careerGoal} / {session.technicalInterest}</TableCell>
                        <TableCell>{session.sessionDate}</TableCell>
                        <TableCell>
                          <span className={`${session.matchScore >= 90 ? 'text-green-600' : session.matchScore >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                            {session.matchScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={session.status === 'upcoming' ? 'outline' : session.status === 'completed' ? 'default' : 'destructive'}>
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>1-5</strong> of <strong>100</strong> entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions by Career Goals</CardTitle>
                  <CardDescription>Distribution of mentorships across career paths</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={careerGoalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {careerGoalData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sessions Trend</CardTitle>
                  <CardDescription>Monthly session activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sessionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sessions" stroke="#0088FE" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Distribution</CardTitle>
                  <CardDescription>Rating breakdown from completed sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={feedbackData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rating" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#00C49F" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Match Score Analysis</CardTitle>
                  <CardDescription>Quality of AI matchmaking system</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={matchScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sessions" fill="#8884d8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminSessionsDashboard;