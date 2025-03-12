interface Service {
    title: string
    description: string
    image: string
    size: "sm" | "lg"
    button?: {
        text: string
        variant?: "primary" | "secondary" | "outline"
    }
}

const services: Service[] = [
    {
        title: "Less Labor Fee",
        description: "On bookings over ₱100,000",
        image: "https://cdn.pixabay.com/photo/2024/10/23/15/40/ai-generated-9143281_1280.jpg",
        size: "lg",
        button: {
            text: "Learn more",
            variant: "primary",
        },
    },
    {
        title: "Premium Service",
        description: "24/7 dedicated team",
        image: "https://cdn.pixabay.com/photo/2020/04/19/18/46/company-5064997_1280.jpg",
        size: "sm",
    },
    {
        title: "New Member Discount",
        description: "Save up to 15%",
        image: "https://cdn.pixabay.com/photo/2018/03/10/09/46/business-3213661_1280.jpg",
        size: "sm",
    },
    {
        title: "Trade In",
        description: "Upgrade your homes",
        image: "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_960_720.jpg",
        size: "lg",
    },
]

const allServices = [
    ...services,
    {
        title: "A Week Of Free Labor",
        description: "Over 1B+ Members Are Happy",
        image: "https://cdn.pixabay.com/photo/2020/05/24/02/00/barber-shop-5212059_1280.jpg",
        size: "sm",
        button: {
            text: "Schedule now",
            variant: "outline",
        },
    },
    {
        title: "Warranty Coverage",
        description: "5-year protection",
        image: "https://cdn.pixabay.com/photo/2016/08/11/00/46/business-lady-1584654_1280.jpg",
        size: "sm",
    },
]

function ServicesPromote() {
    return (
        <section className="py-16 px-4 bg-white sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-center">
                    Discover our premium offerings designed to transform your home
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(180px,auto)]">
                    {/* Card 1 - Large with button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 group">
                        <img
                            src={allServices[0].image || "/placeholder.svg"}
                            alt={allServices[0].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 p-6 flex flex-col justify-end">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full w-fit mb-2">
                                Featured
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-1">{allServices[0].title}</h3>
                            <p className="text-white/80">{allServices[0].description}</p>
                            {allServices[0].button && (
                                <button className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg w-fit hover:bg-white/30 transition-colors">
                                    {allServices[0].button.text}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Card 2 - Small without button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 group">
                        <img
                            src={allServices[1].image || "/placeholder.svg"}
                            alt={allServices[1].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 p-6 flex flex-col justify-end">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full w-fit mb-2">
                                Premium
                            </span>
                            <h3 className="text-xl font-bold text-white mb-1">{allServices[1].title}</h3>
                            <p className="text-white/80">{allServices[1].description}</p>
                        </div>
                    </div>

                    {/* Card 3 - Small with button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 group">
                        <img
                            src={allServices[2].image || "/placeholder.svg"}
                            alt={allServices[2].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white mb-1">{allServices[2].title}</h3>
                            <p className="text-white/80">{allServices[2].description}</p>
                            {allServices[2].button && (
                                <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    {allServices[2].button.text}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Card 4 - Large without button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-4 group">
                        <img
                            src={allServices[3].image || "/placeholder.svg"}
                            alt={allServices[3].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h3 className="text-2xl font-bold text-white mb-1">{allServices[3].title}</h3>
                            <p className="text-white/80">{allServices[3].description}</p>
                        </div>
                    </div>

                    {/* Card 5 - Small with button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 group">
                        <img
                            src={allServices[4].image || "/placeholder.svg"}
                            alt={allServices[4].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full w-fit">New</span>
                            <h3 className="text-xl font-bold text-white mt-4 mb-1">{allServices[4].title}</h3>
                            <p className="text-white/80">{allServices[4].description}</p>
                            {allServices[4].button && (
                                <button className="mt-4 text-amber-300 font-medium text-sm hover:underline">
                                    {allServices[4].button.text} →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Card 6 - Small without button */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 group">
                        <img
                            src={allServices[5].image || "/placeholder.svg"}
                            alt={allServices[5].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gray-600/30 p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white mb-1">{allServices[5].title}</h3>
                            <p className="text-white/80">{allServices[5].description}</p>
                        </div>
                    </div>

                    {/* Call to Action Card */}
                    <div className="relative overflow-hidden rounded-2xl md:col-span-2 group">
                        <img
                            src="https://cdn.pixabay.com/photo/2018/04/29/18/52/people-3360819_1280.jpg"
                            alt="Get Started"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gray-900/80 p-6 flex flex-col justify-center items-center text-center text-white">
                            <h3 className="text-xl font-bold mb-2">Ready to Book Now?</h3>
                            <p className="text-white/70 mb-4">Navigate our system too see the services</p>
                            <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                Redirect to Services
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesPromote  