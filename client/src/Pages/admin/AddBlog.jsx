
import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from '../../assets/assets.js'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef()
  const quillRef = useRef()

  const [image, setImage] = useState('false')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {

  }
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = { title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished }
      const formData = new FormData();
      formData.append('image', image)
      formData.append('title', title)
      formData.append('subTitle', subTitle);
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('category', category);
      formData.append('isPublished', isPublished)


      const { data } = await axios.post('/api/add/blogs', formData);
      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('StartUp')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex-1 w-5xl px-6 py-8 bg-blue-100 text-gray-800 overflow-scroll shadow '>
        <div className='px-6 py-6 bg-white w-full max-w-5xl md:p- rounded '>
          <p className=' mb-4 font-medium'>Upload thumbnail</p>
          <label>
            <img src={!image ? URL.createObjectURL(image) : assets.upload_area} alt='Preview' className='mt-b h-18 rounded-lg cursor-pointer' />
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' accept='image/' required />
          </label>
          <p className=' mt-4 font-medium' >Blog Title</p>
          <input type='text'
            placeholder='Title'
            required
            className=' w-full max-w-lg p-3 border border-gray-400 outline-none rounded'
            onChange={(e) => setTitle(e.target.value)} value={title} />
          <p className=' mt-4 font-medium'>Sub Title</p>
          <input type='text'
            placeholder='SubTitle'
            required
            className=' w-full max-w-lg p-3 border border-gray-400 outline-none rounded'
            onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />

          <p className=' mt-4 font-medium'>Category</p>
          <select onChange={e => setCategory(e.target.value)} name='category' className='mt-4 px-4 py-2 border text-gray-600 border-gray-800 outline-none rounded'>
            <option value="">Select Category</option>
            {blogCategories.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
          {/* <input type='text'
            placeholder='Type Here'
            required
            className=' w-full max-w-lg p-3 border border-gray-400 outline-none rounded'
            onChange={(e) => setCategory(e.target.value)} value={category} /> */}
          <p className='mt-4 font-medium'> Blog Description</p>
          <div className='max-w-lg h-74 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}>
            </div>
            <button className='absolute bottom-1 right-2 ml-2 text-sm bg-gray-800 text-white rounded-lg px-4 py-2 hover:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
          </div>
          <div className='flex mt-4 gap-3'>
            <p>Publish</p>
            <input type='checkbox' checked={isPublished} className='scale-105 cursor-pointer'
              onChange={(e) => setIsPublished(e.target.checked)} />
          </div>
          <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-gray-900 hover:bg-gray-700 text-white cursor-pointer'>
            {isAdding ? 'Adding..' : 'Add Blog'}
          </button>

        </div>

      </form>
    </div>
  )
}

export default AddBlog