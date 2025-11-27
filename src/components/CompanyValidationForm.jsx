import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { X, FileText, Download, CheckCircle, XCircle, Building2, Upload, User } from "lucide-react"
import Swal from 'sweetalert2'

export default function CompanyValidationForm({ company, onApprove, onReject, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false)

  // Company requirements based on the specified requirements
  const companyRequirements = {
    basicInfo: {
      name: company.name,
      address: company.address || "Business address not provided",
      contactNumber: company.contactNumber || "Contact number not provided",
      email: company.email || "Email not provided",
      website: company.website || "Website not provided",
    },
    documents: [
      { 
        id: 1, 
        name: "Company Logo", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "0.5 MB",
        fileType: "PNG",
        required: false,
        description: "Optional company logo for identification purposes"
      },
      { 
        id: 2, 
        name: "Letter of Intent (Address to Mayor)", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.2 MB",
        fileType: "PDF",
        required: true,
        description: "Formal letter addressed to the Mayor expressing intent to operate and hire locally"
      },
      { 
        id: 3, 
        name: "Company Profile", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "3.8 MB",
        fileType: "PDF",
        required: true,
        description: "Comprehensive company profile including business overview, services, and organizational structure"
      },
      { 
        id: 4, 
        name: "Business Permit", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "2.1 MB",
        fileType: "PDF",
        required: true,
        description: "Valid business permit issued by the local government unit"
      },
      { 
        id: 5, 
        name: "SEC Certificate", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.8 MB",
        fileType: "PDF",
        required: true,
        description: "Securities and Exchange Commission registration certificate"
      },
      { 
        id: 6, 
        name: "DTI/CDA Registration", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.5 MB",
        fileType: "PDF",
        required: true,
        description: "Department of Trade and Industry or Cooperative Development Authority registration"
      },
      { 
        id: 7, 
        name: "Registry of Establishment from DOLE", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.3 MB",
        fileType: "PDF",
        required: true,
        description: "Department of Labor and Employment establishment registry certificate"
      },
      { 
        id: 8, 
        name: "Certification from DOLE Provincial Office", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.1 MB",
        fileType: "PDF",
        required: true,
        description: "Provincial DOLE office certification of labor compliance"
      },
      { 
        id: 9, 
        name: "Certification of No Pending Case", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "0.9 MB",
        fileType: "PDF",
        required: true,
        description: "Legal certification confirming no pending legal cases against the company"
      },
      { 
        id: 10, 
        name: "Phil-JobNet Registration", 
        status: "uploaded", 
        uploadDate: company.appliedDate || "2025-01-15",
        fileSize: "1.0 MB",
        fileType: "PDF",
        required: true,
        description: "Philippine Job Network registration certificate for job posting eligibility"
      }
    ],
    additionalInfo: {
      industryType: company.industryType || "Not specified",
      companySize: company.companySize || "Not specified",
      establishedYear: company.establishedYear || "Not specified",
      description: company.description || "Company description not provided."
    }
  }

  const handleApprove = async () => {
    const result = await Swal.fire({
      title: 'Approve Company Registration?',
      html: `
        <div class="text-left">
          <p class="mb-3">Are you sure you want to approve <strong>${company.name}</strong>?</p>
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <p class="text-sm text-green-800">
              <strong>This action will:</strong><br>
              • Grant the company access to post job opportunities<br>
              • Allow them to use the PESO job posting platform<br>
              • Send approval notification to the company
            </p>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Approve Company',
      cancelButtonText: 'Cancel',
      width: '500px'
    })

    if (result.isConfirmed) {
      setIsProcessing(true)
      
      // Simulate API call
      setTimeout(async () => {
        onApprove(company.id)
        setIsProcessing(false)
        
        await Swal.fire({
          title: 'Company Approved Successfully!',
          html: `
            <div class="text-center">
              <div class="mb-4">
                <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-gray-700">
                  <strong>${company.name}</strong> has been successfully approved and can now post job opportunities on the PESO platform.
                </p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#10b981',
          confirmButtonText: 'Continue'
        })
      }, 1500)
    }
  }

  const handleReject = async () => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: 'Reject Company Registration',
      html: `
        <div class="text-left">
          <p class="mb-3">Please provide a detailed reason for rejecting <strong>${company.name}</strong>:</p>
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <p class="text-sm text-red-800">
              <strong>Note:</strong> The company will be notified of this rejection and the reason provided.
            </p>
          </div>
        </div>
      `,
      input: 'textarea',
      inputPlaceholder: 'Enter detailed rejection reason (e.g., missing documents, incomplete information, etc.)...',
      inputAttributes: {
        'aria-label': 'Rejection reason',
        'rows': '4',
        'style': 'min-height: 100px;'
      },
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Reject Company',
      cancelButtonText: 'Cancel',
      width: '500px',
      inputValidator: (value) => {
        if (!value || value.trim().length < 10) {
          return 'Please provide a detailed reason (at least 10 characters) for rejection!'
        }
      }
    })

    if (isConfirmed && reason) {
      setIsProcessing(true)
      
      // Simulate API call
      setTimeout(async () => {
        onReject(company.id, reason)
        setIsProcessing(false)
        
        await Swal.fire({
          title: 'Company Rejected',
          html: `
            <div class="text-center">
              <div class="mb-4">
                <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <p class="text-gray-700">
                  <strong>${company.name}</strong> has been rejected. They will be notified of the decision and the reason provided.
                </p>
              </div>
            </div>
          `,
          icon: 'info',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Continue'
        })
      }, 1500)
    }
  }

  const handleDownloadDocument = (document) => {
    // Simulate document download
    Swal.fire({
      title: 'Download Started',
      text: `Downloading ${document.name}...`,
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    })
  }

  const requiredDocuments = companyRequirements.documents.filter(doc => doc.required)
  const optionalDocuments = companyRequirements.documents.filter(doc => !doc.required)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-xl font-bold">Company Review - {company.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isProcessing}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Company Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Name</label>
                  <p className="text-gray-900 font-semibold">{companyRequirements.basicInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Industry Type</label>
                  <p className="text-gray-900">{companyRequirements.additionalInfo.industryType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-900">{companyRequirements.basicInfo.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Number</label>
                  <p className="text-gray-900">{companyRequirements.basicInfo.contactNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{companyRequirements.basicInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Size</label>
                  <p className="text-gray-900">{companyRequirements.additionalInfo.companySize}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Company Description</label>
                  <p className="text-gray-900">{companyRequirements.additionalInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Optional Documents */}
            {optionalDocuments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Optional Documents
                  <span className="text-sm font-normal text-gray-600">({optionalDocuments.length} document)</span>
                </h3>
                <div className="space-y-3">
                  {optionalDocuments.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start space-x-3 flex-1">
                        <Upload className="h-5 w-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{document.name}</p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Optional</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {document.fileType} • {document.fileSize} • Uploaded on {document.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(document)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                Required Documents
                <span className="text-sm font-normal text-gray-600">({requiredDocuments.length} documents)</span>
              </h3>
              <div className="space-y-3">
                {requiredDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start space-x-3 flex-1">
                      <FileText className="h-5 w-5 text-red-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{document.name}</p>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Required</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {document.fileType} • {document.fileSize} • Uploaded on {document.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Uploaded
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument(document)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Document Verification Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Required Documents:</span>
                  <span className="font-semibold text-blue-900 ml-2">{requiredDocuments.length}/9 uploaded</span>
                </div>
                <div>
                  <span className="text-blue-700">Optional Documents:</span>
                  <span className="font-semibold text-blue-900 ml-2">{optionalDocuments.length}/1 uploaded</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-700">
                All required documents have been submitted and are ready for review.
              </div>
            </div>

            {/* Application Status */}
            <Alert>
              <AlertDescription>
                This company application was submitted on {company.appliedDate}. Please review all documents and information carefully before making a decision. All required documents must be properly verified before approval.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Accept Company'}
              </Button>
              
              <Button
                onClick={handleReject}
                disabled={isProcessing}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Reject Company'}
              </Button>
              
              <Button
                onClick={onClose}
                variant="outline"
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}