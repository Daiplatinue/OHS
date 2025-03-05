import React, { useState } from 'react';
import MyFloatingDockCustomer from '../Styles/MyFloatingDock-Customer';
import { Search, Calendar, Clock, XCircle, Filter } from 'lucide-react';

// Dummy data for bookings
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
  }
];

function MyBookings() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate booking statistics
  const totalBookings = dummyBookings.length;
  const pendingBookings = dummyBookings.filter(b => b.status === 'pending').length;
  const ongoingBookings = dummyBookings.filter(b => b.status === 'ongoing').length;

  // Filter bookings based on search query
  const filteredBookings = dummyBookings.filter(booking =>
    booking.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
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
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Dock */}
      <div className="sticky top-0 z-40 flex">
        <MyFloatingDockCustomer />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all"
          >
            View All Bookings
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Booking Management</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Statistics Cards */}
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

              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings by company or service..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Bookings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview of Latest Bookings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBookings.slice(0, 3).map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;