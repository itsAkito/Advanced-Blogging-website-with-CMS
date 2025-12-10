import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/admin/Layout'
import AddBlog from './Pages/admin/AddBlog'
import DashBoard from './Pages/admin/DashBoard'
import ListBlog from './Pages/admin/ListBlog'
import Comment from './Pages/admin/Comment'
import Login from './Pages/admin/Login'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import ImageGenerator from './Pages/admin/imageGenerate'

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Login />
}

const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        
        {/* Admin Login Route */}
        <Route path='/admin/login' element={token ? <Layout /> : <Login />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path='/admin' 
          element={
            <ProtectedRoute isAuthenticated={token}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path='listblog' element={<ListBlog />} />
          <Route path='comment' element={<Comment />} />
          <Route path='image-gen' element={<ImageGenerator/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App