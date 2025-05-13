import { useEffect, useRef, useState } from "react"
import {
  Clock,
  MapPin,
  Navigation,
  User,
  X,
  Check,
  AlertTriangle,
  CheckCircle,
  Layers,
  RouteIcon,
  DollarSign,
  FileText,
} from "lucide-react"
import "ol/ol.css"
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import XYZ from "ol/source/XYZ"
import { fromLonLat, toLonLat } from "ol/proj"
import { Feature, Overlay } from "ol"
import { LineString } from "ol/geom"
import { Vector as VectorSource } from "ol/source"
import { Vector as VectorLayer } from "ol/layer"
import { Style, Stroke, Fill, Text } from "ol/style"

interface ProviderSimulationProps {
  customerName: string
  customerLocation: string
  onSimulationComplete: () => void
  onClose: () => void
}

type ReportType =
  | "Light Traffic"
  | "Mid Traffic"
  | "Heavy Traffic"
  | "Accident Occur"
  | "Weather Problem"
  | "Vehicle Problem"

interface Route {
  id: string
  name: string
  distance: number
  duration: number
  trafficLevel: "light" | "moderate" | "heavy"
  coordinates: [number, number][]
}

interface BookingSummary {
  serviceType: string
  date: string
  time: string
  location: string
  laborCost: number
  partsCost: number
  travelCost: number
  discount: number
  total: number
}

export default function ProviderSimulation({
  customerName,
  customerLocation,
  onSimulationComplete,
  onClose,
}: ProviderSimulationProps) {
  const [estimatedTime, setEstimatedTime] = useState(15) // minutes
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [providerStatus, setProviderStatus] = useState<"moving" | "stopped">("moving")
  const [showReportOptions, setShowReportOptions] = useState(false)
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [activeIncident, setActiveIncident] = useState<ReportType | null>(null)
  const [nextDirection, setNextDirection] = useState<string>("Continue straight")
  const [mapLayers, setMapLayers] = useState<string>("standard")
  const [showBuildingDetails, setShowBuildingDetails] = useState(false)
  const [showTraffic, setShowTraffic] = useState(true)
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([])
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [laborCost, setLaborCost] = useState(0)
  const [partsCost, setPartsCost] = useState(0)
  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null)
  const [showWeather, ] = useState(false)
  const [currentWeather, ] = useState<"clear" | "rain" | "snow" | "storm" | "cloudy">("clear")

  const mapRef = useRef<Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const simulationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentRouteRef = useRef<[number, number][]>([])
  const currentPointIndexRef = useRef<number>(0)
  const isMovingRef = useRef<boolean>(true)
  const carMarkerElementRef = useRef<HTMLDivElement | null>(null)
  const routeLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const navigationOverlayRef = useRef<HTMLDivElement | null>(null)
  const buildingsLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const trafficLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const alternativeRoutesLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const weatherOverlayRef = useRef<HTMLDivElement | null>(null)
  const weatherAnimationRef = useRef<number | null>(null)

  // Mock locations - in a real app, these would come from GPS
  const providerLocation = { lng: 120.9842, lat: 14.5995 } // Manila
  const customerLocationCoords = { lng: 121.0223, lat: 14.6091 } // Quezon City

  const reportOptions: ReportType[] = [
    "Light Traffic",
    "Mid Traffic",
    "Heavy Traffic",
    "Accident Occur",
    "Weather Problem",
    "Vehicle Problem",
  ]

  // Mock previous booking summary
  const previousBookingSummary: BookingSummary = {
    serviceType: "Plumbing Repair",
    date: "May 12, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "123 Main St, Quezon City",
    laborCost: 1500,
    partsCost: 850,
    travelCost: 350,
    discount: 200,
    total: 2500,
  }

  useEffect(() => {
    // Add custom styles
    if (!document.getElementById("provider-simulation-animations")) {
      const style = document.createElement("style")
      style.id = "provider-simulation-animations"
      style.innerHTML = `
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
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes raindrop {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }

        @keyframes snowflake {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }

        @keyframes lightning {
          0%, 100% { opacity: 0; }
          92% { opacity: 0; }
          93% { opacity: 0.6; }
          94% { opacity: 0.2; }
          96% { opacity: 0.9; }
          98% { opacity: 0.5; }
        }

        @keyframes cloud-move {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }

        .report-option {
          transition: all 0.2s ease;
        }
        
        .report-option:hover {
          transform: translateY(-2px);
        }
        
        .report-option.selected {
          border-color: #3b82f6;
          background-color: #eff6ff;
        }

        /* Navigation UI */
        .navigation-overlay {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 10px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          display: flex;
          align-items: center;
          min-width: 200px;
          backdrop-filter: blur(4px);
        }

        .direction-icon {
          margin-right: 12px;
          background-color: #0ea5e9;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .direction-text {
          font-weight: 500;
          font-size: 14px;
          color: #1f2937;
        }

        .distance-text {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        /* Car marker */
        .car-marker {
          width: 44px;
          height: 44px;
          background-color: #0ea5e9;
          border-radius: 50%;
          position: relative;
          transform-origin: center center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3), 0 0 0 6px rgba(14, 165, 233, 0.2);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .car-marker:before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          top: -12px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 16px solid #0ea5e9;
          transform-origin: bottom center;
        }

        .car-marker:after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          background-color: white;
          border-radius: 50%;
          z-index: 1;
        }

        .car-marker-inner {
          width: 20px;
          height: 20px;
          background-color: #0ea5e9;
          border-radius: 50%;
          position: relative;
          z-index: 2;
        }

        /* Customer marker */
        .customer-marker {
          width: 22px;
          height: 22px;
          background-color: #0ea5e9;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }

        /* Map controls */
        .map-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          z-index: 10;
          overflow: hidden;
        }

        .map-control-button {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
        }

        .map-control-button:hover {
          background-color: #f9fafb;
        }

        .map-control-button.active {
          background-color: #eff6ff;
          color: #3b82f6;
        }

        /* Building popup */
        .building-popup {
          position: absolute;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          padding: 12px;
          min-width: 200px;
          z-index: 20;
          transform: translate(-50%, -100%);
          margin-top: -10px;
        }

        .building-popup:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid white;
        }

        .building-popup h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          font-weight: 600;
        }

        .building-popup p {
          margin: 4px 0;
          font-size: 12px;
          color: #4b5563;
        }

        .building-popup-close {
          position: absolute;
          top: 8px;
          right: 8px;
          cursor: pointer;
          color: #9ca3af;
        }

        .building-popup-close:hover {
          color: #4b5563;
        }

        /* Weather overlay */
        .weather-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
          overflow: hidden;
        }

        .rain-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(105, 155, 255, 0.2), rgba(105, 155, 255, 0.1));
        }

        .raindrop {
          position: absolute;
          width: 2px;
          height: 20px;
          background-color: rgba(174, 214, 241, 0.6);
          border-radius: 50%;
          animation: raindrop 0.7s linear infinite;
        }

        .snow-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        }

        .snowflake {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: snowflake 10s linear infinite;
        }

        .storm-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(52, 73, 94, 0.4), rgba(52, 73, 94, 0.3));
        }

        .lightning {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.3);
          animation: lightning 5s infinite;
        }

        .cloudy-container {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(189, 195, 199, 0.2), rgba(189, 195, 199, 0.1));
        }

        .cloud {
          position: absolute;
          width: 200px;
          height: 60px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50px;
          animation: cloud-move 30s linear infinite;
          top: 20%;
        }

        .cloud:before, .cloud:after {
          content: '';
          position: absolute;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
        }

        .cloud:before {
          width: 100px;
          height: 100px;
          top: -50px;
          left: 25px;
        }

        .cloud:after {
          width: 80px;
          height: 80px;
          top: -30px;
          right: 25px;
        }

        /* Traffic legend */
        .traffic-legend {
          position: absolute;
          bottom: 70px;
          right: 10px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          padding: 8px;
          z-index: 10;
          font-size: 12px;
        }

        .traffic-legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .traffic-legend-color {
          width: 16px;
          height: 4px;
          margin-right: 8px;
          border-radius: 2px;
        }

        .traffic-light {
          background-color: #22c55e;
        }

        .traffic-moderate {
          background-color: #f59e0b;
        }

        .traffic-heavy {
          background-color: #ef4444;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideInUp 0.3s ease-out;
        }

        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        /* Route card styles */
        .route-card {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .route-card:hover {
          border-color: #0ea5e9;
          background-color: #f0f9ff;
        }

        .route-card.selected {
          border-color: #0ea5e9;
          background-color: #e0f2fe;
        }

        .route-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .route-card-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .route-traffic-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .route-traffic-light {
          background-color: #22c55e;
        }

        .route-traffic-moderate {
          background-color: #f59e0b;
        }

        .route-traffic-heavy {
          background-color: #ef4444;
        }
      `
      document.head.appendChild(style)
    }

    // Initialize OpenLayers map
    if (!mapContainerRef.current || mapRef.current) return

    // Standard OSM layer
    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: true,
    })

    // Satellite layer
    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attributions: "Tiles © Esri",
        maxZoom: 19,
      }),
      visible: false,
    })

    // Humanitarian layer (better for buildings)
    const humanitarianLayer = new TileLayer({
      source: new XYZ({
        url: "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        attributions: "© OpenStreetMap contributors, Humanitarian OpenStreetMap Team",
        maxZoom: 19,
      }),
      visible: false,
    })

    // Create vector source and layer for route
    const routeSource = new VectorSource()
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: new Style({
        stroke: new Stroke({
          color: "#0ea5e9",
          width: 6,
        }),
      }),
      zIndex: 10,
    })
    routeLayerRef.current = routeLayer

    // Create vector source and layer for alternative routes
    const alternativeRoutesSource = new VectorSource()
    const alternativeRoutesLayer = new VectorLayer({
      source: alternativeRoutesSource,
      style: (feature) => {
        const trafficLevel = feature.get("trafficLevel")
        const isSelected = feature.get("selected")

        let color = "#22c55e" // Light traffic (green)
        if (trafficLevel === "moderate") {
          color = "#f59e0b" // Moderate traffic (amber)
        } else if (trafficLevel === "heavy") {
          color = "#ef4444" // Heavy traffic (red)
        }

        return new Style({
          stroke: new Stroke({
            color: color,
            width: isSelected ? 6 : 4,
            lineDash: isSelected ? undefined : [6, 6],
          }),
          text: isSelected
            ? new Text({
                text: feature.get("name"),
                font: "12px Calibri,sans-serif",
                fill: new Fill({
                  color: "#000",
                }),
                stroke: new Stroke({
                  color: "#fff",
                  width: 3,
                }),
                offsetY: -10,
              })
            : undefined,
        })
      },
      zIndex: 9,
    })
    alternativeRoutesLayerRef.current = alternativeRoutesLayer

    // Create vector source and layer for buildings
    const buildingsSource = new VectorSource()
    const buildingsLayer = new VectorLayer({
      source: buildingsSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(120, 120, 120, 0.4)",
        }),
        stroke: new Stroke({
          color: "#555",
          width: 1,
        }),
      }),
      zIndex: 5,
    })
    buildingsLayerRef.current = buildingsLayer

    // Create vector source and layer for traffic
    const trafficSource = new VectorSource()
    const trafficLayer = new VectorLayer({
      source: trafficSource,
      style: (feature) => {
        const trafficLevel = feature.get("trafficLevel")
        let color = "#22c55e" // Light traffic (green)
        let width = 4

        if (trafficLevel === "moderate") {
          color = "#f59e0b" // Moderate traffic (amber)
          width = 5
        } else if (trafficLevel === "heavy") {
          color = "#ef4444" // Heavy traffic (red)
          width = 6
        }

        return new Style({
          stroke: new Stroke({
            color: color,
            width: width,
          }),
        })
      },
      zIndex: 9,
      visible: true,
    })
    trafficLayerRef.current = trafficLayer

    // Create weather overlay
    const weatherOverlayElement = document.createElement("div")
    weatherOverlayElement.className = "weather-overlay"
    mapContainerRef.current?.appendChild(weatherOverlayElement)
    weatherOverlayRef.current = weatherOverlayElement

    // Create vector source and layer for markers
    const markersSource = new VectorSource()
    const markersLayer = new VectorLayer({
      source: markersSource,
      zIndex: 20,
    })

    // Create the map
    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        osmLayer,
        satelliteLayer,
        humanitarianLayer,
        buildingsLayer,
        alternativeRoutesLayer,
        trafficLayer,
        routeLayer,
        markersLayer,
      ],
      view: new View({
        center: fromLonLat([providerLocation.lng, providerLocation.lat]),
        zoom: 16,
      }),
      controls: [],
    })

    // Create car marker element
    const carMarkerElement = document.createElement("div")
    carMarkerElement.className = "car-marker"
    const carDirection = document.createElement("div")
    carDirection.className = "car-direction"
    carMarkerElement.appendChild(carDirection)
    const carMarkerInner = document.createElement("div")
    carMarkerInner.className = "car-marker-inner"
    carMarkerElement.appendChild(carMarkerInner)
    carMarkerElementRef.current = carMarkerElement

    // Create car marker overlay
    const carMarkerOverlay = new Overlay({
      element: carMarkerElement,
      positioning: "center-center",
      stopEvent: false,
    })
    map.addOverlay(carMarkerOverlay)
    carMarkerOverlay.setPosition(fromLonLat([providerLocation.lng, providerLocation.lat]))

    // Create customer marker element
    const customerMarkerElement = document.createElement("div")
    customerMarkerElement.className = "customer-marker"

    // Create customer marker overlay
    const customerMarkerOverlay = new Overlay({
      element: customerMarkerElement,
      positioning: "center-center",
      stopEvent: false,
    })
    map.addOverlay(customerMarkerOverlay)
    customerMarkerOverlay.setPosition(fromLonLat([customerLocationCoords.lng, customerLocationCoords.lat]))

    // Add navigation overlay
    const navigationOverlay = document.createElement("div")
    navigationOverlay.className = "navigation-overlay"
    navigationOverlay.innerHTML = `
      <div class="direction-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5"></path>
          <path d="m5 12 7-7 7 7"></path>
        </svg>
      </div>
      <div>
        <div class="direction-text">Continue straight</div>
        <div class="distance-text">1.2 km</div>
      </div>
    `
    mapContainerRef.current?.appendChild(navigationOverlay)
    navigationOverlayRef.current = navigationOverlay

    // Add traffic legend
    const trafficLegend = document.createElement("div")
    trafficLegend.className = "traffic-legend"
    trafficLegend.innerHTML = `
      <div class="traffic-legend-item">
        <div class="traffic-legend-color traffic-light"></div>
        <span>Light Traffic</span>
      </div>
      <div class="traffic-legend-item">
        <div class="traffic-legend-color traffic-moderate"></div>
        <span>Moderate Traffic</span>
      </div>
      <div class="traffic-legend-item">
        <div class="traffic-legend-color traffic-heavy"></div>
        <span>Heavy Traffic</span>
      </div>
    `
    mapContainerRef.current?.appendChild(trafficLegend)

    // Add click handler for buildings
    map.on("click", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature)

      if (feature instanceof Feature && feature.get("type") === "building") {
        showBuildingPopup(feature, evt.coordinate)
      }
    })

    mapRef.current = map

    // Fetch buildings for the initial view
    fetchBuildingsAndPOIs(map.getView().calculateExtent(map.getSize()))

    // Initialize route and simulation
    initializeRouteAndSimulation()

    setIsMapLoaded(true)

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined)
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

  // Update weather effects when weather type changes
  useEffect(() => {
    if (weatherOverlayRef.current && showWeather) {
      updateWeatherEffects()
    } else if (weatherOverlayRef.current) {
      weatherOverlayRef.current.innerHTML = ""
    }

    return () => {
      if (weatherAnimationRef.current) {
        cancelAnimationFrame(weatherAnimationRef.current)
        weatherAnimationRef.current = null
      }
    }
  }, [currentWeather, showWeather])

  // Create weather effects
  const updateWeatherEffects = () => {
    if (!weatherOverlayRef.current) return

    // Clear previous weather effects
    weatherOverlayRef.current.innerHTML = ""

    if (!showWeather || currentWeather === "clear") return

    if (currentWeather === "rain") {
      const rainContainer = document.createElement("div")
      rainContainer.className = "rain-container"
      weatherOverlayRef.current.appendChild(rainContainer)

      // Create raindrops
      for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement("div")
        raindrop.className = "raindrop"
        raindrop.style.left = `${Math.random() * 100}%`
        raindrop.style.animationDelay = `${Math.random() * 2}s`
        rainContainer.appendChild(raindrop)
      }
    } else if (currentWeather === "snow") {
      const snowContainer = document.createElement("div")
      snowContainer.className = "snow-container"
      weatherOverlayRef.current.appendChild(snowContainer)

      // Create snowflakes
      for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement("div")
        snowflake.className = "snowflake"
        snowflake.style.left = `${Math.random() * 100}%`
        snowflake.style.animationDelay = `${Math.random() * 10}s`
        snowflake.style.opacity = `${0.5 + Math.random() * 0.5}`
        snowflake.style.width = `${5 + Math.random() * 5}px`
        snowflake.style.height = `${5 + Math.random() * 5}px`
        snowContainer.appendChild(snowflake)
      }
    } else if (currentWeather === "storm") {
      const stormContainer = document.createElement("div")
      stormContainer.className = "storm-container"
      weatherOverlayRef.current.appendChild(stormContainer)

      // Create lightning
      const lightning = document.createElement("div")
      lightning.className = "lightning"
      stormContainer.appendChild(lightning)

      stormContainer.className = "storm-container"
      weatherOverlayRef.current.appendChild(stormContainer)

      // Create lightning
      const lightningElement = document.createElement("div")
      lightningElement.className = "lightning"
      stormContainer.appendChild(lightningElement)

      // Create raindrops
      for (let i = 0; i < 150; i++) {
        const raindrop = document.createElement("div")
        raindrop.className = "raindrop"
        raindrop.style.left = `${Math.random() * 100}%`
        raindrop.style.animationDelay = `${Math.random() * 2}s`
        stormContainer.appendChild(raindrop)
      }
    } else if (currentWeather === "cloudy") {
      const cloudyContainer = document.createElement("div")
      cloudyContainer.className = "cloudy-container"
      weatherOverlayRef.current.appendChild(cloudyContainer)

      // Create clouds
      for (let i = 0; i < 3; i++) {
        const cloud = document.createElement("div")
        cloud.className = "cloud"
        cloud.style.top = `${10 + Math.random() * 30}%`
        cloud.style.animationDelay = `${Math.random() * 15}s`
        cloud.style.opacity = `${0.6 + Math.random() * 0.4}`
        cloud.style.transform = `scale(${0.8 + Math.random() * 0.4})`
        cloudyContainer.appendChild(cloud)
      }
    }
  }

  // Fetch buildings and POIs using Overpass API
  const fetchBuildingsAndPOIs = async (extent: number[]) => {
    if (!mapRef.current || !buildingsLayerRef.current) return

    // Convert extent to geographic coordinates
    const bottomLeft = toLonLat([extent[0], extent[1]])
    const topRight = toLonLat([extent[2], extent[3]])

    // Create bounding box for Overpass API
    const bbox = `${bottomLeft[1]},${bottomLeft[0]},${topRight[1]},${topRight[0]}`

    try {
      // Fetch buildings using Overpass API (removed POIs from query)
      const query = `
      [out:json];
      (
        way["building"](${bbox});
      );
      out body;
      >;
      out skel qt;
    `

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      })

      const data = await response.json()

      // Clear existing features
      buildingsLayerRef.current.getSource()?.clear()

      // Process buildings and POIs
      const nodes: Record<string, any> = {}
      data.elements.forEach((element: any) => {
        if (element.type === "node") {
          nodes[element.id] = element
        }
      })

      data.elements.forEach((element: any) => {
        if (element.type === "way" && element.tags && element.tags.building) {
          // Process building
          const coordinates = element.nodes.map((nodeId: string) => {
            const node = nodes[nodeId]
            return fromLonLat([node.lon, node.lat])
          })

          if (coordinates.length > 2) {
            const buildingFeature = new Feature({
              geometry: new LineString(coordinates),
              type: "building",
              name: element.tags.name || "Building",
              building_type: element.tags.building,
              address: element.tags["addr:street"]
                ? `${element.tags["addr:housenumber"] || ""} ${element.tags["addr:street"]}`
                : "",
              levels: element.tags.levels || "1",
              id: element.id,
            })

            buildingsLayerRef.current?.getSource()?.addFeature(buildingFeature)
          }
        }
      })
    } catch (error) {
      console.error("Error fetching buildings:", error)
    }
  }

  // Generate multiple routes with traffic data
  const generateMultipleRoutes = async (
    start: { lng: number; lat: number },
    end: { lng: number; lat: number },
  ): Promise<Route[]> => {
    try {
      // Get the main route first
      const mainRouteCoords = await getRouteCoordinates(start, end)

      if (!mainRouteCoords || mainRouteCoords.length === 0) {
        throw new Error("Failed to get main route")
      }

      // Create the main route
      const mainRoute: Route = {
        id: "route-1",
        name: "Main Route",
        distance: calculateTotalDistance(mainRouteCoords),
        duration: Math.ceil((calculateTotalDistance(mainRouteCoords) / 30) * 60),
        trafficLevel: "moderate",
        coordinates: mainRouteCoords,
      }

      // Create alternative routes by modifying the main route
      // Only create 2 alternatives that are more realistic
      const alternativeRoutes: Route[] = [
        {
          id: "route-2",
          name: "Fastest Route",
          distance: mainRoute.distance * 1.15, // 15% longer
          duration: mainRoute.duration * 0.85, // 15% faster
          trafficLevel: "light",
          coordinates: modifyRoute(mainRouteCoords, 0.08, false), // Slight modification
        },
        {
          id: "route-3",
          name: "Shortest Route",
          distance: mainRoute.distance * 0.9, // 10% shorter
          duration: mainRoute.duration * 1.2, // 20% slower
          trafficLevel: "heavy",
          coordinates: modifyRoute(mainRouteCoords, 0.12, true), // More modification
        },
      ]

      return [mainRoute, ...alternativeRoutes]
    } catch (error) {
      console.error("Error generating multiple routes:", error)
      return []
    }
  }

  // Helper function to modify route coordinates for alternative routes
  const modifyRoute = (
    originalCoords: [number, number][],
    deviationFactor: number,
    oppositeDirection = false,
  ): [number, number][] => {
    if (originalCoords.length < 3) return originalCoords

    const result: [number, number][] = []

    // Keep start and end points the same
    result.push(originalCoords[0])

    // Only modify a subset of points to create a more natural alternative route
    // This creates a route that diverges from the original at certain points
    const modificationStartIndex = Math.floor(originalCoords.length * 0.2) // Start modifying at 20% of the route
    const modificationEndIndex = Math.floor(originalCoords.length * 0.8) // End modifying at 80% of the route

    for (let i = 1; i < originalCoords.length - 1; i++) {
      const point = originalCoords[i]

      // Only modify points in the middle section of the route
      if (i >= modificationStartIndex && i <= modificationEndIndex) {
        const prevPoint = originalCoords[i - 1]

        // Calculate perpendicular vector for deviation
        const dx = point[0] - prevPoint[0]
        const dy = point[1] - prevPoint[1]

        // Perpendicular vector
        let perpX = -dy
        let perpY = dx

        // Normalize
        const length = Math.sqrt(perpX * perpX + perpY * perpY)
        if (length > 0) {
          perpX /= length
          perpY /= length
        }

        // Apply consistent deviation to create a smoother alternative route
        // Use sine wave to create natural-looking curves
        const wavePosition = (i - modificationStartIndex) / (modificationEndIndex - modificationStartIndex)
        const waveAmplitude = Math.sin(wavePosition * Math.PI) * deviationFactor
        const direction = oppositeDirection ? -1 : 1

        const newPoint: [number, number] = [
          point[0] + perpX * waveAmplitude * direction,
          point[1] + perpY * waveAmplitude * direction,
        ]

        result.push(newPoint)
      } else {
        // Keep original points at the beginning and end of the route
        result.push(point)
      }
    }

    // Add end point
    result.push(originalCoords[originalCoords.length - 1])

    return result
  }

  // Calculate total distance of a route
  const calculateTotalDistance = (coordinates: [number, number][]): number => {
    let totalDistance = 0

    for (let i = 0; i < coordinates.length - 1; i++) {
      totalDistance += calculateDistance(
        coordinates[i][0],
        coordinates[i][1],
        coordinates[i + 1][0],
        coordinates[i + 1][1],
      )
    }

    return totalDistance
  }

  // Show building popup
  const showBuildingPopup = (feature: Feature, coordinate: number[]) => {
    // Remove any existing popup
    const existingPopup = document.querySelector(".building-popup")
    if (existingPopup) {
      existingPopup.remove()
    }

    // Create popup element
    const popup = document.createElement("div")
    popup.className = "building-popup"
    popup.innerHTML = `
      <div class="building-popup-close">×</div>
      <h4>${feature.get("name") || "Building"}</h4>
      <p><strong>Type:</strong> ${feature.get("building_type") || "Unknown"}</p>
      ${feature.get("address") ? `<p><strong>Address:</strong> ${feature.get("address")}</p>` : ""}
      <p><strong>Levels:</strong> ${feature.get("levels") || "1"}</p>
    `

    // Add close button handler
    const closeButton = popup.querySelector(".building-popup-close")
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        popup.remove()
      })
    }

    // Position popup
    popup.style.left = `${coordinate[0]}px`
    popup.style.top = `${coordinate[1]}px`

    // Add to map container
    mapContainerRef.current?.appendChild(popup)
  }

  const initializeRouteAndSimulation = async () => {
    if (!mapRef.current) return

    // Generate multiple routes
    const routes = await generateMultipleRoutes(providerLocation, customerLocationCoords)
    setAvailableRoutes(routes)

    if (routes.length > 0) {
      // Select the first route by default
      setSelectedRouteId(routes[0].id)
      currentRouteRef.current = routes[0].coordinates

      // Draw all routes
      drawAllRoutes(routes, routes[0].id)

      calculateRealisticETA(providerLocation, customerLocationCoords)

      // Start the simulation
      setTimeout(() => {
        simulateProviderMovement()
      }, 1000)
    }
  }

  const drawAllRoutes = (routes: Route[], selectedRouteId: string) => {
    if (!mapRef.current || !alternativeRoutesLayerRef.current || !routeLayerRef.current) return

    // Clear existing routes
    alternativeRoutesLayerRef.current.getSource()?.clear()
    routeLayerRef.current.getSource()?.clear()

    // Draw all routes
    routes.forEach((route) => {
      const olCoords = route.coordinates.map((coord) => fromLonLat(coord))

      const routeFeature = new Feature({
        geometry: new LineString(olCoords),
        name: route.name,
        trafficLevel: route.trafficLevel,
        selected: route.id === selectedRouteId,
      })

      alternativeRoutesLayerRef.current?.getSource()?.addFeature(routeFeature)
    })

    // Draw the selected route on top
    const selectedRoute = routes.find((r) => r.id === selectedRouteId)
    if (selectedRoute) {
      const olCoords = selectedRoute.coordinates.map((coord) => fromLonLat(coord))

      const selectedRouteFeature = new Feature({
        geometry: new LineString(olCoords),
      })

      routeLayerRef.current.getSource()?.addFeature(selectedRouteFeature)
    }
  }

  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId)

    const selectedRoute = availableRoutes.find((r) => r.id === routeId)
    if (selectedRoute) {
      currentRouteRef.current = selectedRoute.coordinates
      currentPointIndexRef.current = 0

      // Update ETA based on the selected route
      setEstimatedTime(selectedRoute.duration)

      // Redraw routes
      drawAllRoutes(availableRoutes, routeId)

      // Reset and restart simulation
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current)
      }

      simulateProviderMovement()
    }
  }

  const getRouteCoordinates = async (
    start: { lng: number; lat: number },
    end: { lng: number; lat: number },
  ): Promise<[number, number][]> => {
    try {
      // Using OSRM (Open Source Routing Machine) for routing
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates as [number, number][]
      }

      // Fallback to a simple straight line
      return [
        [start.lng, start.lat],
        [end.lng, end.lat],
      ]
    } catch (error) {
      console.error("Error fetching route:", error)
      // Fallback to a simple straight line
      return [
        [start.lng, start.lat],
        [end.lng, end.lat],
      ]
    }
  }

  const calculateDistance = (lon1: number, lat1: number, lon2: number, lat2: number): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }

  const calculateBearing = (lon1: number, lat1: number, lon2: number, lat2: number): number => {
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180)
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon)
    const bearing = (Math.atan2(y, x) * 180) / Math.PI
    return (bearing + 360) % 360
  }

  const simulateProviderMovement = () => {
    if (!mapRef.current || !carMarkerElementRef.current) return

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
        setSimulationComplete(true)
        setShowSuccessModal(true)
        return
      }

      if (isMovingRef.current) {
        const currentPoint = routePoints[currentPointIndexRef.current]
        const nextPointIndex = Math.min(currentPointIndexRef.current + 1, routePoints.length - 1)
        const nextPoint = routePoints[nextPointIndex]

        // Calculate bearing between current and next point
        const newBearing = calculateBearing(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1])

        // Update car marker position
        const olCoord = fromLonLat(currentPoint)
        const overlay = mapRef.current
          ?.getOverlays()
          .getArray()
          .find((overlay) => overlay.getElement() === carMarkerElementRef.current)
        if (overlay) {
          overlay.setPosition(olCoord)
        }

        // Rotate the car marker
        if (carMarkerElementRef.current) {
          carMarkerElementRef.current.style.transform = `rotate(${newBearing}deg)`
        }

        // Update map view to follow car
        mapRef.current?.getView().animate({
          center: olCoord,
          duration: 300,
        })

        // Update navigation instructions
        updateNavigationInstructions(currentPointIndexRef.current, routePoints)

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

      const movementDelay = 200 + Math.random() * 100
      simulationTimeoutRef.current = setTimeout(moveProvider, movementDelay)
    }

    moveProvider()
  }

  const calculateRemainingDistance = (routePoints: [number, number][], currentIndex: number): number => {
    let distance = 0

    for (let i = currentIndex; i < routePoints.length - 1; i++) {
      distance += calculateDistance(routePoints[i][0], routePoints[i][1], routePoints[i + 1][0], routePoints[i + 1][1])
    }

    return distance
  }

  const calculateRealisticETA = async (from: { lng: number; lat: number }, to: { lng: number; lat: number }) => {
    try {
      // Using OSRM for ETA calculation
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`,
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        const durationInSeconds = data.routes[0].duration
        const durationInMinutes = Math.ceil(durationInSeconds / 60)
        setEstimatedTime(durationInMinutes)
      }
    } catch (error) {
      console.error("Error calculating ETA:", error)
      const distance = calculateDistance(from.lng, from.lat, to.lng, to.lat)
      const estimatedMinutes = Math.ceil((distance / 30) * 60)
      setEstimatedTime(estimatedMinutes)
    }
  }

  const updateNavigationInstructions = (currentIndex: number, routePoints: [number, number][]) => {
    if (currentIndex >= routePoints.length - 2) {
      setNextDirection("Arriving at destination")
      updateDirectionUI("Arriving at destination", "You have arrived")
      return
    }

    // Calculate the distance to the next point
    const currentPoint = routePoints[currentIndex]
    const nextPoint = routePoints[currentIndex + 1]
    const distance = calculateDistance(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1])

    // If we're far enough in the route, look ahead to determine turns
    if (currentIndex < routePoints.length - 3) {
      const futurePoint = routePoints[currentIndex + 2]
      const currentBearing = calculateBearing(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1])
      const nextBearing = calculateBearing(nextPoint[0], nextPoint[1], futurePoint[0], futurePoint[1])
      const bearingDiff = ((nextBearing - currentBearing + 540) % 360) - 180

      let direction = "Continue straight"

      if (bearingDiff > 30 && bearingDiff < 150) {
        direction = "Turn right"
      } else if (bearingDiff < -30 && bearingDiff > -150) {
        direction = "Turn left"
      } else if (Math.abs(bearingDiff) >= 150) {
        direction = "Make a U-turn"
      }

      setNextDirection(direction)
      updateDirectionUI(direction, `${(distance * 1000).toFixed(0)} m`)
    } else {
      setNextDirection("Continue straight")
      updateDirectionUI("Continue straight", `${(distance * 1000).toFixed(0)} m`)
    }
  }

  const updateDirectionUI = (direction: string, distance: string) => {
    if (!navigationOverlayRef.current) return

    let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5"></path>
    <path d="m5 12 7-7 7 7"></path>
  </svg>`

    if (direction.includes("right")) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>`
    } else if (direction.includes("left")) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5"></path>
        <path d="m12 19-7-7 7-7"></path>
      </svg>`
    } else if (direction.includes("U-turn")) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14"></path>
        <path d="m19 12-7 7-7-7"></path>
      </svg>`
    } else if (direction.includes("Arriving")) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>`
    }

    navigationOverlayRef.current.innerHTML = `
      <div class="direction-icon">
        ${iconSvg}
      </div>
      <div>
        <div class="direction-text">${direction}</div>
        <div class="distance-text">${distance}</div>
      </div>
    `
  }

  const handleReportClick = () => {
    setShowReportOptions(!showReportOptions)
  }

  const handleReportOptionSelect = (option: ReportType) => {
    setSelectedReport(option)
  }

  const handleReportSubmit = () => {
    if (selectedReport) {
      // In a real app, you would send this report to your backend
      console.log(`Reported: ${selectedReport}`)
      setReportSubmitted(true)
      setActiveIncident(selectedReport)
      setShowReportOptions(false)
    }
  }

  const handleResolveIncident = () => {
    // In a real app, you would send this resolution to your backend
    console.log(`Resolved incident: ${activeIncident}`)
    setActiveIncident(null)
    setReportSubmitted(false)
  }

  const toggleTraffic = () => {
    if (trafficLayerRef.current) {
      const newState = !showTraffic
      setShowTraffic(newState)
      trafficLayerRef.current.setVisible(newState)
    }
  }

  const handleCompleteService = () => {
    setShowCompletionModal(true)
  }

  const handleSubmitCompletion = () => {
    // Calculate total
    const travelCost = 350 // Example travel cost
    const total = laborCost + partsCost + travelCost - previousBookingSummary.discount

    // Create booking summary
    const newBookingSummary: BookingSummary = {
      serviceType: "Emergency Repair",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")} - ${new Date().getHours() + 2}:${String(new Date().getMinutes()).padStart(2, "0")}`,
      location: customerLocation,
      laborCost: laborCost,
      partsCost: partsCost,
      travelCost: travelCost,
      discount: previousBookingSummary.discount,
      total: total,
    }

    setBookingSummary(newBookingSummary)
    setShowCompletionModal(false)
    onSimulationComplete()
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const closeCompletionModal = () => {
    setShowCompletionModal(false)
  }

  // Success Modal Component
  const SuccessModal = () => {
    if (!showSuccessModal) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-lg font-medium">Destination Reached</h3>
            <button onClick={closeSuccessModal} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-black mb-2">You've Arrived!</h3>
            <p className="text-gray-600 mb-4">You have successfully reached {customerName}'s location.</p>
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-4 border border-gray-200">
              <div className="mb-2">
                <span className="font-medium">Customer:</span> {customerName}
              </div>
              <div className="mb-2">
                <span className="font-medium">Location:</span> {customerLocation}
              </div>
              <div className="mb-2">
                <span className="font-medium">Arrival Time:</span> {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={closeSuccessModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCompleteService}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Complete Service
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Completion Modal Component
  const CompletionModal = () => {
    if (!showCompletionModal) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: "700px" }}>
          <div className="modal-header">
            <h3 className="text-lg font-medium">Complete Service</h3>
            <button onClick={closeCompletionModal} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="modal-body">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left side - Input fields */}
              <div className="flex-1">
                <h4 className="font-medium mb-4">Service Details</h4>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Labor Cost (₱)</label>
                  <input
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parts Cost (₱)</label>
                  <input
                    type="number"
                    value={partsCost}
                    onChange={(e) => setPartsCost(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                    placeholder="Describe the service performed..."
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h4 className="font-medium mb-2">Previous Booking Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Service Type:</span>
                      <span>{previousBookingSummary.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{previousBookingSummary.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>₱{previousBookingSummary.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Cost breakdown */}
              <div className="flex-1">
                <h4 className="font-medium mb-4">Payment Summary</h4>

                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Labor Cost:</span>
                      <span className="font-medium">₱{laborCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Parts Cost:</span>
                      <span className="font-medium">₱{partsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Travel Cost:</span>
                      <span className="font-medium">₱350</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₱{(laborCost + partsCost + 350).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-medium text-green-600">
                        -₱{previousBookingSummary.discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-sky-700">
                        ₱{(laborCost + partsCost + 350 - previousBookingSummary.discount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-sky-600" />
                    Service Completion
                  </h4>
                  <p className="text-sm text-sky-800 mb-2">
                    By submitting this form, you confirm that the service has been completed successfully.
                  </p>
                  <p className="text-sm text-sky-800">
                    The customer will receive a notification with the service details and payment summary.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={closeCompletionModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitCompletion}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit & Complete
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Booking Summary Component
  const BookingSummaryComponent = () => {
    if (!bookingSummary) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: "700px" }}>
          <div className="modal-header">
            <h3 className="text-lg font-medium">Service Completed</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="modal-body">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left side - Service details */}
              <div className="flex-1">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">Service Successfully Completed!</h3>
                  <p className="text-gray-600">Thank you for providing your service to {customerName}.</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-sky-600" />
                    Service Details
                  </h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{bookingSummary.serviceType}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{bookingSummary.date}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{bookingSummary.time}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{bookingSummary.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Payment summary */}
              <div className="flex-1">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-sky-600" />
                    Payment Summary
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Labor:</span>
                      <span className="font-medium">₱{bookingSummary.laborCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Parts:</span>
                      <span className="font-medium">₱{bookingSummary.partsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Travel:</span>
                      <span className="font-medium">₱{bookingSummary.travelCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ₱
                        {(
                          bookingSummary.laborCost +
                          bookingSummary.partsCost +
                          bookingSummary.travelCost
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-medium text-green-600">-₱{bookingSummary.discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-sky-700">₱{bookingSummary.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-sky-50 p-4 rounded-lg border border-sky-100">
                  <h4 className="font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-sky-600" />
                    Next Steps
                  </h4>
                  <p className="text-sm text-sky-800">
                    A receipt has been sent to the customer's email. They can also view the service details in their
                    account.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="relative p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-center">Provider Tracking</h3>
        <p className="text-sm text-gray-500 text-center mt-1">You are on your way to the customer's location</p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Map */}
        <div className="w-3/5 h-[37rem] p-4 overflow-hidden">
          <div className="bg-gray-100 p-3 rounded-lg mb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{customerName}</h4>
                  <p className="text-gray-500 text-xs">Customer</p>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                    providerStatus === "moving" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  {simulationComplete ? "Arrived" : providerStatus === "moving" ? "Moving" : "Stopped"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{customerLocation}</span>
              </div>
              {!simulationComplete && (
                <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5 mr-1 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {estimatedTime} min{estimatedTime !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height: "calc(100% - 80px)" }}>
            <div className="relative w-full h-full">
              <div ref={mapContainerRef} className="w-full h-full bg-gray-200 relative">
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-4 border-t-sky-500 border-gray-200 rounded-full animate-spin mb-2"></div>
                      <p className="text-gray-500 text-sm">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="w-2/5 p-4 border-l border-gray-200 overflow-y-auto">
          <div className="space-y-4">
            {/* Map type section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-sky-500" />
                  Map Settings
                </h4>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      if (mapRef.current) {
                        const osmLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find((layer) => layer.get("source") instanceof OSM)
                        const satelliteLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ &&
                              layer.get("source").getUrls()?.[0]?.includes("Imagery"),
                          )
                        const humanitarianLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ && layer.get("source").getUrls()?.[0]?.includes("hot"),
                          )

                        if (osmLayer && satelliteLayer && humanitarianLayer) {
                          osmLayer.setVisible(true)
                          satelliteLayer.setVisible(false)
                          humanitarianLayer.setVisible(false)
                          setMapLayers("standard")
                        }
                      }
                    }}
                    className={`p-2 text-xs font-medium rounded ${
                      mapLayers === "standard"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => {
                      if (mapRef.current) {
                        const osmLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find((layer) => layer.get("source") instanceof OSM)
                        const satelliteLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ &&
                              layer.get("source").getUrls()?.[0]?.includes("Imagery"),
                          )
                        const humanitarianLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ && layer.get("source").getUrls()?.[0]?.includes("hot"),
                          )

                        if (osmLayer && satelliteLayer && humanitarianLayer) {
                          osmLayer.setVisible(false)
                          satelliteLayer.setVisible(true)
                          humanitarianLayer.setVisible(false)
                          setMapLayers("satellite")
                        }
                      }
                    }}
                    className={`p-2 text-xs font-medium rounded ${
                      mapLayers === "satellite"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Satellite
                  </button>
                  <button
                    onClick={() => {
                      if (mapRef.current) {
                        const osmLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find((layer) => layer.get("source") instanceof OSM)
                        const satelliteLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ &&
                              layer.get("source").getUrls()?.[0]?.includes("Imagery"),
                          )
                        const humanitarianLayer = mapRef.current
                          .getLayers()
                          .getArray()
                          .find(
                            (layer) =>
                              layer.get("source") instanceof XYZ && layer.get("source").getUrls()?.[0]?.includes("hot"),
                          )

                        if (osmLayer && satelliteLayer && humanitarianLayer) {
                          osmLayer.setVisible(false)
                          satelliteLayer.setVisible(false)
                          humanitarianLayer.setVisible(true)
                          setMapLayers("humanitarian")
                        }
                      }
                    }}
                    className={`p-2 text-xs font-medium rounded ${
                      mapLayers === "humanitarian"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Buildings
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    onClick={toggleTraffic}
                    className={`w-full p-2 text-xs font-medium rounded flex items-center justify-center ${
                      showTraffic ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {showTraffic ? "Hide Traffic" : "Show Traffic"}
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setShowBuildingDetails(!showBuildingDetails)
                      if (mapRef.current) {
                        fetchBuildingsAndPOIs(mapRef.current.getView().calculateExtent(mapRef.current.getSize()))
                      }
                    }}
                    className={`w-full p-2 text-xs font-medium rounded flex items-center justify-center ${
                      showBuildingDetails ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {showBuildingDetails ? "Building Details Active" : "Show Building Details"}
                  </button>
                </div>
              </div>
            </div>

            {/* Routes section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <RouteIcon className="h-4 w-4 mr-2 text-sky-500" />
                  Available Routes
                </h4>
              </div>
              <div className="p-3">
                {availableRoutes.length > 0 ? (
                  <div className="space-y-3">
                    {availableRoutes.map((route) => (
                      <div
                        key={route.id}
                        className={`route-card ${selectedRouteId === route.id ? "selected" : ""}`}
                        onClick={() => handleRouteSelect(route.id)}
                      >
                        <div className="route-card-header">
                          <div className="font-medium flex items-center">
                            <div
                              className={`route-traffic-indicator ${
                                route.trafficLevel === "light"
                                  ? "route-traffic-light"
                                  : route.trafficLevel === "moderate"
                                    ? "route-traffic-moderate"
                                    : "route-traffic-heavy"
                              }`}
                            ></div>
                            {route.name}
                          </div>
                          {selectedRouteId === route.id && (
                            <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">Selected</span>
                          )}
                        </div>
                        <div className="route-card-body text-sm text-gray-600">
                          <div>
                            <div>{route.distance.toFixed(1)} km</div>
                            <div>{route.duration} mins</div>
                          </div>
                          <div className="text-right">
                            <div
                              className={
                                route.trafficLevel === "light"
                                  ? "text-green-600"
                                  : route.trafficLevel === "moderate"
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }
                            >
                              {route.trafficLevel === "light"
                                ? "Light Traffic"
                                : route.trafficLevel === "moderate"
                                  ? "Moderate Traffic"
                                  : "Heavy Traffic"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">Loading routes...</div>
                )}
              </div>
            </div>

            {/* Status section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Journey Status</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    simulationComplete
                      ? "bg-green-100 text-green-700"
                      : providerStatus === "moving"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {simulationComplete ? "Arrived" : providerStatus === "moving" ? "En Route" : "Temporarily Stopped"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ETA:</span>
                <span className="text-sm font-medium">
                  {simulationComplete ? "Arrived" : `${estimatedTime} minutes remaining`}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">Next Direction:</span>
                <span className="text-sm font-medium text-sky-700">{nextDirection}</span>
              </div>
            </div>

            {/* Active incident section */}
            {activeIncident && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-amber-800 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Active Incident
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">{activeIncident}</p>
                  </div>
                  <button
                    onClick={handleResolveIncident}
                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 text-xs font-medium"
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
            )}

            {/* Report section */}
            {!activeIncident && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h4 className="font-medium text-gray-800">Report an Issue</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Let the customer know if you're experiencing any issues on your way.
                  </p>
                </div>

                {reportSubmitted ? (
                  <div className="p-4 bg-green-50 text-green-700 text-sm flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Report submitted successfully!
                  </div>
                ) : (
                  <div className="p-4">
                    {!showReportOptions ? (
                      <button
                        onClick={handleReportClick}
                        className="w-full flex items-center justify-center px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report an Issue
                      </button>
                    ) : (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Select an issue:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {reportOptions.map((option) => (
                            <div
                              key={option}
                              onClick={() => handleReportOptionSelect(option)}
                              className={`p-2 border rounded-lg cursor-pointer text-sm report-option ${
                                selectedReport === option ? "selected" : ""
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => setShowReportOptions(false)}
                            className="flex-1 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleReportSubmit}
                            disabled={!selectedReport}
                            className={`flex-1 py-2 rounded-lg text-white text-sm ${
                              selectedReport ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-300 cursor-not-allowed"
                            }`}
                          >
                            Submit Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Customer info */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-medium text-gray-800">Customer Information</h4>
              </div>
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h5 className="font-medium">{customerName}</h5>
                    <p className="text-sm text-gray-500 mt-1">{customerLocation}</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100">
                        Call
                      </button>
                      <button className="px-3 py-1 text-xs bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete button */}
            <button
              onClick={handleCompleteService}
              className={`w-full px-4 py-3 ${
                simulationComplete ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              } text-white rounded-lg transition-colors font-medium flex items-center justify-center`}
              disabled={!simulationComplete}
            >
              {simulationComplete ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Complete Service
                </>
              ) : (
                "Waiting to arrive..."
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SuccessModal />
      <CompletionModal />
      {bookingSummary && <BookingSummaryComponent />}
    </div>
  )
}