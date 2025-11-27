import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Eye, Edit, Trash2, Download, FileText, Building2 } from "lucide-react"
import { useState } from "react"

// Move DocumentRow outside the component to avoid creating during render
const DocumentRow = ({ label, file, filename }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    {file ? (
      <div className="flex items-center space-x-2">
        <FileText className="h-4 w-4 text-blue-500" />
        <span className="text-xs text-gray-500">{file.name}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (file) {
              const url = URL.createObjectURL(file)
              const a = document.createElement('a')
              a.href = url
              a.download = filename
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }
          }}
          className="h-6 px-2"
        >
          <Download className="h-3 w-3" />
        </Button>
      </div>
    ) : (
      <span className="text-xs text-gray-400">Not uploaded</span>
    )}
  </div>
)

export default function EnhancedCompanyTable({ companies, onEdit, onDelete, onView }) {
  const [viewingCompany, setViewingCompany] = useState(null)

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
    if (onView) onView(company)
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vacancies
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => {
                const documentCount = [
                  company.letterOfIntent,
                  company.companyProfile,
                  company.businessPermit,
                  company.sec,
                  company.dtiCdaReg,
                  company.registryOfEstablishment,
                  company.certificationFromDole,
                  company.certificationNoPendingCase,
                  company.philJobNetReg
                ].filter(Boolean).length

                return (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {company.logo ? (
                          <img
                            src={URL.createObjectURL(company.logo)}
                            alt={`${company.name} logo`}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Building2 className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {company.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(company.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {documentCount}/9 documents
                      </div>
                      <div className="text-xs text-gray-500">
                        {documentCount === 9 ? 'Complete' : 'Incomplete'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {company.vacancies || 0} positions
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(company)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(company.id)}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(company.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
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
                  {viewingCompany.logo ? (
                    <img
                      src={URL.createObjectURL(viewingCompany.logo)}
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
                    <p className="text-gray-500">Company ID: {viewingCompany.id}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                <div className="space-y-1">
                  <DocumentRow
                    label="Letter of Intent (Address to Mayor)"
                    file={viewingCompany.letterOfIntent}
                    filename={`${viewingCompany.name}_Letter_of_Intent.pdf`}
                  />
                  <DocumentRow
                    label="Company Profile"
                    file={viewingCompany.companyProfile}
                    filename={`${viewingCompany.name}_Company_Profile.pdf`}
                  />
                  <DocumentRow
                    label="Business Permit"
                    file={viewingCompany.businessPermit}
                    filename={`${viewingCompany.name}_Business_Permit.pdf`}
                  />
                  <DocumentRow
                    label="SEC"
                    file={viewingCompany.sec}
                    filename={`${viewingCompany.name}_SEC.pdf`}
                  />
                  <DocumentRow
                    label="DTI/CDA Reg."
                    file={viewingCompany.dtiCdaReg}
                    filename={`${viewingCompany.name}_DTI_CDA_Reg.pdf`}
                  />
                  <DocumentRow
                    label="Registry of Establishment fr. DOLE"
                    file={viewingCompany.registryOfEstablishment}
                    filename={`${viewingCompany.name}_Registry_of_Establishment.pdf`}
                  />
                  <DocumentRow
                    label="Certification from DOLE Provincial Office"
                    file={viewingCompany.certificationFromDole}
                    filename={`${viewingCompany.name}_DOLE_Certification.pdf`}
                  />
                  <DocumentRow
                    label="Certification of No Pending Case"
                    file={viewingCompany.certificationNoPendingCase}
                    filename={`${viewingCompany.name}_No_Pending_Case.pdf`}
                  />
                  <DocumentRow
                    label="Phil-JobNet Reg."
                    file={viewingCompany.philJobNetReg}
                    filename={`${viewingCompany.name}_PhilJobNet_Reg.pdf`}
                  />
                </div>
              </div>

              {/* Vacancies Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Number of Vacancies</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">{viewingCompany.vacancies || 0}</span>
                    <span className="text-gray-600">available positions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}