import { useEffect, useState } from "react"
import { School, Search, X } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Select, SelectItem } from "../../../components/ui/select"
import { addSchool, archiveRestoreSchool, getSchools, renameSchool, sortSchools } from "../../../app/services/user/sysad/schoolService"

const SysadManageSchoolsPage = ({ archived = false }) => {
   const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 })
   const [order, setOrder] = useState('a-z')
   const [search, setSearch] = useState('')
   const [searched, setSearched] = useState(false)
   const [schools, setSchools] = useState(null)
   const [editingInfo, setEditingInfo] = useState(null)
   const [showForm, setShowForm] = useState(false)
   const [formData, setFormData] = useState({ name: '' })

   useEffect(() => {
      getSchools(setSchools, setPageInfo, 1, archived, '')
   }, [location.pathname])
   
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between bg-white">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">{archived ? 'Manage Archived Schools' : 'Manage Schools'}</h1>
            </div>
            {!archived && (
               <Button
                  variant={showForm ? 'secondary' : 'default'}
                  onClick={() => {
                     setEditingInfo(null)
                     setShowForm(!showForm)
                  }}
               >
                  {showForm ? 'Cancel' : 'Add School'}
               </Button>
            )}
         </div>

         {showForm && (
            <Card className="p-6">
               <h2 className="text-xl font-semibold mb-4">
                  {editingInfo ? "Rename School" : "Add New School"}
               </h2>
               
               <form onSubmit={async e => {
                  e.preventDefault()

                  if (editingInfo) await renameSchool(schools, setSchools, setEditingInfo, setShowForm, editingInfo.id, formData)
                  else await addSchool(archived, schools, setSchools, pageInfo, setPageInfo, setEditingInfo, setShowForm, formData)
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

         <Card className="p-4 flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
               Order
               <Select
                  value={order}
                  onChange={e => setOrder(e.target.value)}
               >
                  <SelectItem value={'a-z'}>Ascending</SelectItem>
                  <SelectItem value={'z-a'}>Descending</SelectItem>
               </Select>
            </div>
            <div className="grow flex items-center gap-x-4">
               <Input
                  value={search}
                  onChange={e => {
                     setSearch(e.target.value)
                  }}
                  placeholder='Search School Names'
                  required
                  className='grow'
               />
               <div className="flex items-center gap-x-2">
                  { search && <Button
                     variant="secondary"
                     className="flex items-center gap-x-1"
                     type='submit'
                     onClick={async () => {
                        setSearch('')

                        if (searched) {
                           setSearched(false)
                           await getSchools(setSchools, setPageInfo, 1, archived, '')
                        }
                     }}
                  >
                     <X className="w-5 pr-1" />
                     Cancel
                  </Button> }
                  <Button
                     variant="default"
                     className="flex items-center gap-x-1"
                     type='submit'
                     onClick={async () => {
                        setSearched(true)
                        await getSchools(setSchools, setPageInfo, 1, archived, search)
                     }}
                  >
                     <Search className="w-5 pr-1" />
                     Search
                  </Button>
               </div>
            </div>
         </Card>

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
                     {sortSchools(schools ?? [], order).map(school => (
                        <tr key={school.id} className="hover:bg-gray-50">
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                 <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                    <School className="h-5 w-5 text-gray-500" />
                                 </div>
                                 {school.name}
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(school.created_at).toLocaleDateString()}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                 <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => await archiveRestoreSchool(schools, setSchools, pageInfo, setPageInfo, archived, school.id)}
                                 >
                                    {archived ? 'Restore' : 'Archive'}
                                 </Button>
                                 {!archived && <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => {
                                       setFormData({ name: school.name })
                                       setEditingInfo(school)
                                       setShowForm(true)
                                    }}
                                 >
                                    Rename
                                 </Button>}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            </Card>

         {(schools ?? []).length <= 0 
            ? (
               <Card className="p-8 text-center">
                  {search
                  ? <p className="text-gray-500">There are no matching schools for "{search}".</p>
                  : <p className="text-gray-500">There are no {archived ? 'archived' : 'active'} schools yet.</p>}
               </Card>
            )
            : (
               <Card className="w-full flex items-center justify-between p-4">
                  <p>Page {pageInfo.page} out of {pageInfo.totalPages}</p>
                  <div className="flex items-center gap-x-2">
                     {pageInfo.page > 1 && (
                        <Button
                           size="md"
                           variant="secondary"
                           onClick={async () => await getSchools(setSchools, setPageInfo, pageInfo.page - 1, archived, '')}
                        >
                           Prev
                        </Button>
                     )}
                     {pageInfo.page < pageInfo.totalPages && (
                        <Button
                           size="md"
                           variant="secondary"
                           onClick={async () => await getSchools(setSchools, setPageInfo, pageInfo.page + 1, archived, '')}
                        >
                           Next
                        </Button>
                     )}
                  </div>
               </Card>
            )
         }
      </div>
   )
}

export default SysadManageSchoolsPage