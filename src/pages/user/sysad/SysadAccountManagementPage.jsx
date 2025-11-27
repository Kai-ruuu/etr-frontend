import { useState } from "react"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Edit, Trash2, UserPlus, Eye, EyeOff } from "lucide-react"

export default function SysadAccountManagementPage() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Admin",
      email: "john@admin.com",
      role: "sysad",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane PESO",
      email: "jane@peso.gov.ph",
      role: "peso",
      status: "active",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Mike Validator",
      email: "mike@peso.gov.ph",
      role: "peso",
      status: "inactive",
      createdAt: "2024-02-01"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "peso",
    status: "active"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      setUsers(users.map(user => 
        user.id === editingId 
          ? { ...formData, id: editingId, createdAt: users.find(u => u.id === editingId).createdAt }
          : user
      ))
      setEditingId(null)
    } else {
      setUsers([...users, { 
        ...formData, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }
    
    setFormData({ name: "", email: "", password: "", role: "peso", status: "active" })
    setShowForm(false)
  }

  const handleEdit = (id) => {
    const user = users.find(u => u.id === id)
    setFormData({ ...user, password: "" })
    setEditingId(id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-red-100 text-red-800">Inactive</Badge>
  }

  const getRoleBadge = (role) => {
    const roleColors = {
      sysad: "bg-blue-100 text-blue-800",
      peso: "bg-purple-100 text-purple-800"
    }
    
    return (
      <Badge className={roleColors[role]}>
        {role === 'sysad' ? 'System Admin' : 'PESO Officer'}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({ name: "", email: "", password: "", role: "peso", status: "active" })
            setShowForm(!showForm)
          }}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {showForm ? "Cancel" : "Add User"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit User" : "Add New User"}
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
                  placeholder="Enter full name"
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
                  placeholder="Enter email address"
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
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="peso">PESO Officer</option>
                  <option value="sysad">System Admin</option>
                </select>
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
                {editingId ? "Update User" : "Create User"}
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
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id)}
                        className={user.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(user.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(user.id)}
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

      {users.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No users found. Create your first user account.</p>
        </Card>
      )}
    </div>
  )
}