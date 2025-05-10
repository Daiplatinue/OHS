import "leaflet/dist/leaflet.css"
import { useState, useEffect, useRef } from "react"
import { Share, Flag, Calendar, MapPin, X, Check, ArrowLeft } from "lucide-react"
import L from "leaflet"
import LocationSelectionModal from "./LocationSelectionModal"
import CompanyModal from "./CompanyModal"
import { getMockCompanyData } from "./company-data"

interface Seller {
  id: number
  name: string
  rating: number
  reviews: number
  location: string
  startingRate: number
  ratePerKm: number
  badges: string[]
  description: string
}

interface WorkersModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  sellers: Seller[]
}

interface Location {
  name: string
  lat: number
  lng: number
  distance: number
}

const COMPANY_LOCATION = {
  lat: 10.2433,
  lng: 123.7962,
  name: "Minglanilla, Cebu City",
}

function WorkersModal({ isOpen, onClose, productName, sellers }: WorkersModalProps) {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null)
  const [bookingStep, setBookingStep] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [totalRate, setTotalRate] = useState<number>(0)
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false)
  const [confirmationStep, setConfirmationStep] = useState<boolean>(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false)
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const companyMarkerRef = useRef<L.Marker | null>(null)
  const lineRef = useRef<L.Polyline | null>(null)

  // Generate calendar days for the current month
  useEffect(() => {
    const days = []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Get the first day of the month
    const firstDay = new Date(year, month, 1)
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Add days from previous month to fill the first week
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevMonthDay = new Date(year, month, 1 - i)
      days.push(prevMonthDay)
    }

    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    // Add days from next month to complete the last week
    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i))
      }
    }

    setCalendarDays(days)
  }, [currentMonth])

  // Reset scroll position when changing steps
  useEffect(() => {
    const modalContent = document.getElementById("modal-content")
    if (modalContent) {
      modalContent.scrollTop = 0
    }
  }, [bookingStep, selectedSeller, bookingSuccess, confirmationStep])

  // Initialize map when component mounts and bookingStep is 2
  useEffect(() => {
    if (bookingStep === 2 && mapContainerRef.current && !mapRef.current) {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setUserLocation({ lat: latitude, lng: longitude })

            initializeMap(latitude, longitude)
          },
          (error) => {
            console.error("Error getting location:", error)
            // Default to company location if user location is not available
            initializeMap(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        )
      } else {
        // Default to company location if geolocation is not supported
        initializeMap(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng)
      }
    }

    return () => {
      if (mapRef.current && bookingStep !== 2) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
        companyMarkerRef.current = null
        lineRef.current = null
      }
    }
  }, [bookingStep])

  const initializeMap = (lat: number, lng: number) => {
    if (!mapContainerRef.current) return

    // Create custom marker icons
    const userIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
    })

    const companyIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
    })

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 13,
      attributionControl: true,
    })

    // Add OpenStreetMap tiles with CORS-friendly URL
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crossOrigin: "anonymous",
      maxZoom: 19,
    }).addTo(map)

    // Force a resize after initialization to ensure proper rendering
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    // Add user marker
    const marker = L.marker([lat, lng], { draggable: true, icon: userIcon })
      .addTo(map)
      .bindPopup("Your location")
      .openPopup()

    // Add company marker
    const companyMarker = L.marker([COMPANY_LOCATION.lat, COMPANY_LOCATION.lng], { icon: companyIcon })
      .addTo(map)
      .bindPopup(COMPANY_LOCATION.name)

    // Draw line between markers
    const line = L.polyline(
      [
        [lat, lng],
        [COMPANY_LOCATION.lat, COMPANY_LOCATION.lng],
      ],
      {
        color: "blue",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
      },
    ).addTo(map)

    // Calculate distance and update selected location
    const distance = calculateDistance(lat, lng, COMPANY_LOCATION.lat, COMPANY_LOCATION.lng)
    updateSelectedLocation(lat, lng, distance)

    // Handle marker drag events
    marker.on("dragend", () => {
      const position = marker.getLatLng()

      // Update line
      line.setLatLngs([
        [position.lat, position.lng],
        [COMPANY_LOCATION.lat, COMPANY_LOCATION.lng],
      ])

      // Calculate new distance
      const newDistance = calculateDistance(position.lat, position.lng, COMPANY_LOCATION.lat, COMPANY_LOCATION.lng)

      // Update selected location
      updateSelectedLocation(position.lat, position.lng, newDistance)
    })

    // Handle map click events
    map.on("click", (e) => {
      const { lat, lng } = e.latlng

      // Update marker position
      marker.setLatLng([lat, lng])

      // Update line
      line.setLatLngs([
        [lat, lng],
        [COMPANY_LOCATION.lat, COMPANY_LOCATION.lng],
      ])

      // Calculate new distance
      const newDistance = calculateDistance(lat, lng, COMPANY_LOCATION.lat, COMPANY_LOCATION.lng)

      // Update selected location
      updateSelectedLocation(lat, lng, newDistance)
    })

    // Save references
    mapRef.current = map
    markerRef.current = marker
    companyMarkerRef.current = companyMarker
    lineRef.current = line
  }

  // Fix Leaflet default icon issue
  useEffect(() => {
    // This is needed to fix the Leaflet default icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  const updateSelectedLocation = (lat: number, lng: number, distance: number) => {
    // Reverse geocode to get address
    reverseGeocode(lat, lng).then((name) => {
      setSelectedLocation({
        name: name || "Selected Location",
        lat,
        lng,
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
      })

      // Update total rate if seller is selected
      if (selectedSeller) {
        const newTotalRate = selectedSeller.startingRate + distance * selectedSeller.ratePerKm
        setTotalRate(newTotalRate)
      }
    })
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      )
      const data = await response.json()

      if (data && data.display_name) {
        // Extract a shorter version of the address
        const parts = data.display_name.split(",")
        return parts.slice(0, 3).join(", ")
      }

      return "Unknown location"
    } catch (error) {
      console.error("Error reverse geocoding:", error)
      return "Unknown location"
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km

    return distance
  }

  if (!isOpen) return null

  const handleSellerSelect = (seller: Seller) => {
    setSelectedSeller(seller)
  }

  const handleShare = (sellerId: number) => {
    // In a real app, this would open a share dialog
    alert(`Sharing seller #${sellerId}`)
  }

  const handleReport = (sellerId: number) => {
    // In a real app, this would open a report dialog
    alert(`Reporting seller #${sellerId}`)
  }

  const handleBook = (seller: Seller) => {
    setSelectedSeller(seller)
    setBookingStep(1)
    setTotalRate(seller.startingRate)
  }

  // Add a function to open the location modal
  const openLocationModal = () => {
    setIsLocationModalOpen(true)
  }

  // Add a function to close the location modal
  const closeLocationModal = () => {
    setIsLocationModalOpen(false)
  }

  const openCompanyModal = (seller: Seller) => {
    // Get company data from our data file
    const companyData = getMockCompanyData(seller, productName)
    setSelectedCompany(companyData)
    setIsCompanyModalOpen(true)
  }

  const closeCompanyModal = () => {
    setIsCompanyModalOpen(false)
    setSelectedCompany(null)
  }

  // Add a function to select a location from the modal
  const selectLocation = (location: Location) => {
    setSelectedLocation(location)
    setIsLocationModalOpen(false)

    // Update total rate
    if (selectedSeller) {
      const newTotalRate = selectedSeller.startingRate + location.distance * selectedSeller.ratePerKm
      setTotalRate(newTotalRate)
    }
  }

  // Modify the handleDateSelect function to open the location modal after selecting a date
  const handleDateSelect = (date: Date) => {
    // Fix: Use the exact date object without timezone issues
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    setSelectedDate(formattedDate)
    setBookingStep(2)
    // Remove the automatic opening of the location modal
    // setTimeout(() => {
    //   openLocationModal()
    // }, 100)
  }

  const handleBookNow = () => {
    setConfirmationStep(true)
  }

  const handleConfirmBooking = () => {
    setConfirmationStep(false)
    setBookingSuccess(true)
  }

  const resetBooking = () => {
    setBookingStep(0)
    setSelectedSeller(null)
    setSelectedDate("")
    setSelectedLocation(null)
    setConfirmationStep(false)
    setBookingSuccess(false)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + increment)
    setCurrentMonth(newMonth)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header section - always visible */}
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <>
              <h2 className="text-xl font-semibold text-black">Sellers for {productName}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {selectedSeller && bookingStep === 1 && !confirmationStep && !bookingSuccess && (
            <>
              <div>
                <button
                  onClick={resetBooking}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to sellers
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Select a Date</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {selectedSeller && bookingStep === 2 && !confirmationStep && !bookingSuccess && (
            <>
              <div>
                <button
                  onClick={() => setBookingStep(1)}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to date selection
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Select Service Location</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {confirmationStep && (
            <>
              <div>
                <button
                  onClick={() => setConfirmationStep(false)}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to location selection
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Confirm Booking</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {bookingSuccess && (
            <>
              <h2 className="text-xl font-semibold text-black">Booking Confirmation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Scrollable content area */}
        <div id="modal-content" className="overflow-y-auto flex-grow">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <div className="p-6">
              {sellers.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No sellers available for this product</p>
              ) : (
                <div className="space-y-6">
                  {sellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="bg-white rounded-lg p-5 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200 shadow-sm hover:shadow-md"
                      onClick={() => handleSellerSelect(seller)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3
                            className="text-black font-medium text-lg cursor-pointer hover:text-sky-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation()
                              openCompanyModal(seller)
                            }}
                          >
                            {seller.name}
                          </h3>
                          <p className="text-gray-700 text-sm mt-1 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-gray-500" /> {seller.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500 mb-1">
                            {"★".repeat(seller.rating)}
                            {"☆".repeat(5 - seller.rating)}
                          </div>
                          <p className="text-gray-700 text-sm">{seller.reviews} reviews</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{seller.description}</p>

                      <div className="flex justify-between items-center">
                        <div className="text-green-600 font-medium">
                          Starting at ₱{seller.startingRate.toLocaleString()} • ₱{seller.ratePerKm}/km
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(seller.id)
                            }}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Share className="h-4 w-4 text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReport(seller.id)
                            }}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Flag className="h-4 w-4 text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBook(seller)
                            }}
                            className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedSeller && bookingStep === 1 && !confirmationStep && !bookingSuccess && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">{selectedSeller.name}</h3>
                <p className="text-gray-600 text-sm">{selectedSeller.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Select a date for your booking
                </h4>

                {/* Compact Calendar */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
                  {/* Calendar header */}
                  <div className="flex justify-between items-center p-3 border-b border-gray-200">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      &lt;
                    </button>
                    <h3 className="font-medium text-sm">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h3>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      &gt;
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 text-center py-1 border-b border-gray-200">
                    {weekdays.map((day) => (
                      <div key={day} className="text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1 p-2">
                    {calendarDays.map((date, index) => {
                      // Format date for comparison with selectedDate
                      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                      const isSelected = dateStr === selectedDate

                      return (
                        <button
                          key={index}
                          onClick={() => !isPastDate(date) && isCurrentMonth(date) && handleDateSelect(date)}
                          disabled={isPastDate(date) || !isCurrentMonth(date)}
                          className={`
                            p-1 rounded-md text-center text-sm h-8 w-8 mx-auto flex items-center justify-center
                            ${isToday(date) ? "bg-sky-100 text-sky-700" : ""}
                            ${!isCurrentMonth(date) ? "text-gray-300" : "text-gray-800"}
                            ${isPastDate(date) ? "cursor-not-allowed opacity-50" : ""}
                            ${!isPastDate(date) && isCurrentMonth(date) ? "hover:bg-sky-50 hover:text-sky-700" : ""}
                            ${isSelected ? "bg-sky-600 text-white hover:bg-sky-700" : ""}
                          `}
                        >
                          {date.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Selected date display */}
                {selectedDate && (
                  <div className="mt-4 p-3 bg-sky-50 border border-sky-100 rounded-lg text-center">
                    <p className="text-sky-800">
                      <span className="font-medium">Selected date:</span> {formatDate(selectedDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedSeller && bookingStep === 2 && !confirmationStep && !bookingSuccess && (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">{selectedSeller.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedSeller.description}</p>
                <p className="text-gray-600 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                  <span className="font-medium">Selected date:</span> {formatDate(selectedDate)}
                </p>
              </div>

              <div>
                <h4 className="text-md font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-sky-600" /> Select your service location
                </h4>

                {/* Map container */}
                <div ref={mapContainerRef} className="h-64 rounded-lg mb-4"></div>

                {/* Selected location info */}
                {selectedLocation ? (
                  <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-100 mb-4">
                    <h4 className="font-medium mb-2">Selected Location</h4>
                    <p className="text-gray-700 mb-1">{selectedLocation.name}</p>
                    <p className="text-gray-600 text-sm">
                      Distance from company: {selectedLocation.distance.toFixed(1)} km
                    </p>

                    <div className="mt-4 pt-4 border-t border-sky-200">
                      <h4 className="text-md font-medium mb-2">Pricing Breakdown</h4>
                      <div className="flex justify-between mb-2">
                        <span>Base rate:</span>
                        <span>₱{selectedSeller.startingRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>
                          Distance charge ({selectedLocation.distance.toFixed(1)} km × ₱{selectedSeller.ratePerKm}):
                        </span>
                        <span>₱{(selectedLocation.distance * selectedSeller.ratePerKm).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-sky-200 my-2"></div>
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total:</span>
                        <span>
                          ₱{totalRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4 text-center">
                    <p className="text-gray-600">No location selected yet.</p>
                    <button
                      onClick={openLocationModal}
                      className="mt-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      Select Location
                    </button>
                  </div>
                )}

                {/* Button to change location if already selected */}
                {selectedLocation && (
                  <div className="flex justify-center">
                    <button
                      onClick={openLocationModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Change Location
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {confirmationStep && (
            <div className="p-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-medium mb-4">Booking Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{productName}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">{selectedSeller?.name}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Service Location:</span>
                    <span className="font-medium">{selectedLocation?.name}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{selectedLocation?.distance.toFixed(1)} km</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Base rate:</span>
                    <span className="font-medium">₱{selectedSeller?.startingRate.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Distance charge:</span>
                    <span className="font-medium">
                      ₱
                      {selectedLocation ? (selectedLocation.distance * (selectedSeller?.ratePerKm || 0)).toFixed(2) : 0}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-lg">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-sky-700">
                      ₱{totalRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <p className="text-sm text-yellow-800">
                  By confirming this booking, you agree to the terms and conditions of service. The service provider
                  will contact you shortly to confirm the details.
                </p>
              </div>
            </div>
          )}

          {bookingSuccess && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="h-8 w-8 text-green-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">Booking Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Stay tuned! {selectedSeller?.name} will review and accept your booking soon.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 border border-gray-200">
                <div className="mb-2">
                  <span className="font-medium">Service:</span> {productName}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Provider:</span> {selectedSeller?.name}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Date:</span> {formatDate(selectedDate)}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Service Location:</span> {selectedLocation?.name}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Distance:</span> {selectedLocation?.distance.toFixed(1)} km
                </div>
                <div className="mb-2">
                  <span className="font-medium">Total:</span> ₱
                  {totalRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer section with action buttons - fixed at bottom */}
        <div className="p-6 border-t border-gray-200 mt-auto bg-gray-50">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {bookingStep === 2 && selectedSeller && !confirmationStep && !bookingSuccess && (
            <div className="flex justify-end">
              <button
                onClick={handleBookNow}
                disabled={!selectedLocation}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedLocation
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>
            </div>
          )}

          {confirmationStep && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmationStep(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          )}

          {bookingSuccess && (
            <div className="flex justify-end">
              <button
                onClick={resetBooking}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
      {isLocationModalOpen && (
        <LocationSelectionModal
          isOpen={isLocationModalOpen}
          onClose={closeLocationModal}
          onSelectLocation={selectLocation}
          companyLocation={COMPANY_LOCATION}
        />
      )}
      {isCompanyModalOpen && (
        <CompanyModal isOpen={isCompanyModalOpen} onClose={closeCompanyModal} company={selectedCompany} />
      )}
    </div>
  )
}

export default WorkersModal