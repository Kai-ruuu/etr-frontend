import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Eye, Clock, CheckCircle, XCircle, Building2, Calendar, FileText } from "lucide-react"

export default function EnhancedPesoValidationTable({ companies, onSelect, activeTab }) {
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

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle
    }
    const Icon = icons[status] || Clock
    const colors = {
      pending: "text-yellow-600",
      approved: "text-green-600", 
      rejected: "text-red-600"
    }
    return <Icon className={`h-4 w-4 ${colors[status] || colors.pending}`} />
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (companies.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Building2 className="h-12 w-12 text-gray-400" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              No {activeTab} companies
            </h3>
            <p className="text-gray-500 mt-1">
              {activeTab === "pending" 
                ? "There are no companies pending review at this time."
                : activeTab === "approved"
                ? "No companies have been approved yet."
                : "No companies have been rejected yet."
              }
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              {activeTab === "rejected" && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Rejected Date
                </th>
              )}
              {activeTab === "approved" && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Approved Date
                </th>
              )}
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {company.location || "Location not specified"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {company.industryType || "Not specified"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {formatDate(company.appliedDate)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {company.documentCount || 10}/10
                    </span>
                    <span className="text-xs text-gray-500">docs</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(company.status)}
                    {getStatusBadge(company.status)}
                  </div>
                </td>
                {activeTab === "rejected" && (
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(company.rejectedDate)}
                    </div>
                    {company.rejectionReason && (
                      <div className="text-xs text-red-600 mt-1 max-w-xs truncate" title={company.rejectionReason}>
                        {company.rejectionReason}
                      </div>
                    )}
                  </td>
                )}
                {activeTab === "approved" && (
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(company.approvedDate)}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelect(company)}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {activeTab === "pending" ? "Review" : "View Details"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}