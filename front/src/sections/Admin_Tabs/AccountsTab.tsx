import { useState, useEffect } from "react"
import {
  Users,
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  UserCheck,
  UserX,
  Shield,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  Download,
  RefreshCw,
  Clock,
  Calendar,
  Zap,
  Star,
  Settings,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function AccountsTab() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedAccount, setSelectedAccount] = useState<{ id: number; name: string; email: string; role: string; status: string; joinDate: string; lastLogin: string; avatar: string; services: number; spent: string; phone: string; location: string; rating: number; recentActivity: string; paymentMethod: string; verificationStatus: string; } | null>(null)

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

  // Sample account data
  const accounts = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "May 12, 2023",
      lastLogin: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 8,
      spent: "$1,245.00",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      rating: 4.8,
      recentActivity: "Booked Plumbing Service",
      paymentMethod: "Credit Card",
      verificationStatus: "Verified",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "Apr 28, 2023",
      lastLogin: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 12,
      spent: "$2,180.50",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      rating: 4.5,
      recentActivity: "Left a Review",
      paymentMethod: "PayPal",
      verificationStatus: "Verified",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Service Provider",
      status: "Active",
      joinDate: "Mar 15, 2023",
      lastLogin: "5 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 32,
      spent: "$0.00",
      phone: "+1 (555) 345-6789",
      location: "Chicago, USA",
      rating: 4.9,
      recentActivity: "Completed Service",
      paymentMethod: "Direct Deposit",
      verificationStatus: "Verified",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "Customer",
      status: "Inactive",
      joinDate: "Feb 10, 2023",
      lastLogin: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 3,
      spent: "$450.75",
      phone: "+1 (555) 456-7890",
      location: "Miami, USA",
      rating: 4.2,
      recentActivity: "Updated Profile",
      paymentMethod: "Credit Card",
      verificationStatus: "Verified",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      role: "Service Provider",
      status: "Pending",
      joinDate: "May 5, 2023",
      lastLogin: "3 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 0,
      spent: "$0.00",
      phone: "+1 (555) 567-8901",
      location: "Seattle, USA",
      rating: 0,
      recentActivity: "Submitted Documents",
      paymentMethod: "Awaiting Setup",
      verificationStatus: "Pending",
    },
    {
      id: 6,
      name: "Jennifer Martinez",
      email: "jennifer.m@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "Jan 8, 2023",
      lastLogin: "Just now",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 0,
      spent: "$0.00",
      phone: "+1 (555) 678-9012",
      location: "Boston, USA",
      rating: 5.0,
      recentActivity: "System Configuration",
      paymentMethod: "N/A",
      verificationStatus: "Verified",
    },
    {
      id: 7,
      name: "Robert Taylor",
      email: "robert.t@example.com",
      role: "Customer",
      status: "Suspended",
      joinDate: "Apr 2, 2023",
      lastLogin: "1 month ago",
      avatar: "/placeholder.svg?height=40&width=40",
      services: 1,
      spent: "$85.00",
      phone: "+1 (555) 789-0123",
      location: "Denver, USA",
      rating: 2.1,
      recentActivity: "Payment Failed",
      paymentMethod: "Credit Card (Expired)",
      verificationStatus: "Verified",
    },
  ]

  // Account statistics
  const accountStats = {
    totalAccounts: 842,
    activeUsers: 685,
    newThisMonth: 48,
    conversionRate: 68,
  }

  // Account distribution data
  const accountDistribution = [
    { role: "Customers", percentage: 68, count: 573 },
    { role: "Service Providers", percentage: 24, count: 202 },
    { role: "Administrators", percentage: 8, count: 67 },
  ]

  // Account status data
  const accountStatus = [
    { status: "Active", count: 685, percentage: 81 },
    { status: "Inactive", count: 98, percentage: 12 },
    { status: "Pending", count: 42, percentage: 5 },
    { status: "Suspended", count: 17, percentage: 2 },
  ]

  // Recent account activity
  const recentActivity = [
    {
      type: "New account created",
      user: "David Wilson",
      role: "Service Provider",
      time: "2 hours ago",
      icon: <UserPlus className="h-4 w-4" />,
      color: "green",
    },
    {
      type: "Account verification pending",
      user: "Michael Brown",
      role: "Service Provider",
      time: "5 hours ago",
      icon: <AlertCircle className="h-4 w-4" />,
      color: "amber",
    },
    {
      type: "Account activated",
      user: "Sarah Johnson",
      role: "Customer",
      time: "1 day ago",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "sky",
    },
    {
      type: "Account suspended",
      user: "Robert Taylor",
      role: "Customer",
      time: "2 days ago",
      icon: <XCircle className="h-4 w-4" />,
      color: "red",
    },
  ]

  // Filter accounts based on active tab
  const filteredAccounts = accounts.filter((account) => {
    if (activeTab === "all") return true
    if (activeTab === "customers") return account.role === "Customer"
    if (activeTab === "providers") return account.role === "Service Provider"
    if (activeTab === "admins") return account.role === "Admin"
    if (activeTab === "inactive") return account.status !== "Active"
    return true
  })

  // Status badge renderer
  const renderStatusBadge = (status : any) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-600 hover:bg-green-100">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Inactive</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-600 hover:bg-amber-100">Pending</Badge>
      case "Suspended":
        return <Badge className="bg-red-100 text-red-600 hover:bg-red-100">Suspended</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">{status}</Badge>
    }
  }

  // Role badge renderer
  const renderRoleBadge = (role : any) => {
    switch (role) {
      case "Customer":
        return <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">Customer</Badge>
      case "Service Provider":
        return <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">Service Provider</Badge>
      case "Admin":
        return <Badge className="bg-indigo-100 text-indigo-600 hover:bg-indigo-100">Admin</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">{role}</Badge>
    }
  }

  // Handle account selection for details view
  const handleAccountSelect = (account : any) => {
    setSelectedAccount(account === selectedAccount ? null : account)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Accounts Management</h1>
            <p className="text-gray-500 text-sm">View and manage all user accounts in your system</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-bold text-sky-500">{timeString}</div>
            <div className="text-sm text-gray-500">{dateString}</div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Account Overview</h2>
                  <p className="text-blue-100">Manage and monitor all registered accounts</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-blue-700 text-white hover:bg-blue-800">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Account
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Accounts</span>
                  </div>
                  <div className="text-3xl font-bold">{accountStats.totalAccounts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+12% increase</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <div className="text-3xl font-bold">{accountStats.activeUsers}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% increase</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">New This Month</span>
                  </div>
                  <div className="text-3xl font-bold">{accountStats.newThisMonth}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+24% increase</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <ChevronDown className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Conversion Rate</span>
                  </div>
                  <div className="text-3xl font-bold">{accountStats.conversionRate}%</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+5% increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Accounts List - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-lg font-bold text-gray-800">Registered Accounts</h2>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search accounts..." className="pl-9 bg-gray-50 border-0" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-0">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="customer">Customers</SelectItem>
                        <SelectItem value="provider">Service Providers</SelectItem>
                        <SelectItem value="admin">Administrators</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="bg-gray-50 border-0">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="bg-gray-100 mb-4">
                    <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="customers" className="text-xs data-[state=active]:bg-white">
                      Customers
                    </TabsTrigger>
                    <TabsTrigger value="providers" className="text-xs data-[state=active]:bg-white">
                      Providers
                    </TabsTrigger>
                    <TabsTrigger value="admins" className="text-xs data-[state=active]:bg-white">
                      Admins
                    </TabsTrigger>
                    <TabsTrigger value="inactive" className="text-xs data-[state=active]:bg-white">
                      Inactive
                    </TabsTrigger>
                  </TabsList>

                  <div className="space-y-3">
                    {filteredAccounts.map((account) => (
                      <div
                        key={account.id}
                        className={`bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer ${selectedAccount?.id === account.id ? "ring-2 ring-blue-500" : ""}`}
                        onClick={() => handleAccountSelect(account)}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={account.avatar} alt={account.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {account.name.charAt(0)}
                              {account.name.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className="font-medium text-gray-800">{account.name}</h3>
                              <div className="flex flex-wrap gap-2">
                                {renderStatusBadge(account.status)}
                                {renderRoleBadge(account.role)}
                              </div>
                            </div>

                            <div className="text-sm text-gray-500 mt-1">{account.email}</div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-3 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span>Joined: {account.joinDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span>Last login: {account.lastLogin}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-gray-400" />
                                <span>Services: {account.services}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Account
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {account.status === "Active" ? (
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {account.role === "Customer" && (
                              <div className="text-lg font-bold text-gray-800">{account.spent}</div>
                            )}
                          </div>
                        </div>

                        {selectedAccount?.id === account.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{account.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{account.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span>{account.location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-gray-700">Account Details</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-gray-400" />
                                    <span>Rating</span>
                                  </div>
                                  <span className="font-medium">
                                    {account.rating > 0 ? account.rating.toFixed(1) : "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-gray-400" />
                                    <span>Recent Activity</span>
                                  </div>
                                  <span className="font-medium">{account.recentActivity}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-gray-400" />
                                    <span>Verification</span>
                                  </div>
                                  <span
                                    className={`font-medium ${account.verificationStatus === "Verified" ? "text-green-600" : "text-amber-600"}`}
                                  >
                                    {account.verificationStatus}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                View Full Profile
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Tabs>
              </div>

              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredAccounts.length}</span> of{" "}
                  <span className="font-medium">{accounts.length}</span> accounts
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Account Distribution */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Account Distribution</h3>
                    <PieChart className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-36 h-36">
                      {/* Circular chart */}
                      <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                      <div
                        className="absolute inset-0 rounded-full bg-blue-500"
                        style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full bg-indigo-500"
                        style={{ clipPath: "polygon(50% 50%, 100% 0%, 100% 24%, 50% 24%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full bg-sky-300"
                        style={{ clipPath: "polygon(50% 50%, 100% 24%, 100% 32%, 50% 32%)" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                          <Users className="h-10 w-10 text-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {accountDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0 ? "bg-blue-500" : index === 1 ? "bg-indigo-500" : "bg-sky-300"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700">{item.role}</span>
                          </div>
                          <div className="text-sm font-medium">{item.count}</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              index === 0 ? "bg-blue-500" : index === 1 ? "bg-indigo-500" : "bg-sky-300"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Account Status</h3>
                    <BarChart3 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {accountStatus.map((status, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500">{status.status}</div>
                        <div className="text-lg font-bold text-gray-800">{status.count}</div>
                        <div
                          className={`text-xs ${
                            status.status === "Active"
                              ? "text-green-600"
                              : status.status === "Inactive"
                                ? "text-amber-600"
                                : status.status === "Pending"
                                  ? "text-sky-600"
                                  : "text-red-600"
                          }`}
                        >
                          {status.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {accountStatus.map((status, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                status.status === "Active"
                                  ? "bg-green-500"
                                  : status.status === "Inactive"
                                    ? "bg-amber-500"
                                    : status.status === "Pending"
                                      ? "bg-sky-500"
                                      : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700">{status.status}</span>
                          </div>
                          <div className="text-sm font-medium">{status.percentage}%</div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              status.status === "Active"
                                ? "bg-green-500"
                                : status.status === "Inactive"
                                  ? "bg-amber-500"
                                  : status.status === "Pending"
                                    ? "bg-sky-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${status.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Account Activity */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                    <LineChart className="h-4 w-4 text-purple-500" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className={`rounded-full bg-${activity.color}-100 p-2 mt-1`}>
                            <div className={`text-${activity.color}-600`}>{activity.icon}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                              <p className="text-sm font-medium text-gray-800">{activity.type}</p>
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">{activity.user}</span> registered as a {activity.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t">
                    <Button variant="ghost" className="text-purple-600 text-xs w-full">
                      View All Activity
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Quick Actions</h3>
                    <Settings className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-blue-500 hover:bg-blue-600 h-auto py-3 flex flex-col items-center">
                      <UserPlus className="h-5 w-5 mb-1" />
                      <span>Add Account</span>
                    </Button>
                    <Button className="bg-purple-500 hover:bg-purple-600 h-auto py-3 flex flex-col items-center">
                      <UserCheck className="h-5 w-5 mb-1" />
                      <span>Verify Accounts</span>
                    </Button>
                    <Button className="bg-amber-500 hover:bg-amber-600 h-auto py-3 flex flex-col items-center">
                      <Download className="h-5 w-5 mb-1" />
                      <span>Export Data</span>
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 h-auto py-3 flex flex-col items-center">
                      <UserX className="h-5 w-5 mb-1" />
                      <span>Inactive Cleanup</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Registrations */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">New Registrations</h3>
                <UserPlus className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-full h-16">
                  {/* Mini bar chart */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between h-12 px-2">
                    {[35, 42, 27, 35, 20, 46, 30, 28, 32, 45, 55, 68].map((height, i) => (
                      <div key={i} className="w-[6%] bg-blue-500 rounded-t-sm" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">48</div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">+24%</div>
                  <div className="text-sm text-gray-500">vs last month</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Customers</span>
                  </div>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span>Service Providers</span>
                  </div>
                  <span className="font-medium">16</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retention Rate */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Retention Rate</h3>
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  {/* Circular progress */}
                  <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                  <div
                    className="absolute inset-0 rounded-full bg-green-500"
                    style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800">78%</div>
                      <div className="text-xs text-gray-500">Retention</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">30 Day Retention</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">60 Day Retention</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">90 Day Retention</span>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "52%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Geographic Distribution</h3>
                <Globe className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-full h-32 bg-indigo-50 rounded-lg overflow-hidden">
                  {/* Simplified map visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-16 w-16 text-indigo-200" />
                  </div>
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-indigo-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">United States</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Europe</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Asia</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Other</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button variant="ghost" className="text-indigo-600 text-xs w-full">
                  View Detailed Map
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AccountsTab