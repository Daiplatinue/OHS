"use client"

import { useState, useEffect, useRef } from "react"

// This is a client-side only component
interface Location {
  name: string
  lat: number
  lng: number
  distance: number
  price?: number
  id?: string
}

interface MapComponentProps {
  companyLocation: {
    lat: number
    lng: number
    name: string
  }
  onLocationSelect: (location: Location) => void
  selectedLocation: Location | null
  savedLocations: Location[]
}

export default function MapComponent({
  companyLocation,
  onLocationSelect,
  selectedLocation,
  savedLocations,
}: MapComponentProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])
  const companyMarkerRef = useRef<any>(null)
  const selectedMarkerRef = useRef<any>(null)
  const routeLineRef = useRef<any>(null)
  const [isMapInitialized, setIsMapInitialized] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [L, setL] = useState<any>(null)

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add Leaflet CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      document.head.appendChild(link)

      // Import Leaflet
      import("leaflet").then((leaflet) => {
        setL(leaflet.default)
        setLeafletLoaded(true)
      })
    }
  }, [])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !L || !mapContainerRef.current || mapRef.current) return

    // Fix icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })

    // Create map
    const map = L.map(mapContainerRef.current, {
      center: [companyLocation.lat, companyLocation.lng],
      zoom: 12,
      attributionControl: true,
    })

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add company marker
    const companyIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
    })

    const companyMarker = L.marker([companyLocation.lat, companyLocation.lng], { icon: companyIcon })
      .addTo(map)
      .bindPopup(companyLocation.name)

    companyMarkerRef.current = companyMarker

    // Add markers for saved locations
    addMarkersForLocations(savedLocations, map)

    // Handle map click
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng

      // Remove previous marker if it exists
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.remove()
        selectedMarkerRef.current = null
      }

      // Add new marker
      const locationIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      })

      const marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map)
      selectedMarkerRef.current = marker

      // Calculate distance
      const distance = calculateDistance(lat, lng, companyLocation.lat, companyLocation.lng)

      // Reverse geocode to get location name
      reverseGeocode(lat, lng).then((name) => {
        const newLocation = {
          name: name || "Selected Location",
          lat,
          lng,
          distance: Math.round(distance * 10) / 10,
          price: calculatePrice(distance),
          id: `loc-${Math.random().toString(36).substr(2, 9)}`,
        }

        onLocationSelect(newLocation)

        // Draw route
        drawRouteToCompany(newLocation, map)
      })
    })

    mapRef.current = map
    setIsMapInitialized(true)

    // If there's a selected location, show it
    if (selectedLocation) {
      const locationIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      })

      const marker = L.marker([selectedLocation.lat, selectedLocation.lng], { icon: locationIcon })
        .addTo(map)
        .bindPopup(selectedLocation.name)

      selectedMarkerRef.current = marker

      // Center map on selected location
      map.setView([selectedLocation.lat, selectedLocation.lng], 14)

      // Draw route
      drawRouteToCompany(selectedLocation, map)
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = []
        companyMarkerRef.current = null
        selectedMarkerRef.current = null
        routeLineRef.current = null
      }
    }
  }, [leafletLoaded, L])

  // Update when selected location changes
  useEffect(() => {
    if (!isMapInitialized || !mapRef.current || !L) return

    if (selectedLocation && selectedMarkerRef.current) {
      // Update marker position if it exists
      selectedMarkerRef.current.setLatLng([selectedLocation.lat, selectedLocation.lng])

      // Draw route
      drawRouteToCompany(selectedLocation, mapRef.current)

      // Center map
      mapRef.current.setView([selectedLocation.lat, selectedLocation.lng], 14)
    }
  }, [selectedLocation, isMapInitialized, L])

  // Helper functions
  const addMarkersForLocations = (locations: Location[], map: any) => {
    if (!L) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Add new markers
    const locationIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
    })

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], { icon: locationIcon })
        .addTo(map)
        .bindPopup(location.name)
        .on("click", () => {
          onLocationSelect(location)
          drawRouteToCompany(location, map)
        })

      markersRef.current.push(marker)
    })
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

  const calculatePrice = (distance: number): number => {
    const basePrice = 50
    const pricePerKm = 2.5
    return Math.round((basePrice + distance * pricePerKm) * 100) / 100
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      )
      const data = await response.json()

      if (data && data.display_name) {
        const parts = data.display_name.split(",")
        return parts.slice(0, 3).join(", ")
      }

      return "Unknown location"
    } catch (error) {
      console.error("Error reverse geocoding:", error)
      return "Unknown location"
    }
  }

  const drawRouteToCompany = async (location: Location, map: any) => {
    if (!L) return

    // Clear existing route
    if (routeLineRef.current) {
      routeLineRef.current.remove()
      routeLineRef.current = null
    }

    // Draw simple line for now (in a real app, you'd use a routing service)
    const routeLine = L.polyline(
      [
        [location.lat, location.lng],
        [companyLocation.lat, companyLocation.lng],
      ],
      {
        color: "#3b82f6",
        weight: 4,
        opacity: 0.7,
      },
    ).addTo(map)

    routeLineRef.current = routeLine

    // Fit map to show the route
    const bounds = L.latLngBounds([
      [location.lat, location.lng],
      [companyLocation.lat, companyLocation.lng],
    ])
    map.fitBounds(bounds, { padding: [50, 50] })
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full"></div>

      {/* Map instructions */}
      <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-md shadow-md text-sm text-gray-600 max-w-xs">
        <p>Click anywhere on the map to select a service location</p>
      </div>

      {/* Zoom controls */}
      {isMapInitialized && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={() => mapRef.current?.zoomIn()}
          >
            <span className="text-gray-800 font-bold">+</span>
          </button>
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={() => mapRef.current?.zoomOut()}
          >
            <span className="text-gray-800 font-bold">-</span>
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {!isMapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin h-8 w-8 border-4 border-sky-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  )
}