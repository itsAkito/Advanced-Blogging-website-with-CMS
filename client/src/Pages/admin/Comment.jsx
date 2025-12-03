import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTable from '../../components/CommentTable'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
const Comment = () => {
  const [filter, setFilter] = useState('Not Approved')
  const [comments, setComments] = useState([])
  const {axios}=useAppContext()
  const fetchComment = async () => {
    try{
    const {data} =await axios.get('/api/admin/comment')
   if(data.success){
    setComments(data.comments)
   }else{
    toast.error(data.message)
    }
  }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchComment()
  }, [])
  return (
    <div className='flex-1 pt-5 px-6 sm:pl-16 bg-blue-50/50'>
      <div className=' flex items-center justify-between max-w-4xl mt-8'>
        <h1 >Comments</h1>
        <div className='flex gap-4'>
          <button onClick={() => setFilter("Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs hover:bg-blue-300
           ${filter === 'Not Approved' ? 'text-blue-600' : 'text-gray-800'} `}>Approved</button>
          <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs hover:bg-blue-300
          ${filter === 'Not Approved' ? 'text-blue-600' : 'text-gray-800'} `}> Not Approved</button>

        </div>
      </div>
      <div>
        <table>
          <thead className='text-xs  text-gray-700 '>
            <tr>
              <th scope='col' className='px-4 py-2 sm:px-6'>
                Blog Title & Comment
              </th>
              <th scope='col' className='px-4 py-2 max-sm:hidden'>
                Date
              </th>
              <th scope='col' className='px-4 py-2 max-sm:hidden'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(comments) && comments.filter((comments) => {
              if (filter === "Approved")
                return comments.isApproved === true;
              return comments.isApproved === false;
            }).map((comment, index) => <CommentTable
              key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComment} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comment