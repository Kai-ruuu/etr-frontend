import Swal from "sweetalert2"
import { apiPath } from "../../../utils/api"

export const getSchools = async (setSchools, setPageInfo, page = 1, archived = false, search = null) => {
   try {
      const res = await fetch(apiPath(`/sysad/school?page=${page}&archived=${archived}${search && '&search=' + search}`), { credentials: 'include' })
      const data = await res.json()

      if (res.ok) {
         setPageInfo({ page: data.data.page, totalPages: data.data.total_pages })
         setSchools(data.data.schools)
      } else {
         throw new Error(data.detail ?? 'Unable to load schools.')
      }
   } catch (e) {
      console.error(e)
      Swal.fire({
         icon: 'error',
         title: e.message,
         timer: 2000,
         timerProgressBar: true,
         showConfirmButton: false,
         toast: true,
         position: 'top-end'
      });
   }
}

export const addSchool = async (archived, schools, setSchools, pageInfo, setPageInfo, setEditingInfo, setShowForm, formData) => {
   try {
      const res = await fetch(apiPath('/sysad/school'), {
         credentials: 'include',
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
         setSchools([...schools, data.data.school])
         setEditingInfo(null)
         setShowForm(false)
         Swal.fire({
            icon: 'success',
            title: 'School has been created.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
         });

         if ((schools ?? []).length >= 10) await getSchools(setSchools, setPageInfo, pageInfo.page + 1, archived)
      } else {
         throw new Error(data.detail ?? 'Unable to create school.')
      }
   } catch (e) {
      console.error(e)
      Swal.fire({
         icon: 'error',
         title: e.message,
         timer: 2000,
         timerProgressBar: true,
         showConfirmButton: false,
         toast: true,
         position: 'top-end'
      });
   }
}

export const renameSchool = async (schools, setSchools, setEditingInfo, setShowForm, schoolId, formData) => {
   try {
      const res = await fetch(apiPath(`/sysad/school/${schoolId}/rename`), {
         credentials: 'include',
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
         setSchools(schools.map(school => school.id === schoolId ? { ...school, name: data.data.school.name } : school))
         setEditingInfo(null)
         setShowForm(false)
         Swal.fire({
            icon: 'success',
            title: 'School has been renamed.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
         });
      } else {
         throw new Error(data.detail ?? 'Unable to rename school.')
      }
   } catch (e) {
      console.error(e)
      Swal.fire({
         icon: 'error',
         title: e.message,
         timer: 2000,
         timerProgressBar: true,
         showConfirmButton: false,
         toast: true,
         position: 'top-end'
      });
   }
}

export const archiveRestoreSchool = async (schools, setSchools, pageInfo, setPageInfo, archived, schoolId) => {
   try {
      const res = await fetch(apiPath(`/sysad/school/${schoolId}/${!archived ? 'archive' : 'restore'}`), {
         credentials: 'include',
         method: 'PATCH'
      })
      const data = await res.json()

      if (res.ok) {
         const filteredSchools = schools.filter(school => school.id !== schoolId)
         const schoolsLength = (filteredSchools ?? []).length
         
         setSchools(filteredSchools)

         if (schoolsLength < 10 && schoolsLength > 0) {
            await getSchools(setSchools, setPageInfo, pageInfo.page, archived, '')
         } else {
            if (pageInfo.page > 1) await getSchools(setSchools, setPageInfo, pageInfo.page - 1, archived, '')
         }
         
         Swal.fire({
            icon: 'success',
            title: archived ? 'School has been restored.' : 'School has been moved to archives.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
         });
      } else {
         throw new Error(data.detail ?? `Unable to ${archived ? 'archive' : 'restore'} school.`)
      }
   } catch (e) {
      console.error(e)
      Swal.fire({
         icon: 'error',
         title: e.message,
         timer: 2000,
         timerProgressBar: true,
         showConfirmButton: false,
         toast: true,
         position: 'top-end'
      });
   }
}

export const sortSchools = (schools, order = 'a-z') => schools.sort((a, b) => {
   return order === 'a-z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
})