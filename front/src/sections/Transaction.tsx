import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Wallet, DollarSign, CheckCircle2, MapPin, Users, Clock } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import MyFloatingDockCustomer from "../sections/Styles/MyFloatingDock-Customer"
import Footer from "../sections/Styles/Footer"

interface SellerInfo {
  id: number
  name: string
  rating: number
  reviews: number
  location: string
  price?: number
  startingRate?: number
  ratePerKm?: number
  description?: string
  workerCount?: number
}

interface BookingDetails {
  id?: number
  service?: string
  serviceType?: string
  date?: string
  location?: string
  distance?: number
  price?: number
  baseRate?: number
  distanceCharge?: number
  additionalFees?: number
  total?: number
  workerCount?: number
  estimatedTime?: string
  status?: string
}

function Transaction() {
  const navigate = useNavigate()
  const location = useLocation()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [seller, setSeller] = useState<SellerInfo | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [selectedWallet, setSelectedWallet] = useState<string>("")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })
  const [walletDetails, setWalletDetails] = useState({
    accountName: "",
    accountNumber: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [, setIsComplete] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState<string>("/")
  const [planName, setPlanName] = useState<string>("")
  const [transactionType, setTransactionType] = useState<"subscription" | "booking">("subscription")
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [previousPage, setPreviousPage] = useState<string>("")
  const [, setBookingStatus] = useState<string>("")
  const [bookingId, setBookingId] = useState<number | null>(null)

  // Animation keyframes
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes bounceIn {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `

  useEffect(() => {
    // Store the previous page URL for redirect
    setPreviousPage(document.referrer || location.state?.from || "")

    // Check if we have booking data in localStorage
    const storedBookingData = localStorage.getItem("currentBookingDetails")
    let parsedBookingData = null

    if (storedBookingData) {
      try {
        parsedBookingData = JSON.parse(storedBookingData)
      } catch (e) {
        console.error("Error parsing stored booking data", e)
      }
    }

    // Check if we have booking data in location state
    const bookingData = location.state?.booking || parsedBookingData
    const sellerData = location.state?.seller

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const planParam = urlParams.get("plan")
    const priceParam = urlParams.get("price")
    const redirectParam = urlParams.get("redirect")
    const userTypeParam = urlParams.get("userType")
    const statusParam = urlParams.get("status")
    const bookingIdParam = urlParams.get("bookingId")

    // Set booking ID if provided
    if (bookingIdParam) {
      setBookingId(Number.parseInt(bookingIdParam, 10))
    } else if (bookingData && bookingData.id) {
      setBookingId(bookingData.id)
    } else if (sellerData && sellerData.id) {
      setBookingId(sellerData.id)
    }

    // Set booking status if provided
    if (statusParam) {
      setBookingStatus(statusParam)
    } else if (bookingData && bookingData.status) {
      setBookingStatus(bookingData.status)
    } else {
      // Default status for new bookings
      setBookingStatus("pending")
    }

    // Set redirect URL if provided
    if (redirectParam) {
      setRedirectUrl(redirectParam)
    } else if (previousPage) {
      // Use previous page as fallback if available
      setRedirectUrl(previousPage)
    } else {
      // Set default redirect based on user type and transaction type
      if (userTypeParam === "ceo" || planParam) {
        // If user is CEO or this is a subscription plan, redirect to CEO bookings
        setRedirectUrl("/ceo/bookings")
      } else {
        // Default for customers - redirect to home page where floating dock is available
        setRedirectUrl("/")
      }
    }

    // Handle subscription plan data from URL parameters
    if (planParam) {
      // This is a subscription transaction
      setTransactionType("subscription")

      switch (planParam) {
        case "free":
          setPlanName("Free")
          break
        case "mid":
          setPlanName("Professional")
          break
        case "premium":
          setPlanName("Business")
          break
        case "unlimited":
          setPlanName("Enterprise")
          break
        default:
          setPlanName("")
      }

      // Set seller information for subscription
      setSeller({
        id: 1,
        name: "Online Home Services",
        rating: 5,
        reviews: 823.2,
        location: "Cebu City Branches",
        price: priceParam ? Number.parseFloat(priceParam) : 0,
      })

      // Set total amount from price parameter
      if (priceParam) {
        setTotalAmount(Number.parseFloat(priceParam))
      }
    }
    // Handle booking data from location state or localStorage
    else if (bookingData || sellerData) {
      // This is a booking payment transaction
      setTransactionType("booking")

      if (bookingData) {
        // Set booking details
        setBookingDetails({
          id: bookingData.id,
          service: bookingData.service,
          serviceType: bookingData.serviceType,
          date: bookingData.date,
          location: bookingData.location,
          distance: bookingData.distance,
          baseRate: bookingData.baseRate,
          distanceCharge:
            bookingData.distance && bookingData.ratePerKm
              ? bookingData.distance * bookingData.ratePerKm
              : bookingData.distanceCharge || 0,
          additionalFees: bookingData.additionalFees || 0,
          price: bookingData.price,
          total: bookingData.price,
          workerCount: bookingData.workerCount,
          estimatedTime: bookingData.estimatedTime,
          status: bookingData.status,
        })

        setPlanName(bookingData.serviceType || bookingData.service || "Service Booking")

        // Calculate total if not provided
        const calculatedTotal =
          (bookingData.baseRate || 0) +
          (bookingData.distance && bookingData.ratePerKm
            ? bookingData.distance * bookingData.ratePerKm
            : bookingData.distanceCharge || 0) +
          (bookingData.additionalFees || 0)

        // Use the calculated total or the provided price
        setTotalAmount(bookingData.price || calculatedTotal)
      }

      // Set seller information from state
      if (sellerData) {
        setSeller(sellerData)

        // If we have seller price but no total amount yet
        if (sellerData.price && !totalAmount) {
          setTotalAmount(sellerData.price)
        }

        // Create booking details if not provided
        if (!bookingData && sellerData) {
          // Calculate distance charge if we have the data
          const distanceCharge =
            sellerData.ratePerKm && location.state?.distance ? sellerData.ratePerKm * location.state.distance : 0

          // Create booking details object
          const newBookingDetails: BookingDetails = {
            id: sellerData.id,
            service: location.state?.service || "Service",
            serviceType: location.state?.serviceType || planName,
            date: location.state?.date || new Date().toISOString().split("T")[0],
            location: location.state?.location || sellerData.location,
            distance: location.state?.distance || 0,
            baseRate: sellerData.startingRate || sellerData.price,
            distanceCharge: distanceCharge,
            additionalFees: 0,
            price: sellerData.price || (sellerData.startingRate ? sellerData.startingRate + distanceCharge : 0),
            total: sellerData.price || (sellerData.startingRate ? sellerData.startingRate + distanceCharge : 0),
            workerCount: sellerData.workerCount || 1,
            estimatedTime: location.state?.estimatedTime || "1-2 hours",
          }

          setBookingDetails(newBookingDetails)

          // Update total amount with calculated price
          if (newBookingDetails.price) {
            setTotalAmount(newBookingDetails.price)
          }
        }
      }
    }
  }, [location, totalAmount, previousPage, bookingId, planName])

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
    setSelectedWallet("")
  }

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet)
  }

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleWalletInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWalletDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Update booking status to ongoing after payment
      if (transactionType === "booking") {
        setBookingStatus("ongoing")
      }

      // Set success message based on transaction type
      if (transactionType === "subscription") {
        setSuccessMessage(`You've successfully subscribed to the ${planName} plan!`)
      } else {
        setSuccessMessage("Payment completed successfully! You can now view your provider's location.")
      }

      // Show success modal
      setIsSuccessModalOpen(true)
    }, 2000)
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)

    // Handle different redirect logic based on transaction type
    if (transactionType === "subscription") {
      // For subscription: redirect with the upgraded tier parameter
      const urlParams = new URLSearchParams(window.location.search)
      const planParam = urlParams.get("plan")

      if (planParam) {
        window.location.href = `${redirectUrl}?upgradedTier=${planParam}`
      } else {
        window.location.href = redirectUrl
      }
    } else {
      // For booking: use localStorage to communicate with the floating dock

      // Store booking information in localStorage
      const bookingInfo = {
        id: bookingId,
        status: "ongoing",
        paymentComplete: true,
        timestamp: new Date().getTime(),
      }

      localStorage.setItem("recentBookingPayment", JSON.stringify(bookingInfo))

      // Also set a flag to open the bookings drawer
      localStorage.setItem("openBookingsDrawer", "true")

      // Set a flag to indicate the booking status should be updated
      localStorage.setItem(
        "updateBookingStatus",
        JSON.stringify({
          id: bookingId,
          status: "ongoing",
        }),
      )

      // Redirect to home page
      window.location.href = "/"
    }
  }

  const handleTrackProvider = () => {
    // Close the modal
    setIsSuccessModalOpen(false)

    // Store tracking information in localStorage
    const trackingInfo = {
      id: bookingId,
      status: "ongoing",
      paymentComplete: true,
      trackProvider: true,
      timestamp: new Date().getTime(),
    }

    localStorage.setItem("recentBookingPayment", JSON.stringify(trackingInfo))

    // Set a flag to open the bookings drawer
    localStorage.setItem("openBookingsDrawer", "true")

    // Set a flag to indicate the booking status should be updated
    localStorage.setItem(
      "updateBookingStatus",
      JSON.stringify({
        id: bookingId,
        status: "ongoing",
      }),
    )

    // Redirect to home page
    window.location.href = "/"
  }

  const goBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-white/90 text-black">
      {/* Include animation keyframes */}
      <style>{keyframes}</style>

      {/* Floating Dock - Now at the top */}
      <div className="sticky z-40 flex">
        <MyFloatingDockCustomer />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <button onClick={goBack} className="flex items-center text-gray-700 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>

        <div className="bg-gray-200/70 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-8 text-gray-700">
            {transactionType === "subscription" ? "Complete Your Subscription" : "Complete Your Payment"}
          </h1>

          {seller ? (
            <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Service Provider Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">Name</p>
                  <p className="text-gray-800 font-medium">{seller.name}</p>
                </div>
                <div>
                  <p className="text-gray-700">Location</p>
                  <p className="text-gray-800 font-medium">{seller.location}</p>
                </div>
                <div>
                  <p className="text-gray-700">Rating</p>
                  <p className="text-yellow-500">{"★".repeat(seller.rating)}</p>
                </div>
                <div>
                  <p className="text-gray-700">Reviews</p>
                  <p className="text-gray-800 font-medium">{seller.reviews}M reviews</p>
                </div>
                {seller.description && (
                  <div className="col-span-2">
                    <p className="text-gray-700">Description</p>
                    <p className="text-gray-800">{seller.description}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-gray-300/70 rounded-lg text-center">
              <p className="text-gray-700">No service provider information available</p>
            </div>
          )}

          {/* Booking Details Section */}
          {transactionType === "booking" && bookingDetails && (
            <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-700">Service</p>
                  <p className="text-gray-800 font-medium">{bookingDetails.service}</p>
                </div>
                {bookingDetails.serviceType && (
                  <div>
                    <p className="text-gray-700">Service Type</p>
                    <p className="text-gray-800 font-medium">{bookingDetails.serviceType}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-700">Date</p>
                  <p className="text-gray-800 font-medium">{formatDate(bookingDetails.date)}</p>
                </div>
                <div>
                  <p className="text-gray-700">Location</p>
                  <p className="text-gray-800 font-medium">{bookingDetails.location}</p>
                </div>
                {bookingDetails.workerCount && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-sky-500" />
                    <div>
                      <p className="text-gray-700">Workers</p>
                      <p className="text-gray-800 font-medium">
                        {bookingDetails.workerCount} worker{bookingDetails.workerCount > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                )}
                {bookingDetails.estimatedTime && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-sky-500" />
                    <div>
                      <p className="text-gray-700">Estimated Time</p>
                      <p className="text-gray-800 font-medium">{bookingDetails.estimatedTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Total Payment Section */}
          <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Summary</h2>

            {transactionType === "subscription" ? (
              <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                <p className="text-gray-700">{planName} Subscription (Monthly)</p>
                <p className="text-gray-800 font-medium">${totalAmount.toFixed(2)}</p>
              </div>
            ) : bookingDetails ? (
              <>
                {/* Base Rate */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                  <p className="text-gray-700">Base Service Rate</p>
                  <p className="text-gray-800 font-medium">
                    ₱{(bookingDetails.baseRate || seller?.startingRate || 0).toLocaleString()}
                  </p>
                </div>

                {/* Distance Charge */}
                {(bookingDetails.distanceCharge ||
                  (bookingDetails.distance && (seller?.ratePerKm || bookingDetails.distance > 0))) && (
                  <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                    <p className="text-gray-700">
                      Distance Charge ({bookingDetails.distance?.toFixed(1) || "0"} km × ₱{seller?.ratePerKm || "20"})
                    </p>
                    <p className="text-gray-800 font-medium">
                      ₱
                      {(
                        bookingDetails.distanceCharge ||
                        (bookingDetails.distance && seller?.ratePerKm ? bookingDetails.distance * seller.ratePerKm : 0)
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                )}

                {/* Additional Fees */}
                {bookingDetails.additionalFees && bookingDetails.additionalFees > 0 && (
                  <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                    <p className="text-gray-700">Additional Fees</p>
                    <p className="text-gray-800 font-medium">₱{bookingDetails.additionalFees.toLocaleString()}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                <p className="text-gray-700">Service Fee</p>
                <p className="text-gray-800 font-medium">₱{totalAmount.toLocaleString()}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-bold">Total Amount</p>
              <p className="text-xl text-gray-800 font-bold">₱{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "credit" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500"}`}
                onClick={() => handlePaymentMethodChange("credit")}
              >
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-3 text-gray-400" />
                  <span className="text-gray-700">Credit Card</span>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "wallet" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500"}`}
                onClick={() => handlePaymentMethodChange("wallet")}
              >
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-3 text-gray-400" />
                  <span className="text-gray-700">Digital Wallet</span>
                </div>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "cash" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500"}`}
                onClick={() => handlePaymentMethodChange("cash")}
              >
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 mr-3 text-gray-400" />
                  <span className="text-gray-700">Cash on Delivery</span>
                </div>
              </div>
            </div>

            {paymentMethod === "credit" && (
              <div className="bg-gray-300/50 p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4 text-gray-700">Credit Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardHolder" className="block text-sm text-gray-400 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm text-gray-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm text-gray-400 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div className="bg-gray-300/50 p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4">Digital Wallet</h3>
                <p className="text-gray-700 mb-4">Choose your preferred digital wallet:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === "PayPal" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500 text-gray-800"}`}
                    onClick={() => handleWalletSelect("PayPal")}
                  >
                    <p className="text-gray-700">PayPal</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === "GCash" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500 text-gray-800"}`}
                    onClick={() => handleWalletSelect("GCash")}
                  >
                    <p className="text-gray-700">GCash</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === "Maya" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500 text-gray-800"}`}
                    onClick={() => handleWalletSelect("Maya")}
                  >
                    <p className="text-gray-700">Maya</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${selectedWallet === "Coins.ph" ? "border-sky-300 bg-sky-500/10" : "border-gray-400 hover:border-gray-500 text-gray-800"}`}
                    onClick={() => handleWalletSelect("Coins.ph")}
                  >
                    <p className="text-gray-700">Coins.ph</p>
                  </div>
                </div>

                {selectedWallet && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-md font-medium mb-2 text-gray-700">{selectedWallet} Details</h4>
                    <div>
                      <label htmlFor="accountName" className="block text-sm text-gray-500 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        id="accountName"
                        name="accountName"
                        value={walletDetails.accountName}
                        onChange={handleWalletInputChange}
                        placeholder="Enter your account name"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="accountNumber" className="block text-sm text-gray-400 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={walletDetails.accountNumber}
                        onChange={handleWalletInputChange}
                        placeholder="Enter your account number"
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="bg-gray-300/60 p-6 rounded-lg mb-8 animate-fadeIn">
                <h3 className="text-lg font-medium mb-4 text-gray-700">Cash on Delivery</h3>
                <p className="text-gray-600">Payment will be collected upon service completion.</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!paymentMethod || (paymentMethod === "wallet" && !selectedWallet) || isProcessing}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  !paymentMethod || (paymentMethod === "wallet" && !selectedWallet) || isProcessing
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-sky-500 text-white hover:bg-sky-600"
                }`}
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="mx-auto max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all border border-white/20 p-6"
            style={{ animation: "fadeIn 0.5s ease-out" }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              >
                <CheckCircle2 className="h-10 w-10 text-green-500" style={{ animation: "bounceIn 0.6s ease-out" }} />
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-2" style={{ animation: "slideInUp 0.4s ease-out" }}>
                Payment Successful!
              </h3>

              <p className="text-gray-600 mb-6" style={{ animation: "fadeIn 0.5s ease-out 0.2s both" }}>
                {successMessage}
              </p>

              {transactionType === "booking" ? (
                <button
                  onClick={handleTrackProvider}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium shadow-sm hover:bg-blue-600 active:scale-95 transition-all duration-200 flex items-center gap-2"
                  style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}
                >
                  <MapPin className="h-5 w-5" />
                  Track Service
                </button>
              ) : (
                <button
                  onClick={handleSuccessModalClose}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium shadow-sm hover:bg-blue-600 active:scale-95 transition-all duration-200"
                  style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Transaction