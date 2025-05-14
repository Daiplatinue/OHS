import { useState, useEffect } from "react"
import { X, Search, Check } from "lucide-react"
import MapComponent from "./MapComponent"

interface Location {
  name: string
  lat: number
  lng: number
  distance: number
  price?: number
  id?: string
}

interface LocationSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectLocation: (location: Location) => void
  companyLocation: {
    lat: number
    lng: number
    name: string
  }
  savedLocations?: Location[]
  previousLocation?: Location | null
}

export default function LocationSelector({
  isOpen,
  onClose,
  onSelectLocation,
  companyLocation,
  savedLocations = [],
  previousLocation = null,
}: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Location[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [selectedMapLocation, setSelectedMapLocation] = useState<Location | null>(previousLocation)
  const [savedLocationsList, setSavedLocationsList] = useState<Location[]>([])

  useEffect(() => {
    const defaultLocations = savedLocations.length
      ? savedLocations
      : [
          {
            id: "loc-1",
            name: "Manhattan Home Service",
            lat: 40.7831,
            lng: -73.9712,
            distance: calculateDistance(40.7831, -73.9712, companyLocation.lat, companyLocation.lng),
            price: 85.5,
          },
          {
            id: "loc-2",
            name: "Brooklyn Home Service",
            lat: 40.6782,
            lng: -73.9442,
            distance: calculateDistance(40.6782, -73.9442, companyLocation.lat, companyLocation.lng),
            price: 75.25,
          },
          {
            id: "loc-3",
            name: "Queens Home Service",
            lat: 40.7282,
            lng: -73.7949,
            distance: calculateDistance(40.7282, -73.7949, companyLocation.lat, companyLocation.lng),
            price: 80.0,
          },
        ]

    const locationsWithIds = defaultLocations.map((loc) => {
      if (!loc.id) {
        return {
          ...loc,
          id: `loc-${Math.random().toString(36).substr(2, 9)}`,
        }
      }
      return loc
    })

    setSavedLocationsList(locationsWithIds)
  }, [savedLocations, companyLocation.lat, companyLocation.lng])

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

  const searchLocation = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
      )
      const data = await response.json()

      const results = data.map((item: any) => {
        const distance = calculateDistance(
          Number.parseFloat(item.lat),
          Number.parseFloat(item.lon),
          companyLocation.lat,
          companyLocation.lng,
        )

        return {
          name: item.display_name,
          lat: Number.parseFloat(item.lat),
          lng: Number.parseFloat(item.lon),
          distance: distance,
          price: calculatePrice(distance),
          id: `search-${Math.random().toString(36).substr(2, 9)}`,
        }
      })

      setSearchResults(results)
    } catch (error) {
      console.error("Error searching location:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleMapLocationSelect = (location: Location) => {
    setSelectedMapLocation(location)
  }

  const selectLocationItem = (location: Location) => {
    setSelectedMapLocation(location)
  }

  const confirmSelection = () => {
    if (selectedMapLocation) {
      onSelectLocation(selectedMapLocation)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Select your service location</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-1/3 border-r border-gray-100 flex flex-col">
            {/* Search bar */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by address"
                  className="w-full p-2 pl-8 bg-gray-50 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && searchLocation()}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={searchLocation}
                  disabled={isSearching}
                  className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 font-medium border-b-2 border-blue-500">
                Saved Locations
              </button>
            </div>

            {/* Saved Locations list */}
            <div className="flex-1 overflow-y-auto">
              {savedLocationsList.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No saved locations yet. Search or click on the map to select a location.</p>
                </div>
              ) : (
                savedLocationsList.map((location) => (
                  <div
                    key={`saved-${location.id}`}
                    className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedMapLocation && selectedMapLocation.id === location.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => selectLocationItem(location)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{location.name.split(",")[0]}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {location.distance.toFixed(1)} km • ${location.price?.toFixed(2)}
                        </p>
                      </div>
                      {selectedMapLocation && selectedMapLocation.id === location.id && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Search results */}
              {searchResults.length > 0 && (
                <>
                  <div className="p-2 bg-gray-50 border-b border-t">
                    <h3 className="text-sm font-medium text-gray-700">Search Results</h3>
                  </div>
                  {searchResults.map((location) => (
                    <div
                      key={`search-${location.id}`}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedMapLocation && selectedMapLocation.id === location.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => selectLocationItem(location)}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{location.name.split(",")[0]}</h3>
                          <p className="text-gray-500 text-sm mt-1">
                            {location.distance.toFixed(1)} km • ${location.price?.toFixed(2)}
                          </p>
                        </div>
                        {selectedMapLocation && selectedMapLocation.id === location.id && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="w-2/3 relative">
            <MapComponent
              companyLocation={companyLocation}
              onLocationSelect={handleMapLocationSelect}
              selectedLocation={selectedMapLocation}
              savedLocations={savedLocationsList}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={confirmSelection}
            disabled={!selectedMapLocation}
            className={`w-full py-2 rounded-md transition-colors font-medium ${
              selectedMapLocation
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}