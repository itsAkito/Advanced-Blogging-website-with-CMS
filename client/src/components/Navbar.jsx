import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

    const {token}=useAppContext()
    const navigate=useNavigate()

    return (
        <div className='flex justify-between items-center py-5 px-8 sm:mx-20 xl:mx-50'>
            <img onClick={()=>navigate('/')} src={assets.logo} alt='logo' className='w-14 sm:w-44' />
            <button onClick={()=>navigate('/admin') } className='flex items-center rounded-full px-10 py-2.5 gap-3 text-sm cursor-pointer text-white
                 bg-blue-500'>{token ? 'Dashboard':'Login'}<img className='w-2' src={assets.arrow} alt='arrow' /></button>
        </div>
    )
}

export default Navbar