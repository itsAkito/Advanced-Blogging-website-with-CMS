import React from 'react'
import {Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import Sidebar from './Sidebar';
const Layout = () => {
  const navigate=useNavigate();
  const logout=()=>{
    navigate('/')
  }
  return (
    <>
    <div className='flex items-center justify-between py-2 h-70px px-4 sm:px-12'>
      <img src={assets.logo} alt='' className='w-32 sm:w-40 cursor-pointer' onClick={()=>navigate('/')}/>
      <button onClick={logout}  className='text-sm px-4 py-2 bg-blue-600 text-white rounded-full cursor-pointer'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}
export default Layout