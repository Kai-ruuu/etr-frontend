import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card } from "./ui/card"
import { Upload, X, FileText, Eye, AlertCircle } from "lucide-react"
import Swal from 'sweetalert2'

// Function to open document preview popup
function openDocPopup(fileUrl, filename, fileType) {
  // For images, open directly in a new window
  if (fileType.startsWith('image/')) {
    const popup = window.open(
      '',
      filename,
      "width=1080,height=640,left=100,top=100,resizable=yes"
    );
    
    if (popup) {
      popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${filename}</title>
          <style>
            body { margin: 0; padding: 20px; background: #f0f0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            img { max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <img src="${fileUrl}" alt="${filename}" />
        </body>
        </html>
      `);
      popup.document.close();
    }
  } else if (fileType === 'application/pdf') {
    // For PDFs, try to open directly in browser
    const popup = window.open(
      fileUrl,
      filename,
      "width=1080,height=640,left=100,top=100,resizable=yes"
    );
    
    if (!popup) {
      Swal.fire({
        icon: 'warning',
        title: 'Popup Blocked',
        text: 'Please allow popups for this site to preview files.',
        confirmButtonColor: '#3085d6'
      });
    }
  } else {
    // Fallback for other file types - try Google Docs viewer with a warning
    const gviewUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;
    
    const popup = window.open(
      gviewUrl,
      filename,
      "width=1080,height=640,left=100,top=100,resizable=yes"
    );

    if (!popup) {
      Swal.fire({
        icon: 'warning',
        title: 'Popup Blocked',
        text: 'Please allow popups for this site to preview files.',
        confirmButtonColor: '#3085d6'
      });
    } else {
      // Show warning that this might not work for local files
      setTimeout(() => {
        if (popup && !popup.closed) {
          console.warn("Note: Google Docs viewer may not work with local files. Consider uploading to a server first.");
        }
      }, 2000);
    }
  }
}

// Move FileUploadField outside the component to avoid creating during render
const FileUploadField = ({ fieldName, label, required = true, accept = ".pdf,.jpg,.jpeg,.png", formData, dragActive, handleDrag, handleDrop, handleFileChange, removeFile, fileError }) => {
  const file = formData[fieldName]
  const isActive = dragActive[fieldName]
  const hasError = fileError[fieldName]

  const handlePreview = (filePath) => {
    if (file) {
      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      openDocPopup(fileUrl, file.name, file.type);
      
      // Clean up the URL after a delay to prevent memory leaks
      setTimeout(() => {
        URL.revokeObjectURL(fileUrl);
      }, 5000); // Increased timeout for better preview experience
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldName}>
        {label} {!required && <span className="text-gray-500">(optional)</span>}
      </Label>
      
      {!file ? (
        <div>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              hasError
                ? 'border-red-500 bg-red-50'
                : isActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={(e) => handleDrag(e, fieldName)}
            onDragLeave={(e) => handleDrag(e, fieldName)}
            onDragOver={(e) => handleDrag(e, fieldName)}
            onDrop={(e) => handleDrop(e, fieldName)}
          >
            <Upload className={`mx-auto h-8 w-8 ${hasError ? 'text-red-400' : 'text-gray-400'}`} />
            <div className="mt-2">
              <label htmlFor={fieldName} className="cursor-pointer">
                <span className={`block text-xs font-medium ${hasError ? 'text-red-900' : 'text-gray-900'}`}>
                  Drop or click to upload
                </span>
                <span className={`block text-xs ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
                  PDF, JPG, PNG (max 10MB)
                </span>
              </label>
              <input
                id={fieldName}
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => handleFileChange(e, fieldName)}
                required={required}
              />
            </div>
          </div>
          {hasError && (
            <div className="flex items-center space-x-2 mt-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs">{hasError}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <FileText className="h-6 w-6 text-blue-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handlePreview(file.name)}
              className="text-blue-600 hover:text-blue-700 h-7 w-7 p-0"
              title="Preview document"
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeFile(fieldName)}
              className="text-red-600 hover:text-red-700 h-7 w-7 p-0"
              title="Remove file"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EnhancedCompanyForm({ onSubmit, editingId }) {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    letterOfIntent: null,
    companyProfile: null,
    businessPermit: null,
    sec: null,
    dtiCdaReg: null,
    registryOfEstablishment: null,
    certificationFromDole: null,
    certificationNoPendingCase: null,
    philJobNetReg: null
  })

  const [dragActive, setDragActive] = useState({})
  const [fileError, setFileError] = useState({})

  // File validation function
  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF and Image files (JPG, JPEG, PNG) are allowed"
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB"
    }

    return null
  }

  // Show success alert for file upload
  const showUploadSuccess = (fileName, fileType) => {
    const isImage = fileType.startsWith('image/')
    const icon = isImage ? '🖼️' : '📄'
    
    Swal.fire({
      icon: 'success',
      title: `${icon} File Uploaded Successfully!`,
      text: `${fileName} has been uploaded and is ready for submission.`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }

  // Show error alert for file upload
  const showUploadError = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: errorMessage,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Try Again'
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }))
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    
    if (file) {
      const error = validateFile(file)
      
      if (error) {
        setFileError((prev) => ({ ...prev, [fieldName]: error }))
        showUploadError(error)
        // Clear the input
        e.target.value = ''
        return
      }

      // Clear any previous error
      setFileError((prev) => ({ ...prev, [fieldName]: null }))
      setFormData((prev) => ({ ...prev, [fieldName]: file }))
      
      // Show success alert
      showUploadSuccess(file.name, file.type)
    }
  }

  const handleDrag = (e, fieldName) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [fieldName]: true }))
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [fieldName]: false }))
    }
  }

  const handleDrop = (e, fieldName) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(prev => ({ ...prev, [fieldName]: false }))
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const error = validateFile(file)
      
      if (error) {
        setFileError((prev) => ({ ...prev, [fieldName]: error }))
        showUploadError(error)
        return
      }

      // Clear any previous error
      setFileError((prev) => ({ ...prev, [fieldName]: null }))
      setFormData((prev) => ({ ...prev, [fieldName]: file }))
      
      // Show success alert
      showUploadSuccess(file.name, file.type)
    }
  }

  const removeFile = (fieldName) => {
    const fileName = formData[fieldName]?.name
    setFormData((prev) => ({ ...prev, [fieldName]: null }))
    // Clear any error when removing file
    setFileError((prev) => ({ ...prev, [fieldName]: null }))
    
    // Show removal confirmation
    if (fileName) {
      Swal.fire({
        icon: 'info',
        title: 'File Removed',
        text: `${fileName} has been removed from the form.`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if there are any file errors before submitting
    const hasErrors = Object.values(fileError).some(error => error !== null && error !== undefined)
    if (hasErrors) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Submit Form',
        text: 'Please fix file upload errors before submitting the form.',
        confirmButtonColor: '#d33'
      });
      return
    }

    // Show loading alert during submission
    Swal.fire({
      title: 'Submitting Company Registration...',
      text: 'Please wait while we process your application.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    // Simulate submission process
    setTimeout(() => {
      onSubmit(formData)
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Registration Submitted Successfully!',
        text: 'Your company registration has been submitted and is now under review.',
        confirmButtonColor: '#28a745'
      }).then(() => {
        // Reset form after successful submission
        setFormData({
          name: "",
          logo: null,
          letterOfIntent: null,
          companyProfile: null,
          businessPermit: null,
          sec: null,
          dtiCdaReg: null,
          registryOfEstablishment: null,
          certificationFromDole: null,
          certificationNoPendingCase: null,
          philJobNetReg: null
        })
        setFileError({})
      });
    }, 1000); // Simulate processing time
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Company Logo */}
            <div>
              <FileUploadField
                fieldName="logo"
                label="Company Logo"
                required={false}
                accept=".pdf,.jpg,.jpeg,.png"
                formData={formData}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                removeFile={removeFile}
                fileError={fileError}
              />
            </div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Letter of Intent */}
            <FileUploadField
              fieldName="letterOfIntent"
              label="Letter of Intent (Address to Mayor)"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Company Profile */}
            <FileUploadField
              fieldName="companyProfile"
              label="Company Profile"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Business Permit */}
            <FileUploadField
              fieldName="businessPermit"
              label="Business Permit"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* SEC */}
            <FileUploadField
              fieldName="sec"
              label="SEC"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* DTI/CDA Reg. */}
            <FileUploadField
              fieldName="dtiCdaReg"
              label="DTI/CDA Reg."
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Registry of Establishment fr. DOLE */}
            <FileUploadField
              fieldName="registryOfEstablishment"
              label="Registry of Establishment fr. DOLE"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Certification from DOLE Provincial Office */}
            <FileUploadField
              fieldName="certificationFromDole"
              label="Certification from DOLE Provincial Office"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Certification of No Pending Case */}
            <FileUploadField
              fieldName="certificationNoPendingCase"
              label="Certification of No Pending Case"
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />

            {/* Phil-JobNet Reg. */}
            <FileUploadField
              fieldName="philJobNetReg"
              label="Phil-JobNet Reg."
              formData={formData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              fileError={fileError}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button type="submit" className="px-8">
            {editingId ? "Update Company" : "Submit Company Registration"}
          </Button>
        </div>
      </form>
    </Card>
  )
}