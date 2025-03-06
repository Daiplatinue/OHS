import { useState } from 'react';
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo";
import { MapPin, ChevronRight, Camera } from 'lucide-react';
import AdminBookingModal from './AdminBookingModal';

interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    hasNotification: boolean;
    notificationCount?: number;
    image: string;
}

function Bookings() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showNotification] = useState(true);

    const companyDetails = {
        name: "Sisyphus Ventures",
        location: "United States",
        description: "Professional home services and repairs with guaranteed satisfaction. Available 24/7 for all your maintenance needs.",
        logo: "https://cdn.pixabay.com/photo/2020/01/25/21/55/adult-4793442_1280.jpg",
        coverPhoto: "https://cdn.pixabay.com/photo/2016/12/05/21/08/cologne-1884931_1280.jpg",
        followers: 34.5,
    };

    const services: Service[] = [
        {
            id: 1,
            name: "Plumbing Services",
            price: 8000,
            description: "Keep your water systems running smoothly with expert plumbing services.",
            hasNotification: true,
            notificationCount: 3,
            image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Floating Dock */}
            <div className="sticky top-0 z-40 flex">
                <MyFloatingDockCeo />
            </div>

            {/* Company Profile Section */}
            <div className="max-w-7xl mx-auto">
                {/* Cover Photo */}
                <div className="relative h-80 overflow-hidden rounded-b-3xl">
                    <img
                        src={companyDetails.coverPhoto}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all">
                        <Camera className="h-5 w-5" />
                    </button>
                </div>

                {/* Profile Info with Stats */}
                <div className="relative px-4 pb-8">
                    <div className="absolute -top-16 left-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                                <img
                                    src={companyDetails.logo}
                                    alt={companyDetails.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                                <Camera className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="pt-20">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{companyDetails.name}</h1>
                                <div className="flex items-center gap-2 mt-1 text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{companyDetails.location}</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                                Edit Profile
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="flex gap-6 mb-6">
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-semibold">{companyDetails.followers.toLocaleString() + 'M'}</div>
                                    <div className="text-sm text-gray-600">Followers</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-semibold">6.7M</div>
                                    <div className="text-sm text-gray-600">Reviews</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 max-w-2xl">{companyDetails.description}</p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="px-4 py-8 mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Services</h2>
                        <button className="text-sky-500 hover:text-sky-600">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-gray-200/70 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 relative"
                            >
                                {service.hasNotification && showNotification && (
                                    <div className="absolute -top-2 -right-2 z-10">
                                        <div className="relative">
                                            <div className="absolute -top-1 -right-1 animate-ping h-6 w-6 rounded-full bg-red-400 opacity-75"></div>
                                            <div className="relative bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {service.notificationCount}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                                <div className="flex justify-between items-center mt-15">
                                    <div className="text-lg font-medium">₱{service.price.toLocaleString()}</div>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="text-sky-500 hover:text-sky-600 flex items-center gap-1 group"
                                    >
                                        See More
                                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin Booking Modal */}
            {selectedService && (
                <AdminBookingModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </div>
    );
}

export default Bookings;