import React from 'react'
import {Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import Sidebar from './Sidebar';
import { useAppContext } from '../../context/AppContext'
import { LogOut, Sun, Moon } from 'lucide-react'
import toast from 'react-hot-toast'

const Layout = () => {
  const navigate = useNavigate();
  const { setToken, theme, toggleTheme } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between py-3 h-70px px-4 sm:px-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300'>
        <img 
          src={assets.logo} 
          alt='logo' 
          className='w-32 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity' 
          onClick={() => navigate('/')}
        />
        
        <div className='flex items-center gap-4'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Logout Button */}
          <button 
            onClick={logout}
            className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg'
          >
            <LogOut className="w-4 h-4" />
            <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout