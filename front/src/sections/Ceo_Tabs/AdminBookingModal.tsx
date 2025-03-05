import React, { useState } from 'react';
import { X, Camera, Edit2, Trash2, Users, MapPin, ChevronRight, Check, X as XMark, ArrowLeft, Share, Flag } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  hasNotification: boolean;
  notificationCount?: number;
  image: string;
}

interface Booking {
  id: number;
  customerName: string;
  serviceName: string;
  provider: string;
  date: string;
  location: string;
  baseRate: number;
  distanceCharge: number;
  total: number;
  customerImage: string;
  status?: 'pending' | 'accepted' | 'declined';
}

interface AdminBookingModalProps {
  service: Service | null;
  onClose: () => void;
}

function AdminBookingModal({ service, onClose }: AdminBookingModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'bookings'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState(service);
  const [newImage, setNewImage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customerName: "John Smith",
      serviceName: service?.name || "",
      provider: "Mike Johnson",
      date: "2024-03-20",
      location: "123 Main St, New York, NY",
      baseRate: service?.price || 0,
      distanceCharge: 500,
      total: (service?.price || 0) + 500,
      customerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      status: 'pending'
    },
    {
      id: 2,
      customerName: "Emma Wilson",
      serviceName: service?.name || "",
      provider: "Sarah Davis",
      date: "2024-03-21",
      location: "456 Oak Ave, Brooklyn, NY",
      baseRate: service?.price || 0,
      distanceCharge: 750,
      total: (service?.price || 0) + 750,
      customerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      status: 'pending'
    },
    {
      id: 3,
      customerName: "Michael Brown",
      serviceName: service?.name || "",
      provider: "David Lee",
      date: "2024-03-22",
      location: "789 Pine St, Queens, NY",
      baseRate: service?.price || 0,
      distanceCharge: 600,
      total: (service?.price || 0) + 600,
      customerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      status: 'pending'
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    onClose();
  };

  const handleBookingAction = (bookingId: number, action: 'accept' | 'decline') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === 'accept' ? 'accepted' : 'declined' }
        : booking
    ));
  };

  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-4">
            {selectedBooking && (
              <button 
                onClick={() => setSelectedBooking(null)}
                className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </button>
            )}
            <h2 className="text-xl font-semibold text-black">
              {selectedBooking ? 'Booking Details' : 'Service Details'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        {!selectedBooking && (
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'details'
                  ? 'text-sky-600 border-b-2 border-sky-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Service Details
            </button>
            <button
              className={`px-6 py-3 font-medium flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'text-sky-600 border-b-2 border-sky-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <Users className="h-4 w-4" />
              Bookings ({bookings.length})
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-grow">
          {activeTab === 'details' && !selectedBooking && (
            <div>
              {/* Cover Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={isEditing ? (newImage || service.image) : service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all">
                    <Camera className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Service Info */}
              <div className="relative px-6 pb-6">
                <div className="absolute -top-16 left-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-20">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedService?.name}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService!,
                              name: e.target.value,
                            })
                          }
                          className="text-2xl font-bold mb-2 px-2 py-1 border rounded"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h1>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>Service Category</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                          >
                            Save Changes
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sky-600 hover:text-sky-700"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedService?.price}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService!,
                              price: Number(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-lg"
                        />
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">₱{service.price.toLocaleString()}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedService?.description}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService!,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full p-2 border rounded-lg"
                        />
                      ) : (
                        <p className="text-gray-600">{service.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && !selectedBooking && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={booking.customerImage}
                          alt={booking.customerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{booking.customerName}</h3>
                          <p className="text-sm text-gray-600">{booking.date}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                        <div className="font-medium">₱{booking.total.toLocaleString()}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-sky-600 hover:text-sky-700 text-sm flex items-center gap-1"
                        >
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBookingAction(booking.id, 'accept')}
                              className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'decline')}
                              className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              <XMark className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {booking.status === 'accepted' && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                            Accepted
                          </span>
                        )}
                        {booking.status === 'declined' && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-sm">
                            Declined
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedBooking && (
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedBooking.customerImage}
                    alt={selectedBooking.customerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedBooking.customerName}</h3>
                    <p className="text-gray-600">{selectedBooking.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{selectedBooking.serviceName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Provider</p>
                      <p className="font-medium">{selectedBooking.provider}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{selectedBooking.location}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Base Rate</span>
                        <span>₱{selectedBooking.baseRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Distance Charge</span>
                        <span>₱{selectedBooking.distanceCharge.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>₱{selectedBooking.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedBooking.status === 'pending' && (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleBookingAction(selectedBooking.id, 'decline')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleBookingAction(selectedBooking.id, 'accept')}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                  >
                    Accept Booking
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBookingModal;