import React from 'react'
import {CiWarning} from 'react-icons/ci'
const Error = (props) => {
  return (
    <div className='w-[250px]  h-[40px] flex justify-start ml-8 items-center bg-red-400 text-white rounded'>
        <div className='p-2 w-full h-full flex  m-2 justify-between animate-bpounce items-center text-white'>
            <CiWarning className=' w-4 h-4 md:w-8 md:h-8'/>
            <p className=' text-sm font-normal  md:text-xl md:font-semibold'>{props.message}</p>
        </div>
    </div>
  )
}

export default Error