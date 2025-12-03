import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100'>
      <img className='w-32 sm:w-44' src={assets.logo} alt="logo" />
      <div className='flex flex-col md:flex-row items-start justify-between gap-10'>
        {/* <img className=' w-32 sm:w-44' src={assets.logo} alt="logo"/> */}
        <p className='text-gray-800 mt-6 '> All right reserved by us just enjoy with your blog don't make us greedy for doing anything unnecessary against you.</p>
        <div className=' flex flex-wrap justify between w-full mt-5 mb-4 md:w-[45%] gap-5'>
          {footer_data.map((section, index) =>
          (<div key={index} >
            <h3 className='text-base font-semibold text-gray-800 md:mb-5 mb-2'>{section.title}</h3>
            <ul className='text-sm space-y-1'>{section.links.map((link, i) => (
              <li key={i}>
                <a href='#' className='hover:underline transition'>{link}</a>
              </li>
            ))}</ul>

          </div>))}
        </div>
      </div>
      <p className='w-full text-gray-800 text-sm md:text-base text-center py-5'>Copy right 2025 @ AiBlog - All right Reserved</p>
    </div>
  )
}

export default Footer