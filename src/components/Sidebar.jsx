import { useAuth } from "../context/auth/useAuthContext"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Button } from "./ui/button"
import { getRoleLinks } from "../app/enums/links"
import { useState } from "react"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signoutUser } = useAuth()

  const handleLogout = async () => await signoutUser(navigate)

  const renderLinks = roleLinks => {
    return roleLinks.map((link, index) => {
      if (link.isLink) {
        const isCurrent = location.pathname === link.path
        
        return (
          <Link
          key={index}
          to={link.path}
          className={`${
            isCurrent
            ? 'bg-blue-100 text-blue-600 font-semibold'
            : 'text-gray-700 hover:bg-gray-100'
          } flex items-center w-full px-4 py-2 rounded-md transition text gap-x-4`}>
            <link.icon className='w-5'/>
            <span>{link.label}</span>
          </Link>
        )
      } else {
        return (
          <div
          key={index}
          className={`pl-4 flex flex-col`}>
            <div className="flex items-center py-2 gap-x-4">
              <link.icon className='w-5 text-gray-700'/>
              <span className="text-gray-700">{link.label}</span>
            </div>
            {renderLinks(link.links)}
          </div>
        )
      }
    })
  }

  if (!user) return <></>

  return (
    <aside className="flex flex-col w-80 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Admin Portal</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {renderLinks(getRoleLinks(user.role))}
      </nav>

      <div className="p-4 space-y-3 border-t border-gray-200">
        <div className="px-4 py-2 rounded bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role?.replace("_", " ")}</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
          Logout
        </Button>
      </div>
    </aside>
  )
}