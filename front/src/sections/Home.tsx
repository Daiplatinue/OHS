import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"

import Header from "./Styles/Header"
import Footer from "../sections/Styles/Footer"

import WorkersModal from "./Styles/WorkersModal"
import SponsorMarquee from "./Styles/SponsorMarquee"
import ServiceShowcase from "./Styles/ServiceShowcase"
import MyFloatingDockCustomer from "./Styles/MyFloatingDock-Customer"

import image1 from "../assets/Collaborative Workspace.jpeg"
import image2 from "../assets/Sleek Black Sports Car on Highway.jpeg"
import image3 from "../assets/Professional Construction Supervisor.jpeg"

import PromoBanner from "./Styles/PromoBanner"
import ServiceBanner from "./Styles/ServiceBanner"
import ServicesPromote from "./Styles/ServicesPromote"

import qimg1 from "../assets/servcies.jpeg"
import qimg2 from "../assets/Vibrant Circus Tent.jpeg"
import qimg3 from "../assets/Modern Minimalist Café.jpeg"
import qimg4 from "../assets/Young Man with Corded Telephone.jpeg"
import qimg5 from "../assets/Hands Holding Pill.jpeg"

import LegalText from "./Styles/LegalText"

const sellers = {
  "Plumbing Services": [
    {
      id: 1,
      name: "PipeFix Pros",
      rating: 4,
      reviews: 1250,
      location: "New York",
      startingRate: 1500,
      ratePerKm: 25,
      badges: ["hot", "top"],
      description:
        "Expert plumbing solutions with 24/7 emergency service. Specializing in leak repairs, pipe installations, and drain cleaning.",
    },
    {
      id: 2,
      name: "LeakBusters",
      rating: 5,
      reviews: 2100,
      location: "Los Angeles",
      startingRate: 1800,
      ratePerKm: 30,
      badges: ["in demand"],
      description:
        "Premium plumbing services with guaranteed satisfaction. Our certified technicians handle everything from minor repairs to major installations.",
    },
    {
      id: 3,
      name: "DrainMasters",
      rating: 4,
      reviews: 890,
      location: "Chicago",
      startingRate: 1200,
      ratePerKm: 20,
      badges: [],
      description:
        "Affordable drain cleaning and plumbing maintenance. We use the latest equipment to ensure lasting results.",
    },
  ],
  "Handyman Services": [
    {
      id: 4,
      name: "FixIt All",
      rating: 5,
      reviews: 3200,
      location: "San Francisco",
      startingRate: 1000,
      ratePerKm: 15,
      badges: ["hot", "in demand"],
      description:
        "Comprehensive handyman services for all your home repair needs. From furniture assembly to drywall repair and more.",
    },
    {
      id: 5,
      name: "HandyHelpers",
      rating: 4,
      reviews: 1500,
      location: "Seattle",
      startingRate: 950,
      ratePerKm: 18,
      badges: ["top"],
      description:
        "Reliable handyman services with attention to detail. We take pride in our craftsmanship and customer satisfaction.",
    },
  ],
  "Home Cleaning Services": [
    {
      id: 6,
      name: "SparkleClean",
      rating: 5,
      reviews: 4200,
      location: "Boston",
      startingRate: 2500,
      ratePerKm: 20,
      badges: ["hot", "top", "in demand"],
      description:
        "Premium home cleaning services using eco-friendly products. Deep cleaning, regular maintenance, and special event preparation.",
    },
    {
      id: 7,
      name: "FreshSpaces",
      rating: 4,
      reviews: 2800,
      location: "Miami",
      startingRate: 2200,
      ratePerKm: 22,
      badges: ["hot"],
      description:
        "Thorough home cleaning services customized to your needs. We focus on the details that others miss.",
    },
    {
      id: 8,
      name: "CleanSweep",
      rating: 3,
      reviews: 950,
      location: "Houston",
      startingRate: 1800,
      ratePerKm: 15,
      badges: [],
      description:
        "Affordable cleaning services for homes of all sizes. Regular cleaning, deep cleaning, and move-in/move-out services available.",
    },
  ],
  "Pest Control Services": [
    {
      id: 9,
      name: "BugBusters",
      rating: 5,
      reviews: 2700,
      location: "Denver",
      startingRate: 3500,
      ratePerKm: 35,
      badges: ["top", "in demand"],
      description:
        "Comprehensive pest control solutions for residential and commercial properties. We eliminate all types of pests with safe, effective methods.",
    },
    {
      id: 10,
      name: "PestAway",
      rating: 4,
      reviews: 1800,
      location: "Austin",
      startingRate: 3000,
      ratePerKm: 30,
      badges: ["hot"],
      description:
        "Eco-friendly pest control services with guaranteed results. We focus on prevention and elimination with minimal environmental impact.",
    },
  ],
}

const carouselItems = [
  {
    brand: "Rapid Response Team",
    title: "Dedicated Professionals, Ready to Serve",
    image: image1,
    buttonText: "Explore More",
  },
  {
    brand: "Speed, Precision, Excellence",
    title: "Luxury Service, Fast Solutions",
    image: image2,
    buttonText: "Explore More",
  },
  {
    brand: "Reliable & Fast Service",
    title: "Passionate Experts, Committed to Quality",
    image: image3,
    buttonText: "Explore More",
  },
]

const products = [
  {
    id: 1,
    name: "Plumbing Services",
    price: 8000,
    category: "Plumbing",
    image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    description:
      "Keep your water systems running smoothly with expert plumbing services, from leak repairs to pipe installations.",
  },
  {
    id: 2,
    name: "Handyman Services",
    price: 5499,
    category: "Handyman",
    image: "https://cdn.pixabay.com/photo/2023/09/07/15/30/ai-generated-8239323_960_720.png",
    description:
      "Get quality home repairs and improvements at HandyGo's discounted rates—fast, affordable, and hassle-free.",
  },
  {
    id: 3,
    name: "Home Cleaning Services",
    price: 12000,
    category: "Cleaning",
    image: "https://cdn.pixabay.com/photo/2024/04/17/17/10/ai-generated-8702547_1280.jpg",
    description: "Enjoy a spotless, sanitized home with deep cleaning, carpet care, and move-in/move-out services.",
  },
  {
    id: 4,
    name: "Pest Control Services",
    price: 29000,
    category: "Pest Control",
    image: "https://cdn.pixabay.com/photo/2023/07/04/10/32/ai-generated-8106005_960_720.jpg",
    description: "Keep your space pest-free with expert extermination for termites, rodents, bed bugs, and more.",
  },
]

function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px",
    })

    document.querySelectorAll(".scroll-reveal").forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useScrollReveal()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const categories = Array.from(new Set(products.map((product) => product.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    return matchesSearch && matchesPrice && matchesCategory
  })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handlePriceChange = (value: number, index: number) => {
    setPriceRange((prev) => {
      const newRange = [...prev]
      newRange[index] = value
      return newRange as [number, number]
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 2000])
    setSelectedCategories([])
  }

  const handleSeeMore = (productName: string) => {
    setSelectedProduct(productName)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white/90">
      {/* Header with logo and search bar */}
      <Header />

      {/* Floating Dock */}
      <div className="z-40 flex">
        <MyFloatingDockCustomer />
      </div>

      {/* Hero Carousel */}
      <div className="relative">
        <div className="relative h-[600px] overflow-hidden mx-auto max-w-7xl mt-10 rounded-2xl">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-400">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-70 inset-0 flex items-center">
                <div className="ml-16 max-w-md">
                  <h3 className="text-white text-xl mb-2">{item.brand}</h3>
                  <h1 className="text-white text-4xl font-bold mb-8">{item.title}</h1>
                  <button className="bg-gradient-to-r from-gray-400 to-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white bg-black/20 rounded-full hover:bg-black/30 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white bg-black/20 rounded-full hover:bg-black/30 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sponsor Logos Marquee */}
      <SponsorMarquee />

      {/* Categories Section */}
      <div className="px-4 mt-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">More Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Category 1 */}
            <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer hover:shadow-lg transition-all duration-300">
              <img
                src={qimg1 || "/placeholder.svg"}
                alt="Organic Veggies"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-medium text-center text-white">Featured Services</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer hover:shadow-lg transition-all duration-300">
              <img
                src={qimg2 || "/placeholder.svg"}
                alt="Fresh Fruits"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-medium text-center text-white">Promotional Banners</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer hover:shadow-lg transition-all duration-300">
              <img
                src={qimg3 || "/placeholder.svg"}
                alt="Cold Drinks"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-medium text-center text-white">Rate Our Website</span>
              </div>
            </div>

            {/* Category 4 */}
            <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer hover:shadow-lg transition-all duration-300">
              <img
                src={qimg4 || "/placeholder.svg"}
                alt="Instant Food"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-medium text-center text-white">Contact Customer Services</span>
              </div>
            </div>

            {/* Category 5 */}
            <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer hover:shadow-lg transition-all duration-300">
              <img
                src={qimg5 || "/placeholder.svg"}
                alt="Dairy Products"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-medium text-center text-white">Donate / Sponsor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceShowcase />
      <PromoBanner />
      <ServiceBanner />
      <ServicesPromote />

      {/* Featured Products */}
      <div className="bg-white/90 text-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold scroll-reveal">Featured Services</h2>
              <p className="text-sm text-gray-500">Showing {filteredProducts.length} services</p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-4 items-center bg-gray-200/70 p-4 rounded-lg">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-full text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                  className="w-24 px-3 py-2 bg-white rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                  className="w-24 px-3 py-2 bg-white rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-gray-300 cursor-pointer"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Clear Filters */}
              {(searchQuery || priceRange[0] > 0 || priceRange[1] < 2000 || selectedCategories.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer bg-gray-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal hover-scale"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-black">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-16 line-clamp-3">{product.description}</p>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <span className="text-lg font-medium text-black">₱{product.price}</span>
                    <button
                      onClick={() => handleSeeMore(product.name)}
                      className="text-sky-500 flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
                    >
                      See More <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WorkersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedProduct}
        sellers={sellers[selectedProduct as keyof typeof sellers] || []}
      />

      <LegalText />

      <Footer />
    </div>
  )
}

export default App