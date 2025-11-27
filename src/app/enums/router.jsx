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
import PesoDashboardPage from "../../pages/user/peso/PesoDashboardPage"
import PesoCompanyVerificationPage from "../../pages/user/peso/PesoCompanyVerificationPage"

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
         { path: 'manage-companies', element: <SysadCompaniesPage/> },
         { path: 'manage-job-posts', element: <SysadJobPostPage/> },
         { path: 'manage-dean', element: <SysadManageDeanPage/> },
         { path: 'manage-peso', element: <SysadManagePesoPage/> },
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
      ]
   }
])