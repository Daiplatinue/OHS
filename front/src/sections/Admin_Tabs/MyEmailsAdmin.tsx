import { useState, useEffect } from "react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import {
  Mail,
  Search,
  ArrowRight,
  Download,
  RefreshCw,
  ChevronRight,
  BarChart3,
  AlertCircle,
  Trash2,
  Eye,
  Star,
  Archive,
  Send,
  Inbox,
  FileText,
  Paperclip,
  Reply,
  Forward,
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

type EmailStatus = "read" | "unread" | "starred" | "archived" | "deleted"
type EmailCategory = "primary" | "social" | "promotions" | "updates"
type EmailPriority = "high" | "medium" | "low"

interface EmailAttachment {
  name: string
  size: string
  type: string
}

interface Email {
  id: string
  subject: string
  sender: {
    name: string
    email: string
    avatar: string
    initials: string
  }
  recipients: string[]
  content: string
  preview: string
  timestamp: string
  timeAgo: string
  status: EmailStatus
  category: EmailCategory
  priority: EmailPriority
  hasAttachments: boolean
  attachments?: EmailAttachment[]
  labels?: string[]
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  usage: number
  lastUsed: string
  category: string
}

interface EmailCampaign {
  id: string
  name: string
  subject: string
  sentCount: number
  openRate: number
  clickRate: number
  status: "active" | "scheduled" | "completed" | "draft"
  sentDate: string
}

function MyEmailsAdmin() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
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

  // Sample email data
  const emails: Email[] = [
    {
      id: "1",
      subject: "Weekly Performance Report - Q1 2025",
      sender: {
        name: "Analytics Team",
        email: "analytics@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AT",
      },
      recipients: ["admin@yourcompany.com"],
      content:
        "Dear Admin,\n\nAttached is the weekly performance report for Q1 2025. Key highlights include:\n\n- 15% increase in user engagement\n- 8% growth in revenue\n- 12% reduction in customer complaints\n\nPlease review and share your feedback.\n\nBest regards,\nAnalytics Team",
      preview: "Attached is the weekly performance report for Q1 2025. Key highlights include...",
      timestamp: "2025-03-17T09:30:00",
      timeAgo: "2 hours ago",
      status: "unread",
      category: "primary",
      priority: "high",
      hasAttachments: true,
      attachments: [
        {
          name: "Q1_2025_Performance.pdf",
          size: "2.4 MB",
          type: "pdf",
        },
        {
          name: "Revenue_Charts.xlsx",
          size: "1.8 MB",
          type: "excel",
        },
      ],
      labels: ["Reports", "Important"],
    },
    {
      id: "2",
      subject: "New Feature Request: Customer Dashboard",
      sender: {
        name: "Product Team",
        email: "product@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "PT",
      },
      recipients: ["admin@yourcompany.com", "dev@yourcompany.com"],
      content:
        "Hi Team,\n\nWe've received multiple requests from customers for a comprehensive dashboard that displays all their service history and upcoming appointments.\n\nCould we schedule a meeting to discuss the feasibility and timeline for this feature?\n\nThanks,\nProduct Team",
      preview: "We've received multiple requests from customers for a comprehensive dashboard...",
      timestamp: "2025-03-16T16:45:00",
      timeAgo: "1 day ago",
      status: "read",
      category: "primary",
      priority: "medium",
      hasAttachments: false,
      labels: ["Feature Request"],
    },
    {
      id: "3",
      subject: "Urgent: System Maintenance Notice",
      sender: {
        name: "IT Department",
        email: "it@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "IT",
      },
      recipients: ["all-staff@yourcompany.com"],
      content:
        "ATTENTION ALL STAFF\n\nWe will be performing critical system maintenance this weekend, starting Friday at 10:00 PM and ending Saturday at 6:00 AM.\n\nDuring this time, all systems including email, CRM, and booking platforms will be unavailable.\n\nPlease plan accordingly and complete any urgent tasks before the maintenance window.\n\nIT Department",
      preview: "We will be performing critical system maintenance this weekend, starting Friday...",
      timestamp: "2025-03-16T11:20:00",
      timeAgo: "1 day ago",
      status: "read",
      category: "primary",
      priority: "high",
      hasAttachments: false,
      labels: ["Urgent", "Maintenance"],
    },
    {
      id: "4",
      subject: "Your Social Media Campaign Results",
      sender: {
        name: "Marketing Team",
        email: "marketing@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MT",
      },
      recipients: ["admin@yourcompany.com"],
      content:
        "Hello,\n\nYour recent social media campaign has concluded, and we're pleased to share the results:\n\n- 45,000 impressions\n- 3,200 clicks\n- 1,500 new followers\n- $3,200 in attributed revenue\n\nWould you like to schedule a follow-up campaign for next month?\n\nBest,\nMarketing Team",
      preview: "Your recent social media campaign has concluded, and we're pleased to share the results...",
      timestamp: "2025-03-15T14:10:00",
      timeAgo: "2 days ago",
      status: "read",
      category: "social",
      priority: "medium",
      hasAttachments: true,
      attachments: [
        {
          name: "Campaign_Results.pdf",
          size: "3.1 MB",
          type: "pdf",
        },
      ],
      labels: ["Marketing"],
    },
    {
      id: "5",
      subject: "Invoice #INV-2025-0342 for March Services",
      sender: {
        name: "Billing Department",
        email: "billing@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "BD",
      },
      recipients: ["admin@yourcompany.com", "finance@yourcompany.com"],
      content:
        "Dear Customer,\n\nAttached is your invoice #INV-2025-0342 for services rendered in March 2025.\n\nTotal Amount: $2,450.00\nDue Date: April 15, 2025\n\nPayment can be made via credit card, bank transfer, or check. Please refer to the invoice for detailed payment instructions.\n\nThank you for your business!\n\nBilling Department",
      preview: "Attached is your invoice #INV-2025-0342 for services rendered in March 2025...",
      timestamp: "2025-03-14T09:00:00",
      timeAgo: "3 days ago",
      status: "starred",
      category: "primary",
      priority: "medium",
      hasAttachments: true,
      attachments: [
        {
          name: "Invoice_INV-2025-0342.pdf",
          size: "1.2 MB",
          type: "pdf",
        },
      ],
      labels: ["Finance", "Invoice"],
    },
    {
      id: "6",
      subject: "50% OFF Spring Sale - Limited Time Only!",
      sender: {
        name: "SupplyCo",
        email: "promotions@supplyco.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      recipients: ["admin@yourcompany.com"],
      content:
        "SPRING SALE - 50% OFF EVERYTHING!\n\nDear Valued Customer,\n\nSpring is here, and so are the savings! For a limited time only, enjoy 50% off all products in our catalog.\n\nUse code: SPRING50 at checkout.\n\nOffer valid until March 31, 2025.\n\nShop now: https://supplyco.example.com/spring-sale\n\nSupplyCo Team",
      preview: "SPRING SALE - 50% OFF EVERYTHING! Dear Valued Customer, Spring is here, and so are the savings!...",
      timestamp: "2025-03-13T11:30:00",
      timeAgo: "4 days ago",
      status: "read",
      category: "promotions",
      priority: "low",
      hasAttachments: false,
      labels: ["Promotion"],
    },
    {
      id: "7",
      subject: "Customer Feedback: Service Improvement Suggestions",
      sender: {
        name: "Customer Relations",
        email: "feedback@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CR",
      },
      recipients: ["admin@yourcompany.com", "service@yourcompany.com"],
      content:
        "Hello Admin,\n\nWe've compiled the latest customer feedback and have identified several areas for service improvement:\n\n1. Faster response times for emergency service requests\n2. More flexible scheduling options\n3. Better communication during service delays\n\nAttached is the detailed report with customer comments and suggested action items.\n\nRegards,\nCustomer Relations Team",
      preview:
        "We've compiled the latest customer feedback and have identified several areas for service improvement...",
      timestamp: "2025-03-12T15:45:00",
      timeAgo: "5 days ago",
      status: "unread",
      category: "primary",
      priority: "high",
      hasAttachments: true,
      attachments: [
        {
          name: "Customer_Feedback_Report.pdf",
          size: "4.2 MB",
          type: "pdf",
        },
      ],
      labels: ["Feedback", "Important"],
    },
  ]

  // Email metrics
  const emailMetrics = {
    totalEmails: 842,
    unreadEmails: 24,
    sentToday: 18,
    openRate: 68,
  }

  // Email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to Our Service!",
      usage: 245,
      lastUsed: "Today",
      category: "Onboarding",
    },
    {
      id: "2",
      name: "Service Confirmation",
      subject: "Your Service Appointment is Confirmed",
      usage: 532,
      lastUsed: "Today",
      category: "Booking",
    },
    {
      id: "3",
      name: "Payment Receipt",
      subject: "Receipt for Your Recent Payment",
      usage: 421,
      lastUsed: "Yesterday",
      category: "Billing",
    },
    {
      id: "4",
      name: "Feedback Request",
      subject: "How Was Your Experience?",
      usage: 318,
      lastUsed: "2 days ago",
      category: "Customer Service",
    },
  ]

  // Email campaigns
  const emailCampaigns: EmailCampaign[] = [
    {
      id: "1",
      name: "Spring Promotion",
      subject: "Spring Deals You Don't Want to Miss!",
      sentCount: 5420,
      openRate: 42,
      clickRate: 18,
      status: "active",
      sentDate: "Mar 15, 2025",
    },
    {
      id: "2",
      name: "Customer Appreciation",
      subject: "A Special Thank You to Our Loyal Customers",
      sentCount: 3250,
      openRate: 58,
      clickRate: 24,
      status: "completed",
      sentDate: "Mar 10, 2025",
    },
    {
      id: "3",
      name: "New Service Announcement",
      subject: "Introducing Our New Premium Service",
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      status: "scheduled",
      sentDate: "Mar 25, 2025",
    },
  ]

  // Filter emails based on active tab and search query
  const filteredEmails = emails.filter((email) => {
    // Filter by tab
    if (activeTab === "inbox" && (email.status === "read" || email.status === "unread")) return true
    if (activeTab === "starred" && email.status === "starred") return true
    if (activeTab === "sent") return false // No sent emails in this demo
    if (activeTab === "drafts") return false // No drafts in this demo
    if (activeTab === "archived" && email.status === "archived") return true
    if (activeTab === "trash" && email.status === "deleted") return true

    // If not matching any tab, return false
    if (activeTab !== "inbox" && activeTab !== "all") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        email.subject.toLowerCase().includes(query) ||
        email.sender.name.toLowerCase().includes(query) ||
        email.sender.email.toLowerCase().includes(query) ||
        email.content.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (filterCategory !== "all") {
      return email.category === filterCategory
    }

    return true
  })

  // Handle email selection
  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email === selectedEmail ? null : email)
  }

  // Handle checkbox selection
  const handleCheckboxChange = (emailId: string) => {
    setSelectedEmails((prev) => {
      if (prev.includes(emailId)) {
        return prev.filter((id) => id !== emailId)
      } else {
        return [...prev, emailId]
      }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(filteredEmails.map((email) => email.id))
    }
  }

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on emails:`, selectedEmails)
    // In a real app, you would update the emails here
    setSelectedEmails([])
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
            <h1 className="text-2xl font-semibold text-gray-800">Email Management</h1>
            <p className="text-gray-500 text-sm font-light">Manage all email communications in one place</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Email Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Email Overview</h2>
                  <p className="text-white/90 font-light">Monitor and manage all email communications</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-white text-[#0A84FF] hover:bg-white/90 border-0">
                    <Send className="mr-2 h-4 w-4" />
                    Compose
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Emails</span>
                  </div>
                  <div className="text-3xl font-medium">{emailMetrics.totalEmails}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Unread</span>
                  </div>
                  <div className="text-3xl font-medium">{emailMetrics.unreadEmails}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>-5% since yesterday</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Sent Today</span>
                  </div>
                  <div className="text-3xl font-medium">{emailMetrics.sentToday}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+3 since morning</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Open Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{emailMetrics.openRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+4% this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Email List and Detail - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="select-all"
                      className="mr-2"
                      checked={selectedEmails.length > 0 && selectedEmails.length === filteredEmails.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <div className="flex gap-1">
                      {selectedEmails.length > 0 ? (
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
                            <Mail className="h-4 w-4" />
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
                            <SelectItem value="primary">Primary</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="promotions">Promotions</SelectItem>
                            <SelectItem value="updates">Updates</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search emails..."
                      className="pl-9 bg-[#F2F2F7] border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex border-b border-gray-100">
                <Tabs defaultValue="inbox" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start bg-[#F2F2F7] p-0 h-auto">
                    <TabsTrigger
                      value="inbox"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <Inbox className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Inbox</span>
                      {emailMetrics.unreadEmails > 0 && (
                        <Badge className="ml-1 bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">
                          {emailMetrics.unreadEmails}
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
                      value="sent"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <Send className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Sent</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="drafts"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-2x1 border-transparent data-[state=active]:border-gray-400"
                    >
                      <FileText className="h-4 w-4 text-gray-700" />
                      <span className="text-gray-700">Drafts</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F2F7] mb-4">
                      <Mail className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No emails found</h3>
                    <p className="text-gray-500 font-light">
                      {searchQuery ? "Try a different search term" : "Your selected folder is empty"}
                    </p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-4 hover:bg-[#F2F2F7]/50 cursor-pointer transition-colors ${selectedEmail?.id === email.id ? "bg-[#E9F6FF]/50" : ""} ${email.status === "unread" ? "bg-[#F2F2F7]/50" : ""}`}
                      onClick={() => handleEmailSelect(email)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center pt-1">
                          <Checkbox
                            id={`email-${email.id}`}
                            className="mr-2"
                            checked={selectedEmails.includes(email.id)}
                            onCheckedChange={() => handleCheckboxChange(email.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {email.status === "starred" ? (
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
                                <AvatarImage src={email.sender.avatar} />
                                <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                                  {email.sender.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span
                                className={`font-medium ${email.status === "unread" ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {email.sender.name}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 font-light">{email.timeAgo}</div>
                          </div>

                          <h3
                            className={`text-sm mb-1 truncate ${email.status === "unread" ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                          >
                            {email.subject}
                          </h3>

                          <p className="text-xs text-gray-500 font-light line-clamp-2">{email.preview}</p>

                          <div className="flex items-center mt-2">
                            {email.priority === "high" && (
                              <Badge className="mr-2 bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7]">High</Badge>
                            )}

                            {email.hasAttachments && (
                              <Badge className="mr-2 bg-[#F2F2F7] text-gray-700 hover:bg-[#F2F2F7]">
                                <Paperclip className="h-3 w-3 mr-1" />
                                {email.attachments?.length}
                              </Badge>
                            )}

                            {email.labels?.map((label, index) => (
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

              {selectedEmail && (
                <div className="border-t border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedEmail.subject}</h2>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Forward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white shadow-sm">
                        <AvatarImage src={selectedEmail.sender.avatar} />
                        <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                          {selectedEmail.sender.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedEmail.sender.name}</div>
                        <div className="text-xs text-gray-500 font-light">
                          <span>{selectedEmail.sender.email}</span>
                          <span className="mx-1">•</span>
                          <span>{selectedEmail.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 font-light">To: {selectedEmail.recipients.join(", ")}</div>
                  </div>

                  <div className="mb-6 whitespace-pre-line text-gray-700 font-light">{selectedEmail.content}</div>

                  {selectedEmail.hasAttachments && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">Attachments ({selectedEmail.attachments?.length})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedEmail.attachments?.map((attachment, index) => (
                          <div key={index} className="flex items-center p-3 border rounded-lg bg-[#F2F2F7]/50">
                            <div className="h-10 w-10 bg-[#E9F6FF] rounded flex items-center justify-center mr-3">
                              <FileText className="h-5 w-5 text-[#0A84FF]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{attachment.name}</div>
                              <div className="text-xs text-gray-500 font-light">{attachment.size}</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white border-0">
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Email Templates */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Email Templates</h3>
                    <FileText className="h-4 w-4 text-[#0A84FF]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {emailTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">{template.name}</h4>
                          <Badge className="bg-[#E9F6FF] text-[#0A84FF] hover:bg-[#E9F6FF]">{template.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 font-light mb-2">{template.subject}</p>
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

              {/* Email Campaigns */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2EBFF] to-[#FFE5E7]/30 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Email Campaigns</h3>
                    <BarChart3 className="h-4 w-4 text-[#5E5CE6]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {emailCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">{campaign.name}</h4>
                          {campaign.status === "active" && (
                            <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Active</Badge>
                          )}
                          {campaign.status === "scheduled" && (
                            <Badge className="bg-[#E9F6FF] text-[#0A84FF] hover:bg-[#E9F6FF]">Scheduled</Badge>
                          )}
                          {campaign.status === "completed" && (
                            <Badge className="bg-[#F2F2F7] text-gray-700 hover:bg-[#F2F2F7]">Completed</Badge>
                          )}
                          {campaign.status === "draft" && (
                            <Badge className="bg-[#FFF8E6] text-[#FF9500] hover:bg-[#FFF8E6]">Draft</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 font-light mb-2">{campaign.subject}</p>

                        {campaign.status !== "scheduled" && campaign.status !== "draft" && (
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="bg-[#F2F2F7] rounded p-2 text-center">
                              <div className="text-xs text-gray-500 font-light">Sent</div>
                              <div className="font-medium">{campaign.sentCount.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#F2F2F7] rounded p-2 text-center">
                              <div className="text-xs text-gray-500 font-light">Open Rate</div>
                              <div className="font-medium">{campaign.openRate}%</div>
                            </div>
                            <div className="bg-[#F2F2F7] rounded p-2 text-center">
                              <div className="text-xs text-gray-500 font-light">Click Rate</div>
                              <div className="font-medium">{campaign.clickRate}%</div>
                            </div>
                          </div>
                        )}

                        <div className="text-xs text-gray-500 font-light">
                          {campaign.status === "scheduled" ? "Scheduled for: " : "Sent: "}
                          {campaign.sentDate}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <Button variant="ghost" className="text-[#5E5CE6] text-xs w-full font-medium">
                      View All Campaigns
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

export default MyEmailsAdmin