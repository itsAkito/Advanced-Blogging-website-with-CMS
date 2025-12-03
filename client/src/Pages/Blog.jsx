import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { blog_data } from '../assets/assets'
// import Navbar from '../components/Navbar'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
const Blog = () => {
  const { id } = useParams()
  const {axios} =useAppContext()
  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const fetchBlogData = async () => {
    try{
      const {data} =await axios.get(`/api/add/blog/${id}`)
      data.success ? setData(data.blog):toast.error(data.message)

    }catch(error){
      toast.error(error.message)

    }
  }

  const fetchComments = async () => {
    
    try{
      const {data}=await axios.post('/api/add/comment',{blogId:id})
      if(data.success){
        toast.success(data.message)
        setComments(data.comments)
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const addcomment = async (e) => {
    e.preventDefault()
    try{
      const{data}=await axios.post('/api/add/add-comment',{blog:id,name,content})
      if(data.success){
        setName('')
        setContent('')
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchBlogData()
    fetchComments() 
  }, [id])
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt=" " className='absolute -top-12 -z-10 opacity-45' />
      <Navbar />
      <div className=' text-center mt-20 text-gray-600'>
        <p className=' text-gray-800 py-4 font-medium'>Published on {Moment(data.createdAt).format('MM DD YYYY')}</p>
        <h1 className='text-gray-800 text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto'>{data.title}</h1>
        <h2 className='text-gray-800 my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-2 px-4 rounded-full mb-5 border text-sm border-gray-400 bg-gray-200 text-gray-900'>Akito Hyun</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt=' ' className='rounded-3xl mb-5'></img>
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML=
          {{ __html: data.description }}>
        </div>
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='mb-5'>Comment ({comments?.length||0})</p>
          <div className='flex flex-col gap-5'>
            {Array.isArray(comments)&&comments.map((item, index) => (
              <div key={item._id} className='relative bg-gray-400 border border-gray-500 max-w-xl  p-4 rounded text-gray-800'>
                <div className='flex items-center gap-3 mb-3 '>
                  <img src={assets.user_icon} alt='' className=' w-7' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-10 mb-2'>{item.content}</p>
                <div className='ml-10 mb-2'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
        {/* { ADD Comment} */}
        <div className='max-w-3xl mx-auto'>
          <p className='text-gray-800 font-semibold mb-5'>Add your comment here</p>
          <form className='flex flex-col items-center gap-3 text-sm'
            onSubmit={addcomment}>
            <input type='text'
              placeholder='Your name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className=' w-full p-4 border border-gray-300 rounded outline-none shadow' />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='write your comment...'
              className='text-gray-900 w-full h-32 p-3 rounded outline-none border border-gray-400 resize-none'
              required>
            </textarea>
            <button type='submit' className=' bg-blue-600 text-white rounded px-4
           py-2 hover:bg-blue-300 hover:scale-102 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>
        {/* share buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='text-gray-900 font-semibold my-4'>Shares article on social media</p>
          <div className='flex '>
            <img src={assets.facebook_icon} alt='' width={50} />
            <img src={assets.twitter_icon} alt='' width={50} />
            <img src={assets.googleplus_icon} alt='' width={50} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) :<Loader/>
}

export default Blog