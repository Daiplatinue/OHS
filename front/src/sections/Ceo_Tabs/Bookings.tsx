import type React from "react"
import { useState } from "react"
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo"
import { Dialog } from "@headlessui/react"
import { MapPin, ChevronRight, Camera, X, CheckCircle } from "lucide-react"
import image1 from "../../assets/No_Image_Available.jpg"

interface Service {
  id: number
  name: string
  price: number
  description: string
  hasNotification: boolean
  notificationCount?: number
  image: string
  chargePerKm: number
}

interface Booking {
  id: number
  serviceId: number
  serviceName: string
  customerName: string
  date: string
  time: string
  location: string
  distanceCharge: number
  total: number
  modeOfPayment: string
  status: "ongoing" | "pending" | "completed"
  price: number
  image: string
}

function Bookings() {
  const [showNotification] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("services")

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [editedService, setEditedService] = useState<Partial<Service>>({})
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Plumbing Services",
      price: 8000,
      description: "Keep your water systems running smoothly with expert plumbing services.",
      hasNotification: true,
      notificationCount: 3,
      image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
      chargePerKm: 50,
    },
    {
      id: 2,
      name: "Electrical Repairs",
      price: 6500,
      description: "Professional electrical services for your home or business.",
      hasNotification: false,
      image: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_1280.jpg",
      chargePerKm: 40,
    },
    {
      id: 3,
      name: "Cleaning Services",
      price: 4000,
      description: "Comprehensive cleaning solutions for residential and commercial spaces.",
      hasNotification: true,
      notificationCount: 1,
      image: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
      chargePerKm: 30,
    },
    {
      id: 4,
      name: "Home Renovation",
      price: 15000,
      description: "Transform your living space with our expert renovation services.",
      hasNotification: false,
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
      chargePerKm: 60,
    },
  ])

  const companyDetails = {
    name: "Sisyphus Ventures",
    location: "United States",
    description:
      "Professional home services and repairs with guaranteed satisfaction. Available 24/7 for all your maintenance needs.",
    logo: "https://uploads.dailydot.com/2024/07/side-eye-cat.jpg?q=65&auto=format&w=1200&ar=2:1&fit=crop",
    coverPhoto: "https://cdn.pixabay.com/photo/2016/12/05/21/08/cologne-1884931_1280.jpg",
    followers: 34.5,
  }

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 101,
      serviceId: 1,
      serviceName: "Plumbing Services",
      customerName: "John Smith",
      date: "2025-03-15",
      time: "10:00 AM",
      location: "123 Main St, Anytown",
      distanceCharge: 500,
      total: 8500,
      modeOfPayment: "Credit Card",
      status: "ongoing",
      price: 8000,
      image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    },
    {
      id: 102,
      serviceId: 2,
      serviceName: "Electrical Repairs",
      customerName: "Sarah Johnson",
      date: "2025-03-16",
      time: "2:30 PM",
      location: "456 Oak Ave, Somewhere",
      distanceCharge: 300,
      total: 6800,
      modeOfPayment: "Cash",
      status: "pending",
      price: 6500,
      image: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_1280.jpg",
    },
    {
      id: 103,
      serviceId: 3,
      serviceName: "Cleaning Services",
      customerName: "Michael Brown",
      date: "2025-03-10",
      time: "9:00 AM",
      location: "789 Pine St, Elsewhere",
      distanceCharge: 200,
      total: 4200,
      modeOfPayment: "Digital Wallet",
      status: "completed",
      price: 4000,
      image: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
    },
    {
      id: 104,
      serviceId: 1,
      serviceName: "Plumbing Services",
      customerName: "Emily Davis",
      date: "2025-03-18",
      time: "11:30 AM",
      location: "321 Elm St, Nowhere",
      distanceCharge: 450,
      total: 8450,
      modeOfPayment: "Credit Card",
      status: "pending",
      price: 8000,
      image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    },
    {
      id: 105,
      serviceId: 4,
      serviceName: "Home Renovation",
      customerName: "Robert Wilson",
      date: "2025-03-05",
      time: "8:00 AM",
      location: "654 Maple Dr, Anywhere",
      distanceCharge: 800,
      total: 15800,
      modeOfPayment: "Bank Transfer",
      status: "completed",
      price: 15000,
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    },
    {
      id: 106,
      serviceId: 3,
      serviceName: "Cleaning Services",
      customerName: "Jennifer Taylor",
      date: "2025-03-14",
      time: "1:00 PM",
      location: "987 Cedar Ln, Someplace",
      distanceCharge: 350,
      total: 4350,
      modeOfPayment: "Digital Wallet",
      status: "ongoing",
      price: 4000,
      image: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
    },
  ])

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "ongoing") return booking.status === "ongoing"
    if (activeTab === "pending") return booking.status === "pending"
    if (activeTab === "completed") return booking.status === "completed"
    return true
  })

  const handleEditService = (service: Service) => {
    setSelectedService(service)
    setEditedService({
      name: service.name,
      price: service.price,
      image: service.image,
      chargePerKm: service.chargePerKm,
      description: service.description,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteService = (service: Service) => {
    setSelectedService(service)
    setIsDeleteConfirmOpen(true)
  }

  const handleSaveService = () => {
    if (!selectedService) return

    const updatedServices = services.map((service) =>
      service.id === selectedService.id ? { ...service, ...editedService } : service,
    )

    setServices(updatedServices)
    setIsEditModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!selectedService) return

    const filteredServices = services.filter((service) => service.id !== selectedService.id)

    setServices(filteredServices)
    setIsDeleteConfirmOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "chargePerKm") {
      setEditedService({
        ...editedService,
        [name]: Number.parseInt(value) || 0,
      })
    } else {
      setEditedService({
        ...editedService,
        [name]: value,
      })
    }
  }

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const renderTabContent = () => {
    if (activeTab === "services") {
      if (services.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100/50 rounded-2xl">
            <div className="text-center max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Services Available</h3>
              <p className="text-gray-600 mb-6">
                You haven't added any services yet. Add your first service to start receiving bookings.
              </p>
              <button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                Add Service
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-200/70 rounded-3xl p-6 relative flex flex-col h-[450px]">
              {service.hasNotification && showNotification && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="relative">
                    <div className="absolute -top-1 -right-1 animate-ping h-6 w-6 rounded-full bg-red-400 opacity-75"></div>
                    <div className="relative bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {service.notificationCount}
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditService(service)
                  }}
                  className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteService(service)
                  }}
                  className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              </div>
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={service.image || image1} alt={service.name} className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{service.description}</p>
              <div className="flex flex-col gap-1 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Starting Rate:</span>
                  <span className="text-lg font-medium">₱{service.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Per KM Charge:</span>
                  <span className="text-base">₱{service.chargePerKm.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      const filteredBookingsForTab = filteredBookings

      if (filteredBookingsForTab.length === 0) {
        let emptyMessage = ""
        let emptyDescription = ""

        if (activeTab === "ongoing") {
          emptyMessage = "No Ongoing Bookings"
          emptyDescription = "You don't have any ongoing bookings at the moment."
        } else if (activeTab === "pending") {
          emptyMessage = "No Pending Bookings"
          emptyDescription = "You don't have any pending bookings waiting for approval."
        } else if (activeTab === "completed") {
          emptyMessage = "No Completed Bookings"
          emptyDescription = "You haven't completed any bookings yet."
        }

        return (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100/50 rounded-2xl">
            <div className="text-center max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{emptyMessage}</h3>
              <p className="text-gray-600 mb-6">{emptyDescription}</p>
              <button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                Add Service
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBookingsForTab.map((booking) => (
            <div key={booking.id} className="bg-gray-200/70 rounded-3xl p-6 flex flex-col h-[450px]">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={booking.image || image1} alt={booking.serviceName} className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{booking.serviceName}</h3>
              <div className="space-y-2 flex-grow">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Customer:</span> {booking.customerName}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()},{" "}
                  {booking.time}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Location:</span> {booking.location}
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <div className="text-lg font-medium">₱{booking.total.toLocaleString()}</div>
                <button
                  onClick={() => handleBookingClick(booking)}
                  className="text-sky-500 hover:text-sky-600 flex items-center gap-1 group"
                >
                  Details
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedService({
      ...editedService,
      [name]: value,
    })
  }

  const [ceoMarkedCompleted, setCeoMarkedCompleted] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [processingBookingId, setProcessingBookingId] = useState<number | null>(null)

  // Add these state variables to the component, near the other useState declarations
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false)
  const [declineReason, setDeclineReason] = useState("")

  // Add this function to handle the decline process
  const handleDeclineBooking = (bookingId: number) => {
    setIsLoading(true)
    setProcessingBookingId(bookingId)

    // Simulate API call
    setTimeout(() => {
      const updatedBookings = bookings.filter((booking) => booking.id !== bookingId)

      setBookings(updatedBookings)
      setIsDeclineModalOpen(false)
      setIsModalOpen(false)
      setIsLoading(false)
      setProcessingBookingId(null)
      setDeclineReason("")
    }, 2000)
  }

  const handleMarkAsCompleted = (bookingId: number) => {
    if (!ceoMarkedCompleted.includes(bookingId)) {
      setCeoMarkedCompleted([...ceoMarkedCompleted, bookingId])
      setIsLoading(true)
      setProcessingBookingId(bookingId)

      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)

        setTimeout(() => {
          const updatedBookings = bookings.map(
            (booking): Booking => (booking.id === bookingId ? { ...booking, status: "completed" as const } : booking),
          )

          setBookings(updatedBookings)
          setIsModalOpen(false)
          setShowSuccess(false)
          setProcessingBookingId(null)
          setActiveTab("completed")
        }, 5000)
      }, 10000)
    }
  }

  const handleAcceptBooking = (bookingId: number) => {
    setIsLoading(true)
    setProcessingBookingId(bookingId)

    setTimeout(() => {
      const updatedBookings = bookings.map(
        (booking): Booking => (booking.id === bookingId ? { ...booking, status: "ongoing" as const } : booking),
      )

      setBookings(updatedBookings)
      setIsModalOpen(false)
      setIsLoading(false)
      setProcessingBookingId(null)
      setActiveTab("ongoing")
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Dock */}
      <div className="sticky top-0 z-40 flex">
        <MyFloatingDockCeo />
      </div>

      {/* Company Profile Section */}
      <div className="max-w-7xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-80 overflow-hidden rounded-b-3xl">
          <img src={companyDetails.coverPhoto || image1} alt="Cover" className="w-full h-full object-cover" />
          <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all">
            <Camera className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Info with Stats */}
        <div className="relative px-4 pb-8">
          <div className="absolute -top-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <img
                  src={companyDetails.logo || image1}
                  alt={companyDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="pt-20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{companyDetails.name}</h1>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{companyDetails.location}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                Edit Profile
              </button>
            </div>

            {/* Stats Section */}
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div>
                  <div className="font-semibold">{companyDetails.followers.toLocaleString() + "M"}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <div className="font-semibold">6.7M</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 max-w-2xl">{companyDetails.description}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("services")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "services"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "ongoing"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Ongoing Bookings
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "pending"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Pending Bookings
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "completed"
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Completed Bookings
              </button>
            </nav>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-8 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {activeTab === "services"
                ? "Services"
                : activeTab === "ongoing"
                  ? "Ongoing Bookings"
                  : activeTab === "pending"
                    ? "Pending Bookings"
                    : "Completed Bookings"}
            </h2>
            <button className="text-sky-500 hover:text-sky-600">View All</button>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all">
            {selectedBooking && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section - Left side on desktop */}
                <div className="md:w-2/5 relative">
                  <div className="h-48 md:h-full">
                    <img
                      src={selectedBooking.image || image1}
                      alt={selectedBooking.serviceName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/40 transition-all text-white md:hidden"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content Section - Right side on desktop */}
                <div className="md:w-3/5 p-6 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <Dialog.Title className="text-2xl font-bold text-gray-900">Booking Details</Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500 hidden md:block"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedBooking.serviceName}</h3>
                      <div
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-opacity-10 mb-4"
                        style={{
                          backgroundColor:
                            selectedBooking.status === "completed"
                              ? "rgba(34, 197, 94, 0.1)"
                              : selectedBooking.status === "ongoing"
                                ? "rgba(59, 130, 246, 0.1)"
                                : "rgba(234, 179, 8, 0.1)",
                          color:
                            selectedBooking.status === "completed"
                              ? "rgb(22, 163, 74)"
                              : selectedBooking.status === "ongoing"
                                ? "rgb(37, 99, 235)"
                                : "rgb(202, 138, 4)",
                        }}
                      >
                        {selectedBooking.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                        <p className="mt-1 text-base font-medium text-gray-900">{selectedBooking.customerName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                        <p className="mt-1 text-base font-medium text-gray-900">{selectedBooking.modeOfPayment}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                        <p className="mt-1 text-base font-medium text-gray-900">
                          {new Date(selectedBooking.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          , {selectedBooking.time}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p className="mt-1 text-base font-medium text-gray-900 flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{selectedBooking.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mt-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-medium">₱{selectedBooking.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance Charge</span>
                          <span className="font-medium">₱{selectedBooking.distanceCharge.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 mt-2">
                          <span>Total</span>
                          <span>₱{selectedBooking.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      {selectedBooking &&
                        selectedBooking.status === "ongoing" &&
                        !ceoMarkedCompleted.includes(selectedBooking.id) && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
                            <p className="font-medium">
                              Admin is still holding your transaction until both customer and CEO marked as completed.
                            </p>
                          </div>
                        )}

                      {showSuccess && processingBookingId === selectedBooking.id && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500 animate-bounce" />
                          <p className="font-medium">Transaction is completed, please check your balance.</p>
                        </div>
                      )}

                      {selectedBooking && ceoMarkedCompleted.includes(selectedBooking.id) && !showSuccess && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
                          <p className="font-medium">Please wait for the customer to mark as completed at their end.</p>
                          <p className="mt-1">Contact our services if anything goes wrong.</p>
                        </div>
                      )}

                      <div className="flex space-x-3">

                        {selectedBooking && selectedBooking.status === "ongoing" && (
                          <button
                            onClick={() => handleMarkAsCompleted(selectedBooking.id)}
                            disabled={ceoMarkedCompleted.includes(selectedBooking.id) || isLoading || showSuccess}
                            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${ceoMarkedCompleted.includes(selectedBooking.id) || showSuccess
                              ? "bg-gray-400 cursor-not-allowed"
                              : isLoading && processingBookingId === selectedBooking.id
                                ? "bg-sky-400 cursor-wait"
                                : "bg-sky-500 hover:bg-sky-600"
                              }`}
                          >
                            {isLoading && processingBookingId === selectedBooking.id ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : ceoMarkedCompleted.includes(selectedBooking.id) ? (
                              "Waiting for Customer"
                            ) : (
                              "Mark as Completed"
                            )}
                          </button>
                        )}

                        {selectedBooking && selectedBooking.status === "pending" && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                setIsDeclineModalOpen(true)
                              }}
                              className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-[300px]"
                            >
                              Decline Booking
                            </button>
                            <button
                              onClick={() => handleAcceptBooking(selectedBooking.id)}
                              disabled={isLoading}
                              className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${isLoading && processingBookingId === selectedBooking.id
                                ? "bg-sky-400 cursor-wait"
                                : "bg-sky-500 hover:bg-sky-600"
                                }`}
                            >
                              {isLoading && processingBookingId === selectedBooking.id ? (
                                <span className="flex items-center justify-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                "Accept Booking"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Preview Section */}
              <div className="md:w-2/5 bg-gray-50 p-6 flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Service Preview</h3>

                <div className="flex-1 flex flex-col">
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-200 border border-gray-300">
                    <img
                      src={editedService.image || image1}
                      alt="Service Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = image1
                      }}
                    />
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
                    <h4 className="text-xl font-semibold mb-2">{editedService.name || "Service Name"}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {editedService.description || "Service description will appear here."}
                    </p>

                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Starting Rate:</span>
                        <span className="text-lg font-medium">₱{(editedService.price || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Per KM Charge:</span>
                        <span className="text-base">₱{(editedService.chargePerKm || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:w-3/5 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className="text-xl font-semibold">Edit Service</Dialog.Title>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {selectedService && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSaveService()
                    }}
                    className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedService.name || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={editedService.image || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter image URL or leave blank for default"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter a valid image URL to see the preview update in real-time
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Starting Rate (₱)
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={editedService.price || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="chargePerKm" className="block text-sm font-medium text-gray-700 mb-1">
                          Charge Per KM (₱)
                        </label>
                        <input
                          type="number"
                          id="chargePerKm"
                          name="chargePerKm"
                          value={editedService.chargePerKm || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={editedService.description || ""}
                        onChange={handleTextAreaChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">Delete Service</Dialog.Title>
                <button onClick={() => setIsDeleteConfirmOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedService && (
                <div>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedService.name}</span>? This
                    action cannot be undone.
                  </p>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsDeleteConfirmOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Decline Reason Modal */}
      <Dialog open={isDeclineModalOpen} onClose={() => setIsDeclineModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">Decline Booking</Dialog.Title>
                <button onClick={() => setIsDeclineModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedBooking && (
                <div>
                  <p className="text-gray-600 mb-4">
                    Please provide a reason for declining this booking request from{" "}
                    <span className="font-semibold">{selectedBooking.customerName}</span>.
                  </p>

                  <div className="mb-6">
                    <label htmlFor="declineReason" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Declining
                    </label>
                    <textarea
                      id="declineReason"
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
                      placeholder="Please explain why you're declining this booking..."
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsDeclineModalOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeclineBooking(selectedBooking.id)}
                      disabled={!declineReason.trim() || isLoading}
                      className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${!declineReason.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : isLoading && processingBookingId === selectedBooking.id
                          ? "bg-red-400 cursor-wait"
                          : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {isLoading && processingBookingId === selectedBooking.id ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default Bookings