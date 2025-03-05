import { Bell, Sun } from "lucide-react"

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
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">My Mode of Payment</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">My Bookings</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Contact Support</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">Email Us</a></li>
                        <li><a href="#" className="text-black hover:text-gray-500 transition-colors">My Account</a></li>
                        <li>
                            <a href="#" className="text-black hover:text-gray-500 transition-colors">
                                <Sun className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-black hover:text-gray-500 transition-colors">
                                <Bell className="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar