import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Wallet, DollarSign } from "lucide-react"
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
  const [isComplete, setIsComplete] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState<string>("/ceo/bookings")
  const [planName, setPlanName] = useState<string>("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const planParam = urlParams.get("plan")
    const priceParam = urlParams.get("price")
    const redirectParam = urlParams.get("redirect")

    if (redirectParam) {
      setRedirectUrl(redirectParam)
    }

    if (planParam) {
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
    }

    // Set default seller information
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
  }, [location])

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

      // Redirect with the upgraded tier parameter
      const urlParams = new URLSearchParams(window.location.search)
      const planParam = urlParams.get("plan")

      if (planParam) {
        // In a real app with React Router:
        // navigate(`${redirectUrl}?upgradedTier=${planParam}`)

        // For this example:
        window.location.href = `${redirectUrl}?upgradedTier=${planParam}`
      } else {
        // In a real app with React Router:
        // navigate(redirectUrl)

        // For this example:
        window.location.href = redirectUrl
      }
    }, 2000)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-white/90 text-black">
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
          <h1 className="text-2xl font-bold mb-8 text-gray-700">Complete Your Transaction</h1>

          {seller ? (
            <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Seller Information</h2>
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
                  <p className="text-yellow-500">{"★".repeat(5)}</p>
                </div>
                <div>
                  <p className="text-gray-700">Reviews</p>
                  <p className="text-gray-800 font-medium">{seller.reviews}M reviews</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-gray-300/70 rounded-lg text-center">
              <p className="text-gray-700">No seller information available</p>
            </div>
          )}

          {/* Total Payment Section */}
          <div className="mb-8 p-6 bg-gray-300/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Summary</h2>
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
              <p className="text-gray-700">{planName} Subscription (Monthly)</p>
              <p className="text-gray-800 font-medium">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-bold">Total Amount</p>
              <p className="text-xl text-gray-800 font-bold">${totalAmount.toFixed(2)}</p>
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
      <Footer />
    </div>
  )
}

export default Transaction