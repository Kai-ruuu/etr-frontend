import { useState } from "react";
import { Button, FileUploadButton } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import {
  addCompany,
  renameCompany,
  updateCompanyDocument,
} from "../app/services/user/sysad/companyService";
import { apiFilePath } from "../app/utils/api";

// Move FileUploadField outside the component to avoid creating during render
const FileUploadField = ({
  editingInfo,
  fieldName,
  fileName,
  documentTitle,
  label,
  required = true,
  accept = ".pdf,.jpg,.jpeg,.png",
  formData,
  setFormData,
  dragActive,
  handleDrag,
  handleDrop,
  removeFile,
  fileError,
}) => {
  const [file, setFile] = useState(
    editingInfo ? editingInfo?.documents[fileName] : formData[fieldName] ?? ''
  );
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [replacementFile, setReplacementFile] = useState(null);
  const isActive = dragActive[fieldName];
  const hasError = fileError[fieldName];

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldName}>
        {label} {!required && <span className="text-gray-500">(optional)</span>}
      </Label>

      {!file ? (
        <label htmlFor={fieldName} className="cursor-pointer">
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              hasError
                ? "border-red-500 bg-red-50"
                : isActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={(e) => handleDrag(e, fieldName)}
            onDragLeave={(e) => handleDrag(e, fieldName)}
            onDragOver={(e) => handleDrag(e, fieldName)}
            onDrop={(e) => handleDrop(e, fieldName)}
          >
            <Upload
              className={`mx-auto h-8 w-8 ${
                hasError ? "text-red-400" : "text-gray-400"
              }`}
            />
            <div className="mt-2">
              <span
                className={`block text-xs font-medium ${
                  hasError ? "text-red-900" : "text-gray-900"
                }`}
              >
                Drop or click to upload
              </span>
              <span
                className={`block text-xs ${
                  hasError ? "text-red-600" : "text-gray-500"
                }`}
              >
                {accept.split(",").join(", ")} (max 10MB)
              </span>
              <input
                id={fieldName}
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files[0];

                  setFile(file.name);
                  setReplacementFile(file);
                  setFormData({ ...formData, [fieldName]: file });
                  console.log({ ...formData, [fieldName]: file });
                }}
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
        </label>
      ) : (
        <div className="flex flex-col items-stretch p-2 bg-gray-50 rounded-lg border border-gray-300 gap-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FileText className="h-6 w-6 text-blue-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {editingInfo ? file : formData[fieldName]?.name}
                </p>
                {(!editingInfo && formData[fieldName]) && (
                  <p className="text-xs text-gray-500">
                    {(formData[fieldName].size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              {editingInfo ? (
                <FileUploadButton
                  fileUploadId={label}
                  accept={accept}
                  variant="outline"
                  size="sm"
                  onChange={(e) => {
                    console.log(label, accept);
                    setFile(e.target.files[0].name);
                    setReplacementFile(e.target.files[0]);
                  }}
                >
                  Replace
                </FileUploadButton>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null)
                    removeFile(fieldName)
                  }}
                  title="Remove file"
                >
                  Reset
                </Button>
              )}
              <Button
                type="button"
                variant={isPreviewing ? "default" : "secondary"}
                size="sm"
                onClick={() => setIsPreviewing(!isPreviewing)}
                title="Preview document"
              >
                Preview
              </Button>
              {editingInfo && file && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={async () =>
                    await updateCompanyDocument(
                      editingInfo.id,
                      fileName,
                      documentTitle,
                      replacementFile,
                      setFile
                    )
                  }
                  title="Update document"
                >
                  Update
                </Button>
              )}
            </div>
          </div>
          {isPreviewing &&
            (editingInfo && file ? (
              replacementFile ? (
                <iframe
                  src={URL.createObjectURL(replacementFile)}
                  className="rounded-md h-dvh"
                ></iframe>
              ) : (
                <iframe
                  src={apiFilePath(
                    `/${(documentTitle = documentTitle.replace(
                      /_/g,
                      "-"
                    ))}/${file}`
                  )}
                  className="rounded-md h-dvh"
                ></iframe>
              )
            ) : file ? (
              <iframe
                src={URL.createObjectURL(file)}
                className="rounded-md h-dvh"
              ></iframe>
            ) : (
              <></>
            ))}
        </div>
      )}
    </div>
  );
};

export default function EnhancedCompanyForm({
  archived,
  companies,
  setCompanies,
  editingInfo,
  pageInfo,
  setPageInfo,
  setEditingInfo,
  setShowForm,
}) {
  const [formData, setFormData] = useState({
    company_name: editingInfo?.name ?? "",
    company_logo: editingInfo?.documents?.logo_filename ?? null,
    letter_of_intent: editingInfo?.documents?.letter_of_intent_filename ?? null,
    company_profile: editingInfo?.documents?.company_profile_filename ?? null,
    business_permit: editingInfo?.documents?.business_permit_filename ?? null,
    sec: editingInfo?.documents?.sec_filename ?? null,
    dti_cda: editingInfo?.documents?.dti_cda_filename ?? null,
    reg_of_est: editingInfo?.documents?.reg_of_est_filename ?? null,
    dole_certification: editingInfo?.documents?.dole_cert_filename ?? null,
    pending_case_certification:
      editingInfo?.documents?.no_pending_case_cert_filename ?? null,
    philjobnet_registration:
      editingInfo?.documents?.philjob_reg_filename ?? null,
  });

  const [dragActive, setDragActive] = useState({});
  const [fileError, setFileError] = useState({});

  // File validation function
  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF and Image files (JPG, JPEG, PNG) are allowed";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  // Show success alert for file upload
  const showUploadSuccess = (fileName, fileType) => {
    const isImage = fileType.startsWith("image/");
    const icon = isImage ? "🖼️" : "📄";

    Swal.fire({
      icon: "success",
      title: `${icon} File Uploaded Successfully!`,
      text: `${fileName} has been uploaded and is ready for submission.`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  // Show error alert for file upload
  const showUploadError = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: errorMessage,
      confirmButtonColor: "#d33",
      confirmButtonText: "Try Again",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [fieldName]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [fieldName]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const error = validateFile(file);

      if (error) {
        setFileError((prev) => ({ ...prev, [fieldName]: error }));
        showUploadError(error);
        return;
      }

      // Clear any previous error
      setFileError((prev) => ({ ...prev, [fieldName]: null }));
      setFormData((prev) => ({ ...prev, [fieldName]: file }));

      // Show success alert
      showUploadSuccess(file.name, file.type);
    }
  };

  const removeFile = (fieldName) => {
    const fileName = formData[fieldName]?.name;
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
    // Clear any error when removing file
    setFileError((prev) => ({ ...prev, [fieldName]: null }));

    // Show removal confirmation
    if (fileName) {
      Swal.fire({
        icon: "info",
        title: "File Removed",
        text: `${fileName} has been removed from the form.`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingInfo) return;

    // Check if there are any file errors before submitting
    const hasErrors = Object.values(fileError).some(
      (error) => error !== null && error !== undefined
    );
    if (hasErrors) {
      Swal.fire({
        icon: "error",
        title: "Cannot Submit Form",
        text: "Please fix file upload errors before submitting the form.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Show loading alert during submission
    Swal.fire({
      title: "Submitting Company Registration...",
      text: "Please wait while we process your application.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await addCompany(
      archived,
      companies,
      setCompanies,
      pageInfo,
      setPageInfo,
      setEditingInfo,
      setShowForm,
      formData,
      setFormData
    );
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <div className="flex items-center gap-x-4">
                <Input
                  id="name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
                {editingInfo && (
                  <Button
                    type="button"
                    variant="default"
                    onClick={async () =>
                      await renameCompany(
                        companies,
                        setCompanies,
                        setEditingInfo,
                        editingInfo.id,
                        formData.company_name
                      )
                    }
                  >
                    Rename
                  </Button>
                )}
              </div>
            </div>

            {/* Company Logo */}
            <div>
              <FileUploadField
                editingInfo={editingInfo}
                fieldName="company_logo"
                fileName="logo_filename"
                documentTitle="company_logo"
                label="Company Logo"
                required={false}
                setFormData={setFormData}
                accept=".jpg,.jpeg,.png"
                formData={formData}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                removeFile={removeFile}
                fileError={fileError}
              />
            </div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Required Documents
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Letter of Intent */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="letter_of_intent"
              fileName="letter_of_intent_filename"
              documentTitle="letter_of_intent"
              label="Letter of Intent (Address to Mayor)"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Company Profile */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="company_profile"
              fileName="company_profile_filename"
              documentTitle="company_profile"
              label="Company Profile"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Business Permit */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="business_permit"
              fileName="business_permit_filename"
              documentTitle="business_permit"
              label="Business Permit"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* SEC */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="sec"
              fileName="sec_filename"
              documentTitle="securities_and_exchange_commission"
              label="SEC"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* DTI/CDA Reg. */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="dti_cda"
              fileName="dti_cda_filename"
              documentTitle="department_of_trade_and_industries"
              label="DTI/CDA Reg."
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Registry of Establishment fr. DOLE */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="reg_of_est"
              fileName="reg_of_est_filename"
              documentTitle="registry_of_establishment"
              label="Registry of Establishment fr. DOLE"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Certification from DOLE Provincial Office */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="dole_certification"
              fileName="dole_cert_filename"
              documentTitle="dole_certification"
              label="Certification from DOLE Provincial Office"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Certification of No Pending Case */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="pending_case_certification"
              fileName="no_pending_case_cert_filename"
              documentTitle="pending_case_certification"
              label="Certification of No Pending Case"
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />

            {/* Phil-JobNet Reg. */}
            <FileUploadField
              editingInfo={editingInfo}
              fieldName="philjobnet_registration"
              fileName="philjob_reg_filename"
              documentTitle="philjobnet_registration"
              label="Phil-JobNet Reg."
              formData={formData}
              setFormData={setFormData}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              removeFile={removeFile}
              fileError={fileError}
              accept=".pdf"
            />
          </div>
        </div>

        {!editingInfo && (
          <div className="flex justify-end space-x-4 pt-4 border-t border-t-gray-300">
            <Button type="submit" className="px-8">
              {editingInfo ? "Update Company" : "Register Company"}
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}
