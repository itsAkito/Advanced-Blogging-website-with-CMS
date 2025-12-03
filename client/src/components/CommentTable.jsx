import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const CommentTable = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext()
    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
            if (data.success) {
                toast.success(data.message)
                fetchComments();
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const deleteComment = async () => {
        const confirm = wimdow.comfirm("Are you sure you want to delete this comm")
        try {
            const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
            if (data.success) {
                toast.success(data.message)
                fetchComments();
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-semibold text-gray-800'>Blog</b>:{blog.title}
                <br />
                <b className='font-semibold text-gray-800'>Name</b>:{comment.name}
                <br />
                <b className='font-semibold text-gray-800'>Actions</b>:{comment.content}
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toLocaleDateString()}
            </td>
            <td className=' px-6 py-4'>
                <div className='inline-flex items-center gap-5'>
                    {!comment.isApproved ?
                        <img onClick={approveComment} src={assets.tick_icon}
                            className='w-5 hover:scale-105 transition-all cursorp-pointer' />
                        :
                        <p className='text-xs border border-green-600 bg-green-200 text-green-600  rounded-full px-3 py-1'> Approved</p>
                    }
                    <img onClick={deleteComment} src={assets.bin_icon} className=' w-5 hover:scale-105 transition-all cursor-pointer' />
                </div>
            </td>
        </tr>
    )
}

export default CommentTable