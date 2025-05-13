import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import {
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  AlertCircle,
  CheckCircle2,
  Star,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"

interface ProviderTrackingMapProps {
  providerName: string
  firstName?: string
  lastName?: string
  bookingId: number
  customerLocation: {
    lat: number
    lng: number
  }
  providerLocation: {
    lat: number
    lng: number
  }
  onProviderArrived?: () => void
  onServiceCompleted?: () => void
}

// Define the ref type
interface ProviderTrackingMapRef {
  showReviewForm: () => void
}

const ProviderTrackingMap = forwardRef<ProviderTrackingMapRef, ProviderTrackingMapProps>(
  (
    {
      providerName,
      firstName = "",
      lastName = "",
      bookingId,
      customerLocation,
      providerLocation: initialProviderLocation,
      onProviderArrived,
      onServiceCompleted,
    },
    ref,
  ) => {
    const [, setProviderLocation] = useState(initialProviderLocation)
    const [estimatedTime, setEstimatedTime] = useState(15) // minutes
    const [providerStatus, setProviderStatus] = useState<"moving" | "stopped">("moving")
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const [providerArrived, setProviderArrived] = useState(false)
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null)

    const [providerRating, setProviderRating] = useState<number | null>(null)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [showThankYouMessage, setShowThankYouMessage] = useState(false)
    const [, setIsCompleted] = useState(false)
    const [reviewText, setReviewText] = useState("")

    const mapRef = useRef<L.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const providerMarkerRef = useRef<L.Marker | null>(null)
    const customerMarkerRef = useRef<L.Marker | null>(null)
    const routeLineRef = useRef<L.Polyline | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const simulationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const currentRouteRef = useRef<[number, number][]>([])
    const currentPointIndexRef = useRef<number>(0)
    const isMovingRef = useRef<boolean>(true)

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      showReviewForm: () => {
        setShowReviewForm(true)
      },
    }))

    useEffect(() => {
      if (!document.getElementById("provider-tracking-animations")) {
        const style = document.createElement("style")
        style.id = "provider-tracking-animations"
        style.innerHTML = `
          .provider-marker {
            filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.5));
            transition: transform 0.3s ease-out;
          }
          
          .provider-marker:hover {
            transform: scale(1.1);
          }
          
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
          
          @keyframes slideInRight {
            from { transform: translateX(20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .success-icon-container {
            animation: pulse 2s ease-in-out infinite;
          }
          
          .success-icon {
            animation: bounceIn 0.6s ease-out;
          }
          
          .success-title {
            animation: slideInUp 0.4s ease-out;
          }
          
          .success-message {
            animation: fadeIn 0.5s ease-out 0.2s both;
          }
          
          .success-button {
            animation: fadeIn 0.5s ease-out 0.3s both;
          }
          
          .success-detail {
            animation: slideInRight 0.4s ease-out forwards;
          }
          
          .success-detail:nth-child(2) {
            animation-delay: 0.1s;
          }
          
          .success-detail:nth-child(3) {
            animation-delay: 0.2s;
          }
          
          .success-detail:nth-child(4) {
            animation-delay: 0.3s;
          }
        `
        document.head.appendChild(style)
      }
    }, [])

    useEffect(() => {
      if (!mapContainerRef.current || mapRef.current) return

      const map = L.map(mapContainerRef.current, {
        center: [
          (customerLocation.lat + initialProviderLocation.lat) / 2,
          (customerLocation.lng + initialProviderLocation.lng) / 2,
        ],
        zoom: 12,
        attributionControl: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        crossOrigin: "anonymous",
        maxZoom: 19,
      }).addTo(map)

      setTimeout(() => {
        map.invalidateSize()
        setIsMapLoaded(true)
      }, 100)

      const customerIcon = L.divIcon({
        className: "customer-marker",
        html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })

      const customerMarker = L.marker([customerLocation.lat, customerLocation.lng], {
        icon: customerIcon,
      })
        .addTo(map)
        .bindPopup("Your Location")

      const providerIcon = L.divIcon({
        className: "provider-marker",
        html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      })

      const providerMarker = L.marker([initialProviderLocation.lat, initialProviderLocation.lng], {
        icon: providerIcon,
      })
        .addTo(map)
        .bindPopup(`${providerName} (Service Provider)`)
        .openPopup()

      mapRef.current = map
      customerMarkerRef.current = customerMarker
      providerMarkerRef.current = providerMarker

      initializeRouteAndSimulation()

      const bounds = L.latLngBounds(
        [customerLocation.lat, customerLocation.lng],
        [initialProviderLocation.lat, initialProviderLocation.lng],
      )
      map.fitBounds(bounds, { padding: [50, 50] })

      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }

        if (simulationTimeoutRef.current) {
          clearTimeout(simulationTimeoutRef.current)
          simulationTimeoutRef.current = null
        }
      }
    }, [])

    useEffect(() => {
      if (providerArrived && mapRef.current) {
        setTimeout(() => {
          mapRef.current?.invalidateSize()

          if (providerMarkerRef.current) {
            const position = providerMarkerRef.current.getLatLng()
            if (mapRef.current) {
              mapRef.current.setView(position, mapRef.current.getZoom())
            }
          }
        }, 100)
      }
    }, [providerArrived])

    // Listen for force arrival events
    useEffect(() => {
      const handleForceArrival = (event: CustomEvent<{ bookingId: number }>) => {
        if (event.detail.bookingId === bookingId) {
          // Force the provider to arrive
          if (providerMarkerRef.current && customerMarkerRef.current) {
            // Move the provider marker to the customer's location
            const customerPos = customerMarkerRef.current.getLatLng()
            providerMarkerRef.current.setLatLng(customerPos)

            // Stop any ongoing simulation
            if (simulationTimeoutRef.current) {
              clearTimeout(simulationTimeoutRef.current)
              simulationTimeoutRef.current = null
            }

            // Update state to show arrival
            setProviderStatus("stopped")
            setProviderArrived(true)
            setArrivalTime(new Date())

            // Store in localStorage
            localStorage.setItem(
              "providerArrived",
              JSON.stringify({
                bookingId: bookingId,
                providerName: providerName,
                timestamp: new Date().getTime(),
              }),
            )

            // Call the callback
            if (onProviderArrived) {
              onProviderArrived()
            }
          }
        }
      }

      // Add event listener
      window.addEventListener("providerForceArrival", handleForceArrival as EventListener)

      // Clean up
      return () => {
        window.removeEventListener("providerForceArrival", handleForceArrival as EventListener)
      }
    }, [bookingId, providerName, onProviderArrived])

    const initializeRouteAndSimulation = async () => {
      const routeCoords = await drawRouteToCustomer(initialProviderLocation, customerLocation)

      if (routeCoords) {
        currentRouteRef.current = routeCoords.filter((coord): coord is [number, number] => coord.length === 2)
        currentPointIndexRef.current = 0

        calculateRealisticETA(initialProviderLocation, customerLocation)

        setTimeout(() => {
          simulateProviderMovement()
        }, 1000)
      }
    }

    const getRouteCoordinates = async (
      start: { lat: number; lng: number },
      end: { lat: number; lng: number },
    ): Promise<[number, number][]> => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
        )
        const data = await response.json()

        if (data.routes && data.routes.length > 0) {
          return data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]])
        }

        return [
          [start.lat, start.lng],
          [end.lat, end.lng],
        ]
      } catch (error) {
        console.error("Error fetching route:", error)
        return [
          [start.lat, start.lng],
          [end.lat, end.lng],
        ]
      }
    }

    const drawRouteToCustomer = async (from: { lat: number; lng: number }, to: { lat: number; lng: number }) => {
      if (!mapRef.current) return

      if (routeLineRef.current) {
        routeLineRef.current.remove()
        routeLineRef.current = null
      }

      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
          layer.remove()
        }
      })

      try {
        const routeCoords = await getRouteCoordinates(from, to)

        const routeLine = L.polyline(routeCoords, {
          color: "#3b82f6",
          weight: 5,
          opacity: 0.8,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(mapRef.current)

        routeLineRef.current = routeLine

        return routeCoords
      } catch (error) {
        console.error("Error drawing route:", error)

        const simpleRoute: L.LatLngTuple[] = [
          [from.lat, from.lng],
          [to.lat, to.lng],
        ]

        const routeLine = L.polyline(simpleRoute, {
          color: "#3b82f6",
          weight: 4,
          opacity: 0.7,
        }).addTo(mapRef.current)

        routeLineRef.current = routeLine

        return simpleRoute
      }
    }

    const simulateProviderMovement = () => {
      if (!providerMarkerRef.current || !mapRef.current) return

      const routePoints = currentRouteRef.current
      if (routePoints.length === 0) return

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current)
        simulationTimeoutRef.current = null
      }

      const moveProvider = () => {
        if (currentPointIndexRef.current >= routePoints.length - 1) {
          setProviderStatus("stopped")
          setProviderArrived(true)
          setArrivalTime(new Date())

          localStorage.setItem(
            "providerArrived",
            JSON.stringify({
              bookingId: bookingId,
              providerName: providerName,
              timestamp: new Date().getTime(),
            }),
          )

          if (onProviderArrived) {
            onProviderArrived()
          }

          return
        }

        if (isMovingRef.current) {
          const currentPoint = routePoints[currentPointIndexRef.current]

          providerMarkerRef.current?.setLatLng(new L.LatLng(currentPoint[0], currentPoint[1]))

          setProviderLocation({
            lat: currentPoint[0],
            lng: currentPoint[1],
          })

          currentPointIndexRef.current++

          const remainingDistance = calculateRemainingDistance(routePoints, currentPointIndexRef.current)
          const newETA = Math.ceil((remainingDistance / 30) * 60)
          setEstimatedTime(newETA > 0 ? newETA : 1)

          const routeProgress = currentPointIndexRef.current / routePoints.length
          if (Math.random() < 0.05 && routeProgress > 0.3 && routeProgress < 0.7) {
            isMovingRef.current = false
            setProviderStatus("stopped")

            simulationTimeoutRef.current = setTimeout(
              () => {
                isMovingRef.current = true
                setProviderStatus("moving")
                moveProvider()
              },
              2000 + Math.random() * 1000,
            )

            return
          }
        }

        const movementDelay = 200 + Math.random() * 100 //
        simulationTimeoutRef.current = setTimeout(moveProvider, movementDelay)
      }

      moveProvider()
    }

    const calculateRemainingDistance = (routePoints: [number, number][], currentIndex: number): number => {
      let distance = 0

      for (let i = currentIndex; i < routePoints.length - 1; i++) {
        distance += calculateDistance(
          routePoints[i][0],
          routePoints[i][1],
          routePoints[i + 1][0],
          routePoints[i + 1][1],
        )
      }

      return distance
    }

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371
      const dLat = ((lat2 - lat1) * Math.PI) / 180
      const dLon = ((lon2 - lon1) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c
      return distance
    }

    const calculateRealisticETA = async (from: { lat: number; lng: number }, to: { lat: number; lng: number }) => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full`,
        )
        const data = await response.json()

        if (data.routes && data.routes.length > 0) {
          const durationInSeconds = data.routes[0].duration
          const durationInMinutes = Math.ceil(durationInSeconds / 60)
          setEstimatedTime(durationInMinutes)
        }
      } catch (error) {
        console.error("Error calculating ETA:", error)
        const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng)
        const estimatedMinutes = Math.ceil((distance / 30) * 60)
        setEstimatedTime(estimatedMinutes)
      }
    }

    const handleReviewSubmit = () => {
      // Save review logic would go here
      setShowReviewForm(false)
      setShowThankYouMessage(true)

      // Mark as complete in localStorage
      localStorage.setItem(
        "serviceCompleted",
        JSON.stringify({
          id: bookingId,
          timestamp: new Date().getTime(),
          reviewed: true,
          rating: providerRating,
          reviewText: reviewText,
        }),
      )

      // Notify parent component that service is completed
      if (onServiceCompleted) {
        onServiceCompleted()
      }

      // Hide thank you message after 3 seconds
      setTimeout(() => {
        setShowThankYouMessage(false)
        setIsCompleted(true)
      }, 3000)
    }

    return (
      <div className="flex flex-col h-[500px]">
        {/* Provider info */}
        <div className="bg-gray-100 p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="bg-green-100 p-1.5 rounded-full mr-2">
                <Navigation className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">{providerName}</h4>
                {(firstName || lastName) && (
                  <p className="text-gray-500 text-xs">
                    {firstName} {lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  providerStatus === "moving" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {providerStatus === "moving" ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Moving
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Stopped
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{providerArrived ? "Arrived at your location" : "Your provider is right on the track"}</span>
            </div>
            {!providerArrived && (
              <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
                <Clock className="h-3.5 w-3.5 mr-1 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {estimatedTime} min{estimatedTime !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Map and details container */}
        <div className="flex-1 flex rounded-lg overflow-hidden bg-gray-200 relative">
          {/* Map container - only shown when provider has not arrived */}
          {!providerArrived && (
            <div
              ref={mapContainerRef}
              className="w-full h-full rounded-lg overflow-hidden bg-gray-200 relative"
              style={{ minHeight: "300px", visibility: "visible" }}
            >
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-t-sky-500 border-gray-200 rounded-full animate-spin mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success details panel - only shown when provider has arrived */}
          {providerArrived && (
            <div className="w-full bg-white p-5 flex flex-col max-h-[400px] overflow-y-auto">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 success-icon-container">
                  <CheckCircle2 className="h-8 w-8 text-green-500 success-icon" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1 success-title">Provider Arrived!</h3>
                <p className="text-gray-600 text-sm success-message">{providerName} has arrived at your location.</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg flex items-start success-detail">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Provider</h4>
                    <p className="text-gray-600 text-sm">{providerName}</p>
                    {(firstName || lastName) && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {firstName} {lastName}
                      </p>
                    )}
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      <Star className="h-3 w-3 text-amber-500" />
                      <Star className="h-3 w-3 text-amber-500" />
                      <Star className="h-3 w-3 text-amber-500" />
                      <Star className="h-3 w-3 text-gray-300" />
                      <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-start success-detail">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Arrival Time</h4>
                    <p className="text-gray-600 text-sm">
                      {arrivalTime
                        ? arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Just now"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {arrivalTime
                        ? arrivalTime.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
                        : new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-start success-detail">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Service Location</h4>
                    <p className="text-gray-600 text-sm">Your current location</p>
                    <p className="text-xs text-gray-500">Booking #{bookingId}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button className="flex items-center justify-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Review form modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-medium mb-4 text-center">Rate Your Provider</h3>

              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={`provider-rating-${rating}`}
                      onClick={() => setProviderRating(rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          providerRating !== null && rating <= providerRating
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                  Share your experience (optional)
                </label>
                <textarea
                  id="review"
                  className="w-full p-3 border rounded-md text-sm"
                  rows={3}
                  placeholder="How was your experience with this provider?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  onClick={() => setShowReviewForm(false)}
                >
                  Skip
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  onClick={handleReviewSubmit}
                  disabled={providerRating === null}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thank you message */}
        {showThankYouMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You for Your Review!</h3>
              <p className="text-gray-600 mb-4">
                We're grateful for your feedback and the opportunity to serve you. Your review helps us improve our
                services. We hope to see you again soon!
              </p>
            </div>
          </div>
        )}
      </div>
    )
  },
)

// Add display name for React DevTools
ProviderTrackingMap.displayName = "ProviderTrackingMap"

export default ProviderTrackingMap