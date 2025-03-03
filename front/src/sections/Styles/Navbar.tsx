import { Search, ShoppingBag } from "lucide-react"

function Navbar() {
    return (
        <>
            <nav className="bg-white/90 backdrop-blur-md w-full z-50">
                <div className="max-w-[980px] mx-auto">
                    <ul className="flex justify-between items-center h-[44px] px-4 text-[12px] font-normal">
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Home</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Services</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Why Choose Us</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Why HandyGo</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Meet Our Team</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">References</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Sponsors</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Learn More</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Contact</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Support</a></li>
                        <li>
                            <a href="#" className="text-black hover:text-gray-500 transition-colors">
                                <Search className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-black hover:text-gray-500 transition-colors">
                                <ShoppingBag className="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar