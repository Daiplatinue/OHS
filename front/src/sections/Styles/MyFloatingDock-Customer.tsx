import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  MessageCircleMore,
  LogOut,
  Bell,
  User,
  Newspaper,
  Bookmark,
  Search,
  Calendar,
  Clock,
  X,
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  XCircleIcon,
  ArrowUpRight,
  ChevronRight,
  Coffee,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface DockItemProps {
  icon: React.ReactNode
  label: string
  to: string
  isActive: boolean
  onClick?: () => void
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, to, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      console.log(`Navigate to: ${to}`)
    }
  }

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 ease-in-out ${
        isActive ? "bg-primary/10 rounded-full" : ""
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`flex items-center justify-center transition-all duration-200 ${
          isActive ? "text-primary" : isHovered ? "text-primary/80" : "text-gray-500"
        }`}
        animate={{
          scale: isActive ? 1.1 : 1,
          y: isActive ? -2 : 0,
        }}
      >
        {icon}
      </motion.div>
      <motion.span
        className={`text-[10px] mt-1 ${isActive ? "text-primary" : "text-gray-500"}`}
        animate={{
          fontWeight: isActive ? 600 : 400,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  count: number
  icon: React.ReactNode
  trend?: string
  trendValue?: number
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, trend, trendValue }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      {trend && trendValue && (
        <div
          className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
            trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? "+" : "-"}
          {trendValue}%
          {trend === "up" ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold mt-4">{count}</h3>
    <p className="text-sm text-gray-500 mt-1">{title}</p>
  </div>
)

interface Booking {
  id: number
  companyName: string
  service: string
  status: string
  date: string
  price: number
  image: string
}

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [status, setStatus] = useState(booking.status)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (status === "ongoing") {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setStatus("cancelled")
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [status])

  const handleCompletePayment = () => {
    // Create seller information from the booking data
    const sellerInfo = {
      id: booking.id,
      name: booking.companyName,
      rating: 4.5, // You can add a rating field to your booking interface if available
      reviews: 24, // You can add a reviews field to your booking interface if available
      location: "Local Service Provider", // You can add a location field to your booking interface if available
      price: booking.price, // Pass the price to the transaction page
    }

    // Navigate to transaction page with seller info
    navigate("/transaction", { state: { seller: sellerInfo } })
  }

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Pending
          </div>
        )
      case "ongoing":
        return (
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Ongoing
          </div>
        )
      case "cancelled":
        return (
          <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-full text-xs font-medium">
            <XCircleIcon className="w-3 h-3" />
            Cancelled
          </div>
        )
      default:
        return null
    }
  }

  const getActionButtons = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Book Again
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors"
              onClick={() => setStatus("cancelled")}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )
      case "ongoing":
        return (
          <div className="mt-4 space-y-2">
            <div
              className={`flex items-center justify-between ${
                timeLeft > 20
                  ? "bg-emerald-50 text-emerald-700"
                  : timeLeft > 10
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              } rounded-lg px-3 py-1.5`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{timeLeft}s</span>
            </div>
            <button
              className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              onClick={handleCompletePayment}
            >
              <ArrowUpRight className="w-4 h-4" />
              Complete Payment
            </button>
          </div>
        )
      case "cancelled":
        return (
          <button className="flex items-center gap-1 px-4 py-2 mt-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors w-full justify-center">
            <RotateCcw className="w-4 h-4" />
            Book Again
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="w-1/3 relative h-[150px]">
        <img src={booking.image || "/placeholder.svg"} alt={booking.service} className="w-full h-full object-cover" />
      </div>
      <div className="w-2/3 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-base">{booking.companyName}</h3>
            <p className="text-gray-600 text-sm mt-1">{booking.service}</p>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {booking.date}
          </div>
          <p className="font-medium">₱{booking.price.toLocaleString()}</p>
        </div>

        {getActionButtons()}
      </div>
    </div>
  )
}

const dummyBookings = [
  {
    id: 1,
    companyName: "Sisyphus Ventures",
    service: "Plumbing Services",
    status: "pending",
    date: "2024-03-20",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    companyName: "TechFix Solutions",
    service: "Electronics Repair",
    status: "ongoing",
    date: "2024-03-19",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    companyName: "GreenThumb Gardens",
    service: "Landscaping",
    status: "cancelled",
    date: "2024-03-18",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    companyName: "ElectroFix Pro",
    service: "Electrical Services",
    status: "pending",
    date: "2024-03-17",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    companyName: "CleanPro Services",
    service: "House Cleaning",
    status: "ongoing",
    date: "2024-03-16",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    companyName: "GardenMasters",
    service: "Garden Maintenance",
    status: "pending",
    date: "2024-03-15",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
]

const FloatingDock: React.FC = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllServices, setShowAllServices] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("all")
  const [showDock, setShowDock] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  })

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })

  const totalBookings = dummyBookings.length
  const pendingBookings = dummyBookings.filter((b) => b.status === "pending").length
  const ongoingBookings = dummyBookings.filter((b) => b.status === "ongoing").length

  const filteredBookings = dummyBookings.filter((booking) => {
    const matchesSearch =
      booking.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && booking.status === activeTab
  })

  const displayedBookings = showAllServices ? filteredBookings : filteredBookings.slice(0, 4)

  return (
    <AnimatePresence>
      {/* Toggle Button - Only visible when dock is hidden */}
      {!showDock && (
        <motion.button
          onClick={() => setShowDock(true)}
          className="fixed bottom-1/2 right-0 transform translate-y-1/2 bg-gray-300 text-gray-500 rounded-l-full p-3 shadow-lg hover:bg-gray-200 transition-all duration-200 z-50"
          aria-label="Show dock"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}

      {/* New Dock Design - Vertical pill at the side */}
      {showDock && (
        <motion.div
          className="fixed bottom-1/2 right-6 transform translate-y-1/2 bg-white rounded-full shadow-lg py-4 flex flex-col items-center gap-2 hover:shadow-xl border border-gray-100 z-50"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Hide Dock Button */}
          <motion.button
            onClick={() => setShowDock(false)}
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-600 rounded-full p-1 shadow-md hover:bg-gray-200 transition-all duration-200"
            aria-label="Hide dock"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <DockItem icon={<Home size={20} strokeWidth={1.5} />} label="Home" to="/" isActive={false} />
          <DockItem
            icon={<Bookmark size={20} strokeWidth={1.5} />}
            label="Bookings"
            to="#"
            isActive={showDrawer}
            onClick={() => setShowDrawer(true)}
          />
          <DockItem icon={<Bell size={20} strokeWidth={1.5} />} label="Alerts" to="/alerts" isActive={false} />
          <DockItem icon={<User size={20} strokeWidth={1.5} />} label="Profile" to="/profile" isActive={false} />
          <DockItem icon={<Newspaper size={20} strokeWidth={1.5} />} label="News" to="/news" isActive={false} />
          <DockItem
            icon={<MessageCircleMore size={20} strokeWidth={1.5} color="gray" />}
            label="Chats"
            to="/chat"
            isActive={location.pathname === "/chat"}
          />
          <DockItem icon={<LogOut size={20} strokeWidth={1.5} />} label="Logout" to="/logout" isActive={false} />
        </motion.div>
      )}

      {/* Side Drawer instead of Modal */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-gray-50 shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Booking Dashboard</h2>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formattedTime}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Search and Filters */}
              <div className="p-4 bg-white border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search Services or Companies"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "pending"
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setActiveTab("ongoing")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "ongoing"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Ongoing
                  </button>
                  <button
                    onClick={() => setActiveTab("cancelled")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "cancelled"
                        ? "bg-rose-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4">
                <StatCard
                  title="Total"
                  count={totalBookings}
                  icon={<Bookmark className="w-5 h-5" />}
                  trend="up"
                  trendValue={12}
                />
                <StatCard
                  title="Pending"
                  count={pendingBookings}
                  icon={<AlertCircle className="w-5 h-5" />}
                  trend="down"
                  trendValue={5}
                />
                <StatCard
                  title="Ongoing"
                  count={ongoingBookings}
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  trend="up"
                  trendValue={8}
                />
              </div>

              {/* Bookings List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {displayedBookings.length > 0 ? (
                  displayedBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <Filter className="w-10 h-10 mb-2 opacity-50" />
                    <p>No bookings found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                )}

                {filteredBookings.length > 4 && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setShowAllServices(!showAllServices)}
                      className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
                    >
                      {showAllServices ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View More
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for drawer */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowDrawer(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default FloatingDock