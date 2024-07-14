import React from 'react'

export default function Navbar() {
  return (
    <div className=' '>
    <div className='flex justify-between items-center h-16 bg-gray-800 text-white'>
        <div className='flex items-center'>
            <h1>Club Volley</h1>
        </div>
        <div className='flex gap-2'>
        <h1>Home</h1>
        <h1>Login</h1>
        </div>
    </div>
    </div>
  )
}
