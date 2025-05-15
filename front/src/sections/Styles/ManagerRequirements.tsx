import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Clock,
  Building,
  Mail,
  Calendar,
  Users,
  Phone,
  MapPin,
  FileText,
  AlertTriangle,
  X,
  Shield,
  HardHat,
  Briefcase,
  Home,
  PauseCircle,
  CheckSquare,
} from "lucide-react"
import LocationSelector from "./LocationSelectorAuth"

interface Location {
  name: string
  lat: number
  lng: number
  distance: number
  price?: number
  id?: string
}

interface OperatingHours {
  day: string
  open: string
  close: string
  closed: boolean
}

interface InsuranceDocument {
  file: File | null
  preview: string | null
  expiryDate: string
  policyNumber: string
}

export default function ManagerRequirements() {
  // Form state
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1 - Business Information
  const [businessName, setBusinessName] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [foundedDate, setFoundedDate] = useState("")
  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([
    { day: "Monday", open: "09:00", close: "17:00", closed: false },
    { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
    { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
    { day: "Thursday", open: "09:00", close: "17:00", closed: false },
    { day: "Friday", open: "09:00", close: "17:00", closed: false },
    { day: "Saturday", open: "09:00", close: "17:00", closed: false },
    { day: "Sunday", open: "09:00", close: "17:00", closed: true },
  ])
  const [aboutCompany, setAboutCompany] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [companyNumber, setCompanyNumber] = useState("")

  // Step 2 - Location Information
  const [companyLocation, setCompanyLocation] = useState<Location | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [tinNumber, setTinNumber] = useState("")
  const [cityCoverage, setCityCoverage] = useState<string[]>([])
  const [newCity, setNewCity] = useState("")

  // Step 3 - Business Permits
  const [secRegistration, setSecRegistration] = useState<File | null>(null)
  const [secRegistrationPreview, setSecRegistrationPreview] = useState<string | null>(null)
  const [businessPermit, setBusinessPermit] = useState<File | null>(null)
  const [businessPermitPreview, setBusinessPermitPreview] = useState<string | null>(null)
  const [birRegistration, setBirRegistration] = useState<File | null>(null)
  const [birRegistrationPreview, setBirRegistrationPreview] = useState<string | null>(null)
  const [eccCertificate, setEccCertificate] = useState<File | null>(null)
  const [eccCertificatePreview, setEccCertificatePreview] = useState<string | null>(null)

  // Step 4 - Insurance and Liability Coverage
  const [generalLiability, setGeneralLiability] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })
  const [workersComp, setWorkersComp] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })
  const [professionalIndemnity, setProfessionalIndemnity] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })
  const [propertyDamage, setPropertyDamage] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })
  const [businessInterruption, setBusinessInterruption] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })
  const [bondingInsurance, setBondingInsurance] = useState<InsuranceDocument>({
    file: null,
    preview: null,
    expiryDate: "",
    policyNumber: "",
  })

  // Step 5 - Profile Setup
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null)

  // Refs for profile pictures
  const profilePictureRef = useRef<HTMLInputElement>(null)
  const coverPhotoRef = useRef<HTMLInputElement>(null)

  // Warning modal state
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [currentUploadType, setCurrentUploadType] = useState<string>("")
  const [uploadWarningShown, setUploadWarningShown] = useState<Record<string, boolean>>({
    sec: false,
    business: false,
    bir: false,
    ecc: false,
    generalLiability: false,
    workersComp: false,
    professionalIndemnity: false,
    propertyDamage: false,
    businessInterruption: false,
    bondingInsurance: false,
  })

  // Refs for file inputs
  const secRegistrationRef = useRef<HTMLInputElement>(null)
  const businessPermitRef = useRef<HTMLInputElement>(null)
  const birRegistrationRef = useRef<HTMLInputElement>(null)
  const eccCertificateRef = useRef<HTMLInputElement>(null)
  const generalLiabilityRef = useRef<HTMLInputElement>(null)
  const workersCompRef = useRef<HTMLInputElement>(null)
  const professionalIndemnityRef = useRef<HTMLInputElement>(null)
  const propertyDamageRef = useRef<HTMLInputElement>(null)
  const businessInterruptionRef = useRef<HTMLInputElement>(null)
  const bondingInsuranceRef = useRef<HTMLInputElement>(null)

  // Company location (for location selector)
  const defaultCompanyLocation = {
    lat: 40.7128,
    lng: -74.006,
    name: "HandyGo Headquarters",
  }

  // Animation keyframes
  const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

  // Prevent scrolling when modal is open and handle modal visibility
  useEffect(() => {
    // Add keyframes to document
    const styleElement = document.createElement("style")
    styleElement.innerHTML = keyframes
    document.head.appendChild(styleElement)

    // Handle body scroll
    if (showWarningModal || showLocationModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Hide location modal when warning modal is shown
    if (showWarningModal && showLocationModal) {
      setShowLocationModal(false)
    }

    return () => {
      document.body.style.overflow = "auto"
      styleElement.remove()
    }
  }, [showWarningModal, showLocationModal, keyframes])

  // Handle file selection and preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setter(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        previewSetter(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle insurance file change
  const handleInsuranceFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _insuranceType: keyof typeof uploadWarningShown,
    setter: React.Dispatch<React.SetStateAction<InsuranceDocument>>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setter((prev) => ({
          ...prev,
          file: file,
          preview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle insurance field change
  const handleInsuranceFieldChange = (
    field: "expiryDate" | "policyNumber",
    value: string,
    setter: React.Dispatch<React.SetStateAction<InsuranceDocument>>,
  ) => {
    setter((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle operating hours change
  const handleOperatingHoursChange = (index: number, field: keyof OperatingHours, value: string | boolean) => {
    const updatedHours = [...operatingHours]
    updatedHours[index] = { ...updatedHours[index], [field]: value }
    setOperatingHours(updatedHours)
  }

  // Handle city coverage
  const handleAddCity = () => {
    if (newCity.trim() !== "" && !cityCoverage.includes(newCity.trim())) {
      setCityCoverage([...cityCoverage, newCity.trim()])
      setNewCity("")
    }
  }

  const handleRemoveCity = (city: string) => {
    setCityCoverage(cityCoverage.filter((c) => c !== city))
  }

  // Handle file upload with warning
  const handleUploadClick = (type: string) => {
    // Only show warning if it hasn't been shown before for this type
    if (!uploadWarningShown[type]) {
      setCurrentUploadType(type)
      setShowWarningModal(true)
    } else {
      // If warning was already shown, directly trigger the file input
      triggerFileInput(type)
    }
  }

  const triggerFileInput = (type: string) => {
    switch (type) {
      case "sec":
        secRegistrationRef.current?.click()
        break
      case "business":
        businessPermitRef.current?.click()
        break
      case "bir":
        birRegistrationRef.current?.click()
        break
      case "ecc":
        eccCertificateRef.current?.click()
        break
      case "generalLiability":
        generalLiabilityRef.current?.click()
        break
      case "workersComp":
        workersCompRef.current?.click()
        break
      case "professionalIndemnity":
        professionalIndemnityRef.current?.click()
        break
      case "propertyDamage":
        propertyDamageRef.current?.click()
        break
      case "businessInterruption":
        businessInterruptionRef.current?.click()
        break
      case "bondingInsurance":
        bondingInsuranceRef.current?.click()
        break
    }
  }

  const handleConfirmUpload = () => {
    // Mark this upload type as having shown the warning
    setUploadWarningShown({
      ...uploadWarningShown,
      [currentUploadType]: true,
    })

    // Hide the warning modal
    setShowWarningModal(false)

    // Trigger the file input after a short delay to allow the modal to close
    setTimeout(() => {
      triggerFileInput(currentUploadType)
    }, 300)
  }

  // Validation for each step
  const isStep1Valid = () => {
    return (
      businessName.trim() !== "" &&
      businessEmail.trim() !== "" &&
      foundedDate.trim() !== "" &&
      aboutCompany.trim() !== "" &&
      teamSize.trim() !== "" &&
      companyNumber.trim() !== ""
    )
  }

  const isStep2Valid = () => {
    return companyLocation !== null && tinNumber.trim() !== "" && cityCoverage.length > 0
  }

  const isStep3Valid = () => {
    return (
      secRegistration !== null && businessPermit !== null && birRegistration !== null
      // ECC is optional
    )
  }

  const isStep4Valid = () => {
    // Require at least general liability and workers comp
    return (
      generalLiability.file !== null &&
      generalLiability.expiryDate !== "" &&
      generalLiability.policyNumber !== "" &&
      workersComp.file !== null &&
      workersComp.expiryDate !== "" &&
      workersComp.policyNumber !== ""
    )
  }

  const isStep5Valid = () => {
    // Require at least profile picture
    return profilePicture !== null
  }

  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3)
    } else if (currentStep === 3 && isStep3Valid()) {
      setCurrentStep(4)
    } else if (currentStep === 4 && isStep4Valid()) {
      setCurrentStep(5)
    } else if (currentStep === 5 && isStep5Valid()) {
      setCurrentStep(6)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit form data
    console.log("Form submitted")
  }

  return (
    <div className="py-4 px-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-1">HandyGo</h1>
          <h2 className="text-3xl font-bold text-sky-400">Business Registration</h2>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-1">Business Info</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-1">Location</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-1">Permits</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 4 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                4
              </div>
              <span className="text-sm mt-1">Insurance</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 5 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 5 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                5
              </div>
              <span className="text-sm mt-1">Profile</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 6 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 6 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                6
              </div>
              <span className="text-sm mt-1">Review</span>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Business Information</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Basic business info */}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-1 text-gray-500" />
                            Business Name
                          </span>
                        </label>
                        <input
                          id="business-name"
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Enter your business name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="business-email" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <Mail className="h-4 w-4 mr-1 text-gray-500" />
                            Business Email
                          </span>
                        </label>
                        <input
                          id="business-email"
                          type="email"
                          value={businessEmail}
                          onChange={(e) => setBusinessEmail(e.target.value)}
                          placeholder="business@example.com"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="founded-date" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            Founded Date
                          </span>
                        </label>
                        <input
                          id="founded-date"
                          type="date"
                          value={foundedDate}
                          onChange={(e) => setFoundedDate(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            Operating Hours
                          </span>
                        </label>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                          {operatingHours.map((hours, index) => (
                            <div key={hours.day} className="flex items-center space-x-2">
                              <div className="w-24 text-sm">{hours.day}</div>
                              <div className="flex-1 flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`closed-${hours.day}`}
                                  checked={hours.closed}
                                  onChange={(e) => handleOperatingHoursChange(index, "closed", e.target.checked)}
                                  className="mr-1"
                                />
                                <label htmlFor={`closed-${hours.day}`} className="text-sm">
                                  Closed
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={hours.open}
                                  onChange={(e) => handleOperatingHoursChange(index, "open", e.target.value)}
                                  disabled={hours.closed}
                                  className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                  type="time"
                                  value={hours.close}
                                  onChange={(e) => handleOperatingHoursChange(index, "close", e.target.value)}
                                  disabled={hours.closed}
                                  className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Company details */}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="about-company" className="block text-sm font-medium text-gray-700 mb-1">
                          About the Company
                        </label>
                        <textarea
                          id="about-company"
                          value={aboutCompany}
                          onChange={(e) => setAboutCompany(e.target.value)}
                          placeholder="Tell us about your company, services, and mission..."
                          rows={5}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="team-size" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            Team Size
                          </span>
                        </label>
                        <select
                          id="team-size"
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                          <option value="">Select team size</option>
                          <option value="1-5">1-5 employees</option>
                          <option value="6-10">6-10 employees</option>
                          <option value="11-25">11-25 employees</option>
                          <option value="26-50">26-50 employees</option>
                          <option value="51-100">51-100 employees</option>
                          <option value="101-500">101-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="company-number" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            Company Contact Number
                          </span>
                        </label>
                        <input
                          id="company-number"
                          type="tel"
                          value={companyNumber}
                          onChange={(e) => setCompanyNumber(e.target.value)}
                          placeholder="Enter company contact number"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location Information */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Location Information</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Location selection */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                            Company Location
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowLocationModal(true)}
                          className="w-full mb-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                        >
                          Select Company Location
                        </button>

                        {companyLocation ? (
                          <div className="p-4 bg-white border rounded-lg">
                            <h4 className="font-medium mb-2">Selected Location</h4>
                            <div className="space-y-2">
                              <p className="font-medium">{companyLocation.name}</p>
                              <p className="text-sm text-gray-600">
                                Lat: {companyLocation.lat.toFixed(6)}, Lng: {companyLocation.lng.toFixed(6)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">
                              Please select your company's primary location. This will be displayed on your business
                              profile.
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="tin-number" className="block text-sm font-medium text-gray-700 mb-1">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-gray-500" />
                            TIN Number
                          </span>
                        </label>
                        <input
                          id="tin-number"
                          type="text"
                          value={tinNumber}
                          onChange={(e) => setTinNumber(e.target.value)}
                          placeholder="Enter your TIN number"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Format: XXX-XXX-XXX-XXX</p>
                      </div>
                    </div>

                    {/* Right side - City coverage */}
                    <div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City Coverage Area</label>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            placeholder="Add city or municipality"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddCity}
                            className="px-4 py-2 bg-sky-500 text-white rounded-r-md hover:bg-sky-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-2">
                            Add cities or municipalities where your business provides services.
                          </p>

                          {cityCoverage.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {cityCoverage.map((city) => (
                                <div
                                  key={city}
                                  className="flex items-center bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {city}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCity(city)}
                                    className="ml-2 text-sky-600 hover:text-sky-800"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                              <p className="text-gray-400">No cities added yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Business Permits */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Business Permits & Registrations</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - SEC and Business Permit */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SEC Registration</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            secRegistration ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("sec")}
                        >
                          {secRegistrationPreview ? (
                            <div className="relative w-full h-40">
                              <img
                                src={secRegistrationPreview || "/placeholder.svg"}
                                alt="SEC Registration Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload SEC Registration</p>
                              <p className="text-xs text-gray-400 mt-1">For corporations and partnerships</p>
                            </>
                          )}
                          <input
                            id="sec-registration"
                            type="file"
                            ref={secRegistrationRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileChange(e, setSecRegistration, setSecRegistrationPreview)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mayor's Permit / Business Permit
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            businessPermit ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("business")}
                        >
                          {businessPermitPreview ? (
                            <div className="relative w-full h-40">
                              <img
                                src={businessPermitPreview || "/placeholder.svg"}
                                alt="Business Permit Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Business Permit</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Authorization to operate legally within a city
                              </p>
                            </>
                          )}
                          <input
                            id="business-permit"
                            type="file"
                            ref={businessPermitRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileChange(e, setBusinessPermit, setBusinessPermitPreview)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right side - BIR and ECC */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">BIR Registration</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            birRegistration ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("bir")}
                        >
                          {birRegistrationPreview ? (
                            <div className="relative w-full h-40">
                              <img
                                src={birRegistrationPreview || "/placeholder.svg"}
                                alt="BIR Registration Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload BIR Registration</p>
                              <p className="text-xs text-gray-400 mt-1">To acquire a TIN and issue official receipts</p>
                            </>
                          )}
                          <input
                            id="bir-registration"
                            type="file"
                            ref={birRegistrationRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileChange(e, setBirRegistration, setBirRegistrationPreview)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Environmental Compliance Certificate (ECC)
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            eccCertificate ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("ecc")}
                        >
                          {eccCertificatePreview ? (
                            <div className="relative w-full h-40">
                              <img
                                src={eccCertificatePreview || "/placeholder.svg"}
                                alt="ECC Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload ECC (Optional)</p>
                              <p className="text-xs text-gray-400 mt-1">For services that may affect the environment</p>
                            </>
                          )}
                          <input
                            id="ecc-certificate"
                            type="file"
                            ref={eccCertificateRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileChange(e, setEccCertificate, setEccCertificatePreview)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-blue-800">Important Information</h5>
                        <p className="mt-1 text-sm text-blue-700">
                          All permits must be valid and current. Expired permits will not be accepted. The information
                          provided will be verified before your business account is approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Insurance and Liability Coverage */}
              {currentStep === 4 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Insurance and Liability Coverage</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Primary Insurance */}
                    <div className="space-y-6">
                      {/* General Liability Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">General Liability Insurance</label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Protects against accidents and damages during service
                        </p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            generalLiability.file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("generalLiability")}
                        >
                          {generalLiability.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={generalLiability.preview || "/placeholder.svg"}
                                alt="General Liability Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate</p>
                            </>
                          )}
                          <input
                            id="general-liability"
                            type="file"
                            ref={generalLiabilityRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleInsuranceFileChange(e, "generalLiability", setGeneralLiability)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="gl-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="gl-policy"
                              type="text"
                              value={generalLiability.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setGeneralLiability)
                              }
                              placeholder="e.g., GL-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="gl-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="gl-expiry"
                              type="date"
                              value={generalLiability.expiryDate}
                              onChange={(e) =>
                                handleInsuranceFieldChange("expiryDate", e.target.value, setGeneralLiability)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Worker's Compensation Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <HardHat className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">
                            Worker's Compensation Insurance
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Covers employees in case of injury while on duty</p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            workersComp.file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("workersComp")}
                        >
                          {workersComp.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={workersComp.preview || "/placeholder.svg"}
                                alt="Worker's Compensation Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate</p>
                            </>
                          )}
                          <input
                            id="workers-comp"
                            type="file"
                            ref={workersCompRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleInsuranceFileChange(e, "workersComp", setWorkersComp)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="wc-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="wc-policy"
                              type="text"
                              value={workersComp.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setWorkersComp)
                              }
                              placeholder="e.g., WC-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="wc-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="wc-expiry"
                              type="date"
                              value={workersComp.expiryDate}
                              onChange={(e) => handleInsuranceFieldChange("expiryDate", e.target.value, setWorkersComp)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Professional Indemnity Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <Briefcase className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">
                            Professional Indemnity Insurance
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          For consultants and skilled professionals against negligence claims
                        </p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            professionalIndemnity.file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("professionalIndemnity")}
                        >
                          {professionalIndemnity.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={professionalIndemnity.preview || "/placeholder.svg"}
                                alt="Professional Indemnity Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate (Optional)</p>
                            </>
                          )}
                          <input
                            id="professional-indemnity"
                            type="file"
                            ref={professionalIndemnityRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) =>
                              handleInsuranceFileChange(e, "professionalIndemnity", setProfessionalIndemnity)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="pi-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="pi-policy"
                              type="text"
                              value={professionalIndemnity.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setProfessionalIndemnity)
                              }
                              placeholder="e.g., PI-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="pi-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="pi-expiry"
                              type="date"
                              value={professionalIndemnity.expiryDate}
                              onChange={(e) =>
                                handleInsuranceFieldChange("expiryDate", e.target.value, setProfessionalIndemnity)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Additional Insurance */}
                    <div className="space-y-6">
                      {/* Property Damage Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <Home className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">Property Damage Insurance</label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Protects against damage to the customer's property during service
                        </p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            propertyDamage.file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("propertyDamage")}
                        >
                          {propertyDamage.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={propertyDamage.preview || "/placeholder.svg"}
                                alt="Property Damage Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate (Optional)</p>
                            </>
                          )}
                          <input
                            id="property-damage"
                            type="file"
                            ref={propertyDamageRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleInsuranceFileChange(e, "propertyDamage", setPropertyDamage)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="pd-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="pd-policy"
                              type="text"
                              value={propertyDamage.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setPropertyDamage)
                              }
                              placeholder="e.g., PD-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="pd-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="pd-expiry"
                              type="date"
                              value={propertyDamage.expiryDate}
                              onChange={(e) =>
                                handleInsuranceFieldChange("expiryDate", e.target.value, setPropertyDamage)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Business Interruption Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <PauseCircle className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">
                            Business Interruption Insurance
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Covers loss of income if the business is disrupted due to accidents or natural disasters
                        </p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            businessInterruption.file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("businessInterruption")}
                        >
                          {businessInterruption.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={businessInterruption.preview || "/placeholder.svg"}
                                alt="Business Interruption Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate (Optional)</p>
                            </>
                          )}
                          <input
                            id="business-interruption"
                            type="file"
                            ref={businessInterruptionRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) =>
                              handleInsuranceFileChange(e, "businessInterruption", setBusinessInterruption)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="bi-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="bi-policy"
                              type="text"
                              value={businessInterruption.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setBusinessInterruption)
                              }
                              placeholder="e.g., BI-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="bi-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="bi-expiry"
                              type="date"
                              value={businessInterruption.expiryDate}
                              onChange={(e) =>
                                handleInsuranceFieldChange("expiryDate", e.target.value, setBusinessInterruption)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bonding Insurance */}
                      <div>
                        <div className="flex items-center mb-2">
                          <CheckSquare className="h-4 w-4 mr-1 text-sky-500" />
                          <label className="block text-sm font-medium text-gray-700">Bonding Insurance</label>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Protects customers if the service provider fails to complete the job or meet agreed-upon
                          standards
                        </p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                            bondingInsurance.file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleUploadClick("bondingInsurance")}
                        >
                          {bondingInsurance.preview ? (
                            <div className="relative w-full h-32">
                              <img
                                src={bondingInsurance.preview || "/placeholder.svg"}
                                alt="Bonding Insurance Preview"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload Insurance Certificate (Optional)</p>
                            </>
                          )}
                          <input
                            id="bonding-insurance"
                            type="file"
                            ref={bondingInsuranceRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleInsuranceFileChange(e, "bondingInsurance", setBondingInsurance)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="bond-policy" className="block text-xs text-gray-500 mb-1">
                              Policy Number
                            </label>
                            <input
                              id="bond-policy"
                              type="text"
                              value={bondingInsurance.policyNumber}
                              onChange={(e) =>
                                handleInsuranceFieldChange("policyNumber", e.target.value, setBondingInsurance)
                              }
                              placeholder="e.g., BO-12345678"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label htmlFor="bond-expiry" className="block text-xs text-gray-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="bond-expiry"
                              type="date"
                              value={bondingInsurance.expiryDate}
                              onChange={(e) =>
                                handleInsuranceFieldChange("expiryDate", e.target.value, setBondingInsurance)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-blue-800">Insurance Requirements</h5>
                        <p className="mt-1 text-sm text-blue-700">
                          General Liability and Worker's Compensation insurance are required for all service providers.
                          Other insurance types are recommended but optional. All insurance documents must be valid and
                          current.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Profile Setup */}
              {currentStep === 5 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Business Profile Setup</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Cover Photo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Cover Photo</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-40 ${
                            coverPhoto ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => coverPhotoRef.current?.click()}
                        >
                          {coverPhotoPreview ? (
                            <div className="relative w-full h-full">
                              <img
                                src={coverPhotoPreview || "/placeholder.svg"}
                                alt="Cover Photo Preview"
                                className="object-cover rounded-md w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload a cover photo for your business</p>
                              <p className="text-xs text-gray-400 mt-1">JPG or PNG up to 5MB</p>
                            </>
                          )}
                          <input
                            id="cover-photo"
                            type="file"
                            ref={coverPhotoRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setCoverPhoto, setCoverPhotoPreview)}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          This will appear at the top of your business profile page
                        </p>
                      </div>

                      {/* Profile Picture */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            profilePicture ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => profilePictureRef.current?.click()}
                        >
                          {profilePicturePreview ? (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                              <img
                                src={profilePicturePreview || "/placeholder.svg"}
                                alt="Profile Picture Preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload your company logo</p>
                              <p className="text-xs text-gray-400 mt-1">JPG or PNG up to 5MB</p>
                            </>
                          )}
                          <input
                            id="profile-picture"
                            type="file"
                            ref={profilePictureRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setProfilePicture, setProfilePicturePreview)}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          This will be your business's main identifying image
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-md font-medium mb-4">Profile Preview</h4>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="h-32 bg-gray-200 relative">
                            {coverPhotoPreview && (
                              <img
                                src={coverPhotoPreview || "/placeholder.svg"}
                                alt="Cover"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="relative px-4 pb-4">
                            <div className="absolute -top-12 left-4">
                              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                                {profilePicturePreview ? (
                                  <img
                                    src={profilePicturePreview || "/placeholder.svg"}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <Building className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="pt-14 pb-2">
                              <h3 className="font-bold text-lg">{businessName || "Your Business Name"}</h3>
                              {companyLocation && (
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {companyLocation.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <AlertTriangle className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-3">
                            <h5 className="text-sm font-medium text-blue-800">Profile Image Guidelines</h5>
                            <p className="mt-1 text-sm text-blue-700">
                              Your company logo should be clear and professional. The cover photo should represent your
                              business services or values. Both images will be visible to potential customers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Review Your Business Registration</h3>

                  {/* Business Profile Header */}
                  <div className="bg-white rounded-xl overflow-hidden mb-6 border">
                    {/* Cover Photo */}
                    <div className="relative h-48 overflow-hidden">
                      {coverPhotoPreview ? (
                        <img
                          src={coverPhotoPreview || "/placeholder.svg"}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-sky-400 to-blue-500"></div>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="relative px-6 pb-6">
                      <div className="absolute -top-16 left-6">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                            {profilePicturePreview ? (
                              <img
                                src={profilePicturePreview || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Building className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-20">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h1 className="text-2xl font-bold text-gray-900">{businessName}</h1>
                              <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-xs font-medium rounded-full">
                                Service Provider
                              </span>
                            </div>
                            {companyLocation && (
                              <div className="flex items-center gap-2 mt-1 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{companyLocation.name}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {aboutCompany && <p className="text-gray-600 max-w-2xl mb-6">{aboutCompany}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex -mb-px overflow-x-auto">
                      <button className="py-4 px-6 font-medium text-sm border-b-2 border-sky-500 text-sky-500 flex items-center gap-2 whitespace-nowrap">
                        <Building className="h-4 w-4" />
                        Business Info
                      </button>
                    </nav>
                  </div>

                  {/* Business Information Section */}
                  <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Business Name</h5>
                          <p className="text-gray-900">{businessName}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Business Email</h5>
                          <p className="text-gray-900">{businessEmail}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Founded Date</h5>
                          <p className="text-gray-900">{foundedDate}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Contact Number</h5>
                          <p className="text-gray-900">{companyNumber}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Team Size</h5>
                          <p className="text-gray-900">{teamSize}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">TIN Number</h5>
                          <p className="text-gray-900">{tinNumber}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-500 mb-1">About the Company</h5>
                        <p className="text-gray-900">{aboutCompany}</p>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">Operating Hours</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {operatingHours.map((hours) => (
                          <div key={hours.day} className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">{hours.day}</span>
                            <span>
                              {hours.closed ? (
                                <span className="text-red-500">Closed</span>
                              ) : (
                                `${hours.open} - ${hours.close}`
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">Location Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {companyLocation && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Company Location</h5>
                            <p className="text-gray-900">{companyLocation.name}</p>
                            <p className="text-sm text-gray-500">
                              Lat: {companyLocation.lat.toFixed(6)}, Lng: {companyLocation.lng.toFixed(6)}
                            </p>
                          </div>
                        )}
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Service Coverage Areas</h5>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {cityCoverage.map((city) => (
                              <span
                                key={city}
                                className="inline-block bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Permits and Documents */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">Permits and Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">SEC Registration</h5>
                          {secRegistrationPreview ? (
                            <div className="mt-2 border rounded p-2 flex items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">SEC Document</p>
                                <p className="text-xs text-gray-500">Uploaded</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Not uploaded</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Business Permit</h5>
                          {businessPermitPreview ? (
                            <div className="mt-2 border rounded p-2 flex items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Business Permit</p>
                                <p className="text-xs text-gray-500">Uploaded</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Not uploaded</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">BIR Registration</h5>
                          {birRegistrationPreview ? (
                            <div className="mt-2 border rounded p-2 flex items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">BIR Document</p>
                                <p className="text-xs text-gray-500">Uploaded</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Not uploaded</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">ECC Certificate</h5>
                          {eccCertificatePreview ? (
                            <div className="mt-2 border rounded p-2 flex items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">ECC Document</p>
                                <p className="text-xs text-gray-500">Uploaded</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">Optional (Not uploaded)</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Insurance Information */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">Insurance Coverage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">General Liability Insurance</h5>
                          {generalLiability.file ? (
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <Shield className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{generalLiability.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {generalLiability.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Not uploaded</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-1">Worker's Compensation</h5>
                          {workersComp.file ? (
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <HardHat className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{workersComp.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {workersComp.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-red-500 text-sm">Not uploaded</p>
                          )}
                        </div>
                        {/* Only show other insurance if they've been uploaded */}
                        {professionalIndemnity.file && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Professional Indemnity</h5>
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <Briefcase className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{professionalIndemnity.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {professionalIndemnity.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {propertyDamage.file && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Property Damage</h5>
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <Home className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{propertyDamage.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {propertyDamage.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {businessInterruption.file && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Business Interruption</h5>
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <PauseCircle className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{businessInterruption.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {businessInterruption.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {bondingInsurance.file && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-1">Bonding Insurance</h5>
                            <div className="mt-2 border rounded p-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                                  <CheckSquare className="h-6 w-6 text-sky-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Policy #{bondingInsurance.policyNumber}</p>
                                  <p className="text-xs text-gray-500">Expires: {bondingInsurance.expiryDate}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-green-800">Ready to Submit</h5>
                        <p className="mt-1 text-sm text-green-700">
                          Please review all your information carefully before submitting. Once submitted, your
                          application will be reviewed by our team. You will be notified once your business account is
                          approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  className={`px-4 py-2 flex items-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </button>

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={
                      (currentStep === 1 && !isStep1Valid()) ||
                      (currentStep === 2 && !isStep2Valid()) ||
                      (currentStep === 3 && !isStep3Valid()) ||
                      (currentStep === 4 && !isStep4Valid()) ||
                      (currentStep === 5 && !isStep5Valid())
                    }
                    className={`px-4 py-2 flex items-center bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors ${
                      (currentStep === 1 && !isStep1Valid()) ||
                      (currentStep === 2 && !isStep2Valid()) ||
                      (currentStep === 3 && !isStep3Valid()) ||
                      (currentStep === 4 && !isStep4Valid()) ||
                      (currentStep === 5 && !isStep5Valid())
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                  >
                    Submit Registration
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/20"
            style={{ animation: "slideInUp 0.4s ease-out" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold">Confidential Information</h3>
              </div>
              <button onClick={() => setShowWarningModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                The document you are about to upload contains sensitive business information. We want to assure you
                that:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Your documents are stored securely with enterprise-grade encryption</li>
                <li>Access is strictly limited to verification personnel only</li>
                <li>Documents will only be used for business verification purposes</li>
                <li>We comply with all data protection regulations</li>
              </ul>

              <p className="mt-4 text-gray-600">
                We value your trust and are committed to protecting your confidential information.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
              >
                Proceed with Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      {showLocationModal && !showWarningModal && (
        <LocationSelector
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={(location) => {
            setCompanyLocation(location)
            setShowLocationModal(false)
          }}
          companyLocation={defaultCompanyLocation}
          previousLocation={companyLocation}
        />
      )}
    </div>
  )
}