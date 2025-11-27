import { useState } from "react"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Edit, Trash2, UserPlus, Eye, EyeOff, Mail, Phone } from "lucide-react"

export default function SysadManageDeanPage() {
  const [deans, setDeans] = useState([
    {
      id: "1",
      name: "Dr. Maria Santos",
      email: "maria.santos@university.edu",
      phone: "+63 917 123 4567",
      department: "College of Engineering",
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      name: "Dr. Roberto Cruz",
      email: "roberto.cruz@university.edu",
      phone: "+63 918 234 5678",
      department: "College of Business Administration",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Dr. Ana Reyes",
      email: "ana.reyes@university.edu",
      phone: "+63 919 345 6789",
      department: "College of Arts and Sciences",
      status: "active",
      createdAt: "2024-02-01"
    },
    {
      id: "4",
      name: "Dr. Carlos Mendoza",
      email: "carlos.mendoza@university.edu",
      phone: "+63 920 456 7890",
      department: "College of Education",
      status: "inactive",
      createdAt: "2024-02-10"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
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
      setDeans(deans.map(dean => 
        dean.id === editingId 
          ? { ...formData, id: editingId, createdAt: deans.find(d => d.id === editingId).createdAt }
          : dean
      ))
      setEditingId(null)
    } else {
      setDeans([...deans, { 
        ...formData, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }
    
    setFormData({ name: "", email: "", phone: "", department: "", password: "", status: "active" })
    setShowForm(false)
  }

  const handleEdit = (id) => {
    const dean = deans.find(d => d.id === id)
    setFormData({ ...dean, password: "" })
    setEditingId(id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dean account?")) {
      setDeans(deans.filter(dean => dean.id !== id))
    }
  }

  const toggleDeanStatus = (id) => {
    setDeans(deans.map(dean => 
      dean.id === id 
        ? { ...dean, status: dean.status === 'active' ? 'inactive' : 'active' }
        : dean
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
          <h1 className="text-3xl font-bold tracking-tight">Manage Dean Accounts</h1>
          <p className="text-gray-500 mt-1">Manage college dean accounts and permissions</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: "", email: "", phone: "", department: "", password: "", status: "active" })
            setShowForm(!showForm)
          }}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {showForm ? "Cancel" : "Add Dean"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Dean Account" : "Add New Dean"}
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
                  placeholder="Dr. John Doe"
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
                  placeholder="john.doe@university.edu"
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
                <Label htmlFor="department">Department/College</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="College of Engineering"
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
                {editingId ? "Update Dean" : "Create Dean"}
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
                  Dean
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
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
              {deans.map((dean) => (
                <tr key={dean.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {dean.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {dean.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{dean.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {dean.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(dean.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(dean.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleDeanStatus(dean.id)}
                        className={dean.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {dean.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(dean.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(dean.id)}
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

      {deans.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No dean accounts found. Create your first dean account.</p>
        </Card>
      )}
    </div>
  )
}