
import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
    const { setInput, input } = useAppContext();
    const inputRef = useRef();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value)
    }
    const onclear=()=>{
        setInput('')
        inputRef.current.value=''
    }
    return (
        <div className='text-center mt-20'>

            <div className='inline-flex items-center justify-center bg-blue-200 rounded-full gap-4 text-gray-800 font-semibold px-6 py-2 shadow'>
                <p>New:AI Feature Added Here</p>
                <img src={assets.star_icon} alt='' className='w-3' />
            </div>
            <h1 className='text-gray-800 text-3xl  sm:text-5xl font-bold mb-8 sm:leading-16'>Here our own<span className='text-blue-600'> blogging</span> <br /> platform</h1>
            <p className='text-gray-800 my-6 sm:my-10 max-w-2xl m-auto max-sm:text-xs'>
                This is your space to think out loud ,to share what matters and to write with filters.
                Whether it's one word or a thousand,
                your strong stroy starts right from here.</p>
            <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg mx-auto max-sm:scale-75 border border-gray-500 rounded overflow-hidden'>
                <input ref={inputRef} type='text'
                aria-label='Search blog input'
                    placeholder='Enter your searching blog '
                    required
                    className='text-gray-800 px-6 py-3 rounded outline-none w-full' />
                <button type='submit' className=' text-white bg-blue-500 rounded-lg px-5 py-3 m-4 hover:scale-105 cursor-pointer'>Search</button>
            </form>
            <div className='text-center'>
                {input &&
                    <button onClick={onclear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer '>Clear Search</button>
                }
            </div>
            <img src={assets.gradientBackground} alt='' className='absolute top-[-50] -z-10 opacity-50' />
        </div>

    )
}

export default Header