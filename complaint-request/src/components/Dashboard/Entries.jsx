import React, { useContext } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../store/appReducers'

const Entries = () => {
  const appCtx = useContext(AppContext)
 
  const navigate = useNavigate()
const complaintHandler = ()=>{

  appCtx.makeComplaintHandler()
  navigate('/make-complaint')

}
  return (
    <div className='h-full w-full flex flex-col'>
     
      <div className="w-full relative h-[600px] bg-[url('./assets/images/signin.jpg')] bg-cover bg-center ">
        <div className='absolute top-0  right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-500'>
          
        </div>
        <div className=' absolute top-0 right-0 left-0  bg-grey-lighter min-h-full flex flex-col'>
          <div className='container max-w-3/5 mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <h1 className='mb-16 text-3xl text-white text-center'>
              ______ENTRIES______
            </h1>
            <div className='w-full h-[120px] flex m-2 justify-between items-center'>
              <div className='flex flex-col   ml-2 rounded-lg border-t-8 border-red-500  w-[100px] h-[150px] md:w-[200px] md:h-[150px] cursor-pointer bg-white justify-between my-4 items-center'>
                <p className=' h-2/5 md:h-1/5 text-center   text-md md:text-xl font-thin md:font-bold text-gray-700 flex mx-auto'>
                  TOTAL RECIEVED
                </p>
                <h1 className='h-3/5 md:h-4/5 md:text-7xl  flex sm:mb-4 mb-0 text-4xl font-bold '>{appCtx.recieved > 0 ? appCtx.recieved :0} </h1>
              </div>
              <div className='flex flex-col  ml-2 rounded-lg border-t-8 border-red-500 w-[100px] h-[150px] md:w-[200px] md:h-[150px] cursor-pointer bg-white justify-between my-4 items-center'>
                <p className=' h-2/5 md:h-1/5 text-center text-sm md:text-xl font-thin md:font-bold text-gray-700 flex mx-auto'>
                  TOTAL PENDING
                </p>
                <h1 className='h-3/5 md:h-4/5 md:text-7xl  text-4xl font-bold '> {appCtx.pending > 0 ? appCtx.pending :0} </h1>
              </div>
              <div className='flex flex-col rounded-lg  ml-2 border-t-8 border-red-500 w-[100px] h-[150px] md:w-[200px] md:h-[150px] cursor-pointer bg-white justify-between my-4 items-center'>
                <p className=' h-2/5 md:h-1/5  text-center   text-sm md:text-xl font-thin md:font-bold text-gray-700 flex mx-auto'>
                  TOTAL DRAFT
                </p>
                <h1 className='h-3/5 md:h-4/5 flex sm:mb-4 mb-0 md:text-7xl text-4xl font-bold '> 0 </h1>
              </div>
              <div className='flex flex-col rounded-lg  ml-2 border-t-8 border-red-500 w-[100px] h-[150px] md:w-[200px] md:h-[150px] cursor-pointer bg-white justify-between my-4 items-center'>
                <p className=' h-2/5 md:h-1/5 text-center text-sm md:text-xl font-thin md:font-bold text-gray-700 flex mx-auto'>
                  TOTAL SENT
                </p>
                <h1 className='h-3/5 md:h-4/5 md:text-7xl text-4xl font-bold '> {appCtx.totalItems > 0 ? appCtx.totalItems :0} </h1>
              </div>
            </div>
          </div>
          <div className='w-full h-20 flex  justify-between items-center bg-black '>
            <p className='text-white hidden md:block text-xl ml-4'>
              Hello, kindly make a complaint by clicking on the button
            </p>
        { appCtx.makeComplaint &&   <Link to='/make-complaint' >
           <button onClick={complaintHandler} className='rounded-lg bg-red-500 w-[200px] p-1 mx-1 cursor-pointer text-white text-sm'>
            Make a Complaint Request
          </button>
          </Link>}
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default Entries
