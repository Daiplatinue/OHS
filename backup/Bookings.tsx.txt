import type React from "react"
import { useState, useEffect } from "react"
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo"
import { Dialog } from "@headlessui/react"
import {
  MapPin,
  ChevronRight,
  Camera,
  X,
  CheckCircle,
  Plus,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Clipboard,
  FileText,
  PenToolIcon as Tool,
  Lock,
  Trash2,
  User,
  Crown,
  Sparkles,
} from "lucide-react"
import image1 from "../../assets/No_Image_Available.jpg"
import confetti from "canvas-confetti"

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

interface ExpenseItem {
  name: string
  estimatedCost: number
  required: boolean
}

interface PersonalInfo {
  id: number
  type: string
  title: string
  description: string
  startDate?: string
  endDate?: string
  location?: string
  organization?: string
  hasNotification?: boolean
  notificationCount?: number
  image?: string
}

type SubscriptionTier = "free" | "mid" | "premium" | "unlimited"

interface SubscriptionInfo {
  tier: SubscriptionTier
  maxServices: number
  name: string
  color: string
  price: number
  billingCycle: string
  nextBillingDate: string
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

  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] = useState(false)
  const [createServiceStep, setCreateServiceStep] = useState(1)
  const totalSteps = 4

  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    tier: "free",
    maxServices: 3,
    name: "Free",
    color: "text-gray-600",
    price: 0,
    billingCycle: "Monthly",
    nextBillingDate: "N/A",
  })

  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false)

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    price: 0,
    description: "",
    image: "",
    chargePerKm: 0,
  })

  const [expenses] = useState<ExpenseItem[]>([
    { name: "Tools and Equipment", estimatedCost: 5000, required: true },
    { name: "Transportation", estimatedCost: 2000, required: true },
    { name: "Materials", estimatedCost: 3000, required: false },
    { name: "Labor", estimatedCost: 4000, required: true },
    { name: "Insurance", estimatedCost: 1500, required: true },
  ])

  const [requirements, setRequirements] = useState({
    businessPermit: false,
    validID: false,
    certification: false,
    backgroundCheck: false,
    insurance: false,
    equipmentList: false,
    serviceAgreement: false,
    bankAccount: false,
  })

  const [selectedInfo, setSelectedInfo] = useState<PersonalInfo | null>(null)
  const [editedInfo, setEditedInfo] = useState<Partial<PersonalInfo>>({})
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false)
  const [isDeleteInfoConfirmOpen, setIsDeleteInfoConfirmOpen] = useState(false)

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

  const userDetails = {
    name: "John Doe",
    location: "San Francisco, CA",
    description:
      "Professional software developer with 5+ years of experience in web and mobile application development. Passionate about creating intuitive user experiences.",
    avatar: "https://uploads.dailydot.com/2024/07/side-eye-cat.jpg?q=65&auto=format&w=1200&ar=2:1&fit=crop",
    coverPhoto: "https://cdn.pixabay.com/photo/2016/12/05/21/08/cologne-1884931_1280.jpg",
    followers: 1.2,
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-05-15",
    gender: "Male",
  }

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo[]>([
    {
      id: 1,
      type: "education",
      title: "Computer Science",
      description: "Bachelor's degree in Computer Science with focus on software engineering and data structures.",
      startDate: "2010-09-01",
      endDate: "2014-06-30",
      organization: "Stanford University",
      location: "Stanford, CA",
      image: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_1280.jpg",
    },
    {
      id: 2,
      type: "education",
      title: "Machine Learning",
      description: "Master's degree in Machine Learning and Artificial Intelligence.",
      startDate: "2014-09-01",
      endDate: "2016-06-30",
      organization: "MIT",
      location: "Cambridge, MA",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    },
    {
      id: 3,
      type: "experience",
      title: "Senior Developer",
      description: "Led a team of 5 developers to build and maintain enterprise-level web applications.",
      startDate: "2020-01-15",
      endDate: "Present",
      organization: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      hasNotification: true,
      notificationCount: 2,
      image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    },
    {
      id: 4,
      type: "experience",
      title: "Web Developer",
      description: "Developed and maintained client websites using React, Node.js, and MongoDB.",
      startDate: "2016-08-01",
      endDate: "2019-12-31",
      organization: "Digital Creations",
      location: "Los Angeles, CA",
      image: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
    },
    {
      id: 5,
      type: "skills",
      title: "Frontend Development",
      description:
        "Proficient in React, Vue.js, HTML5, CSS3, and JavaScript. Experienced in building responsive and accessible web applications.",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    },
    {
      id: 6,
      type: "skills",
      title: "Backend Development",
      description:
        "Experienced with Node.js, Express, Python, Django, and RESTful API design. Familiar with database design and optimization.",
      hasNotification: true,
      notificationCount: 1,
      image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    },
  ])

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

  const subscriptionPlans = [
    {
      tier: "free",
      name: "Free",
      maxServices: 3,
      price: 0,
      color: "bg-gray-100",
      textColor: "text-gray-600",
      features: ["Up to 3 services", "Basic analytics", "Standard support"],
    },
    {
      tier: "mid",
      name: "Professional",
      maxServices: 10,
      price: 25000,
      color: "bg-blue-100",
      textColor: "text-blue-600",
      features: ["Up to 10 services", "Advanced analytics", "Priority support", "Custom branding"],
    },
    {
      tier: "premium",
      name: "Business",
      maxServices: 20,
      price: 50000,
      color: "bg-purple-100",
      textColor: "text-purple-600",
      features: ["Up to 20 services", "Premium analytics", "24/7 support", "Custom branding", "Team accounts"],
    },
    {
      tier: "unlimited",
      name: "Enterprise",
      maxServices: Number.POSITIVE_INFINITY,
      price: 100000,
      color: "bg-amber-100",
      textColor: "text-amber-600",
      features: [
        "Unlimited services",
        "Enterprise analytics",
        "Dedicated support",
        "Custom branding",
        "Team accounts",
        "API access",
      ],
    },
  ]

  const triggerCelebration = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.3, 0.7) },
        colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
      })

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.3, 0.7) },
        colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
      })
    }, 250)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const upgradedTier = urlParams.get("upgradedTier")

    if (upgradedTier) {
      const plan = subscriptionPlans.find((plan) => plan.tier === upgradedTier)

      if (plan) {
        setSubscription({
          tier: plan.tier as SubscriptionTier,
          maxServices: plan.maxServices,
          name: plan.name,
          color: plan.textColor,
          price: plan.price,
          billingCycle: "Monthly",
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        })

        setIsSuccessModalOpen(true)
        setTimeout(() => {
          triggerCelebration()
        }, 500)

        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [])

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

  const handleNewServiceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "chargePerKm") {
      setNewService({
        ...newService,
        [name]: Number.parseInt(value) || 0,
      })
    } else {
      setNewService({
        ...newService,
        [name]: value,
      })
    }
  }

  const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setRequirements({
      ...requirements,
      [name]: checked,
    })
  }

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const handleCreateService = () => {
    if (services.length >= subscription.maxServices) {
      setIsPlansModalOpen(true)
      return
    }

    setIsCreateServiceModalOpen(true)
    setCreateServiceStep(1)
    setNewService({
      name: "",
      price: 0,
      description: "",
      image: "",
      chargePerKm: 0,
    })
  }

  const handleNextStep = () => {
    if (createServiceStep < totalSteps) {
      setCreateServiceStep(createServiceStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (createServiceStep > 1) {
      setCreateServiceStep(createServiceStep - 1)
    }
  }

  const handleSubmitNewService = () => {
    const newServiceEntry: Service = {
      id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
      name: newService.name || "New Service",
      price: newService.price || 0,
      description: newService.description || "",
      image: newService.image || image1,
      chargePerKm: newService.chargePerKm || 0,
      hasNotification: false,
    }

    setServices([...services, newServiceEntry])
    setIsCreateServiceModalOpen(false)
    setCreateServiceStep(1)
  }

  const handleSelectPlan = (tier: SubscriptionTier) => {
    const selectedPlan = subscriptionPlans.find((plan) => plan.tier === tier)

    if (selectedPlan) {
      // In a real app with React Router:
      // navigate('/transaction', {
      //   state: {
      //     plan: selectedPlan,
      //     seller: {
      //       name: "Online Home Services",
      //       rating: 5,
      //       reviews: 823.2,
      //       location: "Cebu City Branches",
      //       price: selectedPlan.price
      //     }
      //   }
      // });

      // For this example, we'll simulate with URL parameters
      window.location.href = `/transaction?plan=${tier}&price=${selectedPlan.price}&redirect=/ceo/bookings`
    }
  }

  const handleEditInfo = (info: PersonalInfo) => {
    setSelectedInfo(info)
    setEditedInfo({
      title: info.title,
      description: info.description,
      startDate: info.startDate,
      endDate: info.endDate,
      organization: info.organization,
      location: info.location,
      image: info.image,
    })
    setIsEditInfoModalOpen(true)
  }

  const handleDeleteInfo = (info: PersonalInfo) => {
    setSelectedInfo(info)
    setIsDeleteInfoConfirmOpen(true)
  }

  const handleSaveInfo = () => {
    if (!selectedInfo) return

    const updatedInfo = personalInfo.map((info) => (info.id === selectedInfo.id ? { ...info, ...editedInfo } : info))

    setPersonalInfo(updatedInfo)
    setIsEditInfoModalOpen(false)
  }

  const handleConfirmDeleteInfo = () => {
    if (!selectedInfo) return

    const filteredInfo = personalInfo.filter((info) => info.id !== selectedInfo.id)

    setPersonalInfo(filteredInfo)
    setIsDeleteInfoConfirmOpen(false)
  }

  const handleInfoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    })
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    })
  }

  const allRequirementsMet = Object.values(requirements).every((value) => value === true)

  const renderCreateServiceStepContent = () => {
    switch (createServiceStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Service Information</h3>
            <p className="text-sm text-gray-500">Enter the basic details about your service.</p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Service Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newService.name || ""}
                onChange={handleNewServiceInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={newService.description || ""}
                onChange={handleNewServiceInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]"
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
                value={newService.image || ""}
                onChange={handleNewServiceInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter image URL or leave blank for default"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Pricing Information</h3>
            <p className="text-sm text-gray-500">Set your service rates and charges.</p>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Base Service Rate (₱)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newService.price || ""}
                onChange={handleNewServiceInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This is the starting price for your service</p>
            </div>

            <div>
              <label htmlFor="chargePerKm" className="block text-sm font-medium text-gray-700 mb-1">
                Charge Per KM (₱)*
              </label>
              <input
                type="number"
                id="chargePerKm"
                name="chargePerKm"
                value={newService.chargePerKm || ""}
                onChange={handleNewServiceInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Additional charge per kilometer of travel distance</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
              <p className="font-medium">Pricing Recommendations</p>
              <p className="mt-1">Consider your expenses, market rates, and profit margin when setting prices.</p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Required Expenses</h3>
            <p className="text-sm text-gray-500">
              These are the estimated expenses you'll need to cover for this service.
            </p>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 mr-3">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{expense.name}</p>
                        <p className="text-xs text-gray-500">{expense.required ? "Required" : "Optional"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₱{expense.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Total Estimated Expenses</p>
                    <p className="text-lg font-medium">
                      ₱{expenses.reduce((sum, expense) => sum + expense.estimatedCost, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
              <p className="font-medium">Important Note</p>
              <p className="mt-1">
                These are estimated expenses. Actual costs may vary based on specific job requirements and location.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Service Requirements</h3>
            <p className="text-sm text-gray-500">
              Please confirm you have all the required documents and qualifications.
            </p>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="businessPermit"
                    name="businessPermit"
                    checked={requirements.businessPermit}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="businessPermit" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Business Permit</span>
                    <span className="text-xs text-gray-500 block">Valid business registration or permit</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="validID"
                    name="validID"
                    checked={requirements.validID}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="validID" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Valid ID</span>
                    <span className="text-xs text-gray-500 block">Government-issued identification</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="certification"
                    name="certification"
                    checked={requirements.certification}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="certification" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Professional Certification</span>
                    <span className="text-xs text-gray-500 block">Relevant certifications for your service area</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="backgroundCheck"
                    name="backgroundCheck"
                    checked={requirements.backgroundCheck}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="backgroundCheck" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Background Check</span>
                    <span className="text-xs text-gray-500 block">Consent to background verification</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="insurance"
                    name="insurance"
                    checked={requirements.insurance}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="insurance" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Liability Insurance</span>
                    <span className="text-xs text-gray-500 block">Professional liability coverage</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="equipmentList"
                    name="equipmentList"
                    checked={requirements.equipmentList}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="equipmentList" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Equipment List</span>
                    <span className="text-xs text-gray-500 block">Inventory of tools and equipment</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="serviceAgreement"
                    name="serviceAgreement"
                    checked={requirements.serviceAgreement}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="serviceAgreement" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Service Agreement</span>
                    <span className="text-xs text-gray-500 block">Acceptance of platform terms and conditions</span>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="bankAccount"
                    name="bankAccount"
                    checked={requirements.bankAccount}
                    onChange={handleRequirementChange}
                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded"
                  />
                  <label htmlFor="bankAccount" className="ml-2 block">
                    <span className="text-sm font-medium text-gray-700">Bank Account</span>
                    <span className="text-xs text-gray-500 block">Valid bank account for payments</span>
                  </label>
                </div>
              </div>
            </div>

            {!allRequirementsMet && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                <p className="font-medium">All requirements must be met</p>
                <p className="mt-1">Please check all boxes to confirm you meet the requirements.</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
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
              <button
                onClick={handleCreateService}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className="flex flex-col">
          {/* Subscription info banner */}
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              services.length >= subscription.maxServices
                ? "bg-red-50 border border-red-200"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <Crown className={`h-5 w-5 mr-2 ${subscription.color}`} />
              <div>
                <h3 className="font-medium">
                  {subscription.name} Plan
                  <span
                    className={`ml-2 text-sm ${
                      services.length >= subscription.maxServices ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    ({services.length}/
                    {subscription.maxServices === Number.POSITIVE_INFINITY ? "∞" : subscription.maxServices})
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  {services.length >= subscription.maxServices
                    ? "You've reached your service limit."
                    : `You can add ${subscription.maxServices - services.length} more service${subscription.maxServices - services.length !== 1 ? "s" : ""}.`}
                </p>
              </div>
            </div>
          </div>

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
                <h3 className="text-xl font-light mb-2">{service.name}</h3>
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

          {/* Create Service button moved to the bottom */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleCreateService}
              className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                services.length >= subscription.maxServices
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              } transition-all`}
              disabled={services.length >= subscription.maxServices}
            >
              <Plus className="h-4 w-4" />
              {services.length >= subscription.maxServices ? "Service Limit Reached" : "Create Service"}
            </button>
          </div>
        </div>
      )
    } else if (activeTab === "ongoing" || activeTab === "pending" || activeTab === "completed") {
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
              <button
                onClick={handleCreateService}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
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
              <h3 className="text-xl font-light mb-2">{booking.serviceName}</h3>
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
    } else if (activeTab === "personal") {
      return (
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Full Name</h4>
                <p className="text-gray-900">{userDetails.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                <p className="text-gray-900">{userDetails.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                <p className="text-gray-900">{userDetails.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                <p className="text-gray-900 flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  {userDetails.location}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Birthday</h4>
                <p className="text-gray-900">{new Date(userDetails.birthday).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Gender</h4>
                <p className="text-gray-900">{userDetails.gender}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Bio</h4>
              <p className="text-gray-900">{userDetails.description}</p>
            </div>
          </div>

          {/* Subscription Information - Apple-inspired design */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Subscription</h3>
              <button
                onClick={() => setIsPlansModalOpen(true)}
                className="text-sky-500 hover:text-sky-600 text-sm font-medium"
              >
                Change Plan
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    subscription.tier === "free"
                      ? "bg-gray-200"
                      : subscription.tier === "mid"
                        ? "bg-blue-100"
                        : subscription.tier === "premium"
                          ? "bg-purple-100"
                          : "bg-amber-100"
                  }`}
                >
                  <Crown className={`h-6 w-6 ${subscription.color}`} />
                </div>
                <div>
                  <h4 className="text-lg font-medium">{subscription.name} Plan</h4>
                  <p className="text-gray-600 text-sm">
                    {subscription.maxServices === Number.POSITIVE_INFINITY
                      ? "Unlimited services"
                      : `Up to ${subscription.maxServices} services`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Current Usage</h5>
                  <div className="flex items-center">
                    <span className="text-xl font-medium">{services.length}</span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-gray-500">
                      {subscription.maxServices === Number.POSITIVE_INFINITY ? "∞" : subscription.maxServices}
                    </span>
                    <span className="text-gray-500 ml-1">services</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        subscription.tier === "free"
                          ? "bg-gray-500"
                          : subscription.tier === "mid"
                            ? "bg-blue-500"
                            : subscription.tier === "premium"
                              ? "bg-purple-500"
                              : "bg-amber-500"
                      }`}
                      style={{
                        width: `${
                          subscription.maxServices === Number.POSITIVE_INFINITY
                            ? 10
                            : Math.min(100, (services.length / subscription.maxServices) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Billing</h5>
                  {subscription.price > 0 ? (
                    <>
                      <p className="text-xl font-medium">
                        ${subscription.price}
                        <span className="text-sm text-gray-500">/month</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Next billing: {subscription.nextBillingDate}</p>
                    </>
                  ) : (
                    <p className="text-xl font-medium">Free</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Education</h3>
              <button className="text-sky-500 hover:text-sky-600 flex items-center gap-1">
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
                  className="lucide lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Education
              </button>
            </div>
            <div className="space-y-6">
              {personalInfo
                .filter((info) => info.type === "education")
                .map((edu) => (
                  <div
                    key={edu.id}
                    className="flex flex-col md:flex-row gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="md:w-1/4">
                      <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img src={edu.image || image1} alt={edu.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-medium">{edu.title}</h4>
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditInfo(edu)} className="text-gray-500 hover:text-gray-700">
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
                          <button onClick={() => handleDeleteInfo(edu)} className="text-gray-500 hover:text-red-500">
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
                      </div>
                      <p className="text-gray-700 text-sm">
                        {edu.organization} {edu.location && `• ${edu.location}`}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {new Date(edu.startDate || "").toLocaleDateString("en-US", { year: "numeric", month: "short" })}{" "}
                        -
                        {edu.endDate === "Present"
                          ? " Present"
                          : edu.endDate
                            ? ` ${new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}`
                            : ""}
                      </p>
                      <p className="text-gray-600 text-sm">{edu.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Work Experience</h3>
              <button className="text-sky-500 hover:text-sky-600 flex items-center gap-1">
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
                  className="lucide lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {personalInfo
                .filter((info) => info.type === "experience")
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="flex flex-col md:flex-row gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="md:w-1/4">
                      <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img src={exp.image || image1} alt={exp.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-medium">{exp.title}</h4>
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditInfo(exp)} className="text-gray-500 hover:text-gray-700">
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
                          <button onClick={() => handleDeleteInfo(exp)} className="text-gray-500 hover:text-red-500">
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
                      </div>
                      <p className="text-gray-700 text-sm">
                        {exp.organization} {exp.location && `• ${exp.location}`}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {new Date(exp.startDate || "").toLocaleDateString("en-US", { year: "numeric", month: "short" })}{" "}
                        -
                        {exp.endDate === "Present"
                          ? " Present"
                          : exp.endDate
                            ? ` ${new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}`
                            : ""}
                      </p>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Skills & Expertise</h3>
              <button className="text-sky-500 hover:text-sky-600 flex items-center gap-1">
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
                  className="lucide lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalInfo
                .filter((info) => info.type === "skills")
                .map((skill) => (
                  <div key={skill.id} className="bg-gray-50 rounded-xl p-4 relative">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium">{skill.title}</h4>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditInfo(skill)} className="text-gray-500 hover:text-gray-700">
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
                        <button onClick={() => handleDeleteInfo(skill)} className="text-gray-500 hover:text-red-500">
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
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )
    } else if (activeTab === "security") {
      return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Change Password</h3>
          <form className="space-y-4 max-w-md">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your current password"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your new password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all"
              >
                Update Password
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">Protect your account with 2FA</p>
                <p className="text-gray-500 text-sm mt-1">
                  Add an extra layer of security to your account by requiring both your password and authentication
                  code.
                </p>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Login Sessions</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-gray-500 text-sm mt-1">San Francisco, CA • Chrome on Windows</p>
                    <p className="text-gray-500 text-sm">Started: March 18, 2025 at 1:42 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Mobile App</p>
                    <p className="text-gray-500 text-sm mt-1">Los Angeles, CA • iPhone App</p>
                    <p className="text-gray-500 text-sm">Last active: March 17, 2025 at 8:30 AM</p>
                  </div>
                  <button className="text-red-500 text-sm hover:text-red-600">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (activeTab === "delete") {
      return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-2 text-red-600">Delete Account</h3>
          <p className="text-gray-600 mb-6">Once you delete your account, there is no going back. Please be certain.</p>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h4 className="font-medium text-red-800 mb-2">Before you proceed, please understand:</h4>
              <ul className="list-disc pl-5 space-y-2 text-red-700 text-sm">
                <li>All your personal information will be permanently deleted</li>
                <li>Your service listings will be removed from the platform</li>
                <li>Your booking history will be anonymized</li>
                <li>You will lose access to any pending payments</li>
                <li>This action cannot be undone</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium mb-3">Deletion Process:</h4>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li>
                  <p className="font-medium">Request Account Deletion</p>
                  <p className="text-sm text-gray-600">
                    Submit your request by clicking the "Delete Account" button below.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Verification</p>
                  <p className="text-sm text-gray-600">
                    We'll send a verification code to your email address to confirm your identity.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Confirmation</p>
                  <p className="text-sm text-gray-600">
                    Enter the verification code and confirm your decision to delete your account.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Account Deletion</p>
                  <p className="text-sm text-gray-600">
                    Your account will be scheduled for deletion. This process may take up to 30 days to complete.
                  </p>
                </li>
              </ol>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 mb-4">
                To proceed with account deletion, please type <span className="font-medium">"DELETE MY ACCOUNT"</span>{" "}
                in the field below:
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Type DELETE MY ACCOUNT"
                />
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  const handleServiceTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false)
  const [declineReason, setDeclineReason] = useState("")

  const handleDeclineBooking = (bookingId: number) => {
    setIsLoading(true)
    setProcessingBookingId(bookingId)

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
    <div className="min-h-screen bg-gray-50 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
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
                <h1 className="text-2xl font-normal text-gray-900">{companyDetails.name}</h1>
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
                  <div className="font-normal">{companyDetails.followers.toLocaleString() + "M"}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <div>6.7M</div>
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
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("services")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "services"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "ongoing"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Ongoing Bookings
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "pending"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending Bookings
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "completed"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed Bookings
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "personal"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="h-4 w-4" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "security"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Lock className="h-4 w-4" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("delete")}
                className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${
                  activeTab === "delete"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </button>
            </nav>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-8 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">
              {activeTab === "services"
                ? "Services"
                : activeTab === "ongoing"
                  ? "Ongoing Bookings"
                  : activeTab === "pending"
                    ? "Pending Bookings"
                    : activeTab === "completed"
                      ? "Completed Bookings"
                      : activeTab === "personal"
                        ? "Personal Information"
                        : activeTab === "security"
                          ? "Security Settings"
                          : "Delete Account"}
            </h2>
            {activeTab === "personal" && (
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                Edit Profile
              </button>
            )}
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
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
                    <Dialog.Title className="text-2xl font-medium text-gray-900">Booking Details</Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500 hidden md:block"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-light text-gray-900 mb-1">{selectedBooking.serviceName}</h3>
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
                        <div className="flex justify-between text-lg font-light pt-2 border-t border-gray-200 mt-2">
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
                            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${
                              ceoMarkedCompleted.includes(selectedBooking.id) || showSuccess
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
                              className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${
                                isLoading && processingBookingId === selectedBooking.id
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

        <div className="fixed inset-0 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
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
                    <h4 className="text-xl font-medium mb-2">{editedService.name || "Service Name"}</h4>
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
                  <Dialog.Title className="text-xl font-medium">Edit Service</Dialog.Title>
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
                        onChange={handleServiceTextAreaChange}
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

      {/* Edit Personal Info Modal */}
      <Dialog open={isEditInfoModalOpen} onClose={() => setIsEditInfoModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Preview Section */}
              <div className="md:w-2/5 bg-gray-50 p-6 flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>

                <div className="flex-1 flex flex-col">
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-200 border border-gray-300">
                    <img
                      src={editedInfo.image || image1}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = image1
                      }}
                    />
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
                    <h4 className="text-xl font-semibold mb-2">{editedInfo.title || "Title"}</h4>
                    {editedInfo.organization && (
                      <p className="text-gray-700 text-sm mb-1">
                        {editedInfo.organization} {editedInfo.location && `• ${editedInfo.location}`}
                      </p>
                    )}
                    {editedInfo.startDate && (
                      <p className="text-gray-600 text-sm mb-3">
                        {new Date(editedInfo.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}{" "}
                        -
                        {editedInfo.endDate === "Present"
                          ? " Present"
                          : editedInfo.endDate
                            ? ` ${new Date(editedInfo.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}`
                            : ""}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm line-clamp-4">
                      {editedInfo.description || "Description will appear here."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:w-3/5 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className="text-xl font-semibold">
                    Edit{" "}
                    {selectedInfo?.type
                      ? selectedInfo.type.charAt(0).toUpperCase() + selectedInfo.type.slice(1)
                      : "Info"}
                  </Dialog.Title>
                  <button onClick={() => setIsEditInfoModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {selectedInfo && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSaveInfo()
                    }}
                    className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
                  >
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedInfo.title || ""}
                        onChange={handleInfoInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>

                    {(selectedInfo.type === "education" || selectedInfo.type === "experience") && (
                      <>
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                            {selectedInfo.type === "education" ? "Institution" : "Company"}
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={editedInfo.organization || ""}
                            onChange={handleInfoInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={editedInfo.location || ""}
                            onChange={handleInfoInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              value={editedInfo.startDate || ""}
                              onChange={handleInfoInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              value={editedInfo.endDate === "Present" ? "" : editedInfo.endDate || ""}
                              onChange={handleInfoInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                            <div className="flex items-center mt-1">
                              <input
                                type="checkbox"
                                id="currentlyHere"
                                checked={editedInfo.endDate === "Present"}
                                onChange={(e) => {
                                  setEditedInfo({
                                    ...editedInfo,
                                    endDate: e.target.checked ? "Present" : "",
                                  })
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="currentlyHere" className="text-sm text-gray-600">
                                Currently {selectedInfo.type === "education" ? "studying here" : "working here"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={editedInfo.image || ""}
                        onChange={handleInfoInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter image URL or leave blank for default"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter a valid image URL to see the preview update in real-time
                      </p>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={editedInfo.description || ""}
                        onChange={handleTextAreaChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditInfoModalOpen(false)}
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

      {/* Delete Info Confirmation Modal */}
      <Dialog
        open={isDeleteInfoConfirmOpen}
        onClose={() => setIsDeleteInfoConfirmOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Delete{" "}
                  {selectedInfo?.type ? selectedInfo.type.charAt(0).toUpperCase() + selectedInfo.type.slice(1) : "Info"}
                </Dialog.Title>
                <button onClick={() => setIsDeleteInfoConfirmOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedInfo && (
                <div>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedInfo.title}</span>? This
                    action cannot be undone.
                  </p>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsDeleteInfoConfirmOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDeleteInfo}
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
                      className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${
                        !declineReason.trim()
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

      {/* Create Service Modal */}
      <Dialog
        open={isCreateServiceModalOpen}
        onClose={() => setIsCreateServiceModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">Create New Service</Dialog.Title>
                <button
                  onClick={() => setIsCreateServiceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${createServiceStep >= 1 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className={`h-1 w-12 ${createServiceStep >= 2 ? "bg-sky-500" : "bg-gray-200"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${createServiceStep >= 2 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div className={`h-1 w-12 ${createServiceStep >= 3 ? "bg-sky-500" : "bg-gray-200"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${createServiceStep >= 3 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <Tool className="h-4 w-4" />
                    </div>
                    <div className={`h-1 w-12 ${createServiceStep >= 4 ? "bg-sky-500" : "bg-gray-200"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${createServiceStep >= 4 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <Clipboard className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Basic Info</span>
                  <span>Pricing</span>
                  <span>Expenses</span>
                  <span>Requirements</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2">{renderCreateServiceStepContent()}</div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => (createServiceStep > 1 ? handlePrevStep() : setIsCreateServiceModalOpen(false))}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  {createServiceStep > 1 ? (
                    <>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </>
                  ) : (
                    "Cancel"
                  )}
                </button>

                {createServiceStep < totalSteps ? (
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitNewService}
                    disabled={!allRequirementsMet}
                    className={`px-4 py-2.5 text-white rounded-lg transition-colors ${
                      !allRequirementsMet ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
                    }`}
                  >
                    Create Service
                  </button>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Subscription Plans Modal */}
      <Dialog open={isPlansModalOpen} onClose={() => setIsPlansModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">Choose a Plan</Dialog.Title>
                <button onClick={() => setIsPlansModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Select the plan that best fits your needs. Each plan includes different service limits and features.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.tier}
                    className={`border rounded-xl p-5 flex flex-col ${
                      plan.tier === subscription.tier
                        ? "border-sky-500 bg-sky-50"
                        : "border-gray-200 hover:border-sky-300 hover:shadow-md"
                    } transition-all cursor-pointer`}
                    onClick={() => handleSelectPlan(plan.tier as SubscriptionTier)}
                  >
                    <div
                      className={`text-sm font-medium px-2 py-1 rounded-full self-start mb-2 ${plan.color} ${plan.textColor}`}
                    >
                      {plan.name}
                    </div>

                    <div className="mt-2 mb-4">
                      <span className="text-2xl font-bold">₱{plan.price}</span>
                      {plan.price > 0 && <span className="text-gray-500 text-sm">/month</span>}
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="font-medium">Services:</span>
                      <span className="ml-2">
                        {plan.maxServices === Number.POSITIVE_INFINITY ? "Unlimited" : `Up to ${plan.maxServices}`}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6 flex-grow">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSelectPlan(plan.tier as SubscriptionTier)}
                      className={`w-full py-2 rounded-lg mt-auto ${
                        plan.tier === subscription.tier
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : `${plan.textColor.replace("text", "bg")} text-white hover:opacity-90`
                      }`}
                      disabled={plan.tier === subscription.tier}
                    >
                      {plan.tier === subscription.tier ? "Current Plan" : "Select Plan"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Subscription Success Modal with Celebration */}
      <Dialog open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-green-500" />
              </div>

              <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-4">Congratulations!</Dialog.Title>

              <p className="text-gray-600 mb-6">
                You've successfully upgraded to the{" "}
                <span className={`font-medium ${subscription.color}`}>{subscription.name}</span> plan! You can now add
                up to {subscription.maxServices === Number.POSITIVE_INFINITY ? "unlimited" : subscription.maxServices}{" "}
                services.
              </p>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all"
              >
                Start Using Your New Plan
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default Bookings