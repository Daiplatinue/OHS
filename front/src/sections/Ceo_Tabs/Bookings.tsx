import { useState } from 'react';
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo";
import {MapPin, ChevronRight, Camera } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    hasNotification: boolean;
    image: string;
}

function Bookings() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const companyDetails = {
        name: "Sisyphus Ventures",
        location: "United States",
        description: "Professional home services and repairs with guaranteed satisfaction. Available 24/7 for all your maintenance needs.",
        logo: "https://cdn.pixabay.com/photo/2020/01/25/21/55/adult-4793442_1280.jpg",
        coverPhoto: "https://cdn.pixabay.com/photo/2016/12/05/21/08/cologne-1884931_1280.jpg",
    };

    const services: Service[] = [
        {
            id: 1,
            name: "Plumbing Services",
            price: 8000,
            description: "Keep your water systems running smoothly with expert plumbing services, from leak repairs to pipe installations.",
            hasNotification: true,
            image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg"
        },
        {
            id: 2,
            name: "Handyman Services",
            price: 5499,
            description: "Get quality home repairs and improvements at HandyGo's discounted rates—fast, affordable, and hassle-free.",
            hasNotification: false,
            image: "https://cdn.pixabay.com/photo/2023/09/07/15/30/ai-generated-8239323_960_720.png"
        },
        {
            id: 3,
            name: "Home Cleaning Services",
            price: 12000,
            description: "Enjoy a spotless, sanitized home with deep cleaning, carpet care, and move-in/move-out services.",
            hasNotification: false,
            image: "https://cdn.pixabay.com/photo/2024/04/17/17/10/ai-generated-8702547_1280.jpg"
        },
        {
            id: 4,
            name: "Pest Control Services",
            price: 29000,
            description: "Keep your space pest-free with expert extermination for termites, rodents, bed bugs, and more.",
            hasNotification: false,
            image: "https://cdn.pixabay.com/photo/2023/07/04/10/32/ai-generated-8106005_960_720.jpg"
        },
        {
            id: 5,
            name: "Pest Control Services",
            price: 29000,
            description: "Keep your space pest-free with expert extermination for termites, rodents, bed bugs, and more.",
            hasNotification: false,
            image: "https://cdn.pixabay.com/photo/2023/07/04/10/32/ai-generated-8106005_960_720.jpg"
        },
        {
            id: 6,
            name: "Pest Control Services",
            price: 29000,
            description: "Keep your space pest-free with expert extermination for termites, rodents, bed bugs, and more.",
            hasNotification: false,
            image: "https://cdn.pixabay.com/photo/2023/07/04/10/32/ai-generated-8106005_960_720.jpg"
        }
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

                {/* Profile Info */}
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

                    <div className="pt-20 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{companyDetails.name}</h1>
                            <div className="flex items-center gap-2 mt-1 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{companyDetails.location}</span>
                            </div>
                            <p className="mt-4 text-gray-600 max-w-2xl">{companyDetails.description}</p>
                        </div>
                        <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all">
                            Edit Profile
                        </button>
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
                                className="bg-gray-200/70 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                            >
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
                                    <div className="text-lg font-medium">₱{service.price}</div>
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
        </div>
    );
}

export default Bookings;