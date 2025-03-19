"use client"

import { useEffect, useState, useRef } from "react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import {
  Check,
  ChevronDown,
  CircleAlert,
  CreditCard,
  Info,
  Loader2,
  Clock,
  ArrowRight,
  RefreshCw,
  Filter,
  Search,
  BarChart3,
  PieChart,
  CheckCircle,
  DollarSign,
  Activity,
  TrendingUp,
  Eye,
  CircleDollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Wallet, ShoppingCartIcon as PayPalIcon, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { JSX } from "react/jsx-runtime"
import Footer from "../Styles/Footer"

type ConfirmationStatus = "waiting" | "confirmed"

type OngoingBooking = {
  id: string
  amount: number
  paymentMethod: string
  paymentIcon: JSX.Element
  paymentIconBg: string
  accountNumber: string
  serviceProvider: {
    name: string
    avatar: string
    initials: string
    status: ConfirmationStatus
  }
  customer: {
    name: string
    avatar: string
    initials: string
    status: ConfirmationStatus
  }
  isReleased: boolean
}

type Transaction = {
  id: string
  account: string
  accountNumber: string
  paymentMethod: string
  icon: JSX.Element
  iconBg: string
  date: string
  status: "pending" | "success" | "canceled"
  amount: number
  recipient: {
    name: string
    avatar: string
    initials: string
  }
}

function AdminTransactions() {
  const COMMISSION_RATE = 0.05
  const [displayBalance, setDisplayBalance] = useState(0)
  const [actualBalance, setActualBalance] = useState(0)
  const [isBalanceAnimating, setIsBalanceAnimating] = useState(false)
  const [autoReleaseEnabled] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [timerActive, setTimerActive] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("all")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pageVisibilityRef = useRef(true)

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

  const [ongoingBookings, setOngoingBookings] = useState<OngoingBooking[]>([
    {
      id: "1",
      amount: 125000,
      paymentMethod: "Visa",
      paymentIcon: <CreditCard className="h-4 w-4 text-white" />,
      paymentIconBg: "bg-[#0A84FF]",
      accountNumber: "•••• •••• 5432",
      serviceProvider: {
        name: "Plumbling Services",
        avatar: "https://cdn.pixabay.com/photo/2022/04/15/07/44/purple-roses-7133816_1280.jpg",
        initials: "PS",
        status: "waiting",
      },
      customer: {
        name: "John Smith",
        avatar:
          "https://assets.tiltify.com/uploads/media_type/image/203025/blob-09636982-a21a-494b-bbe4-3692c2720ae3.jpeg",
        initials: "JS",
        status: "waiting",
      },
      isReleased: false,
    },
    {
      id: "2",
      amount: 750000,
      paymentMethod: "Coins.ph",
      paymentIcon: <CircleDollarSign className="h-4 w-4 text-white" />,
      paymentIconBg: "bg-[#0A84FF]",
      accountNumber: "•••• •••• 2845",
      serviceProvider: {
        name: "Cleaning Services",
        avatar: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
        initials: "CS",
        status: "waiting",
      },
      customer: {
        name: "Sarah Johnson",
        avatar: "https://cdn.pixabay.com/photo/2020/05/04/11/21/automobile-5128760_1280.jpg",
        initials: "SJ",
        status: "waiting",
      },
      isReleased: false,
    },
    {
      id: "3",
      amount: 2500000,
      paymentMethod: "GCash",
      paymentIcon: <Wallet className="h-4 w-4 text-white" />,
      paymentIconBg: "bg-[#0A84FF]",
      accountNumber: "•••• •••• 2055",
      serviceProvider: {
        name: "Wifi Installment Services",
        avatar: "https://cdn.pixabay.com/photo/2018/04/11/10/55/child-3310208_1280.jpg",
        initials: "WS",
        status: "waiting",
      },
      customer: {
        name: "Michael Brown",
        avatar: "https://cdn.pixabay.com/photo/2024/01/27/07/27/ice-cream-8535463_960_720.png",
        initials: "MB",
        status: "waiting",
      },
      isReleased: false,
    },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      account: "Credit Card",
      accountNumber: "•••• •••• 6799",
      paymentMethod: "Credit Card",
      icon: <CreditCard className="h-4 w-4 text-white" />,
      iconBg: "bg-[#0A84FF]",
      date: "Feb 17, 2025",
      status: "pending",
      amount: 45000,
      recipient: {
        name: "Adam Barba",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AB",
      },
    },
    {
      id: "2",
      account: "GCash",
      accountNumber: "•••• 4532",
      paymentMethod: "GCash",
      icon: <Wallet className="h-4 w-4 text-white" />,
      iconBg: "bg-[#5E5CE6]",
      date: "Feb 15, 2025",
      status: "success",
      amount: 15000,
      recipient: {
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
    },
    {
      id: "3",
      account: "PayPal",
      accountNumber: "•••• 8765",
      paymentMethod: "PayPal",
      icon: <PayPalIcon className="h-4 w-4 text-white" />,
      iconBg: "bg-[#5AC8FA]",
      date: "Feb 14, 2025",
      status: "canceled",
      amount: 22000,
      recipient: {
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RJ",
      },
    },
    {
      id: "4",
      account: "Maya",
      accountNumber: "•••• 3421",
      paymentMethod: "Maya",
      icon: <Wallet className="h-4 w-4 text-white" />,
      iconBg: "bg-[#30D158]",
      date: "Feb 12, 2025",
      status: "success",
      amount: 18500,
      recipient: {
        name: "Maria Santos",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MS",
      },
    },
    {
      id: "5",
      account: "Coins.ph",
      accountNumber: "•••• 9876",
      paymentMethod: "Coins.ph",
      icon: <Coins className="h-4 w-4 text-white" />,
      iconBg: "bg-[#FF9500]",
      date: "Feb 10, 2025",
      status: "success",
      amount: 12750,
      recipient: {
        name: "Alex Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AL",
      },
    },
  ])

  // Transaction metrics
  const transactionMetrics = {
    totalTransactions: 842,
    pendingTransactions: 12,
    successRate: 94,
    totalCommission: 45250,
  }

  useEffect(() => {
    if (actualBalance !== displayBalance) {
      const difference = actualBalance - displayBalance
      const increment = Math.max(1, Math.floor(difference / 20))

      const timer = setTimeout(() => {
        if (displayBalance + increment >= actualBalance) {
          setDisplayBalance(actualBalance)
        } else {
          setDisplayBalance((prev) => prev + increment)
        }
      }, 30)

      return () => clearTimeout(timer)
    }
  }, [actualBalance, displayBalance])

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      pageVisibilityRef.current = document.visibilityState === "visible"

      // Start timer when page becomes visible and there's an unreleased payment
      if (pageVisibilityRef.current && !timerActive) {
        const hasUnreleasedBooking = ongoingBookings.some(
          (booking) =>
            booking.serviceProvider.status === "confirmed" &&
            booking.customer.status === "confirmed" &&
            !booking.isReleased,
        )

        if (hasUnreleasedBooking) {
          setTimerActive(true)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [ongoingBookings, timerActive])

  // Timer logic
  useEffect(() => {
    if (timerActive && timeRemaining > 0 && pageVisibilityRef.current) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (timerActive && timeRemaining === 0) {
      // Auto-release payment when timer reaches zero
      const bookingToRelease = ongoingBookings.find(
        (booking) =>
          booking.serviceProvider.status === "confirmed" &&
          booking.customer.status === "confirmed" &&
          !booking.isReleased,
      )

      if (bookingToRelease) {
        // Release payment without commission
        setOngoingBookings((prev) => prev.map((b) => (b.id === bookingToRelease.id ? { ...b, isReleased: true } : b)))

        const today = new Date()
        const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}, ${today.getFullYear()}`

        const newTransaction: Transaction = {
          id: String(transactions.length + 1),
          account: bookingToRelease.paymentMethod,
          accountNumber: bookingToRelease.accountNumber,
          paymentMethod: bookingToRelease.paymentMethod,
          icon: bookingToRelease.paymentIcon,
          iconBg: bookingToRelease.paymentIconBg,
          date: formattedDate,
          status: "success",
          amount: bookingToRelease.amount,
          recipient: {
            name: bookingToRelease.customer.name,
            avatar: bookingToRelease.customer.avatar,
            initials: bookingToRelease.customer.initials,
          },
        }

        setTransactions((prev) => [newTransaction, ...prev])
      }

      setTimerActive(false)
      setTimeRemaining(30)
    }
  }, [timerActive, timeRemaining, ongoingBookings, transactions])

  // Start timer when both parties confirm
  useEffect(() => {
    const hasNewlyConfirmedBooking = ongoingBookings.some(
      (booking) =>
        booking.serviceProvider.status === "confirmed" &&
        booking.customer.status === "confirmed" &&
        !booking.isReleased &&
        !timerActive &&
        pageVisibilityRef.current,
    )

    if (hasNewlyConfirmedBooking && autoReleaseEnabled) {
      setTimerActive(true)
      setTimeRemaining(30)
    }
  }, [ongoingBookings, timerActive, autoReleaseEnabled])

  const simulateConfirmations = (bookingId: string) => {
    setOngoingBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId) {
          setTimeout(() => {
            setOngoingBookings((current) =>
              current.map((b) =>
                b.id === bookingId ? { ...b, serviceProvider: { ...b.serviceProvider, status: "confirmed" } } : b,
              ),
            )
          }, 10000)

          setTimeout(() => {
            setOngoingBookings((current) =>
              current.map((b) => (b.id === bookingId ? { ...b, customer: { ...b.customer, status: "confirmed" } } : b)),
            )
          }, 5000)
        }
        return booking
      }),
    )
  }

  const calculateCommission = (amount: number) => {
    return Math.round(amount * COMMISSION_RATE)
  }

  const isReleaseEnabled = (booking: OngoingBooking) => {
    return (
      booking.serviceProvider.status === "confirmed" && booking.customer.status === "confirmed" && !booking.isReleased
    )
  }

  const handleReleasePayment = (bookingId: string) => {
    const booking = ongoingBookings.find((b) => b.id === bookingId)
    if (!booking || !isReleaseEnabled(booking)) return

    // Stop the timer when manually releasing payment
    setTimerActive(false)
    setTimeRemaining(30)

    setIsBalanceAnimating(true)

    setOngoingBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, isReleased: true } : b)))

    setActualBalance((prev) => prev + calculateCommission(booking.amount))

    setTimeout(() => {
      setIsBalanceAnimating(false)
    }, 2000)

    const today = new Date()
    const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}, ${today.getFullYear()}`

    const newTransaction: Transaction = {
      id: String(transactions.length + 1),
      account: booking.paymentMethod,
      accountNumber: booking.accountNumber,
      paymentMethod: booking.paymentMethod,
      icon: booking.paymentIcon,
      iconBg: booking.paymentIconBg,
      date: formattedDate,
      status: "success",
      amount: booking.amount,
      recipient: {
        name: booking.customer.name,
        avatar: booking.customer.avatar,
        initials: booking.customer.initials,
      },
    }

    setTransactions((prev) => [newTransaction, ...prev])
  }

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return transaction.status === "pending"
    if (activeTab === "success") return transaction.status === "success"
    if (activeTab === "canceled") return transaction.status === "canceled"
    return true
  })

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky top-0 z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Transaction Management</h1>
            <p className="text-gray-500 text-sm font-light">Monitor and manage all payment transactions</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Transaction Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Transaction Overview</h2>
                  <p className="text-white/90 font-light">Monitor payment flows and commission earnings</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button
                    className="bg-white text-[#0A84FF] hover:bg-white/90 border-0"
                    onClick={() => simulateConfirmations("3")}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Simulate
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Balance</span>
                  </div>
                  <div
                    className={`text-3xl font-medium transition-all duration-1000 ${isBalanceAnimating ? "text-[#30D158] scale-110" : ""}`}
                  >
                    ₱{displayBalance.toLocaleString()}
                  </div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+15% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Transactions</span>
                  </div>
                  <div className="text-3xl font-medium">{transactionMetrics.totalTransactions}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="text-3xl font-medium">{transactionMetrics.successRate}%</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+2% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Commission</span>
                  </div>
                  <div className="text-3xl font-medium">₱{transactionMetrics.totalCommission.toLocaleString()}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ongoing Bookings - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800">Ongoing Bookings</h2>
                  <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">
                    {ongoingBookings.length} Active
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                {ongoingBookings.map((booking) => (
                  <div key={booking.id} className="bg-[#F2F2F7]/50 rounded-xl p-5 mb-4 last:mb-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <div className="text-sm text-gray-500 font-light">Total Payment</div>
                        <div className="text-2xl font-medium text-gray-800">
                          ₱{booking.amount.toLocaleString()}
                          <span className="text-[#30D158] ml-2 text-sm font-light">
                            +₱{calculateCommission(booking.amount).toLocaleString()} commission
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mt-3 md:mt-0 gap-3">
                        <div
                          className={`h-10 w-10 ${booking.paymentIconBg} rounded-full flex items-center justify-center`}
                        >
                          {booking.paymentIcon}
                        </div>
                        <div>
                          <div className="font-medium">{booking.paymentMethod}</div>
                          <div className="text-xs text-gray-500 font-light">{booking.accountNumber}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Service Provider */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-medium text-gray-500">Service Provider</div>
                          {booking.serviceProvider.status === "waiting" ? (
                            <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">Waiting</Badge>
                          ) : (
                            <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Confirmed</Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={booking.serviceProvider.avatar} />
                            <AvatarFallback className="bg-[#E8F8EF] text-[#30D158]">
                              {booking.serviceProvider.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="font-medium">{booking.serviceProvider.name}</div>
                            <div className="text-sm text-gray-500 font-light">
                              {booking.serviceProvider.status === "waiting" ? (
                                <div className="flex items-center text-gray-500">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Waiting for confirmation
                                </div>
                              ) : (
                                <div className="flex items-center text-[#30D158]">
                                  <Check className="h-3 w-3 mr-1" />
                                  Confirmed service
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-medium text-gray-500">Customer</div>
                          {booking.customer.status === "waiting" ? (
                            <Badge className="bg-[#F2F2F7] text-[#8E8E93] hover:bg-[#F2F2F7]">Waiting</Badge>
                          ) : (
                            <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Confirmed</Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={booking.customer.avatar} />
                            <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                              {booking.customer.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="font-medium">{booking.customer.name}</div>
                            <div className="text-sm text-gray-500 font-light">
                              {booking.customer.status === "waiting" ? (
                                <div className="flex items-center text-gray-500">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Waiting for confirmation
                                </div>
                              ) : (
                                <div className="flex items-center text-[#30D158]">
                                  <Check className="h-3 w-3 mr-1" />
                                  Confirmed service
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isReleaseEnabled(booking) && autoReleaseEnabled && (
                      <div className="mb-6">
                        <div className="bg-gradient-to-r from-[#FFE5E7] to-[#FFE5E7]/50 rounded-xl p-4 flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2 text-[#FF453A] mb-1">
                              <CircleAlert className="h-4 w-4" />
                              <span className="font-medium">Commission Warning</span>
                            </div>
                            <p className="text-sm text-[#FF453A] font-light">
                              You will not receive commission if the timer expires.
                            </p>
                          </div>

                          {timerActive && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-[#FF453A]" />
                              <div className="text-xl font-medium text-[#FF453A]">
                                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-4 md:mb-0 text-center md:text-left font-light">
                        {booking.isReleased ? (
                          <div className="flex items-center text-[#30D158]">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Payment has been released successfully.
                          </div>
                        ) : isReleaseEnabled(booking) ? (
                          <div className="flex items-center text-[#0A84FF]">
                            <Info className="h-4 w-4 mr-1" />
                            Both parties have confirmed. You can release the payment now.
                          </div>
                        ) : (
                          <div className="flex items-center text-[#FF453A]">
                            <Clock className="h-4 w-4 mr-1" />
                            Waiting for both parties to confirm before releasing payment.
                          </div>
                        )}
                      </div>

                      <Button
                        className={`${booking.isReleased ? "bg-[#30D158] hover:bg-[#30D158]/90" : "bg-[#0A84FF] hover:bg-[#0A84FF]/90"} text-white px-6`}
                        disabled={!isReleaseEnabled(booking) || booking.isReleased}
                        onClick={() => handleReleasePayment(booking.id)}
                      >
                        {booking.isReleased ? (
                          <div className="flex items-center">Payment Released</div>
                        ) : (
                          <div className="flex items-center">Release Payment</div>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Search and Filter */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2F2F7] to-[#F2F2F7] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Transaction Search</h3>
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search transactions..." className="pl-9 bg-[#F2F2F7] border-0" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full bg-[#F2F2F7] border-0">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="bg-[#F2F2F7] border-0">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Payment Methods</h3>
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
                        className="absolute inset-0 rounded-full bg-[#30D158]"
                        style={{ clipPath: "polygon(50% 50%, 100% 24%, 100% 32%, 50% 32%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full bg-[#FF9500]"
                        style={{ clipPath: "polygon(50% 50%, 100% 32%, 100% 36%, 50% 36%)" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                          <CreditCard className="h-10 w-10 text-[#0A84FF]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#0A84FF]"></div>
                        <span className="text-sm text-gray-700 font-light">Credit Card</span>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#5E5CE6]"></div>
                        <span className="text-sm text-gray-700 font-light">Digital Wallets</span>
                      </div>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#30D158]"></div>
                        <span className="text-sm text-gray-700 font-light">Bank Transfer</span>
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF9500]"></div>
                        <span className="text-sm text-gray-700 font-light">Crypto</span>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Status */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E8F8EF] to-[#E9F6FF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Transaction Status</h3>
                    <BarChart3 className="h-4 w-4 text-[#30D158]" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-[#F2F2F7] rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500 font-light">Success</div>
                      <div className="text-lg font-medium text-[#30D158]">94%</div>
                    </div>
                    <div className="bg-[#F2F2F7] rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500 font-light">Pending</div>
                      <div className="text-lg font-medium text-[#FF9500]">5%</div>
                    </div>
                    <div className="bg-[#F2F2F7] rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-500 font-light">Canceled</div>
                      <div className="text-lg font-medium text-[#FF453A]">1%</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-light">Success</span>
                        <span className="text-sm font-medium text-[#30D158]">94%</span>
                      </div>
                      <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#30D158] rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-light">Pending</span>
                        <span className="text-sm font-medium text-[#FF9500]">5%</span>
                      </div>
                      <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#FF9500] rounded-full" style={{ width: "5%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-light">Canceled</span>
                        <span className="text-sm font-medium text-[#FF453A]">1%</span>
                      </div>
                      <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                        <div className="h-full bg-[#FF453A] rounded-full" style={{ width: "1%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Transaction Activity */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Transaction Activity</h2>
              <div className="flex gap-2">
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="bg-[#F2F2F7]">
                    <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="text-xs data-[state=active]:bg-white">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="success" className="text-xs data-[state=active]:bg-white">
                      Success
                    </TabsTrigger>
                    <TabsTrigger value="canceled" className="text-xs data-[state=active]:bg-white">
                      Canceled
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F2F2F7] border-b text-xs text-gray-500">
                  <th className="text-left py-3 px-4 font-medium">ACCOUNT</th>
                  <th className="text-left py-3 px-4 font-medium">PAYMENT METHOD</th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="flex items-center">
                      DATE <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    <div className="flex items-center">
                      STATUS <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">RECIPIENT</th>
                  <th className="text-right py-3 px-4 font-medium">AMOUNT</th>
                  <th className="text-center py-3 px-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-[#F2F2F7]/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 ${transaction.iconBg} rounded-full mr-3 flex items-center justify-center`}
                        >
                          {transaction.icon}
                        </div>
                        <span className="text-sm font-light">{transaction.accountNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-light">{transaction.paymentMethod}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-light">{transaction.date}</td>
                    <td className="py-3 px-4">
                      {transaction.status === "pending" && (
                        <Badge className="bg-[#FFF8E6] text-[#FF9500] hover:bg-[#FFF8E6]">Pending</Badge>
                      )}
                      {transaction.status === "success" && (
                        <Badge className="bg-[#E8F8EF] text-[#30D158] hover:bg-[#E8F8EF]">Success</Badge>
                      )}
                      {transaction.status === "canceled" && (
                        <Badge className="bg-[#FFE5E7] text-[#FF453A] hover:bg-[#FFE5E7]">Canceled</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={transaction.recipient.avatar} />
                          <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
                            {transaction.recipient.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-light">{transaction.recipient.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-medium">₱{transaction.amount.toLocaleString()}</div>
                      {transaction.status === "success" && (
                        <div className="text-xs text-[#30D158] font-light">
                          +₱{calculateCommission(transaction.amount).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500 font-light">
              Showing <span className="font-medium">{filteredTransactions.length}</span> of{" "}
              <span className="font-medium">{transactions.length}</span> transactions
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
      <Footer />
    </div>
  )
}

export default AdminTransactions

