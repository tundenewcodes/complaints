import React, { useContext, useRef } from 'react'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import { AppContext } from '../../store/appReducers'
import {Link} from 'react-router-dom'

const Login = () => {

const appCtx = useContext(AppContext)

const emailRef = useRef('')
const passwordRef = useRef('')


const signInHandler = () => {

  const enteredEmail = emailRef.current.value
  const enteredPassword = passwordRef.current.value

  const userData = {

    email: enteredEmail,

    password: enteredPassword,

  }

  appCtx.signIn(userData)
}




  return (
    <div className="w-full relative h-screen bg-[url('./assets/images/signin.jpg')] bg-cover bg-center ">
      <div className='absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-500'></div>
      <div className=' absolute top-0 right-0 left-0  bg-grey-lighter min-h-screen flex flex-col'>
        <div className='container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          {appCtx.error && <Error message={appCtx.error}/>}
            <h1 className='mb-8 text-3xl text-center'>Sign In</h1>
            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='email' ref={emailRef}
              placeholder='Email Address'
            />

            <input
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='password' ref={passwordRef}
              placeholder='Password'
            />
            <div className=' w-full flex justify-between items-center'>
            <p className='flex w-1/2 cursor-pointer text-gray-500 text-sm  md:text-md'>
             don't have an account yet? please <Link to='/signup'><span className='underline border-b-2 border-blue-500  ml-4 text-blue-500 text-sm md:text-md'>signup</span> </Link>
            </p> 
            <span className='flex w-1/2   italic cursor-pointer border-b-2 border-blue-500 text-blue-500 text-sm md:text-md'>
              forget password?
            </span>
            </div>
           

            <button
              type='submit' onClick={signInHandler}
              className='w-full text-center py-3  cursor-pointer rounded bg-red-700 text-white hover:scale-75 hover:bg-red-900 focus:outline-none my-1'>
              SignIn
            </button>
            {appCtx.isLoading && <Loading/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
