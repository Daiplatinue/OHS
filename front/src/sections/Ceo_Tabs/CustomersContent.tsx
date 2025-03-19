import { Filter, Search } from "lucide-react"

function CustomerRow({ name, email, location, spent, lastService }: any) {
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
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{spent}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lastService}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-teal-600 hover:text-teal-900">View</button>
            </td>
        </tr>
    )
}

function CustomersContent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800">Customers</h2>
                <div className="flex space-x-2">
                    <div className="relative">
                        <input type="text" placeholder="Search customers" className="pl-9 pr-4 py-2 border rounded-md text-sm" />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center">
                        <Filter className="h-4 w-4 mr-1" /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Service
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <CustomerRow
                            name="Emma Wilson"
                            email="emma.w@example.com"
                            location="New York, NY"
                            spent="$1,240"
                            lastService="2 days ago"
                        />
                        <CustomerRow
                            name="Michael Brown"
                            email="michael.b@example.com"
                            location="Los Angeles, CA"
                            spent="$890"
                            lastService="1 week ago"
                        />
                        <CustomerRow
                            name="Sophia Martinez"
                            email="sophia.m@example.com"
                            location="Chicago, IL"
                            spent="$2,150"
                            lastService="3 days ago"
                        />
                        <CustomerRow
                            name="James Taylor"
                            email="james.t@example.com"
                            location="Houston, TX"
                            spent="$560"
                            lastService="2 weeks ago"
                        />
                        <CustomerRow
                            name="Olivia Davis"
                            email="olivia.d@example.com"
                            location="Phoenix, AZ"
                            spent="$1,780"
                            lastService="Yesterday"
                        />
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 5 of 2,453 customers</div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
                    <button className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm">Next</button>
                </div>
            </div>
        </div>
    )
}

export default CustomersContent