import {
  ChevronRight,
  Briefcase,
  BarChart2,
  Settings,
  Activity,
  Star,
  Zap,
  Calendar,
  UserPlus,
  FolderPlus,
} from "lucide-react"

import MyFloatingDockCeo from "./Styles/MyFloatingDock-Ceo"

export default function Ceo() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky top-0 z-40 flex">
        <MyFloatingDockCeo />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl p-6 text-white mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Dashboard Overview</h2>
          <p className="text-white/90 mb-4 font-light">
            Here's what's happening with your home services business today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/90 text-sm font-light">Total Revenue</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-medium">$245,680</h3>
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-light">+12.5%</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/90 text-sm font-light">Active Providers</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-medium">2,723</h3>
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-light">+5.3%</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/90 text-sm font-light">Total Services</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-medium">728</h3>
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-light">+8.2%</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/90 text-sm font-light">Customer Satisfaction</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-medium">4.8/5.0</h3>
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-light">+0.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Service distribution */}
          <div className="bg-white rounded-2xl p-6 h-full shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Service Distribution
            </h3>
            <div className="space-y-3">
              <ServiceDistributionBar name="Cleaning" percentage={35} color="bg-[#0A84FF]" />
              <ServiceDistributionBar name="Plumbing" percentage={20} color="bg-[#5AC8FA]" />
              <ServiceDistributionBar name="Electrical" percentage={18} color="bg-[#30B0C7]" />
              <ServiceDistributionBar name="Gardening" percentage={12} color="bg-[#64D2FF]" />
              <ServiceDistributionBar name="Painting" percentage={10} color="bg-[#0071E3]" />
              <ServiceDistributionBar name="Other" percentage={5} color="bg-[#8E8E93]" />
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl p-6 h-full shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <ActivityItem
                title="New service provider joined"
                description="John Smith registered as a Plumbing expert"
                time="2 hours ago"
              />
              <ActivityItem
                title="Customer complaint resolved"
                description="Issue with cleaning service at 123 Main St resolved"
                time="4 hours ago"
              />
              <ActivityItem
                title="New service category added"
                description="Home Security Systems added to service offerings"
                time="Yesterday"
              />
            </div>
            <button className="mt-4 text-[#0A84FF] text-sm font-medium flex items-center group">
              View all activity
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Top performers */}
          <div className="bg-white rounded-2xl p-6 h-full shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Top Performers
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#E9F6FF] rounded-full flex items-center justify-center text-[#0A84FF] font-medium mr-3">
                    JS
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">John Smith</p>
                    <p className="text-xs text-gray-500 font-light">Plumbing • 142 jobs</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#FF9500] fill-current" />
                  <span className="text-sm font-medium ml-1">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#E9F6FF] rounded-full flex items-center justify-center text-[#5AC8FA] font-medium mr-3">
                    MG
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Maria Garcia</p>
                    <p className="text-xs text-gray-500 font-light">Cleaning • 118 jobs</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#FF9500] fill-current" />
                  <span className="text-sm font-medium ml-1">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#E9F6FF] rounded-full flex items-center justify-center text-[#30B0C7] font-medium mr-3">
                    DC
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">David Chen</p>
                    <p className="text-xs text-gray-500 font-light">Electrical • 105 jobs</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-[#FF9500] fill-current" />
                  <span className="text-sm font-medium ml-1">4.9</span>
                </div>
              </div>
            </div>
            <button className="mt-4 text-[#0A84FF] text-sm font-medium flex items-center group">
              View all providers
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-[#0A84FF]" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              icon={<UserPlus className="h-5 w-5 text-[#0A84FF]" />}
              label="Add Provider"
              bgColor="bg-[#F2F2F7]"
            />
            <QuickActionButton
              icon={<FolderPlus className="h-5 w-5 text-[#5AC8FA]" />}
              label="Add Service"
              bgColor="bg-[#F2F2F7]"
            />
            <QuickActionButton
              icon={<BarChart2 className="h-5 w-5 text-[#30B0C7]" />}
              label="View Reports"
              bgColor="bg-[#F2F2F7]"
            />
            <QuickActionButton
              icon={<Settings className="h-5 w-5 text-[#8E8E93]" />}
              label="Settings"
              bgColor="bg-[#F2F2F7]"
            />
          </div>
        </div>

        {/* Upcoming services */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Upcoming Services
            </h3>
            <button className="text-[#0A84FF] text-sm font-medium flex items-center group">
              View calendar
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl overflow-hidden">
              <thead className="bg-[#F2F2F7]">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <ServiceRequestRow
                  customer="Michael Brown"
                  service="Plumbing Repair"
                  date="Today, 1:15 PM"
                  provider="John Smith"
                  status="In Progress"
                />
                <ServiceRequestRow
                  customer="Sophia Martinez"
                  service="Electrical Wiring"
                  date="Today, 3:45 PM"
                  provider="David Chen"
                  status="Scheduled"
                />
                <ServiceRequestRow
                  customer="James Taylor"
                  service="Lawn Mowing"
                  date="Tomorrow, 9:00 AM"
                  provider="Sarah Johnson"
                  status="Scheduled"
                />
                <ServiceRequestRow
                  customer="Emily Wilson"
                  service="House Cleaning"
                  date="Tomorrow, 2:30 PM"
                  provider="Maria Garcia"
                  status="Scheduled"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Business stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Monthly Revenue
            </h3>
            <div className="h-64 flex items-end space-x-2">
              {[65, 40, 70, 85, 60, 55, 75, 80, 90, 75, 60, 70].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-[#0A84FF] to-[#5AC8FA] rounded-t-lg"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 font-light">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-[#0A84FF]" />
              Service Requests
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <p className="text-gray-500 text-sm font-light">Pending</p>
                <div className="flex items-center mt-2">
                  <h3 className="text-2xl font-medium text-gray-800">24</h3>
                  <span className="ml-2 px-2 py-0.5 bg-[#FFF8E6] text-[#FF9500] rounded-full text-xs font-light">
                    +3 today
                  </span>
                </div>
              </div>
              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <p className="text-gray-500 text-sm font-light">In Progress</p>
                <div className="flex items-center mt-2">
                  <h3 className="text-2xl font-medium text-gray-800">18</h3>
                  <span className="ml-2 px-2 py-0.5 bg-[#E9F6FF] text-[#0A84FF] rounded-full text-xs font-light">
                    +2 today
                  </span>
                </div>
              </div>
              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <p className="text-gray-500 text-sm font-light">Completed</p>
                <div className="flex items-center mt-2">
                  <h3 className="text-2xl font-medium text-gray-800">156</h3>
                  <span className="ml-2 px-2 py-0.5 bg-[#E8F8EF] text-[#30D158] rounded-full text-xs font-light">
                    +12 today
                  </span>
                </div>
              </div>
              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <p className="text-gray-500 text-sm font-light">Cancelled</p>
                <div className="flex items-center mt-2">
                  <h3 className="text-2xl font-medium text-gray-800">7</h3>
                  <span className="ml-2 px-2 py-0.5 bg-[#FFE5E7] text-[#FF453A] rounded-full text-xs font-light">
                    +1 today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ title, description, time } : any) {
  return (
    <div className="border-l-2 border-[#0A84FF] pl-4 py-2">
      <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 font-light">{description}</p>
      <p className="text-xs text-gray-400 mt-1 font-light">{time}</p>
    </div>
  )
}

function QuickActionButton({ icon, label, bgColor } : any) {
  return (
    <button
      className={`flex flex-col items-center justify-center ${bgColor} hover:bg-opacity-80 rounded-xl p-4 transition-all shadow-sm`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm text-gray-700 font-light">{label}</span>
    </button>
  )
}

function ServiceDistributionBar({ name, percentage, color } : any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700 font-light">{name}</span>
        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-[#F2F2F7] rounded-full h-1.5">
        <div className={`${color} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function ServiceRequestRow({ customer, service, date, status, provider } : any) {
  return (
    <tr className="hover:bg-[#F2F2F7]/50">
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{customer}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-light">{service}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-light">{date}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-light">{provider}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`px-2 py-0.5 text-xs font-light rounded-full ${
            status === "Completed"
              ? "bg-[#E8F8EF] text-[#30D158]"
              : status === "In Progress"
                ? "bg-[#E9F6FF] text-[#0A84FF]"
                : "bg-[#FFF8E6] text-[#FF9500]"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button className="text-[#0A84FF] hover:text-[#0071E3] flex items-center gap-1 group text-sm">
          Details
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </td>
    </tr>
  )
}