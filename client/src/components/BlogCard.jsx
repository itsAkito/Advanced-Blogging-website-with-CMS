import React from 'react'
import { useNavigate } from 'react-router-dom';
// import Blog from '../Pages/Blog';

const BlogCard = ({blog={}}) => {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full overflow-hidden
         shadow rounded hover:scale-105 hover:shadow-blue-300 border border-gray-400 duration-200'>
            <img className=' ' src={image} alt='' />
            <span className='ml-5 mt-5 px-3 py-1 inline-block bg-blue-300 rounded-full text-gray-800 text-sm'>{category}</span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-700'>{title}</h5>
                <p className='mb-3 text-sm text-gray-700' dangerouslySetInnerHTML={{__html: description?.slice(0,80)}}></p>
            </div>

        </div>
    )
}

export default BlogCard