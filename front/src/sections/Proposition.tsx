import LoadingScreen from "../sections/Styles/LoadingScreen"
import { Calendar, MapPin, Search, Users, ChevronDown } from "lucide-react"

function Proposition() {
  return (
    <>
      {/* Loading Animation */}
      <LoadingScreen />

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src="https://cdn.pixabay.com/photo/2023/10/12/17/56/after-the-rain-8311416_1280.jpg"
          alt="Tropical resort with overwater bungalows at sunset"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />

        {/* Navigation Bar */}
        <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
          <div className="flex items-center gap-3">
            <button className="text-white p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span
              className="text-white font-bold text-xl"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
              }}
            >
              TOURGO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="bg-transparent text-white px-4 py-1.5 rounded-full border border-white/20"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
            >
              Register
            </a>
          </div>
        </header>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
          <h1
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mb-16"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
          >
            Weaving your dreams into the unforgettable adventures
          </h1>

          {/* Search Form */}
          <div
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-4xl"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Location */}
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
                <MapPin className="text-white h-5 w-5" />
                <div className="flex flex-col">
                  <label className="text-white/70 text-xs">Location</label>
                  <input
                    type="text"
                    placeholder="All Destinations"
                    className="bg-transparent text-white border-none outline-none text-sm"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
                  />
                </div>
              </div>

              {/* Date */}
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
                <Calendar className="text-white h-5 w-5" />
                <div className="flex flex-col">
                  <label className="text-white/70 text-xs">Date</label>
                  <input
                    type="text"
                    placeholder="Sunday, 21 Aug 2023"
                    className="bg-transparent text-white border-none outline-none text-sm"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
                <Users className="text-white h-5 w-5" />
                <div className="flex flex-col flex-1">
                  <label className="text-white/70 text-xs">Guest</label>
                  <input
                    type="text"
                    placeholder="2 Persons"
                    className="bg-transparent text-white border-none outline-none text-sm"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
                  />
                </div>
                <button className="bg-blue-500 rounded-full p-2">
                  <Search className="text-white h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Social Links - Repositioned to center right */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-4">
            <a href="#" className="bg-white/10 rounded-full p-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="bg-white/10 rounded-full p-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="bg-white/10 rounded-full p-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="bg-white/10 rounded-full p-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>

          {/* Keep Scrolling - Bottom Left */}
          <div className="absolute bottom-8 left-8 flex flex-col items-center text-white">
            <span
              className="text-sm mb-2"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
            >
              Keep scrolling
            </span>
            <ChevronDown className="animate-bounce w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Proposition
