import { useState } from "react"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Edit, Trash2, UserPlus, Eye, EyeOff, Mail, Phone, MapPin } from "lucide-react"

export default function SysadManagePesoPage() {
  const [pesoOfficers, setPesoOfficers] = useState([
    {
      id: "1",
      name: "Jane Dela Cruz",
      email: "jane.delacruz@peso.gov.ph",
      phone: "+63 917 234 5678",
      office: "PESO Manila",
      location: "Manila City Hall, Manila",
      status: "active",
      createdAt: "2024-01-12"
    },
    {
      id: "2",
      name: "Mark Gonzales",
      email: "mark.gonzales@peso.gov.ph",
      phone: "+63 918 345 6789",
      office: "PESO Quezon City",
      location: "Quezon City Hall, QC",
      status: "active",
      createdAt: "2024-01-18"
    },
    {
      id: "3",
      name: "Lisa Fernandez",
      email: "lisa.fernandez@peso.gov.ph",
      phone: "+63 919 456 7890",
      office: "PESO Makati",
      location: "Makati City Hall, Makati",
      status: "active",
      createdAt: "2024-02-05"
    },
    {
      id: "4",
      name: "Robert Tan",
      email: "robert.tan@peso.gov.ph",
      phone: "+63 920 567 8901",
      office: "PESO Pasig",
      location: "Pasig City Hall, Pasig",
      status: "inactive",
      createdAt: "2024-02-15"
    },
    {
      id: "5",
      name: "Sarah Lim",
      email: "sarah.lim@peso.gov.ph",
      phone: "+63 921 678 9012",
      office: "PESO Taguig",
      location: "Taguig City Hall, Taguig",
      status: "active",
      createdAt: "2024-03-01"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    office: "",
    location: "",
    password: "",
    status: "active"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      setPesoOfficers(pesoOfficers.map(officer => 
        officer.id === editingId 
          ? { ...formData, id: editingId, createdAt: pesoOfficers.find(o => o.id === editingId).createdAt }
          : officer
      ))
      setEditingId(null)
    } else {
      setPesoOfficers([...pesoOfficers, { 
        ...formData, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }
    
    setFormData({ name: "", email: "", phone: "", office: "", location: "", password: "", status: "active" })
    setShowForm(false)
  }

  const handleEdit = (id) => {
    const officer = pesoOfficers.find(o => o.id === id)
    setFormData({ ...officer, password: "" })
    setEditingId(id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this PESO officer account?")) {
      setPesoOfficers(pesoOfficers.filter(officer => officer.id !== id))
    }
  }

  const toggleOfficerStatus = (id) => {
    setPesoOfficers(pesoOfficers.map(officer => 
      officer.id === id 
        ? { ...officer, status: officer.status === 'active' ? 'inactive' : 'active' }
        : officer
    ))
  }

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-red-100 text-red-800">Inactive</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage PESO Officer Accounts</h1>
          <p className="text-gray-500 mt-1">Manage Public Employment Service Office (PESO) officer accounts</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: "", email: "", phone: "", office: "", location: "", password: "", status: "active" })
            setShowForm(!showForm)
          }}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {showForm ? "Cancel" : "Add PESO Officer"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit PESO Officer Account" : "Add New PESO Officer"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Dela Cruz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan.delacruz@peso.gov.ph"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+63 917 123 4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="office">PESO Office</Label>
                <Input
                  id="office"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  placeholder="PESO Manila"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Office Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Manila City Hall, Manila"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password {editingId && <span className="text-gray-500">(leave blank to keep current)</span>}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={editingId ? "Enter new password" : "Enter password"}
                    required={!editingId}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? "Update Officer" : "Create Officer"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Officer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PESO Office
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pesoOfficers.map((officer) => (
                <tr key={officer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {officer.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {officer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{officer.office}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {officer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {officer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(officer.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(officer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleOfficerStatus(officer.id)}
                        className={officer.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {officer.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(officer.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(officer.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {pesoOfficers.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No PESO officer accounts found. Create your first PESO officer account.</p>
        </Card>
      )}
    </div>
  )
}