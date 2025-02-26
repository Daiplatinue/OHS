import { Search, ShoppingBag } from "lucide-react"

function Navbar() {
    return (
        <>
            <nav className="bg-[#161617]/90 backdrop-blur-md w-full z-50">
                <div className="max-w-[980px] mx-auto">
                    <ul className="flex justify-between items-center h-[44px] px-4 text-[12px] font-normal">
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Home</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Services</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Why Choose Us</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Why HandyGo</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Meet Our Team</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">References</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Sponsors</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Learn More</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">Support</a></li>
                        <li>
                            <a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">
                                <Search className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[#f5f5f7] hover:text-white transition-colors">
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