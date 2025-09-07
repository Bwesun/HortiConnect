import React from 'react'
import { Link } from 'react-router-dom'
import {
  MenuIcon,
  BellIcon,
  UserIcon,
  Globe2Icon,
  LogOutIcon,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
interface NavbarProps {
  onMenuClick: () => void
}
const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <header className="bg-gradient-to-r from-green-700 to-[#f8982a] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-4 md:hidden"
            aria-label="Open menu"
          >
            <MenuIcon size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">HortiNigeria</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            <Globe2Icon size={20} />
            <select className="bg-transparent text-white border-none focus:outline-none text-sm">
              <option value="en" className="text-gray-800">
                English
              </option>
              <option value="ha" className="text-gray-800">
                Hausa
              </option>
            </select>
          </div>
          <button className="relative" aria-label="Notifications">
            <BellIcon size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </button>
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile" className="flex items-center">
                {user ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <UserIcon size={18} />
                  </div>
                )}
              </Link>
              <button
                onClick={logout}
                className="hidden md:flex items-center text-white hover:text-gray-100"
                aria-label="Logout"
              >
                <LogOutIcon size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-sm font-medium hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden md:block bg-white text-[#f8982a] px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Navbar
