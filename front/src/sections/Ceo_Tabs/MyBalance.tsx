import MyFloatingDockCeo from "@/sections/Styles/MyFloatingDock-Ceo";
import { Select } from "@heroui/react";

import { ArrowUpRight, CreditCard, DollarSign, HelpCircle, ShoppingBag, Wallet } from "lucide-react"

function MyBalance() {
    return (
        <div className="space-y-8 p-8">

            {/* Floating Dock - Now at the top */}
            <div className="sticky z-40 flex">
                <MyFloatingDockCeo />
            </div>


            {/* Dashboard Content */}
            <div className="flex-1 overflow-auto p-6 bg-[#121212]">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-400">Total Orders</h3>
                            <HelpCircle size={16} className="text-gray-400" />
                        </div>
                        <div className="flex items-end justify-between">
                            <h2 className="text-2xl font-bold">€256k</h2>
                            <div className="flex items-center text-green-500 text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-trending-up"
                                >
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                    <polyline points="16 7 22 7 22 13" />
                                </svg>
                                <span>+1.15%</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Vs. last month: 22</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-400">Total Profits</h3>
                            <HelpCircle size={16} className="text-gray-400" />
                        </div>
                        <div className="flex items-end justify-between">
                            <h2 className="text-2xl font-bold">€6.25k</h2>
                            <div className="flex items-center text-red-500 text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-trending-down"
                                >
                                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                    <polyline points="16 17 22 17 22 11" />
                                </svg>
                                <span>+1.15%</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Vs. last month: 22</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-400">Total Earnings</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <h2 className="text-2xl font-bold">€3,055.56</h2>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Vs. last month: 22</div>
                    </div>
                </div>

                {/* Revenue Report */}
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333] mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Revenue Report</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-sm text-gray-400">Earnings</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                                <span className="text-sm text-gray-400">Expenses</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                        Budget: <span className="text-blue-400">56,800</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">€3,055.56</h2>

                    {/* Chart */}
                    <div className="h-64 relative">
                        <RevenueChart />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Paypoint Portal */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Paypoint Portal</h3>
                            {/* <Select defaultValue="lastWeek">
                                <SelectTrigger className="w-[120px] bg-[#252525] border-none text-sm">
                                    <SelectValue placeholder="Last Week" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lastWeek">Last Week</SelectItem>
                                    <SelectItem value="lastMonth">Last Month</SelectItem>
                                    <SelectItem value="lastYear">Last Year</SelectItem>
                                </SelectContent>
                            </Select> */}
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="bg-green-500 p-2 rounded">
                                        <Wallet className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <span className="ml-4">55.5%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="bg-orange-500 p-2 rounded">
                                        <ShoppingBag className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-1/6 bg-orange-500 rounded-full"></div>
                                    </div>
                                </div>
                                <span className="ml-4">6.1%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="bg-pink-600 p-2 rounded">
                                        <CreditCard className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-1/4 bg-pink-600 rounded-full"></div>
                                    </div>
                                </div>
                                <span className="ml-4">14.6%</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Recent Transactions</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500 p-2 rounded">
                                        <Wallet className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Wallet</p>
                                        <p className="text-xs text-gray-400">Star Bucks</p>
                                    </div>
                                </div>
                                <span className="text-red-500">- €</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500 p-2 rounded">
                                        <DollarSign className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Bank transfer</p>
                                        <p className="text-xs text-gray-400">Add money</p>
                                    </div>
                                </div>
                                <span className="text-green-500">+ €</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500 p-2 rounded">
                                        <CreditCard className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium">PayPal</p>
                                        <p className="text-xs text-gray-400">Add money</p>
                                    </div>
                                </div>
                                <span className="text-green-500">+ €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

function RevenueChart() {
    return (
      <svg viewBox="0 0 800 250" className="w-full h-full">
        {/* X-axis */}
        <line x1="0" y1="220" x2="800" y2="220" stroke="#333" strokeWidth="1" />
  
        {/* Y-axis labels */}
        <text x="10" y="220" fill="#666" fontSize="12">
          0
        </text>
        <text x="10" y="180" fill="#666" fontSize="12">
          10
        </text>
        <text x="10" y="140" fill="#666" fontSize="12">
          20
        </text>
        <text x="10" y="100" fill="#666" fontSize="12">
          30
        </text>
        <text x="10" y="60" fill="#666" fontSize="12">
          40
        </text>
        <text x="10" y="20" fill="#666" fontSize="12">
          50
        </text>
  
        {/* X-axis labels */}
        <text x="50" y="240" fill="#666" fontSize="12">
          13 Aug
        </text>
        <text x="150" y="240" fill="#666" fontSize="12">
          14 Aug
        </text>
        <text x="250" y="240" fill="#666" fontSize="12">
          15 Aug
        </text>
        <text x="350" y="240" fill="#666" fontSize="12">
          16 Aug
        </text>
        <text x="450" y="240" fill="#666" fontSize="12">
          17 Aug
        </text>
        <text x="550" y="240" fill="#666" fontSize="12">
          18 Aug
        </text>
        <text x="650" y="240" fill="#666" fontSize="12">
          19 Aug
        </text>
  
        {/* Earnings line */}
        <path
          d="M50,200 L100,150 L150,120 L200,120 L250,140 L300,140 L350,100 L400,140 L450,140 L500,80 L550,100 L600,100 L650,140 L700,180"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
  
        {/* Expenses line (dashed) */}
        <path
          d="M50,180 L100,160 L150,130 L200,160 L250,160 L300,160 L350,120 L400,160 L450,160 L500,100 L550,120 L600,120 L650,120 L700,200"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
  
        {/* Data point */}
        <circle cx="500" cy="80" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
  
        {/* Legend for data point */}
        <text x="520" y="70" fill="#3b82f6" fontSize="12">
          Earning (€60)
        </text>
        <text x="520" y="90" fill="#2dd4bf" fontSize="12">
          Expenses (€60)
        </text>
      </svg>
    )
  }

export default MyBalance