import { useEffect, useState, useRef } from "react"
import { ChevronRight } from "lucide-react"

import LoadingScreen from "../sections/Styles/LoadingScreen"

function Proposition() {
  const [, setLoadingComplete] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true)
    }, 2500)

    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const services = [
    "PLUMBING",
    "HANDYMAN",
    "CLEANING",
    "REPAIR",
    "RENOVATION",
    "PEST CONTROL"
  ]

  return (
    <>
      {/* Loading Animation */}
      <LoadingScreen />

      <div className="bg-black text-white">
        {/* First Section - Hero */}
        <section
          ref={heroRef}
          className="relative min-h-screen bg-white bg-opacity-90 bg-[url('https://cdn.pixabay.com/photo/2017/04/05/17/45/girl-2205813_1280.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 bg-black/50 bg-opacity-70 mix-blend-multiply"></div>

          {/* Coordinates */}
          <div className="absolute top-100 left-4 text-[10px] font-mono text-yellow-400 opacity-60 md:text-xs">
            48°51'10.9"N
          </div>
          <div className="absolute top-100 right-4 text-[10px] font-mono text-yellow-400 opacity-60 md:text-xs">
            2°23'25.2"E
          </div>

          {/* Main headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-none">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <span className="block">FULL PRODUCTION</span>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <span className="block"><span className="text-sky-500">SERVICES</span> BASED</span>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <span className="block">IN PHILIPPINES</span>
                </div>
              </h1>

              {/* Play button */}
              <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <button className="group flex items-center space-x-3 mx-auto transition-all duration-300 hover:opacity-80">
                  <span className="uppercase tracking-widest text-sm font-medium text-yellow-400">Book now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-0 right-0 hidden md:block">
            <div className="container mx-auto px-8 flex justify-between items-center">
              <div></div> {/* Empty div for flex spacing */}
              <nav className="flex space-x-8 text-sm uppercase tracking-wider font-medium text-gray-400">
                <a href="#" className="hover:text-white transition-colors duration-300">Work</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Services</a>
                <a href="#" className="hover:text-white transition-colors duration-300">About</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
              </nav>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="flex flex-col items-center animate-bounce">
              <div className="w-1 h-12 bg-gradient-to-b from-transparent to-white opacity-30 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Second Section - Services */}
        <section className="relative min-h-screen bg-white py-16">
          <div className="container mx-auto px-8 flex justify-between items-center mb-12">
            <div className="relative">
              <h3 className="uppercase text-sm tracking-widest text-sky-500 font-bold">OUR SERVICES</h3>
            </div>
          </div>

          {/* Services List */}
          <div className="container mx-auto px-8">
            <div className="flex flex-col space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex items-center">
                    <h2 className={`text-2xl md:text-7xl font-bold text-gray-700 tracking-tight transition-all duration-300 ${hoveredService === index ? 'opacity-100' : 'opacity-60'}`}>
                      {service}
                    </h2>
                    <div className={`ml-4 transform transition-all duration-300 ${hoveredService === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-5 mt-16">
            <a
              href="#"
              className="inline-flex items-center group"
            >
              <span className="ml-4 uppercase text-sky-500 font-bold tracking-widest text-xs group-hover:underline">KNOW MORE</span>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default Proposition