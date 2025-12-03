import React from 'react'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
            <h1 className='text-gray-800 md:text-4xl text-2xl font-medium'>Never Miss Your Blog</h1>
            <p className='text-gray-700/80 md:text-lg pb-8 font-semibold'>
                Hey, Stay connect with us to get the blog, new tech and exclusive news
            </p>
            <form className=' flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
                <input className='border border-gray-300 rounded-md
         h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700' type='text'
                    placeholder='Enter your email id' required></input>
                <button className=' md:px-12 px-8 h-full text-white bg-blue-600 hover:bg-blue-300 transition-all cursor-pointer rounded-md rounded-l-none'>
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default Newsletter