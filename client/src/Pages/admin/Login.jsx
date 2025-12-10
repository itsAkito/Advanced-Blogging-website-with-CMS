import React, { useState,useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, LogIn } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const { axios, setToken, token } = useAppContext();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        const tokenValue = data.token;
        localStorage.setItem('token', tokenValue);
        setToken(tokenValue);
        axios.defaults.headers.common['Authorization'] = tokenValue
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [token]);

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300'>
          
          {/* Gradient Header */}
          <div className='bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-center'>
            <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Lock className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-white'>Admin Login</h1>
            <p className='text-blue-100 mt-2'>Access the admin dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='p-8 space-y-6'>
            {/* Email Field */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  required
                  placeholder='admin@example.com'
                  className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  required
                  placeholder='••••••••'
                  className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
            >
              {isLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className='w-5 h-5' />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='px-8 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Default credentials:
              <br />
              <span className='font-mono text-xs'>admin@example.com</span>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          className='mt-6 w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors'
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default Login