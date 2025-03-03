import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

function Footer() {
    return (
        <>
            <footer className="bg-white/90 text-black pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-300">
                        <div>
                            <h4 className="font-semibold mb-4">Services</h4>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li><a href="#" className="hover:underline">Plumbling</a></li>
                                <li><a href="#" className="hover:underline">Handyman</a></li>
                                <li><a href="#" className="hover:underline">Home Cleaning</a></li>
                                <li><a href="#" className="hover:underline">Pest Control</a></li>
                                <li><a href="#" className="hover:underline">Smart Home Installation</a></li>
                                <li><a href="#" className="hover:underline">Roofing & Gutter</a></li>
                                <li><a href="#" className="hover:underline">Landscaping & Gardening</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Sponsors</h4>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li><a href="#" className="hover:underline">Pueblo de Oro</a></li>
                                <li><a href="#" className="hover:underline">DMCI Homes</a></li>
                                <li><a href="#" className="hover:underline">Flores Builders</a></li>
                                <li><a href="#" className="hover:underline">Vistaland</a></li>
                                <li><a href="#" className="hover:underline">APEC Homes</a></li>
                                <li><a href="#" className="hover:underline">Camella Homes</a></li>
                                <li><a href="#" className="hover:underline">Lumina Homes</a></li>
                                <li><a href="#" className="hover:underline">Bria Homes</a></li>
                                <li><a href="#" className="hover:underline">Breighton Land</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Team Members</h4>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li><a href="#" className="hover:underline">Kimberly Cañon <span className="text-gray-400">| Project Manager</span></a></li>
                                <li><a href="#" className="hover:underline">Kathleen Repunte <span className="text-gray-400">| Documentor</span></a></li>
                                <li><a href="#" className="hover:underline">Vince Edward Mañacap <span className="text-gray-400">| Developer</span></a></li>
                                <li><a href="#" className="hover:underline">Kyle Sellote <span className="text-gray-400">| Developer</span></a></li>
                                <li><a href="#" className="hover:underline">Bart Juarez <span className="text-gray-400">| Analyst</span></a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Special Thanks</h4>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li><a href="#" className="hover:underline">Jonathan Reyes</a></li>
                                <li><a href="#" className="hover:underline">Michael Cruz</a></li>
                                <li><a href="#" className="hover:underline">Chris Mendoza</a></li>
                                <li><a href="#" className="hover:underline">Jake Villanueva</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 text-sm text-gray-700">
                        <div className="flex flex-wrap justify-between items-center">
                            <p>&copy; 2025 <span className="text-sky-500">HandyGo</span>. All rights reserved.</p>
                            <div className="flex space-x-6 items-center">
                                <Facebook className="h-5 w-5 transition-colors duration-300 hover:text-gray-900 cursor-pointer" />
                                <Twitter className="h-5 w-5 transition-colors duration-300 hover:text-gray-900 cursor-pointer" />
                                <Instagram className="h-5 w-5 transition-colors duration-300 hover:text-gray-900 cursor-pointer" />
                                <Youtube className="h-5 w-5 transition-colors duration-300 hover:text-gray-900 cursor-pointer" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            <a href="#" className="hover:underline transition-all duration-300">Privacy Policy</a>
                            <span>|</span>
                            <a href="#" className="hover:underline transition-all duration-300">Terms of Use</a>
                            <span>|</span>
                            <a href="#" className="hover:underline transition-all duration-300">Sales Policy</a>
                            <span>|</span>
                            <a href="#" className="hover:underline transition-all duration-300">Legal</a>
                            <span>|</span>
                            <a href="#" className="hover:underline transition-all duration-300">Site Map</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;