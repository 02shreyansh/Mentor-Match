import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Search,
  MoreHorizontal,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Filter,
  Award,
  Bell
} from 'lucide-react';

const AdminForumPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts
  const forumActivityData = [
    { month: 'Jan', posts: 65, replies: 85, views: 120 },
    { month: 'Feb', posts: 59, replies: 79, views: 110 },
    { month: 'Mar', posts: 80, replies: 100, views: 140 },
    { month: 'Apr', posts: 81, replies: 105, views: 145 },
    { month: 'May', posts: 56, replies: 70, views: 95 },
    { month: 'Jun', posts: 55, replies: 65, views: 90 },
    { month: 'Jul', posts: 40, replies: 55, views: 75 },
  ];

  const topicDistributionData = [
    { name: 'Web Dev', value: 400 },
    { name: 'DSA', value: 300 },
    { name: 'AIML', value: 300 },
    { name: 'SDE Career', value: 200 },
    { name: 'Embedded', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const recentThreadsData = [
    {
      id: 1,
      title: 'Need guidance on DSA preparation roadmap',
      category: 'Technical',
      interest: 'DSA',
      posts: 24,
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'How to balance academics with interview prep?',
      category: 'Career',
      interest: 'SDE',
      posts: 18,
      lastActive: '5 hours ago',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Resources for learning React and Angular',
      category: 'Technical',
      interest: 'Web Dev',
      posts: 32,
      lastActive: '1 day ago',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Embedded systems project ideas',
      category: 'Academic',
      interest: 'Embedded',
      posts: 9,
      lastActive: '2 days ago',
      status: 'Inactive'
    },
    {
      id: 5,
      title: 'ML model for resume screening - group project',
      category: 'Technical',
      interest: 'AIML',
      posts: 27,
      lastActive: '3 days ago',
      status: 'Active'
    }
  ];

  const reportedPostsData = [
    {
      id: 101,
      username: 'junior_dev123',
      content: 'Inappropriate content about exam...',
      reason: 'Academic Integrity',
      reportedBy: 5,
      date: '2025-04-01'
    },
    {
      id: 102,
      username: 'aiml_enthusiast',
      content: 'Off-topic marketing content...',
      reason: 'Spam',
      reportedBy: 3,
      date: '2025-04-02'
    },
    {
      id: 103,
      username: 'coder_ninja',
      content: 'Rude comment on beginner question...',
      reason: 'Harassment',
      reportedBy: 7,
      date: '2025-04-03'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold md:text-xl">MentorConnect Admin</h1>
            <Badge variant="outline" className="ml-2">Forum Management</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
            </div>
            <img 
              src="/api/placeholder/30/30" 
              alt="Admin" 
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="container grid flex-1 items-start gap-4 p-4 md:p-6 md:grid-cols-7">
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-1">
          <nav className="grid items-start gap-2">
            <Button variant="ghost" className="justify-start gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="secondary" className="justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Forums
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Users className="h-4 w-4" />
              Users
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              Resources
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Award className="h-4 w-4" />
              Leaderboard
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="col-span-7 md:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Forum Management</h2>
            <div className="flex items-center gap-2">
              <Button size="sm">
                Create Thread
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search forums, threads, or posts..."
              className="w-full bg-white dark:bg-gray-950 pl-8"
            />
          </div>

          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="threads">Threads</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Threads</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">254</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">
                      +4% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">
                      -2 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Forum Activity</CardTitle>
                    <CardDescription>
                      Posts, replies, and views over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={forumActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="posts" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="replies" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="views" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Topic Distribution</CardTitle>
                    <CardDescription>
                      Popular discussion topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={topicDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {topicDistributionData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Threads Tab */}
            <TabsContent value="threads" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recent Threads</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Thread Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead className="text-right">Posts</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentThreadsData.map((thread) => (
                        <TableRow key={thread.id}>
                          <TableCell className="font-medium">{thread.title}</TableCell>
                          <TableCell>{thread.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{thread.interest}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{thread.posts}</TableCell>
                          <TableCell>{thread.lastActive}</TableCell>
                          <TableCell>
                            <Badge variant={thread.status === 'Active' ? 'default' : 'secondary'}>
                              {thread.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reported Posts</CardTitle>
                  <CardDescription>
                    Content that has been flagged by users
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Content Preview</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead className="text-right">Reports</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportedPostsData.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.username}</TableCell>
                          <TableCell>{post.content}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{post.reason}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{post.reportedBy}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline">Keep</Button>
                              <Button size="sm" variant="destructive">Remove</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement by Topic</CardTitle>
                    <CardDescription>Posts and replies across different topics</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        {topic: 'Web Dev', posts: 120, replies: 250},
                        {topic: 'DSA', posts: 90, replies: 180},
                        {topic: 'AIML', posts: 70, replies: 140},
                        {topic: 'SDE', posts: 60, replies: 120},
                        {topic: 'Embedded', posts: 40, replies: 80},
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="posts" fill="#8884d8" />
                        <Bar dataKey="replies" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Participation</CardTitle>
                    <CardDescription>Forum activity breakdown by user type</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Mentors', value: 45 },
                            { name: 'Mentees', value: 40 },
                            { name: 'Admins', value: 5 },
                            { name: 'Guests', value: 10 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminForumPage;