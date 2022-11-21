import React, { useContext, useRef, useState } from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import {AppContext} from '../store/appReducers'
import Error from './Error'
import Loading from './Loading'
const RequestForm = () => {
const navigate = useNavigate()
 
  const appCtx = useContext(AppContext)
  const [realStatus, setRealStatus] = useState('')
 
  const titleRef = useRef('')
  const bodyRef =useRef('')
  
  
  
  const changeStatus = (e)=>{
    setRealStatus(e.target.value)
  }
  
  const postReportHandler =(e)=>{
   e.preventDefault()
    const enteredTitle = titleRef.current.value
    const enteredBody = bodyRef.current.value
    const enteredStatus = realStatus
  
  
    const  userData = {
      reportTitle:enteredTitle,
      status: enteredStatus,
      reportBody:enteredBody
    }
  
    appCtx.postReport(userData)
  }

  return (
    <div className='w-full h-[800px] flex justify-center items-center shadow-xl'>
      <div className='w-3/5 h-full flex  flex-col justify-center items-center'>
        <div className='flex justify-start items-center w-full h-[40px] border-b-2 border-red-400'>
          <BsArrowLeft className='text-gray-600 cursor-pointer' onClick={()=>navigate('/complaint-summary')} />
          <h1 className='text-gray-600 text-xl md:text-4xl ml-4'>
            FILE REPORT 004
          </h1>
        </div>

        <div className='w-full h-[700px]  flex flex-col justify-between items-start mt-8'>
        {appCtx.error && <Error message={appCtx.error}/>}
          <form  onSubmit={postReportHandler}
            action=''
            className='w-full h-full flex flex-col my-8 justify-start items-start'>
            <input
              type='date'
              placeholder='date'
              className='date-picker md:w-[300px] w-full  mb-4 p-4  outline-none shadow-xl border-2 border-gray-300 '
            />

            <input
              type='text' name='reportTitle'
              placeholder='Report Title' ref={titleRef}
              className='block w-full mb-4 p-4  outline-none shadow-xl border-2 border-gray-300'
            />
               <select onChange={changeStatus}
              className='block w-full form-select form-select-lg mb-4 p-4 rounded border-2 border-gray-300

      transition
      ease-in-out

      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              aria-label='.form-select-lg example' name='status'>
              <option value='sent'>Sent</option>
              <option value='recieved'>Recieved</option>
              <option value='pending'>Pending</option>
            </select>

            <textarea 
              name='reportBody'  ref={bodyRef}
            
              placeholder='Report Body'
           
              className='  block w-full mb-4 p-4  outline-none shadow-xl border-2 border-gray-300'></textarea>

            <div className='w-full flex justify-between items-center'>
              {' '}
              <button
                type='button' onClick={postReportHandler}
                className='bg-red-700 cursor-pointer mb-4 text-3xl text-white rounded-lg p-4 text-center w-[200px]'>
                Submit
              </button>
              {appCtx.isLoading && <Loading/>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestForm