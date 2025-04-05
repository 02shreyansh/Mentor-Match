import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Filter,
  Award,
  Bell,
  Search,
  MoreHorizontal,
  PlusCircle,
  Edit,
  Trash2,
  Trophy,
  Star,
  Target,
  Medal,
  Clock
} from 'lucide-react';

const AdminAchievementsPage = () => {
  const [activeTab, setActiveTab] = useState("badge-system");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Sample data for achievements
  const achievementBadges = [
    {
      id: 1,
      name: "Knowledge Expert",
      description: "Awarded to mentors who consistently provide high-quality answers",
      criteria: "Answer 50+ questions with 4.5+ rating",
      category: "Mentor",
      isActive: true,
      icon: Trophy,
      level: "Gold"
    },
    {
      id: 2,
      name: "Quick Responder",
      description: "Responds to mentee questions within 2 hours",
      criteria: "Respond to 30+ questions within 2 hours",
      category: "Mentor",
      isActive: true,
      icon: Clock,
      level: "Silver"
    },
    {
      id: 3,
      name: "Resource Contributor",
      description: "Shares valuable learning resources with the community",
      criteria: "Share 20+ resources with 4+ rating",
      category: "Mentor",
      isActive: true,
      icon: FileText,
      level: "Bronze"
    },
    {
      id: 4,
      name: "Consistent Learner",
      description: "Completes learning milestones consistently",
      criteria: "Complete 10 consecutive weekly goals",
      category: "Mentee",
      isActive: true,
      icon: Target,
      level: "Silver"
    },
    {
      id: 5,
      name: "Feedback Champion",
      description: "Provides constructive feedback to improve the platform",
      criteria: "Submit 15+ quality improvement suggestions",
      category: "Both",
      isActive: false,
      icon: Star,
      level: "Bronze"
    }
  ];

  const recentAchievements = [
    {
      id: 101,
      username: "sarah_tech",
      badgeName: "Knowledge Expert",
      awardDate: "2025-04-03",
      userType: "Mentor",
      userArea: "Web Development"
    },
    {
      id: 102,
      username: "code_master",
      badgeName: "Quick Responder",
      awardDate: "2025-04-02",
      userType: "Mentor",
      userArea: "DSA"
    },
    {
      id: 103,
      username: "ai_learner",
      badgeName: "Consistent Learner",
      awardDate: "2025-04-01",
      userType: "Mentee",
      userArea: "AIML"
    },
    {
      id: 104,
      username: "embedded_pro",
      badgeName: "Resource Contributor",
      awardDate: "2025-03-30",
      userType: "Mentor",
      userArea: "Embedded Systems"
    },
    {
      id: 105,
      username: "future_dev",
      badgeName: "Consistent Learner",
      awardDate: "2025-03-29",
      userType: "Mentee",
      userArea: "SDE Career"
    }
  ];

  const levelProgressions = [
    {
      id: 1,
      badgeName: "Knowledge Expert",
      bronzeCriteria: "Answer 10+ questions with 4.0+ rating",
      silverCriteria: "Answer 25+ questions with 4.3+ rating",
      goldCriteria: "Answer 50+ questions with 4.5+ rating",
      category: "Mentor"
    },
    {
      id: 2,
      badgeName: "Quick Responder",
      bronzeCriteria: "Respond to 10+ questions within 4 hours",
      silverCriteria: "Respond to 30+ questions within 2 hours",
      goldCriteria: "Respond to 50+ questions within 1 hour",
      category: "Mentor"
    },
    {
      id: 3,
      badgeName: "Consistent Learner",
      bronzeCriteria: "Complete 3 consecutive weekly goals",
      silverCriteria: "Complete 10 consecutive weekly goals",
      goldCriteria: "Complete 20 consecutive weekly goals",
      category: "Mentee"
    }
  ];

  const getBadgeLevelColor = (level: string) => {
    switch(level) {
      case "Gold": return "bg-yellow-500";
      case "Silver": return "bg-gray-300";
      case "Bronze": return "bg-amber-700";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold md:text-xl">MentorConnect Admin</h1>
            <Badge variant="outline" className="ml-2">Achievements</Badge>
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
            <Button variant="ghost" className="justify-start gap-2">
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
            <Button variant="secondary" className="justify-start gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="col-span-7 md:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Achievement Management</h2>
            <div className="flex items-center gap-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Achievement</DialogTitle>
                    <DialogDescription>
                      Add a new achievement badge to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input id="description" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="criteria" className="text-right">
                        Criteria
                      </Label>
                      <Input id="criteria" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <select id="category" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option>Mentor</option>
                        <option>Mentee</option>
                        <option>Both</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="level" className="text-right">
                        Level
                      </Label>
                      <select id="level" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option>Bronze</option>
                        <option>Silver</option>
                        <option>Gold</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Achievement</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search achievements, badges, or users..."
              className="w-full bg-white dark:bg-gray-950 pl-8"
            />
          </div>

          <Tabs defaultValue="badge-system" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="badge-system">Badge System</TabsTrigger>
              <TabsTrigger value="recent-awards">Recent Awards</TabsTrigger>
              <TabsTrigger value="progression">Progression Paths</TabsTrigger>
            </TabsList>

            {/* Badge System Tab */}
            <TabsContent value="badge-system" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievementBadges.map((badge) => (
                  <Card key={badge.id} className={!badge.isActive ? "opacity-60" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${getBadgeLevelColor(badge.level)} text-white`}>
                            <badge.icon className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-lg">{badge.name}</CardTitle>
                        </div>
                        <Badge variant={badge.level === "Gold" ? "default" : badge.level === "Silver" ? "secondary" : "outline"}>
                          {badge.level}
                        </Badge>
                      </div>
                      <CardDescription className="pt-1">{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <span className="font-semibold">Criteria:</span> {badge.criteria}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-semibold">For:</span> {badge.category}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center space-x-2">
                        <Switch id={`active-${badge.id}`} checked={badge.isActive} />
                        <Label htmlFor={`active-${badge.id}`}>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Awards Tab */}
            <TabsContent value="recent-awards" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recently Awarded Achievements</h3>
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
                        <TableHead>Username</TableHead>
                        <TableHead>Badge</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Award Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAchievements.map((award) => (
                        <TableRow key={award.id}>
                          <TableCell className="font-medium">{award.username}</TableCell>
                          <TableCell>{award.badgeName}</TableCell>
                          <TableCell>
                            <Badge variant={award.userType === "Mentor" ? "default" : "secondary"}>
                              {award.userType}
                            </Badge>
                          </TableCell>
                          <TableCell>{award.userArea}</TableCell>
                          <TableCell>{award.awardDate}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Send Notification</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Revoke Badge</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            {/* Progression Paths Tab */}
            <TabsContent value="progression" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Achievement Progression Paths</h3>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Progression
                </Button>
              </div>
              
              {levelProgressions.map((progression) => (
                <Card key={progression.id} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{progression.badgeName} Progression</CardTitle>
                      <Badge>{progression.category}</Badge>
                    </div>
                    <CardDescription>
                      Achievement path from Bronze to Gold level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Medal className="h-5 w-5 text-amber-700" />
                            <h4 className="font-semibold">Bronze Level</h4>
                          </div>
                          <p className="text-sm">{progression.bronzeCriteria}</p>
                        </div>
                        
                        <div className="flex-1 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Medal className="h-5 w-5 text-gray-400" />
                            <h4 className="font-semibold">Silver Level</h4>
                          </div>
                          <p className="text-sm">{progression.silverCriteria}</p>
                        </div>
                        
                        <div className="flex-1 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Medal className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-semibold">Gold Level</h4>
                          </div>
                          <p className="text-sm">{progression.goldCriteria}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminAchievementsPage;