import { useState, useEffect } from "react"
import { Card } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { useAuth } from "../../../context/auth/useAuthContext"

export default function SysadDashboardPage() {
  const { user } = useAuth()
  const [stats] = useState({
    totalUsers: 25,
    activeUsers: 22,
    totalCompanies: 45,
    pendingCompanies: 12,
    totalJobPosts: 156,
    systemHealth: "Good"
  })

  const [recentActivities] = useState([
    { id: 1, action: "New user registered", user: "Jane PESO Officer", time: "1 hour ago", type: "user" },
    { id: 2, action: "Company approved", company: "Tech Solutions Inc.", time: "3 hours ago", type: "company" },
    { id: 3, action: "Job post created", company: "Digital Marketing Co.", time: "5 hours ago", type: "job" },
    { id: 4, action: "User deactivated", user: "Old Admin", time: "1 day ago", type: "user" }
  ])

  

  const getActivityIcon = (type) => {
    const icons = {
      user: "👤",
      company: "🏢",
      job: "💼"
    }
    return icons[type] || "📝"
  }

  if (!user) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">👤</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">🏢</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Pending Companies</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingCompanies}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm font-bold">⏳</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Job Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobPosts}</p>
            </div>
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-sm font-bold">💼</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">{stats.systemHealth}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">💚</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent System Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user || activity.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-gray-100 text-gray-800 capitalize">{activity.type}</Badge>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}