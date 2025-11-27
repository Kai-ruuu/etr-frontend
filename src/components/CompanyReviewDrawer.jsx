import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { X, FileText, Download, CheckCircle, XCircle, Building2, Upload, ChevronRight } from "lucide-react"
import Swal from 'sweetalert2'

export default function CompanyReviewDrawer({ company, onApprove, onReject, onClose, isOpen }) {
  const [isProcessing, setIsProcessing] = useState(false)

  // Company requirements based on the specified requirements
  const companyRequirements = {
    basicInfo: {
      name: company?.name || "",
    },
    documents: [
      { 
        id: 1, 
        name: "Company Logo", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "0.5 MB",
        fileType: "PNG",
        required: false,
        description: "Optional company logo for identification purposes"
      },
      { 
        id: 2, 
        name: "Letter of Intent (Address to Mayor)", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.2 MB",
        fileType: "PDF",
        required: true,
        description: "Formal letter addressed to the Mayor expressing intent to operate and hire locally"
      },
      { 
        id: 3, 
        name: "Company Profile", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "3.8 MB",
        fileType: "PDF",
        required: true,
        description: "Comprehensive company profile including business overview, services, and organizational structure"
      },
      { 
        id: 4, 
        name: "Business Permit", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "2.1 MB",
        fileType: "PDF",
        required: true,
        description: "Valid business permit issued by the local government unit"
      },
      { 
        id: 5, 
        name: "SEC Certificate", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.8 MB",
        fileType: "PDF",
        required: true,
        description: "Securities and Exchange Commission registration certificate"
      },
      { 
        id: 6, 
        name: "DTI/CDA Registration", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.5 MB",
        fileType: "PDF",
        required: true,
        description: "Department of Trade and Industry or Cooperative Development Authority registration"
      },
      { 
        id: 7, 
        name: "Registry of Establishment from DOLE", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.3 MB",
        fileType: "PDF",
        required: true,
        description: "Department of Labor and Employment establishment registry certificate"
      },
      { 
        id: 8, 
        name: "Certification from DOLE Provincial Office", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.1 MB",
        fileType: "PDF",
        required: true,
        description: "Provincial DOLE office certification of labor compliance"
      },
      { 
        id: 9, 
        name: "Certification of No Pending Case", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "0.9 MB",
        fileType: "PDF",
        required: true,
        description: "Legal certification confirming no pending legal cases against the company"
      },
      { 
        id: 10, 
        name: "Phil-JobNet Registration", 
        status: "uploaded", 
        uploadDate: company?.appliedDate || "2025-01-15",
        fileSize: "1.0 MB",
        fileType: "PDF",
        required: true,
        description: "Philippine Job Network registration certificate for job posting eligibility"
      }
    ],
    additionalInfo: {
      companySize: company?.companySize || "Not specified",
      establishedYear: company?.establishedYear || "Not specified",
      description: company?.description || "Company description not provided."
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

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not the drawer content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const requiredDocuments = companyRequirements.documents.filter(doc => doc.required)
  const optionalDocuments = companyRequirements.documents.filter(doc => !doc.required)

  if (!company) return null

  return (
    <>
      {/* Backdrop - Completely transparent but clickable */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40 cursor-pointer"
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{company.name}</h2>
                <p className="text-sm text-gray-500">Company Review</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isProcessing}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Company Basic Information */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Information
              </h3>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Company Name</label>
                    <p className="text-gray-900 font-medium">{companyRequirements.basicInfo.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Documents */}
            {optionalDocuments.length > 0 && (
              <div>
                <h3 className="text-base font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  Optional Documents
                  <span className="text-sm font-normal text-gray-600">({optionalDocuments.length})</span>
                </h3>
                <div className="space-y-2">
                  {optionalDocuments.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start space-x-3 flex-1">
                        <Upload className="h-4 w-4 text-blue-600 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 text-sm truncate">{document.name}</p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full shrink-0">Optional</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {document.fileType} • {document.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          ✓
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(document)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                Required Documents
                <span className="text-sm font-normal text-gray-600">({requiredDocuments.length})</span>
              </h3>
              <div className="space-y-2">
                {requiredDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start space-x-3 flex-1">
                      <FileText className="h-4 w-4 text-red-600 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 text-sm truncate">{document.name}</p>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full shrink-0">Required</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {document.fileType} • {document.fileSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        ✓
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument(document)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">Document Verification Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Required:</span>
                  <span className="font-semibold text-blue-900 ml-2">{requiredDocuments.length}/9</span>
                </div>
                <div>
                  <span className="text-blue-700">Optional:</span>
                  <span className="font-semibold text-blue-900 ml-2">{optionalDocuments.length}/1</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-700">
                All required documents have been submitted and are ready for review.
              </div>
            </div>

            {/* Application Status */}
            <Alert>
              <AlertDescription className="text-sm">
                This company application was submitted on {company.appliedDate}. Please review all documents carefully before making a decision.
              </AlertDescription>
            </Alert>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Accept Company'}
              </Button>
              
              <Button
                onClick={handleReject}
                disabled={isProcessing}
                variant="destructive"
                className="w-full"
              >
                <XCircle className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Reject Company'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}