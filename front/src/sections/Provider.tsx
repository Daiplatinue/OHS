import { useState } from "react"
import MyFloatingDockProvider from "../sections/Styles/MyFloatingDock-Provider"
import { CircleIcon, Calendar, Clock, MapPin, AlertCircle, Check, X, CheckCircle2 } from "lucide-react"
import { Dialog } from "@headlessui/react"

import Footer from "../sections/Styles/Footer"

interface Service {
    id: number
    customerName: string
    serviceName: string
    date: string
    time: string
    location: string
    price: number
    distanceCharge: number
    total: number
    image: string
    createdAt: string
    autoCancelDate: string
    status: "pending" | "ongoing" | "completed" | "cancelled"
    completedDate?: string
}

function ProviderDashboard() {
    const [activeTab, setActiveTab] = useState("pending")
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const [pendingServices, setPendingServices] = useState<Service[]>([
        {
            id: 201,
            customerName: "Emma Wilson",
            serviceName: "Plumbing Services",
            date: "05/15/2025",
            time: "10:30 AM",
            location: "123 Oak Street, Springfield",
            price: 8000,
            distanceCharge: 450,
            total: 8450,
            image: "https://cdn.pixabay.com/photo/2024/07/23/09/14/ai-generated-8914595_1280.jpg",
            createdAt: "05/15/2025",
            autoCancelDate: "05/17/2025",
            status: "pending",
        },
        {
            id: 202,
            customerName: "James Rodriguez",
            serviceName: "Electrical Repairs",
            date: "05/16/2025",
            time: "2:00 PM",
            location: "456 Maple Avenue, Riverside",
            price: 6500,
            distanceCharge: 350,
            total: 6850,
            image: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_1280.jpg",
            createdAt: "05/16/2025",
            autoCancelDate: "05/18/2025",
            status: "pending",
        },
        {
            id: 203,
            customerName: "Sophia Chen",
            serviceName: "Cleaning Services",
            date: "05/18/2025",
            time: "9:00 AM",
            location: "789 Pine Road, Lakeside",
            price: 4000,
            distanceCharge: 300,
            total: 4300,
            image: "https://cdn.pixabay.com/photo/2014/02/17/14/28/vacuum-cleaner-268179_1280.jpg",
            createdAt: "05/18/2025",
            autoCancelDate: "05/20/2025",
            status: "pending",
        },
        {
            id: 204,
            customerName: "Michael Brown",
            serviceName: "Home Renovation",
            date: "05/20/2025",
            time: "11:00 AM",
            location: "321 Cedar Lane, Hillcrest",
            price: 15000,
            distanceCharge: 600,
            total: 15600,
            image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
            createdAt: "05/20/2025",
            autoCancelDate: "05/22/2025",
            status: "pending",
        },
    ])

    // Sample data for ongoing services
    const [ongoingServices, setOngoingServices] = useState<Service[]>([
        {
            id: 101,
            customerName: "David Johnson",
            serviceName: "Lawn Maintenance",
            date: "05/12/2025",
            time: "1:00 PM",
            location: "567 Elm Street, Meadowville",
            price: 3500,
            distanceCharge: 200,
            total: 3700,
            image: "https://cdn.pixabay.com/photo/2017/08/07/01/01/garden-2598867_1280.jpg",
            createdAt: "05/05/2025",
            autoCancelDate: "05/07/2025",
            status: "ongoing",
        },
        {
            id: 102,
            customerName: "Sarah Miller",
            serviceName: "Interior Design",
            date: "05/13/2025",
            time: "11:30 AM",
            location: "890 Birch Avenue, Westfield",
            price: 12000,
            distanceCharge: 500,
            total: 12500,
            image: "https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_1280.jpg",
            createdAt: "05/04/2025",
            autoCancelDate: "05/06/2025",
            status: "ongoing",
        },
    ])

    const [completedServices, setCompletedServices] = useState<Service[]>([
        {
            id: 1,
            customerName: "Jennifer Lee",
            serviceName: "Roof Repair",
            date: "05/01/2025",
            time: "9:00 AM",
            location: "123 Pine Street, Oakville",
            price: 9000,
            distanceCharge: 400,
            total: 9400,
            image: "https://cdn.pixabay.com/photo/2018/03/15/11/57/roof-3228969_1280.jpg",
            createdAt: "04/25/2025",
            autoCancelDate: "04/27/2025",
            status: "completed",
            completedDate: "05/01/2025",
        },
        {
            id: 2,
            customerName: "Robert Garcia",
            serviceName: "Painting Services",
            date: "05/03/2025",
            time: "10:00 AM",
            location: "456 Oak Avenue, Riverdale",
            price: 7500,
            distanceCharge: 350,
            total: 7850,
            image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
            createdAt: "04/26/2025",
            autoCancelDate: "04/28/2025",
            status: "completed",
            completedDate: "05/03/2025",
        },
    ])

    const handleServiceClick = (service: Service) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const handleAcceptService = (serviceId: number) => {
        setIsLoading(true)

        setTimeout(() => {
            const serviceToMove = pendingServices.find((service) => service.id === serviceId)

            if (serviceToMove) {
                const updatedService = { ...serviceToMove, status: "ongoing" as const }

                setPendingServices((prev) => prev.filter((service) => service.id !== serviceId))
                setOngoingServices((prev) => [...prev, updatedService])

                setSuccessMessage("Service accepted successfully!")
                setIsSuccessModalOpen(true)

                setTimeout(() => {
                    setIsSuccessModalOpen(false)
                }, 5000)
            }

            setIsModalOpen(false)
            setIsLoading(false)
        }, 1500)
    }

    const handleCompleteService = (serviceId: number) => {
        setIsLoading(true)

        setTimeout(() => {
            const serviceToMove = ongoingServices.find((service) => service.id === serviceId)

            if (serviceToMove) {
                const today = new Date()
                const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}`

                const updatedService = {
                    ...serviceToMove,
                    status: "completed" as const,
                    completedDate: formattedDate,
                }

                setOngoingServices((prev) => prev.filter((service) => service.id !== serviceId))
                setCompletedServices((prev) => [...prev, updatedService])

                setSuccessMessage("Service completed successfully! Customer and provider agreement is complete.")
                setIsModalOpen(false)
                setIsSuccessModalOpen(true)

                setTimeout(() => {
                    setIsSuccessModalOpen(false)
                }, 5000)
            }

            setIsLoading(false)
        }, 5000)
    }

    const handleCancelService = (serviceId: number) => {
        setIsLoading(true)

        setTimeout(() => {
            setOngoingServices((prev) => prev.filter((service) => service.id !== serviceId))

            setSuccessMessage("Service has been cancelled.")
            setIsModalOpen(false)
            setIsSuccessModalOpen(true)

            setTimeout(() => {
                setIsSuccessModalOpen(false)
            }, 5000)

            setIsLoading(false)
        }, 1500)
    }

    const getDaysRemaining = (autoCancelDate: string) => {
        const today = new Date()
        const cancelDate = new Date(autoCancelDate)
        const diffTime = cancelDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const renderPendingServicesTable = () => {
        return (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-sm">PENDING SERVICES</h2>
                    <div className="text-xs text-gray-600">Auto-cancellation in 2 days if not accepted</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Customer
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date & Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Auto-Cancel
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingServices.length > 0 ? (
                                pendingServices.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{service.customerName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{service.serviceName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.date}
                                                <Clock className="h-4 w-4 ml-2 mr-1 text-gray-400" />
                                                {service.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">₱{service.total.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getDaysRemaining(service.autoCancelDate) <= 1 ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        {service.autoCancelDate}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-900">{service.autoCancelDate}</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                        No pending services found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const renderOngoingServicesTable = () => {
        return (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-sm">ONGOING SERVICES</h2>
                    <div className="text-xs text-gray-600">Services currently in progress</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Customer
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date & Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ongoingServices.length > 0 ? (
                                ongoingServices.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{service.customerName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{service.serviceName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.date}
                                                <Clock className="h-4 w-4 ml-2 mr-1 text-gray-400" />
                                                {service.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">₱{service.total.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                                                In Progress
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                        No ongoing services found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const renderCompletedServicesTable = () => {
        return (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-sm">COMPLETED SERVICES</h2>
                    <div className="text-xs text-gray-600">Service history</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Customer
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date & Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Completed On
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {completedServices.length > 0 ? (
                                completedServices.map((service) => (
                                    <tr
                                        key={service.id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{service.customerName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{service.serviceName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.date}
                                                <Clock className="h-4 w-4 ml-2 mr-1 text-gray-400" />
                                                {service.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                {service.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">₱{service.total.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Check className="h-3 w-3 mr-1" />
                                                {service.completedDate}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                        No completed services found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-5 bg-white text-gray-800">
            {/* Main Dashboard Container with Margin */}
            <div className="m-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                    <div className="font-bold text-sm">PROVIDER DASHBOARD</div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div>PID - 1001</div>
                        <div>EMAIL - Providersamalamang@gmail.com</div>
                        <div>COMPANY - We Are The World</div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="relative">
                    <div className="absolute inset-0 h-48 z-0">
                        <div className="h-full w-full bg-blue-50 relative">
                            <img
                                src="https://cdn.pixabay.com/photo/2020/03/25/16/55/spain-4967963_1280.jpg"
                                alt="City skyline"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-6 p-6 relative z-10">
                        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-64 mt-50">
                            <div className="text-xs font-semibold mb-auto">TOTAL PENDINGS</div>
                            <div className="flex flex-col items-center justify-end h-full pb-4">
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="transparent"
                                            stroke="#f97316"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="85"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold">413</span>
                                        <span className="text-xs text-gray-500">BOOKED</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-purple-600 fill-purple-600" />
                                        <span>Last 24H - 125</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-orange-500 fill-orange-500" />
                                        <span>Average - 400</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-64 mt-50">
                            <div className="text-xs font-semibold mb-auto">ONGOING SERVICES</div>
                            <div className="flex flex-col items-center justify-end h-full pb-4">
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="transparent"
                                            stroke="#3b82f6"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="170"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold">231</span>
                                        <span className="text-xs text-gray-500">SERVICES</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-blue-600 fill-blue-600" />
                                        <span>Last 24H - 52</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-gray-500 fill-gray-500" />
                                        <span>Average - 100</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-64 mt-50">
                            <div className="text-xs font-semibold mb-auto">TOTAL EQUIPMENT</div>
                            <div className="flex flex-col items-center justify-end h-full pb-4">
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="transparent"
                                            stroke="#22c55e"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="140"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold">879</span>
                                        <span className="text-xs text-gray-500">EQUIPMENTS</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-green-600 fill-green-600" />
                                        <span>Good Condtition - 572</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-red-600 fill-red-600" />
                                        <span>Bad Condtition - 307</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-64 mt-50">
                            <div className="text-xs font-semibold mb-auto">COMPLETED SERVICES</div>
                            <div className="flex flex-col items-center justify-end h-full pb-4">
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="transparent"
                                            stroke="#eab308"
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset="10"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold">9825</span>
                                        <span className="text-xs text-gray-500">COMPLETED</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-yellow-600 fill-yellow-600" />
                                        <span>POSITIVE REVIEW - 9024</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CircleIcon className="w-2 h-2 text-gray-500 fill-gray-500" />
                                        <span>NEGATIVE REVIEW - 801</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-64 mt-50">
                            <div className="text-xs font-semibold mb-auto">TOTAL BOOKINGS</div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <span className="text-5xl font-bold text-blue-600">10982</span>
                                <div className="text-xs text-gray-500 mt-2">LAST 7 DAYS</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="px-6 border-b border-gray-200">
                    <nav className="flex -mb-px overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("pending")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === "pending"
                                ? "border-sky-500 text-sky-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Pending Services
                        </button>
                        <button
                            onClick={() => setActiveTab("ongoing")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === "ongoing"
                                ? "border-sky-500 text-sky-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Ongoing Services
                        </button>
                        <button
                            onClick={() => setActiveTab("completed")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === "completed"
                                ? "border-sky-500 text-sky-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Completed Services
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "pending" && renderPendingServicesTable()}
                    {activeTab === "ongoing" && renderOngoingServicesTable()}
                    {activeTab === "completed" && renderCompletedServicesTable()}
                </div>
            </div>

            {/* Service Details Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
                    <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all border border-white/20">
                        {selectedService && (
                            <div className="flex flex-col h-full">
                                {/* Image Section - Top */}
                                <div className="relative h-48 w-full">
                                    <img
                                        src={selectedService.image || "/placeholder.svg"}
                                        alt={selectedService.serviceName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

                                    {/* Service name overlay on image */}
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h3 className="text-2xl font-light text-white tracking-tight">{selectedService.serviceName}</h3>
                                        <div
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 
                      ${selectedService.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : selectedService.status === "ongoing"
                                                        ? "bg-sky-100 text-sky-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {selectedService.status === "pending"
                                                ? "Pending"
                                                : selectedService.status === "ongoing"
                                                    ? "In Progress"
                                                    : "Completed"}
                                        </div>
                                    </div>

                                    {/* Close button */}
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-4 left-4 bg-black/20 backdrop-blur-xl p-2 rounded-full hover:bg-black/30 transition-all duration-200 text-white"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Content Section - Below image, scrollable */}
                                <div className="p-6 max-h-[60vh] overflow-y-auto">
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                            <div>
                                                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Customer</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900">{selectedService.customerName}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Created On</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900">{selectedService.createdAt}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Date & Time</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900 flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    {selectedService.date}, {selectedService.time}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Location</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900 flex items-start">
                                                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{selectedService.location}</span>
                                                </p>
                                            </div>
                                            {selectedService.status === "pending" && (
                                                <div>
                                                    <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                        Auto-Cancellation
                                                    </h3>
                                                    <p className="mt-1 text-base font-medium text-gray-900 flex items-center">
                                                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                        {selectedService.autoCancelDate}
                                                    </p>
                                                </div>
                                            )}
                                            {selectedService.status === "completed" && selectedService.completedDate && (
                                                <div>
                                                    <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Completed On</h3>
                                                    <p className="mt-1 text-base font-medium text-gray-900 flex items-center">
                                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                                        {selectedService.completedDate}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6">
                                            <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-4">
                                                Payment Summary
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Service Fee</span>
                                                    <span className="font-medium">₱{selectedService.price.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Distance Charge</span>
                                                    <span className="font-medium">₱{selectedService.distanceCharge.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-200 mt-3">
                                                    <span>Total</span>
                                                    <span className="text-sky-600">₱{selectedService.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {selectedService.status === "pending" &&
                                                getDaysRemaining(selectedService.autoCancelDate) <= 1 && (
                                                    <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl p-4 text-red-800 text-sm">
                                                        <p className="font-medium flex items-center">
                                                            <AlertCircle className="h-4 w-4 mr-2" />
                                                            This service request will be automatically cancelled on {selectedService.autoCancelDate}{" "}
                                                            if not accepted.
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer with buttons - Fixed at bottom */}
                                <div className="p-6 border-t border-gray-100">
                                    <div className="flex space-x-4">
                                        {selectedService.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleAcceptService(selectedService.id)}
                                                    disabled={isLoading}
                                                    className={`flex-1 px-6 py-3 text-white rounded-full transition-all duration-200 font-medium text-sm ${isLoading
                                                        ? "bg-sky-400 cursor-wait"
                                                        : "bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-200"
                                                        }`}
                                                >
                                                    {isLoading ? (
                                                        <span className="flex items-center justify-center">
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center justify-center">
                                                            <Check className="h-4 w-4 mr-2" />
                                                            Accept Service
                                                        </span>
                                                    )}
                                                </button>
                                            </>
                                        )}

                                        {selectedService.status === "ongoing" && (
                                            <>
                                                <button
                                                    onClick={() => handleCancelService(selectedService.id)}
                                                    disabled={isLoading}
                                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                                                >
                                                    Cancel Service
                                                </button>
                                                <button
                                                    onClick={() => handleCompleteService(selectedService.id)}
                                                    disabled={isLoading}
                                                    className={`flex-1 px-6 py-3 text-white rounded-full transition-all duration-200 font-medium text-sm ${isLoading
                                                        ? "bg-green-400 cursor-wait"
                                                        : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200"
                                                        }`}
                                                >
                                                    {isLoading ? (
                                                        <span className="flex items-center justify-center">
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Completing...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center justify-center">
                                                            <Check className="h-4 w-4 mr-2" />
                                                            Complete Service
                                                        </span>
                                                    )}
                                                </button>
                                            </>
                                        )}

                                        {selectedService.status === "completed" && (
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                                            >
                                                Close
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
                    <Dialog.Panel className="mx-auto max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all border border-white/20 p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-[pulse_2s_ease-in-out_infinite]">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>

                            <Dialog.Title className="text-xl font-medium text-gray-900 mb-2">Success!</Dialog.Title>
                            <p className="text-gray-600 mb-6">{successMessage}</p>

                            <button
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <Footer />

            {/* Floating Dock */}
            <div className="z-40 flex">
                <MyFloatingDockProvider />
            </div>
        </div>
    )
}

export default ProviderDashboard