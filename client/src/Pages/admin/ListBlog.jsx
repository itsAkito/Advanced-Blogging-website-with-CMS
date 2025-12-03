import React, { useEffect, useState } from 'react'
import BlogTable from '../../components/BlogTable'
import axios from 'axios'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
const ListBlog = () => {
  const [blogs, setBlogs] = useState([])
  const { axios,token } = useAppContext()
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs',
        {
          headers: {
            Authorization:token
          }
        });
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className=' flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className='mb-5 font-medium px-1 py-0.5'>All Blogs</h1>
      <div className=' relative shadow rounded-lg max-w-4xl overflow-x-auto h-4/5 scrollbar-hide bg-white'>
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
            {Array.isArray(blogs) && blogs.map((blog, index) => {
              return <BlogTable key={blog._id} blog={blog}
                fetchBlogs={fetchBlogs} index={index + 1} />
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default ListBlog