import React from 'react'
import { Link } from 'react-router-dom'


const Homepage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#2e026d] to-[#ee85c6]' >
        <h1 className='text-6xl  font-extrabold mb-4'>AI Sitemap Builder</h1>
        <p className='text-xl max-w-xl mb-8'>
            Turn your app ideas into sitemap instantly using AI 🧠
        </p>
        <Link
        to="/generate"
        className='px-6 py-3 bg-white/20  font-bold hover:bg-white/30 rounded-full'>
        🚀 Generate your Sitemap
        </Link>

    </div>
  )
}

export default Homepage