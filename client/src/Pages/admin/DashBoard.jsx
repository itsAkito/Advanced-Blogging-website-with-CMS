import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTable from '../../components/BlogTable'

const DashBoard = () => {
  const [dashboardData, setDashBoard] = useState({
    blogs: 0,
    comment: 0,
    drafts: 0,
    recentBlogs: []
  })
  const fetchDashboard = async () => {
    setDashBoard(dashboard_data)
    // fetchDashboard()
  }
  useEffect(() => {
    fetchDashboard()
  }, [])
  return (
    <div className='flex-1 p-4 md:p-8 bg-blue-50/50 '>
      <div className='flex flex-wrap gap-4'>
        <div className=' flex items-center gap-4 bg-white p-4 min-w-59 rounded 
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{dashboardData.blogs}</p>
            <p className='text-gray-800 font-light'>Blogs</p>
          </div>
        </div>
        <div className=' flex items-center gap-4 bg-white p-4 min-w-59 rounded 
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{dashboardData.comment}</p>
            <p className='text-gray-800 font-light '>Comments</p>
          </div>
        </div> 
        <div className=' flex items-center gap-4 bg-white p-4 min-w-59 rounded 
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{dashboardData.drafts}</p>
            <p className='text-gray-800 font-light '>Drafts</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-3 m-4 mt-5 text-gray-700'>
          <img src={assets.dashboard_icon_4} alt='' />
          <p>Latest Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className=' w-full text-sm text-gray-600'>
            <thead className=' text-xs text-gray-700 text-left uppercase'>
              <tr>
                <th scope='col' className='px-4 py-2 xl:px-6'>#</th>
                <th scope='col' className='px-4 py-2 '>Blog Title</th>
                <th scope='col' className='px-4 py-2 max-sm:hidden'>Date</th>
                <th scope='col' className='px-4 py-2 max-sm:hidden'>Status</th>
                <th scope='col' className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTable key={blog._id} blog={blog}
                  fetchBlogs={fetchDashboard} index={index} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default DashBoard