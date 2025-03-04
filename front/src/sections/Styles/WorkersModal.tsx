import { useState, useEffect } from 'react';
import { Share, Flag, Calendar, MapPin, X, Check, ArrowLeft } from 'lucide-react';

interface Seller {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  startingRate: number;
  ratePerKm: number;
  badges: string[];
  description: string;
}

interface WorkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sellers: Seller[];
}

interface Location {
  name: string;
  distance: number;
}

const locations: Location[] = [
  { name: "Makati City", distance: 5 },
  { name: "Quezon City", distance: 12 },
  { name: "Pasig City", distance: 8 },
  { name: "Taguig City", distance: 10 },
  { name: "Manila City", distance: 7 },
  { name: "Pasay City", distance: 6 },
  { name: "Mandaluyong City", distance: 4 },
  { name: "Parañaque City", distance: 15 }
];

function WorkersModal({ isOpen, onClose, productName, sellers }: WorkersModalProps) {
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [totalRate, setTotalRate] = useState<number>(0);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [confirmationStep, setConfirmationStep] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  // Generate calendar days for the current month
  useEffect(() => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add days from previous month to fill the first week
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevMonthDay = new Date(year, month, 1 - i);
      days.push(prevMonthDay);
    }
    
    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days from next month to complete the last week
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
    
    setCalendarDays(days);
  }, [currentMonth]);

  // Reset scroll position when changing steps
  useEffect(() => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }, [bookingStep, selectedSeller, bookingSuccess, confirmationStep]);

  if (!isOpen) return null;

  const handleSellerSelect = (seller: Seller) => {
    setSelectedSeller(seller);
  };

  const handleShare = (sellerId: number) => {
    // In a real app, this would open a share dialog
    alert(`Sharing seller #${sellerId}`);
  };

  const handleReport = (sellerId: number) => {
    // In a real app, this would open a report dialog
    alert(`Reporting seller #${sellerId}`);
  };

  const handleBook = (seller: Seller) => {
    setSelectedSeller(seller);
    setBookingStep(1);
    setTotalRate(seller.startingRate);
  };

  const handleDateSelect = (date: Date) => {
    // Fix: Use the exact date object without timezone issues
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setBookingStep(2);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    if (selectedSeller) {
      const newTotalRate = selectedSeller.startingRate + (location.distance * selectedSeller.ratePerKm);
      setTotalRate(newTotalRate);
    }
  };

  const handleBookNow = () => {
    setConfirmationStep(true);
  };

  const handleConfirmBooking = () => {
    setConfirmationStep(false);
    setBookingSuccess(true);
  };

  const resetBooking = () => {
    setBookingStep(0);
    setSelectedSeller(null);
    setSelectedDate("");
    setSelectedLocation(null);
    setConfirmationStep(false);
    setBookingSuccess(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header section - always visible */}
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <>
              <h2 className="text-xl font-semibold text-black">Sellers for {productName}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}
          
          {selectedSeller && bookingStep === 1 && !confirmationStep && !bookingSuccess && (
            <>
              <div>
                <button 
                  onClick={resetBooking}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to sellers
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Select a Date</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}
          
          {selectedSeller && bookingStep === 2 && !confirmationStep && !bookingSuccess && (
            <>
              <div>
                <button 
                  onClick={() => setBookingStep(1)}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to date selection
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Select a Location</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {confirmationStep && (
            <>
              <div>
                <button 
                  onClick={() => setConfirmationStep(false)}
                  className="flex items-center text-sky-600 hover:text-sky-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to location selection
                </button>
                <h2 className="text-xl font-semibold text-black mt-2">Confirm Booking</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}

          {bookingSuccess && (
            <>
              <h2 className="text-xl font-semibold text-black">Booking Confirmation</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        
        {/* Scrollable content area */}
        <div id="modal-content" className="overflow-y-auto flex-grow">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <div className="p-6">
              {sellers.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No sellers available for this product</p>
              ) : (
                <div className="space-y-6">
                  {sellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="bg-white rounded-lg p-5 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200 shadow-sm hover:shadow-md"
                      onClick={() => handleSellerSelect(seller)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-black font-medium text-lg">{seller.name}</h3>
                          <p className="text-gray-700 text-sm mt-1 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-gray-500" /> {seller.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500 mb-1">
                            {'★'.repeat(seller.rating)}{'☆'.repeat(5 - seller.rating)}
                          </div>
                          <p className="text-gray-700 text-sm">{seller.reviews} reviews</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{seller.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-green-600 font-medium">
                          Starting at ₱{seller.startingRate.toLocaleString()} • ₱{seller.ratePerKm}/km
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(seller.id);
                            }}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Share className="h-4 w-4 text-gray-700" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReport(seller.id);
                            }}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Flag className="h-4 w-4 text-gray-700" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBook(seller);
                            }}
                            className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedSeller && bookingStep === 1 && !confirmationStep && !bookingSuccess && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">{selectedSeller.name}</h3>
                <p className="text-gray-600 text-sm">{selectedSeller.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Select a date for your booking
                </h4>
                
                {/* Compact Calendar */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
                  {/* Calendar header */}
                  <div className="flex justify-between items-center p-3 border-b border-gray-200">
                    <button 
                      onClick={() => changeMonth(-1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      &lt;
                    </button>
                    <h3 className="font-medium text-sm">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={() => changeMonth(1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      &gt;
                    </button>
                  </div>
                  
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 text-center py-1 border-b border-gray-200">
                    {weekdays.map(day => (
                      <div key={day} className="text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1 p-2">
                    {calendarDays.map((date, index) => {
                      // Format date for comparison with selectedDate
                      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                      const isSelected = dateStr === selectedDate;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => !isPastDate(date) && isCurrentMonth(date) && handleDateSelect(date)}
                          disabled={isPastDate(date) || !isCurrentMonth(date)}
                          className={`
                            p-1 rounded-md text-center text-sm h-8 w-8 mx-auto flex items-center justify-center
                            ${isToday(date) ? 'bg-sky-100 text-sky-700' : ''}
                            ${!isCurrentMonth(date) ? 'text-gray-300' : 'text-gray-800'}
                            ${isPastDate(date) ? 'cursor-not-allowed opacity-50' : ''}
                            ${!isPastDate(date) && isCurrentMonth(date) ? 'hover:bg-sky-50 hover:text-sky-700' : ''}
                            ${isSelected ? 'bg-sky-600 text-white hover:bg-sky-700' : ''}
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Selected date display */}
                {selectedDate && (
                  <div className="mt-4 p-3 bg-sky-50 border border-sky-100 rounded-lg text-center">
                    <p className="text-sky-800">
                      <span className="font-medium">Selected date:</span> {formatDate(selectedDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedSeller && bookingStep === 2 && !confirmationStep && !bookingSuccess && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium">{selectedSeller.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedSeller.description}</p>
                <p className="text-gray-600 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                  <span className="font-medium">Selected date:</span> {formatDate(selectedDate)}
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-sky-600" /> Select your location
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {locations.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => handleLocationSelect(location)}
                      className={`p-3 border rounded-lg transition-colors text-left ${
                        selectedLocation?.name === location.name 
                          ? 'border-sky-600 bg-sky-50' 
                          : 'border-gray-200 hover:border-sky-600 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{location.name}</span>
                        <span className="text-gray-500">{location.distance} km</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {selectedLocation && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium mb-3">Location Map</h4>
                    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border border-gray-200">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                        <p className="text-gray-600">Map showing {selectedLocation.name}</p>
                        <p className="text-gray-500 text-sm">Distance: {selectedLocation.distance} km</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-md font-medium mb-2">Pricing Breakdown</h4>
                      <div className="flex justify-between mb-2">
                        <span>Base rate:</span>
                        <span>₱{selectedSeller.startingRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Distance charge ({selectedLocation.distance} km × ₱{selectedSeller.ratePerKm}):</span>
                        <span>₱{(selectedLocation.distance * selectedSeller.ratePerKm).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total:</span>
                        <span>₱{totalRate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {confirmationStep && (
            <div className="p-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{productName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">{selectedSeller?.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedLocation?.name} ({selectedLocation?.distance} km)</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Base rate:</span>
                    <span className="font-medium">₱{selectedSeller?.startingRate.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Distance charge:</span>
                    <span className="font-medium">₱{selectedLocation ? (selectedLocation.distance * (selectedSeller?.ratePerKm || 0)).toLocaleString() : 0}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 text-lg">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-sky-700">₱{totalRate.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <p className="text-sm text-yellow-800">
                  By confirming this booking, you agree to the terms and conditions of service. 
                  The service provider will contact you shortly to confirm the details.
                </p>
              </div>
            </div>
          )}
          
          {bookingSuccess && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="h-8 w-8 text-green-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">Booking Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Stay tuned! {selectedSeller?.name} will review and accept your booking soon.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 border border-gray-200">
                <div className="mb-2">
                  <span className="font-medium">Service:</span> {productName}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Provider:</span> {selectedSeller?.name}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Date:</span> {formatDate(selectedDate)}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Location:</span> {selectedLocation?.name}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Total:</span> ₱{totalRate.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer section with action buttons - fixed at bottom */}
        <div className="p-6 border-t border-gray-200 mt-auto bg-gray-50">
          {bookingStep === 0 && !selectedSeller && !bookingSuccess && !confirmationStep && (
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
          
          {bookingStep === 2 && selectedSeller && !confirmationStep && !bookingSuccess && (
            <div className="flex justify-end">
              <button
                onClick={handleBookNow}
                disabled={!selectedLocation}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedLocation 
                    ? 'bg-sky-600 text-white hover:bg-sky-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>
            </div>
          )}
          
          {confirmationStep && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmationStep(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          )}
          
          {bookingSuccess && (
            <div className="flex justify-end">
              <button
                onClick={resetBooking}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkersModal;