import { LayoutDashboard, Building2, Wrench, LucideBriefcase, Verified, Users, User, GraduationCap, Building, Settings, Archive, Settings2Icon, School } from 'lucide-react'

export const sidebarLinks = {
   sysad: [
      { // Dashboard
         isLink: true,
         icon: LayoutDashboard,
         label: 'Dashboard',
         path: '/sysad'
      },
      { // Manage Schools
         isLink: true,
         icon: School,
         label: 'Schools',
         path: '/sysad/manage-schools'
      },
      { // Management
         isLink: false, // Folder-like
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
      },
      { // Settings
         isLink: false,
         label: 'Settings',
         links: [
            { // Manage Own Accounts
               isLink: true,
               icon: User,
               label: 'Account',
               path: '#'
            },
            { // Manage Archives
               isLink: false,
               label: 'Archives',
               links: [
                  { // Manage Archived Schools
                     isLink: true,
                     icon: School,
                     label: 'Schools',
                     path: '/sysad/manage-archived-schools'
                  },
                  { // Manage Archived Companies
                     isLink: true,
                     icon: Building2,
                     label: 'Companies',
                     path: '#'
                  },
                  { // Manage Archived Job Posts
                     isLink: true,
                     icon: LucideBriefcase,
                     label: 'Job Posts',
                     path: '#'
                  },
               ]
            },
            { // Manage System
               isLink: true,
               icon: Settings2Icon,
               label: 'System',
               path: '#'
            },
         ]
      },
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
      { // Settings
         isLink: false,
         label: 'Settings',
         links: [
            { // Manage Own Accounts
               isLink: true,
               icon: User,
               label: 'Account',
               path: '#'
            },
         ]
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