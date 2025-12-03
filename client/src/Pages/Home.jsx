import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import BlogCard from '../components/BlogCard'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Bloglist />
      <BlogCard />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home