import { Home, Users, DollarSign, Clock, Droplet, Wrench, Zap, Brush, Star, AlignLeft, BadgeAlert } from "lucide-react"
import type { ApexOptions } from "apexcharts"
import ReactApexChart from "react-apexcharts"
import MyFloatingDock from "./Styles/MyFloatingDock"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "./Styles/Footer"

function Admin() {
  // Get current time for greeting
  const currentHour = new Date().getHours()
  let greeting = "Good Morning"
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon"
  } else if (currentHour >= 18) {
    greeting = "Good Evening"
  }

  // Metrics data
  const metrics = [
    {
      icon: <Home className="h-5 w-5 text-white" />,
      label: "Services",
      value: "421",
      bgColor: "bg-[#0A84FF]",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-white" />,
      label: "Revenue",
      value: "$ 8.2k",
      bgColor: "bg-[#0A84FF]",
    },
    {
      icon: <Users className="h-5 w-5 text-white" />,
      label: "Customers",
      value: "325",
      bgColor: "bg-[#0A84FF]",
    },
    {
      icon: <Clock className="h-5 w-5 text-white" />,
      label: "Pending",
      value: "18",
      bgColor: "bg-[#0A84FF]",
    },
  ]

  // Service categories
  const serviceCategories = [
    { icon: <AlignLeft className="h-5 w-5" />, label: "Overview", active: true },
    { icon: <BadgeAlert className="h-5 w-5" />, label: "TBA", active: false },
    { icon: <BadgeAlert className="h-5 w-5" />, label: "TBA", active: false },
    { icon: <BadgeAlert className="h-5 w-5" />, label: "TBA", active: false },
  ]

  // Sales chart options
  const salesChartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 200,
      toolbar: {
        show: false,
      },
      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#0A84FF",
            opacity: 0.8,
          },
          {
            offset: 100,
            color: "#0A84FF",
            opacity: 0.2,
          },
        ],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "10px",
        },
      },
    },
    grid: {
      borderColor: "rgba(203, 213, 225, 0.5)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ["#0A84FF"],
    tooltip: {
      theme: "light",
    },
  }

  const salesChartSeries = [
    {
      name: "Bookings",
      data: [45, 52, 38, 65, 73, 80],
    },
  ]

  // Service performance chart options
  const serviceChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Plumbing", "Repair", "Electrical", "Cleaning", "Painting"],
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "10px",
        },
      },
    },
    grid: {
      borderColor: "rgba(203, 213, 225, 0.5)",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ["#0A84FF"],
    tooltip: {
      theme: "light",
    },
  }

  const serviceChartSeries = [
    {
      name: "Services Completed",
      data: [89, 65, 72, 53, 42],
    },
  ]

  // Recent service requests data
  const recentRequests = [
    { id: "SR-6514", service: "Plumbing", location: "Downtown", status: "Pending" },
    { id: "SR-5248", service: "Electrical", location: "Westside", status: "Completed" },
    { id: "SR-6548", service: "Cleaning", location: "Northside", status: "In Progress" },
    { id: "SR-7591", service: "Repair", location: "Eastside", status: "Completed" },
  ]

  // Customer feedback data
  const customerFeedback = [
    {
      type: "Plumbing Service",
      customer: "John Smith",
      time: "2 hours ago",
      rating: 5,
      icon: <Droplet className="h-5 w-5 text-white" />,
    },
    {
      type: "Electrical Repair",
      customer: "Sarah Johnson",
      time: "5 hours ago",
      rating: 4,
      icon: <Zap className="h-5 w-5 text-white" />,
    },
    {
      type: "House Cleaning",
      customer: "Michael Brown",
      time: "1 day ago",
      rating: 5,
      icon: <Brush className="h-5 w-5 text-white" />,
    },
    {
      type: "Appliance Repair",
      customer: "Emily Davis",
      time: "2 days ago",
      rating: 4,
      icon: <Wrench className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F5F5F7] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Dashboard */}
        <div className="overflow-hidden max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl p-6 mb-8 text-white shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-2xl font-semibold">{greeting}, Admin</h1>
                <p className="text-white/90 font-light">Manage your home service business from one dashboard</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <div className="rounded-full bg-white/20 p-1">{metric.icon}</div>
                    <div>
                      <span className="font-medium">{metric.value}</span>
                      <span className="text-xs ml-1 font-light">{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Categories */}
            <div className="flex overflow-x-auto pb-2 mt-6">
              <div className="inline-flex rounded-xl p-1 bg-white/20 backdrop-blur-sm">
                {serviceCategories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl ${category.active
                        ? "bg-white text-[#0A84FF] shadow-sm"
                        : "bg-transparent text-white hover:bg-white/10"
                      } cursor-pointer transition-colors mx-1 first:ml-0 last:mr-0`}
                  >
                    <div className={`${category.active ? "text-[#0A84FF]" : "text-white"}`}>{category.icon}</div>
                    <span className="font-medium">{category.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Booking Trends */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Booking Trends</h3>
                <div className="h-[200px]">
                  <ReactApexChart options={salesChartOptions} series={salesChartSeries} type="area" height="100%" />
                </div>
              </CardContent>
            </Card>

            {/* Monthly Target */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Monthly Target</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 text-sm font-light">75.5%</span>
                  <span className="text-gray-700 text-sm font-light">24.5%</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-1.5 bg-[#F2F2F7] rounded-full flex-grow">
                    <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: "75.5%" }}></div>
                  </div>
                  <div className="h-1.5 bg-[#F2F2F7] rounded-full w-1/4"></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-4 font-light">
                  <span>320 services</span>
                  <span>425 target</span>
                </div>
                <div className="text-xs text-gray-500 mb-4 font-light">This Month</div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xl font-medium text-gray-800">$8.2k</div>
                    <div className="text-xs text-gray-500 flex items-center font-light">
                      Revenue
                      <span className="text-[#30D158] ml-1">↑</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-medium text-gray-800">128</div>
                    <div className="text-xs text-gray-500 flex items-center font-light">
                      New Bookings
                      <span className="text-[#30D158] ml-1">↑</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-medium text-gray-800">96%</div>
                    <div className="text-xs text-gray-500 flex items-center font-light">
                      Satisfaction
                      <span className="text-[#30D158] ml-1">↑</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Performance */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Service Performance</h3>
                  <Tabs defaultValue="week" className="w-auto">
                    <TabsList className="bg-[#F2F2F7]">
                      <TabsTrigger value="week" className="text-xs data-[state=active]:bg-white">
                        Week
                      </TabsTrigger>
                      <TabsTrigger value="month" className="text-xs data-[state=active]:bg-white">
                        Month
                      </TabsTrigger>
                      <TabsTrigger value="year" className="text-xs data-[state=active]:bg-white">
                        Year
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="h-[200px]">
                  <ReactApexChart options={serviceChartOptions} series={serviceChartSeries} type="bar" height="100%" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Service Requests */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Recent Service Requests</h3>
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 text-xs font-light">
                      <th className="text-left pb-2">Request ID</th>
                      <th className="text-left pb-2">Service</th>
                      <th className="text-left pb-2">Location</th>
                      <th className="text-left pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="py-3 text-sm font-medium">{request.id}</td>
                        <td className="py-3 text-sm font-light">{request.service}</td>
                        <td className="py-3 text-sm font-light">{request.location}</td>
                        <td className="py-3 text-sm">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-light ${request.status === "Pending"
                                ? "bg-[#FFF8E6] text-[#FF9500]"
                                : request.status === "In Progress"
                                  ? "bg-[#E9F6FF] text-[#0A84FF]"
                                  : "bg-[#E8F8EF] text-[#30D158]"
                              }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Customer Feedback */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Customer Feedback</h3>
                  <span className="text-xs text-[#0A84FF] font-medium">View all</span>
                </div>
                <div className="space-y-4">
                  {customerFeedback.map((feedback, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-[#0A84FF] p-2 mt-1">{feedback.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-800">{feedback.type}</h4>
                        <p className="text-xs text-gray-500 font-light">Customer: {feedback.customer}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < feedback.rating ? "text-[#FF9500] fill-[#FF9500]" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-light">{feedback.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Analytics */}
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Service Analytics</h3>
                  <span className="text-xs text-gray-500 font-light">This Month</span>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Circular progress chart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                          <span className="text-2xl font-medium text-gray-800">320</span>
                          <span className="text-xs text-gray-500 font-light">Services</span>
                        </div>
                      </div>
                      {/* Overlay colored segments */}
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-tr-full bg-[#0A84FF]"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 rounded-br-full bg-[#5AC8FA]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#0A84FF] mr-2"></div>
                      <span className="text-sm text-gray-700 font-light">Plumbing</span>
                    </div>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#5AC8FA] mr-2"></div>
                      <span className="text-sm text-gray-700 font-light">Electrical</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#64D2FF] mr-2"></div>
                      <span className="text-sm text-gray-700 font-light">Cleaning</span>
                    </div>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#8E8E93] mr-2"></div>
                      <span className="text-sm text-gray-700 font-light">Others</span>
                    </div>
                    <span className="text-sm font-medium">16%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Admin

