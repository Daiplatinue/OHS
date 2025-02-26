function FeaturedService() {
    return (
        <>
            <div className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 scroll-reveal">
                            <img
                                src="https://cdn.pixabay.com/photo/2024/04/17/18/22/ai-generated-8702697_1280.jpg"
                                alt="Model with headphones"
                                className="rounded-2xl shadow-lg hover-scale"
                            />
                        </div>
                        <div className="flex-1 space-y-6 scroll-reveal">
                            <h2 className="text-4xl font-semibold">Why Choose <span className="text-sky-500">HandyGo</span></h2>
                            <p className="text-lg text-gray-400">
                                HandyGo is your go-to online home service platform, offering discounted rates on expert repairs, cleaning, plumbing, pest control, and more. With trusted professionals, easy online booking, and location-based discounts, we make home maintenance convenient and budget-friendly.
                            </p>
                            <button className="bg-transparent border border-gray-400 text-gray-200 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-opacity-90 hover:scale-105">
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