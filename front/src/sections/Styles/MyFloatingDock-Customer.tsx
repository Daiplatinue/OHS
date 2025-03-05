import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircleMore, PowerOff, Bell, CircleUserRound, Newspaper, Album, Search, Calendar, Clock, XCircle, Filter, Ban, Edit2, ArrowRight, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const dummyBookings = [
  {
    id: 1,
    companyName: "Sisyphus Ventures",
    service: "Plumbing Services",
    status: "pending",
    date: "2024-03-20",
    price: 8000,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    companyName: "TechFix Solutions",
    service: "Electronics Repair",
    status: "ongoing",
    date: "2024-03-19",
    price: 5000,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    companyName: "GreenThumb Gardens",
    service: "Landscaping",
    status: "cancelled",
    date: "2024-03-18",
    price: 12000,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    companyName: "ElectroFix Pro",
    service: "Electrical Services",
    status: "pending",
    date: "2024-03-17",
    price: 6500,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    companyName: "CleanPro Services",
    service: "House Cleaning",
    status: "ongoing",
    date: "2024-03-16",
    price: 3500,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    companyName: "GardenMasters",
    service: "Garden Maintenance",
    status: "pending",
    date: "2024-03-15",
    price: 4500,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, to, isActive, onClick }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-200 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'text-white' : isHovered ? 'text-white' : 'text-gray-400'}`}
      >
        {icon}
      </div>

      <div
        className={`absolute -top-8 bg-sky-400 text-white text-xs px-2 py-1 rounded-md opacity-0 transition-all duration-200 ${isHovered ? 'opacity-100 transform translate-y-0' : 'transform translate-y-2'}`}
      >
        {label}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, color }) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm border border-${color}-100`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{count}</p>
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        {icon}
      </div>
    </div>
  </div>
);

interface Booking {
  id: number;
  companyName: string;
  service: string;
  status: string;
  date: string;
  price: number;
  image: string;
}

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const getActionButtons = () => {
    switch (booking.status) {
      case 'pending':
        return (
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
              <Ban className="w-4 h-4" />
              Cancel
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
              <Edit2 className="w-4 h-4" />
              Update
            </button>
          </div>
        );
      case 'ongoing':
        return (
          <button className="flex items-center gap-1 px-4 py-2 mt-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors w-full justify-center">
            <ArrowRight className="w-4 h-4" />
            Proceed
          </button>
        );
      case 'cancelled':
        return (
          <button className="flex items-center gap-1 px-4 py-2 mt-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors w-full justify-center">
            <RotateCcw className="w-4 h-4" />
            Book Again
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48">
        <img src={booking.image} alt={booking.service} className="w-full h-full object-cover" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          booking.status === 'ongoing' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {booking.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{booking.companyName}</h3>
        <p className="text-gray-600 mt-1">{booking.service}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {booking.date}
          </div>
          <p className="font-medium">₱{booking.price.toLocaleString()}</p>
        </div>
        {getActionButtons()}
      </div>
    </div>
  );
};

const FloatingDock: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    if (showModal && !showAllServices) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showAllServices]);

  const totalBookings = dummyBookings.length;
  const pendingBookings = dummyBookings.filter(b => b.status === 'pending').length;
  const ongoingBookings = dummyBookings.filter(b => b.status === 'ongoing').length;

  const filteredBookings = dummyBookings.filter(booking =>
    booking.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedBookings = showAllServices ? filteredBookings : filteredBookings.slice(0, 3);

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-200/40 backdrop-blur-lg rounded-full shadow-lg px-2 py-1 flex items-center transition-all duration-200 hover:shadow-xl">
        <DockItem
          icon={<Home size={20} strokeWidth={1.5} color='gray' />}
          label="Home"
          to="/"
          isActive={location.pathname === '/'}
        />
        <DockItem
          icon={<Album size={20} strokeWidth={1.5} color='gray' />}
          label="Bookings"
          to="#"
          isActive={showModal}
          onClick={() => setShowModal(true)}
        />
        <DockItem
          icon={<Bell size={20} strokeWidth={1.5} color='gray' />}
          label="Notifications"
          to="/"
          isActive={location.pathname === '/'}
        />
        <DockItem
          icon={<CircleUserRound size={20} strokeWidth={1.5} color='gray' />}
          label="Profile"
          to="/"
          isActive={location.pathname === '/'}
        />
        <DockItem
          icon={<Newspaper size={20} strokeWidth={1.5} color='gray' />}
          label="News"
          to="/"
          isActive={location.pathname === '/'}
        />
        <DockItem
          icon={<MessageCircleMore size={20} strokeWidth={1.5} color='gray' />}
          label="Chats"
          to="/"
          isActive={location.pathname === '/'}
        />
        <DockItem
          icon={<PowerOff size={20} strokeWidth={1.5} color='gray' />}
          label="Logout"
          to="/"
          isActive={location.pathname === '/'}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 backdrop-blur-sm bg-black/30"
            onClick={() => setShowModal(false)}
          />
          
          <div className="absolute inset-0 flex items-start justify-center pt-4 px-4">
            <div className="bg-gray-50 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 z-10 px-6 pt-6 pb-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Booking Management</h2>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formattedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search bookings by company or service..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Total Bookings"
                    count={totalBookings}
                    icon={<Calendar className="w-6 h-6 text-blue-500" />}
                    color="blue"
                  />
                  <StatCard
                    title="Pending Bookings"
                    count={pendingBookings}
                    icon={<Clock className="w-6 h-6 text-yellow-500" />}
                    color="yellow"
                  />
                  <StatCard
                    title="Ongoing Bookings"
                    count={ongoingBookings}
                    icon={<Filter className="w-6 h-6 text-green-500" />}
                    color="green"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>

                {filteredBookings.length > 3 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllServices(!showAllServices)}
                      className="flex items-center gap-2 px-6 py-3 bg-transparent text-sky-500 rounded-lg transition-all"
                    >
                      {showAllServices ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View More
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingDock;