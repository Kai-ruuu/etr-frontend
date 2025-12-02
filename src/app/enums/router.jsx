// packages
import { createBrowserRouter, Navigate } from "react-router-dom"

// local
import AuthLayout from "../../layouts/AuthLayout"
import UserLayout from "../../layouts/UserLayout"

import ProtectedRoute from "../../components/ProtectedRoute"
import LoginPage from "../../pages/auth/LoginPage"
import ForgotPasswordPage from "../../pages/auth/ForgotPasswordPage"
import ForgotPasswordResetPage from "../../pages/auth/ForgotPasswordResetPage"
import SysadDashboardPage from "../../pages/user/sysad/SysadDashboardPage"
import SysadCompaniesPage from "../../pages/user/sysad/SysadCompaniesPage"
import SysadJobPostPage from "../../pages/user/sysad/SysadJobPostPage"
import SysadManageDeanPage from "../../pages/user/sysad/SysadManageDeanPage"
import SysadManagePesoPage from "../../pages/user/sysad/SysadManagePesoPage"
import SysadManageSchoolsPage from "../../pages/user/sysad/SysadManageSchoolsPage"
import SysadAccountPage from "../../pages/user/sysad/SysadAccountPage"
import SysadArchivedCompaniesPage from "../../pages/user/sysad/SysadArchivedCompaniesPage"
import SysadArchivedJobPostsPage from "../../pages/user/sysad/SysadArchivedJobPostsPage"
import SysadSystemPage from "../../pages/user/sysad/SysadSystemPage"
import PesoDashboardPage from "../../pages/user/peso/PesoDashboardPage"
import PesoCompanyVerificationPage from "../../pages/user/peso/PesoCompanyVerificationPage"
import PesoAccountPage from "../../pages/user/peso/PesoAccountPage"

export const router = createBrowserRouter([
   { path: '/', element: <Navigate to="/auth" replace /> },
   {
      path: '/auth',
      element: <AuthLayout/>,
      children: [
         { index: true, element: <LoginPage/> },
         { path: 'forgot-password', element: <ForgotPasswordPage/> },
         { path: 'reset-password', element: <ForgotPasswordResetPage/> },
      ]
   },
   {
      path: '/sysad',
      element: (
         <ProtectedRoute allowedRole={'sysad'}>
            <UserLayout/>
         </ProtectedRoute>
      ),
      children: [
         { index: true, element: <SysadDashboardPage/> },
         { path: 'manage-schools', element: <SysadManageSchoolsPage archived={false}/> },
         { path: 'manage-companies', element: <SysadCompaniesPage/> },
         { path: 'manage-job-posts', element: <SysadJobPostPage/> },
         { path: 'manage-dean', element: <SysadManageDeanPage/> },
         { path: 'manage-peso', element: <SysadManagePesoPage/> },
         { path: 'manage-archived-schools', element: <SysadManageSchoolsPage archived={true}/> },
         { path: 'account', element: <SysadAccountPage/> },
         { path: 'archived-companies', element: <SysadArchivedCompaniesPage/> },
         { path: 'archived-job-posts', element: <SysadArchivedJobPostsPage/> },
         { path: 'system', element: <SysadSystemPage/> },
      ]
   },
   {
      path: '/peso',
      element: (
         <ProtectedRoute allowedRole={'peso'}>
            <UserLayout/>
         </ProtectedRoute>
      ),
      children: [
         { index: true, element: <PesoDashboardPage/> },
         { path: 'verify-companies', element: <PesoCompanyVerificationPage/> },
         { path: 'account', element: <PesoAccountPage/> },
      ]
   }
])