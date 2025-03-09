import image1 from "../../assets/Construction Worker Focused.jpeg";

function ServiceShowcase() {
    return (
        <>
            <div className="bg-white/90 text-black py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 scroll-reveal">
                            <h2 className="text-6xl font-semibold leading-tight">
                                Reliable <span className="text-sky-500">Repairs</span>
                                <br />
                                Quick <span className="text-sky-500">Fixes</span>.
                            </h2>
                            <p className="text-xl text-gray-500">
                                Need a quick fix or home repair? HandyGo offers expert handyman services at discounted rates, ensuring quality and affordability for all your home improvement needs.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 hover-scale">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-2xl">5499</span>
                                    </div>
                                    <p className="text-lg">Starting Rate</p>
                                </div>
                                <div className="flex items-center space-x-4 hover-scale">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-2xl">2500</span>
                                    </div>
                                    <p className="text-lg">Per Kilometer Discount</p>
                                </div>
                            </div>
                            <button className="bg-white border border-gray-500 cursor-pointer text-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-opacity-90 hover:scale-105">
                                Book Now
                            </button>
                        </div>
                        <div className="relative scroll-reveal">
                            <img
                                src={image1}
                                alt="Premium Headphones"
                                className="rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceShowcase