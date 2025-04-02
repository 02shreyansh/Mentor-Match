// src/App.tsx
import  { useState } from 'react';
import { Bell, ChevronDown, Users, BookOpen, Calendar, MessageCircle, FileText, Award, DollarSign, Settings, LifeBuoy, Menu, X, BarChart2, Star, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div 
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } fixed h-full z-10`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">MentorHub</span>
            </div>
          ) : (
            <Star className="h-6 w-6 text-blue-600 mx-auto" />
          )}
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-200">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="py-4">
          <div className="px-4 mb-6">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Main</p>
            )}
            <div className={`flex items-center p-3 rounded-lg bg-blue-50 text-blue-600 ${!sidebarOpen && 'justify-center'}`}>
              <BarChart2 size={20} />
              {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
            </div>
          </div>

          <div className="px-4 mb-6">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Management</p>
            )}
            <div className="space-y-1">
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <Users size={20} />
                {sidebarOpen && <span className="ml-3">Users</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <BookOpen size={20} />
                {sidebarOpen && <span className="ml-3">Mentorships</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <Calendar size={20} />
                {sidebarOpen && <span className="ml-3">Sessions</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <MessageCircle size={20} />
                {sidebarOpen && <span className="ml-3">Forum</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <FileText size={20} />
                {sidebarOpen && <span className="ml-3">Resources</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <Award size={20} />
                {sidebarOpen && <span className="ml-3">Achievements</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <DollarSign size={20} />
                {sidebarOpen && <span className="ml-3">Payments</span>}
              </div>
            </div>
          </div>

          <div className="px-4 mb-6">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">System</p>
            )}
            <div className="space-y-1">
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <Settings size={20} />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </div>
              <div className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${!sidebarOpen && 'justify-center'}`}>
                <LifeBuoy size={20} />
                {sidebarOpen && <span className="ml-3">Support</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.placeholder.com/400/320" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
                <UserPlus className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,430</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">352</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,580</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Star Mentors */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Star Mentors</CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <CardDescription>Top performing mentors this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Olivia Mitchell",
                      email: "olivia.mitchell@example.com",
                      avatar: "OM",
                      specialization: "AI/ML",
                      rating: 4.9,
                      mentees: 24,
                      progress: 92
                    },
                    {
                      name: "Daniel Johnson",
                      email: "daniel.j@example.com",
                      avatar: "DJ",
                      specialization: "Web Development",
                      rating: 4.8,
                      mentees: 18,
                      progress: 86
                    },
                    {
                      name: "Emily Wilson",
                      email: "emily.w@example.com",
                      avatar: "EW",
                      specialization: "Data Science",
                      rating: 4.7,
                      mentees: 21,
                      progress: 84
                    },
                    {
                      name: "James Rodriguez",
                      email: "james.r@example.com",
                      avatar: "JR",
                      specialization: "Embedded Systems",
                      rating: 4.7,
                      mentees: 15,
                      progress: 82
                    }
                  ].map((mentor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-800">{mentor.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mentor.name}</div>
                          <div className="text-sm text-gray-500">{mentor.email}</div>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col items-end">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">{mentor.specialization}</Badge>
                          <div className="text-sm font-medium">{mentor.rating} ★</div>
                        </div>
                        <div className="w-32 mt-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{mentor.mentees} mentees</span>
                            <span>{mentor.progress}%</span>
                          </div>
                          <Progress value={mentor.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Platform Statistics</CardTitle>
                <CardDescription>Monthly overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mentorship">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  </TabsList>
                  <TabsContent value="mentorship" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">New Registrations</div>
                      <div className="font-semibold">+120</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Match Success Rate</div>
                      <div className="font-semibold">86%</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Avg. Session Duration</div>
                      <div className="font-semibold">48 mins</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Satisfaction Score</div>
                      <div className="font-semibold">4.7/5</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sessions" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">One-on-One</div>
                      <div className="font-semibold">238</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Group Sessions</div>
                      <div className="font-semibold">114</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Cancelled</div>
                      <div className="font-semibold">18</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Rescheduled</div>
                      <div className="font-semibold">42</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="metrics" className="pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Goals Completed</div>
                      <div className="font-semibold">324</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Resources Shared</div>
                      <div className="font-semibold">1,284</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Forum Topics</div>
                      <div className="font-semibold">198</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Support Tickets</div>
                      <div className="font-semibold">14</div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full">Generate Full Report</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;