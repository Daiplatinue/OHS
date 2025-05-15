import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Users,
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Eye,
  ChevronRight,
  Mail,
  MapPin,
  Upload,
  X,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Table,
  Download,
} from "lucide-react"
import * as XLSX from "xlsx"
import MyFloatingDock from "../Styles/MyFloatingDock-Ceo"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import Footer from "../Styles/Footer"

// Provider type definition
interface Provider {
  id: string
  fullname: string
  email: string
  company: string
  location: string
  age: number | string
  providerNumber: string
  status: string
  avatar: string
  isNew?: boolean
}

// Excel row type definition - this would match whatever is in your Excel file
interface ExcelRow {
  [key: string]: any // Dynamic keys based on Excel headers
}

function ProvidersManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [newProvidersCount, setNewProvidersCount] = useState(0)
  const [excelPreview, setExcelPreview] = useState<ExcelRow[]>([])
  const [excelHeaders, setExcelHeaders] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Initialize with sample data
  useEffect(() => {
    // Sample providers data
    const initialProviders: Provider[] = [
      {
        id: "PRV001",
        fullname: "John Smith",
        email: "john.smith@example.com",
        company: "Home Services Inc.",
        location: "New York, USA",
        age: 35,
        providerNumber: "HS-12345",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV002",
        fullname: "Sarah Johnson",
        email: "sarah.j@example.com",
        company: "Home Services Inc.",
        location: "Los Angeles, USA",
        age: 29,
        providerNumber: "HS-23456",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV003",
        fullname: "Michael Brown",
        email: "michael.b@example.com",
        company: "Home Services Inc.",
        location: "Chicago, USA",
        age: 42,
        providerNumber: "HS-34567",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV004",
        fullname: "Emily Davis",
        email: "emily.d@example.com",
        company: "Home Services Inc.",
        location: "Miami, USA",
        age: 31,
        providerNumber: "HS-45678",
        status: "Inactive",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV005",
        fullname: "David Wilson",
        email: "david.w@example.com",
        company: "Home Services Inc.",
        location: "Seattle, USA",
        age: 38,
        providerNumber: "HS-56789",
        status: "Pending",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV006",
        fullname: "Jennifer Martinez",
        email: "jennifer.m@example.com",
        company: "Home Services Inc.",
        location: "Boston, USA",
        age: 33,
        providerNumber: "HS-67890",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "PRV007",
        fullname: "Robert Taylor",
        email: "robert.t@example.com",
        company: "Home Services Inc.",
        location: "Denver, USA",
        age: 45,
        providerNumber: "HS-78901",
        status: "Suspended",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ]

    setProviders(initialProviders)
  }, [])

  // Format current time
  const timeString = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  // Provider statistics
  const providerStats = {
    totalProviders: providers.length,
    activeProviders: providers.filter((p) => p.status === "Active").length,
    newThisMonth: newProvidersCount || 28,
    serviceRate: 78,
  }

  // Filter and search providers
  const filteredProviders = providers
    .filter((provider) => {
      // Filter by tab
      if (activeTab === "all") return true
      if (activeTab === "active") return provider.status === "Active"
      if (activeTab === "inactive") return provider.status === "Inactive"
      if (activeTab === "pending") return provider.status === "Pending"
      if (activeTab === "suspended") return provider.status === "Suspended"
      return true
    })
    .filter((provider) => {
      // Filter by search term
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      return (
        String(provider.fullname).toLowerCase().includes(searchLower) ||
        String(provider.email).toLowerCase().includes(searchLower) ||
        String(provider.location).toLowerCase().includes(searchLower) ||
        String(provider.providerNumber).toLowerCase().includes(searchLower) ||
        String(provider.id).toLowerCase().includes(searchLower)
      )
    })

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
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

  // Handle provider selection for details view
  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider === selectedProvider ? null : provider)
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      if (!["xlsx", "xls", "csv"].includes(fileExtension || "")) {
        setUploadError("Invalid file format. Please upload an Excel or CSV file.")
        return
      }
      setUploadedFile(file)

      // Read the Excel file
      readExcelFile(file)
    }
  }

  // Read Excel file using xlsx library
  const readExcelFile = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          throw new Error("Failed to read file")
        }

        // Parse the Excel data using xlsx
        const workbook = XLSX.read(data, { type: "binary" })

        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { header: "A" })

        // Extract headers (first row)
        const headers: string[] = []
        if (jsonData.length > 0) {
          const firstRow = jsonData[0]
          for (const key in firstRow) {
            if (Object.prototype.hasOwnProperty.call(firstRow, key)) {
              headers.push(String(firstRow[key]))
            }
          }

          // Remove the header row
          jsonData.shift()
        }

        // Convert the data to our format
        const rows: ExcelRow[] = jsonData.map((row) => {
          const formattedRow: ExcelRow = {}
          let i = 0
          for (const key in row) {
            if (Object.prototype.hasOwnProperty.call(row, key) && i < headers.length) {
              formattedRow[headers[i]] = row[key]
              i++
            }
          }
          return formattedRow
        })

        // Set the headers and preview data
        setExcelHeaders(headers)
        setExcelPreview(rows)
        setShowPreview(true)

        toast(
          <>
            <div className="font-semibold">File Parsed Successfully</div>
            <div className="text-sm text-gray-600">{`Found ${rows.length} providers in the file.`}</div>
          </>
        )
      } catch (error) {
        console.error("Error parsing Excel file:", error)
        setUploadError("Failed to parse the Excel file. Please check the file format.")
      }
    }

    reader.onerror = () => {
      setUploadError("Error reading the file. Please try again.")
    }

    // Read the file as binary
    reader.readAsBinaryString(file)
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    setUploadError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      // Check file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      if (!["xlsx", "xls", "csv"].includes(fileExtension || "")) {
        setUploadError("Invalid file format. Please upload an Excel or CSV file.")
        return
      }
      setUploadedFile(file)

      // Read the Excel file
      readExcelFile(file)
    }
  }

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadError(null)
    setShowPreview(false)
    setExcelPreview([])
    setExcelHeaders([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Process Excel data and convert to providers
  const processExcelData = (excelData: ExcelRow[]): Provider[] => {
    return excelData.map((row, index) => {
      const nextId = `PRV${String(providers.length + index + 1).padStart(3, "0")}`

      // This is a flexible mapping that works with various column names
      const getValueByPossibleKeys = (keys: string[]): string => {
        for (const key of keys) {
          // Check for exact match
          if (row[key] !== undefined) return String(row[key])

          // Check for case-insensitive match
          const lowerKey = key.toLowerCase()
          const matchingKey = Object.keys(row).find((k) => k.toLowerCase() === lowerKey)
          if (matchingKey && row[matchingKey] !== undefined) return String(row[matchingKey])
        }
        return ""
      }

      return {
        id: nextId,
        // Try various possible column names for each field
        fullname: getValueByPossibleKeys(["Full name", "Fullname", "Name", "Full Name"]),
        email: getValueByPossibleKeys(["Email", "E-mail", "EmailAddress", "Email Address"]),
        company: "Home Services Inc.", // Static value as requested
        location: getValueByPossibleKeys(["Location", "Address", "City"]),
        age: getValueByPossibleKeys(["Age"]),
        providerNumber: getValueByPossibleKeys([
          "Provider Number",
          "ProviderNumber",
          "Provider ID",
          "ProviderID",
          "ID",
        ]),
        status: "Active", // Default status for new providers
        avatar: "/placeholder.svg?height=40&width=40",
        isNew: true,
      }
    })
  }

  // Generate a template Excel file
  const generateTemplate = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Create headers
    const headers = ["Provider ID", "Full name", "Email", "Location", "Age", "Provider Number"]

    // Create a sample row
    const sampleRow = {
      "Provider ID": "1",
      "Full name": "John Doe",
      Email: "john.doe@example.com",
      Location: "New York",
      Age: "35",
      "Provider Number": "HS-12345",
    }

    // Create worksheet with headers and sample row
    const ws = XLSX.utils.json_to_sheet([sampleRow], { header: headers })

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Providers")

    // Generate the Excel file
    XLSX.writeFile(wb, "provider-template.xlsx")
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedFile) {
      setUploadError("Please select a file to upload.")
      return
    }

    if (excelPreview.length === 0) {
      setUploadError("No data found in the file or the file format is incorrect.")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Process the Excel data
      const newProviders = processExcelData(excelPreview)

      // Add the new providers to the state
      setProviders((prevProviders) => [...prevProviders, ...newProviders])

      // Update new providers count
      setNewProvidersCount((prev) => prev + newProviders.length)

      // Show success message
      setUploadSuccess(true)

      // Reset file input
      setUploadedFile(null)
      setShowPreview(false)
      setExcelPreview([])
      setExcelHeaders([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Show toast notification
      toast(
        <>
          <div className="font-semibold">Providers Added Successfully</div>
          <div className="text-sm text-gray-600">{`${newProviders.length} new providers have been added to the system.`}</div>
        </>
      )

      // Close modal after a short delay
      setTimeout(() => {
        setIsAddProviderModalOpen(false)
        setUploadSuccess(false)
      }, 1500)
    } catch (error) {
      setUploadError("An error occurred while processing the file. Please try again.")
      console.error("Error processing file:", error)
    } finally {
      setIsUploading(false)
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
            <h1 className="text-2xl font-semibold text-gray-800">Providers Management</h1>
            <p className="text-gray-500 text-sm font-light">View and manage all service providers in your system</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Provider Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Provider Overview</h2>
                  <p className="text-white/90 font-light">Manage and monitor all registered service providers</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button
                    className="bg-white text-[#0A84FF] hover:bg-white/90 border-0"
                    onClick={() => setIsAddProviderModalOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Provider
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Providers</span>
                  </div>
                  <div className="text-3xl font-medium">{providerStats.totalProviders}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <span>+8% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Active Providers</span>
                  </div>
                  <div className="text-3xl font-medium">{providerStats.activeProviders}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <span>+5% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">New This Month</span>
                  </div>
                  <div className="text-3xl font-medium">{providerStats.newThisMonth}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <span>+12% increase</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <ChevronDown className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Service Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{providerStats.serviceRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <span>+3% increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-lg font-medium text-gray-800">Registered Providers</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search providers..."
                    className="pl-9 bg-[#F2F2F7] border-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] bg-[#F2F2F7] border-0">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
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
                <TabsTrigger value="active" className="text-xs data-[state=active]:bg-white">
                  Active
                </TabsTrigger>
                <TabsTrigger value="inactive" className="text-xs data-[state=active]:bg-white">
                  Inactive
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs data-[state=active]:bg-white">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="suspended" className="text-xs data-[state=active]:bg-white">
                  Suspended
                </TabsTrigger>
              </TabsList>

              {filteredProviders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-[#F2F2F7] rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">No providers found</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {searchTerm
                      ? "Try adjusting your search or filters"
                      : "Add providers by clicking the 'Add Provider' button"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`bg-[#F2F2F7]/50 rounded-xl p-4 hover:bg-[#F2F2F7] transition-colors cursor-pointer ${
                        selectedProvider?.id === provider.id ? "ring-1 ring-[#0A84FF]" : ""
                      } ${provider.isNew ? "animate-pulse border-l-4 border-[#30D158]" : ""}`}
                      onClick={() => handleProviderSelect(provider)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={String(provider.fullname)} />
                          <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                            {String(provider.fullname).charAt(0)}
                            {String(provider.fullname).split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h3 className="font-medium text-gray-800">
                              {provider.fullname}
                              {provider.isNew && (
                                <Badge className="ml-2 bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">New</Badge>
                              )}
                            </h3>
                            <div className="flex flex-wrap gap-2">{renderStatusBadge(provider.status)}</div>
                          </div>

                          <div className="text-sm text-gray-500 mt-1 font-light">{provider.email}</div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-3 text-xs text-gray-600 font-light">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{provider.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">#</span>
                              <span>ID: {provider.providerNumber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">Age:</span>
                              <span>{provider.age}</span>
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
                                Edit Provider
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {provider.status === "Active" ? (
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
                        </div>
                      </div>

                      {selectedProvider?.id === provider.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-light">
                                <Mail className="h-4 w-4 text-[#0A84FF]" />
                                <span>{provider.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-light">
                                <MapPin className="h-4 w-4 text-[#0A84FF]" />
                                <span>{provider.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-gray-700">Provider Details</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-light">Company</span>
                                </div>
                                <span className="font-medium">{provider.company}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-light">Provider ID</span>
                                </div>
                                <span className="font-medium">{provider.providerNumber}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-light">Age</span>
                                </div>
                                <span className="font-medium">{provider.age}</span>
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
              )}
            </Tabs>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500 font-light">
              Showing <span className="font-medium">{filteredProviders.length}</span> of{" "}
              <span className="font-medium">{providers.length}</span> providers
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
      </main>

      {/* Add Provider Modal */}
      <Dialog open={isAddProviderModalOpen} onOpenChange={setIsAddProviderModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Providers</DialogTitle>
            <DialogDescription>
              Upload an Excel file containing provider information to add multiple providers at once.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 py-4">
              {uploadSuccess ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-[#E8F8EF] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#30D158]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Successful!</h3>
                  <p className="text-gray-600">Your providers have been added to the system.</p>
                </div>
              ) : (
                <>
                  {uploadError && (
                    <Alert variant="destructive" className="bg-[#FFE5E7] text-[#FF453A] border-[#FF453A]/20">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-[#0A84FF] border-[#0A84FF]/20 hover:bg-[#E9F6FF]"
                      onClick={generateTemplate}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging ? "border-[#0A84FF] bg-[#E9F6FF]" : "border-gray-300"
                    } transition-colors`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!uploadedFile ? (
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-[#E9F6FF] rounded-full flex items-center justify-center">
                          <Upload className="h-6 w-6 text-[#0A84FF]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Drag and drop your Excel file here</p>
                          <p className="text-xs text-gray-500 mt-1">or</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="relative text-[#0A84FF] border-[#0A84FF]/20 hover:bg-[#E9F6FF]"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Browse Files
                          <input
                            id="file-upload"
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            className="sr-only"
                            onChange={handleFileUpload}
                          />
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">Supported formats: .xlsx, .xls, .csv</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-[#E8F8EF] rounded-full flex items-center justify-center">
                          <FileSpreadsheet className="h-6 w-6 text-[#30D158]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{uploadedFile.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-[#FF453A] border-[#FF453A]/20 hover:bg-[#FFE5E7]"
                          onClick={handleRemoveFile}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove File
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Excel Preview */}
                  {showPreview && excelPreview.length > 0 && (
                    <div className="bg-[#F2F2F7] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Table className="h-4 w-4 text-[#0A84FF]" />
                        <h4 className="text-sm font-medium text-gray-700">Excel Data Preview</h4>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              {excelHeaders.map((header, index) => (
                                <th key={index} className="p-2 text-left">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {excelPreview.map((row, rowIndex) => (
                              <tr key={rowIndex} className="border-b border-gray-200">
                                {excelHeaders.map((header, colIndex) => (
                                  <td key={`${rowIndex}-${colIndex}`} className="p-2">
                                    {row[header] !== undefined ? String(row[header]) : ""}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <p className="text-xs text-gray-500 mt-3">
                        Note: The company name will be automatically set to "Home Services Inc."
                      </p>
                    </div>
                  )}

                  {!showPreview && !uploadedFile && (
                    <div className="bg-[#F2F2F7] p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Required Columns</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>• Provider ID</div>
                        <div>• Full Name</div>
                        <div>• Email</div>
                        <div>• Location</div>
                        <div>• Age</div>
                        <div>• Provider Number</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Note: The company name will be automatically set to "Home Services Inc."
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddProviderModalOpen(false)
                  setUploadedFile(null)
                  setUploadError(null)
                  setUploadSuccess(false)
                  setShowPreview(false)
                  setExcelPreview([])
                  setExcelHeaders([])
                }}
                className="border-gray-300"
              >
                {uploadSuccess ? "Close" : "Cancel"}
              </Button>
              {!uploadSuccess && (
                <Button
                  type="submit"
                  className="bg-[#0A84FF] hover:bg-[#0A84FF]/90"
                  disabled={!uploadedFile || isUploading || excelPreview.length === 0}
                >
                  {isUploading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Upload and Add Providers"
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

export default ProvidersManagement