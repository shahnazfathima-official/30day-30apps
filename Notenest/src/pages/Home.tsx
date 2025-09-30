import React from 'react'
import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'

const Home = () => {
  return (
    <div className='flex items-center px-4 py-8 justify-center bg-blue-200 rounded-2xl
    max-w-screen-sm mx-auto w-full'>
        <div className='w-full'>
            <h1 className='text-3xl font-bold text-center mb-6 bg-blue-200'>📝Notenest</h1>
            <div className='p-6 bg-white rounded-lg shadow'>
                <NoteForm/>
            </div>
            <NoteList/>
            
        </div>
        
        
    </div>
  )
}

export default Home