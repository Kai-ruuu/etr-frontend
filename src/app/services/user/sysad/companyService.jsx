import Swal from "sweetalert2";
import { apiPath } from "../../../utils/api";

export const getCompanies = async (
  setCompanies,
  setPageInfo,
  page = 1,
  archived = false,
  search = null
) => {
  try {
    const res = await fetch(
      apiPath(
        `/sysad/company?page=${page}&archived=${archived}${
          search && "&search=" + search
        }`
      ),
      { credentials: "include" }
    );
    const data = await res.json();
    console.log(data)

    if (res.ok) {
      setPageInfo({ page: data.data.page, totalPages: data.data.total_pages });
      setCompanies(data.data.companies);
    } else {
      throw new Error(data.detail ?? "Unable to load companies.");
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: e.message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
};

export const addCompany = async (
  archived,
  companies,
  setCompanies,
  pageInfo,
  setPageInfo,
  setEditingInfo,
  setShowForm,
  formData,
  setFormData
) => {
  try {
    console.log(formData);
    const transformedFormData = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      transformedFormData.append(key, value);
    }

    const res = await fetch(apiPath("/sysad/company"), {
      credentials: "include",
      method: "POST",
      body: transformedFormData,
    });
    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setCompanies([...companies, data.data.company]);
      setEditingInfo(null);
      setShowForm(false);
      Swal.fire({
        icon: "success",
        title: "Registration Submitted Successfully!",
        text: "Your company registration has been submitted and is now under review.",
        confirmButtonColor: "#28a745",
      }).then(() => {
        // Reset form after successful submission
        setFormData({
          company_name: "",
          company_logo: null,
          letter_of_intent: null,
          company_profile: null,
          business_permit: null,
          sec: null,
          dti_cda: null,
          reg_of_est: null,
          dole_certification: null,
          pending_case_certification: null,
          philjobnet_registration: null,
        });
      });

      if ((companies ?? []).length >= 10)
         await getCompanies(
            setCompanies,
            setPageInfo,
            pageInfo.page + 1,
            archived,
            ''
         );
    } else {
      throw new Error(data.detail ?? "Unable to create company.");
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: e.message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
};

export const renameCompany = async (
  companies,
  setCompanies,
  setEditingInfo,
  companyId,
  companyName
) => {
  try {
    const res = await fetch(apiPath(`/sysad/company/${companyId}/rename`), {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: companyName }),
    });
    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setCompanies(
        companies.map((company) =>
          company.id === companyId
            ? { ...company, name: data.data.company.name }
            : company
        )
      );
      setEditingInfo(data.data.company);
      Swal.fire({
        icon: "success",
        title: "Company has been renamed.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } else {
      throw new Error(data.detail ?? "Unable to rename company.");
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: e.message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
};

export const updateCompanyDocument = async (
  companyId,
  fileName,
  companyDocumentTitle,
  companyDocumentFile,
  setFile
) => {
  try {
    const transformedFormData = new FormData();
    transformedFormData.append("document_title", companyDocumentTitle);
    transformedFormData.append("document_file", companyDocumentFile);

    const res = await fetch(
      apiPath(`/sysad/company/${companyId}/update-document`),
      {
        credentials: "include",
        method: "PATCH",
        body: transformedFormData,
      }
    );
    const data = await res.json();

    if (res.ok) {
      setFile(data.data.company.documents[fileName]);
      Swal.fire({
        icon: "success",
        title: "Company document has been updated.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } else {
      throw new Error(data.detail ?? "Unable to update document.");
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: e.message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
};

export const archiveRestoreCompany = async (
  companies,
  setCompanies,
  pageInfo,
  setPageInfo,
  archived,
  companyId
) => {
  try {
    const res = await fetch(
      apiPath(
        `/sysad/company/${companyId}/${!archived ? "archive" : "restore"}`
      ),
      {
        credentials: "include",
        method: "PATCH",
      }
    );
    const data = await res.json();

    if (res.ok) {
      const filteredCompanies = companies.filter(
        (company) => company.id !== companyId
      );
      const companiesLength = (filteredCompanies ?? []).length;

      setCompanies(filteredCompanies);

      if (companiesLength < 10 && companiesLength > 0) {
        await getCompanies(
          setCompanies,
          setPageInfo,
          pageInfo.page,
          archived,
          ""
        );
      } else {
        if (pageInfo.page > 1)
          await getCompanies(
            setCompanies,
            setPageInfo,
            pageInfo.page - 1,
            archived,
            ""
          );
      }

      Swal.fire({
        icon: "success",
        title: archived
          ? "Company has been restored."
          : "Company has been moved to archives.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } else {
      throw new Error(
        data.detail ?? `Unable to ${archived ? "archive" : "restore"} company.`
      );
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: e.message,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }
};

export const sortCompanies = (filter, companies, order = "a-z") =>
  companies
    .filter((company) => {
      if (filter === "all") return company;
      else return company.status === filter;
    })
    .sort((a, b) => {
      return order === "a-z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
