import { useEffect, useState, useRef } from "react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import { Bell, Check, ChevronDown, CreditCard, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { Wallet, ShoppingCartIcon as PayPalIcon, Coins } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

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

function Admin_Transactions() {
  const COMMISSION_RATE = 0.05
  const [displayBalance, setDisplayBalance] = useState(0)
  const [actualBalance, setActualBalance] = useState(0)
  const [isBalanceAnimating, setIsBalanceAnimating] = useState(false)
  const [autoReleaseEnabled, setAutoReleaseEnabled] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pageVisibilityRef = useRef(true)

  const [ongoingBookings, setOngoingBookings] = useState<OngoingBooking[]>([
    {
      id: "1",
      amount: 125000,
      paymentMethod: "Visa",
      paymentIcon: <CreditCard className="h-4 w-4 text-white" />,
      paymentIconBg: "bg-blue-600",
      accountNumber: "•••• •••• 5432",
      serviceProvider: {
        name: "Plumbling Services",
        avatar: "https://cdn.pixabay.com/photo/2022/04/15/07/44/purple-roses-7133816_1280.jpg",
        initials: "PS",
        status: "waiting",
      },
      customer: {
        name: "Watishewawewaewew",
        avatar: "https://cdn.pixabay.com/photo/2024/01/27/07/27/ice-cream-8535463_960_720.png",
        initials: "WW",
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
      iconBg: "bg-blue-600",
      date: "Feb 17, 2025",
      status: "pending",
      amount: 45000,
      recipient: {
        name: "Adam Barba",
        avatar: "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
        initials: "AB",
      },
    },
    {
      id: "2",
      account: "GCash",
      accountNumber: "•••• 4532",
      paymentMethod: "GCash",
      icon: <Wallet className="h-4 w-4 text-white" />,
      iconBg: "bg-purple-600",
      date: "Feb 15, 2025",
      status: "success",
      amount: 15000,
      recipient: {
        name: "Jane Doe",
        avatar: "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
        initials: "JD",
      },
    },
    {
      id: "3",
      account: "PayPal",
      accountNumber: "•••• 8765",
      paymentMethod: "PayPal",
      icon: <PayPalIcon className="h-4 w-4 text-white" />,
      iconBg: "bg-blue-400",
      date: "Feb 14, 2025",
      status: "canceled",
      amount: 22000,
      recipient: {
        name: "Robert Johnson",
        avatar: "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
        initials: "RJ",
      },
    },
    {
      id: "4",
      account: "Maya",
      accountNumber: "•••• 3421",
      paymentMethod: "Maya",
      icon: <Wallet className="h-4 w-4 text-white" />,
      iconBg: "bg-green-600",
      date: "Feb 12, 2025",
      status: "success",
      amount: 18500,
      recipient: {
        name: "Maria Santos",
        avatar: "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
        initials: "MS",
      },
    },
    {
      id: "5",
      account: "Coins.ph",
      accountNumber: "•••• 9876",
      paymentMethod: "Coins.ph",
      icon: <Coins className="h-4 w-4 text-white" />,
      iconBg: "bg-yellow-500",
      date: "Feb 10, 2025",
      status: "success",
      amount: 12750,
      recipient: {
        name: "Alex Lee",
        avatar: "https://cdn.pixabay.com/photo/2025/02/26/09/58/bird-9432600_1280.jpg",
        initials: "AL",
      },
    },
  ])

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

  return (
    <div>
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Transactions</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => simulateConfirmations("1")}>
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Total Balance */}
        <div className="border rounded-lg p-5 mb-6">
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
            Total balance <Info className="h-4 w-4" />
          </div>
          <div
            className={`text-2xl font-semibold transition-all duration-1000 ${isBalanceAnimating ? "text-green-500 scale-110" : ""}`}
          >
            PHP {displayBalance.toLocaleString()}
          </div>
        </div>

        {/* Ongoing Bookings */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Ongoing Bookings</h2>
          <div className="grid gap-4">
            {ongoingBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-medium">Total Payment</div>
                  <div className="text-xl font-semibold flex items-center">
                    PHP {booking.amount.toLocaleString()}
                    <span className="text-green-500 ml-1 text-sm">
                      +₱{calculateCommission(booking.amount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`h-8 w-8 ${booking.paymentIconBg} rounded mr-3 flex items-center justify-center`}>
                    {booking.paymentIcon}
                  </div>
                  <div>
                    <div className="font-medium">{booking.paymentMethod}</div>
                    <div className="text-sm text-gray-500">{booking.accountNumber}</div>
                  </div>
                </div>

                <div className="grid gap-6 mb-6">
                  {/* Service Provider Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.serviceProvider.avatar} />
                        <AvatarFallback>{booking.serviceProvider.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{booking.serviceProvider.name}</div>
                        <div className="text-sm text-gray-500">
                          {booking.serviceProvider.status === "waiting"
                            ? "Waiting for confirmation"
                            : "Confirmed service"}
                        </div>
                      </div>
                    </div>

                    {booking.serviceProvider.status === "waiting" ? (
                      <Button variant="outline" className="min-w-[120px]" disabled>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Waiting
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="min-w-[120px] bg-green-50 border-green-200 text-green-700"
                        disabled
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirmed
                      </Button>
                    )}
                  </div>

                  {/* Customer Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.customer.avatar} />
                        <AvatarFallback>{booking.customer.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{booking.customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {booking.customer.status === "waiting" ? "Waiting for confirmation" : "Confirmed service"}
                        </div>
                      </div>
                    </div>

                    {booking.customer.status === "waiting" ? (
                      <Button variant="outline" className="min-w-[120px]" disabled>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Waiting
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="min-w-[120px] bg-green-50 border-green-200 text-green-700"
                        disabled
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirmed
                      </Button>
                    )}
                  </div>
                </div>

                {isReleaseEnabled(booking) && autoReleaseEnabled && (
                  <div className="mb-4">
                    <div className="p-3 bg-yellow-50 rounded-lg mb-2">
                      <p className="text-sm text-yellow-700">
                        This will automatically release the payment if admin will not release manually
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg flex justify-between items-center">
                      <p className="text-sm text-red-700">
                        Warning: You will not get a commission if the timer runs out.
                      </p>
                      {timerActive && (
                        <div className="font-medium text-red-600">
                          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    {booking.isReleased
                      ? "Payment has been released successfully."
                      : isReleaseEnabled(booking)
                        ? "Both parties have confirmed. You can release the payment now."
                        : "Waiting for both parties to confirm before releasing payment."}
                  </div>
                  <Button
                    variant="default"
                    className={`${booking.isReleased ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    disabled={!isReleaseEnabled(booking)}
                    onClick={() => handleReleasePayment(booking.id)}
                  >
                    {booking.isReleased ? "Payment Released" : "Release Payment"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Transactions activity</h2>
          </div>
          <div className="border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-16 p-4 border-b bg-gray-50 text-sm font-medium">
              <div className="col-span-3">Account</div>
              <div className="col-span-3">Mode of payment</div>
              <div className="col-span-3 flex items-center">
                Date <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="col-span-2 flex items-center">
                Status <ChevronDown className="h-3 w-3 ml-1" />
              </div>
              <div className="col-span-3">Recipient</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Transactions List */}
            <div>
              {transactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-16 p-4 border-b items-center">
                  <div className="col-span-3 flex items-center">
                    <div className={`h-8 w-8 ${transaction.iconBg} rounded mr-3 flex items-center justify-center`}>
                      {transaction.icon}
                    </div>
                    {transaction.accountNumber}
                  </div>
                  <div className="col-span-3">{transaction.paymentMethod}</div>
                  <div className="col-span-3 text-gray-600">{transaction.date}</div>
                  <div className="col-span-2">
                    {transaction.status === "pending" && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span>
                    )}
                    {transaction.status === "success" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Success</span>
                    )}
                    {transaction.status === "canceled" && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Canceled</span>
                    )}
                  </div>
                  <div className="col-span-3 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={transaction.recipient.avatar} />
                      <AvatarFallback>{transaction.recipient.initials}</AvatarFallback>
                    </Avatar>
                    {transaction.recipient.name}
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    ₱{transaction.amount.toLocaleString()}
                    {transaction.status === "success" && (
                      <div className="text-xs text-green-500">
                        +₱{calculateCommission(transaction.amount).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_Transactions