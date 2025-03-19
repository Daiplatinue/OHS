import { ChevronRight } from "lucide-react"

function FinanceCard({ title, value, change }: any) {
    return (
        <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{value}</h3>
            <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm font-medium">{change}</span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
        </div>
    )
}

function RevenueItem({ category, amount, percentage }: any) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-800">{category}</span>
                <span className="text-sm font-medium text-gray-800">{amount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{percentage}% of total revenue</div>
        </div>
    )
}

function TransactionRow({ id, customer, service, date, amount, status }: any) {
    return (
        <tr>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{id}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{customer}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{date}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{amount}</td>
            <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{status}</span>
            </td>
        </tr>
    )
}


function FinanceContent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800">Financial Overview</h2>
                <select className="border rounded-md px-4 py-2 text-sm">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                    <option>Last year</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FinanceCard title="Total Revenue" value="$245,680" change="+12.5%" />
                <FinanceCard title="Expenses" value="$98,240" change="+5.3%" />
                <FinanceCard title="Net Profit" value="$147,440" change="+18.7%" />
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue by Service Category</h3>
                <div className="space-y-4">
                    <RevenueItem category="Cleaning Services" amount="$124,500" percentage={50.7} />
                    <RevenueItem category="Plumbing" amount="$108,750" percentage={44.3} />
                    <RevenueItem category="Electrical" amount="$96,400" percentage={39.2} />
                    <RevenueItem category="Gardening" amount="$45,900" percentage={18.7} />
                    <RevenueItem category="Painting" amount="$72,000" percentage={29.3} />
                    <RevenueItem category="Home Security" amount="$64,000" percentage={26.1} />
                </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Recent Transactions</h3>
                    <button className="text-teal-500 text-sm font-medium">View all</button>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-2">Transaction ID</th>
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Service</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <TransactionRow
                            id="TRX-8294"
                            customer="Emma Wilson"
                            service="Deep Cleaning"
                            date="Aug 18, 2024"
                            amount="$180"
                            status="Completed"
                        />
                        <TransactionRow
                            id="TRX-8293"
                            customer="Michael Brown"
                            service="Plumbing Repair"
                            date="Aug 18, 2024"
                            amount="$250"
                            status="Completed"
                        />
                        <TransactionRow
                            id="TRX-8292"
                            customer="Sophia Martinez"
                            service="Electrical Wiring"
                            date="Aug 17, 2024"
                            amount="$320"
                            status="Completed"
                        />
                        <TransactionRow
                            id="TRX-8291"
                            customer="James Taylor"
                            service="Lawn Mowing"
                            date="Aug 17, 2024"
                            amount="$120"
                            status="Completed"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinanceContent