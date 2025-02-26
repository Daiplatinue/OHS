import { Menu, MapPin, Star, Map } from 'lucide-react';

function HeroSection() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-4 md:px-13 py-7 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-white text-xl font-semibold">HandyGo</span>
        </div>
        <div className="flex justify-center flex-grow">
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white/80 hover:text-white text-sm">About</a>
            <a href="#" className="text-white/80 hover:text-white text-sm">Why Us</a>
            <a href="#" className="text-white/80 hover:text-white text-sm">Why HandyGo</a>
            <a href="#" className="text-white/80 hover:text-white text-sm">Meet Our Team</a>
            <a href="#" className="text-white/80 hover:text-white text-sm">Contact Us</a>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-white text-sm">Sign In</button>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium w-26">
            Sign up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 pt-12 flex flex-col md:flex-row justify-between">
        {/* Hero Text */}
        <div className="max-w-2xl ml-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Your Home<br />
            Our Expertise
          </h1>
          <p className="text-white/80 max-w-lg mb-8 text-sm">
            We bring professional home services right to your doorstep. From plumbing and electrical work to cleaning and repairs, our skilled experts ensure top-quality solutions with convenience and reliability. Book anytime, and let HandyGo take care of your home while you enjoy peace of mind.
          </p>
          <button className="text-white border border-white/20 px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center space-x-2">
            <span>Get to know</span>
            <span className="ml-2">→</span>
          </button>
          <div className="mt-auto pt-48 text-white/60 text-sm absolute bottom-[-9.5rem]">
            <span>01</span>
            <span className="ml-2">HandyGo - OHS</span>
          </div>
        </div>

        {/* Floating Card */}
        <div className="w-full max-w-md mt-10 md:mt-25 mr-0 md:mr-[-30rem] mt-[10rem]">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <Menu className="h-6 w-6" />
              <div className="flex space-x-4">
                <button className="hover:bg-white/10 px-4 py-2 rounded-full text-sm">Online Home Services | OHS</button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-white/60 text-sm">02</span>
              <span className="ml-2 text-white/60 text-sm">Trusted Solutions for Every Home.</span>
            </div>

            <h2 className="text-3xl font-bold mb-4">Efficient Appliance Repair</h2>
            <p className="text-white/80 mb-6 text-sm">The World's Top Home Service Platform</p>

            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-white/60">Alps, South-Central Europe, FR</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">9.5 / 10</span>
                  </div>
                  <div className="text-sm text-white/60">435, Alps</div>
                  <div className="text-xs text-white/40">Mountain</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">2.5M Rates</span>
                  </div>
                  <span className="text-xs text-white/40">Out of 1M+ reviews</span>
                  <button className="mt-4 bg-white/10 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Map className="h-4 w-4" />
                    <span className="text-sm">Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mr-0 md:mr-10 mt-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <Menu className="h-6 w-6" />
              <div className="flex space-x-4">
                <button className="hover:bg-white/10 px-4 py-2 rounded-full text-sm">Online Home Services | OHS</button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-white/60 text-sm">01</span>
              <span className="ml-2 text-white/60 text-sm">Trusted Solutions for Every Home.</span>
            </div>

            <h2 className="text-3xl font-bold mb-4">Reliable Home WiFi Setup</h2>
            <p className="text-white/80 mb-6 text-sm">The World's Top Home Service Platform</p>

            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-white/60">Alps, South-Central Europe, FR</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">9.8 / 10</span>
                  </div>
                  <div className="text-sm text-white/60">435, Alps</div>
                  <div className="text-xs text-white/40">Mountain</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">2.5M Rates</span>
                  </div>
                  <span className="text-xs text-white/40">Out of 1M+ reviews</span>
                  <button className="mt-4 bg-white/10 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Map className="h-4 w-4" />
                    <span className="text-sm">Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;