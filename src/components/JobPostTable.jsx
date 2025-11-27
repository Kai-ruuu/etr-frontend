

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default function JobPostTable({ jobs, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === "published"
                          ? "bg-blue-100 text-blue-800"
                          : job.status === "closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(job.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(job.id)}>
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
