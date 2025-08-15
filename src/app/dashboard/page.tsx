import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import {
  User,
  Settings,
  Bell,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Target,
  TrendingUp,
  Heart,
  Star,
  Edit,
  Camera,
  Mail,
  MapPin,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Welcome back, Sarah!</h1>
                <p className="text-xs text-muted-foreground">Have a productive day</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <Button size="sm" variant="secondary" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full p-0">
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight">Sarah Johnson</h2>
              <p className="text-muted-foreground mt-1">Premium Member • Joined March 2024</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  sarah.johnson@email.com
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  San Francisco, CA
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-4 font-medium">+3</span> this month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 days</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-4 font-medium">Personal best!</span>
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-4 font-medium">+5</span> earned recently
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47h</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-2 font-medium">+12h</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning progress and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-chart-4/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-chart-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Achievement Unlocked!</p>
                  <p className="text-sm text-muted-foreground">Completed "Advanced React Patterns" course</p>
                </div>
                <Badge variant="secondary">2h ago</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Course Progress</p>
                  <p className="text-sm text-muted-foreground">75% complete in "TypeScript Fundamentals"</p>
                </div>
                <Badge variant="secondary">1d ago</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-chart-2" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Goal Achieved</p>
                  <p className="text-sm text-muted-foreground">Reached 25-day learning streak milestone</p>
                </div>
                <Badge variant="secondary">3d ago</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Review Submitted</p>
                  <p className="text-sm text-muted-foreground">5-star review for "JavaScript Mastery" course</p>
                </div>
                <Badge variant="secondary">5d ago</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <BookOpen className="h-4 w-4" />
                  Continue Learning
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4" />
                  Schedule Study Time
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Heart className="h-4 w-4" />
                  Browse Favorites
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Goals</CardTitle>
                <CardDescription>Track your monthly learning objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Completion</span>
                    <span className="text-sm text-muted-foreground">3/4</span>
                  </div>
                  {/* <Progress value={75} className="h-2" /> */}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Study Hours</span>
                    <span className="text-sm text-muted-foreground">47/60h</span>
                  </div>
                  {/* <Progress value={78} className="h-2" /> */}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Skill Assessments</span>
                    <span className="text-sm text-muted-foreground">2/5</span>
                  </div>
                  {/* <Progress value={40} className="h-2" /> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Award className="h-3 w-3" />
                    Fast Learner
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Target className="h-3 w-3" />
                    Goal Crusher
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3" />
                    Top Reviewer
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Streak Master
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
