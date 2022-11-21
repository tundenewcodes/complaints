import React, { useContext, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillCaretDown } from 'react-icons/ai'
import { Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../store/appReducers'

const Header = () => {
  const appCtx = useContext(AppContext)
  const navigate = useNavigate()
const complaintHandler = ()=>{

  appCtx.makeComplaintHandler()
  navigate('/make-complaint')

}

useEffect(() => {
  appCtx.getFullname()
  }, [])

const logoutHandler = ()=>{
  const confirmLogout = window.confirm('do you want to logout now??')
  if(!confirmLogout){
    return
  }
  appCtx.logout()
}

  return (
    <div className='flex w-full h-16 shadow-md mx-2  md:mx-1'>
      <div className='flex justify-between items-center w-full h-full'>
        <div className='lg:max-w-[150px] max-w-[100px]  flex flex-col justify-start cursor-pointer items-start h-full'>
          <h1  className='w-full h-full md:h-4/5 cursor-pointer flex justify-center items-center text-center md:text-2xl  text-2xl font-black text-red-600     tracking-wider'>
            CRS
          </h1>
          <span className='w-full h-1/5 mb-6 lg:block  ml-4  hidden sm:text-base md:text-sm text-gray-900 '>
            complaint report system
          </span>
        </div>


        <div className='w-full h-full flex justify-end -mr-24  items-center'>
         
     {appCtx.makeComplaint && <Link to='/make-complaint'><button  onClick={complaintHandler} className='rounded-lg bg-red-500 lg:max-w-[250px] max-w-[250px] p-1 mx-1 cursor-pointer text-white text-base lg:text-md'>
            Make a Complaint
          </button></Link>}
           
       

          <div className='flex justify-start  items-center w-[200px]  h-full'>
            <FaUserCircle  onClick={logoutHandler} className='text-gray-400 lg:text-2xl  sm:text-md lg:ml-2  cursor-pointer ' />
            <Link to='/user-page'> <p className='text-black ml-1 md:text-lg text-base sm:ml-1 md:ml-4 '> {appCtx.username} </p>
            </Link>
           <Link  to='/user-page'>
           <AiFillCaretDown className='text-red-600 md:text-2xl sm:text-md md:ml-8 sm:ml-2 cursor-pointer ' /></Link>
            
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default Header
