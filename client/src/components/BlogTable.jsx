import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
// import { togglePublish } from '../../../server/controllers/blogControllers'

const BlogTable = ({ blog, index, fetchBlogs }) => {

    const { title, createdAt } = blog
    const BlogDate = new Date(createdAt)

    const { axios,token } = useAppContext();

    const deleteBlogs = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blogs?')
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/add/delete', { id: blog._id },{
                headers:{
                    Authorization:token
                }
            })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/add/toggle-publish', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <th className='px-4 py-2'>{index}</th>
            <td className='px-4 py-2'>{title}</td>
            <td className='px-4 py-2 max-sm:hidden'>{BlogDate.toDateString()}</td>
            <td className='px-4 py-2 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-red-400"}`}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>
            <td className='px-4 py-2 flex text-xs gap-3'>
                <button type='button'
                    onClick={togglePublish}
                    className='border px-2 py-1 mt-1 cursor-pointer rounded-lg shadow'>{blog.isPublished ? "Unpublish" : "Publish"}</button>
                <img src={assets.cross_icon}
                    onClick={deleteBlogs}
                    alt=''
                    className='w-8 hover:scale-105 transition-all cursor-pointer'></img>
            </td>
        </tr>
    )
}
export default BlogTable