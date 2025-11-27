import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import EnhancedPesoValidationTable from "../../../components/EnhancedPesoValidationTable"
import CompanyReviewDrawer from "../../../components/CompanyReviewDrawer"
import { Badge } from "../../../components/ui/badge"
import { Building2, Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import { Alert, AlertDescription } from "../../../components/ui/alert"

export default function PesoCompanyVerificationPage() {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const [companies, setCompanies] = useState([
    { 
      id: "1", 
      name: "TechNova Solutions Inc.", 
      status: "pending", 
      appliedDate: "2025-01-15",
      industryType: "Information Technology",
      location: "Makati City, Metro Manila",
      documentCount: 10,
      address: "25th Floor, GT Tower International, Ayala Avenue, Makati City",
      contactNumber: "+63 2 8123 4567",
      email: "hr@technova.com.ph",
      website: "www.technova.com.ph",
      companySize: "100-200 employees",
      establishedYear: "2019",
      description: "A leading software development company specializing in enterprise solutions and digital transformation services."
    },
    { 
      id: "2", 
      name: "Green Energy Philippines Corp.", 
      status: "pending", 
      appliedDate: "2025-01-18",
      industryType: "Renewable Energy",
      location: "Bonifacio Global City, Taguig",
      documentCount: 10,
      address: "32nd Floor, One Bonifacio High Street, BGC, Taguig City",
      contactNumber: "+63 2 8987 6543",
      email: "careers@greenenergy.ph",
      website: "www.greenenergy.ph",
      companySize: "50-100 employees",
      establishedYear: "2020",
      description: "Pioneering sustainable energy solutions across the Philippines with focus on solar and wind power projects."
    },
    { 
      id: "3", 
      name: "Digital Marketing Hub", 
      status: "pending", 
      appliedDate: "2025-01-20",
      industryType: "Marketing & Advertising",
      location: "Ortigas Center, Pasig City",
      documentCount: 9,
      address: "15th Floor, The Podium West Tower, Ortigas Center, Pasig City",
      contactNumber: "+63 2 8456 7890",
      email: "jobs@digitalmarketinghub.ph",
      website: "www.digitalmarketinghub.ph",
      companySize: "25-50 employees",
      establishedYear: "2021",
      description: "Full-service digital marketing agency helping businesses grow their online presence through innovative strategies."
    },
    { 
      id: "4", 
      name: "MedTech Innovations Ltd.", 
      status: "approved", 
      appliedDate: "2025-01-10",
      industryType: "Healthcare Technology",
      location: "Alabang, Muntinlupa City",
      documentCount: 10,
      approvedDate: "2025-01-12"
    },
    { 
      id: "5", 
      name: "EduLearn Academy", 
      status: "approved", 
      appliedDate: "2025-01-08",
      industryType: "Education Technology",
      location: "Quezon City",
      documentCount: 10,
      approvedDate: "2025-01-11"
    },
    { 
      id: "6", 
      name: "FastFood Chain Corp.", 
      status: "rejected", 
      appliedDate: "2025-01-05",
      industryType: "Food & Beverage",
      location: "Manila",
      documentCount: 7,
      rejectionReason: "Missing required documents: SEC Certificate, DTI Registration, and DOLE Provincial Office Certification.",
      rejectedDate: "2025-01-07"
    }
  ])

  const handleApprove = (id) => {
    setCompanies(companies.map((c) => 
      c.id === id 
        ? { ...c, status: "approved", approvedDate: new Date().toISOString().split('T')[0] } 
        : c
    ))
    setSelectedCompany(null)
    setIsDrawerOpen(false)
  }

  const handleReject = (id, reason) => {
    setCompanies(companies.map((c) => 
      c.id === id 
        ? { ...c, status: "rejected", rejectionReason: reason, rejectedDate: new Date().toISOString().split('T')[0] } 
        : c
    ))
    setSelectedCompany(null)
    setIsDrawerOpen(false)
  }

  const handleSelectCompany = (company) => {
    setSelectedCompany(company)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedCompany(null)
  }

  const getTabCounts = () => {
    return {
      pending: companies.filter(c => c.status === "pending").length,
      approved: companies.filter(c => c.status === "approved").length,
      rejected: companies.filter(c => c.status === "rejected").length
    }
  }

  const tabCounts = getTabCounts()

  const tabs = [
    {
      id: "pending",
      label: "Pending Review",
      icon: Clock,
      count: tabCounts.pending,
      color: "text-yellow-600"
    },
    {
      id: "approved", 
      label: "Approved",
      icon: CheckCircle,
      count: tabCounts.approved,
      color: "text-green-600"
    },
    {
      id: "rejected",
      label: "Rejected", 
      icon: XCircle,
      count: tabCounts.rejected,
      color: "text-red-600"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Company Verification</h1>
          <p className="text-gray-600 mt-1">Review and validate company applications for job posting privileges</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Total Applications</span>
            </div>
            <Badge variant="outline" className="text-lg font-bold px-3 py-1">
              {companies.length}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Document Requirements Info */}
      {tabCounts.pending > 0 && (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            <strong>Document Requirements:</strong> Each company must submit 9 required documents (Letter of Intent, Company Profile, Business Permit, SEC Certificate, DTI/CDA Registration, DOLE Registry, DOLE Provincial Certification, No Pending Case Certification, Phil-JobNet Registration) plus 1 optional document (Company Logo).
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <Card key={tab.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab(tab.id)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <tab.icon className={`h-5 w-5 ${tab.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{tab.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{tab.count}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-gray-200 bg-white rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <EnhancedPesoValidationTable
          companies={companies.filter((c) => c.status === activeTab)}
          onSelect={handleSelectCompany}
          activeTab={activeTab}
        />
      </div>

      {/* Company Review Drawer */}
      <CompanyReviewDrawer
        company={selectedCompany}
        onApprove={handleApprove}
        onReject={handleReject}
        onClose={handleCloseDrawer}
        isOpen={isDrawerOpen}
      />
    </div>
  )
}