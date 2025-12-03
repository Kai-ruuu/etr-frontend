import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Archive, Search, RotateCcw, Trash2, Building2, Calendar, MapPin } from 'lucide-react'
import { Alert, AlertDescription } from '../../../components/ui/alert'

const SysadArchivedCompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [archivedCompanies, setArchivedCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for archived companies
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArchivedCompanies([
        {
          id: 1,
          name: 'TechCorp Solutions',
          industry: 'Technology',
          location: 'Manila, Philippines',
          archivedDate: '2024-01-15',
          archivedBy: 'Admin User',
          reason: 'Company closed operations',
          jobPostsCount: 12
        },
        {
          id: 2,
          name: 'Global Manufacturing Inc.',
          industry: 'Manufacturing',
          location: 'Cebu, Philippines',
          archivedDate: '2024-02-20',
          archivedBy: 'System Admin',
          reason: 'Inactive for 6 months',
          jobPostsCount: 8
        },
        {
          id: 3,
          name: 'Digital Marketing Hub',
          industry: 'Marketing',
          location: 'Davao, Philippines',
          archivedDate: '2024-03-10',
          archivedBy: 'Admin User',
          reason: 'Requested by company',
          jobPostsCount: 5
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCompanies = archivedCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRestore = (companyId) => {
    // Handle restore logic
    setArchivedCompanies(prev => prev.filter(company => company.id !== companyId))
  }

  const handlePermanentDelete = (companyId) => {
    if (window.confirm('Are you sure you want to permanently delete this company? This action cannot be undone.')) {
      setArchivedCompanies(prev => prev.filter(company => company.id !== companyId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Archive className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Archived Companies</h1>
      </div>

      <Alert>
        <Archive className="h-4 w-4" />
        <AlertDescription>
          Companies in this archive have been removed from active listings. You can restore them or permanently delete them.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Archived Companies Management</span>
          </CardTitle>
          <CardDescription>
            View and manage companies that have been archived from the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search archived companies by name, industry, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Companies Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading archived companies...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Job Posts</TableHead>
                      <TableHead>Archived Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Archive className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            {searchTerm ? 'No archived companies found matching your search.' : 'No archived companies found.'}
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCompanies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span>{company.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{company.industry}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{company.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{company.jobPostsCount} posts</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatDate(company.archivedDate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{company.reason}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRestore(company.id)}
                                className="flex items-center space-x-1"
                              >
                                <RotateCcw className="h-3 w-3" />
                                <span>Restore</span>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handlePermanentDelete(company.id)}
                                className="flex items-center space-x-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SysadArchivedCompaniesPage