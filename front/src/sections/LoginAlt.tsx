"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, X, Upload, FileText, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"

const slideshowImages = [
  {
    src: "https://cdn.pixabay.com/photo/2018/02/23/08/03/expression-3174967_1280.jpg",
    alt: "Fashion model with shopping bags",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/07/23/14/44/builder-2531572_1280.jpg",
    alt: "Urban fashion collection",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/09/14/12/19/building-2748841_960_720.jpg",
    alt: "Streetwear showcase",
  },
]

const documentCategories = [
  {
    id: "business-registration",
    title: "Business Registration & Legal Compliance",
    documents: [
      "DTI (Department of Trade and Industry) – For sole proprietors",
      "SEC (Securities and Exchange Commission) – For partnerships and corporations",
      "Barangay Business Clearance",
      "Mayor's Permit / Business Permit",
      "BIR Registration (Form 2303) – For tax compliance",
    ],
  },
  {
    id: "legal-agreements",
    title: "Legal Agreements & Policies",
    documents: [
      "Service Agreement Contracts – Defines terms of service with customers",
      "Terms and Conditions – Customer rights and obligations",
      "Privacy Policy – Compliance with Data Privacy Act (DPA)",
    ],
  },
  {
    id: "insurance",
    title: "Insurance & Liability Coverage",
    documents: [
      "General Liability Insurance – To cover damages during service",
      "Workers' Compensation Insurance – If you hire employees",
      "Property Damage Insurance – If your service involves customer properties",
    ],
  },
  {
    id: "operational",
    title: "Operational & Workforce Compliance",
    documents: [],
  },
  {
    id: "employee-documents",
    title: "Employee/Contractor Documents",
    documents: [
      "Employment Contracts (For in-house workers)",
      "Independent Contractor Agreements (For freelance service providers)",
      "Background Check & Police Clearance – Required for service workers",
      "Skills Certification – If services involve technical skills",
    ],
  },
  {
    id: "service-guidelines",
    title: "Service Guidelines & SOPs",
    documents: [
      "Standard Operating Procedures (SOPs) – Service quality and safety standards",
      "Code of Conduct – Professional behavior guidelines for employees",
      "Complaint & Dispute Resolution Policy – Handling customer issues",
    ],
  },
  {
    id: "health-safety",
    title: "Health & Safety Compliance",
    documents: [
      "Health Certificates (for personal services like massage, cleaning, etc.)",
      "COVID-19 or Other Health Protocols Compliance (if applicable)",
    ],
  },
  {
    id: "financial",
    title: "Financial & Tax Compliance",
    documents: [
      "Bank Account & Financial Records – Business account for transactions",
      "Official Receipts (OR) and Invoices – For customer payments (BIR-registered)",
      "Tax Compliance Documents",
      "Quarterly and annual tax returns",
      "BIR Form 2551Q (Percentage Tax) or VAT Registration (Form 2550M/2550Q)",
      "Pricing & Service Fee Structure – Transparent pricing for customers",
    ],
  },
  {
    id: "digital",
    title: "Digital & Online Platform Compliance",
    documents: [
      "Website / App Terms of Use – Legal protection for online services",
      "User Privacy Policy – Compliance with GDPR / DPA",
      "E-Payment Compliance – If accepting online payments",
      "Cybersecurity Policy – Protect customer and transaction data",
    ],
  },
]

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState("customer")

  const [validId, setValidId] = useState<File | null>(null)
  const [salaryCertificate, setSalaryCertificate] = useState<File | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: string]: File[] }>({})
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const validIdRef = useRef<HTMLInputElement>(null)
  const salaryCertificateRef = useRef<HTMLInputElement>(null)
  const documentUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById("register-modal")
      if (modal && !modal.contains(e.target as Node) && showModal) {
        setShowModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showModal])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showModal])

  useEffect(() => {
    setValidId(null)
    setSalaryCertificate(null)
    setUploadedDocuments({})
    setActiveCategoryIndex(0)
  }, [accountType])

  useEffect(() => {
    if (accountType === "ceo") {
      const initialDocuments: { [key: string]: File[] } = {}
      documentCategories.forEach((category) => {
        initialDocuments[category.id] = []
      })
      setUploadedDocuments(initialDocuments)
    }
  }, [accountType])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.multiple) {
        const filesArray = Array.from(e.target.files)
        setter(filesArray)
      } else {
        setter(e.target.files[0])
      }
    }
  }

  const handleCeoDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const currentCategory = documentCategories[activeCategoryIndex].id
      const filesArray = Array.from(e.target.files)

      setUploadedDocuments((prev) => ({
        ...prev,
        [currentCategory]: [...(prev[currentCategory] || []), ...filesArray],
      }))
    }
  }

  const handleRemoveCeoDocument = (categoryId: string, index: number) => {
    setUploadedDocuments((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((_, i) => i !== index),
    }))
  }

  const navigateCategory = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveCategoryIndex((prev) => (prev < documentCategories.length - 1 ? prev + 1 : prev))
    } else {
      setActiveCategoryIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }

  const hasRequiredCeoDocuments = () => {
    return Object.values(uploadedDocuments).every((docs) => docs.length > 0)
  }

  const isFormValid = () => {
    if (!registerEmail || !registerPassword || !confirmPassword || registerPassword !== confirmPassword) {
      return false
    }

    if (accountType === "customer") {
      return validId && salaryCertificate
    } else {
      return Object.values(uploadedDocuments).some((docs) => docs.length > 0)
    }
  }

  const getTotalDocumentCount = () => {
    return Object.values(uploadedDocuments).reduce((total, docs) => total + docs.length, 0)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with image and description */}
      <div className="relative w-full md:w-1/2 overflow-hidden justify-center items-center p-8">
        <div className="relative h-full">
          {/* Slideshow */}
          <div className="relative h-full w-full rounded-full">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Slideshow indicators */}
          <div className="absolute top-5 left-0 right-0 flex justify-center gap-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-2 rounded-full transition-all ${
                  activeSlide === index ? "bg-white w-7" : "bg-white/50"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center max-w-md mx-auto">
        <div className="mb-10">
          <h1 className="text-lg font-medium mb-1">HandyGo</h1>
          <h2 className="text-3xl font-bold text-sky-400">Welcome Back!</h2>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-xs text-gray-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className={`w-full bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-full h-12 font-medium transition-colors
              ${!email || !password ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
            disabled={!email || !password}
          >
            Sign in
          </button>

          <div className="relative flex items-center justify-center text-xs text-gray-500 my-4 mt-[-15px]">
            <span className="bg-white px-2 mt-10">or sign in with</span>
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6789C14.0454 13.6063 12.1909 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C11.2843 5 12.4565 5.48078 13.3569 6.28118L15.8211 3.81705C14.2709 2.32555 12.2539 1.42857 10 1.42857C5.25329 1.42857 1.42857 5.25329 1.42857 10C1.42857 14.7467 5.25329 18.5714 10 18.5714C14.7467 18.5714 18.5714 14.7467 18.5714 10C18.5714 9.43363 18.5214 8.88263 18.4257 8.34933L18.1711 8.36788Z"
                  fill="#FFC107"
                />
                <path
                  d="M2.62891 6.12416L5.5049 8.23416C6.25462 6.38155 7.9907 5 10.0003 5C11.2846 5 12.4568 5.48078 13.3572 6.28118L15.8214 3.81705C14.2712 2.32555 12.2542 1.42857 10.0003 1.42857C6.75891 1.42857 3.95498 3.39048 2.62891 6.12416Z"
                  fill="#FF3D00"
                />
                <path
                  d="M9.99968 18.5714C12.2018 18.5714 14.1761 17.7053 15.7129 16.2643L12.9975 13.9857C12.1368 14.6394 10.9979 15 9.99968 15C7.81968 15 5.97168 13.6161 5.33168 11.6875L2.49268 13.8946C3.80332 16.6768 6.64368 18.5714 9.99968 18.5714Z"
                  fill="#4CAF50"
                />
                <path
                  d="M18.1711 8.36795H17.5V8.33337H10V11.6667H14.6789C14.3746 12.5902 13.8055 13.3973 13.0578 13.9867L13.0589 13.986L15.7743 16.2646C15.6057 16.4196 18.5714 14.1667 18.5714 10.0001C18.5714 9.4337 18.5214 8.8827 18.4257 8.3494L18.1711 8.36795Z"
                  fill="#1976D2"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0756 10.5C14.0654 9.25225 14.6607 8.10938 15.6725 7.4165C15.0908 6.54163 14.1432 5.97488 13.1166 5.9165C12.0287 5.80925 10.8854 6.56188 10.3332 6.56188C9.74844 6.56188 8.7666 5.94275 7.91094 5.94275C6.42969 5.96675 4.82656 7.07613 4.82656 9.34275C4.82656 10.0166 4.94219 10.7155 5.17344 11.4395C5.49531 12.4155 6.74219 15.2249 8.04219 15.1916C8.84844 15.1749 9.39844 14.6124 10.4332 14.6124C11.4322 14.6124 11.9412 15.1916 12.8412 15.1916C14.1578 15.1749 15.2791 12.6082 15.5834 11.6291C13.8537 10.8207 14.0756 10.5498 14.0756 10.5Z"
                  fill="black"
                />
                <path
                  d="M12.3084 4.6875C12.8209 4.06838 13.1178 3.25325 13.0459 2.5C12.2709 2.5835 11.5584 2.9585 11.0334 3.56675C10.5459 4.12263 10.2178 4.9585 10.3053 5.6875C11.1428 5.7335 11.7959 5.30663 12.3084 4.6875Z"
                  fill="black"
                />
              </svg>
              Apple ID
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have account?{" "}
            <button onClick={() => setShowModal(true)} className="font-medium text-black hover:underline">
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            id="register-modal"
            className="bg-white rounded-xl w-full max-w-lg p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </button>

            <div className="mb-6">
              <h1 className="text-lg font-medium mb-1">HandyGo</h1>
              <h2 className="text-3xl font-bold text-sky-400">Create Account</h2>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="register-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="example@mail.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Account type selection */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Account Type</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setAccountType("customer")}
                    className={`flex items-center justify-center gap-2 rounded-lg border ${
                      accountType === "customer"
                        ? "border-sky-400 bg-sky-50 text-sky-600"
                        : "border-gray-300 text-gray-500"
                    } py-3 font-medium transition-colors`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("ceo")}
                    className={`flex items-center justify-center gap-2 rounded-lg border ${
                      accountType === "ceo" ? "border-sky-400 bg-sky-50 text-sky-600" : "border-gray-300 text-gray-500"
                    } py-3 font-medium transition-colors`}
                  >
                    CEO
                  </button>
                </div>
              </div>

              {/* Conditional document upload fields */}
              {accountType === "customer" ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Valid ID</label>
                    <div
                      className={`border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        validId ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => validIdRef.current?.click()}
                    >
                      {validId ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 size={20} />
                          <span className="font-medium">{validId.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Upload a valid ID document</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF up to 5MB</p>
                        </>
                      )}
                      <input
                        type="file"
                        ref={validIdRef}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, setValidId)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Proof of Salary</label>
                    <div
                      className={`border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        salaryCertificate ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => salaryCertificateRef.current?.click()}
                    >
                      {salaryCertificate ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 size={20} />
                          <span className="font-medium">{salaryCertificate.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Upload proof of salary</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF up to 5MB</p>
                        </>
                      )}
                      <input
                        type="file"
                        ref={salaryCertificateRef}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, setSalaryCertificate)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Warning memo for CEO */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-amber-800">Important Notice</h3>
                        <p className="text-xs text-amber-700 mt-1">
                          You must comply with all required document submissions. Failure to provide any of the required
                          documents will result in automatic rejection of your application.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Document upload progress */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Document Submission</span>
                      <span className="text-xs text-gray-500">{getTotalDocumentCount()} uploaded</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-400 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (getTotalDocumentCount() / 9) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Paginated document categories */}
                  <div className="border rounded-lg overflow-hidden">
                    {/* Category navigation */}
                    <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b">
                      <button
                        type="button"
                        onClick={() => navigateCategory("prev")}
                        disabled={activeCategoryIndex === 0}
                        className={`p-1 rounded-full ${activeCategoryIndex === 0 ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-sm font-medium">{documentCategories[activeCategoryIndex].title}</span>
                      <button
                        type="button"
                        onClick={() => navigateCategory("next")}
                        disabled={activeCategoryIndex === documentCategories.length - 1}
                        className={`p-1 rounded-full ${activeCategoryIndex === documentCategories.length - 1 ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Category content */}
                    <div className="p-4">
                      <div className="space-y-3">
                        {/* Document list */}
                        {documentCategories[activeCategoryIndex].documents.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500">Required documents:</p>
                            <ul className="text-xs text-gray-700 space-y-1.5">
                              {documentCategories[activeCategoryIndex].documents.map((doc, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="h-4 w-4 rounded-full bg-gray-200 flex-shrink-0 mt-0.5"></div>
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Upload area */}
                        <div
                          className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors border-gray-300 hover:border-gray-400"
                          onClick={() => documentUploadRef.current?.click()}
                        >
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Upload documents for this category</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF up to 10MB</p>
                          <input
                            type="file"
                            ref={documentUploadRef}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple
                            onChange={handleCeoDocumentUpload}
                          />
                        </div>

                        {/* Display uploaded documents for current category */}
                        {uploadedDocuments[documentCategories[activeCategoryIndex].id]?.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium text-gray-700">Uploaded documents:</p>
                            <div className="max-h-32 overflow-y-auto">
                              {uploadedDocuments[documentCategories[activeCategoryIndex].id].map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-1"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-sky-500" />
                                    <span className="text-xs truncate max-w-[200px]">{doc.name}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveCeoDocument(documentCategories[activeCategoryIndex].id, index)
                                    }
                                    className="text-gray-500 hover:text-red-500"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pagination indicators */}
                    <div className="flex justify-center gap-1 p-3 border-t bg-gray-50">
                      {documentCategories.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveCategoryIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeCategoryIndex === index ? "bg-sky-400" : "bg-gray-300"
                          }`}
                          aria-label={`Go to document category ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="register-password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-full h-12 font-medium transition-colors mt-4 mb-[-20px]
                  ${!isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                disabled={!isFormValid()}
              >
                Create Account
              </button>

              <div className="relative flex items-center justify-center text-xs text-gray-500 my-4">
                <span className="bg-white px-2 mt-10">or sign up with</span>
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6789C14.0454 13.6063 12.1909 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C11.2843 5 12.4565 5.48078 13.3569 6.28118L15.8211 3.81705C14.2709 2.32555 12.2539 1.42857 10 1.42857C5.25329 1.42857 1.42857 5.25329 1.42857 10C1.42857 14.7467 5.25329 18.5714 10 18.5714C14.7467 18.5714 18.5714 14.7467 18.5714 10C18.5714 9.43363 18.5214 8.88263 18.4257 8.34933L18.1711 8.36788Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M2.62891 6.12416L5.5049 8.23416C6.25462 6.38155 7.9907 5 10.0003 5C11.2846 5 12.4568 5.48078 13.3572 6.28118L15.8214 3.81705C14.2712 2.32555 12.2542 1.42857 10.0003 1.42857C6.75891 1.42857 3.95498 3.39048 2.62891 6.12416Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M9.99968 18.5714C12.2018 18.5714 14.1761 17.7053 15.7129 16.2643L12.9975 13.9857C12.1368 14.6394 10.9979 15 9.99968 15C7.81968 15 5.97168 13.6161 5.33168 11.6875L2.49268 13.8946C3.80332 16.6768 6.64368 18.5714 9.99968 18.5714Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M18.1711 8.36795H17.5V8.33337H10V11.6667H14.6789C14.3746 12.5902 13.8055 13.3973 13.0578 13.9867L13.0589 13.986L15.7743 16.2646C15.6057 16.4196 18.5714 14.1667 18.5714 10.0001C18.5714 9.4337 18.5214 8.8827 18.4257 8.3494L18.1711 8.36795Z"
                      fill="#1976D2"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.0756 10.5C14.0654 9.25225 14.6607 8.10938 15.6725 7.4165C15.0908 6.54163 14.1432 5.97488 13.1166 5.9165C12.0287 5.80925 10.8854 6.56188 10.3332 6.56188C9.74844 6.56188 8.7666 5.94275 7.91094 5.94275C6.42969 5.96675 4.82656 7.07613 4.82656 9.34275C4.82656 10.0166 4.94219 10.7155 5.17344 11.4395C5.49531 12.4155 6.74219 15.2249 8.04219 15.1916C8.84844 15.1749 9.39844 14.6124 10.4332 14.6124C11.4322 14.6124 11.9412 15.1916 12.8412 15.1916C14.1578 15.1749 15.2791 12.6082 15.5834 11.6291C13.8537 10.8207 14.0756 10.5498 14.0756 10.5Z"
                      fill="black"
                    />
                    <path
                      d="M12.3084 4.6875C12.8209 4.06838 13.1178 3.25325 13.0459 2.5C12.2709 2.5835 11.5584 2.9585 11.0334 3.56675C10.5459 4.12263 10.2178 4.9585 10.3053 5.6875C11.1428 5.7335 11.7959 5.30663 12.3084 4.6875Z"
                      fill="black"
                    />
                  </svg>
                  Apple ID
                </button>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="font-medium text-black hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App