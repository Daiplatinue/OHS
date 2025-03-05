import { useState } from 'react';
import { Area, AreaChart, BarChart as RechartsBarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Users, Mail, TrendingUp, DollarSign } from 'lucide-react';

import MyFloatingDockCeo from './Styles/MyFloatingDock-Ceo';

const chartData = [
  { time: '10 AM', value: 15000, users: 150 },
  { time: '1 PM', value: 25000, users: 220 },
  { time: '4 PM', value: 18000, users: 180 },
  { time: '7 PM', value: 28000, users: 280 },
  { time: '10 PM', value: 20000, users: 200 },
  { time: '1 AM', value: 32000, users: 320 },
  { time: '4 AM', value: 24000, users: 240 },
  { time: '7 AM', value: 30000, users: 300 },
  { time: '10 AM', value: 28000, users: 280 },
];

const timeRanges = ['24H', '1W', '1M', '1Y', 'ALL'];

function Dashboard() {
  const [selectedRange, setSelectedRange] = useState('24H');

  return (
    <div className="space-y-8 p-8">

      {/* Floating Dock - Now at the top */}
      <div className="sticky z-40 flex">
        <MyFloatingDockCeo />
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-gray-200/70 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">$150,000.00</h2>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-2xl">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="text-green-600 mr-2" size={16} />
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-gray-200/70 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">2,453</h2>
            </div>
            <div className="bg-sky-500/10 p-3 rounded-2xl">
              <Users className="text-sky-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Activity className="text-sky-600 mr-2" size={16} />
            <span className="text-sky-600">+8.2%</span>
            <span className="text-gray-500 ml-2">vs last week</span>
          </div>
        </div>

        {/* Engagement Rate Card */}
        <div className="bg-gray-200/70 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Engagement Rate</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">64.8%</h2>
            </div>
            <div className="bg-green-500/10 p-3 rounded-2xl">
              <Mail className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="text-green-600 mr-2" size={16} />
            <span className="text-green-600">+5.7%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Upgrade Card */}
      <div className="bg-gradient-to-r from-green-500 to-lime-400 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Upgrade to Premium
            </h3>
            <p className="text-white/90 mb-4 max-w-md">
              Get unlimited access to advanced analytics and premium features
            </p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Upgrade Now
            </button>
          </div>
          <div className="w-40 h-40 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white/30 rounded-full animate-pulse delay-75"></div>
            <div className="absolute inset-8 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart */}
        <div className="bg-gray-200/70 rounded-2xl p-8 lg:col-span-2 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-900">Portfolio Performance</h3>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Statistic</span>
                <span className="text-green-600">Transactions</span>
              </div>
            </div>
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${selectedRange === range
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#4B5563' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#4B5563' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ color: '#22C55E' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22C55E"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-gray-200/70 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-900">User Activity</h3>
            <select className="bg-white border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#4B5563' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#4B5563' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Bar
                  dataKey="users"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>
                  </defs>
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;