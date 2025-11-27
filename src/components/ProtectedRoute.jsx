import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth/useAuthContext"

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  if (!user) return <></>

  if (allowedRole === user.role) return children
  else return <div>Unauthorized</div>
}
