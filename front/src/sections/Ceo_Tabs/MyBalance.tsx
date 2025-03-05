import MyFloatingDockCeo from "@/sections/Styles/MyFloatingDock-Ceo";

import { ArrowUpRight, Wallet } from "lucide-react"

function MyBalance() {
    return (
        <div className="space-y-8 p-8">

            {/* Floating Dock - Now at the top */}
            <div className="sticky z-40 flex">
                <MyFloatingDockCeo />
            </div>


            {/* Total Balance Section */}
            <div className="bg-gray-200/70 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-medium text-gray-600">Total Balance</h2>
                        <div className="flex items-baseline gap-3 mt-2">
                            <span className="text-5xl font-semibold text-gray-900">
                                $150,000.00
                            </span>
                            <div className="flex items-center text-green-600">
                                <ArrowUpRight size={20} />
                                <span className="text-sm">+12.5%</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-2xl">
                        <Wallet className="text-green-600" size={32} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyBalance