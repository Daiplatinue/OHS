import { Calendar, Users, CreditCard, BarChart2, LineChart, TrendingUp, DollarSign } from 'lucide-react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import MyFloatingDock from './Styles/MyFloatingDock';

function Admin() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = {
    totalUsers: 2458,
    onHoldPayments: 37,
    totalRevenue: '$124,592.30',
    activeProjects: 18
  };

  const barChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      }
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
        style: {
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      },
      labels: {
        style: {
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#007AFF', '#34C759']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      },
      style: {
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      }
    },
    theme: {
      mode: 'light',
      palette: 'palette1',
    },
    grid: {
      borderColor: '#F2F2F7',
    },
    colors: ['#007AFF', '#34C759']
  };

  const barChartSeries = [{
    name: 'Budget',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 68, 78, 74]
  }, {
    name: 'Sales',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 106]
  }];

  const lineChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      },
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.05
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      }
    },
    title: {
      text: 'Monthly Revenue',
      align: 'left',
      style: {
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 600
      }
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    theme: {
      mode: 'light'
    },
    colors: ['#007AFF'],
    grid: {
      borderColor: '#F2F2F7',
    }
  };

  const lineChartSeries = [{
    name: "Revenue",
    data: [28, 29, 33, 36, 32, 32, 33, 39, 37, 35, 42, 46]
  }];

  const areaChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2023-01-01T00:00:00.000Z',
        '2023-02-01T00:00:00.000Z',
        '2023-03-01T00:00:00.000Z',
        '2023-04-01T00:00:00.000Z',
        '2023-05-01T00:00:00.000Z',
        '2023-06-01T00:00:00.000Z',
        '2023-07-01T00:00:00.000Z',
        '2023-08-01T00:00:00.000Z',
        '2023-09-01T00:00:00.000Z',
        '2023-10-01T00:00:00.000Z',
        '2023-11-01T00:00:00.000Z',
        '2023-12-01T00:00:00.000Z',
      ],
      labels: {
        style: {
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
      style: {
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      }
    },
    title: {
      text: 'Product Performance',
      align: 'left',
      style: {
        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 600
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ['#5856D6', '#FF2D55', '#007AFF', '#34C759'],
    grid: {
      borderColor: '#F2F2F7',
    }
  };

  const areaChartSeries = [
    {
      name: 'Product A',
      data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 126]
    },
    {
      name: 'Product B',
      data: [11, 32, 45, 32, 34, 52, 41, 60, 49, 52, 38, 47]
    },
    {
      name: 'Product C',
      data: [8, 11, 22, 21, 17, 25, 37, 22, 29, 34, 25, 32]
    },
    {
      name: 'Product D',
      data: [5, 9, 12, 16, 11, 18, 21, 14, 19, 22, 28, 31]
    }
  ];

  const pendingAccounts = [
    {
      id: 'PA-7829',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'Developer',
      status: 'Verification Pending',
      date: '2023-12-15',
      avatar: 'MC'
    },
    {
      id: 'PA-6543',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Designer',
      status: 'Document Review',
      date: '2023-12-18',
      avatar: 'SJ'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7]">

      {/* Floating Dock - Now at the top */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
              <div className="relative h-64 md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Dashboard Overview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">Welcome to Your Admin Panel</h3>
                    <p className="text-sm opacity-90">Manage your application, users, and content from one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Overview</h2>

              <div className="space-y-6">
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-yellow-50 rounded-xl">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-full p-3">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">On Hold Payments</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.onHoldPayments}</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-2">Today's Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Budget vs Sales</h2>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 bg-[#007AFF] rounded-full"></span>
                <span className="text-sm text-gray-600 mr-3">Budget</span>
                <span className="inline-block w-3 h-3 bg-[#34C759] rounded-full"></span>
                <span className="text-sm text-gray-600">Sales</span>
              </div>
            </div>
            <div className="h-80">
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height="100%"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Revenue Trends</h2>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="h-80">
              <ReactApexChart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height="100%"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Product Performance</h2>
              <BarChart2 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="h-80">
              <ReactApexChart
                options={areaChartOptions}
                series={areaChartSeries}
                type="area"
                height="100%"
              />
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Performance Indicators</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-[#E5E5EA] rounded-full p-2">
                    <DollarSign className="h-5 w-5 text-[#007AFF]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-lg font-bold text-gray-900">{stats.totalRevenue}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-[#007AFF] h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">70% of yearly target</p>
                </div>
              </div>

              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-[#E5E5EA] rounded-full p-2">
                    <BarChart2 className="h-5 w-5 text-[#34C759]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Active Projects</p>
                    <p className="text-lg font-bold text-gray-900">{stats.activeProjects}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-[#34C759] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">85% completion rate</p>
                </div>
              </div>

              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-[#E5E5EA] rounded-full p-2">
                    <Users className="h-5 w-5 text-[#5856D6]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">New Users</p>
                    <p className="text-lg font-bold text-gray-900">+128</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-[#5856D6] h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
                </div>
              </div>

              <div className="bg-[#F2F2F7] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="bg-[#E5E5EA] rounded-full p-2">
                    <LineChart className="h-5 w-5 text-[#FF2D55]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-lg font-bold text-gray-900">24.8%</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-white rounded-full h-2">
                    <div className="bg-[#FF2D55] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+5% from last week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Accounts Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Accounts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingAccounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5E5EA] flex items-center justify-center">
                          <span className="text-gray-600 font-medium">{account.avatar}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">{account.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">{account.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">Approve</button>
                      <button className="text-red-600 hover:text-red-800">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5E5EA] flex items-center justify-center">
                        <span className="text-gray-600 font-medium">JD</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">john.doe@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Updated profile information</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 minutes ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5E5EA] flex items-center justify-center">
                        <span className="text-gray-600 font-medium">JS</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                        <div className="text-sm text-gray-500">jane.smith@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Made a payment of $250.00</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 minutes ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;