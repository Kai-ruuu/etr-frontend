import { useState } from "react";
import EnhancedCompanyForm from "../../../components/EnhancedCompanyForm";
import EnhancedCompanyTable from "../../../components/EnhancedCompanyTable";
import { Button } from "../../../components/ui/button";

export default function SysadCompaniesPage() {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState([
    {
      id: "1",
      name: "Tech Corp",
      status: "approved",
      logo: null,
      letterOfIntent: null,
      companyProfile: null,
      businessPermit: null,
      sec: null,
      dtiCdaReg: null,
      registryOfEstablishment: null,
      certificationFromDole: null,
      certificationNoPendingCase: null,
      philJobNetReg: null,
      vacancies: ""
    },
    {
      id: "2",
      name: "Finance Ltd",
      status: "pending",
      logo: null,
      letterOfIntent: null,
      companyProfile: null,
      businessPermit: null,
      sec: null,
      dtiCdaReg: null,
      registryOfEstablishment: null,
      certificationFromDole: null,
      certificationNoPendingCase: null,
      philJobNetReg: null,
      vacancies: ""
    },
  ]);
  const [editingId, setEditingId] = useState(null);

  const handleAddCompany = (company) => {
    if (editingId) {
      setCompanies(
        companies.map((c) =>
          c.id === editingId ? { ...company, id: editingId } : c
        )
      );
      setEditingId(null);
    } else {
      setCompanies([...companies, { ...company, id: Date.now().toString(), status: "pending" }]);
    }
    setShowForm(false);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((c) => c.id !== id));
    }
  };

  const handleView = (company) => {
    // View functionality is handled within the EnhancedCompanyTable component
    console.log("Viewing company:", company.name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Management</h1>
          <p className="text-gray-600 mt-1">Manage company registrations and document submissions</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "Register New Company"}
        </Button>
      </div>

      {showForm && (
        <EnhancedCompanyForm
          onSubmit={handleAddCompany}
          editingId={editingId}
          companies={companies}
        />
      )}

      <EnhancedCompanyTable
        companies={companies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
}