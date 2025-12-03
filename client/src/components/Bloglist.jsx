import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import {motion} from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
const Bloglist = () => {
    const [menu,setMenu]=useState('All')
    const {blogs,input}=useAppContext()
    const filteredBlogs=()=>{
        if(input===' '){
            return blogs
        }
        return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase())||blog.category.toLowerCase().includes(input.toLowerCase()))
    }
    return (
        <div>
            <div className='relative flex justify-center gap-4 sm:gap-8 my-10 '>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button onClick={()=>setMenu(item)} className={`bg-blue-500 cursor-pointer rounded-full text-gray-800 px-4 py-2 hover:bg-blue-400
                             ${menu===item && 'text-white px-4 py-2'}`}>
                            {item}{menu ===item && (
                                 <motion.div  layoutId='underline' transition ={{type:'spring',stiffness:500,damping:30}}className='absolute left-0 right-0 top-0 h-7-z-1 bg-blue-500 rounded-full'>

                            </motion.div>)}
                        </button>

                    </div>
                ))}
            </div>
            <div>
                {/* ---blog cards */}
                <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-6 mb-24 mx-auto'>
                    {filteredBlogs().filter((blog)=>menu==="All" ? true: blog.category===menu).map((blog)=><BlogCard key={blog._id} blog={blog}/>)}
                </div>
            </div>
        </div>
    )
}

export default Bloglist