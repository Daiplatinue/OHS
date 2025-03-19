import { Plus, Search } from "lucide-react"

function ProviderRow({ name, category, rating, jobs, status }: any) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium mr-3">
                        {name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{name}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 fill-current mr-1" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm font-medium">{rating}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{jobs}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-teal-600 hover:text-teal-900">Edit</button>
            </td>
        </tr>
    )
}

function ServiceProvidersContent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800">Service Providers</h2>
                <div className="flex space-x-2">
                    <div className="relative">
                        <input type="text" placeholder="Search providers" className="pl-9 pr-4 py-2 border rounded-md text-sm" />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                        <Plus className="h-4 w-4 mr-1" /> Add Provider
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Jobs Completed
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <ProviderRow name="John Smith" category="Plumbing" rating={4.9} jobs={142} status="Active" />
                        <ProviderRow name="Maria Garcia" category="Cleaning" rating={4.8} jobs={118} status="Active" />
                        <ProviderRow name="David Chen" category="Electrical" rating={4.9} jobs={105} status="Active" />
                        <ProviderRow name="Sarah Johnson" category="Gardening" rating={4.7} jobs={98} status="On Leave" />
                        <ProviderRow name="Robert Kim" category="Painting" rating={4.8} jobs={87} status="Active" />
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 5 of 328 providers</div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
                    <button className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm">Next</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceProvidersContent