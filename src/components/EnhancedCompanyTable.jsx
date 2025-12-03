import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { FileText, Building2 } from "lucide-react"
import { useState } from "react"
import { apiFilePath, apiPath } from "../app/utils/api"
import { archiveRestoreCompany } from "../app/services/user/sysad/companyService"

// Move DocumentRow outside the component to avoid creating during render
const DocumentRow = ({ viewedDocument, setViewedDocument, label, filePath, filename }) => (
  <div className="flex flex-col items-stretch py-2 border-b border-gray-100">
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {filename ? (
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="text-xs text-gray-500">{filename}</span>
          <Button
            size="sm"
            variant={viewedDocument === label ? 'default' : 'secondary'}
            onClick={() => {
              if (filename) setViewedDocument(viewedDocument === label ? null : label)
            }}
          >
            Preview
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={async () => {
              if (filename) {
                const res = await fetch(apiFilePath(`/${filePath}/${filename}`))

                if (!res.ok) throw new Error('Failed to download')

                const blob = await res.blob()
                const url = URL.createObjectURL(blob)

                const a = document.createElement('a')
                a.href = url
                a.download = filename
                a.click()

                URL.revokeObjectURL(url)
              }
            }}
          >
            Download
          </Button>
        </div>
      ) : (
        <span className="text-xs text-gray-400">Not uploaded</span>
      )}
    </div>
    {viewedDocument === label && (
      <iframe
        src={apiFilePath(`/${filePath}/${filename}`)}
        className="h-dvh"
      >  
      </iframe>
    )}
  </div>
)

export default function EnhancedCompanyTable({ companies, setCompanies, pageInfo, setPageInfo, setEditingInfo, setShowForm, archived }) {
  const [viewingCompany, setViewingCompany] = useState(null)
  const [viewedDocument, setViewedDocument] = useState(null)

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

  const handleViewDetails = (company) => {
    setViewingCompany(company)
  }

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      setViewingCompany(null)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => {
                const documentCount = Object.entries(company.documents).filter(([key, value]) => (value !== null && key !== 'logo_filename')).length

                return (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {company.documents?.logo_filename ? (
                          <img
                            src={apiFilePath('/company-logo/' + company.documents?.logo_filename)}
                            alt={`${company.name} logo`}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Building2 className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {company.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(company.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500">
                        {documentCount === 9 ? 'Complete' : 'Incomplete'} ({documentCount}/9)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => await archiveRestoreCompany(companies, setCompanies, pageInfo, setPageInfo, archived, company.id)}
                        >
                          {archived ? 'Restore' : 'Archive'}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleViewDetails(company)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => {
                            setShowForm(true)
                            setEditingInfo(company)
                          }}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Company Details Modal with Transparent Background */}
      {viewingCompany && (
        <div 
          className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {viewingCompany.documents?.logo_filename ? (
                    <img
                      src={apiFilePath('/company-logo/' + viewingCompany.documents?.logo_filename)}
                      alt={`${viewingCompany.name} logo`}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{viewingCompany.name}</h2>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setViewingCompany(null)}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Documents Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Requirements</h3>
                <div className="space-y-1">
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Letter of Intent (Address to Mayor)"
                    filePath="letter-of-intent"
                    filename={viewingCompany.documents.letter_of_intent_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Company Profile"
                    filePath="company-profile"
                    filename={viewingCompany.documents.company_profile_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Business Permit"
                    filePath="business-permit"
                    filename={viewingCompany.documents.business_permit_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="SEC"
                    filePath="securities-and-exchange-commission"
                    filename={viewingCompany.documents.sec_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="DTI/CDA Reg."
                    filePath="department-of-trade-and-industries"
                    filename={viewingCompany.documents.dti_cda_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Registry of Establishment fr. DOLE"
                    filePath="registry-of-establishment"
                    filename={viewingCompany.documents.reg_of_est_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Certification from DOLE Provincial Office"
                    filePath="dole-certification"
                    filename={viewingCompany.documents.dole_cert_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Certification of No Pending Case"
                    filePath="pending-case-certification"
                    filename={viewingCompany.documents.no_pending_case_cert_filename}
                  />
                  <DocumentRow
                    viewedDocument={viewedDocument}
                    setViewedDocument={setViewedDocument}
                    label="Phil-JobNet Reg."
                    filePath="philjobnet-registration"
                    filename={viewingCompany.documents.philjob_reg_filename}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}