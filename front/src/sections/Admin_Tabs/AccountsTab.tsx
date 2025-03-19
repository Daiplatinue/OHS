"use client"

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
  Shield,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  RefreshCw,
  Clock,
  Calendar,
  Zap,
  Star,
  Mail,
  Phone,
  MapPin,
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
import Footer from "../Styles/Footer"

function AccountsTab() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedAccount, setSelectedAccount] = useState<{
    id: number
    name: string
    email: string
    role: string
    status: string
    joinDate: string
    lastLogin: string
    avatar: string
    services: number
    spent: string
    phone: string
    location: string
    rating: number
    recentActivity: string
    paymentMethod: string
    verificationStatus: string
  } | null>(null)

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
    {
      id: 8,
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
    {
      id: 9,
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
    {
      id: 10,
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
    {
      id: 11,
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
    {
      id: 12,
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
  const renderStatusBadge = (status: any) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">{status}</Badge>
      case "Pending":
        return <Badge className="bg-[#FFF8E6] text-[#FF9500] hover:bg-[#FFF8E6]">{status}</Badge>
      case "Suspended":
        return <Badge className="bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7]">{status}</Badge>
      default:
        return <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">{status}</Badge>
    }
  }

  // Role badge renderer
  const renderRoleBadge = (role: any) => {
    switch (role) {
      case "Customer":
        return <Badge className="bg-[#E9F6FF] text-[#0A84FF] hover:bg-[#E9F6FF]">{role}</Badge>
      case "Service Provider":
        return <Badge className="bg-[#F2EBFF] text-[#5E5CE6] hover:bg-[#F2EBFF]">{role}</Badge>
      case "Admin":
        return <Badge className="bg-[#E9F6FF] text-[#5AC8FA] hover:bg-[#E9F6FF]">{role}</Badge>
      default:
        return <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">{role}</Badge>
    }
  }

  // Handle account selection for details view
  const handleAccountSelect = (account: any) => {
    setSelectedAccount(account === selectedAccount ? null : account)
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
            <h1 className="text-2xl font-semibold text-gray-800">Accounts Management</h1>
            <p className="text-gray-500 text-sm font-light">View and manage all user accounts in your system</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Account Overview</h2>
                  <p className="text-white/90 font-light">Manage and monitor all registered accounts</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-white text-[#0A84FF] hover:bg-white/90 border-0">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Account
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Accounts</span>
                  </div>
                  <div className="text-3xl font-medium">{accountStats.totalAccounts}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+12% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <div className="text-3xl font-medium">{accountStats.activeUsers}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">New This Month</span>
                  </div>
                  <div className="text-3xl font-medium">{accountStats.newThisMonth}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+24% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <ChevronDown className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Conversion Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{accountStats.conversionRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
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
          <div className="lg:col-span-2 overflow-auto max-h-[95rem]">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-lg font-medium text-gray-800">Registered Accounts</h2>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search accounts..." className="pl-9 bg-[#F2F2F7] border-0" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[180px] bg-[#F2F2F7] border-0">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="customer">Customers</SelectItem>
                        <SelectItem value="provider">Service Providers</SelectItem>
                        <SelectItem value="admin">Administrators</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="bg-[#F2F2F7] border-0">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="bg-[#F2F2F7] mb-4">
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
                        className={`bg-[#F2F2F7]/50 rounded-xl p-4 hover:bg-[#F2F2F7] transition-colors cursor-pointer ${selectedAccount?.id === account.id ? "ring-1 ring-[#0A84FF]" : ""}`}
                        onClick={() => handleAccountSelect(account)}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={account.avatar} alt={account.name} />
                            <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
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

                            <div className="text-sm text-gray-500 mt-1 font-light">{account.email}</div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-3 text-xs text-gray-600 font-light">
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
                                <DropdownMenuItem className="text-[#FF453A]">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {account.role === "Customer" && (
                              <div className="text-lg font-medium text-gray-800">{account.spent}</div>
                            )}
                          </div>
                        </div>

                        {selectedAccount?.id === account.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-light">
                                  <Mail className="h-4 w-4 text-[#0A84FF]" />
                                  <span>{account.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-light">
                                  <Phone className="h-4 w-4 text-[#0A84FF]" />
                                  <span>{account.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-light">
                                  <MapPin className="h-4 w-4 text-[#0A84FF]" />
                                  <span>{account.location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-gray-700">Account Details</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-[#0A84FF]" />
                                    <span className="font-light">Rating</span>
                                  </div>
                                  <span className="font-medium">
                                    {account.rating > 0 ? account.rating.toFixed(1) : "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-[#0A84FF]" />
                                    <span className="font-light">Recent Activity</span>
                                  </div>
                                  <span className="font-medium">{account.recentActivity}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-[#0A84FF]" />
                                    <span className="font-light">Verification</span>
                                  </div>
                                  <span
                                    className={`font-medium ${account.verificationStatus === "Verified" ? "text-[#30D158]" : "text-[#FF9500]"}`}
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
                                className="text-[#0A84FF] border-[#0A84FF]/20 hover:bg-[#E9F6FF]"
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

              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-500 font-light">
                  Showing <span className="font-medium">{filteredAccounts.length}</span> of{" "}
                  <span className="font-medium">{accounts.length}</span> accounts
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-700">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-700">
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
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Account Distribution</h3>
                    <PieChart className="h-4 w-4 text-[#0A84FF]" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-36 h-36">
                      {/* Circular chart */}
                      <div className="absolute inset-0 rounded-full bg-[#F2F2F7]"></div>
                      <div
                        className="absolute inset-0 rounded-full bg-[#0A84FF]"
                        style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full bg-[#5E5CE6]"
                        style={{ clipPath: "polygon(50% 50%, 100% 0%, 100% 24%, 50% 24%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full bg-[#5AC8FA]"
                        style={{ clipPath: "polygon(50% 50%, 100% 24%, 100% 32%, 50% 32%)" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                          <Users className="h-10 w-10 text-[#0A84FF]" />
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
                                index === 0 ? "bg-[#0A84FF]" : index === 1 ? "bg-[#5E5CE6]" : "bg-[#5AC8FA]"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700 font-light">{item.role}</span>
                          </div>
                          <div className="text-sm font-medium">{item.count}</div>
                        </div>
                        <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              index === 0 ? "bg-[#0A84FF]" : index === 1 ? "bg-[#5E5CE6]" : "bg-[#5AC8FA]"
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
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E8F8EF] to-[#E9F6FF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Account Status</h3>
                    <BarChart3 className="h-4 w-4 text-[#30D158]" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {accountStatus.map((status, index) => (
                      <div key={index} className="bg-[#F2F2F7] rounded-xl p-3">
                        <div className="text-xs text-gray-500 font-light">{status.status}</div>
                        <div className="text-lg font-medium text-gray-800">{status.count}</div>
                        <div
                          className={`text-xs ${
                            status.status === "Active"
                              ? "text-[#30D158]"
                              : status.status === "Inactive"
                                ? "text-[#8E8E93]"
                                : status.status === "Pending"
                                  ? "text-[#FF9500]"
                                  : "text-[#FF453A]"
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
                                  ? "bg-[#30D158]"
                                  : status.status === "Inactive"
                                    ? "bg-[#8E8E93]"
                                    : status.status === "Pending"
                                      ? "bg-[#FF9500]"
                                      : "bg-[#FF453A]"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700 font-light">{status.status}</span>
                          </div>
                          <div className="text-sm font-medium">{status.percentage}%</div>
                        </div>
                        <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              status.status === "Active"
                                ? "bg-[#30D158]"
                                : status.status === "Inactive"
                                  ? "bg-[#8E8E93]"
                                  : status.status === "Pending"
                                    ? "bg-[#FF9500]"
                                    : "bg-[#FF453A]"
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
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2EBFF] to-[#FFE5E7]/30 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Recent Activity</h3>
                    <LineChart className="h-4 w-4 text-[#5E5CE6]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-full p-2 mt-1 ${
                              activity.color === "green"
                                ? "bg-[#E8F8EF] text-[#30D158]"
                                : activity.color === "amber"
                                  ? "bg-[#FFF8E6] text-[#FF9500]"
                                  : activity.color === "sky"
                                    ? "bg-[#E9F6FF] text-[#0A84FF]"
                                    : "bg-[#FFE5E7] text-[#FF453A]"
                            }`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                              <p className="text-sm font-medium text-gray-800">{activity.type}</p>
                              <span className="text-xs text-gray-500 font-light">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 font-light">
                              <span className="font-medium">{activity.user}</span> registered as a {activity.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <Button variant="ghost" className="text-[#5E5CE6] text-xs w-full font-medium">
                      View All Activity
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

export default AccountsTab

