import {
  useState,
  useEffect,
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from "react"
import {
  Activity,
  Search,
  Filter,
  Clock,
  User,
  LogIn,
  LogOut,
  ShoppingCart,
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  Download,
  PieChart,
  ArrowRight,
  ChevronRight,
  Zap,
  Shield,
  MapPin,
  Smartphone,
  Laptop,
  Globe,
  RefreshCw,
  Tablet,
} from "lucide-react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "../Styles/Footer"

function UserActivities() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Format current time
  const timeString = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  // Sample user activity data
  const activities = [
    {
      id: "ACT-6514",
      user: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Login",
      type: "Authentication",
      timestamp: "2023-05-15 09:32:14",
      timeAgo: "2 minutes ago",
      device: "iPhone 13 Pro",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Success",
      icon: <LogIn className="h-4 w-4" />,
    },
    {
      id: "ACT-6513",
      user: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Service Booking",
      type: "Transaction",
      timestamp: "2023-05-15 09:28:45",
      timeAgo: "6 minutes ago",
      device: "MacBook Pro",
      location: "Los Angeles, USA",
      ip: "192.168.1.2",
      status: "Success",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      id: "ACT-6512",
      user: {
        name: "Michael Brown",
        email: "michael.b@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Profile Update",
      type: "Account",
      timestamp: "2023-05-15 09:15:22",
      timeAgo: "19 minutes ago",
      device: "Windows PC",
      location: "Chicago, USA",
      ip: "192.168.1.3",
      status: "Success",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: "ACT-6511",
      user: {
        name: "Emily Davis",
        email: "emily.d@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Payment Failed",
      type: "Transaction",
      timestamp: "2023-05-15 09:10:18",
      timeAgo: "24 minutes ago",
      device: "Android Phone",
      location: "Miami, USA",
      ip: "192.168.1.4",
      status: "Failed",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: "ACT-6510",
      user: {
        name: "David Wilson",
        email: "david.w@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Service Review",
      type: "Feedback",
      timestamp: "2023-05-15 09:05:36",
      timeAgo: "29 minutes ago",
      device: "iPad Pro",
      location: "Seattle, USA",
      ip: "192.168.1.5",
      status: "Success",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "ACT-6509",
      user: {
        name: "Jennifer Martinez",
        email: "jennifer.m@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Logout",
      type: "Authentication",
      timestamp: "2023-05-15 09:01:12",
      timeAgo: "33 minutes ago",
      device: "iPhone 12",
      location: "Boston, USA",
      ip: "192.168.1.6",
      status: "Success",
      icon: <LogOut className="h-4 w-4" />,
    },
    {
      id: "ACT-6508",
      user: {
        name: "Robert Taylor",
        email: "robert.t@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "Account Locked",
      type: "Security",
      timestamp: "2023-05-15 08:55:48",
      timeAgo: "39 minutes ago",
      device: "Samsung Galaxy",
      location: "Denver, USA",
      ip: "192.168.1.7",
      status: "Warning",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ]

  // Activity metrics
  const activityMetrics = {
    totalToday: 842,
    activeUsers: 186,
    successRate: 94,
    avgSessionTime: "18m",
  }

  // Activity by type data
  const activityByType = [
    { type: "Authentication", count: 245, percentage: 28 },
    { type: "Transaction", count: 312, percentage: 35 },
    { type: "Account", count: 198, percentage: 22 },
    { type: "Feedback", count: 134, percentage: 15 },
  ]

  // Filter activities based on active tab
  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true
    if (activeTab === "auth") return activity.type === "Authentication"
    if (activeTab === "transactions") return activity.type === "Transaction"
    if (activeTab === "account") return activity.type === "Account" || activity.type === "Security"
    if (activeTab === "warnings") return activity.status === "Failed" || activity.status === "Warning"
    return true
  })

  // Status badge renderer
  const renderStatusBadge = (
    status:
      | string
      | number
      | bigint
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
      | null
      | undefined,
  ) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Success</Badge>
      case "Failed":
        return <Badge className="bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7]">Failed</Badge>
      case "Warning":
        return <Badge className="bg-[#FFF8E6] text-[#FF9500] hover:bg-[#FFF8E6]">Warning</Badge>
      default:
        return <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">{status}</Badge>
    }
  }

  // Icon renderer with appropriate background color
  const renderActionIcon = (activity: {
    id?: string
    user?: { name: string; email: string; avatar: string }
    action?: string
    type: any
    timestamp?: string
    timeAgo?: string
    device?: string
    location?: string
    ip?: string
    status: any
    icon: any
  }) => {
    let bgColor = "bg-[#E9F6FF]"
    let textColor = "text-[#0A84FF]"

    switch (activity.type) {
      case "Authentication":
        bgColor = "bg-[#E9F6FF]"
        textColor = "text-[#0A84FF]"
        break
      case "Transaction":
        bgColor = "bg-[#E8F8EF]"
        textColor = "text-[#30D158]"
        break
      case "Account":
        bgColor = "bg-[#F2EBFF]"
        textColor = "text-[#5E5CE6]"
        break
      case "Security":
        bgColor = "bg-[#FFE5E7]"
        textColor = "text-[#FF453A]"
        break
      case "Feedback":
        bgColor = "bg-[#FFF8E6]"
        textColor = "text-[#FF9500]"
        break
    }

    if (activity.status === "Failed" || activity.status === "Warning") {
      bgColor = "bg-[#FFE5E7]"
      textColor = "text-[#FF453A]"
    }

    return (
      <div className={`rounded-full ${bgColor} p-2`}>
        <div className={textColor}>{activity.icon}</div>
      </div>
    )
  }

  // Device icon renderer
  const renderDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("iphone") || device.toLowerCase().includes("android")) {
      return <Smartphone className="h-4 w-4 text-gray-500" />
    } else if (
      device.toLowerCase().includes("mac") ||
      device.toLowerCase().includes("pc") ||
      device.toLowerCase().includes("windows")
    ) {
      return <Laptop className="h-4 w-4 text-gray-500" />
    } else if (device.toLowerCase().includes("ipad") || device.toLowerCase().includes("tablet")) {
      return <Tablet className="h-4 w-4 text-gray-500" />
    } else {
      return <Globe className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">User Activities</h1>
            <p className="text-gray-500 text-sm font-light">Real-time monitoring dashboard</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Activity Overview</h2>
                  <p className="text-white/90 font-light">Real-time user activity monitoring</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-white text-[#0A84FF] hover:bg-white/90 border-0">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Today's Activities</span>
                  </div>
                  <div className="text-3xl font-medium">{activityMetrics.totalToday}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>12% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <div className="text-3xl font-medium">{activityMetrics.activeUsers}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>8% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{activityMetrics.successRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>2% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Avg. Session</span>
                  </div>
                  <div className="text-3xl font-medium">{activityMetrics.avgSessionTime}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>5% increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Timeline - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex gap-5">
                    <h2 className="text-lg font-medium text-gray-800">Live Feed Activities</h2>
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-green-600">Live</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                      <TabsList className="bg-[#F2F2F7]">
                        <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white">
                          All
                        </TabsTrigger>
                        <TabsTrigger value="auth" className="text-xs data-[state=active]:bg-white">
                          Auth
                        </TabsTrigger>
                        <TabsTrigger value="transactions" className="text-xs data-[state=active]:bg-white">
                          Trans
                        </TabsTrigger>
                        <TabsTrigger value="warnings" className="text-xs data-[state=active]:bg-white">
                          Alerts
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>

                  <div className="space-y-8">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="relative pl-12">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center">
                          {renderActionIcon(activity)}
                        </div>

                        <div className="bg-[#F2F2F7]/50 rounded-xl p-4 hover:bg-[#F2F2F7] transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{activity.action}</span>
                              {renderStatusBadge(activity.status)}
                            </div>
                            <span className="text-xs text-gray-500 font-light">{activity.timeAgo}</span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                              <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                                {activity.user.name.charAt(0)}
                                {activity.user.name.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{activity.user.name}</div>
                              <div className="text-xs text-gray-500 font-light">{activity.user.email}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600 font-light">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderDeviceIcon(activity.device)}
                              <span>{activity.device}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-gray-400" />
                              <span>{activity.ip}</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#0A84FF] hover:text-[#0A84FF] hover:bg-[#E9F6FF] text-xs"
                            >
                              View Details
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search activities..." className="pl-9 bg-[#F2F2F7] border-0" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="today">
                    <SelectTrigger className="w-full bg-[#F2F2F7] border-0">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="bg-[#F2F2F7] border-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Activity by Type */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Activity by Type</h3>
                    <PieChart className="h-4 w-4 text-[#0A84FF]" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {activityByType.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${index === 0
                                  ? "bg-[#0A84FF]"
                                  : index === 1
                                    ? "bg-[#30D158]"
                                    : index === 2
                                      ? "bg-[#5E5CE6]"
                                      : "bg-[#FF9500]"
                                }`}
                            ></div>
                            <span className="text-sm text-gray-700 font-light">{item.type}</span>
                          </div>
                          <div className="text-sm font-medium">{item.count}</div>
                        </div>
                        <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                          <div
                            className={`h-full rounded-full ${index === 0
                                ? "bg-[#0A84FF]"
                                : index === 1
                                  ? "bg-[#30D158]"
                                  : index === 2
                                    ? "bg-[#5E5CE6]"
                                    : "bg-[#FF9500]"
                              }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Insights */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#FFE5E7] to-[#FFF8E6] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Security Insights</h3>
                    <Shield className="h-5 w-5 text-[#FF453A]" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#FFE5E7]/50 rounded-lg">
                      <div className="rounded-full bg-[#FFE5E7] p-2">
                        <AlertTriangle className="h-4 w-4 text-[#FF453A]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Failed Login Attempts</div>
                        <div className="text-xs text-gray-500 font-light">12 attempts in the last 24 hours</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#FFF8E6]/50 rounded-lg">
                      <div className="rounded-full bg-[#FFF8E6] p-2">
                        <MapPin className="h-4 w-4 text-[#FF9500]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Unusual Locations</div>
                        <div className="text-xs text-gray-500 font-light">3 logins from new locations</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#E8F8EF]/50 rounded-lg">
                      <div className="rounded-full bg-[#E8F8EF] p-2">
                        <CheckCircle className="h-4 w-4 text-[#30D158]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Security Status</div>
                        <div className="text-xs text-gray-500 font-light">All systems operating normally</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button variant="ghost" className="text-[#FF453A] text-xs w-full font-medium">
                      View Security Report
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Performance Metrics</h3>
                    <Zap className="h-5 w-5 text-[#0A84FF]" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 font-light">Response Time</span>
                        <span className="text-sm font-medium">245ms</span>
                      </div>
                      <div className="h-2 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 font-light">Server Load</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="h-2 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 font-light">Memory Usage</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 font-light">API Requests</span>
                        <span className="text-sm font-medium">1,245/hr</span>
                      </div>
                      <div className="h-2 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button variant="ghost" className="text-[#0A84FF] text-xs w-full font-medium">
                      View Performance Dashboard
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default UserActivities