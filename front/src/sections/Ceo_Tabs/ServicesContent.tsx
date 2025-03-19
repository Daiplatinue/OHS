import { ChevronRight, Plus } from "lucide-react"

function ServiceCard({ title, providers, jobs, revenue, growth }: any) {
    return (
        <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                    <p className="text-xs text-gray-500">Providers</p>
                    <p className="text-sm font-medium">{providers}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Jobs</p>
                    <p className="text-sm font-medium">{jobs}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-sm font-medium">{revenue}</p>
                </div>
                <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <ChevronRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">{growth}</span>
                </div>
            </div>
        </div>
    )
}

function ServiceRequestRow({ customer, service, date, status, provider }: any) {
    return (
        <tr>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{customer}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{service}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{date}</td>
            <td className="px-4 py-3 whitespace-nowrap">
                <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {status}
                </span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{provider}</td>
        </tr>
    )
}

function ServicesContent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800">Service Categories</h2>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Add Service Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ServiceCard title="Cleaning Services" providers={86} jobs={1240} revenue="$124,500" growth="+12.5%" />
                <ServiceCard title="Plumbing" providers={42} jobs={865} revenue="$108,750" growth="+8.3%" />
                <ServiceCard title="Electrical" providers={38} jobs={720} revenue="$96,400" growth="+5.7%" />
                <ServiceCard title="Gardening" providers={24} jobs={510} revenue="$45,900" growth="+3.2%" />
                <ServiceCard title="Painting" providers={31} jobs={480} revenue="$72,000" growth="+7.8%" />
                <ServiceCard title="Home Security" providers={18} jobs={320} revenue="$64,000" growth="+15.4%" />
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Service Requests</h3>
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Service</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Provider</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <ServiceRequestRow
                            customer="Emma Wilson"
                            service="Deep Cleaning"
                            date="Today, 10:30 AM"
                            status="Completed"
                            provider="Maria Garcia"
                        />
                        <ServiceRequestRow
                            customer="Michael Brown"
                            service="Plumbing Repair"
                            date="Today, 1:15 PM"
                            status="In Progress"
                            provider="John Smith"
                        />
                        <ServiceRequestRow
                            customer="Sophia Martinez"
                            service="Electrical Wiring"
                            date="Today, 3:45 PM"
                            status="Scheduled"
                            provider="David Chen"
                        />
                        <ServiceRequestRow
                            customer="James Taylor"
                            service="Lawn Mowing"
                            date="Tomorrow, 9:00 AM"
                            status="Scheduled"
                            provider="Sarah Johnson"
                        />
                    </tbody>
                </table>
                <button className="mt-4 text-teal-500 text-sm font-medium">View all requests</button>
            </div>
        </div>
    )
}

export default ServicesContent