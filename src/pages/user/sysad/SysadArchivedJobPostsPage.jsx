import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Archive, Search, RotateCcw, Trash2, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react'
import { Alert, AlertDescription } from '../../../components/ui/alert'

const SysadArchivedJobPostsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [archivedJobPosts, setArchivedJobPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for archived job posts
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArchivedJobPosts([
        {
          id: 1,
          title: 'Senior Software Developer',
          company: 'TechCorp Solutions',
          location: 'Manila, Philippines',
          jobType: 'Full-time',
          salary: '₱80,000 - ₱120,000',
          archivedDate: '2024-01-15',
          archivedBy: 'Admin User',
          reason: 'Position filled',
          applicationsCount: 45
        },
        {
          id: 2,
          title: 'Marketing Manager',
          company: 'Digital Marketing Hub',
          location: 'Cebu, Philippines',
          jobType: 'Full-time',
          salary: '₱60,000 - ₱90,000',
          archivedDate: '2024-02-20',
          archivedBy: 'System Admin',
          reason: 'Expired posting',
          applicationsCount: 32
        },
        {
          id: 3,
          title: 'Production Supervisor',
          company: 'Global Manufacturing Inc.',
          location: 'Davao, Philippines',
          jobType: 'Full-time',
          salary: '₱45,000 - ₱65,000',
          archivedDate: '2024-03-10',
          archivedBy: 'Admin User',
          reason: 'Company request',
          applicationsCount: 28
        },
        {
          id: 4,
          title: 'Graphic Designer',
          company: 'Creative Studios',
          location: 'Quezon City, Philippines',
          jobType: 'Part-time',
          salary: '₱25,000 - ₱35,000',
          archivedDate: '2024-03-15',
          archivedBy: 'System Admin',
          reason: 'Budget constraints',
          applicationsCount: 18
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredJobPosts = archivedJobPosts.filter(jobPost =>
    jobPost.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobPost.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobPost.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobPost.jobType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRestore = (jobPostId) => {
    setArchivedJobPosts(prev => prev.filter(jobPost => jobPost.id !== jobPostId))
  }

  const handlePermanentDelete = (jobPostId) => {
    if (window.confirm('Are you sure you want to permanently delete this job post? This action cannot be undone.')) {
      setArchivedJobPosts(prev => prev.filter(jobPost => jobPost.id !== jobPostId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getJobTypeBadgeVariant = (jobType) => {
    switch (jobType.toLowerCase()) {
      case 'full-time':
        return 'default'
      case 'part-time':
        return 'secondary'
      case 'contract':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Archive className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Archived Job Posts</h1>
      </div>

      <Alert>
        <Archive className="h-4 w-4" />
        <AlertDescription>
          Job posts in this archive have been removed from active listings. You can restore them or permanently delete them.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Archived Job Posts Management</span>
          </CardTitle>
          <CardDescription>
            View and manage job posts that have been archived from the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search archived job posts by title, company, location, or job type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Job Posts Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading archived job posts...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Archived Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <Archive className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            {searchTerm ? 'No archived job posts found matching your search.' : 'No archived job posts found.'}
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobPosts.map((jobPost) => (
                        <TableRow key={jobPost.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span>{jobPost.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{jobPost.company}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{jobPost.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getJobTypeBadgeVariant(jobPost.jobType)}>
                              {jobPost.jobType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">{jobPost.salary}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{jobPost.applicationsCount} applications</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatDate(jobPost.archivedDate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{jobPost.reason}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRestore(jobPost.id)}
                                className="flex items-center space-x-1"
                              >
                                <RotateCcw className="h-3 w-3" />
                                <span>Restore</span>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handlePermanentDelete(jobPost.id)}
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

export default SysadArchivedJobPostsPage