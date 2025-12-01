import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { addSchool, archiveRestoreSchool, getSchools, renameSchool } from "../../../app/services/user/sysad/schoolService"
import { Card } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"

const SysadManageSchoolsPage = ({ archived = false }) => {
   const [pageInfo, setPageInfo] = useState({
      page: 1,
      totalPages: 1,
   })
   const [schools, setSchools] = useState(null)
   const [editingInfo, setEditingInfo] = useState(null)
   const [showForm, setShowForm] = useState(false)
   const [formData, setFormData] = useState({ name: '' })

   useEffect(() => {
      getSchools(setSchools, setPageInfo, 1, archived)
   }, [location.pathname])
   
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">{archived ? 'Manage Archived Schools' : 'Manage Schools'}</h1>
               <p className="text-gray-500 mt-1">Manage schools</p>
            </div>
            {!archived && <Button onClick={() => {
               setEditingInfo(null)
               setShowForm(!showForm)
            }}>
               {showForm ? 'Cancel' : 'Add School'}
            </Button>}
         </div>

         {showForm && (
            <Card className="p-6">
               <h2 className="text-xl font-semibold mb-4">
                  {editingInfo ? "Rename School" : "Add New School"}
               </h2>
               
               <form onSubmit={async e => {
                  e.preventDefault()

                  if (editingInfo) await renameSchool(schools, setSchools, setEditingInfo, setShowForm, editingInfo.id, formData)
                  else await addSchool(schools, setSchools, setEditingInfo, setShowForm, formData)
               }} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">School Name</Label>
                     <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={e => setFormData({ name: e.target.value })}
                        placeholder="Juan Dela Cruz"
                        required
                     />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                     <Button type="submit">
                        {editingInfo ? "Rename School" : "Create School"}
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
                           School
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Date Created
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {(schools ?? []).map(school => (
                        <tr key={school.id} className="hover:bg-gray-50">
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                 {school.name}
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(school.created_at).toLocaleDateString()}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                 {!archived && <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                       setFormData({ name: school.name })
                                       setEditingInfo(school)
                                       setShowForm(true)
                                    }}
                                 >
                                    Rename
                                 </Button>}
                                 <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => await archiveRestoreSchool(schools, setSchools, archived, school.id)}
                                    className="text-red-500"
                                 >
                                    {archived ? 'Restore' : 'Archive'}
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            </Card>

         {(schools ?? []).length === 0 && (
            <Card className="p-8 text-center">
               <p className="text-gray-500">There are no {archived ? 'archived' : 'active'} schools yet.</p>
            </Card>
         )}

         {(schools ?? []).length > 0 && (
            <Card className="w-full flex items-center justify-between p-4">
               <p>Page {pageInfo.page} out of {pageInfo.totalPages}</p>
               <div>
                  {pageInfo.page > 1 && (
                     <Button
                        size="md"
                        variant="outline"
                     >
                        Prev
                     </Button>
                  )}
                  {pageInfo.page < pageInfo.totalPages && (
                     <Button
                        size="md"
                        variant="outline"
                     >
                        Next
                     </Button>
                  )}
               </div>
            </Card>
         )}
      </div>
   )
}

export default SysadManageSchoolsPage