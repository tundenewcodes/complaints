import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import { AppContext } from '../../store/appReducers'

const SignUp = () => {
const appCtx = useContext(AppContext)
const [realDepartment, setRealDepartment] = useState('')
const fullnameRef = useRef('')
const emailRef = useRef('')
const passwordRef =useRef('')
const confirm_passwordRef =useRef('')


const changeDepartment = (e)=>{
  setRealDepartment(e.target.value)
}

const signUpHandler =()=>{
  const enteredFullname = fullnameRef.current.value
  const enteredEmail = emailRef.current.value
  const enteredPassword = passwordRef.current.value
  const enteredconfirm_password = confirm_passwordRef.current.value
  const enteredDepartment = realDepartment


  const  userData = {
    fullname:enteredFullname,
    email:enteredEmail,
    department: enteredDepartment,
    password:enteredPassword,
    confirm_password:enteredconfirm_password
  }

  appCtx.signUp(userData)
}
  return (
    <div className="w-full h-screen bg-[url('./assets/images/signup.jpg')] bg-cover bg-center relative ">
      <div className='absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900'></div>
      <div className=' absolute top-0 right-0 left-0 bg-grey-lighter min-h-screen flex flex-col'>
        <div className='container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          {appCtx.error && <Error message={appCtx.error}/>}
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='fullname'
              placeholder='Full Name' ref={fullnameRef}
            />

            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='email'
              placeholder='Email' ref={emailRef}
            />


            <select onChange={changeDepartment}
              className='block w-full form-select form-select-lg mb-4 p-3 rounded border border-grey-light

      transition
      ease-in-out

      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              aria-label='.form-select-lg example' name='department'>
              <option value='staff'>Staff</option>
              <option value='executive'>Executive</option>
              <option value='contract'>Contract</option>
            </select>

            <input
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='password'
              placeholder='Password' ref={passwordRef}
            />
            <input
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='confirm_password'
              placeholder='Confirm Password'  ref={confirm_passwordRef}
            />

            <button
              type='submit'
              onClick={signUpHandler}
              className='w-full text-center hover:bg-red-900 hover:scale-75 cursor-pointer py-3 rounded bg-red-700 text-white hover:bg-green-dark focus:outline-none my-1'>
              Register
            </button>
            <div className='text-grey-dark flex w-full justify-start mt-6'>
              Already have an account?
              <Link to='/signin'>
              <p
                className='ml-4 border-b border-blue text-blue-500 font-semibold cursor-pointer'
                >
                Log in
              </p>
              </Link>

            </div>

         {appCtx.isLoading && <Loading/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp