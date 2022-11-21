import React from 'react'
import { GiClick } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
const Welcome = () => {
  const navigate = useNavigate()

  const started = () => {
    navigate('/signup')
  }
  return (
    <div className="w-full relative h-screen bg-[url('./assets/images/student.jpeg')] bg-cover bg-center ">
      <div className='absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900'>

      </div>
      <div className=' absolute top-0 right-0 left-0 w-full h-full flex flex-col justify-center items-center '>
        <h1 className='md:text-9xl text-7xl font-black text-orange-800 tracking-widest font-roboto'>
          CRS
        </h1>
        <h1 className='mt-5 text-center text-3xl md::text-5xl text-white italic font-semibold drop-shadow-lg'>
          Complaint Report System
        </h1>
        <button
          onClick={started}
          className='w-[200px] h-[50px] flex justify-start bg-green-500 rounded-lg outline-none items-center font-lg text-2xl mx-4 mt-4 text-white cursor-pointer animate-bounce'>
          <GiClick className=' w-12 h-full text-white' />
          <span className='md:text-2xl text-xl font-semibold ml-4'>

            Get Started
          </span>
        </button>
      </div>
    </div>
  )
}

export default Welcome
