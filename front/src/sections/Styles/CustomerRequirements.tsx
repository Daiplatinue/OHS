import type React from "react"

import { useState, useRef } from "react"
import { Eye, EyeOff, Upload, ChevronLeft, ChevronRight, Camera, ImageIcon } from "lucide-react"
import LocationSelector from "./LocationSelectorAuth"

interface Location {
  name: string
  lat: number
  lng: number
  distance: number
  price?: number
  id?: string
}

interface CustomerRequirementsProps {
  onClose?: () => void
  parentModal?: boolean
}

export default function RegisterForm({ onClose, parentModal = false }: CustomerRequirementsProps) {
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [email, setEmail] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState("customer")

  // ID document state
  const [frontId, setFrontId] = useState<File | null>(null)
  const [backId, setBackId] = useState<File | null>(null)
  const [frontIdPreview, setFrontIdPreview] = useState<string | null>(null)
  const [backIdPreview, setBackIdPreview] = useState<string | null>(null)

  // Location state
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)

  // Profile state
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null)

  // Refs for file inputs
  const frontIdRef = useRef<HTMLInputElement>(null)
  const backIdRef = useRef<HTMLInputElement>(null)
  const profilePictureRef = useRef<HTMLInputElement>(null)
  const coverPhotoRef = useRef<HTMLInputElement>(null)

  // Company location (for location selector)
  const companyLocation = {
    lat: 40.7128,
    lng: -74.006,
    name: "HandyGo Headquarters",
  }

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

  // Validation for each step
  const isStep1Valid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      frontId !== null &&
      backId !== null
    )
  }

  const isStep2Valid = () => {
    return selectedLocation !== null
  }

  const isStep3Valid = () => {
    return password !== "" && confirmPassword !== "" && password === confirmPassword && profilePicture !== null
  }

  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3)
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

    if (isStep3Valid()) {
      // Here you would typically send the data to your API
      console.log({
        firstName,
        lastName,
        middleName,
        email,
        mobileNumber,
        password,
        accountType,
        frontId,
        backId,
        selectedLocation,
        profilePicture,
        coverPhoto,
      })

      // Reset form or redirect
      alert("Registration successful!")
      if (onClose) {
        onClose()
      }
    }
  }

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-1">HandyGo</h1>
          <h2 className="text-3xl font-bold text-sky-400">Create Your Account</h2>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                1
              </div>
              <span className="text-sm mt-1">Personal Info</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                2
              </div>
              <span className="text-sm mt-1">Location</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-sky-500" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                3
              </div>
              <span className="text-sm mt-1">Profile Setup</span>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="bg-white rounded-xl">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information and ID */}
              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left side - ID upload */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Valid ID Submission</h3>

                    {/* Front ID */}
                    <div className="mb-4">
                      <label htmlFor="front-id" className="mb-2 block text-sm font-medium">
                        Front of ID
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${frontId ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
                        onClick={() => frontIdRef.current?.click()}
                      >
                        {frontIdPreview ? (
                          <div className="relative w-full h-40">
                            <img
                              src={frontIdPreview || "/placeholder.svg"}
                              alt="Front ID Preview"
                              className="object-contain w-full h-full"
                            />
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload front of your valid ID</p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF up to 5MB</p>
                          </>
                        )}
                        <input
                          id="front-id"
                          type="file"
                          ref={frontIdRef}
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setFrontId, setFrontIdPreview)}
                        />
                      </div>
                    </div>

                    {/* Back ID */}
                    <div className="mb-4">
                      <label htmlFor="back-id" className="mb-2 block text-sm font-medium">
                        Back of ID
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${backId ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
                        onClick={() => backIdRef.current?.click()}
                      >
                        {backIdPreview ? (
                          <div className="relative w-full h-40">
                            <img
                              src={backIdPreview || "/placeholder.svg"}
                              alt="Back ID Preview"
                              className="object-contain w-full h-full"
                            />
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload back of your valid ID</p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF up to 5MB</p>
                          </>
                        )}
                        <input
                          id="back-id"
                          type="file"
                          ref={backIdRef}
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setBackId, setBackIdPreview)}
                        />
                      </div>
                    </div>

                    {/* ID Preview */}
                    {(frontIdPreview || backIdPreview) && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">ID Overview</h4>
                        <div className="flex gap-2">
                          {frontIdPreview && (
                            <div className="relative w-20 h-12 border rounded overflow-hidden">
                              <img
                                src={frontIdPreview || "/placeholder.svg"}
                                alt="Front ID"
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">Front</span>
                              </div>
                            </div>
                          )}
                          {backIdPreview && (
                            <div className="relative w-20 h-12 border rounded overflow-hidden">
                              <img
                                src={backIdPreview || "/placeholder.svg"}
                                alt="Back ID"
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">Back</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right side - Personal information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="first-name" className="mb-1 block text-sm font-medium">
                          First Name
                        </label>
                        <input
                          id="first-name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="last-name" className="mb-1 block text-sm font-medium">
                          Last Name
                        </label>
                        <input
                          id="last-name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="middle-name" className="mb-1 block text-sm font-medium">
                          Middle Name (optional)
                        </label>
                        <input
                          id="middle-name"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                          placeholder="Enter your middle name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@mail.com"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile-number" className="mb-1 block text-sm font-medium">
                          Mobile Number
                        </label>
                        <input
                          id="mobile-number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Enter your mobile number"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location Selection */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Your Location</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left side - Location selection */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowLocationModal(true)}
                        className="w-full mb-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                      >
                        Open Location Selector
                      </button>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-2">
                          Click the button above to open the location selector. You can search for a location or click
                          on the map to select your service location.
                        </p>

                        {!selectedLocation && (
                          <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-400">No location selected</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Selected location details */}
                    <div>
                      {selectedLocation ? (
                        <div className="p-4 bg-white border rounded-lg">
                          <h4 className="font-medium mb-2">Selected Location</h4>

                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-gray-500">Location Name</label>
                              <p className="font-medium">{selectedLocation.name}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-gray-500">Distance</label>
                                <p className="font-medium">{selectedLocation.distance.toFixed(1)} km</p>
                              </div>

                              <div>
                                <label className="text-xs text-gray-500">Zip Code</label>
                                <p className="font-medium">10001</p> {/* This would be dynamically fetched */}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-gray-500">Coordinates</label>
                              <p className="text-sm">
                                Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                              </p>
                            </div>

                            {selectedLocation.price && (
                              <div className="pt-2 border-t">
                                <label className="text-xs text-gray-500">Estimated Service Price</label>
                                <p className="text-lg font-bold text-sky-600">₱{selectedLocation.price.toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-gray-400 mb-2">No location selected</p>
                          <p className="text-xs text-gray-500 text-center">
                            Please select a location to continue with your registration
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Setup */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Profile Setup</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left side - Profile pictures */}
                    <div>
                      {/* Cover Photo */}
                      <div className="mb-4">
                        <label htmlFor="cover-photo" className="mb-2 block text-sm font-medium">
                          Cover Photo (optional)
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-40 ${coverPhoto ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
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
                              <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload a cover photo</p>
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
                      </div>

                      {/* Profile Picture */}
                      <div className="mb-4">
                        <label htmlFor="profile-picture" className="mb-2 block text-sm font-medium">
                          Profile Picture
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${profilePicture ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
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
                              <Camera className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Upload a profile picture</p>
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
                      </div>

                      {/* Profile Preview */}
                      {(profilePicturePreview || coverPhotoPreview) && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Profile Overview</h4>
                          <div className="relative">
                            <div className="h-20 rounded-t-lg overflow-hidden bg-gray-200">
                              {coverPhotoPreview && (
                                <img
                                  src={coverPhotoPreview || "/placeholder.svg"}
                                  alt="Cover"
                                  className="object-cover w-full h-full"
                                />
                              )}
                            </div>
                            <div className="absolute -bottom-4 left-4">
                              <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-gray-300">
                                {profilePicturePreview && (
                                  <img
                                    src={profilePicturePreview || "/placeholder.svg"}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="h-10"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right side - Account details */}
                    <div>
                      {/* Account Type */}
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Account Type</label>
                        <div className="grid grid-cols-2 gap-3">
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
                              accountType === "ceo"
                                ? "border-sky-400 bg-sky-50 text-sky-600"
                                : "border-gray-300 text-gray-500"
                            } py-3 font-medium transition-colors`}
                          >
                            CEO
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="mb-4">
                        <label htmlFor="password" className="mb-1 block text-sm font-medium">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10"
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

                      {/* Confirm Password */}
                      <div className="mb-4">
                        <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {password !== confirmPassword && confirmPassword !== "" && (
                          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                        )}
                      </div>

                      {/* Summary */}
                      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Account Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Name:</span>
                            <span className="font-medium">
                              {firstName} {middleName ? middleName + " " : ""}
                              {lastName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Email:</span>
                            <span className="font-medium">{email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Account Type:</span>
                            <span className="font-medium capitalize">{accountType}</span>
                          </div>
                          {selectedLocation && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span className="font-medium">{selectedLocation.name.split(",")[0]}</span>
                            </div>
                          )}
                        </div>
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

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={(currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid())}
                    className={`px-4 py-2 flex items-center bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors ${
                      (currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid())
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
                    disabled={!isStep3Valid()}
                    className={`px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors ${
                      !isStep3Valid() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Location selection modal - only render if not in parent modal */}
        {showLocationModal && !parentModal && (
          <LocationSelector
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
            onSelectLocation={(location) => {
              setSelectedLocation(location)
              setShowLocationModal(false)
            }}
            companyLocation={companyLocation}
            previousLocation={selectedLocation}
          />
        )}

        {/* Location selection - render directly in parent modal */}
        {showLocationModal && parentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20" onClick={() => setShowLocationModal(false)}></div>
            <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[80vh] overflow-auto p-4 z-10">
              <LocationSelector
                isOpen={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                onSelectLocation={(location) => {
                  setSelectedLocation(location)
                  setShowLocationModal(false)
                }}
                companyLocation={companyLocation}
                previousLocation={selectedLocation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}