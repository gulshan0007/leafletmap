import React from 'react'
import { FetchBlogList } from '../utils/BlogAPI'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next'
import Footer from '../components/Footer'

function BlogList() {
    const [blogs, setBlogs] = useState(null)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     FetchBlogList().then(data => {
    //         setBlogs(data)
    //         setLoading(false)
    //     })
    // } , [])

    if (loading) {
        return (
            <div className='mt-20 w-4/5 mx-auto'>
                <h1 className='text-4xl font-bold text-center font-roboco text-gray-800'>Loading...</h1>
            </div>
        )
    }

  return (
    <>
        <div className='mt-20 w-4/5 mx-auto'>
            <h1 className='text-4xl font-bold text-center font-roboco text-gray-800'>Climate Blogs</h1>
            <div className='flex flex-col mt-10'>
                {data.map(blog => (
                <Link to={`/blog/${blog.id}`}  key={blog.id} className='border p-5 rounded-lg shadow-lg hover:shadow-xl mb-10'>
                    <h3 className='text-gray-600'>{blog.date}</h3>
                    <h2 className='text-2xl font-bold text-gray-800'>{blog.title}</h2>
                    <h3 className='text-gray-600'>{blog.content}</h3>
                </Link>
                ))}
            </div>
        </div>
        <Footer />
    </>
  )
}

export default BlogList

const data = [
    {
        title: 'ENVIRONMENTAL DEFENDERS IN THE AMAZON',
        content: 'Mumbai is facing the brunt of climate change...',
        date: '30 May 2024',
        id: 1
    },
    {
        title: 'THE FUTURE OF RENEWABLE ENERGY',
        content: 'Mumbai is facing the brunt of climate change...',
        date: '30 May 2024',
        id: 2
    },
    {
        title: 'THE FUTURE OF RENEWABLE ENERGY',
        content: 'Mumbai is facing the brunt of climate change...',
        date: '30 May 2024',
        id: 3
    },
    {
        title: 'THE FUTURE OF RENEWABLE ENERGY',
        content: 'Mumbai is facing the brunt of climate change...',
        date: '30 May 2024',
        id: 4
    }
]