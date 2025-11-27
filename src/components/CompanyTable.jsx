

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Industry</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{company.industry}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        company.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : company.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(company.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(company.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
