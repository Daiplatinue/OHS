import { useState, useEffect } from "react"
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo"
import {
  Bell,
  Search,
  ArrowRight,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  Trash2,
  Star,
  Archive,
  CheckCircle,
  MessageSquare,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Footer from "../Styles/Footer"

type NotificationStatus = "read" | "unread" | "starred" | "archived" | "deleted"
type NotificationCategory = "system" | "user" | "alert" | "update"
type NotificationPriority = "high" | "medium" | "low"

interface Notification {
  id: string
  title: string
  sender: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  preview: string
  timestamp: string
  timeAgo: string
  status: NotificationStatus
  category: NotificationCategory
  priority: NotificationPriority
  actions?: {
    label: string
    action: string
  }[]
  labels?: string[]
}

interface NotificationTemplate {
  id: string
  name: string
  usage: number
  lastUsed: string
  category: string
}

interface NotificationChannel {
  id: string
  name: string
  deliveryRate: number
  openRate: number
  status: "active" | "inactive"
  notificationCount: number
}

function MyNotificationsAdmin() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearTimeout(timer)
  }, [])

  // Format current time
  const timeString = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  // Sample notification data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "System Maintenance Completed",
      sender: {
        name: "System Admin",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SA",
      },
      content:
        "The scheduled system maintenance has been completed successfully. All systems are now operating normally. If you experience any issues, please contact the IT department.",
      preview: "The scheduled system maintenance has been completed successfully...",
      timestamp: "2025-03-17T09:30:00",
      timeAgo: "2 hours ago",
      status: "unread",
      category: "system",
      priority: "medium",
      labels: ["System", "Maintenance"],
    },
    {
      id: "2",
      title: "New User Registration",
      sender: {
        name: "User Management",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "UM",
      },
      content:
        "A new user has registered on the platform. Username: john.doe. Please review and approve their account if appropriate.",
      preview: "A new user has registered on the platform. Username: john.doe...",
      timestamp: "2025-03-17T08:15:00",
      timeAgo: "3 hours ago",
      status: "unread",
      category: "user",
      priority: "medium",
      actions: [
        {
          label: "Approve",
          action: "approve_user",
        },
        {
          label: "Reject",
          action: "reject_user",
        },
      ],
      labels: ["User", "Registration"],
    },
    {
      id: "3",
      title: "Critical Security Alert",
      sender: {
        name: "Security Team",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      content:
        "We've detected unusual login activity on your account from a new location. If this wasn't you, please secure your account immediately by changing your password.",
      preview: "We've detected unusual login activity on your account from a new location...",
      timestamp: "2025-03-16T23:45:00",
      timeAgo: "12 hours ago",
      status: "unread",
      category: "alert",
      priority: "high",
      actions: [
        {
          label: "Secure Account",
          action: "secure_account",
        },
        {
          label: "Ignore",
          action: "ignore_alert",
        },
      ],
      labels: ["Security", "Alert"],
    },
    {
      id: "4",
      title: "New Feature Announcement",
      sender: {
        name: "Product Team",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "PT",
      },
      content:
        "We're excited to announce the launch of our new dashboard feature! This update includes improved analytics, customizable widgets, and faster performance. Check it out now!",
      preview: "We're excited to announce the launch of our new dashboard feature!...",
      timestamp: "2025-03-16T14:30:00",
      timeAgo: "1 day ago",
      status: "read",
      category: "update",
      priority: "medium",
      actions: [
        {
          label: "View Feature",
          action: "view_feature",
        },
      ],
      labels: ["Product", "Update"],
    },
    {
      id: "5",
      title: "Payment Processing Failed",
      sender: {
        name: "Billing System",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "BS",
      },
      content:
        "Your recent payment for Invoice #INV-2025-0342 could not be processed due to an expired credit card. Please update your payment information to avoid service interruption.",
      preview: "Your recent payment for Invoice #INV-2025-0342 could not be processed...",
      timestamp: "2025-03-15T10:15:00",
      timeAgo: "2 days ago",
      status: "starred",
      category: "alert",
      priority: "high",
      actions: [
        {
          label: "Update Payment",
          action: "update_payment",
        },
      ],
      labels: ["Billing", "Payment"],
    },
    {
      id: "6",
      title: "Weekly Analytics Report",
      sender: {
        name: "Analytics Engine",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AE",
      },
      content:
        "Your weekly analytics report is ready. Highlights: 15% increase in user engagement, 8% growth in revenue, 12% reduction in customer complaints. View the full report for more details.",
      preview: "Your weekly analytics report is ready. Highlights: 15% increase in user engagement...",
      timestamp: "2025-03-14T09:00:00",
      timeAgo: "3 days ago",
      status: "read",
      category: "system",
      priority: "low",
      actions: [
        {
          label: "View Report",
          action: "view_report",
        },
      ],
      labels: ["Analytics", "Report"],
    },
    {
      id: "7",
      title: "Account Verification Required",
      sender: {
        name: "Compliance Team",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CT",
      },
      content:
        "To comply with regulatory requirements, we need to verify your account. Please submit the required documentation within the next 7 days to avoid account limitations.",
      preview: "To comply with regulatory requirements, we need to verify your account...",
      timestamp: "2025-03-13T16:20:00",
      timeAgo: "4 days ago",
      status: "unread",
      category: "alert",
      priority: "high",
      actions: [
        {
          label: "Verify Now",
          action: "verify_account",
        },
      ],
      labels: ["Compliance", "Verification"],
    },
  ]

  // Notification metrics
  const notificationMetrics = {
    totalNotifications: 342,
    unreadNotifications: 18,
    highPriority: 5,
    deliveryRate: 99,
  }

  // Notification templates
  const notificationTemplates: NotificationTemplate[] = [
    {
      id: "1",
      name: "System Maintenance",
      usage: 124,
      lastUsed: "Today",
      category: "System",
    },
    {
      id: "2",
      name: "New User Welcome",
      usage: 287,
      lastUsed: "Today",
      category: "User",
    },
    {
      id: "3",
      name: "Security Alert",
      usage: 98,
      lastUsed: "Yesterday",
      category: "Security",
    },
    {
      id: "4",
      name: "Payment Reminder",
      usage: 156,
      lastUsed: "2 days ago",
      category: "Billing",
    },
  ]

  // Notification channels
  const notificationChannels: NotificationChannel[] = [
    {
      id: "1",
      name: "In-App",
      deliveryRate: 100,
      openRate: 68,
      status: "active",
      notificationCount: 1245,
    },
    {
      id: "2",
      name: "Email",
      deliveryRate: 98,
      openRate: 42,
      status: "active",
      notificationCount: 3250,
    },
    {
      id: "3",
      name: "Push",
      deliveryRate: 95,
      openRate: 74,
      status: "active",
      notificationCount: 2180,
    },
  ]

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab === "unread" && notification.status === "unread") return true
    if (activeTab === "starred" && notification.status === "starred") return true
    if (activeTab === "archived" && notification.status === "archived") return true
    if (activeTab === "trash" && notification.status === "deleted") return true

    // If not matching any tab, return false
    if (activeTab !== "all") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.sender.name.toLowerCase().includes(query) ||
        notification.content.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (filterCategory !== "all") {
      return notification.category === filterCategory
    }

    return true
  })

  // Handle notification selection
  const handleNotificationSelect = (notification: Notification) => {
    setSelectedNotification(notification === selectedNotification ? null : notification)
  }

  // Handle checkbox selection
  const handleCheckboxChange = (notificationId: string) => {
    setSelectedNotifications((prev) => {
      if (prev.includes(notificationId)) {
        return prev.filter((id) => id !== notificationId)
      } else {
        return [...prev, notificationId]
      }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((notification) => notification.id))
    }
  }

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on notifications:`, selectedNotifications)
    // In a real app, you would update the notifications here
    setSelectedNotifications([])
  }

  // Handle notification action
  const handleNotificationAction = (action: string) => {
    console.log(`Performing action: ${action}`)
    // In a real app, you would handle the action here
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDockCeo />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Notification Management</h1>
            <p className="text-gray-500 text-sm font-light">Manage all system and user notifications in one place</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Notification Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Notification Overview</h2>
                  <p className="text-white/90 font-light">Monitor and manage all system notifications</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-white text-[#0A84FF] hover:bg-white/90 border-0">
                    <Plus className="mr-2 h-4 w-4" />
                    Create
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Notifications</span>
                  </div>
                  <div className="text-3xl font-medium">{notificationMetrics.totalNotifications}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Unread</span>
                  </div>
                  <div className="text-3xl font-medium">{notificationMetrics.unreadNotifications}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>-3% since yesterday</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">High Priority</span>
                  </div>
                  <div className="text-3xl font-medium">{notificationMetrics.highPriority}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+2 since morning</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Delivery Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{notificationMetrics.deliveryRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+1% this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Notification List and Detail - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="select-all"
                      className="mr-2"
                      checked={
                        selectedNotifications.length > 0 &&
                        selectedNotifications.length === filteredNotifications.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <div className="flex gap-1">
                      {selectedNotifications.length > 0 ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleBulkAction("archive")}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleBulkAction("delete")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleBulkAction("mark-read")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => handleBulkAction("star")}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Select defaultValue="all" onValueChange={setFilterCategory}>
                          <SelectTrigger className="w-[180px] h-8 text-xs bg-[#F2F2F7] border-0">
                            <SelectValue placeholder="Filter by category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="alert">Alert</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      className="pl-9 bg-[#F2F2F7] border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex border-b border-gray-100">
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start bg-[#F2F2F7] p-0 h-auto">
                    <TabsTrigger
                      value="all"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <Bell className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">All</span>
                      {notificationMetrics.totalNotifications > 0 && (
                        <Badge className="ml-1 bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">
                          {notificationMetrics.totalNotifications}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <AlertCircle className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Unread</span>
                      {notificationMetrics.unreadNotifications > 0 && (
                        <Badge className="ml-1 bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">
                          {notificationMetrics.unreadNotifications}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="starred"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <Star className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Starred</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="archived"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <Archive className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Archived</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F2F7] mb-4">
                      <Bell className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
                    <p className="text-gray-500 font-light">
                      {searchQuery ? "Try a different search term" : "Your selected folder is empty"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-[#F2F2F7]/50 cursor-pointer transition-colors ${selectedNotification?.id === notification.id ? "bg-[#E9F6FF]/50" : ""} ${notification.status === "unread" ? "bg-[#F2F2F7]/50" : ""}`}
                      onClick={() => handleNotificationSelect(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center pt-1">
                          <Checkbox
                            id={`notification-${notification.id}`}
                            className="mr-2"
                            checked={selectedNotifications.includes(notification.id)}
                            onCheckedChange={() => handleCheckboxChange(notification.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {notification.status === "starred" ? (
                            <Star className="h-4 w-4 text-[#FF9500] fill-[#FF9500]" />
                          ) : (
                            <button
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle star action
                              }}
                            >
                              <Star className="h-4 w-4 text-gray-300 hover:text-[#FF9500]" />
                            </button>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={notification.sender.avatar} />
                                <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                                  {notification.sender.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className={`font-medium ${notification.status === "unread" ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.sender.name}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 font-light">{notification.timeAgo}</div>
                          </div>

                          <h3
                            className={`text-sm mb-1 truncate ${notification.status === "unread" ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                          >
                            {notification.title}
                          </h3>

                          <p className="text-xs text-gray-500 font-light line-clamp-2">{notification.preview}</p>

                          <div className="flex items-center mt-2">
                            {notification.priority === "high" && (
                              <Badge className="mr-2 bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7]">High</Badge>
                            )}

                            {notification.labels?.map((label, index) => (
                              <Badge key={index} className="mr-2 bg-[#E9F6FF] text-[#0A84FF] hover:bg-[#E9F6FF]">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedNotification && (
                <div className="border-t border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedNotification.title}</h2>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white shadow-sm">
                        <AvatarImage src={selectedNotification.sender.avatar} />
                        <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                          {selectedNotification.sender.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedNotification.sender.name}</div>
                        <div className="text-xs text-gray-500 font-light">
                          <span>{selectedNotification.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {selectedNotification.priority === "high" && (
                        <Badge className="bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7] mr-2">High Priority</Badge>
                      )}
                      {selectedNotification.priority === "medium" && (
                        <Badge className="bg-[#FFF8E6] text-[#FF9500] hover:bg-[#FFF8E6] mr-2">Medium Priority</Badge>
                      )}
                      {selectedNotification.priority === "low" && (
                        <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF] mr-2">Low Priority</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 whitespace-pre-line text-gray-700 font-light">
                    {selectedNotification.content}
                  </div>

                  {selectedNotification.actions && selectedNotification.actions.length > 0 && (
                    <div className="flex gap-2 justify-end">
                      {selectedNotification.actions.map((action, index) => (
                        <Button
                          key={index}
                          className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white border-0"
                          onClick={() => handleNotificationAction(action.action)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Notification Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Notification Templates */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Notification Templates</h3>
                    <Bell className="h-4 w-4 text-[#0A84FF]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notificationTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">{template.name}</h4>
                          <Badge className="bg-[#E9F6FF] text-[#0A84FF] hover:bg-[#E9F6FF]">{template.category}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 font-light">
                          <span>Used {template.usage} times</span>
                          <span>Last used: {template.lastUsed}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <Button variant="ghost" className="text-[#0A84FF] text-xs w-full font-medium">
                      View All Templates
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Channels */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2EBFF] to-[#FFE5E7]/30 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Notification Channels</h3>
                    <MessageSquare className="h-4 w-4 text-[#5E5CE6]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notificationChannels.map((channel) => (
                      <div key={channel.id} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">{channel.name}</h4>
                          {channel.status === "active" ? (
                            <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Active</Badge>
                          ) : (
                            <Badge className="bg-[#F2F2F7] text-gray-700 hover:bg-[#F2F2F7]">Inactive</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="bg-[#F2F2F7] rounded p-2 text-center">
                            <div className="text-xs text-gray-500 font-light">Sent</div>
                            <div className="font-medium">{channel.notificationCount.toLocaleString()}</div>
                          </div>
                          <div className="bg-[#F2F2F7] rounded p-2 text-center">
                            <div className="text-xs text-gray-500 font-light">Delivery</div>
                            <div className="font-medium">{channel.deliveryRate}%</div>
                          </div>
                          <div className="bg-[#F2F2F7] rounded p-2 text-center">
                            <div className="text-xs text-gray-500 font-light">Open Rate</div>
                            <div className="font-medium">{channel.openRate}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default MyNotificationsAdmin