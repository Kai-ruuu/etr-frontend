import { LayoutDashboard, Building2, Wrench, LucideBriefcase, Verified, Users, User, GraduationCap, Building } from 'lucide-react'

export const sidebarLinks = {
   sysad: [
      { // Dashboard
         isLink: true,
         icon: LayoutDashboard,
         label: 'Dashboard',
         path: '/sysad'
      },
      { // Management
         isLink: false, // Folder-like
         icon: Wrench,
         label: 'Manage Companies & Job Posts',
         links: [
            { // Manage Companies
               isLink: true,
               icon: Building2,
               label: 'Companies',
               path: '/sysad/manage-companies'
            },
            { // Manage Job Posts
               isLink: true,
               icon: LucideBriefcase,
               label: 'Job Posts',
               path: '/sysad/manage-job-posts'
            },
         ]
      },
      { // Account Management
         isLink: false,
         icon: Users,
         label: 'Manage Accounts',
         links: [
            { // Manage Dean Accounts
               isLink: true,
               icon: GraduationCap,
               label: 'Dean',
               path: '/sysad/manage-dean'
            },
            { // Manage PESO Accounts
               isLink: true,
               icon: Building,
               label: 'PESO',
               path: '/sysad/manage-peso'
            },
         ]
      }
   ],
   peso: [
      {
         isLink: true,
         icon: LayoutDashboard,
         label: 'Dashboard',
         path: '/peso'
      },
      {
         isLink: true,
         icon: Verified,
         label: 'Verify Companies',
         path: '/peso/verify-companies'
      },
   ]
}

export const getRoleLinks = role => sidebarLinks[role]

export const getRoleDashboard = role => {
   return {
      sysad: '/sysad',
      peso: '/peso',
   }[role]
}