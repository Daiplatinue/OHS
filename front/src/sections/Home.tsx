import { useState, useEffect } from 'react';

import Footer from '../sections/Styles/Footer';
import FeaturedService from './Styles/FeaturedService';
import Navbar from './Styles/Navbar';
import ServiceShowcase from './Styles/ServiceShowcase';
import WorkersModal from './Styles/WorkersModal';

import { ChevronRight, Search, X } from 'lucide-react';

const sellers = { 
  "Plumbing Services": [
    { id: 1, name: "PipeFix Pros", rating: 4, reviews: 1250, location: "New York" },
    { id: 2, name: "LeakBusters", rating: 5, reviews: 2100, location: "Los Angeles" },
    { id: 3, name: "DrainMasters", rating: 4, reviews: 890, location: "Chicago" }
  ],
  "Handyman Services": [
    { id: 4, name: "FixIt All", rating: 5, reviews: 3200, location: "San Francisco" },
    { id: 5, name: "HandyHelpers", rating: 4, reviews: 1500, location: "Seattle" }
  ],
  "Home Cleaning Services": [
    { id: 6, name: "SparkleClean", rating: 5, reviews: 4200, location: "Boston" },
    { id: 7, name: "FreshSpaces", rating: 4, reviews: 2800, location: "Miami" },
    { id: 8, name: "CleanSweep", rating: 3, reviews: 950, location: "Houston" }
  ],
  "Pest Control Services": [
    { id: 9, name: "BugBusters", rating: 5, reviews: 2700, location: "Denver" },
    { id: 10, name: "PestAway", rating: 4, reviews: 1800, location: "Austin" }
  ]
};

const carouselItems = [
  {
    title: "Electrical Services",
    subtitle: "Safe & Reliable Power Solutions for Your Home",
    image: "https://cdn.pixabay.com/photo/2022/04/04/16/24/waves-7111758_1280.jpg",
    color: "from-purple-900/50",
    price: "Starting rate of ₱299"
  },
  {
    title: "HVAC Services",
    subtitle: "Optimal Heating & Cooling for Year-Round Comfort",
    image: "https://cdn.pixabay.com/photo/2024/09/12/21/35/ai-generated-9043401_960_720.png",
    color: "from-blue-900/50",
    price: "Starting rate of ₱1299"
  },
  {
    title: "Appliance Repair",
    subtitle: "Restoring Efficiency to Your Essential Home Devices",
    image: "https://cdn.pixabay.com/photo/2024/08/06/15/29/ai-generated-8949593_1280.jpg",
    color: "from-gray-900/50",
    price: "Starting rate of ₱399"
  }
];

const products = [
  {
    id: 1,
    name: "Plumbing Services",
    price: 8000,
    category: "Plumbing",
    image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
    description: "Keep your water systems running smoothly with expert plumbing services, from leak repairs to pipe installations."
  },
  {
    id: 2,
    name: "Handyman Services",
    price: 5499,
    category: "Handyman",
    image: "https://cdn.pixabay.com/photo/2023/09/07/15/30/ai-generated-8239323_960_720.png",
    description: "Get quality home repairs and improvements at HandyGo’s discounted rates—fast, affordable, and hassle-free."
  },
  {
    id: 3,
    name: "Home Cleaning Services",
    price: 12000,
    category: "Cleaning",
    image: "https://cdn.pixabay.com/photo/2024/04/17/17/10/ai-generated-8702547_1280.jpg",
    description: "Enjoy a spotless, sanitized home with deep cleaning, carpet care, and move-in/move-out services."
  },
  {
    id: 4,
    name: "Pest Control Services",
    price: 29000,
    category: "Pest Control",
    image: "https://cdn.pixabay.com/photo/2023/07/04/10/32/ai-generated-8106005_960_720.jpg",
    description: "Keep your space pest-free with expert extermination for termites, rodents, bed bugs, and more."
  }
];

const services = [
  {
    title: "Less Labor Fee",
    description: "On bookings over ₱100,000",
    image: "https://cdn.pixabay.com/photo/2024/10/23/15/40/ai-generated-9143281_1280.jpg",
    size: "lg"
  },
  {
    title: "Premium Service",
    description: "24/7 dedicated team",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200",
    size: "sm"
  },
  {
    title: "New Member Discount",
    description: "Save up to 15%",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    size: "sm"
  },
  {
    title: "Trade In",
    description: "Upgrade your homes",
    image: "https://cdn.pixabay.com/photo/2015/03/07/16/34/home-663226_1280.jpg",
    size: "lg"
  }
];

function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePriceChange = (value: number, index: number) => {
    setPriceRange(prev => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange as [number, number];
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 2000]);
    setSelectedCategories([]);
  };

  const handleSeeMore = (productName: string) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">

      <Navbar />

      {/* Hero Carousel */}
      <div className="relative">
        <div className="relative h-[600px] overflow-hidden rounded-lg mx-auto max-w-7xl mt-10">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
                }`}
            >
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Darker overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-7xl font-semibold text-white mb-4 tracking-tight fade-in"
                  style={{ animationDelay: '0.3s' }}>{item.title}</h1>
                <p className="text-3xl text-white/90 mb-3 fade-in"
                  style={{ animationDelay: '0.5s' }}>{item.subtitle}</p>
                <p className="text-2xl text-white/80 mb-8 fade-in"
                  style={{ animationDelay: '0.7s' }}>{item.price}</p>
                <div className="space-x-4 fade-in" style={{ animationDelay: '0.9s' }}>
                  <button className="bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/90 hover:scale-105">
                    Book Now
                  </button>
                  <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>

      <ServiceShowcase />

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-12 text-center scroll-reveal">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl scroll-reveal hover-scale ${service.size === 'lg' ? 'md:col-span-2 h-[400px]' : 'h-[300px]'
                }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 hover:bg-black/50">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-lg text-white/90">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-black text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold scroll-reveal">Featured Services</h2>
              <p className="text-sm text-gray-400">Showing {filteredProducts.length} services</p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-4 items-center bg-[#161617] p-4 rounded-lg">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#232324] rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                  className="w-24 px-3 py-2 bg-[#232324] rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                  className="w-24 px-3 py-2 bg-[#232324] rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategories.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#232324] text-gray-300 hover:bg-[#2c2c2d]'
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
                <div key={product.id}
                  className="group cursor-pointer bg-black border border-gray-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal hover-scale">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-16 line-clamp-3">{product.description}</p>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <span className="text-lg font-medium text-white">₱{product.price}</span>
                    <button
                      onClick={() => handleSeeMore(product.name)}
                      className="text-blue-500 flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
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

      {/* Workers Modal */}
      <WorkersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedProduct}
        sellers={sellers[selectedProduct as keyof typeof sellers] || []}
      />

      <FeaturedService />
      <Footer />

    </div>
  );
}

export default App;