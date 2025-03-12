function FeaturedService() {
    return (
        <>
            <div className="bg-white/90 text-black py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 scroll-reveal">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/09/24/23/36/construction-worker-956496_1280.jpg"
                                alt="Model with headphones"
                                className="rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="flex-1 space-y-6 scroll-reveal">
                            <h2 className="text-4xl font-semibold">Why Choose <span className="text-sky-500">HandyGo</span></h2>
                            <p className="text-lg text-gray-600">
                                HandyGo is your go-to online home service platform, offering discounted rates on expert repairs, cleaning, plumbing, pest control, and more. With trusted professionals, easy online booking, and location-based discounts, we make home maintenance convenient and budget-friendly.
                            </p>
                            <button className="bg-transparent border border-gray-700 text-black cursor-pointer px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-opacity-90 hover:scale-105">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedService;