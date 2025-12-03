import React, { useState,useEffect } from 'react'
// import { data, replace } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate=useNavigate()
    const {axios, setToken,token} = useAppContext(); // ✅ access both from context

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/admin/login', { email, password });

            if (data.success) {
                const tokenValue=data.token;
                localStorage.setItem('token', tokenValue);
                setToken(tokenValue);
                axios.defaults.headers.common['Authorization']=tokenValue
                // navigate('/admin', { replace: true }); // ✅ this will load Dashboard via index route
                toast.success('Login successful');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };
    useEffect(() => {
        if (token) {
            navigate('/admin', { replace: true });
        }
    }, [token]);


    return (
        <div className=' flex  items-center justify-center h-screen'>
            <div className=' w-full max-w-sm p-6  max-md:m-6 border-blue-300 shadow-2xl shadow-blue-400 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>

                    <div className='w-full py-6 text-center '>
                        <h1 className='font-bold'><span className='text-blue-600'>Admin</span> Login</h1>
                        <p className='font-light'>Enter your creadentials to access admin panel </p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-5 text-gray-800 w-full sm:max-w-md p-5 '>
                        <div className='flex flex-col'>
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type='email'
                                required
                                placeholder=' Enter your email'
                                className='px-2 py-1 border-b-2 border-gray-300 outline-none mb-6' />
                        </div>
                        <div className='flex flex-col'>
                            <label>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type='password'
                                required
                                placeholder=' Enter your password'
                                className='px-2 py-1border-gra border-b-2 border-gray-300 outline-none mb-6' />
                        </div>
                        <div className='flex justify-center'>
                            <button type='Submit' className='text-center rounded-full bg-blue-600 px-6 py-2 text-white'>Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login