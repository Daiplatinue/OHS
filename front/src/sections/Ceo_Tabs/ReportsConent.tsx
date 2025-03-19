function ReportItem({ title, description, lastGenerated }: any) {
    return (
      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">Last generated: {lastGenerated}</span>
          <button className="text-xs text-teal-500 font-medium">Generate</button>
        </div>
      </div>
    )
  }

function KPIItem({ title, value, target, status }: any) {
    return (
        <div className="flex justify-between items-center border-b pb-3">
            <div>
                <h4 className="text-sm font-medium text-gray-800">{title}</h4>
                <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 mr-2">Current: {value}</span>
                    <span className="text-xs text-gray-500">Target: {target}</span>
                </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">{status}</span>
        </div>
    )
}

function ActivityItem({ title, description, time }: any) {
    return (
        <div className="border-l-2 border-teal-500 pl-4 py-2">
            <h4 className="text-sm font-medium text-gray-800">{title}</h4>
            <p className="text-xs text-gray-500">{description}</p>
            <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
    )
}

function ReportsContent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-800">Reports</h2>
                <div className="flex space-x-2">
                    <select className="border rounded-md px-4 py-2 text-sm">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This year</option>
                        <option>Last year</option>
                    </select>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium">Generate Report</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Available Reports</h3>
                    <div className="space-y-4">
                        <ReportItem
                            title="Monthly Revenue Report"
                            description="Detailed breakdown of revenue by service category and location"
                            lastGenerated="Aug 1, 2024"
                        />
                        <ReportItem
                            title="Service Provider Performance"
                            description="Analysis of provider ratings, jobs completed, and revenue generated"
                            lastGenerated="Aug 5, 2024"
                        />
                        <ReportItem
                            title="Customer Acquisition Report"
                            description="New vs returning customers and acquisition channels"
                            lastGenerated="Aug 10, 2024"
                        />
                        <ReportItem
                            title="Service Demand Analysis"
                            description="Trends in service requests by category and location"
                            lastGenerated="Aug 15, 2024"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Key Performance Indicators</h3>
                    <div className="space-y-4">
                        <KPIItem title="Customer Satisfaction" value="4.8/5.0" target="4.5/5.0" status="Above Target" />
                        <KPIItem title="Service Completion Rate" value="98.2%" target="95%" status="Above Target" />
                        <KPIItem title="Provider Retention" value="92.5%" target="90%" status="Above Target" />
                        <KPIItem title="Average Response Time" value="2.3 hours" target="3 hours" status="Above Target" />
                        <KPIItem title="Customer Retention" value="87.4%" target="85%" status="Above Target" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Report Activities</h3>
                <div className="space-y-4">
                    <ActivityItem
                        title="Monthly Revenue Report generated"
                        description="Generated by Chris Evans"
                        time="Aug 1, 2024"
                    />
                    <ActivityItem
                        title="Service Provider Performance Report generated"
                        description="Generated by Chris Evans"
                        time="Aug 5, 2024"
                    />
                    <ActivityItem
                        title="Customer Acquisition Report generated"
                        description="Generated by Marketing Manager"
                        time="Aug 10, 2024"
                    />
                    <ActivityItem
                        title="Service Demand Analysis Report generated"
                        description="Generated by Operations Manager"
                        time="Aug 15, 2024"
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportsContent