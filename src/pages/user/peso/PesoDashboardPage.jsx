import { useState, useEffect } from "react"
import { Card } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { useAuth } from "../../../context/auth/useAuthContext"

export default function PesoDashboardPage() {
  const { user } = useAuth()
  const [stats] = useState({
    totalCompanies: 45,
    pendingVerification: 12,
    approvedCompanies: 28,
    rejectedCompanies: 5,
    totalJobPosts: 156,
    activeJobPosts: 134
  })

  const [recentActivities] = useState([
    { id: 1, action: "Company verified", company: "Tech Solutions Inc.", time: "2 hours ago", status: "approved" },
    { id: 2, action: "Document reviewed", company: "Digital Marketing Co.", time: "4 hours ago", status: "pending" },
    { id: 3, action: "Company rejected", company: "Startup Ventures", time: "1 day ago", status: "rejected" },
    { id: 4, action: "New application", company: "Innovation Labs", time: "2 days ago", status: "pending" }
  ])

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    }
    
    return (
      <Badge className={variants[status] || variants.pending}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </Badge>
    )
  }

  if (!user) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PESO Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">C</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Pending Verification</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingVerification}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm font-bold">P</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Approved Companies</p>
              <p className="text-2xl font-bold text-green-600">{stats.approvedCompanies}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Rejected Companies</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejectedCompanies}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm font-bold">✕</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Job Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobPosts}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">J</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Active Job Posts</p>
              <p className="text-2xl font-bold text-purple-600">{stats.activeJobPosts}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">A</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.company}</p>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusBadge(activity.status)}
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}