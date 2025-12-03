import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Switch } from "../../../components/ui/switch"
import { Briefcase, Building2, MapPin, Calendar, Users, DollarSign, Clock, Archive, Eye, Edit, Trash2 } from "lucide-react"

const SysadJobPostPage = () => {
   const [jobPosts, setJobPosts] = useState([])
   const [companies, setCompanies] = useState([])
   const [showForm, setShowForm] = useState(false)
   const [editingJob, setEditingJob] = useState(null)
   const [loading, setLoading] = useState(true)
   const [formData, setFormData] = useState({
      title: '',
      description: '',
      location: '',
      work_setup: 'on_site',
      qualifications: '',
      roles_and_res: '',
      application_steps: '',
      total_vacancies: 1,
      monthly_pay: true,
      company_id: ''
   })

   // Mock data for companies
   useEffect(() => {
      setCompanies([
         { id: 1, name: 'Tech Solutions Inc.' },
         { id: 2, name: 'Digital Marketing Co.' },
         { id: 3, name: 'Manufacturing Corp.' },
         { id: 4, name: 'Creative Studios' }
      ])
   }, [])

   // Mock data for job posts
   useEffect(() => {
      setTimeout(() => {
         setJobPosts([
            {
               id: 1,
               title: 'Senior Software Developer',
               description: 'Develop and maintain web applications using modern technologies.',
               location: 'Makati City, Metro Manila',
               work_setup: 'hybrid',
               qualifications: 'Bachelor\'s degree in Computer Science, 3+ years experience',
               roles_and_res: 'Design, develop, and test software applications',
               application_steps: '1. Submit resume 2. Technical interview 3. Final interview',
               total_vacancies: 5,
               monthly_pay: true,
               company_id: 1,
               company_name: 'Tech Solutions Inc.',
               created_at: '2024-11-20T10:30:00',
               updated_at: '2024-11-20T10:30:00',
               archived: false,
               sysad_creator_id: 1
            },
            {
               id: 2,
               title: 'Marketing Manager',
               description: 'Lead marketing campaigns and strategies for digital products.',
               location: 'BGC, Taguig',
               work_setup: 'on_site',
               qualifications: 'Marketing degree, 5+ years in digital marketing',
               roles_and_res: 'Develop marketing strategies, manage campaigns, analyze metrics',
               application_steps: '1. Online application 2. Portfolio review 3. Interview',
               total_vacancies: 2,
               monthly_pay: true,
               company_id: 2,
               company_name: 'Digital Marketing Co.',
               created_at: '2024-11-19T14:15:00',
               updated_at: '2024-11-19T14:15:00',
               archived: false,
               sysad_creator_id: 1
            }
         ])
         setLoading(false)
      }, 1000)
   }, [])

   const handleInputChange = (field, value) => {
      setFormData(prev => ({
         ...prev,
         [field]: value
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      try {
         // Here you would make the API call to create/update the job post
         const jobPostData = {
            ...formData,
            company_id: parseInt(formData.company_id),
            total_vacancies: parseInt(formData.total_vacancies)
         }
         
         // Mock API response
         const newJobPost = {
            id: editingJob ? editingJob.id : Date.now(),
            ...jobPostData,
            company_name: companies.find(c => c.id === parseInt(formData.company_id))?.name || '',
            created_at: editingJob ? editingJob.created_at : new Date().toISOString(),
            updated_at: new Date().toISOString(),
            archived: false,
            sysad_creator_id: 1
         }

         if (editingJob) {
            setJobPosts(prev => prev.map(job => 
               job.id === editingJob.id ? newJobPost : job
            ))
         } else {
            setJobPosts(prev => [...prev, newJobPost])
         }

         // Reset form
         setFormData({
            title: '',
            description: '',
            location: '',
            work_setup: 'on_site',
            qualifications: '',
            roles_and_res: '',
            application_steps: '',
            total_vacancies: 1,
            monthly_pay: true,
            company_id: ''
         })
         setShowForm(false)
         setEditingJob(null)

      } catch (error) {
         console.error('Error creating/updating job post:', error)
      }
   }

   const handleEdit = (job) => {
      setFormData({
         title: job.title,
         description: job.description,
         location: job.location,
         work_setup: job.work_setup,
         qualifications: job.qualifications,
         roles_and_res: job.roles_and_res,
         application_steps: job.application_steps,
         total_vacancies: job.total_vacancies,
         monthly_pay: job.monthly_pay,
         company_id: job.company_id.toString()
      })
      setEditingJob(job)
      setShowForm(true)
   }

   const handleArchive = (jobId) => {
      setJobPosts(prev => prev.map(job => 
         job.id === jobId ? { ...job, archived: true } : job
      ))
   }

   const handleDelete = (jobId) => {
      if (window.confirm('Are you sure you want to delete this job post?')) {
         setJobPosts(prev => prev.filter(job => job.id !== jobId))
      }
   }

   const getWorkSetupBadge = (workSetup) => {
      const variants = {
         'on_site': 'default',
         'remote': 'secondary',
         'hybrid': 'outline'
      }
      const labels = {
         'on_site': 'On-site',
         'remote': 'Remote',
         'hybrid': 'Hybrid'
      }
      return { variant: variants[workSetup], label: labels[workSetup] }
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">Manage Job Posts</h1>
               <p className="text-gray-500 mt-1">Create and manage job postings for companies</p>
            </div>
            <Button onClick={() => {
               setEditingJob(null)
               setFormData({
                  title: '',
                  description: '',
                  location: '',
                  work_setup: 'on_site',
                  qualifications: '',
                  roles_and_res: '',
                  application_steps: '',
                  total_vacancies: 1,
                  monthly_pay: true,
                  company_id: ''
               })
               setShowForm(!showForm)
            }}>
               {showForm ? 'Cancel' : 'Create Job Post'}
            </Button>
         </div>

         {showForm && (
            <Card className="p-6">
               <h2 className="text-xl font-semibold mb-4">
                  {editingJob ? "Edit Job Post" : "Create New Job Post"}
               </h2>
               
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                           id="title"
                           value={formData.title}
                           onChange={(e) => handleInputChange('title', e.target.value)}
                           placeholder="e.g. Senior Software Developer"
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="company_id">Company *</Label>
                        <select
                           id="company_id"
                           value={formData.company_id}
                           onChange={(e) => handleInputChange('company_id', e.target.value)}
                           className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        >
                           <option value="">Select a company</option>
                           {companies.map(company => (
                              <option key={company.id} value={company.id}>
                                 {company.name}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">Job Description *</Label>
                     <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the job position, responsibilities, and requirements..."
                        rows={4}
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                           id="location"
                           value={formData.location}
                           onChange={(e) => handleInputChange('location', e.target.value)}
                           placeholder="e.g. Makati City, Metro Manila"
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="work_setup">Work Setup *</Label>
                        <select
                           id="work_setup"
                           value={formData.work_setup}
                           onChange={(e) => handleInputChange('work_setup', e.target.value)}
                           className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        >
                           <option value="on_site">On-site</option>
                           <option value="remote">Remote</option>
                           <option value="hybrid">Hybrid</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="qualifications">Qualifications *</Label>
                     <textarea
                        id="qualifications"
                        value={formData.qualifications}
                        onChange={(e) => handleInputChange('qualifications', e.target.value)}
                        placeholder="List the required qualifications, education, experience, skills..."
                        rows={3}
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="roles_and_res">Roles and Responsibilities *</Label>
                     <textarea
                        id="roles_and_res"
                        value={formData.roles_and_res}
                        onChange={(e) => handleInputChange('roles_and_res', e.target.value)}
                        placeholder="Describe the main roles and responsibilities for this position..."
                        rows={3}
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="application_steps">Application Steps *</Label>
                     <textarea
                        id="application_steps"
                        value={formData.application_steps}
                        onChange={(e) => handleInputChange('application_steps', e.target.value)}
                        placeholder="Describe the application process steps (e.g. 1. Submit resume 2. Interview 3. Final decision)"
                        rows={3}
                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="total_vacancies">Total Vacancies *</Label>
                        <Input
                           id="total_vacancies"
                           type="number"
                           min="1"
                           value={formData.total_vacancies}
                           onChange={(e) => handleInputChange('total_vacancies', parseInt(e.target.value) || 1)}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label>Payment Type</Label>
                        <div className="flex items-center space-x-2 pt-2">
                           <Switch
                              checked={formData.monthly_pay}
                              onCheckedChange={(checked) => handleInputChange('monthly_pay', checked)}
                           />
                           <span className="text-sm">
                              {formData.monthly_pay ? 'Monthly Pay' : 'Hourly/Project Pay'}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                     <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                           setShowForm(false)
                           setEditingJob(null)
                        }}
                     >
                        Cancel
                     </Button>
                     <Button type="submit">
                        {editingJob ? "Update Job Post" : "Create Job Post"}
                     </Button>
                  </div>
               </form>
            </Card>
         )}

         <Card className="overflow-hidden">
            <div className="p-6 border-b">
               <h3 className="text-lg font-semibold">Job Posts</h3>
               <p className="text-sm text-gray-600">Manage all job postings</p>
            </div>
            
            {loading ? (
               <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading job posts...</p>
               </div>
            ) : (
               <div className="divide-y divide-gray-200">
                  {jobPosts.filter(job => !job.archived).map((job) => (
                     <div key={job.id} className="p-6 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                           <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                 <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                                 <Badge variant={getWorkSetupBadge(job.work_setup).variant}>
                                    {getWorkSetupBadge(job.work_setup).label}
                                 </Badge>
                                 {job.monthly_pay && (
                                    <Badge variant="outline">
                                       <DollarSign className="h-3 w-3 mr-1" />
                                       Monthly Pay
                                    </Badge>
                                 )}
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                 <span className="flex items-center">
                                    <Building2 className="h-4 w-4 mr-1" />
                                    {job.company_name}
                                 </span>
                                 <span className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                 </span>
                                 <span className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {job.total_vacancies} {job.total_vacancies === 1 ? 'vacancy' : 'vacancies'}
                                 </span>
                                 <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(job.created_at).toLocaleDateString()}
                                 </span>
                              </div>

                              <p className="text-gray-700 mb-2 line-clamp-2">{job.description}</p>
                              
                              <div className="text-sm text-gray-600">
                                 <p><strong>Qualifications:</strong> {job.qualifications}</p>
                              </div>
                           </div>

                           <div className="flex items-center space-x-2 ml-4">
                              <Button
                                 size="sm"
                                 variant="outline"
                                 onClick={() => handleEdit(job)}
                              >
                                 <Edit className="h-4 w-4 mr-1" />
                                 Edit
                              </Button>
                              <Button
                                 size="sm"
                                 variant="outline"
                                 onClick={() => handleArchive(job.id)}
                              >
                                 <Archive className="h-4 w-4 mr-1" />
                                 Archive
                              </Button>
                              <Button
                                 size="sm"
                                 variant="destructive"
                                 onClick={() => handleDelete(job.id)}
                              >
                                 <Trash2 className="h-4 w-4 mr-1" />
                                 Delete
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))}

                  {jobPosts.filter(job => !job.archived).length === 0 && (
                     <div className="p-8 text-center">
                        <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No job posts found. Create your first job post!</p>
                     </div>
                  )}
               </div>
            )}
         </Card>
      </div>
   )
}

export default SysadJobPostPage